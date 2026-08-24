import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import ContactForm from "@/components/contact/ContactForm";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: `Contact Us | ${siteConfig.brandName}`,
  description: `Contact ${siteConfig.brandName} in ${siteConfig.primaryCity}, ${siteConfig.primaryState} — phone, email, address, and hours.`,
  path: "/contact/",
});

export default function ContactPage() {
  const mapQuery = encodeURIComponent(
    `${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.state} ${siteConfig.address.zip}`
  );

  return (
    <div className="page-frame">
      {/* Visible breadcrumb removed; structured data kept for SEO (no
          visible-UI footprint) — Home is still reachable via the main nav. */}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact/" },
        ])}
      />
      {/* DOM order stays heading-then-form (h1 first for correct reading
          order/SEO, and the form isn't left floating without its heading
          on mobile); lg:order-* flips only the visual desktop position so
          the form ends up on the left, contact info on the right — same
          technique already used on /quote for its own column swap. */}
      <section className="container-page grid gap-10 pb-16 pt-8 lg:grid-cols-2">
        <div className="lg:order-2">
          <h1 className="font-heading text-3xl font-bold text-primary md:text-4xl">
            Contact Us
          </h1>
          <address className="mt-4 space-y-1 not-italic leading-relaxed text-neutral-dark/75">
            {siteConfig.legalName}
            <br />
            {siteConfig.address.street}
            <br />
            {siteConfig.address.city}, {siteConfig.address.state}{" "}
            {siteConfig.address.zip}
            <br />
            <a href={siteConfig.phoneHref} className="text-accent hover:underline">
              {siteConfig.phone}
            </a>
            <br />
            <a href={`mailto:${siteConfig.email}`} className="text-accent hover:underline">
              {siteConfig.email}
            </a>
          </address>

          <div className="mt-6">
            <h2 className="font-heading text-lg font-bold text-primary">
              Hours
            </h2>
            <ul className="mt-2 space-y-1 text-sm text-black">
              {siteConfig.hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-4 border-b border-border py-1">
                  <span>{h.day}</span>
                  <span>
                    {h.open} – {h.close}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 aspect-video w-full overflow-hidden rounded-2xl border border-border">
            <iframe
              title={`Map of ${siteConfig.brandName}`}
              src={`https://maps.google.com/maps?q=${mapQuery}&z=13&output=embed`}
              className="h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div className="lg:order-1">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
