import Link from "next/link";
import { FileText, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";

/**
 * Gold-bordered "Get a Free Quote" + "Call Now" pair, matching the hero
 * section's metallic-gold icon treatment (.btn-need, idle sway + hover
 * overshoot). Unlike the hero's own buttons (bg-white/5, meant to sit on a
 * dark photo), these sit on plain white/cream page backgrounds, so the fill
 * is a darker bg-primary-dark/75 — enough opacity to keep white label text
 * comfortably above 4.5:1 contrast against a light backdrop (verified: a
 * lighter bg-primary-dark/65 measures ~4.5:1 here, right at the AA edge;
 * /75 clears it with real margin, ~6:1).
 */
export default function QuoteCallButtons({ gradientId }: { gradientId: string }) {
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
      <Link
        href="/quote/"
        className="btn-need tap-target inline-flex items-center gap-2 rounded-xl border-[1.5px] border-gold bg-primary-dark/75 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark/90"
      >
        <FileText
          aria-hidden="true"
          size={17}
          strokeWidth={1.75}
          color={`url(#${gradientId})`}
          className="need-icon-glow icon-idle-sway icon-hover-overshoot shrink-0"
        />
        Get a Free Quote
      </Link>
      <Link
        href={siteConfig.phoneHref}
        className="btn-need tap-target inline-flex items-center gap-2 rounded-xl border-[1.5px] border-gold bg-primary-dark/75 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark/90"
      >
        <Phone
          aria-hidden="true"
          size={17}
          strokeWidth={1.75}
          color={`url(#${gradientId})`}
          className="need-icon-glow icon-idle-sway icon-hover-overshoot shrink-0"
        />
        Call Now
      </Link>
    </>
  );
}
