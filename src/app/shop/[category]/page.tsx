import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqSection from "@/components/FaqSection";
import ShopGrid from "@/components/shop/ShopGrid";
import { LinkButton } from "@/components/ui/Button";
import {
  getCategories,
  getCategoryBySlug,
  getGuidesForCategory,
  getNeeds,
  getPlantsByCategory,
} from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return getCategories().map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  if (!category) return {};
  return buildMetadata({
    title: category.metaTitle,
    description: category.metaDescription,
    path: `/shop/${category.slug}/`,
  });
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  if (!category) notFound();

  const plants = getPlantsByCategory(category.slug);
  const relatedNeeds = getNeeds().filter(
    (n) => n.canonicalCategory === category.slug
  );
  const relatedGuides = getGuidesForCategory(category.slug);

  return (
    <div>
      <Breadcrumbs
        items={[
          { name: "Shop", path: "/shop/" },
          { name: category.shortName, path: `/shop/${category.slug}/` },
        ]}
      />
      <section className="container-page pb-4 pt-2">
        <span className="text-4xl" aria-hidden="true">
          {category.icon}
        </span>
        <h1 className="mt-2 font-heading text-3xl font-bold text-primary md:text-4xl">
          {category.name}
        </h1>
        <p className="mt-3 max-w-3xl text-neutral-dark/75 leading-relaxed">
          {category.intro}
        </p>
      </section>
      <section className="container-page pb-12">
        <ShopGrid plants={plants} showCategoryFilter={false} />
      </section>

      {(relatedNeeds.length > 0 || relatedGuides.length > 0) && (
        <section className="container-page pb-14">
          <div className="grid gap-4 md:grid-cols-2">
            {relatedNeeds.length > 0 && (
              <div className="rounded-2xl border border-border bg-white p-6">
                <h2 className="font-heading text-lg font-bold text-primary">
                  Shop {category.shortName} by Need
                </h2>
                <ul className="mt-3 space-y-2">
                  {relatedNeeds.map((need) => (
                    <li key={need.slug}>
                      <LinkButton
                        href={`/shop-by-need/${need.slug}/`}
                        variant="outline"
                        className="!inline-flex !w-auto !py-2 !text-xs"
                      >
                        {need.name}
                      </LinkButton>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {relatedGuides.length > 0 && (
              <div className="rounded-2xl border border-border bg-white p-6">
                <h2 className="font-heading text-lg font-bold text-primary">
                  Related Growing Guides
                </h2>
                <ul className="mt-3 space-y-2 text-sm">
                  {relatedGuides.map((guide) => (
                    <li key={guide.slug}>
                      <a
                        href={`/guides/${guide.slug}/`}
                        className="text-accent hover:underline"
                      >
                        {guide.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      <FaqSection faqs={category.faqs} title={`${category.shortName} FAQs`} />
    </div>
  );
}
