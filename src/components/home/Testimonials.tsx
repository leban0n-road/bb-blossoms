import type { Review } from "@/lib/types";

function Stars({ rating }: { rating: number }) {
  return (
    <div aria-label={`${rating} out of 5 stars`} className="text-gold">
      {"★".repeat(rating)}
      {"☆".repeat(5 - rating)}
    </div>
  );
}

export default function Testimonials({ reviews }: { reviews: Review[] }) {
  return (
    <section className="py-10 md:py-14">
      <div className="container-page">
        <h2 className="font-heading text-2xl font-bold text-plaque-gold md:text-3xl">
          What Georgia Homeowners Are Saying
        </h2>
        <div className="-mx-5 mt-8 flex snap-x gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0">
          {reviews.map((review) => (
            <div
              key={review.author + review.date}
              className="w-72 shrink-0 snap-start rounded-2xl border border-gold/25 bg-white/5 p-6 md:w-auto"
            >
              <Stars rating={review.rating} />
              <p className="mt-3 font-heading font-semibold text-white">
                {review.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/75">
                &ldquo;{review.body}&rdquo;
              </p>
              <p className="mt-4 text-xs font-semibold text-white/50">
                {review.author}
                {review.location ? ` — ${review.location}` : ""}
                {review.verified ? " · Verified Customer" : ""}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
