import type { Metadata } from "next";
import ServiceLayout from "@/components/services/ServiceLayout";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: `Professional Plant Installation in ${siteConfig.primaryStateName} | ${siteConfig.brandName}`,
  description: `${siteConfig.brandName}'s installation crew plants trees, shrubs, and privacy screens correctly the first time. Licensed & insured. Get a free installation quote.`,
  path: "/services/installation/",
});

export default function InstallationPage() {
  return (
    <ServiceLayout
      title="Installation"
      slug="installation"
      intro="Buying a healthy plant is only half the equation — planting it at the wrong depth or spacing is the most common reason new landscaping fails. Our installation crew handles the whole job, correctly."
      sections={[
        {
          heading: "What's Included",
          body: "Every installation includes site prep, correct planting depth and spacing, soil amendment where needed for Georgia's clay, mulching, and a first watering. Debris and packaging are hauled away before we leave.",
        },
        {
          heading: "Privacy Screens & Tree Rows",
          body: "Our most common installation job — we plan spacing for mature width, stake larger trees as needed, and lay out irrigation guidance so your new screen establishes evenly across the whole row.",
        },
        {
          heading: "The Guarantee",
          body: siteConfig.guarantee,
        },
        {
          heading: "Licensed & Insured",
          body: "Our installation crew is licensed and insured for residential landscaping work (placeholder — replace with your license/insurance details), so you're covered in the rare event of property damage during installation.",
        },
      ]}
      faqs={[
        {
          question: "How much does installation cost?",
          answer: "Installation typically adds $35–$75 per plant depending on size and site conditions, with exact pricing confirmed in your free quote. Larger trees, difficult access, or extensive soil amendment can increase the per-plant cost.",
        },
        {
          question: "Do you guarantee installed plants?",
          answer: "Yes — plants installed by our crew are covered under our 1-year plant guarantee, which replaces any covered tree or shrub that fails to establish within 12 months of installation at no additional charge.",
        },
      ]}
    />
  );
}
