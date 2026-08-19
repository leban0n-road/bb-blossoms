import Image from "next/image";
import Link from "next/link";

const banners = [
  {
    title: "Fall Planting Season Is Here",
    body: "Cooler temps mean less transplant stress — the best window to plant trees and shrubs all year.",
    cta: "Shop Trees",
    href: "/shop/trees/",
    image: "/images/placeholder-promo-fall-planting.jpg",
  },
  {
    title: "Popular This Week: Privacy Collection",
    body: "Green Giant Arborvitae and Nellie Stevens Holly are back in stock in 7-gallon and B&B sizes.",
    cta: "Shop Privacy Plants",
    href: "/shop/privacy-screening/",
    image: "/images/placeholder-promo-privacy.jpg",
  },
];

export default function PromoBanners() {
  return (
    <section className="py-10 md:py-14">
      <div className="container-page grid gap-5 md:grid-cols-2">
        {banners.map((banner) => (
          <Link
            key={banner.href}
            href={banner.href}
            className="group relative flex min-h-[220px] items-end overflow-hidden rounded-3xl border border-gold/25"
          >
            <Image
              src={banner.image}
              alt={banner.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary-dark/30 to-transparent" />
            <div className="relative z-10 p-6 text-white">
              <h3 className="font-heading text-xl font-bold md:text-2xl">
                {banner.title}
              </h3>
              <p className="mt-1 max-w-sm text-sm text-white/85">{banner.body}</p>
              <span className="mt-3 inline-block text-sm font-semibold text-gold underline underline-offset-4">
                {banner.cta} →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
