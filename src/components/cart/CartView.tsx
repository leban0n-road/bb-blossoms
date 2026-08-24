"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import { Info, Lock, ShieldCheck, Truck, Store } from "lucide-react";
import {
  clearCart,
  getCartItems,
  getServerCartItems,
  removeCartItem,
  subscribeToCart,
  updateCartItemQuantity,
  type CartItem,
} from "@/lib/cart";
import GoldFlourish from "@/components/home/GoldFlourish";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FREE_DELIVERY_THRESHOLD = 150;
const STATE_OPTIONS = ["Georgia", "Alabama", "North Carolina", "South Carolina", "Tennessee"];

type Status = "idle" | "submitting" | "success" | "error";
type DeliveryMethod = "delivery" | "pickup";

function lineTotal(item: CartItem) {
  return (item.unitPrice + item.installationFee) * item.quantity;
}

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-heading text-base font-bold text-neutral-dark">{children}</h2>
  );
}

function SectionDivider() {
  return (
    <div className="my-6 flex items-center gap-3" aria-hidden="true">
      <span className="h-px flex-1 bg-[color:var(--color-nav-bronze)]/30" />
      <GoldFlourish />
      <span className="h-px flex-1 bg-[color:var(--color-nav-bronze)]/30" />
    </div>
  );
}

const inputClass =
  "tap-target w-full rounded-xl border border-border bg-white px-4 py-3 text-sm focus:outline-none focus-visible:outline-3 focus-visible:outline-accent";

function formatCardNumber(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
}

