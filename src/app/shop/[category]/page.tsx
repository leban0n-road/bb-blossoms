import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Bug,
  CloudSun,
  Fence,
  Home,
  Layers,
  MapPin,
  PawPrint,
  Sparkles,
  Sun,
  TreeDeciduous,
  TreePalm,
  TreePine,
  Zap,
  type LucideIcon,
} from "lucide-react";
import JsonLd from "@/components/JsonLd";
import ShopGrid from "@/components/shop/ShopGrid";
import { LinkButton } from "@/components/ui/Button";
import GoldFlourish from "@/components/home/GoldFlourish";
import {
  getCategories,
  getCategoryBySlug,
  getGuidesForCategory,
  getNeeds,
  getPlantsByCategory,
} from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

// Same need→icon assignments as the homepage's NeedLinks (minus its
// idle/hover animation variety, which is homepage-specific flourish) so
// the pills read as the same icon everywhere they appear.
const NEED_ICONS: Record<string, LucideIcon> = {
  "fast-growing-privacy-plants": Zap,
  "plants-for-a-fence-line": Fence,
  "deer-resistant-plants": PawPrint,
  "full-sun-plants": Sun,
  "shade-plants": CloudSun,
  "native-georgia-plants": MapPin,
  "low-maintenance-plants": Sparkles,
  "pollinator-plants": Bug,
  "plants-for-clay-soil": Layers,
  "drought-tolerant-plants": TreePalm,
  "small-yard-trees": TreePine,
  "plants-for-hoa-landscapes": Home,
  "evergreen-privacy-plants": TreeDeciduous,
};

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

  // Privacy & Screening keeps one narrow difference from the other 8: its
  // intro paragraph color was separately matched to "Shop ... by Need"
  // (text-primary) in earlier work. Every other page-level treatment below
  // (no breadcrumb/icon, centered intro, no FAQ section, the .page-frame
  // background) now applies to all 9 categories.
  const isPrivacyScreeningPage = category.slug === "privacy-screening";

  const breadcrumbItems = [
    { name: "Shop", path: "/shop/" },
    { name: category.shortName, path: `/shop/${category.slug}/` },
  ];

  return (
    <div className="page-frame">
      {/* Visible breadcrumb nav removed sitewide across category pages, but
          the structured data stays — pure SEO value (rich-result
          eligibility) with no visible-UI footprint. Home/Shop navigation is
          still reachable via the main nav bar, unaffected by this. */}
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, ...breadcrumbItems])} />
      <section className="container-page pb-4 pt-8">
        <h1 className="text-center font-heading text-3xl font-bold text-primary md:text-4xl">
          {category.name}
        </h1>
        <p
          className={`mx-auto mt-3 max-w-3xl text-center leading-relaxed ${isPrivacyScreeningPage ? "text-primary" : "text-neutral-dark/75"}`}
        >
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
              <div className="rounded-2xl border border-[color:var(--color-nav-bronze)] bg-parchment p-6 shadow-md">
                <div className="mb-2 flex justify-center" aria-hidden="true">
                  <GoldFlourish />
                </div>
                <h2 className="font-heading text-lg font-bold text-primary">
                  Shop {category.shortName} by Need
                </h2>
                <svg width="0" height="0" aria-hidden="true" className="absolute">
                  <defs>
                    <linearGradient id="category-need-icon-gold" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f4d58d" />
                      <stop offset="50%" stopColor="#c9a227" />
                      <stop offset="100%" stopColor="#8b6914" />
                    </linearGradient>
                  </defs>
                </svg>
                <ul className="mt-3 space-y-2">
                  {relatedNeeds.map((need) => {
                    const Icon = NEED_ICONS[need.slug] ?? Sparkles;
                    return (
                      <li key={need.slug}>
                        <LinkButton
                          href={`/shop-by-need/${need.slug}/`}
                          variant="metallic"
                          className="!inline-flex !w-auto !py-2 !text-xs"
                        >
                          <Icon
                            aria-hidden="true"
                            size={16}
                            strokeWidth={1.75}
                            color="url(#category-need-icon-gold)"
                            className="need-icon-glow icon-idle-sway icon-hover-overshoot shrink-0"
                          />
                          {need.name}
                        </LinkButton>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            {relatedGuides.length > 0 && (
              <div className="rounded-2xl border border-[color:var(--color-nav-bronze)] bg-parchment p-6 shadow-md">
                <div className="mb-2 flex justify-center" aria-hidden="true">
                  <GoldFlourish />
                </div>
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
    </div>
  );
}
