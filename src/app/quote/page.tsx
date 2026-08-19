import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import QuoteForm from "@/components/quote/QuoteForm";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: `Get a Free Quote | ${siteConfig.brandName}`,
  description: `Request a free, no-obligation quote for plant delivery, installation, or landscape design from ${siteConfig.brandName}. Usually returned within one business day.`,
  path: "/quote/",
});

export default function QuotePage() {
  return (
    <div>
      <Breadcrumbs items={[{ name: "Get a Quote", path: "/quote/" }]} />
      <section className="container-page grid gap-10 pb-16 pt-2 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <h1 className="font-heading text-3xl font-bold text-primary md:text-4xl">
            Get a Free Quote
          </h1>
          <p className="mt-3 max-w-md text-neutral-dark/75">
            Tell us about your project in four quick steps. A member of our
            team will follow up with pricing — usually within one business
            day.
          </p>
          <div className="mt-6 space-y-3 text-sm text-neutral-dark/70">
            <p>✅ No obligation, no pressure</p>
            <p>✅ Backed by our 1-year plant guarantee</p>
            <p>
              📞 Prefer to talk it through? Call{" "}
              <a href={siteConfig.phoneHref} className="text-accent hover:underline">
                {siteConfig.phone}
              </a>
            </p>
          </div>
        </div>
        <QuoteForm />
      </section>
    </div>
  );
}
