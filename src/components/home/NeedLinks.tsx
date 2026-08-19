import Link from "next/link";
import type { NeedCollection } from "@/lib/types";

export default function NeedLinks({ needs }: { needs: NeedCollection[] }) {
  return (
    <section className="py-10 md:py-14">
      <div className="container-page">
        <div className="mb-8">
          <h2 className="font-heading text-2xl font-bold text-gold md:text-3xl">
            Shop by Need
          </h2>
          <p className="mt-1 text-sm text-white/70">
            Not sure what plant you need? Start with your problem instead.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {needs.map((need) => (
            <Link
              key={need.slug}
              href={`/shop-by-need/${need.slug}/`}
              className="tap-target flex items-center justify-center rounded-xl border-2 border-gold/40 bg-white/5 px-4 py-4 text-center text-sm font-semibold text-white transition-colors hover:border-gold hover:bg-gold/10 hover:text-gold"
            >
              {need.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
