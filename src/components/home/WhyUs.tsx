import { Home, Thermometer, Truck, type LucideIcon } from "lucide-react";
import { siteConfig } from "@/config/site";

const items: { Icon: LucideIcon; idle: string; title: string; body: string }[] = [
  {
    Icon: Home,
    idle: "icon-idle-sway",
    title: "Local & Family-Owned",
    body: `Based right in ${siteConfig.primaryCity}, ${siteConfig.primaryState} — we're neighbors, not a national warehouse chain, and every plant is hand-selected for our climate.`,
  },
  {
    Icon: Truck,
    idle: "icon-idle-drift",
    title: "Delivery + Installation",
    body: "From a single tree to a full privacy row, our crew delivers and plants it correctly the first time — no guesswork on spacing or depth.",
  },
  {
    Icon: Thermometer,
    idle: "icon-idle-twinkle",
    title: `Grown for ${siteConfig.primaryStateName} Climate`,
    body: `Every plant we stock is proven to handle Zone ${siteConfig.usdaZone} heat, humidity, and clay soil — not just what looked good at a national distributor.`,
  },
];

export default function WhyUs() {
  return (
    <section className="py-10 md:py-14">
      {/* Same gradient technique as NeedLinks/Hero, distinct id since all
          three components render on this same page. */}
      <svg width="0" height="0" aria-hidden="true" className="absolute">
        <defs>
          <linearGradient id="whyus-icon-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f4d58d" />
            <stop offset="50%" stopColor="#c9a227" />
            <stop offset="100%" stopColor="#8b6914" />
          </linearGradient>
        </defs>
      </svg>

      <div className="container-page">
        <h2 className="font-heading text-2xl font-bold text-gold md:text-3xl">
          Why {siteConfig.brandName}
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.title}
              className="why-card rounded-2xl border border-gold/25 bg-white/5 p-6"
            >
              <item.Icon
                aria-hidden="true"
                size={30}
                strokeWidth={1.75}
                color="url(#whyus-icon-gold)"
                className={`need-icon-glow icon-hover-overshoot ${item.idle}`}
              />
              <h3 className="mt-3 font-heading text-lg font-bold text-gold">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/75">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
