import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import ReviewForm from "@/components/reviews/ReviewForm";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: `Leave a Review | ${siteConfig.brandName}`,
  description: `Share your experience with ${siteConfig.brandName}'s plants, delivery, and installation service.`,
  path: "/reviews/write/",
  noIndex: true,
});

export default function WriteReviewPage() {
  return (
    <div className="page-frame">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Reviews", path: "/reviews/" },
          { name: "Leave a Review", path: "/reviews/write/" },
        ])}
      />
      <section className="container-page pb-16 pt-8">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="font-heading text-3xl font-bold text-primary md:text-4xl">
            Leave a Review
          </h1>
          <p className="mt-3 text-neutral-dark/75">
            We&rsquo;d love to hear about your experience — it helps other{" "}
            {siteConfig.primaryStateName} homeowners find us.
          </p>
        </div>
        <div className="mx-auto mt-8 max-w-lg">
          <ReviewForm />
        </div>
      </section>
    </div>
  );
}
