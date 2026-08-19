import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/lib/types";

// Real product photography exists today only for privacy-screening
// (green-giant-arborvitae.png) and flowering-shrubs (encore-azalea.png) —
// see src/content/categories.json `heroImage`. The remaining 7 categories
// (trees, georgia-favorites, fruit-plants, houseplants, ornamental-grasses,
// perennials, annuals-seasonal) still point at generated placeholder
// graphics. TEMP — swap those heroImage values for real photos as they
// become available; no component changes will be needed when you do.

function GoldFlourish() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 60 16"
      className="h-3 w-10 text-gold/70 md:h-4 md:w-14"
      fill="none"
    >
      <path
        d="M0 8 H22 M38 8 H60"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M30 2 L34 8 L30 14 L26 8 Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <section className="relative py-16 md:py-24">
      <div className="container-page">
        <div className="mb-10 text-center md:mb-14">
          <div className="flex items-center justify-center gap-4">
            <GoldFlourish />
            <h2 className="font-heading text-2xl font-bold uppercase tracking-[0.08em] text-gold md:text-3xl">
              Shop by Category
            </h2>
            <div className="rotate-180">
              <GoldFlourish />
            </div>
          </div>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.25em] text-gold/75 md:text-sm">
            Handpicked &amp; Grown for Georgia Yards
          </p>
          <div className="mt-4 flex items-center justify-center gap-2" aria-hidden="true">
            <span className="h-px w-10 bg-gold/50" />
            <span className="h-1.5 w-1.5 rotate-45 bg-gold/70" />
            <span className="h-px w-10 bg-gold/50" />
          </div>
        </div>

        {/* Single row at every breakpoint — never wraps. Scrolls
            horizontally when the viewport is too narrow to fit all 9. */}
        <div className="-mx-5 flex snap-x justify-start gap-6 overflow-x-auto px-5 pb-2 md:mx-0 md:justify-center md:px-0">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop/${cat.slug}/`}
              className="group flex w-24 shrink-0 snap-start flex-col items-center gap-3 sm:w-28"
            >
              <span className="relative block">
                <span className="relative flex h-24 w-24 items-center justify-center rounded-full border-2 border-gold/80 p-1 transition-transform duration-300 group-hover:scale-105 sm:h-28 sm:w-28">
                  <span className="relative block h-full w-full overflow-hidden rounded-full bg-primary/40">
                    <Image
                      src={cat.heroImage}
                      alt={`${cat.name} at BB Blossoms`}
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-1/2 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border border-gold bg-primary-dark text-xs font-bold text-gold shadow-md"
                >
                  ›
                </span>
              </span>
              <span className="text-center font-heading text-sm text-white transition-colors group-hover:text-gold md:text-base">
                {cat.shortName}
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center md:mt-14">
          <Link
            href="/shop/"
            className="tap-target inline-flex items-center gap-2 rounded-full border-2 border-gold px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-gold transition-colors hover:bg-gold hover:text-primary-dark"
          >
            View All Plants →
          </Link>
        </div>
      </div>
    </section>
  );
}
