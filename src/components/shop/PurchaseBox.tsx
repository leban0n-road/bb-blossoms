"use client";

import { useMemo, useState, type ReactNode } from "react";
import { Leaf, Lock, ShieldCheck } from "lucide-react";
import { addToCart } from "@/lib/cart";
import type { Plant } from "@/lib/types";
import GoldFlourish from "@/components/home/GoldFlourish";

const INSTALLATION_FEE = 45;

function SectionLabel({ step, children }: { step: number; children: ReactNode }) {
  return (
    <div className="mb-2 flex items-center gap-2">
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white">
        {step}
      </span>
      <span className="text-xs font-semibold uppercase tracking-wider text-neutral-dark">
        {children}
      </span>
    </div>
  );
}

export default function PurchaseBox({ plant }: { plant: Plant }) {
  const sizeOptions = plant.potSizeOptions?.length
    ? plant.potSizeOptions
    : [{ label: plant.potSize, price: plant.salePrice ?? plant.price }];

  const [sizeIndex, setSizeIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [installation, setInstallation] = useState(false);
  const [added, setAdded] = useState(false);

  const unitPrice = sizeOptions[sizeIndex].price;
  const total = useMemo(() => {
    const base = unitPrice * quantity;
    const install = installation ? INSTALLATION_FEE * quantity : 0;
    return base + install;
  }, [unitPrice, quantity, installation]);

  return (
    <div className="rounded-2xl border border-[color:var(--color-nav-bronze)] bg-parchment p-6 shadow-md">
      <div className="mb-4 flex justify-center" aria-hidden="true">
        <GoldFlourish />
      </div>

      <div className="flex items-baseline gap-2">
        {plant.salePrice ? (
          <>
            <span className="font-heading text-3xl font-bold text-sale">
              ${plant.salePrice}
            </span>
            <span className="text-lg text-neutral-dark/50 line-through">
              ${plant.price}
            </span>
          </>
        ) : (
          <span className="font-heading text-3xl font-bold text-primary">
            ${unitPrice}
          </span>
        )}
      </div>

      <div className="mt-6">
        <SectionLabel step={1}>Pot Size</SectionLabel>
        <div className="flex flex-wrap gap-2">
          {sizeOptions.map((opt, i) => {
            const selected = i === sizeIndex;
            return (
              <button
                key={opt.label}
                type="button"
                onClick={() => setSizeIndex(i)}
                className={`tap-target inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                  selected
                    ? "border-primary bg-primary text-white"
                    : "border-border bg-white text-neutral-dark hover:border-primary"
                }`}
              >
                {selected && (
                  <Leaf aria-hidden="true" size={12} className="shrink-0 text-plaque-gold" />
                )}
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
          <SectionLabel step={2}>Quantity</SectionLabel>
          {/* Static copy — the product data model has no inventory/stock
              field to drive this dynamically (checked src/lib/types.ts).
              Flagging rather than assuming, per the build report's own
              note: swap for a real availability check if/when that field
              gets added. */}
          <span className="mb-2 inline-flex items-center gap-1 text-xs font-medium text-primary">
            <Leaf aria-hidden="true" size={12} />
            In stock &amp; ready to grow
          </span>
        </div>
        <div className="flex w-fit items-center rounded-lg border border-border bg-white">
          <button
            type="button"
            aria-label="Decrease quantity"
            className="tap-target px-3 text-lg"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          >
            −
          </button>
          <input
            id="quantity"
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
            className="tap-target w-14 border-x border-border text-center [appearance:textfield]"
          />
          <button
            type="button"
            aria-label="Increase quantity"
            className="tap-target px-3 text-lg"
            onClick={() => setQuantity((q) => q + 1)}
          >
            +
          </button>
        </div>
      </div>

      {plant.installationUpsell && (
        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between gap-2">
            <SectionLabel step={3}>Add Professional Installation</SectionLabel>
            <span className="shrink-0 text-xs font-semibold text-primary">
              + ${INSTALLATION_FEE}/plant
            </span>
          </div>
          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-white p-3 text-sm">
            <input
              type="checkbox"
              checked={installation}
              onChange={(e) => setInstallation(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-primary"
            />
            <span className="flex-1 text-neutral-dark/70">
              Our crew plants it at the correct depth and spacing — includes a
              1-year establishment guarantee.
            </span>
            <ShieldCheck aria-hidden="true" size={18} className="mt-0.5 shrink-0 text-primary" />
          </label>
        </div>
      )}

      <div className="mt-6 flex items-center justify-between border-t border-[color:var(--color-nav-bronze)]/40 pt-4">
        <span className="text-sm font-semibold text-neutral-dark/70">
          Total
        </span>
        <span className="font-heading text-xl font-bold text-primary">
          ${total.toFixed(2)}
        </span>
      </div>

      <button
        type="button"
        onClick={() => {
          addToCart({
            plantSlug: plant.slug,
            category: plant.category,
            plantName: plant.name,
            image: plant.image,
            sizeLabel: sizeOptions[sizeIndex].label,
            unitPrice,
            quantity,
            installation,
            installationFee: installation ? INSTALLATION_FEE : 0,
          });
          setAdded(true);
          setTimeout(() => setAdded(false), 2500);
        }}
        className="tap-target mt-4 w-full rounded-xl bg-primary px-5 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-primary-dark"
      >
        {added ? "Added to Cart ✓" : "Add to Cart"}
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
    </div>
  );
}
