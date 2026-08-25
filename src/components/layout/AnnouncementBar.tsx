import { Leaf } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function AnnouncementBar() {
  return (
    <div className="bg-primary-dark text-white">
      {/* flex-col on mobile stacks the two sentences onto their own lines
          instead of cramming icon + both sentences + phone link onto one
          row; md:flex-row restores the original single-line layout at
          tablet/desktop widths. A <br> here would be unreliable — browsers
          don't consistently honor line breaks between flex items. */}
      <p className="container-page flex flex-col items-center gap-1 py-2 text-center text-xs font-medium md:flex-row md:justify-center md:gap-2 md:text-sm">
        <span className="inline-flex items-center gap-2">
          <Leaf aria-hidden="true" size={14} strokeWidth={2} className="shrink-0 text-white" />
          Free local delivery on orders over $150
        </span>
        <span className="hidden md:inline">&nbsp;•&nbsp;</span>
        <span>
          Call{" "}
          <a href={siteConfig.phoneHref} className="underline underline-offset-2">
            {siteConfig.phone}
          </a>{" "}
          for same-week installation quotes
        </span>
      </p>
    </div>
  );
}
