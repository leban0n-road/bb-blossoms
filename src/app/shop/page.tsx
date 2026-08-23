import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import ShopGrid from "@/components/shop/ShopGrid";
import { LinkButton } from "@/components/ui/Button";
import { getAllPlants, getCategories } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: `Shop All Plants, Trees & Shrubs | ${siteConfig.brandName}`,
  description: `Browse the full ${siteConfig.brandName} catalog of trees, shrubs, and flowers for ${siteConfig.primaryStateName} yards. Filter by category, sort by price, and shop with local delivery.`,
  path: "/shop/",
});

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const allPlants = getAllPlants();
  const categories = getCategories();

  const plants = q
    ? allPlants.filter((p) =>
        `${p.name} ${p.description}`.toLowerCase().includes(q.toLowerCase())
      )
    : allPlants;

  return (
    <div className="page-frame">
      {/* Visible breadcrumb removed; structured data kept for SEO (no
          visible-UI footprint) — Home is still reachable via the main nav. */}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Shop", path: "/shop/" },
        ])}
      />
      <section className="container-page pb-4 pt-8 text-center">
        <h1 className="font-heading text-3xl font-bold text-primary md:text-4xl">
          {q ? `Search Results for "${q}"` : "Shop All Plants"}
        </h1>
        <p className="mx-auto mt-2 max-w-2xl text-neutral-dark/70">
          {q
            ? `${plants.length} plant${plants.length === 1 ? "" : "s"} matched your search.`
            : `${allPlants.length}+ trees, shrubs, and flowers selected for ${siteConfig.primaryStateName} Zone ${siteConfig.usdaZone} yards, with local delivery and professional installation available.`}
        </p>
        <div className="mt-4 flex justify-center">
          <LinkButton href="/quote/" variant="outline">
            Not sure what to buy? Get a Free Design Quote
          </LinkButton>
        </div>
      </section>
      <section className="container-page pb-16">
        <ShopGrid plants={plants} categories={categories} />
      </section>
    </div>
  );
}
