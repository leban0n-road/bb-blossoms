import type { Metadata } from "next";
import ServiceLayout from "@/components/services/ServiceLayout";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: `Landscape Design Services in ${siteConfig.primaryStateName} | ${siteConfig.brandName}`,
  description: `${siteConfig.brandName} offers landscape design consultations for privacy screens, foundation beds, and full-property plans across ${siteConfig.primaryStateName}.`,
  path: "/services/landscape-design/",
});

export default function LandscapeDesignPage() {
  return (
    <ServiceLayout
      title="Landscape Design"
      slug="landscape-design"
      intro="Not sure what to plant, where, or how many? Our design consultations turn a vague idea into a plant-by-plant plan matched to your sun exposure, soil, and budget."
      sections={[
        {
          heading: "How It Works",
          body: "We start with a phone consultation or on-site visit to understand your goals — privacy, curb appeal, low maintenance, pollinator habitat — then return a plant list with quantities, spacing, and a total cost estimate.",
        },
        {
          heading: "Common Projects",
          body: "Privacy screens along a property line, foundation bed refreshes, HOA-compliant front yard plantings, and small backyard orchards are our most requested design projects across Gwinnett County.",
        },
        {
          heading: "Budget-Friendly Phasing",
          body: "Full-property plans don't have to be installed all at once — we can phase a design plan across multiple seasons or years so it fits your budget without losing the overall layout.",
        },
        {
          heading: "From Plan to Planted",
          body: "Every design plan can be paired directly with our delivery and installation services, so the plants you're quoted are the same ones that end up correctly planted in your yard.",
        },
      ]}
      faqs={[
        {
          question: "How much does landscaping installation cost?",
          answer: "Landscaping installation in the Atlanta metro area typically runs $35–$75 per plant for labor on top of plant cost, with full-property design projects often ranging from $1,500–$10,000+ depending on scope. Request a free quote for an exact estimate on your project.",
        },
        {
          question: "Is a design consultation free?",
          answer: "Yes — an initial design consultation and plant list are free with no obligation to purchase. We only charge for the plants and installation labor once you approve a final plan and quote.",
        },
      ]}
    />
  );
}
