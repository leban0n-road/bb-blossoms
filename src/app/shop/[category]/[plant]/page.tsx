import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
    <div>
      <JsonLd data={productSchema(plant)} />
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
              priority
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
          <h1 className="font-heading text-3xl font-bold text-primary md:text-4xl">
            {plant.name} for Sale in {siteConfig.primaryCity}, {siteConfig.primaryState}
          </h1>
          <p className="mt-3 leading-relaxed text-neutral-dark/75">
            {plant.description}
          </p>

          <div className="mt-6">
            <PurchaseBox plant={plant} />
          </div>

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
  );
}
