import Image from "next/image";
import Link from "next/link";
import type { Plant } from "@/lib/types";

export default function PlantCard({ plant }: { plant: Plant }) {
  const onSale = typeof plant.salePrice === "number";

  return (
    <Link
      href={`/shop/${plant.category}/${plant.slug}/`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-primary-light/10">
        <Image
          src={plant.image}
          alt={`${plant.name} for sale in ${plant.potSize} pot at BB Blossoms`}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {onSale && (
          <span className="absolute left-3 top-3 rounded-full bg-sale px-3 py-1 text-xs font-bold text-white">
            Sale
          </span>
        )}
        {plant.flagship && !onSale && (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">
            Best Seller
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="font-heading text-base font-semibold text-neutral-dark leading-snug group-hover:text-accent">
          {plant.name}
        </h3>
        <p className="text-xs text-neutral-dark/60">{plant.potSize}</p>
        <div className="mt-auto flex items-baseline gap-2 pt-2">
          {onSale ? (
            <>
              <span className="text-lg font-bold text-sale">
                ${plant.salePrice}
              </span>
              <span className="text-sm text-neutral-dark/50 line-through">
                ${plant.price}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-primary">
              ${plant.price}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
