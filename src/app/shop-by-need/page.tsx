import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { getNeeds } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: `Shop by Need | Find the Right Plant for Your Yard | ${siteConfig.brandName}`,
  description: `Not sure which plant to buy? Shop by need — privacy, deer-resistant, full sun, drought-tolerant & more — curated for ${siteConfig.primaryStateName} yards.`,
  path: "/shop-by-need/",
});

export default function ShopByNeedHub() {
  const needs = getNeeds();

  return (
    <div className="page-frame">
      {/* Visible breadcrumb removed; structured data kept for SEO (no
          visible-UI footprint) — Home is still reachable via the main nav. */}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Shop by Need", path: "/shop-by-need/" },
        ])}
      />
      <section className="container-page pb-4 pt-8">
        <h1 className="text-center font-heading text-3xl font-bold text-primary md:text-4xl">
          Shop by Need
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-center text-neutral-dark/75">
          Start with your yard&rsquo;s problem, not a plant name. We&rsquo;ve curated our
          catalog into collections built around the reasons customers
          actually come to us — privacy, deer pressure, tough soil, and more.
        </p>
      </section>
      <section className="container-page grid gap-4 pb-16 sm:grid-cols-2 lg:grid-cols-3">
        {needs.map((need) => (
          <Link
            key={need.slug}
            href={`/shop-by-need/${need.slug}/`}
            className="group rounded-2xl border border-gold/30 bg-white p-6 transition-shadow hover:shadow-lg"
          >
            <h2 className="font-heading text-lg font-bold text-primary group-hover:text-accent">
              {need.name}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-dark/70 line-clamp-3">
              {need.intro}
            </p>
            <span className="mt-3 inline-block text-sm font-semibold text-accent">
              Shop Now →
            </span>
          </Link>
        ))}
      </section>
    </div>
  );
}
