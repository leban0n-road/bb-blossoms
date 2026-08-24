import type { Metadata } from "next";
import { Suspense } from "react";
import JsonLd from "@/components/JsonLd";
import { ShopContent } from "@/components/shop/ShopContent";
import ShopSearchAware from "@/components/shop/ShopSearchAware";
import { getAllPlants, getCategories } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: `Shop All Plants, Trees & Shrubs | ${siteConfig.brandName}`,
  description: `Browse the full ${siteConfig.brandName} catalog of trees, shrubs, and flowers for ${siteConfig.primaryStateName} yards. Filter by category, sort by price, and shop with local delivery.`,
  path: "/shop/",
});

// No searchParams read here — that's what let this route be a dynamic
// (server-rendered-on-every-request) page before, even for the 99%+ of
// visits with no ?q=. The search-query variant now lives entirely in
// ShopSearchAware (a client component), isolated behind Suspense so only
// it opts out of static generation; the fallback below renders the exact
// same default output via ShopContent, so hydration for the common,
// no-query case is seamless — no loading flash, no layout shift.
export default function ShopPage() {
  const allPlants = getAllPlants();
  const categories = getCategories();

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
      <Suspense
        fallback={
          <ShopContent query="" plants={allPlants} totalCount={allPlants.length} categories={categories} />
        }
      >
        <ShopSearchAware allPlants={allPlants} categories={categories} />
      </Suspense>
    </div>
  );
}
