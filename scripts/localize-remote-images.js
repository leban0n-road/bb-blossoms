/* eslint-disable @typescript-eslint/no-require-imports */
// One-time migration: download every remote R2-hosted image referenced in
// content, resize + re-encode it as a compressed local JPEG, and rewrite
// the content JSON to point at the local file. This removes the external
// network fetch from the image-serving path entirely (the single biggest
// lever for "external pictures load slow") and shrinks each source file
// from ~2.5-3MB down to a properly web-sized asset.
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..");
const MAX_DIMENSION = 1000; // no current layout displays these above ~600px; this covers 2x retina with margin
const JPEG_QUALITY = 82;

function localPathFor(remoteUrl) {
  const filename = remoteUrl.split("/").pop().replace(/\.png$/i, ".jpg");
  return `/images/plants/${filename}`;
}

async function downloadAndProcess(remoteUrl) {
  const localRelPath = localPathFor(remoteUrl);
  const outPath = path.join(ROOT, "public", localRelPath.replace(/^\//, ""));

  if (fs.existsSync(outPath)) {
    return { remoteUrl, localRelPath, status: "skipped (already exists)" };
  }

  const res = await fetch(remoteUrl);
  if (!res.ok) {
    return { remoteUrl, localRelPath, status: `FAILED (HTTP ${res.status})` };
  }
  const buffer = Buffer.from(await res.arrayBuffer());
  const originalSize = buffer.length;

  await sharp(buffer)
    .resize({ width: MAX_DIMENSION, height: MAX_DIMENSION, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
    .toFile(outPath);

  const newSize = fs.statSync(outPath).size;
  return {
    remoteUrl,
    localRelPath,
    status: "ok",
    originalSize,
    newSize,
    reduction: Math.round((1 - newSize / originalSize) * 100),
  };
}

async function main() {
  const plantsPath = path.join(ROOT, "src", "content", "plants.json");
  const categoriesPath = path.join(ROOT, "src", "content", "categories.json");
  const plants = JSON.parse(fs.readFileSync(plantsPath, "utf8"));
  const categories = JSON.parse(fs.readFileSync(categoriesPath, "utf8"));

  const remoteUrls = new Set();
  for (const p of plants) {
    if (p.image?.startsWith("https://")) remoteUrls.add(p.image);
    for (const img of p.images ?? []) {
      if (img.startsWith("https://")) remoteUrls.add(img);
    }
  }
  for (const c of categories) {
    if (c.heroImage?.startsWith("https://")) remoteUrls.add(c.heroImage);
  }

  console.log(`Found ${remoteUrls.size} unique remote images to migrate.\n`);

  const results = [];
  let i = 0;
  for (const url of remoteUrls) {
    i++;
    process.stdout.write(`[${i}/${remoteUrls.size}] ${url.split("/").pop()} ... `);
    try {
      const result = await downloadAndProcess(url);
      results.push(result);
      if (result.status === "ok") {
        console.log(`${(result.originalSize / 1024 / 1024).toFixed(2)}MB -> ${(result.newSize / 1024).toFixed(0)}KB (-${result.reduction}%)`);
      } else {
        console.log(result.status);
      }
    } catch (err) {
      results.push({ remoteUrl: url, status: `FAILED (${err.message})` });
      console.log(`FAILED (${err.message})`);
    }
  }

  const failed = results.filter((r) => r.status.startsWith("FAILED"));
  console.log(`\nDone. ${results.length - failed.length} succeeded, ${failed.length} failed.`);
  if (failed.length) {
    console.log("Failed URLs:", failed.map((f) => f.remoteUrl));
  }

  // Rewrite content JSON to point at local paths.
  const urlMap = new Map(results.filter((r) => r.status === "ok" || r.status.startsWith("skipped")).map((r) => [r.remoteUrl, r.localRelPath]));

  let plantsContent = fs.readFileSync(plantsPath, "utf8");
  let categoriesContent = fs.readFileSync(categoriesPath, "utf8");
  let replaced = 0;
  for (const [remoteUrl, localPath] of urlMap) {
    const before = plantsContent;
    plantsContent = plantsContent.split(`"${remoteUrl}"`).join(`"${localPath}"`);
    if (plantsContent !== before) replaced++;
    const beforeCat = categoriesContent;
    categoriesContent = categoriesContent.split(`"${remoteUrl}"`).join(`"${localPath}"`);
    if (categoriesContent !== beforeCat) replaced++;
  }
  fs.writeFileSync(plantsPath, plantsContent);
  fs.writeFileSync(categoriesPath, categoriesContent);
  console.log(`\nRewrote ${replaced} references in plants.json/categories.json to local paths.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
