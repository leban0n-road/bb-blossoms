import type { Metadata } from "next";
import Link from "next/link";
import { MessageSquare } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import FaqSection from "@/components/FaqSection";
import { getSiteFaqs } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: `Frequently Asked Questions | ${siteConfig.brandName}`,
  description: `Answers to common questions about ${siteConfig.brandName}'s plants, delivery, installation, and guarantee policies.`,
  path: "/faq/",
});

const extraFaqs = [
  {
    question: "What payment methods does BB Blossoms accept?",
    answer: "BB Blossoms accepts all major credit cards, debit cards, and cash for in-nursery purchases, with secure checkout available on every online order.",
  },
  {
    question: "Can I return a plant if it doesn't work out?",
    answer: "Unplanted, healthy plants can be returned within 14 days of purchase with a receipt; planted trees and shrubs are instead covered by our 1-year plant guarantee rather than a standard return policy.",
  },
  {
    question: "Do you offer wholesale or contractor pricing?",
    answer: "Yes — landscapers, builders, and property managers can apply for contractor pricing by contacting us directly with project volume details.",
  },
];

export default function FaqPage() {
  const faqs = [...getSiteFaqs(), ...extraFaqs];

  return (
    <div className="page-frame">
      {/* Visible breadcrumb removed; structured data kept for SEO (no
          visible-UI footprint) — Home is still reachable via the main nav. */}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq/" },
        ])}
      />
      <section className="container-page pb-4 pt-8 text-center">
        <h1 className="font-heading text-3xl font-bold text-primary md:text-4xl">
          Frequently Asked Questions
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-neutral-dark/75">
          Can&rsquo;t find your answer? Call us at{" "}
          <a href={siteConfig.phoneHref} className="text-accent hover:underline">
            {siteConfig.phone}
          </a>{" "}
          or send a message through our contact page.
        </p>
        <svg width="0" height="0" aria-hidden="true" className="absolute">
          <defs>
            <linearGradient id="faq-icon-gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f4d58d" />
              <stop offset="50%" stopColor="#c9a227" />
              <stop offset="100%" stopColor="#8b6914" />
            </linearGradient>
          </defs>
        </svg>
        <div className="mt-4 flex justify-center">
          <Link
            href="/contact/"
            className="btn-need tap-target inline-flex items-center gap-2 rounded-full border-[1.5px] border-gold bg-primary-dark/75 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark/90"
          >
            <MessageSquare
              aria-hidden="true"
              size={17}
              strokeWidth={1.75}
              color="url(#faq-icon-gold)"
              className="need-icon-glow icon-idle-sway icon-hover-overshoot shrink-0"
            />
            Contact Us
          </Link>
        </div>
      </section>
      <FaqSection faqs={faqs} title="" />
    </div>
  );
}
