import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function StickyMobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-px border-t border-border bg-border shadow-[0_-4px_12px_rgba(0,0,0,0.08)] lg:hidden">
      <a
        href={siteConfig.phoneHref}
        className="tap-target flex items-center justify-center gap-2 bg-primary py-4 text-sm font-bold text-white"
      >
        📞 Call Now
      </a>
      <Link
        href="/shop/"
        className="tap-target flex items-center justify-center gap-2 bg-accent py-4 text-sm font-bold text-white"
      >
        🛒 Shop Plants
      </Link>
    </div>
  );
}
