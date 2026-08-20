import Image from "next/image";
import Link from "next/link";
import { FileText, Leaf, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import IconSparks from "@/components/home/IconSparks";

export default function Hero() {
  return (
    <section className="relative isolate min-h-[520px] overflow-hidden bg-accent md:min-h-[620px]">
      <Image
        src="/images/landing-page/03.jpg"
        alt="Sunlit greenhouse walkway at BB Blossoms lined with hydrangeas, dahlias, and hanging flower baskets"
        fill
        priority
        sizes="100vw"
        quality={95}
        className="object-cover object-center"
      />

      {/* Same gradient technique as NeedLinks, distinct id to avoid a
          duplicate-#id collision since both components render on this
          same page. */}
      <svg width="0" height="0" aria-hidden="true" className="absolute">
        <defs>
          <linearGradient id="hero-icon-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f4d58d" />
            <stop offset="50%" stopColor="#c9a227" />
            <stop offset="100%" stopColor="#8b6914" />
          </linearGradient>
        </defs>
      </svg>

      <div className="container-page relative z-10 flex min-h-[520px] items-center py-14 md:min-h-[620px] md:py-24">
        {/* Scrim sits only behind the text block, not across the full image.
            No blur — the image should stay crisp and clearly visible through
            the tint (reference: Paradise Nursery pattern), with the
            dual-layer text-shadow-hero shadow doing the legibility work
            instead of backdrop blur. */}
        <div className="animate-fade-up max-w-2xl rounded-3xl bg-neutral-dark/40 p-6 shadow-2xl md:p-10">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white">
            Serving {siteConfig.primaryCity} &amp; Gwinnett County, {siteConfig.primaryState}
          </p>
          <h1 className="text-shadow-hero font-heading text-[28.4px] font-bold leading-tight text-white md:text-[40.4px] lg:text-[52.4px]">
            Beautiful Plants &amp; Trees, Grown for{" "}
            <span className="font-script text-blossom-pink text-[1.4em] leading-none">
              Georgia Yards
            </span>
          </h1>
          <p className="text-shadow-hero mt-5 max-w-xl text-[13.9px] text-plaque-gold">
            Shop healthy, nursery-grown trees, shrubs, and flowering plants
            carefully selected to thrive in Georgia&rsquo;s climate. Enjoy
            local delivery and professional installation throughout{" "}
            {siteConfig.primaryCity}, Gwinnett County, and the Atlanta metro
            area.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-2.5">
            <Link
              href="/shop/"
              className="btn-need tap-target inline-flex items-center gap-1.5 rounded-lg border border-gold/50 bg-white/5 px-3.5 py-2 text-xs font-bold tracking-wide text-white transition-colors hover:border-gold hover:bg-white/10"
            >
              <span className="icon-spark-wrap shrink-0">
                <Leaf
                  aria-hidden="true"
                  size={16}
                  strokeWidth={1.75}
                  color="url(#hero-icon-gold)"
                  className="need-icon-glow icon-idle-sway icon-hover-overshoot"
                />
                <IconSparks />
              </span>
              <span className="text-shadow-hero">Shop Plants</span>
            </Link>
            <Link
              href="/quote/"
              className="btn-need tap-target inline-flex items-center gap-1.5 rounded-lg border border-gold/50 bg-white/5 px-3.5 py-2 text-xs font-bold tracking-wide text-white transition-colors hover:border-gold hover:bg-white/10"
            >
              <FileText
                aria-hidden="true"
                size={16}
                strokeWidth={1.75}
                color="url(#hero-icon-gold)"
                className="need-icon-glow icon-idle-sway icon-hover-overshoot shrink-0"
              />
              <span className="text-shadow-hero">Get a Free Quote</span>
            </Link>
            <Link
              href={siteConfig.phoneHref}
              className="btn-need tap-target inline-flex items-center gap-1.5 rounded-full border border-gold/50 bg-white/5 px-3.5 py-2 text-xs font-bold tracking-wide text-white transition-colors hover:border-gold hover:bg-white/10"
            >
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-gold">
                <Phone
                  aria-hidden="true"
                  size={11}
                  strokeWidth={2}
                  color="url(#hero-icon-gold)"
                  className="need-icon-glow icon-idle-sway icon-hover-overshoot"
                />
              </span>
              <span className="text-shadow-hero">Call Now</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
