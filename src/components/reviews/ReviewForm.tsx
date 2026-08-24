"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Star } from "lucide-react";
import GoldFlourish from "@/components/home/GoldFlourish";

type Status = "idle" | "submitting" | "success" | "error";

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

function StarPicker({ rating, onChange }: { rating: number; onChange: (n: number) => void }) {
  const [hovered, setHovered] = useState(0);
  const display = hovered || rating;

  return (
    <div className="flex gap-1" onMouseLeave={() => setHovered(0)}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          aria-label={`Rate ${n} out of 5 stars`}
          aria-pressed={rating === n}
          onMouseEnter={() => setHovered(n)}
          onFocus={() => setHovered(n)}
          onClick={() => onChange(n)}
          className="tap-target rounded p-1"
        >
          <Star
            aria-hidden="true"
            size={28}
            strokeWidth={1.5}
            className={n <= display ? "fill-gold text-gold" : "fill-transparent text-border"}
          />
        </button>
      ))}
    </div>
  );
}

export default function ReviewForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [rating, setRating] = useState(0);
  const [form, setForm] = useState({ name: "", plant: "", review: "" });
  const [company, setCompany] = useState("");
  const [ratingError, setRatingError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (rating === 0) {
      setRatingError("Please select a star rating.");
      return;
    }
    setRatingError("");
    setStatus("submitting");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, rating, company }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setForm({ name: "", plant: "", review: "" });
      setRating(0);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-[color:var(--color-nav-bronze)] bg-parchment p-8 text-center shadow-md">
        <div className="mb-4 flex justify-center" aria-hidden="true">
          <GoldFlourish />
        </div>
        <h2 className="font-heading text-xl font-bold text-primary">
          Thanks for your review!
        </h2>
        <p className="mt-2 text-sm text-neutral-dark/70">
          It&rsquo;ll appear on our reviews page once approved.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-[color:var(--color-nav-bronze)] bg-parchment p-6 shadow-md md:p-8"
    >
      <div className="mb-4 flex justify-center" aria-hidden="true">
        <GoldFlourish />
      </div>

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

      <div className="mb-6">
        <SectionLabel step={1}>Your Rating</SectionLabel>
        <StarPicker rating={rating} onChange={(n) => { setRating(n); setRatingError(""); }} />
        {ratingError && <p className="mt-1 text-xs text-sale">{ratingError}</p>}
      </div>

      <div className="mb-6">
        <SectionLabel step={2}>Your Name</SectionLabel>
        <input
          id="reviewer-name"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="tap-target w-full rounded-xl border border-border bg-white px-4 py-3 text-sm focus:outline-none focus-visible:outline-3 focus-visible:outline-accent"
        />
      </div>

      <div className="mb-6">
        <SectionLabel step={3}>Which Plant? (optional)</SectionLabel>
        <input
          id="reviewer-plant"
          value={form.plant}
          onChange={(e) => setForm({ ...form, plant: e.target.value })}
          placeholder="e.g. Green Giant Arborvitae"
          className="tap-target w-full rounded-xl border border-border bg-white px-4 py-3 text-sm focus:outline-none focus-visible:outline-3 focus-visible:outline-accent"
        />
      </div>

      <div className="mb-2">
        <SectionLabel step={4}>Your Review</SectionLabel>
        <textarea
          id="reviewer-review"
          required
          rows={5}
          value={form.review}
          onChange={(e) => setForm({ ...form, review: e.target.value })}
          className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm focus:outline-none focus-visible:outline-3 focus-visible:outline-accent"
        />
      </div>

      {status === "error" && (
        <p className="mt-4 text-sm text-sale">
          Something went wrong — please try again or call us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="tap-target mt-4 w-full rounded-xl bg-primary px-5 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-primary-dark disabled:opacity-40"
      >
        {status === "submitting" ? "Submitting…" : "Submit Review"}
      </button>
    </form>
  );
}
