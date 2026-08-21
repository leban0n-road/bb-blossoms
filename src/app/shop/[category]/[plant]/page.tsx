import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqSection from "@/components/FaqSection";
import FastFactsBox from "@/components/FastFactsBox";
import JsonLd from "@/components/JsonLd";
import PlantCard from "@/components/PlantCard";
import PurchaseBox from "@/components/shop/PurchaseBox";
import {
  getAllPlants,
  getCategoryBySlug,
  getNeedsForPlant,
  getPlantBySlug,
  getRelatedPlants,
} from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { productSchema } from "@/lib/schema";
import { siteConfig } from "@/config/site";

export function generateStaticParams() {
  return getAllPlants().map((p) => ({ category: p.category, plant: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; plant: string }>;
}): Promise<Metadata> {
  const { plant: plantSlug } = await params;
  const plant = getPlantBySlug(plantSlug);
  if (!plant) return {};
  return buildMetadata({
    title: `${plant.name} for Sale in ${siteConfig.primaryCity}, ${siteConfig.primaryState} | ${siteConfig.brandName}`,
    description: `Buy ${plant.name} online from ${siteConfig.brandName} — ${plant.matureHeight} mature height, ${plant.sun}. Local delivery & installation in ${siteConfig.primaryStateName}.`,
    path: `/shop/${plant.category}/${plant.slug}/`,
    image: plant.image,
  });
}

const specRows = (plant: NonNullable<ReturnType<typeof getPlantBySlug>>) => [
  ["Mature Height", plant.matureHeight],
  ["Mature Width", plant.matureWidth],
  ["Sun Requirements", plant.sun],
  ["Water Needs", plant.water],
  ["Bloom Season", plant.bloomSeason],
  ["Growth Rate", plant.growthRate],
  ["USDA Hardiness Zone", plant.usdaZone],
  ["Deer Resistant", plant.deerResistant ? "Yes" : "No"],
  ["Pet Safe", plant.petSafe ? "Yes" : "Check with a vet"],
  ["Native to Georgia", plant.native ? "Yes" : "No"],
];

// Four short, data-driven facts for the photo-hero checklist — pulled from
// fields every Plant record already has, not invented per-product copy.
const productHighlights = (plant: NonNullable<ReturnType<typeof getPlantBySlug>>) => {
  const highlights = [
    plant.growthRate,
    plant.sun,
    `Cold hardy to USDA Zone ${plant.usdaZone}`,
  ];
  if (plant.deerResistant) highlights.push("Deer resistant");
  else if (plant.native) highlights.push("Native to Georgia");
  else if (plant.petSafe) highlights.push("Pet safe");
  else highlights.push("Georgia grown & ready to plant");
  return highlights;
};

export default async function PlantPage({
  params,
}: {
  params: Promise<{ category: string; plant: string }>;
}) {
  const { plant: plantSlug } = await params;
  const plant = getPlantBySlug(plantSlug);
  if (!plant) notFound();

  const category = getCategoryBySlug(plant.category);
  const related = getRelatedPlants(plant);
  const needs = getNeedsForPlant(plant.slug);
  const gallery = [plant.image, ...(plant.images ?? [])];

  return (
    <div className="product-page-frame">
      <span className="pf-decor pf-corner-tl" aria-hidden="true" />
      <span className="pf-decor pf-corner-tr" aria-hidden="true" />
      <span className="pf-decor pf-edge-l" aria-hidden="true" />
      <span className="pf-decor pf-edge-r" aria-hidden="true" />
      <span className="pf-decor pf-corner-bl" aria-hidden="true" />
      <span className="pf-decor pf-corner-br" aria-hidden="true" />
      <div className="pf-content">
      <JsonLd data={productSchema(plant)} />

      {/* Photo hero: product photo as a bounded background behind the name/
          tagline/highlights (left), a fully solid white price card (right)
          — the card is its own sibling box, not overlaid on the photo, so
          it's guaranteed 100% opaque with zero photo showing through, and
          the two columns naturally match height via grid stretch. */}
      <section className="relative isolate">
        <div className="grid lg:grid-cols-2">
          <div className="relative isolate min-h-[440px] overflow-hidden">
            <Image
              src={plant.image}
              alt=""
              aria-hidden="true"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            {/* Flat scrim (not a directional fade) — the photo is already
                bounded to this column, so there's no shared background with
                the price card to preserve; a uniform overlay guarantees
                legibility for every wrapped line, not just the first. */}
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 flex h-full flex-col justify-center p-8 md:p-12">
              <h1 className="text-shadow-hero font-heading text-3xl font-bold text-white md:text-4xl">
                {plant.name}
              </h1>
              <p className="text-shadow-hero mt-2 text-white/90">
                For sale in {siteConfig.primaryCity}, {siteConfig.primaryState}
              </p>
              <ul className="mt-5 space-y-2">
                {productHighlights(plant).map((item) => (
                  <li
                    key={item}
                    className="text-shadow-hero flex items-center gap-2 text-sm font-medium text-white"
                  >
                    <Check aria-hidden="true" size={16} className="shrink-0 text-plaque-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex items-center bg-white p-6 md:p-10">
            <PurchaseBox plant={plant} />
          </div>
        </div>
      </section>

      <Breadcrumbs
        items={[
          { name: "Shop", path: "/shop/" },
          ...(category
            ? [{ name: category.shortName, path: `/shop/${category.slug}/` }]
            : []),
          { name: plant.name, path: `/shop/${plant.category}/${plant.slug}/` },
        ]}
      />

      <section className="container-page grid gap-10 pb-14 lg:grid-cols-2">
        <div>
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-border bg-primary-light/10">
            <Image
              src={gallery[0]}
              alt={`${plant.name} in a ${plant.potSize} container, available for sale at ${siteConfig.brandName}`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          {gallery.length > 1 && (
            <div className="mt-3 grid grid-cols-4 gap-3">
              {gallery.slice(1, 5).map((img) => (
                <div
                  key={img}
                  className="relative aspect-square overflow-hidden rounded-xl border border-border bg-primary-light/10"
                >
                  <Image
                    src={img}
                    alt={`${plant.name} — additional view`}
                    fill
                    sizes="20vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="font-heading text-2xl font-bold text-primary">
            About {plant.name}
          </h2>
          <p className="mt-3 leading-relaxed text-neutral-dark/75">
            {plant.description}
          </p>

          <p className="mt-4 rounded-xl bg-primary/5 p-3 text-sm text-neutral-dark/70">
            🚚 Delivery available to {siteConfig.primaryCity} and all of
            Gwinnett County — see our{" "}
            <Link href="/locations/" className="text-accent hover:underline">
              service area
            </Link>{" "}
            for exact timing.
          </p>
        </div>
      </section>

      <section className="container-page grid gap-8 pb-14 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="font-heading text-2xl font-bold text-primary">
            Plant Specifications
          </h2>
          <div className="mt-4 overflow-hidden rounded-2xl border border-border">
            <table className="w-full text-sm">
              <tbody>
                {specRows(plant).map(([label, value], i) => (
                  <tr key={label} className={i % 2 === 0 ? "bg-white" : "bg-neutral-bg"}>
                    <th scope="row" className="w-1/2 px-4 py-3 text-left font-semibold text-neutral-dark">
                      {label}
                    </th>
                    <td className="px-4 py-3 text-neutral-dark/80">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="mt-10 font-heading text-2xl font-bold text-primary">
            Planting Instructions &amp; Regional Tips
          </h2>
          <p className="mt-3 leading-relaxed text-neutral-dark/75">
            {plant.plantingTips}
          </p>

          {needs.length > 0 && (
            <div className="mt-8">
              <h2 className="font-heading text-lg font-bold text-primary">
                Great For
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {needs.map((need) => (
                  <Link
                    key={need.slug}
                    href={`/shop-by-need/${need.slug}/`}
                    className="rounded-full border border-accent-light bg-accent-light/15 px-4 py-1.5 text-xs font-semibold text-accent-dark hover:bg-accent-light/30"
                  >
                    {need.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <FastFactsBox facts={plant.fastFacts} />
        </div>
      </section>

      {related.length > 0 && (
        <section className="container-page pb-14">
          <h2 className="font-heading text-2xl font-bold text-primary">
            Pairs Well With
          </h2>
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {related.map((r) => (
              <PlantCard key={r.slug} plant={r} />
            ))}
          </div>
        </section>
      )}

      <FaqSection faqs={plant.faqs} title={`${plant.name} FAQs`} />
      </div>
    </div>
  );
}
