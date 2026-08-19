import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "outline" | "outline-light" | "ghost";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-accent text-white hover:bg-accent-dark active:bg-accent-dark shadow-sm",
  secondary:
    "bg-primary text-white hover:bg-primary-dark active:bg-primary-dark shadow-sm",
  outline:
    "border-2 border-primary text-primary hover:bg-primary hover:text-white bg-transparent",
  // For dark/photo backgrounds where a dark-on-dark outline (the plain
  // "outline" variant) wouldn't be legible.
  "outline-light":
    "border-2 border-white/80 text-white hover:bg-white hover:text-primary-dark bg-transparent",
  ghost: "bg-white/10 text-white hover:bg-white/20",
};

const base =
  "tap-target inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-3 focus-visible:outline-accent";

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      className={`${base} ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
}

export function LinkButton({
  variant = "primary",
  className = "",
  href,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  href: string;
}) {
  return (
    <Link
      href={href}
      className={`${base} ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
}
