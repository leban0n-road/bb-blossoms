import { Leaf } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function AnnouncementBar() {
  return (
    <div className="bg-primary-dark text-white">
      <p className="container-page flex items-center justify-center gap-2 py-2 text-center text-xs font-medium md:text-sm">
        <Leaf aria-hidden="true" size={14} strokeWidth={2} className="shrink-0 text-white" />
        Free local delivery on orders over $150 &nbsp;•&nbsp; Call{" "}
        <a href={siteConfig.phoneHref} className="underline underline-offset-2">
          {siteConfig.phone}
        </a>{" "}
        for same-week installation quotes
      </p>
    </div>
  );
}
