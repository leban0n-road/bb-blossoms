import { Home, Thermometer, Truck } from "lucide-react";
import { siteConfig } from "@/config/site";
import IconFeatureGrid, { type IconFeatureItem } from "@/components/IconFeatureGrid";

const items: IconFeatureItem[] = [
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
      <div className="container-page">
        <h2 className="font-heading text-2xl font-bold text-plaque-gold md:text-3xl">
          Why {siteConfig.brandName}
        </h2>
        <div className="mt-8">
          <IconFeatureGrid items={items} gradientId="whyus-icon-gold" />
        </div>
      </div>
    </section>
  );
}
