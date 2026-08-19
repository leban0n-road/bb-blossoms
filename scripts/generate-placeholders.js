/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..");
const PUBLIC_DIR = path.join(ROOT, "public");

const PALETTE = ["#2F5233", "#4C7A4E", "#6B3FA0", "#B98CD6", "#1e3722"];

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function wrapLabel(label, maxChars = 22) {
  const words = label.split(" ");
  const lines = [];
  let current = "";
  for (const word of words) {
    if ((current + " " + word).trim().length > maxChars) {
      if (current) lines.push(current.trim());
      current = word;
    } else {
      current = (current + " " + word).trim();
    }
  }
  if (current) lines.push(current.trim());
  return lines.slice(0, 3);
}

function buildSvg({ label, width, height }) {
  const seed = hashString(label);
  const colorA = PALETTE[seed % PALETTE.length];
  const colorB = PALETTE[(seed + 2) % PALETTE.length];
  const lines = wrapLabel(label);
  const fontSize = Math.max(18, Math.min(width, height) * 0.055);

  const textEls = lines
    .map((line, i) => {
      const dy = (i - (lines.length - 1) / 2) * fontSize * 1.35;
      return `<text x="50%" y="50%" dy="${dy}" font-family="Georgia, 'Times New Roman', serif" font-size="${fontSize}" fill="#ffffff" text-anchor="middle" dominant-baseline="middle" font-weight="600">${escapeXml(
        line
      )}</text>`;
    })
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${colorA}"/>
      <stop offset="100%" stop-color="${colorB}"/>
    </linearGradient>
    <pattern id="leaf" width="80" height="80" patternUnits="userSpaceOnUse" patternTransform="rotate(20)">
      <text x="0" y="60" font-size="52" opacity="0.10">🌿</text>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <rect width="100%" height="100%" fill="url(#leaf)"/>
  ${textEls}
  <text x="50%" y="92%" font-family="Arial, sans-serif" font-size="${Math.max(
    12,
    fontSize * 0.4
  )}" fill="#ffffff" fill-opacity="0.7" text-anchor="middle">BB Blossoms — placeholder image</text>
</svg>`;
}

function escapeXml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function writePlaceholder(relPath, label, { width = 1200, height = 1200 } = {}) {
  const outPath = path.join(PUBLIC_DIR, relPath.replace(/^\//, ""));
  if (fs.existsSync(outPath)) return { path: relPath, skipped: true };

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  const svg = buildSvg({ label, width, height });
  const ext = path.extname(outPath).toLowerCase();

  let pipeline = sharp(Buffer.from(svg));
  if (ext === ".png") {
    pipeline = pipeline.png();
  } else {
    pipeline = pipeline.jpeg({ quality: 78 });
  }
  await pipeline.toFile(outPath);
  return { path: relPath, skipped: false };
}

function readJson(relPath) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, relPath), "utf8"));
}

async function main() {
  const jobs = [];

  // Fixed, hand-referenced placeholders used directly in components.
  jobs.push(["/images/placeholder-hero-nursery.jpg", "BB Blossoms Nursery", { width: 1600, height: 1600 }]);
  jobs.push(["/images/placeholder-promo-fall-planting.jpg", "Fall Planting Season", { width: 1200, height: 800 }]);
  jobs.push(["/images/placeholder-promo-privacy.jpg", "Privacy Collection", { width: 1200, height: 800 }]);
  jobs.push(["/images/placeholder-team-photo.jpg", "The BB Blossoms Team", { width: 1200, height: 900 }]);
  jobs.push(["/images/placeholder-og-default.jpg", "BB Blossoms", { width: 1200, height: 630 }]);
  jobs.push(["/images/placeholder-storefront.jpg", "BB Blossoms Storefront", { width: 1200, height: 900 }]);
  jobs.push(["/images/placeholder-logo.png", "BB Blossoms", { width: 512, height: 512 }]);

  // Category hero images.
  const categories = readJson("src/content/categories.json");
  for (const cat of categories) {
    jobs.push([cat.heroImage, cat.name, { width: 1200, height: 800 }]);
  }

  // Plant images (may be empty if the catalog hasn't been generated yet).
  const plants = readJson("src/content/plants.json");
  for (const plant of plants) {
    jobs.push([plant.image, plant.name, { width: 1000, height: 1000 }]);
    for (const extra of plant.images ?? []) {
      jobs.push([extra, `${plant.name} — detail`, { width: 1000, height: 1000 }]);
    }
  }

  let created = 0;
  let skipped = 0;
  for (const [relPath, label, size] of jobs) {
    if (!relPath) continue;
    const result = await writePlaceholder(relPath, label, size);
    if (result.skipped) skipped++;
    else created++;
  }

  console.log(`Placeholder images: ${created} created, ${skipped} already existed. Total referenced: ${jobs.length}.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
