import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import PlantCard from "@/components/PlantCard";
import QuoteCallButtons from "@/components/QuoteCallButtons";
import { getLocationBySlug, getLocations, getPlantBySlug } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { localBusinessForLocationSchema } from "@/lib/schema";
import { siteConfig } from "@/config/site";

export function generateStaticParams() {
  return getLocations().map((l) => ({ city: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const location = getLocationBySlug(city);
  if (!location) return {};
  return buildMetadata({
    title: location.metaTitle,
    description: location.metaDescription,
    path: `/locations/${location.slug}/`,
  });
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const location = getLocationBySlug(city);
  if (!location) notFound();

  const popularPlants = location.popularPlantSlugs
    .map((s) => getPlantBySlug(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const mapQuery = encodeURIComponent(`${location.city}, ${location.stateAbbr}`);

  return (
    <div>
      <JsonLd
        data={localBusinessForLocationSchema(
          location.city,
          location.stateAbbr,
          location.latitude,
          location.longitude
        )}
      />
      <Breadcrumbs
        items={[
          { name: "Locations", path: "/locations/" },
          { name: `${location.city}, ${location.stateAbbr}`, path: `/locations/${location.slug}/` },
        ]}
      />

      <section className="container-page pb-4 pt-2">
        <h1 className="font-heading text-3xl font-bold text-primary md:text-4xl">
          Plant Nursery Serving {location.city}, {location.stateAbbr}
        </h1>
        <p className="mt-3 max-w-3xl leading-relaxed text-neutral-dark/75">
          {location.intro}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <QuoteCallButtons gradientId="location-icon-gold" />
        </div>
      </section>

      <section className="container-page grid gap-8 pb-14 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-border bg-white p-6">
            <h2 className="font-heading text-lg font-bold text-primary">
              Local Growing Conditions
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-dark/75">
              {location.soilNote}
            </p>
            <p className="mt-2 text-sm text-neutral-dark/60">
              USDA Hardiness Zone {location.zone} &nbsp;•&nbsp; {location.landmarkNote}
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6">
            <h2 className="font-heading text-lg font-bold text-primary">
              Delivery to {location.city}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-dark/75">
              {location.deliveryNote}
            </p>
            <p className="mt-2 text-sm text-neutral-dark/60">
              Standard delivery radius: {location.deliveryRadiusMiles} miles
              from our {siteConfig.primaryCity} nursery.
            </p>
          </div>
          <div className="aspect-video w-full overflow-hidden rounded-2xl border border-border">
            <iframe
              title={`Map of ${location.city}, ${location.stateAbbr}`}
              src={`https://maps.google.com/maps?q=${mapQuery}&z=11&output=embed`}
              className="h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-6">
          <h2 className="font-heading text-lg font-bold text-primary">NAP</h2>
          <address className="mt-2 not-italic text-sm leading-relaxed text-neutral-dark/75">
            {siteConfig.legalName}
            <br />
            {siteConfig.address.street}
            <br />
            {siteConfig.address.city}, {siteConfig.address.state}{" "}
            {siteConfig.address.zip}
            <br />
            <a href={siteConfig.phoneHref} className="text-accent hover:underline">
              {siteConfig.phone}
            </a>
          </address>
          <Link
            href="/locations/"
            className="mt-4 inline-block text-sm font-semibold text-accent hover:underline"
          >
            ← All Service Areas
          </Link>
        </div>
      </section>

      {popularPlants.length > 0 && (
        <section className="container-page pb-14">
          <h2 className="font-heading text-2xl font-bold text-primary">
            Popular Plants in {location.city}
          </h2>
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {popularPlants.map((p) => (
              <PlantCard key={p.slug} plant={p} />
            ))}
          </div>
          <Link href="/shop/" className="mt-4 inline-block text-sm font-semibold text-accent hover:underline">
            Shop All Plants →
          </Link>
        </section>
      )}
    </div>
  );
}
