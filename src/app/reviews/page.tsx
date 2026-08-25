import type { Metadata } from "next";
import Link from "next/link";
import { MessageSquare } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { getAverageRating, getReviews } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: `Customer Reviews | ${siteConfig.brandName}`,
  description: `Read what ${siteConfig.primaryStateName} homeowners say about ${siteConfig.brandName}'s plants, delivery, and installation service.`,
  path: "/reviews/",
});

function Stars({ rating }: { rating: number }) {
  return (
    <div aria-label={`${rating} out of 5 stars`} className="text-accent">
      {"★".repeat(rating)}
      {"☆".repeat(5 - rating)}
    </div>
  );
}

export default function ReviewsPage() {
  const reviews = getReviews();
  const rating = getAverageRating();

  // Omit aggregateRating/review from the schema entirely rather than
  // publish fabricated data when there are no reviews yet.
  const reviewListSchema = reviews.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${siteConfig.brandName} Service`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: rating,
      reviewCount: reviews.length,
    },
    review: reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      datePublished: r.date,
      reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
      reviewBody: r.body,
    })),
  } : null;

  return (
    <div className="page-frame">
      {reviewListSchema && <JsonLd data={reviewListSchema} />}
      {/* Visible breadcrumb removed; structured data kept for SEO (no
          visible-UI footprint) — Home is still reachable via the main nav. */}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Reviews", path: "/reviews/" },
        ])}
      />
      <section className="container-page pb-4 pt-8 text-center">
        <h1 className="font-heading text-3xl font-bold text-primary md:text-4xl">
          Customer Reviews
        </h1>
        {reviews.length > 0 ? (
          <div className="mt-3 flex flex-col items-center gap-1">
            <Stars rating={Math.round(rating)} />
            <span className="text-sm font-semibold text-neutral-dark/70">
              {rating} out of 5 ({reviews.length} review{reviews.length === 1 ? "" : "s"})
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-wide text-neutral-dark/40">
              Demo of reviews
            </span>
          </div>
        ) : (
          <p className="mt-3 text-sm font-semibold text-neutral-dark/60">
            No reviews yet
          </p>
        )}
      </section>

      {reviews.length > 0 ? (
        <section className="container-page grid gap-5 pb-16 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={`${review.author}-${review.date}`}
              className="rounded-2xl border border-[color:var(--color-nav-bronze)] bg-parchment p-6"
            >
              <Stars rating={review.rating} />
              <p className="mt-3 font-heading font-semibold text-neutral-dark">
                {review.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-dark/75">
                &ldquo;{review.body}&rdquo;
              </p>
              <p className="mt-4 text-xs font-semibold text-neutral-dark/50">
                {review.author}
                {review.location ? ` — ${review.location}` : ""}
                {review.verified ? " · Verified Customer" : ""}
              </p>
            </div>
          ))}
        </section>
      ) : (
        <section className="container-page grid place-items-center pb-16">
          <div className="w-full max-w-sm rounded-2xl border border-gold/30 bg-white p-8 text-center">
            <p className="text-sm leading-relaxed text-neutral-dark/60">
              No reviews yet — check back soon.
            </p>
          </div>
        </section>
      )}

      <section className="container-page pb-16">
        <div className="rounded-2xl bg-primary/5 p-8 text-center">
          <h2 className="font-heading text-xl font-bold text-primary">
            Had a great experience with us?
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-neutral-dark/70">
            We&rsquo;d love to hear about it — reviews help other Gwinnett County
            homeowners find us.
          </p>
          <div className="mt-5 flex justify-center">
            <svg width="0" height="0" aria-hidden="true" className="absolute">
              <defs>
                <linearGradient id="review-icon-gold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f4d58d" />
                  <stop offset="50%" stopColor="#c9a227" />
                  <stop offset="100%" stopColor="#8b6914" />
                </linearGradient>
              </defs>
            </svg>
            <Link
              href="/reviews/write/"
              className="btn-need tap-target inline-flex items-center gap-2 rounded-xl border-[1.5px] border-gold bg-primary-dark/75 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark/90"
            >
              <MessageSquare
                aria-hidden="true"
                size={17}
                strokeWidth={1.75}
                color="url(#review-icon-gold)"
                className="need-icon-glow icon-idle-sway icon-hover-overshoot shrink-0"
              />
              Leave a Review
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
