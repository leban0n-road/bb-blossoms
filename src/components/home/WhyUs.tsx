import { siteConfig } from "@/config/site";

const items = [
  {
    icon: "🏡",
    title: "Local & Family-Owned",
    body: `Based right in ${siteConfig.primaryCity}, ${siteConfig.primaryState} — we're neighbors, not a national warehouse chain, and every plant is hand-selected for our climate.`,
  },
  {
    icon: "🚚",
    title: "Delivery + Installation",
    body: "From a single tree to a full privacy row, our crew delivers and plants it correctly the first time — no guesswork on spacing or depth.",
  },
  {
    icon: "🌡️",
    title: `Grown for ${siteConfig.primaryStateName} Climate`,
    body: `Every plant we stock is proven to handle Zone ${siteConfig.usdaZone} heat, humidity, and clay soil — not just what looked good at a national distributor.`,
  },
];

export default function WhyUs() {
  return (
    <section className="py-10 md:py-14">
      <div className="container-page">
        <h2 className="font-heading text-2xl font-bold text-gold md:text-3xl">
          Why {siteConfig.brandName}
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <div key={item.title} className="rounded-2xl border border-gold/25 bg-white/5 p-6">
              <span className="text-3xl" aria-hidden="true">
                {item.icon}
              </span>
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
