import Link from "next/link";
import { siteConfig } from "@/config/site";
import type { LocationPage } from "@/lib/types";

export default function LocationsStrip({ locations }: { locations: LocationPage[] }) {
  const cityPages = locations.filter((l) => l.slug !== "gwinnett-county-ga");

  const mapQuery = encodeURIComponent(
    `${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.state} ${siteConfig.address.zip}`
  );

  return (
    <section className="py-10 md:py-14">
      <div className="container-page grid gap-8 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="font-heading text-2xl font-bold text-plaque-gold md:text-3xl">
            Proudly Serving Gwinnett County &amp; Beyond
          </h2>
          <p className="mt-2 text-sm text-white/70">
            Local delivery and installation across the {siteConfig.primaryStateName} metro area.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {cityPages.map((loc) => (
              <Link
                key={loc.slug}
                href={`/locations/${loc.slug}/`}
                className="rounded-full border border-gold/30 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:border-gold hover:text-gold"
              >
                {loc.city}, {loc.stateAbbr}
              </Link>
            ))}
          </div>
          <Link
            href="/locations/"
            className="mt-5 inline-block text-sm font-semibold text-plaque-gold hover:underline"
          >
            View All Service Areas →
          </Link>
        </div>
        <div className="aspect-video w-full overflow-hidden rounded-2xl border border-gold/30">
          <iframe
            title={`Map of ${siteConfig.brandName} in ${siteConfig.address.city}, ${siteConfig.address.state}`}
            src={`https://maps.google.com/maps?q=${mapQuery}&z=11&output=embed`}
            className="h-full w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
