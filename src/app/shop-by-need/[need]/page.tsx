import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import PlantCard from "@/components/PlantCard";
import { LinkButton } from "@/components/ui/Button";
import { getNeedBySlug, getNeeds, getPlantsForNeed } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

export function generateStaticParams() {
  return getNeeds().map((n) => ({ need: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ need: string }>;
}): Promise<Metadata> {
  const { need: needSlug } = await params;
  const need = getNeedBySlug(needSlug);
  if (!need) return {};
  return buildMetadata({
    title: need.metaTitle,
    description: need.metaDescription,
    path: `/shop-by-need/${need.slug}/`,
  });
}

export default async function NeedPage({
  params,
}: {
  params: Promise<{ need: string }>;
}) {
  const { need: needSlug } = await params;
  const need = getNeedBySlug(needSlug);
  if (!need) notFound();

  const plants = getPlantsForNeed(need);

  return (
    <div className="page-frame">
      {/* Visible breadcrumb removed; structured data kept for SEO (no
          visible-UI footprint) — Home is still reachable via the main nav. */}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Shop by Need", path: "/shop-by-need/" },
          { name: need.name, path: `/shop-by-need/${need.slug}/` },
        ])}
      />
      <section className="container-page pb-4 pt-8 text-center">
        <h1 className="font-heading text-3xl font-bold text-primary md:text-4xl">
          {need.name}
        </h1>
        <p className="mx-auto mt-3 max-w-3xl leading-relaxed text-neutral-dark/75">
          {need.intro}
        </p>
        {need.canonicalCategory && (
          <div className="mt-4 flex justify-center">
            <LinkButton href={`/shop/${need.canonicalCategory}/`} variant="outline">
              Browse Full Category
            </LinkButton>
          </div>
        )}
      </section>

      <section className="container-page pb-14">
        {plants.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border p-10 text-center text-neutral-dark/60">
            This collection is being restocked — call us and we&rsquo;ll help you
            find the right plant today.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {plants.map((plant) => (
              <PlantCard key={plant.slug} plant={plant} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
