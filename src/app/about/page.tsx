import type { Metadata } from "next";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumbs";
import { LinkButton } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: `About Us | ${siteConfig.brandName}`,
  description: `${siteConfig.brandName} is a family-owned nursery in ${siteConfig.primaryCity}, ${siteConfig.primaryState}. Learn our story and why local homeowners trust us.`,
  path: "/about/",
});

export default function AboutPage() {
  return (
    <div>
      <Breadcrumbs items={[{ name: "About", path: "/about/" }]} />

      <section className="container-page grid gap-10 pb-14 pt-2 lg:grid-cols-2 lg:items-center">
        <div>
          <h1 className="font-heading text-3xl font-bold text-primary md:text-4xl">
            Our Story
          </h1>
          <p className="mt-4 leading-relaxed text-neutral-dark/75">
            {siteConfig.brandName} started as a small backyard operation in{" "}
            {siteConfig.primaryCity}, {siteConfig.primaryStateName}, selling
            extra shrubs and trees to neighbors who kept asking where we got
            our plants. {siteConfig.yearsInBusiness}+ years later, we&rsquo;ve grown
            into a full nursery serving Gwinnett County and the surrounding
            metro — but we&rsquo;re still the same family-run operation, still
            hand-selecting every plant for how it actually performs in{" "}
            {siteConfig.primaryStateName}&rsquo;s heat, humidity, and clay soil.
          </p>
          <p className="mt-4 leading-relaxed text-neutral-dark/75">
            We don&rsquo;t stock what looks good on a distributor&rsquo;s catalog — we
            stock what survives its first Georgia summer. That philosophy
            shapes every recommendation our team makes, from a single
            foundation shrub to a full property installation.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <LinkButton href="/quote/">Get a Free Quote</LinkButton>
            <LinkButton href="/reviews/" variant="outline">
              Read Customer Reviews
            </LinkButton>
          </div>
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-border">
          <Image
            src="/images/placeholder-team-photo.jpg"
            alt={`The ${siteConfig.brandName} team at our ${siteConfig.primaryCity}, ${siteConfig.primaryState} nursery`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="container-page grid gap-5 pb-16 md:grid-cols-3">
        {[
          {
            title: "Locally Selected Inventory",
            body: "Every plant is chosen for Zone 8a performance — not just what's cheapest to ship in bulk.",
          },
          {
            title: "Real Advice, Not Upsells",
            body: "Our team will tell you when a cheaper plant is the better fit for your yard, not just the one with the biggest margin.",
          },
          {
            title: "Licensed & Insured",
            body: "Our delivery and installation crews are licensed and insured for residential landscaping work (placeholder — replace with final license/insurance details).",
          },
        ].map((item) => (
          <div key={item.title} className="rounded-2xl border border-border bg-white p-6">
            <h2 className="font-heading text-lg font-bold text-primary">
              {item.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-dark/70">
              {item.body}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
