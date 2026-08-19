import Breadcrumbs from "@/components/Breadcrumbs";
import FaqSection from "@/components/FaqSection";
import { LinkButton } from "@/components/ui/Button";
import type { Faq } from "@/lib/types";
import { siteConfig } from "@/config/site";

export default function ServiceLayout({
  title,
  slug,
  intro,
  sections,
  faqs,
}: {
  title: string;
  slug: string;
  intro: string;
  sections: { heading: string; body: string }[];
  faqs: Faq[];
}) {
  return (
    <div>
      <Breadcrumbs
        items={[
          { name: "Services", path: "/services/" },
          { name: title, path: `/services/${slug}/` },
        ]}
      />
      <section className="container-page pb-4 pt-2">
        <h1 className="font-heading text-3xl font-bold text-primary md:text-4xl">
          {title} — {siteConfig.brandName}
        </h1>
        <p className="mt-3 max-w-3xl leading-relaxed text-neutral-dark/75">
          {intro}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <LinkButton href="/quote/">Get a Free Quote</LinkButton>
          <LinkButton href={siteConfig.phoneHref} variant="outline">
            📞 Call {siteConfig.phone}
          </LinkButton>
        </div>
      </section>

      <section className="container-page grid gap-6 pb-14 md:grid-cols-2">
        {sections.map((s) => (
          <div key={s.heading} className="rounded-2xl border border-border bg-white p-6">
            <h2 className="font-heading text-lg font-bold text-primary">
              {s.heading}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-dark/75">
              {s.body}
            </p>
          </div>
        ))}
      </section>

      <FaqSection faqs={faqs} title={`${title} FAQs`} />
    </div>
  );
}
