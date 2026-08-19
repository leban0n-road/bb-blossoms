"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import type { Category } from "@/lib/types";
import CartButton from "@/components/layout/CartButton";

export default function Header({ categories }: { categories: Category[] }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-neutral-bg/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4 md:h-20">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="text-2xl" aria-hidden="true">
            🌿
          </span>
          <span className="font-heading text-lg font-bold text-primary md:text-xl">
            {siteConfig.brandName}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          <div
            className="relative"
            onMouseEnter={() => setShopOpen(true)}
            onMouseLeave={() => setShopOpen(false)}
          >
            <button
              className="tap-target flex items-center gap-1 text-sm font-semibold text-neutral-dark hover:text-accent"
              aria-expanded={shopOpen}
              onClick={() => setShopOpen((v) => !v)}
            >
              Shop Plants
              <span aria-hidden="true">▾</span>
            </button>
            {shopOpen && (
              <div className="absolute left-1/2 top-full grid w-[640px] -translate-x-1/2 grid-cols-3 gap-1 rounded-2xl border border-border bg-white p-4 shadow-xl">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/shop/${cat.slug}/`}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-neutral-dark hover:bg-neutral-bg hover:text-accent"
                    onClick={() => setShopOpen(false)}
                  >
                    <span aria-hidden="true">{cat.icon}</span>
                    {cat.shortName}
                  </Link>
                ))}
                <Link
                  href="/shop/"
                  className="col-span-3 mt-2 rounded-lg bg-neutral-bg px-3 py-2 text-center text-sm font-semibold text-accent hover:bg-accent-light/30"
                >
                  Shop All Plants →
                </Link>
              </div>
            )}
          </div>
          <Link href="/shop-by-need/" className="text-sm font-semibold text-neutral-dark hover:text-accent">
            Shop by Need
          </Link>
          <Link href="/locations/" className="text-sm font-semibold text-neutral-dark hover:text-accent">
            Locations
          </Link>
          <Link href="/services/" className="text-sm font-semibold text-neutral-dark hover:text-accent">
            Services
          </Link>
          <Link href="/guides/" className="text-sm font-semibold text-neutral-dark hover:text-accent">
            Guides
          </Link>
          <Link href="/about/" className="text-sm font-semibold text-neutral-dark hover:text-accent">
            About
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <form
            action="/shop/"
            method="GET"
            role="search"
            className="hidden items-center rounded-xl border border-border bg-white px-3 py-1.5 xl:flex"
          >
            <label htmlFor="site-search" className="sr-only">
              Search plants
            </label>
            <input
              id="site-search"
              name="q"
              type="search"
              placeholder="Search plants…"
              className="w-40 bg-transparent text-sm focus:outline-none"
            />
            <button type="submit" aria-label="Search" className="text-neutral-dark/60 hover:text-accent">
              🔍
            </button>
          </form>
          <a
            href={siteConfig.phoneHref}
            className="tap-target hidden items-center gap-2 rounded-xl border-2 border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-primary hover:text-white md:flex"
          >
            📞 {siteConfig.phone}
          </a>
          <Link
            href="/quote/"
            className="tap-target hidden rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-dark sm:inline-flex sm:items-center"
          >
            Get a Free Quote
          </Link>
          <CartButton />
          <button
            className="tap-target inline-flex items-center justify-center rounded-lg p-2 text-neutral-dark lg:hidden"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="text-2xl" aria-hidden="true">
              {menuOpen ? "✕" : "☰"}
            </span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-border bg-white lg:hidden">
          <nav className="container-page flex flex-col gap-1 py-4" aria-label="Mobile">
            <p className="px-2 pb-1 pt-2 text-xs font-bold uppercase tracking-wide text-neutral-dark/50">
              Shop by Category
            </p>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/shop/${cat.slug}/`}
                className="tap-target flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-neutral-dark hover:bg-neutral-bg"
                onClick={() => setMenuOpen(false)}
              >
                <span aria-hidden="true">{cat.icon}</span>
                {cat.shortName}
              </Link>
            ))}
            <div className="my-2 border-t border-border" />
            {[
              ["Shop by Need", "/shop-by-need/"],
              ["Locations", "/locations/"],
              ["Services", "/services/"],
              ["Guides", "/guides/"],
              ["About", "/about/"],
              ["Reviews", "/reviews/"],
              ["FAQ", "/faq/"],
              ["Contact", "/contact/"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="tap-target rounded-lg px-2 py-2 text-sm font-semibold text-neutral-dark hover:bg-neutral-bg"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            <a
              href={siteConfig.phoneHref}
              className="tap-target mt-3 flex items-center justify-center gap-2 rounded-xl border-2 border-primary px-4 py-3 text-sm font-semibold text-primary"
            >
              📞 Call {siteConfig.phone}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
