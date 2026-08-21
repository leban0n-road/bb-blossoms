import Link from "next/link";
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
import type { NeedCollection } from "@/lib/types";
import GoldFlourish from "@/components/home/GoldFlourish";
import IconSparks from "@/components/home/IconSparks";

// lucide-react has no "Butterfly" or "Cactus" icon — verified against the
// installed package before writing this, not assumed. Bug is the closest
// stand-in for Pollinator Plants; TreePalm (evokes an arid/dry climate)
// stands in for Cactus on Drought-Tolerant Plants.
//
// idle: always-running resting animation (icon-idle-sway/-sun/-twinkle).
// hover: spring-combo animation on hover/focus (icon-hover-overshoot for
//   most icons; icon-hover-spin — a full 360° turn — only for Sun and
//   Fence, where a full spin reads better than a partial turn).
// sparks: one-shot gold particle burst on hover — reserved for the 4
//   flagship buttons (3 here + "Shop Plants" in the hero) so they stand
//   out from the other 12.
const NEED_ICONS: Record<
  string,
  { Icon: LucideIcon; idle: string; hover: string; sparks?: boolean }
> = {
  "fast-growing-privacy-plants": { Icon: Zap, idle: "icon-idle-sway", hover: "icon-hover-overshoot", sparks: true },
  "plants-for-a-fence-line": { Icon: Fence, idle: "icon-idle-sway", hover: "icon-hover-spin" },
  "deer-resistant-plants": { Icon: PawPrint, idle: "icon-idle-sway", hover: "icon-hover-overshoot" },
  "full-sun-plants": { Icon: Sun, idle: "icon-idle-sun", hover: "icon-hover-spin", sparks: true },
  "shade-plants": { Icon: CloudSun, idle: "icon-idle-sway", hover: "icon-hover-overshoot" },
  "native-georgia-plants": { Icon: MapPin, idle: "icon-idle-sway", hover: "icon-hover-overshoot" },
  "low-maintenance-plants": { Icon: Sparkles, idle: "icon-idle-twinkle", hover: "icon-hover-overshoot" },
  "pollinator-plants": { Icon: Bug, idle: "icon-idle-sway", hover: "icon-hover-overshoot", sparks: true },
  "plants-for-clay-soil": { Icon: Layers, idle: "icon-idle-sway", hover: "icon-hover-overshoot" },
  "drought-tolerant-plants": { Icon: TreePalm, idle: "icon-idle-sway", hover: "icon-hover-overshoot" },
  "small-yard-trees": { Icon: TreePine, idle: "icon-idle-sway", hover: "icon-hover-overshoot" },
  "plants-for-hoa-landscapes": { Icon: Home, idle: "icon-idle-sway", hover: "icon-hover-overshoot" },
  "evergreen-privacy-plants": { Icon: TreeDeciduous, idle: "icon-idle-sway", hover: "icon-hover-overshoot" },
};

export default function NeedLinks({ needs }: { needs: NeedCollection[] }) {
  return (
    <section className="py-10 md:py-14">
      {/* Shared gradient definition for every icon below — an SVG gradient
          is the only way to color an SVG stroke with a gradient; CSS alone
          can't do it. Rendered once, referenced via stroke="url(#...)". */}
      <svg width="0" height="0" aria-hidden="true" className="absolute">
        <defs>
          <linearGradient id="need-icon-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f4d58d" />
            <stop offset="50%" stopColor="#c9a227" />
            <stop offset="100%" stopColor="#8b6914" />
          </linearGradient>
        </defs>
      </svg>

      <div className="container-page">
        <div className="mb-8 text-center md:mb-10">
          <div className="flex items-center justify-center gap-4">
            <GoldFlourish />
            <h2 className="font-heading text-2xl font-bold text-plaque-gold md:text-3xl">
              Shop by Need
            </h2>
            <div className="rotate-180">
              <GoldFlourish />
            </div>
          </div>
          <p className="mt-2 text-sm text-white/70">
            Not sure what plant you need? Start with your problem instead.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {needs.map((need) => {
            const iconEntry = NEED_ICONS[need.slug];
            const Icon = iconEntry?.Icon ?? Sparkles;
            return (
              <Link
                key={need.slug}
                href={`/shop-by-need/${need.slug}/`}
                className="btn-need tap-target flex items-center gap-2 rounded-xl border border-gold/50 bg-white/5 px-4 py-4 text-sm font-semibold text-white transition-colors hover:border-gold hover:bg-white/10"
              >
                <span className="icon-spark-wrap shrink-0">
                  <Icon
                    aria-hidden="true"
                    size={19}
                    strokeWidth={1.75}
                    color="url(#need-icon-gold)"
                    className={`need-icon-glow ${iconEntry?.idle ?? "icon-idle-sway"} ${iconEntry?.hover ?? "icon-hover-overshoot"}`}
                  />
                  {iconEntry?.sparks && <IconSparks />}
                </span>
                <span>{need.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
