import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getNeeds } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: `Shop by Need | Find the Right Plant for Your Yard | ${siteConfig.brandName}`,
  description: `Not sure which plant to buy? Shop by need — privacy, deer-resistant, full sun, drought-tolerant & more — curated for ${siteConfig.primaryStateName} yards.`,
  path: "/shop-by-need/",
});

export default function ShopByNeedHub() {
  const needs = getNeeds();

  return (
    <div>
      <Breadcrumbs items={[{ name: "Shop by Need", path: "/shop-by-need/" }]} />
      <section className="container-page pb-4 pt-2">
        <h1 className="font-heading text-3xl font-bold text-primary md:text-4xl">
          Shop by Need
        </h1>
        <p className="mt-3 max-w-2xl text-neutral-dark/75">
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
            className="group rounded-2xl border border-border bg-white p-6 transition-shadow hover:shadow-lg"
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
