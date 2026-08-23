"use client";

import { useState } from "react";
import type { ReactNode } from "react";

/**
 * Non-navigating social icon button — deliberately not a link (no href,
 * no window.open). onClick only toggles a brief press-bounce class for
 * visual feedback; a real <button> handles keyboard activation (Enter/
 * Space) and touch taps the same way as a mouse click for free, so no
 * separate touch handling is needed.
 */
export default function SocialIconButton({ label, children }: { label: string; children: ReactNode }) {
  const [pressed, setPressed] = useState(false);

  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => {
        setPressed(false);
        requestAnimationFrame(() => setPressed(true));
      }}
      onAnimationEnd={() => setPressed(false)}
      className={`btn-need tap-target flex h-9 w-9 items-center justify-center rounded-full border border-gold/50 bg-white/5 transition-colors hover:border-gold hover:bg-white/10 ${
        pressed ? "icon-press-bounce" : ""
      }`}
    >
      {children}
    </button>
  );
}
