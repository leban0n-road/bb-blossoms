import type { Metadata } from "next";
import { HardHat, Ruler, Truck } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import IconFeatureGrid, { type IconFeatureItem } from "@/components/IconFeatureGrid";
import QuoteCallButtons from "@/components/QuoteCallButtons";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: `Delivery, Installation & Landscape Design Services | ${siteConfig.brandName}`,
  description: `${siteConfig.brandName} offers plant delivery, professional installation, and landscape design services throughout ${siteConfig.primaryStateName}. Get a free quote today.`,
  path: "/services/",
});

const services: IconFeatureItem[] = [
  {
    Icon: Truck,
    idle: "icon-idle-drift",
    title: "Delivery",
    body: "Local delivery for any order, large or small, scheduled around your calendar.",
    href: "/services/delivery/",
    linkLabel: "Learn More →",
  },
  {
    Icon: HardHat,
    idle: "icon-idle-sway",
    title: "Installation",
    body: "Our crew plants everything correctly the first time — spacing, depth, and soil prep included.",
    href: "/services/installation/",
    linkLabel: "Learn More →",
  },
  {
    Icon: Ruler,
    idle: "icon-idle-twinkle",
    title: "Landscape Design",
    body: "A full planting plan for your yard, from a single privacy screen to a whole-property refresh.",
    href: "/services/landscape-design/",
    linkLabel: "Learn More →",
  },
];

export default function ServicesPage() {
  return (
    <div className="page-frame">
      {/* Visible breadcrumb removed; structured data kept for SEO (no
          visible-UI footprint) — Home is still reachable via the main nav. */}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services/" },
        ])}
      />
      <section className="container-page pb-4 pt-8">
        <h1 className="text-center font-heading text-3xl font-bold text-primary md:text-4xl">
          Delivery, Installation &amp; Design
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-center text-neutral-dark/75">
          Buying the right plant is half the job. {siteConfig.brandName}{" "}
          handles the rest — delivery, professional installation, and full
          landscape design — so your yard actually looks like the plan.
        </p>
      </section>
      <section className="container-page pb-16">
        <IconFeatureGrid items={services} gradientId="services-icon-gold" theme="light" />
      </section>
      <section className="container-page pb-16">
        <div className="rounded-2xl bg-primary/5 p-8 text-center">
          <h2 className="font-heading text-xl font-bold text-primary">
            Ready to start your project?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-neutral-dark/70">
            Tell us about your yard and we&rsquo;ll follow up with a free, no
            obligation quote — usually within one business day.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <QuoteCallButtons gradientId="services-cta-icon-gold" />
          </div>
        </div>
      </section>
    </div>
  );
}
