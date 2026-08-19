import { LinkButton } from "@/components/ui/Button";
import { getCategoryBySlug, getNeedBySlug } from "@/lib/content";
import type { GuideArticle } from "@/lib/types";

export default function GuideCta({ guide }: { guide: GuideArticle }) {
  const category = guide.relatedCategorySlug
    ? getCategoryBySlug(guide.relatedCategorySlug)
    : undefined;
  const need = guide.relatedNeedSlug ? getNeedBySlug(guide.relatedNeedSlug) : undefined;

  const shopHref = need
    ? `/shop-by-need/${need.slug}/`
    : category
    ? `/shop/${category.slug}/`
    : "/shop/";
  const shopLabel = need
    ? `Shop ${need.name}`
    : category
    ? `Shop ${category.shortName}`
    : "Shop All Plants";

  return (
    <div className="rounded-2xl bg-primary/5 p-6 md:p-8">
      <h2 className="font-heading text-xl font-bold text-primary">
        Ready to plant?
      </h2>
      <p className="mt-2 text-sm text-neutral-dark/70">
        BB Blossoms delivers and installs throughout Gwinnett County — get
        the right plants for this project without the guesswork.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <LinkButton href={shopHref}>{shopLabel}</LinkButton>
        <LinkButton href="/quote/" variant="outline">
          Get an Installation Quote
        </LinkButton>
      </div>
    </div>
  );
}
