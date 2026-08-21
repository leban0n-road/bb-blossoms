import Link from "next/link";
import type { LucideIcon } from "lucide-react";

export interface IconFeatureItem {
  Icon: LucideIcon;
  idle: string;
  title: string;
  body: string;
  href?: string;
  linkLabel?: string;
}

const THEME = {
  // Original "Why BB Blossoms" look — built for a dark backdrop (the
  // homepage wallpaper). Both gold tokens here (--color-gold,
  // --color-plaque-gold) are documented sitewide as dark-background-only
  // colors, and white/75 body text needs a dark backdrop to read.
  dark: {
    card: "why-card rounded-2xl border border-gold/25 bg-white/5 p-6",
    cardHover: "transition-colors hover:border-gold/50",
    title: "text-plaque-gold",
    body: "text-white/75",
    link: "text-plaque-gold",
  },
  // For pages with the light .page-frame background — same icon/animation
  // treatment, but card surface and text swap to the site's standard
  // light-background palette (matches every other white card already on
  // these pages) since neither gold token is legible on a light backdrop.
  light: {
    card: "rounded-2xl border border-gold/30 bg-white p-6",
    cardHover: "transition-shadow hover:shadow-lg",
    title: "text-primary group-hover:text-accent",
    body: "text-neutral-dark/70",
    link: "text-accent",
  },
} as const;

/**
 * Shared "Why BB Blossoms" card-grid treatment (metallic gold SVG icon,
 * idle sway/drift/twinkle + hover overshoot) — originally built for the
 * homepage's 3 static dark-backdrop cards, reused here for any icon-card
 * row that wants the same icon system. `theme` adapts the card surface and
 * text colors to the page's actual background (see THEME above); the icon
 * itself is unaffected since the gold gradient + glow read fine either way.
 * Cards render as a <Link> when `href` is given (showing `linkLabel` as a
 * footer line, e.g. "Learn More →"), otherwise as a plain non-interactive
 * <div> — matching how the homepage's cards have never been clickable.
 */
export default function IconFeatureGrid({
  items,
  gradientId,
  theme = "dark",
}: {
  items: IconFeatureItem[];
  gradientId: string;
  theme?: keyof typeof THEME;
}) {
  const t = THEME[theme];

  return (
    <>
      <svg width="0" height="0" aria-hidden="true" className="absolute">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f4d58d" />
            <stop offset="50%" stopColor="#c9a227" />
            <stop offset="100%" stopColor="#8b6914" />
          </linearGradient>
        </defs>
      </svg>
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((item) => {
          const inner = (
            <>
              <item.Icon
                aria-hidden="true"
                size={30}
                strokeWidth={1.75}
                color={`url(#${gradientId})`}
                className={`need-icon-glow icon-hover-overshoot ${item.idle}`}
              />
              <h3 className={`mt-3 font-heading text-lg font-bold ${t.title}`}>{item.title}</h3>
              <p className={`mt-2 text-sm leading-relaxed ${t.body}`}>{item.body}</p>
              {item.href && item.linkLabel && (
                <span className={`mt-3 inline-block text-sm font-semibold ${t.link}`}>
                  {item.linkLabel}
                </span>
              )}
            </>
          );
          return item.href ? (
            <Link key={item.title} href={item.href} className={`group ${t.card} ${t.cardHover}`}>
              {inner}
            </Link>
          ) : (
            <div key={item.title} className={t.card}>
              {inner}
            </div>
          );
        })}
      </div>
    </>
  );
}
