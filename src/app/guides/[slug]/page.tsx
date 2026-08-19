import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqSection from "@/components/FaqSection";
import JsonLd from "@/components/JsonLd";
import GuideCta from "@/components/guides/GuideCta";
import { getGuideBySlug, getGuides } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { articleSchema } from "@/lib/schema";

export function generateStaticParams() {
  return getGuides().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};
  return buildMetadata({
    title: guide.metaTitle,
    description: guide.metaDescription,
    path: `/guides/${guide.slug}/`,
  });
}

export default async function GuideArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  return (
    <div>
      <JsonLd data={articleSchema(guide)} />
      <Breadcrumbs
        items={[
          { name: "Guides", path: "/guides/" },
          { name: guide.title, path: `/guides/${guide.slug}/` },
        ]}
      />
      <article className="container-page pb-6 pt-2">
        <span className="text-xs font-bold uppercase tracking-wide text-accent">
          {guide.category}
        </span>
        <h1 className="mt-2 font-heading text-3xl font-bold text-primary md:text-4xl">
          {guide.title}
        </h1>
        <p className="mt-3 text-sm text-neutral-dark/50">
          Updated{" "}
          {new Date(guide.updatedDate).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}{" "}
          &nbsp;•&nbsp; {guide.readMinutes} min read
        </p>

        <div
          className="article-body mt-8"
          dangerouslySetInnerHTML={{ __html: guide.bodyHtml }}
        />

        <div className="mt-10 max-w-2xl">
          <GuideCta guide={guide} />
        </div>
      </article>

      <FaqSection faqs={guide.faqs} title="FAQs" />
    </div>
  );
}
