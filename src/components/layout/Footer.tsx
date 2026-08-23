import Image from "next/image";
import Link from "next/link";
import { CreditCard, Leaf, Lock, ShieldCheck } from "lucide-react";
import { FaFacebookF, FaInstagram, FaPinterestP, FaYoutube } from "react-icons/fa6";
import { siteConfig } from "@/config/site";
import type { Category } from "@/lib/types";
import SocialIconButton from "@/components/layout/SocialIconButton";

export default function Footer({ categories }: { categories: Category[] }) {
  return (
    <footer className="relative mt-16 overflow-hidden bg-primary-dark text-white pb-24 lg:pb-0">
      <Image
        src="/images/landing-page/wallpaper.jpg"
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
          <Link href="/" className="group flex items-center gap-2">
            <Leaf aria-hidden="true" size={28} strokeWidth={2} className="-rotate-12 text-white" />
            <span className="font-heading text-lg font-bold text-white group-hover:text-accent group-focus-visible:text-accent md:text-xl">
              {siteConfig.brandName}
            </span>
          </Link>
          <p className="mt-3 text-sm text-white/70">{siteConfig.tagline}</p>
          {/* Same gradient technique used sitewide for metallic icons,
              distinct id since Footer renders on every page. Rendered once
              here and shared by all 4 buttons below via url(#...). */}
          <svg width="0" height="0" aria-hidden="true" className="absolute">
            <defs>
              <linearGradient id="footer-social-gold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f4d58d" />
                <stop offset="50%" stopColor="#c9a227" />
                <stop offset="100%" stopColor="#8b6914" />
              </linearGradient>
            </defs>
          </svg>
          <div className="mt-4 flex gap-3">
            {/* Deliberately not links — no href, no navigation. See
                SocialIconButton: a real <button> with only a no-op
                press-animation onClick. Real profile URLs still live in
                siteConfig.social for reference/future use. */}
            <SocialIconButton label="Facebook">
              <FaFacebookF aria-hidden="true" size={14} color="url(#footer-social-gold)" />
            </SocialIconButton>
            <SocialIconButton label="Instagram">
              <FaInstagram aria-hidden="true" size={16} color="url(#footer-social-gold)" />
            </SocialIconButton>
            <SocialIconButton label="Pinterest">
              <FaPinterestP aria-hidden="true" size={16} color="url(#footer-social-gold)" />
            </SocialIconButton>
            <SocialIconButton label="YouTube">
              <FaYoutube aria-hidden="true" size={16} color="url(#footer-social-gold)" />
            </SocialIconButton>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-white/60">
            Shop
          </h3>
          <ul className="space-y-2 text-sm">
            {categories.slice(0, 6).map((c) => (
              <li key={c.slug}>
                <Link href={`/shop/${c.slug}/`} className="nav-link text-white/85 hover:text-accent">
                  {c.shortName}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/shop/" className="nav-link text-white/85 hover:text-accent">
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
              <Link href="/about/" className="nav-link text-white/85 hover:text-accent">
                Our Story
              </Link>
            </li>
            <li>
              <Link href="/reviews/" className="nav-link text-white/85 hover:text-accent">
                Reviews
              </Link>
            </li>
            <li>
              <Link href="/guides/" className="nav-link text-white/85 hover:text-accent">
                Growing Guides
              </Link>
            </li>
            <li>
              <Link href="/locations/" className="nav-link text-white/85 hover:text-accent">
                Locations We Serve
              </Link>
            </li>
            <li>
              <Link href="/services/" className="nav-link text-white/85 hover:text-accent">
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
              <Link href="/faq/" className="nav-link text-white/85 hover:text-accent">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/quote/" className="nav-link text-white/85 hover:text-accent">
                Get a Free Quote
              </Link>
            </li>
            <li>
              <Link href="/contact/" className="nav-link text-white/85 hover:text-accent">
                Contact Us
              </Link>
            </li>
            <li>
              <a href={siteConfig.phoneHref} className="nav-link text-white/85 hover:text-accent">
                {siteConfig.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.email}`} className="nav-link text-white/85 hover:text-accent">
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
          <div className="flex items-center gap-3 md:justify-end" aria-label="Accepted payment methods">
            <span title="Visa">
              <CreditCard
                aria-hidden="true"
                size={22}
                strokeWidth={1.75}
                color="url(#footer-social-gold)"
                className="need-icon-glow"
              />
            </span>
            <span title="Secure checkout">
              <Lock
                aria-hidden="true"
                size={20}
                strokeWidth={1.75}
                color="url(#footer-social-gold)"
                className="need-icon-glow"
              />
            </span>
            <span title="Licensed & Insured">
              <ShieldCheck
                aria-hidden="true"
                size={20}
                strokeWidth={1.75}
                color="url(#footer-social-gold)"
                className="need-icon-glow"
              />
            </span>
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
