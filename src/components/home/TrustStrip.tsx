import { siteConfig } from "@/config/site";
import { getAverageRating, getReviews } from "@/lib/content";

export default function TrustStrip() {
  const rating = getAverageRating();
  const reviewCount = getReviews().length;

  const stats = [
    { label: "Years in Business", value: `${siteConfig.yearsInBusiness}+` },
    { label: "Plant Varieties", value: "150+" },
    { label: "Local & Family-Owned", value: "100%" },
    { label: "Average Rating", value: `${rating}★ (${reviewCount})` },
  ];

  return (
    <section className="border-y border-gold/15">
      <div className="container-page grid grid-cols-2 gap-6 py-8 text-center md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="font-heading text-2xl font-bold text-gold md:text-3xl">
              {stat.value}
            </p>
            <p className="mt-1 text-xs font-medium text-white/70 md:text-sm">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
