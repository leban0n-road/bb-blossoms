import JsonLd from "@/components/JsonLd";
import { faqPageSchema } from "@/lib/schema";
import type { Faq } from "@/lib/types";

export default function FaqSection({
  faqs,
  title = "Frequently Asked Questions",
  includeSchema = true,
  theme = "light",
}: {
  faqs: Faq[];
  title?: string;
  includeSchema?: boolean;
  /** "dark" is for placement on a dark-green homepage section only —
   * every other page (category/PDP/location/guide/FAQ) should keep the
   * default "light" theme. */
  theme?: "light" | "dark";
}) {
  if (!faqs.length) return null;

  const isDark = theme === "dark";

  return (
    <section className="py-10 md:py-14">
      <div className="container-page">
        {includeSchema && <JsonLd data={faqPageSchema(faqs)} />}
        {title && (
          <h2
            className={`font-heading text-2xl md:text-3xl mb-6 ${isDark ? "text-plaque-gold" : "text-primary"}`}
          >
            {title}
          </h2>
        )}
        <div
          className={
            isDark
              ? "divide-y divide-gold/15 rounded-2xl border border-gold/25 bg-white/5"
              : "divide-y divide-border rounded-2xl border border-border bg-white"
          }
        >
          {faqs.map((faq) => (
            <details key={faq.question} className="group p-5 md:p-6">
              <summary
                className={`tap-target flex cursor-pointer list-none items-center justify-between gap-4 font-semibold marker:content-none ${isDark ? "text-white" : "text-neutral-dark"}`}
              >
                <span>{faq.question}</span>
                <span
                  aria-hidden="true"
                  className={`shrink-0 text-xl transition-transform group-open:rotate-45 ${isDark ? "text-gold" : "text-accent"}`}
                >
                  +
                </span>
              </summary>
              <p className={`mt-3 leading-relaxed ${isDark ? "text-white/75" : "text-neutral-dark/80"}`}>
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
