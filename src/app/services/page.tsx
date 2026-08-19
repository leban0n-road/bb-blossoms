import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { LinkButton } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: `Delivery, Installation & Landscape Design Services | ${siteConfig.brandName}`,
  description: `${siteConfig.brandName} offers plant delivery, professional installation, and landscape design services throughout ${siteConfig.primaryStateName}. Get a free quote today.`,
  path: "/services/",
});

const services = [
  {
    slug: "delivery",
    icon: "🚚",
    title: "Delivery",
    body: "Local delivery for any order, large or small, scheduled around your calendar.",
  },
  {
    slug: "installation",
    icon: "🧑‍🌾",
    title: "Installation",
    body: "Our crew plants everything correctly the first time — spacing, depth, and soil prep included.",
  },
  {
    slug: "landscape-design",
    icon: "📐",
    title: "Landscape Design",
    body: "A full planting plan for your yard, from a single privacy screen to a whole-property refresh.",
  },
];

export default function ServicesPage() {
  return (
    <div>
      <Breadcrumbs items={[{ name: "Services", path: "/services/" }]} />
      <section className="container-page pb-4 pt-2">
        <h1 className="font-heading text-3xl font-bold text-primary md:text-4xl">
          Delivery, Installation &amp; Design
        </h1>
        <p className="mt-3 max-w-2xl text-neutral-dark/75">
          Buying the right plant is half the job. {siteConfig.brandName}{" "}
          handles the rest — delivery, professional installation, and full
          landscape design — so your yard actually looks like the plan.
        </p>
      </section>
      <section className="container-page grid gap-5 pb-16 md:grid-cols-3">
        {services.map((s) => (
          <Link
            key={s.slug}
            href={`/services/${s.slug}/`}
            className="group rounded-2xl border border-border bg-white p-6 transition-shadow hover:shadow-lg"
          >
            <span className="text-3xl" aria-hidden="true">
              {s.icon}
            </span>
            <h2 className="mt-3 font-heading text-lg font-bold text-primary group-hover:text-accent">
              {s.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-dark/70">
              {s.body}
            </p>
            <span className="mt-3 inline-block text-sm font-semibold text-accent">
              Learn More →
            </span>
          </Link>
        ))}
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
          <div className="mt-5 flex justify-center gap-3">
            <LinkButton href="/quote/">Get a Free Quote</LinkButton>
            <LinkButton href={siteConfig.phoneHref} variant="outline">
              📞 Call {siteConfig.phone}
            </LinkButton>
          </div>
        </div>
      </section>
    </div>
  );
}
