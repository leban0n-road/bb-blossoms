"use client";

import { useMemo, useState } from "react";
import { addToCart } from "@/lib/cart";
import type { Plant } from "@/lib/types";

const INSTALLATION_FEE = 45;

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
    <div className="rounded-2xl border border-border bg-white p-6">
      <div className="flex items-baseline gap-2">
        {plant.salePrice ? (
          <>
            <span className="text-3xl font-bold text-sale">
              ${plant.salePrice}
            </span>
            <span className="text-lg text-neutral-dark/50 line-through">
              ${plant.price}
            </span>
          </>
        ) : (
          <span className="text-3xl font-bold text-primary">
            ${unitPrice}
          </span>
        )}
      </div>

      <div className="mt-5">
        <label className="mb-2 block text-sm font-semibold text-neutral-dark">
          Pot Size
        </label>
        <div className="flex flex-wrap gap-2">
          {sizeOptions.map((opt, i) => (
            <button
              key={opt.label}
              type="button"
              onClick={() => setSizeIndex(i)}
              className={`tap-target rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                i === sizeIndex
                  ? "border-accent bg-accent text-white"
                  : "border-border bg-white text-neutral-dark hover:border-accent"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="quantity" className="mb-2 block text-sm font-semibold text-neutral-dark">
          Quantity
        </label>
        <div className="flex w-fit items-center rounded-lg border border-border">
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
        <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-lg border border-border p-3 text-sm">
          <input
            type="checkbox"
            checked={installation}
            onChange={(e) => setInstallation(e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-accent"
          />
          <span>
            <span className="font-semibold">
              Add Professional Installation (+${INSTALLATION_FEE}/plant)
            </span>
            <br />
            <span className="text-neutral-dark/60">
              Our crew plants it at the correct depth and spacing — includes a
              1-year establishment guarantee.
            </span>
          </span>
        </label>
      )}

      <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
        <span className="text-sm font-semibold text-neutral-dark/70">
          Total
        </span>
        <span className="text-xl font-bold text-primary">
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
        className="tap-target mt-4 w-full rounded-xl bg-accent px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-accent-dark"
      >
        {added ? "Added to Cart ✓" : "Add to Cart"}
      </button>

      <p className="mt-3 flex items-center justify-center gap-2 text-xs text-neutral-dark/50">
        🔒 Secure checkout · 🛡️ Licensed &amp; insured installation crew
      </p>
    </div>
  );
}
