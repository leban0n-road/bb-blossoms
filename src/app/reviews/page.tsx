import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { LinkButton } from "@/components/ui/Button";
import { getAverageRating, getReviews } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
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

  const reviewListSchema = {
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
  };

  return (
    <div>
      <JsonLd data={reviewListSchema} />
      <Breadcrumbs items={[{ name: "Reviews", path: "/reviews/" }]} />
      <section className="container-page pb-4 pt-2">
        <h1 className="font-heading text-3xl font-bold text-primary md:text-4xl">
          Customer Reviews
        </h1>
        <div className="mt-3 flex items-center gap-3">
          <Stars rating={Math.round(rating)} />
          <span className="text-sm font-semibold text-neutral-dark/70">
            {rating} out of 5 ({reviews.length} reviews)
          </span>
        </div>
        <p className="mt-3 max-w-xl text-xs text-neutral-dark/50">
          {/* TODO: replace with real, verified customer reviews before launch. */}
          Reviews shown are placeholder examples pending verified customer
          submissions.
        </p>
      </section>

      <section className="container-page grid gap-5 pb-16 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <div key={review.author + review.date} className="rounded-2xl border border-border bg-white p-6">
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
            <LinkButton href="/contact/">Leave a Review</LinkButton>
          </div>
        </div>
      </section>
    </div>
  );
}
