"use client";

const STORAGE_KEY = "bb-blossoms-cart-items";
const EVENT_NAME = "bb-cart-updated";

export type CartItem = {
  id: string;
  plantSlug: string;
  category: string;
  plantName: string;
  image: string;
  sizeLabel: string;
  unitPrice: number;
  quantity: number;
  installation: boolean;
  installationFee: number;
};

const EMPTY_ITEMS: CartItem[] = [];

// useSyncExternalStore requires getSnapshot to return the same reference
// when nothing has changed, or it re-renders forever. Cache the parsed
// array and only replace it when the cart is actually written to.
let cachedItems: CartItem[] | null = null;

function readItems(): CartItem[] {
  if (typeof window === "undefined") return EMPTY_ITEMS;
  if (cachedItems) return cachedItems;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    cachedItems = raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    cachedItems = [];
  }
  return cachedItems;
}

function writeItems(items: CartItem[]) {
  cachedItems = items;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent(EVENT_NAME));
}

export function getCartItems(): CartItem[] {
  return readItems();
}

export function getServerCartItems(): CartItem[] {
  return EMPTY_ITEMS;
}

export function getCartCount(): number {
  return readItems().reduce((sum, item) => sum + item.quantity, 0);
}

export function getServerCartCount(): number {
  return 0;
}

/** Same plant + size + installation choice merges into one line, quantities add. */
export function addToCart(item: Omit<CartItem, "id">) {
  if (typeof window === "undefined") return;
  const id = `${item.plantSlug}__${item.sizeLabel}__${item.installation ? "install" : "no-install"}`;
  const items = readItems();
  const existing = items.find((i) => i.id === id);
  if (existing) {
    existing.quantity += item.quantity;
  } else {
    items.push({ ...item, id });
  }
  writeItems(items);
}

export function updateCartItemQuantity(id: string, quantity: number) {
  if (typeof window === "undefined") return;
  const items = readItems()
    .map((item) => (item.id === id ? { ...item, quantity } : item))
    .filter((item) => item.quantity > 0);
  writeItems(items);
}

export function removeCartItem(id: string) {
  if (typeof window === "undefined") return;
  writeItems(readItems().filter((item) => item.id !== id));
}

export function clearCart() {
  if (typeof window === "undefined") return;
  writeItems([]);
}

/** Subscribe to cart changes. Designed for React's useSyncExternalStore. */
export function subscribeToCart(onChange: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(EVENT_NAME, onChange);
  return () => window.removeEventListener(EVENT_NAME, onChange);
}
