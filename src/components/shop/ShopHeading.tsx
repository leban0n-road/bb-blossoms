import { Sparkles } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

/** Plain heading + intro copy for a given already-filtered plant count. Used
 * both as the static default (no search query) and, client-side, for the
 * "Search Results for ..." variant — kept as one component so the two never
 * drift out of sync. */
export function ShopHeading({
  query,
  matchCount,
  totalCount,
}: {
  query: string;
  matchCount: number;
  totalCount: number;
}) {
  return (
    <>
      <h1 className="font-heading text-3xl font-bold text-primary md:text-4xl">
        {query ? `Search Results for "${query}"` : "Shop All Plants"}
      </h1>
      <p className="mx-auto mt-2 max-w-2xl text-neutral-dark/70">
        {query
          ? `${matchCount} plant${matchCount === 1 ? "" : "s"} matched your search.`
          : `${totalCount}+ trees, shrubs, and flowers selected for ${siteConfig.primaryStateName} Zone ${siteConfig.usdaZone} yards, with local delivery and professional installation available.`}
      </p>
      <div className="mt-4 flex justify-center">
        <svg width="0" height="0" aria-hidden="true" className="absolute">
          <defs>
            <linearGradient id="shop-quote-icon-gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f4d58d" />
              <stop offset="50%" stopColor="#c9a227" />
              <stop offset="100%" stopColor="#8b6914" />
            </linearGradient>
          </defs>
        </svg>
        <LinkButton href="/quote/" variant="metallic">
          <Sparkles
            aria-hidden="true"
            size={17}
            strokeWidth={1.75}
            color="url(#shop-quote-icon-gold)"
            className="need-icon-glow icon-idle-twinkle icon-hover-overshoot shrink-0"
          />
          Not sure what to buy? Get a Free Design Quote
        </LinkButton>
      </div>
    </>
  );
}
