import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getGuides } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: `Growing Guides & Plant Care Tips for ${siteConfig.primaryStateName} | ${siteConfig.brandName}`,
  description: `Planting guides, plant care tips, and buying advice for ${siteConfig.primaryStateName} homeowners — written by the ${siteConfig.brandName} team.`,
  path: "/guides/",
});

export default function GuidesHub() {
  const guides = getGuides();

  return (
    <div className="page-frame">
      <Breadcrumbs items={[{ name: "Guides", path: "/guides/" }]} />
      <section className="container-page pb-4 pt-2">
        <h1 className="font-heading text-3xl font-bold text-primary md:text-4xl">
          Growing Guides
        </h1>
        <p className="mt-3 max-w-2xl text-neutral-dark/75">
          Practical, {siteConfig.primaryStateName}-specific planting and care
          advice from the {siteConfig.brandName} team — no generic national
          gardening tips that don&rsquo;t work in Zone {siteConfig.usdaZone}.
        </p>
      </section>
      <section className="container-page grid gap-5 pb-16 sm:grid-cols-2 lg:grid-cols-3">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}/`}
            className="group flex flex-col rounded-2xl border border-border bg-white p-6 transition-shadow hover:shadow-lg"
          >
            <span className="text-xs font-bold uppercase tracking-wide text-accent">
              {guide.category}
            </span>
            <h2 className="mt-2 font-heading text-lg font-bold text-primary group-hover:text-accent">
              {guide.title}
            </h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-dark/70 line-clamp-3">
              {guide.excerpt}
            </p>
            <p className="mt-4 text-xs text-neutral-dark/50">
              {guide.readMinutes} min read
            </p>
          </Link>
        ))}
      </section>
    </div>
  );
}
