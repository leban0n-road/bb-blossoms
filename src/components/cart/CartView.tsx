"use client";

import Image from "next/image";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import {
  getCartItems,
  getServerCartItems,
  removeCartItem,
  subscribeToCart,
  updateCartItemQuantity,
  type CartItem,
} from "@/lib/cart";

function lineTotal(item: CartItem) {
  return (item.unitPrice + item.installationFee) * item.quantity;
}

export default function CartView() {
  const items = useSyncExternalStore(subscribeToCart, getCartItems, getServerCartItems);
  const total = items.reduce((sum, item) => sum + lineTotal(item), 0);

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-white p-8 text-center">
        <p className="text-lg font-semibold text-neutral-dark">Your cart is empty</p>
        <p className="mt-2 text-sm text-neutral-dark/70">
          Browse our plants and add a few to get started.
        </p>
        <Link
          href="/shop/"
          className="tap-target mt-5 inline-flex items-center justify-center rounded-xl bg-accent px-6 py-3 text-sm font-bold text-white hover:bg-accent-dark"
        >
          Shop Plants
        </Link>
      </div>
    );
  }

  const plantNames = items.map((item) => item.plantName).join(", ");

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.id} className="flex gap-4 rounded-2xl border border-border bg-white p-4">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-neutral-bg">
              <Image src={item.image} alt="" fill sizes="80px" className="object-cover" />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <Link
                    href={`/shop/${item.category}/${item.plantSlug}/`}
                    className="font-heading font-bold text-primary hover:underline"
                  >
                    {item.plantName}
                  </Link>
                  <p className="mt-0.5 text-sm text-neutral-dark/60">
                    {item.sizeLabel}
                    {item.installation ? " · with installation" : ""}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeCartItem(item.id)}
                  aria-label={`Remove ${item.plantName} from cart`}
                  className="tap-target text-sm font-medium text-neutral-dark/50 hover:text-sale"
                >
                  Remove
                </button>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center rounded-lg border border-border">
                  <button
                    type="button"
                    aria-label={`Decrease quantity of ${item.plantName}`}
                    className="tap-target px-3 text-lg"
                    onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                  <button
                    type="button"
                    aria-label={`Increase quantity of ${item.plantName}`}
                    className="tap-target px-3 text-lg"
                    onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <span className="font-bold text-primary">${lineTotal(item).toFixed(2)}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="h-fit rounded-2xl border border-border bg-white p-6">
        <h2 className="font-heading text-lg font-bold text-neutral-dark">Order Summary</h2>
        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <span className="text-sm font-semibold text-neutral-dark/70">Estimated Total</span>
          <span className="text-xl font-bold text-primary">${total.toFixed(2)}</span>
        </div>
        <p className="mt-2 text-xs text-neutral-dark/50">
          Final pricing is confirmed on your quote — delivery and any
          site-specific costs aren&rsquo;t included here.
        </p>
        <Link
          href={`/quote/?plants=${encodeURIComponent(plantNames)}`}
          className="tap-target mt-5 flex w-full items-center justify-center rounded-xl bg-accent px-5 py-3 text-sm font-bold text-white hover:bg-accent-dark"
        >
          Request a Quote for These Items
        </Link>
      </div>
    </div>
  );
}
