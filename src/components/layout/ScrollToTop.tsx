"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Resets scroll position to the top on every route change. usePathname()
 * only changes on actual navigation (not on hash-only anchor jumps), so
 * in-page "#section" links are untouched. behavior: "instant" overrides
 * the site's global `scroll-behavior: smooth` (globals.css) — a full page
 * navigation should snap to top immediately, not visibly animate down-then
 * -up from wherever the previous page was scrolled to.
 */
export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
