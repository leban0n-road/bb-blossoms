import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import type { Category } from "@/lib/types";

export default function Footer({ categories }: { categories: Category[] }) {
  return (
    <footer className="relative mt-16 overflow-hidden bg-primary-dark text-white pb-24 lg:pb-0">
      <Image
        src="/images/landing-page/wallpaper.png"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-primary-dark/70" />
      <div className="relative z-10">
      <div className="container-page grid grid-cols-2 gap-8 py-12 md:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl" aria-hidden="true">
              🌿
            </span>
            <span className="font-heading text-lg font-bold">
              {siteConfig.brandName}
            </span>
          </Link>
          <p className="mt-3 text-sm text-white/70">{siteConfig.tagline}</p>
          <div className="mt-4 flex gap-3 text-lg">
            <a href={siteConfig.social.facebook} aria-label="Facebook" className="hover:text-accent-light">
              📘
            </a>
            <a href={siteConfig.social.instagram} aria-label="Instagram" className="hover:text-accent-light">
              📷
            </a>
            <a href={siteConfig.social.pinterest} aria-label="Pinterest" className="hover:text-accent-light">
              📌
            </a>
            <a href={siteConfig.social.youtube} aria-label="YouTube" className="hover:text-accent-light">
              ▶️
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-white/60">
            Shop
          </h3>
          <ul className="space-y-2 text-sm">
            {categories.slice(0, 6).map((c) => (
              <li key={c.slug}>
                <Link href={`/shop/${c.slug}/`} className="text-white/85 hover:text-accent-light">
                  {c.shortName}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/shop/" className="text-white/85 hover:text-accent-light">
                Shop All
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-white/60">
            Company
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/about/" className="text-white/85 hover:text-accent-light">
                Our Story
              </Link>
            </li>
            <li>
              <Link href="/reviews/" className="text-white/85 hover:text-accent-light">
                Reviews
              </Link>
            </li>
            <li>
              <Link href="/guides/" className="text-white/85 hover:text-accent-light">
                Growing Guides
              </Link>
            </li>
            <li>
              <Link href="/locations/" className="text-white/85 hover:text-accent-light">
                Locations We Serve
              </Link>
            </li>
            <li>
              <Link href="/services/" className="text-white/85 hover:text-accent-light">
                Delivery &amp; Installation
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-white/60">
            Support
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/faq/" className="text-white/85 hover:text-accent-light">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/quote/" className="text-white/85 hover:text-accent-light">
                Get a Free Quote
              </Link>
            </li>
            <li>
              <Link href="/contact/" className="text-white/85 hover:text-accent-light">
                Contact Us
              </Link>
            </li>
            <li>
              <a href={siteConfig.phoneHref} className="text-white/85 hover:text-accent-light">
                {siteConfig.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.email}`} className="text-white/85 hover:text-accent-light">
                {siteConfig.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page grid gap-6 py-8 md:grid-cols-2 md:items-center">
          <address className="not-italic text-sm text-white/70">
            {siteConfig.legalName}
            <br />
            {siteConfig.address.street}, {siteConfig.address.city},{" "}
            {siteConfig.address.state} {siteConfig.address.zip}
            <br />
            {siteConfig.hours[0].day}–{siteConfig.hours[4].day}:{" "}
            {siteConfig.hours[0].open}–{siteConfig.hours[0].close} &nbsp;|&nbsp; Sat:{" "}
            {siteConfig.hours[5].open}–{siteConfig.hours[5].close} &nbsp;|&nbsp; Sun:{" "}
            {siteConfig.hours[6].open}–{siteConfig.hours[6].close}
          </address>
          <div className="flex gap-3 text-2xl md:justify-end" aria-label="Accepted payment methods">
            <span title="Visa">💳</span>
            <span title="Secure checkout">🔒</span>
            <span title="Licensed & Insured">🛡️</span>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page py-6 text-xs text-white/60">
          <p className="mx-auto max-w-3xl text-center italic">
            {siteConfig.footerLegalCopy}
          </p>
          <p className="mt-3 text-center">{siteConfig.copyrightLine}</p>
        </div>
      </div>
      </div>
    </footer>
  );
}
