import ShopGrid from "@/components/shop/ShopGrid";
import { ShopHeading } from "@/components/shop/ShopHeading";
import type { Category, Plant } from "@/lib/types";

/** The two <section>s that make up the shop page body, parameterized by
 * search query + already-filtered plant list. Rendered directly (server
 * component) for the static default case, and reused by the client-side
 * search variant so the two paths can never visually drift apart. */
export function ShopContent({
  query,
  plants,
  totalCount,
  categories,
}: {
  query: string;
  plants: Plant[];
  totalCount: number;
  categories: Category[];
}) {
  return (
    <>
      <section className="container-page pb-4 pt-8 text-center">
        <ShopHeading query={query} matchCount={plants.length} totalCount={totalCount} />
      </section>
      <section className="container-page pb-16">
        <ShopGrid plants={plants} categories={categories} />
      </section>
    </>
  );
}
