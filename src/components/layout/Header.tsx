"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Leaf, Phone, Search } from "lucide-react";
import { useEffect, useState, type MouseEvent } from "react";
import { siteConfig } from "@/config/site";
import type { Category } from "@/lib/types";
import CartButton from "@/components/layout/CartButton";

export default function Header({ categories }: { categories: Category[] }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On the homepage, clicking the logo shouldn't just no-op (Next.js skips
  // navigation when href matches the current route) — scroll to top instead,
  // matching standard logo behavior. Off the homepage, the Link's normal
  // client-side navigation to "/" already lands at the top on its own.
  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/") return;
    event.preventDefault();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <header
      className={`nav-gradient-gold sticky top-0 z-40 border-b border-[color:var(--color-nav-bronze)] transition-shadow duration-300 ${
        scrolled ? "shadow-[0_2px_8px_rgba(0,0,0,0.15)]" : ""
      }`}
    >
      {/* Same gradient technique as Hero/NeedLinks/WhyUs, distinct id since
          Header renders on every page alongside whichever of those also
          render on the current page. */}
      <svg width="0" height="0" aria-hidden="true" className="absolute">
        <defs>
          <linearGradient id="nav-icon-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f4d58d" />
            <stop offset="50%" stopColor="#c9a227" />
            <stop offset="100%" stopColor="#8b6914" />
          </linearGradient>
        </defs>
      </svg>
      <div
        className={`container-page flex items-center justify-between gap-4 transition-[height] duration-300 ease-in-out ${
          scrolled ? "h-11 md:h-12" : "h-14 md:h-16"
        }`}
      >
        <Link
          href="/"
          onClick={handleLogoClick}
          aria-label={`${siteConfig.brandName} home`}
          className="flex shrink-0 items-center gap-2"
        >
          <Leaf aria-hidden="true" size={22} strokeWidth={2} className="-rotate-12 text-primary" />
          <span className="font-heading text-lg font-bold text-black md:text-xl">
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
              className="nav-link tap-target flex items-center gap-1 text-sm font-semibold text-black hover:text-accent"
              aria-expanded={shopOpen}
              onClick={() => setShopOpen((v) => !v)}
            >
              Shop Plants
              <span aria-hidden="true">▾</span>
            </button>
            {shopOpen && (
              <div className="absolute left-1/2 top-full grid w-[640px] -translate-x-1/2 grid-cols-3 gap-1 rounded-2xl border border-gold/25 bg-primary-dark p-4 shadow-xl">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/shop/${cat.slug}/`}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-white hover:bg-white/10 hover:text-gold"
                    onClick={() => setShopOpen(false)}
                  >
                    <span className="relative block h-9 w-9 shrink-0 overflow-hidden rounded-full border border-gold/70 p-0.5">
                      <span className="relative block h-full w-full overflow-hidden rounded-full bg-primary/40">
                        <Image
                          src={cat.heroImage}
                          alt=""
                          aria-hidden="true"
                          fill
                          sizes="36px"
                          className="object-cover"
                        />
                      </span>
                    </span>
                    <span className="font-heading">{cat.shortName}</span>
                  </Link>
                ))}
                <Link
                  href="/shop/"
                  className="col-span-3 mt-2 rounded-lg border border-gold/40 bg-white/5 px-3 py-2 text-center text-sm font-semibold text-gold hover:bg-gold hover:text-primary-dark"
                >
                  Shop All Plants →
                </Link>
              </div>
            )}
          </div>
          <Link href="/shop-by-need/" className="nav-link text-sm font-semibold text-black hover:text-accent">
            Shop by Need
          </Link>
          <Link href="/locations/" className="nav-link text-sm font-semibold text-black hover:text-accent">
            Locations
          </Link>
          <Link href="/services/" className="nav-link text-sm font-semibold text-black hover:text-accent">
            Services
          </Link>
          <Link href="/guides/" className="nav-link text-sm font-semibold text-black hover:text-accent">
            Guides
          </Link>
          <Link href="/about/" className="nav-link text-sm font-semibold text-black hover:text-accent">
            About
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <form
            action="/shop/"
            method="GET"
            role="search"
            className="btn-need hidden items-center gap-2 rounded-xl border-[1.5px] border-gold bg-primary-dark/65 px-3 py-1.5 xl:flex"
          >
            <label htmlFor="site-search" className="sr-only">
              Search plants
            </label>
            <input
              id="site-search"
              name="q"
              type="search"
              placeholder="Search plants…"
              className="w-40 bg-transparent text-sm text-white placeholder:text-white/70 focus:outline-none"
            />
            <button type="submit" aria-label="Search" className="shrink-0">
              <Search
                aria-hidden="true"
                size={15}
                strokeWidth={2}
                color="url(#nav-icon-gold)"
                className="need-icon-glow icon-idle-sway icon-hover-overshoot"
              />
            </button>
          </form>
          <a
            href={siteConfig.phoneHref}
            className="btn-need tap-target hidden shrink-0 items-center gap-2 whitespace-nowrap rounded-xl border-[1.5px] border-gold bg-primary-dark/65 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark/80 md:flex"
          >
            <Phone
              aria-hidden="true"
              size={15}
              strokeWidth={2}
              color="url(#nav-icon-gold)"
              className="need-icon-glow icon-idle-sway icon-hover-overshoot shrink-0"
            />
            {siteConfig.phone}
          </a>
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
        <div className="nav-gradient-gold border-t border-primary-dark/15 lg:hidden">
          <nav className="container-page flex flex-col gap-1 py-4" aria-label="Mobile">
            <p className="px-2 pb-1 pt-2 text-xs font-bold uppercase tracking-wide text-neutral-dark/50">
              Shop by Category
            </p>
            <div className="flex flex-col gap-1 rounded-2xl border border-gold/25 bg-primary-dark p-2">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/shop/${cat.slug}/`}
                  className="tap-target flex items-center gap-3 rounded-lg px-2 py-2 text-sm text-white hover:bg-white/10 hover:text-gold"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="relative block h-8 w-8 shrink-0 overflow-hidden rounded-full border border-gold/70 p-0.5">
                    <span className="relative block h-full w-full overflow-hidden rounded-full bg-primary/40">
                      <Image
                        src={cat.heroImage}
                        alt=""
                        aria-hidden="true"
                        fill
                        sizes="32px"
                        className="object-cover"
                      />
                    </span>
                  </span>
                  <span className="font-heading">{cat.shortName}</span>
                </Link>
              ))}
              <Link
                href="/shop/"
                className="mt-1 rounded-lg border border-gold/40 bg-white/5 px-3 py-2 text-center text-sm font-semibold text-gold hover:bg-gold hover:text-primary-dark"
                onClick={() => setMenuOpen(false)}
              >
                Shop All Plants →
              </Link>
            </div>
            <div className="my-2 border-t border-primary-dark/15" />
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
                className="tap-target rounded-lg px-2 py-2 text-sm font-semibold text-black hover:bg-white/25"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            <a
              href={siteConfig.phoneHref}
              className="btn-need tap-target mt-3 flex items-center justify-center gap-2 rounded-xl border-[1.5px] border-gold bg-primary-dark/65 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark/80"
            >
              <Phone
                aria-hidden="true"
                size={16}
                strokeWidth={2}
                color="url(#nav-icon-gold)"
                className="need-icon-glow icon-idle-sway icon-hover-overshoot shrink-0"
              />
              Call {siteConfig.phone}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
