"use client";

import { useSearchParams } from "next/navigation";
import { ShopContent } from "@/components/shop/ShopContent";
import type { Category, Plant } from "@/lib/types";

/** Reads the ?q= search query client-side and filters accordingly. Kept in
 * its own Suspense-wrapped client component (required by useSearchParams)
 * so only this piece — not the whole /shop route — opts out of static
 * generation. The Suspense fallback in page.tsx renders the identical
 * no-query output via the same ShopContent component, so hydration is
 * seamless for the common case. */
export default function ShopSearchAware({
  allPlants,
  categories,
}: {
  allPlants: Plant[];
  categories: Category[];
}) {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const plants = query
    ? allPlants.filter((p) =>
        `${p.name} ${p.description}`.toLowerCase().includes(query.toLowerCase())
      )
    : allPlants;

  return (
    <ShopContent query={query} plants={plants} totalCount={allPlants.length} categories={categories} />
  );
}
