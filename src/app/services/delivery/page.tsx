import type { Metadata } from "next";
import ServiceLayout from "@/components/services/ServiceLayout";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: `Plant Delivery Service in ${siteConfig.primaryStateName} | ${siteConfig.brandName}`,
  description: `${siteConfig.brandName} delivers trees, shrubs, and flowers across Gwinnett County and the ${siteConfig.primaryStateName} metro. See delivery radius, timing, and pricing.`,
  path: "/services/delivery/",
});

export default function DeliveryPage() {
  return (
    <ServiceLayout
      title="Delivery"
      slug="delivery"
      intro={`We deliver everything we sell — from a single 3-gallon shrub to a full truckload of B&B trees — directly to your ${siteConfig.primaryStateName} property, carefully staged where you need it.`}
      sections={[
        {
          heading: "Delivery Area",
          body: "Standard delivery covers a 10-mile radius from our Lawrenceville nursery at no extra charge on orders over $150. Extended delivery is available throughout Gwinnett County and the broader Atlanta metro for a small additional fee based on distance.",
        },
        {
          heading: "Delivery Timing",
          body: "Most orders are delivered within 3–5 business days of purchase; same-week delivery is standard for addresses within our core Lawrenceville zone. Large tree or full-screen orders may require additional lead time to confirm truck availability.",
        },
        {
          heading: "What to Expect",
          body: "Our delivery team calls or texts ahead with a scheduling window, places plants in your driveway or designated staging area, and provides basic handling guidance — they do not dig or plant unless you've also added Installation.",
        },
        {
          heading: "Large & Bulk Orders",
          body: "Ordering more than 10 plants, or anything balled-and-burlapped over 7 feet? Call us directly so we can confirm truck access, driveway clearance, and the best delivery day for your project.",
        },
      ]}
      faqs={[
        {
          question: "How much does plant delivery cost?",
          answer: "Delivery is free on orders over $150 within our standard 10-mile Lawrenceville delivery zone; orders further out or under that threshold incur a small distance-based delivery fee calculated at checkout or quoted by phone.",
        },
        {
          question: "How long does delivery take?",
          answer: "Most delivery orders arrive within 3–5 business days, with same-week delivery standard for addresses close to our Lawrenceville nursery. Large or custom orders may take longer — we'll confirm a specific window when you order.",
        },
      ]}
    />
  );
}
