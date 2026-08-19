"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { getCartCount, getServerCartCount, subscribeToCart } from "@/lib/cart";

export default function CartButton() {
  const count = useSyncExternalStore(subscribeToCart, getCartCount, getServerCartCount);

  return (
    <Link
      href="/quote/"
      className="tap-target relative inline-flex items-center justify-center rounded-lg p-2 text-neutral-dark hover:text-accent"
      aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}
    >
      <span className="text-2xl" aria-hidden="true">
        🛒
      </span>
      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
          {count}
        </span>
      )}
    </Link>
  );
}
