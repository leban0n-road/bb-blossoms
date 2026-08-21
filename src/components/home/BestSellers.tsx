import Link from "next/link";
import PlantCard from "@/components/PlantCard";
import type { Plant } from "@/lib/types";

export default function BestSellers({ plants }: { plants: Plant[] }) {
  if (!plants.length) return null;

  return (
    <section className="py-10 md:py-14">
      <div className="container-page">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-heading text-2xl font-bold text-plaque-gold md:text-3xl">
              Best Sellers
            </h2>
            <p className="mt-1 text-sm text-white/70">
              The varieties our customers plant again and again.
            </p>
          </div>
          <Link href="/shop/" className="hidden text-sm font-semibold text-plaque-gold hover:underline sm:inline">
            Shop All →
          </Link>
        </div>
        <div className="-mx-5 flex snap-x gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-4 md:gap-5 md:overflow-visible md:px-0 lg:grid-cols-5">
          {plants.slice(0, 10).map((plant) => (
            <div key={plant.slug} className="w-40 shrink-0 snap-start md:w-auto">
              <PlantCard plant={plant} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
