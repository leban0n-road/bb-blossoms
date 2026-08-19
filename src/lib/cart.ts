"use client";

const STORAGE_KEY = "bb-blossoms-cart-count";
const EVENT_NAME = "bb-cart-updated";

export function getCartCount(): number {
  if (typeof window === "undefined") return 0;
  return Number(window.localStorage.getItem(STORAGE_KEY) ?? "0");
}

export function getServerCartCount(): number {
  return 0;
}

export function addToCart(quantity: number) {
  if (typeof window === "undefined") return;
  const next = getCartCount() + quantity;
  window.localStorage.setItem(STORAGE_KEY, String(next));
  window.dispatchEvent(new CustomEvent(EVENT_NAME));
}

/** Subscribe to cart changes. Designed for React's useSyncExternalStore. */
export function subscribeToCart(onChange: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(EVENT_NAME, onChange);
  return () => window.removeEventListener(EVENT_NAME, onChange);
}
