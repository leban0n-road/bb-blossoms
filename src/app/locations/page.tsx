import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { getLocations } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: `Service Areas | Plant Delivery Across ${siteConfig.primaryStateName} | ${siteConfig.brandName}`,
  description: `${siteConfig.brandName} delivers and installs plants across Gwinnett County, ${siteConfig.primaryStateName}. See delivery details for your city.`,
  path: "/locations/",
});

export default function LocationsHub() {
  const locations = getLocations();

  return (
    <div className="page-frame">
      {/* Visible breadcrumb removed; structured data kept for SEO (no
          visible-UI footprint) — Home is still reachable via the main nav. */}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations/" },
        ])}
      />
      <section className="container-page pb-4 pt-8">
        <h1 className="text-center font-heading text-3xl font-bold text-primary md:text-4xl">
          Where We Deliver &amp; Install
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-center text-neutral-dark/75">
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
            className="group rounded-2xl border border-gold/30 bg-white p-6 transition-shadow hover:shadow-lg"
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
