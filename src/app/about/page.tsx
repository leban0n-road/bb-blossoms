import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Star } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: `About Us | ${siteConfig.brandName}`,
  description: `${siteConfig.brandName} is a family-owned nursery in ${siteConfig.primaryCity}, ${siteConfig.primaryState}. Learn our story and why local homeowners trust us.`,
  path: "/about/",
});

export default function AboutPage() {
  return (
    <div className="page-frame">
      {/* Visible breadcrumb removed; structured data kept for SEO (no
          visible-UI footprint) — Home is still reachable via the main nav. */}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about/" },
        ])}
      />

      <section className="container-page pb-14 pt-8 text-center">
        <div className="mx-auto max-w-2xl">
          <h1 className="font-heading text-3xl font-bold text-primary md:text-4xl">
            Our Story
          </h1>
          <p className="mt-4 leading-relaxed text-neutral-dark/75">
            {siteConfig.brandName} started as a small backyard operation in{" "}
            {siteConfig.primaryCity}, {siteConfig.primaryStateName}, selling
            extra shrubs and trees to neighbors who kept asking where we got
            our plants. {siteConfig.yearsInBusiness}+ years later, we&rsquo;ve grown
            into a full nursery serving Gwinnett County and the surrounding
            metro — but we&rsquo;re still the same family-run operation, still
            hand-selecting every plant for how it actually performs in{" "}
            {siteConfig.primaryStateName}&rsquo;s heat, humidity, and clay soil.
          </p>
          <p className="mt-4 leading-relaxed text-neutral-dark/75">
            We don&rsquo;t stock what looks good on a distributor&rsquo;s catalog — we
            stock what survives its first Georgia summer. That philosophy
            shapes every recommendation our team makes, from a single
            foundation shrub to a full property installation.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <svg width="0" height="0" aria-hidden="true" className="absolute">
              <defs>
                <linearGradient id="about-icon-gold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f4d58d" />
                  <stop offset="50%" stopColor="#c9a227" />
                  <stop offset="100%" stopColor="#8b6914" />
                </linearGradient>
              </defs>
            </svg>
            <Link
              href="/quote/"
              className="btn-need tap-target inline-flex items-center gap-2 rounded-full border-[1.5px] border-gold bg-primary-dark/75 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark/90"
            >
              <FileText
                aria-hidden="true"
                size={17}
                strokeWidth={1.75}
                color="url(#about-icon-gold)"
                className="need-icon-glow icon-idle-sway icon-hover-overshoot shrink-0"
              />
              Get a Free Quote
            </Link>
            <Link
              href="/reviews/"
              className="btn-need tap-target inline-flex items-center gap-2 rounded-full border-[1.5px] border-gold bg-primary-dark/75 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark/90"
            >
              <Star
                aria-hidden="true"
                size={17}
                strokeWidth={1.75}
                color="url(#about-icon-gold)"
                className="need-icon-glow icon-idle-sway icon-hover-overshoot shrink-0"
              />
              Read Customer Reviews
            </Link>
          </div>
        </div>
      </section>

      <section className="container-page grid gap-5 pb-16 md:grid-cols-3">
        {[
          {
            title: "Locally Selected Inventory",
            body: "Every plant is chosen for Zone 8a performance — not just what's cheapest to ship in bulk.",
          },
          {
            title: "Real Advice, Not Upsells",
            body: "Our team will tell you when a cheaper plant is the better fit for your yard, not just the one with the biggest margin.",
          },
          {
            title: "Licensed & Insured",
            body: "Our delivery and installation crews are licensed and insured for residential landscaping work (placeholder — replace with final license/insurance details).",
          },
        ].map((item) => (
          <div key={item.title} className="rounded-2xl border border-border bg-white p-6">
            <h2 className="font-heading text-lg font-bold text-primary">
              {item.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-dark/70">
              {item.body}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
