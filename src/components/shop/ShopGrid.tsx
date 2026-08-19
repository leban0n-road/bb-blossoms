"use client";

import { useMemo, useState } from "react";
import PlantCard from "@/components/PlantCard";
import type { Category, Plant } from "@/lib/types";

type SortKey = "featured" | "price-asc" | "price-desc" | "name-asc";

export default function ShopGrid({
  plants,
  categories,
  showCategoryFilter = true,
}: {
  plants: Plant[];
  categories?: Category[];
  showCategoryFilter?: boolean;
}) {
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [sort, setSort] = useState<SortKey>("featured");

  const filtered = useMemo(() => {
    let result =
      categoryFilter === "all"
        ? plants
        : plants.filter((p) => p.category === categoryFilter);

    result = [...result];
    switch (sort) {
      case "price-asc":
        result.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
        break;
      case "price-desc":
        result.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        result.sort((a, b) => Number(b.flagship) - Number(a.flagship));
    }
    return result;
  }, [plants, categoryFilter, sort]);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-white p-4">
        <p className="text-sm text-neutral-dark/70">
          {filtered.length} plant{filtered.length === 1 ? "" : "s"}
        </p>
        <div className="flex flex-wrap gap-3">
          {showCategoryFilter && categories && (
            <label className="flex items-center gap-2 text-sm">
              <span className="sr-only">Filter by category</span>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="tap-target rounded-lg border border-border bg-white px-3 py-2 text-sm"
              >
                <option value="all">All Categories</option>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.shortName}
                  </option>
                ))}
              </select>
            </label>
          )}
          <label className="flex items-center gap-2 text-sm">
            <span className="sr-only">Sort by</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="tap-target rounded-lg border border-border bg-white px-3 py-2 text-sm"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A–Z</option>
            </select>
          </label>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border p-10 text-center text-neutral-dark/60">
          New inventory for this category is on the way — call us and we can
          special-order it for you.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {filtered.map((plant) => (
            <PlantCard key={plant.slug} plant={plant} />
          ))}
        </div>
      )}
    </div>
  );
}
