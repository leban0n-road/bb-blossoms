import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getLocations } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: `Service Areas | Plant Delivery Across ${siteConfig.primaryStateName} | ${siteConfig.brandName}`,
  description: `${siteConfig.brandName} delivers and installs plants across Gwinnett County, ${siteConfig.primaryStateName}. See delivery details for your city.`,
  path: "/locations/",
});

export default function LocationsHub() {
  const locations = getLocations();

  return (
    <div>
      <Breadcrumbs items={[{ name: "Locations", path: "/locations/" }]} />
      <section className="container-page pb-4 pt-2">
        <h1 className="font-heading text-3xl font-bold text-primary md:text-4xl">
          Where We Deliver &amp; Install
        </h1>
        <p className="mt-3 max-w-2xl text-neutral-dark/75">
          {siteConfig.brandName} is based in {siteConfig.primaryCity},{" "}
          {siteConfig.primaryState}, and delivers plants, trees, and shrubs
          throughout Gwinnett County and the surrounding metro area.
        </p>
      </section>
      <section className="container-page grid gap-4 pb-16 sm:grid-cols-2 lg:grid-cols-3">
        {locations.map((loc) => (
          <Link
            key={loc.slug}
            href={`/locations/${loc.slug}/`}
            className="group rounded-2xl border border-border bg-white p-6 transition-shadow hover:shadow-lg"
          >
            <h2 className="font-heading text-lg font-bold text-primary group-hover:text-accent">
              {loc.city}, {loc.stateAbbr}
            </h2>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-neutral-dark/50">
              {loc.county}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-neutral-dark/70 line-clamp-3">
              {loc.landmarkNote}
            </p>
            <span className="mt-3 inline-block text-sm font-semibold text-accent">
              View Details →
            </span>
          </Link>
        ))}
      </section>
    </div>
  );
}