export default function CartView() {
  const items = useSyncExternalStore(subscribeToCart, getCartItems, getServerCartItems);
  const subtotal = items.reduce((sum, item) => sum + lineTotal(item), 0);

  const [status, setStatus] = useState<Status>("idle");
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("delivery");
  const [details, setDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: STATE_OPTIONS[0],
    zip: "",
    deliveryDate: "",
    notes: "",
  });
  // Card fields are display-only for this demo checkout — they are never
  // included in the submitted request, matching the "no online payment"
  // business flow. autoComplete is disabled so browsers don't offer to
  // fill in a real saved card here.
  const [payment, setPayment] = useState({ cardNumber: "", expiry: "", cvc: "", nameOnCard: "" });
  const [discountCode, setDiscountCode] = useState("");
  const [discountMessage, setDiscountMessage] = useState("");
  const [company, setCompany] = useState("");
  const [emailError, setEmailError] = useState("");

  const shippingLabel =
    deliveryMethod === "pickup"
      ? "Free — will-call pickup"
      : subtotal >= FREE_DELIVERY_THRESHOLD
        ? "Free local delivery"
        : "Confirmed at follow-up";

  function applyDiscount() {
    if (!discountCode.trim()) return;
    setDiscountMessage("We don't run online discount codes yet — mention it and we'll check when we follow up.");
  }

  async function handlePlaceOrder(e: FormEvent) {
    e.preventDefault();
    if (!EMAIL_PATTERN.test(details.email)) {
      setEmailError("Enter a valid email address.");
      return;
    }
    setEmailError("");
    setStatus("submitting");
    const fullAddress =
      deliveryMethod === "pickup"
        ? "Will-call pickup — Lawrenceville, GA nursery"
        : `${details.address}, ${details.city}, ${details.state} ${details.zip}`;
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          total: subtotal,
          name: `${details.firstName} ${details.lastName}`.trim(),
          email: details.email,
          phone: details.phone,
          address: fullAddress,
          deliveryMethod,
          deliveryDate: details.deliveryDate,
          notes: details.notes,
          company,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      clearCart();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="mx-auto max-w-md rounded-2xl border border-[color:var(--color-nav-bronze)] bg-parchment p-8 text-center shadow-md">
        <div className="mb-4 flex justify-center" aria-hidden="true">
          <GoldFlourish />
        </div>
        <h2 className="font-heading text-xl font-bold text-primary">
          Order request received!
        </h2>
        <p className="mt-2 text-sm text-neutral-dark/70">
          A member of our team will reach out shortly to confirm details and
          arrange payment — nothing has been charged yet.
        </p>
        <Link
          href="/shop/"
          className="tap-target mt-5 inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white hover:bg-primary-dark"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

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

  return (
    <form onSubmit={handlePlaceOrder} className="grid gap-8 lg:grid-cols-[1fr_400px] lg:items-start">
      {/* Honeypot — hidden from real visitors, catches naive bots. */}
      <div className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>

      <div className="rounded-2xl border border-[color:var(--color-nav-bronze)] bg-parchment p-6 shadow-md md:p-8">
        <div className="mb-2 flex justify-center" aria-hidden="true">
          <GoldFlourish />
        </div>

        <SectionHeading>Contact</SectionHeading>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <input
              id="checkout-email"
              type="email"
              required
              placeholder="Email address"
              value={details.email}
              onChange={(e) => {
                setDetails({ ...details, email: e.target.value });
                if (emailError) setEmailError("");
              }}
              className={inputClass}
            />
            {emailError && <p className="mt-1 text-xs text-sale">{emailError}</p>}
          </div>
          <div className="sm:col-span-2">
            <input
              id="checkout-phone"
              type="tel"
              placeholder="Phone (optional)"
              value={details.phone}
              onChange={(e) => setDetails({ ...details, phone: e.target.value })}
              className={inputClass}
            />
          </div>
        </div>

        <SectionDivider />

        <SectionHeading>Delivery</SectionHeading>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setDeliveryMethod("delivery")}
            className={`btn-delivery-metallic tap-target flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold ${
              deliveryMethod === "delivery"
                ? "is-selected text-white"
                : "text-neutral-dark"
            }`}
          >
            <span className="inline-flex items-center gap-2">
              <Truck
                aria-hidden="true"
                size={16}
                className={deliveryMethod === "delivery" ? "icon-idle-drift" : ""}
              />
              Local Delivery
            </span>
          </button>
          <button
            type="button"
            onClick={() => setDeliveryMethod("pickup")}
            className={`btn-delivery-metallic tap-target flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold ${
              deliveryMethod === "pickup"
                ? "is-selected text-white"
                : "text-neutral-dark"
            }`}
          >
            <span className="inline-flex items-center gap-2">
              <Store
                aria-hidden="true"
                size={16}
                className={deliveryMethod === "pickup" ? "icon-idle-sway" : ""}
              />
              Will-Call Pickup
            </span>
          </button>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <input
            id="checkout-first-name"
            required
            placeholder="First name"
            value={details.firstName}
            onChange={(e) => setDetails({ ...details, firstName: e.target.value })}
            className={inputClass}
          />
          <input
            id="checkout-last-name"
            required
            placeholder="Last name"
            value={details.lastName}
            onChange={(e) => setDetails({ ...details, lastName: e.target.value })}
            className={inputClass}
          />

          {deliveryMethod === "delivery" ? (
            <>
              <div className="sm:col-span-2">
                <input
                  id="checkout-address"
                  required
                  placeholder="Delivery address"
                  value={details.address}
                  onChange={(e) => setDetails({ ...details, address: e.target.value })}
                  className={inputClass}
                />
              </div>
              <input
                id="checkout-city"
                required
                placeholder="City"
                value={details.city}
                onChange={(e) => setDetails({ ...details, city: e.target.value })}
                className={inputClass}
              />
              <div className="grid grid-cols-2 gap-3">
                <select
                  id="checkout-state"
                  value={details.state}
                  onChange={(e) => setDetails({ ...details, state: e.target.value })}
                  className={inputClass}
                >
                  {STATE_OPTIONS.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                <input
                  id="checkout-zip"
                  required
                  inputMode="numeric"
                  placeholder="ZIP code"
                  value={details.zip}
                  onChange={(e) => setDetails({ ...details, zip: e.target.value })}
                  className={inputClass}
                />
              </div>
            </>
          ) : (
            <div className="sm:col-span-2 rounded-xl border border-border bg-white p-3 text-sm text-neutral-dark/70">
              Free will-call pickup at our Lawrenceville, GA nursery — no minimum purchase required.
            </div>
          )}

          <div className="sm:col-span-2">
            <label htmlFor="checkout-date" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-neutral-dark/60">
              Preferred date (optional)
            </label>
            <input
              id="checkout-date"
              type="date"
              value={details.deliveryDate}
              onChange={(e) => setDetails({ ...details, deliveryDate: e.target.value })}
              className={inputClass}
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="checkout-notes" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-neutral-dark/60">
              Notes (optional)
            </label>
            <textarea
              id="checkout-notes"
              rows={2}
              value={details.notes}
              onChange={(e) => setDetails({ ...details, notes: e.target.value })}
              className={inputClass}
            />
          </div>
        </div>

        <SectionDivider />

        <div className="flex items-center justify-between gap-2">
          <SectionHeading>Payment</SectionHeading>
          <span className="text-[11px] font-semibold uppercase tracking-wide text-neutral-dark/40">
            Demo — nothing is charged
          </span>
        </div>
        <div className="mt-3 rounded-xl border border-primary bg-white p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-neutral-dark">Credit card</span>
            <span className="text-xs text-neutral-dark/40">Visa · Mastercard · Amex</span>
          </div>
          <div className="grid gap-3">
            <div className="relative">
              <input
                id="checkout-card-number"
                placeholder="Card number"
                inputMode="numeric"
                autoComplete="off"
                value={payment.cardNumber}
                onChange={(e) => setPayment({ ...payment, cardNumber: formatCardNumber(e.target.value) })}
                className={`${inputClass} pr-10`}
              />
              <Lock aria-hidden="true" size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-dark/30" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input
                id="checkout-card-expiry"
                placeholder="MM/YY"
                inputMode="numeric"
                autoComplete="off"
                value={payment.expiry}
                onChange={(e) => setPayment({ ...payment, expiry: formatExpiry(e.target.value) })}
                className={inputClass}
              />
              <input
                id="checkout-card-cvc"
                placeholder="Security code"
                inputMode="numeric"
                autoComplete="off"
                value={payment.cvc}
                onChange={(e) => setPayment({ ...payment, cvc: e.target.value.replace(/\D/g, "").slice(0, 4) })}
                className={inputClass}
              />
            </div>
            <input
              id="checkout-card-name"
              placeholder="Name on card"
              autoComplete="off"
              value={payment.nameOnCard}
              onChange={(e) => setPayment({ ...payment, nameOnCard: e.target.value })}
              className={inputClass}
            />
          </div>
        </div>
        <p className="mt-3 flex items-start gap-1.5 text-xs text-neutral-dark/50">
          <Info aria-hidden="true" size={14} className="mt-0.5 shrink-0" />
          This is a preview checkout. Card details stay in your browser and
          are never submitted, stored, or charged — placing an order sends
          your contact and order details to our team, who follow up to
          confirm availability, delivery, and payment.
        </p>

        {status === "error" && (
          <p className="mt-3 text-sm text-sale">
            Something went wrong — please call us directly instead.
          </p>
        )}
      </div>

      <div className="lg:sticky lg:top-24 rounded-2xl border border-[color:var(--color-nav-bronze)] bg-parchment p-6 shadow-md">
        <div className="mb-2 flex justify-center" aria-hidden="true">
          <GoldFlourish />
        </div>
        <h2 className="font-heading text-lg font-bold text-neutral-dark">Order Summary</h2>

        <ul className="mt-4 space-y-4">
          {items.map((item) => (
            <li key={item.id} className="flex gap-3">
              <div className="relative h-16 w-16 shrink-0">
                <div className="relative h-16 w-16 overflow-hidden rounded-xl border border-border bg-white">
                  <Image src={item.image} alt="" fill sizes="64px" className="object-cover" />
                </div>
                <span
                  aria-hidden="true"
                  className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-parchment bg-neutral-dark px-1 text-[11px] font-bold text-white"
                >
                  {item.quantity}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <Link
                      href={`/shop/${item.category}/${item.plantSlug}/`}
                      className="text-sm font-semibold text-neutral-dark hover:text-primary hover:underline"
                    >
                      {item.plantName}
                    </Link>
                    <p className="mt-0.5 text-xs text-neutral-dark/50">
                      {item.sizeLabel}
                      {item.installation ? " · with installation" : ""}
                    </p>
                  </div>
                  <span className="shrink-0 text-sm font-bold text-primary">
                    ${lineTotal(item).toFixed(2)}
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-3">
                  <div className="flex items-center rounded-lg border border-border">
                    <button
                      type="button"
                      aria-label={`Decrease quantity of ${item.plantName}`}
                      className="tap-target px-2.5 text-sm"
                      onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-xs font-semibold">{item.quantity}</span>
                    <button
                      type="button"
                      aria-label={`Increase quantity of ${item.plantName}`}
                      className="tap-target px-2.5 text-sm"
                      onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeCartItem(item.id)}
                    aria-label={`Remove ${item.plantName} from cart`}
                    className="tap-target text-xs font-medium text-neutral-dark/50 hover:text-sale"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex gap-2 border-t border-[color:var(--color-nav-bronze)]/40 pt-4">
          <input
            type="text"
            placeholder="Discount code"
            value={discountCode}
            onChange={(e) => {
              setDiscountCode(e.target.value);
              if (discountMessage) setDiscountMessage("");
            }}
            className="tap-target flex-1 rounded-xl border border-border bg-white px-3 py-2 text-sm focus:outline-none focus-visible:outline-3 focus-visible:outline-accent"
          />
          <button
            type="button"
            onClick={applyDiscount}
            className="tap-target shrink-0 rounded-xl border border-border bg-white px-4 text-sm font-semibold text-neutral-dark hover:border-primary"
          >
            Apply
          </button>
        </div>
        {discountMessage && (
          <p className="mt-2 text-xs text-neutral-dark/60">{discountMessage}</p>
        )}

        <div className="mt-4 space-y-2 border-t border-[color:var(--color-nav-bronze)]/40 pt-4 text-sm">
          <div className="flex items-center justify-between text-neutral-dark/70">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-neutral-dark/70">
            <span>{deliveryMethod === "pickup" ? "Pickup" : "Delivery"}</span>
            <span>{shippingLabel}</span>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-[color:var(--color-nav-bronze)]/40 pt-3">
          <span className="text-sm font-semibold text-neutral-dark/70">Total</span>
          <span className="font-heading text-xl font-bold text-primary">${subtotal.toFixed(2)}</span>
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="tap-target mt-5 w-full rounded-xl bg-primary px-5 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-primary-dark disabled:opacity-40"
        >
          {status === "submitting" ? "Submitting…" : "Place Order"}
        </button>

        <p className="mt-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-neutral-dark/50">
          <span className="inline-flex items-center gap-1">
            <Lock aria-hidden="true" size={12} className="text-primary" />
            Secure checkout
          </span>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1">
            <ShieldCheck aria-hidden="true" size={12} className="text-primary" />
            Licensed &amp; insured installation crew
          </span>
        </p>

        <Link
          href={`/quote/?plants=${encodeURIComponent(items.map((item) => item.plantName).join(", "))}`}
          className="mt-4 block text-center text-sm font-semibold text-accent hover:underline"
        >
          Prefer a formal quote instead?
        </Link>
      </div>
    </form>
  );
}
