import Image from "next/image";
import { LinkButton } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

export default function Hero() {
  return (
    <section className="relative isolate min-h-[520px] overflow-hidden bg-accent md:min-h-[620px]">
      <Image
        src="/images/landing-page/03.png"
        alt="Sunlit greenhouse walkway at BB Blossoms lined with hydrangeas, dahlias, and hanging flower baskets"
        fill
        priority
        sizes="100vw"
        quality={95}
        className="object-cover object-center"
      />

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
          <h1 className="text-shadow-hero font-heading text-[31px] font-bold leading-tight text-white md:text-[43px] lg:text-[55px]">
            Beautiful Plants &amp; Trees, Grown for{" "}
            <span className="font-script text-blossom-pink text-[1.4em] leading-none">
              Georgia Yards
            </span>
          </h1>
          <p className="text-shadow-hero mt-5 max-w-xl text-[16.5px] text-gold">
            Shop healthy, nursery-grown trees, shrubs, and flowering plants
            carefully selected to thrive in Georgia&rsquo;s climate. Enjoy
            local delivery and professional installation throughout{" "}
            {siteConfig.primaryCity}, Gwinnett County, and the Atlanta metro
            area.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href="/shop/" variant="primary">
              Shop Plants
            </LinkButton>
            <LinkButton href="/quote/" variant="secondary">
              📝 Get a Free Quote
            </LinkButton>
            <LinkButton href={siteConfig.phoneHref} variant="outline-light">
              📞 Call Now
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
}
