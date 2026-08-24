"use client";

import { useState, type FormEvent } from "react";
import GoldFlourish from "@/components/home/GoldFlourish";

const PROJECT_TYPES = [
  "Privacy Screen / Fence Line",
  "New Landscape Bed",
  "Fruit Tree / Orchard",
  "Full Landscape Design",
  "Delivery Only (No Installation)",
  "Something Else",
];

type Status = "idle" | "submitting" | "success" | "error";

export default function QuoteForm() {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    projectType: "",
    plantInterest: "",
    zipOrCity: "",
    name: "",
    email: "",
    phone: "",
  });

  const steps = ["Project", "Plants", "Location", "Contact"];
  const canAdvance = [
    Boolean(form.projectType),
    true,
    Boolean(form.zipOrCity),
    Boolean(form.name && form.email),
  ];

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center">
        <h2 className="font-heading text-xl font-bold text-primary">
          Thanks — we&rsquo;ve got your request!
        </h2>
        <p className="mt-2 text-sm text-neutral-dark/70">
          A member of our team will follow up within one business day with
          your free quote.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[color:var(--color-nav-bronze)] bg-parchment p-6 shadow-md md:p-8">
      <div className="mb-4 flex justify-center" aria-hidden="true">
        <GoldFlourish />
      </div>

      <ol className="mb-6 flex items-center gap-2">
        {steps.map((label, i) => (
          <li key={label} className="flex flex-1 items-center gap-2">
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                i <= step ? "bg-primary text-white" : "bg-border text-neutral-dark/50"
              }`}
            >
              {i + 1}
            </span>
            <span className="hidden text-xs font-medium text-neutral-dark/60 sm:inline">
              {label}
            </span>
            {i < steps.length - 1 && <span className="h-px flex-1 bg-[color:var(--color-nav-bronze)]/40" />}
          </li>
        ))}
      </ol>

      <form onSubmit={handleSubmit}>
        {step === 0 && (
          <fieldset>
            <legend className="mb-3 font-heading text-lg font-bold text-neutral-dark">
              What&rsquo;s your project?
            </legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {PROJECT_TYPES.map((type) => (
                <label
                  key={type}
                  className={`tap-target flex cursor-pointer items-center rounded-xl border-2 px-4 py-3 text-sm font-medium transition-colors ${
                    form.projectType === type
                      ? "border-accent bg-accent-light/15"
                      : "border-border hover:border-accent-light"
                  }`}
                >
                  <input
                    type="radio"
                    name="projectType"
                    value={type}
                    checked={form.projectType === type}
                    onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                    className="sr-only"
                  />
                  {type}
                </label>
              ))}
            </div>
          </fieldset>
        )}

        {step === 1 && (
          <div>
            <label htmlFor="plantInterest" className="mb-2 block font-heading text-lg font-bold text-neutral-dark">
              Any plants in mind? (optional)
            </label>
            <input
              id="plantInterest"
              type="text"
              value={form.plantInterest}
              onChange={(e) => setForm({ ...form, plantInterest: e.target.value })}
              placeholder="e.g. Green Giant Arborvitae, Encore Azaleas…"
              className="tap-target w-full rounded-xl border border-border bg-white px-4 py-3 text-sm focus:outline-none focus-visible:outline-3 focus-visible:outline-accent"
            />
          </div>
        )}

        {step === 2 && (
          <div>
            <label htmlFor="zipOrCity" className="mb-2 block font-heading text-lg font-bold text-neutral-dark">
              Where&rsquo;s the project located?
            </label>
            <input
              id="zipOrCity"
              type="text"
              required
              value={form.zipOrCity}
              onChange={(e) => setForm({ ...form, zipOrCity: e.target.value })}
              placeholder="ZIP code or city"
              className="tap-target w-full rounded-xl border border-border bg-white px-4 py-3 text-sm focus:outline-none focus-visible:outline-3 focus-visible:outline-accent"
            />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-3">
            <h2 className="font-heading text-lg font-bold text-neutral-dark">
              How should we reach you?
            </h2>
            <input
              type="text"
              required
              placeholder="Full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="tap-target w-full rounded-xl border border-border bg-white px-4 py-3 text-sm focus:outline-none focus-visible:outline-3 focus-visible:outline-accent"
            />
            <input
              type="email"
              required
              placeholder="Email address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="tap-target w-full rounded-xl border border-border bg-white px-4 py-3 text-sm focus:outline-none focus-visible:outline-3 focus-visible:outline-accent"
            />
            <input
              type="tel"
              placeholder="Phone (optional)"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="tap-target w-full rounded-xl border border-border bg-white px-4 py-3 text-sm focus:outline-none focus-visible:outline-3 focus-visible:outline-accent"
            />
          </div>
        )}

        {status === "error" && (
          <p className="mt-4 text-sm text-sale">
            Something went wrong — please call us directly instead.
          </p>
        )}

        <div className="mt-6 flex justify-between gap-3">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="tap-target rounded-xl border border-border px-5 py-3 text-sm font-semibold text-neutral-dark"
            >
              Back
            </button>
          ) : (
            <span />
          )}

          {step < steps.length - 1 ? (
            <button
              type="button"
              disabled={!canAdvance[step]}
              onClick={() => setStep((s) => s + 1)}
              className="tap-target flex-1 rounded-xl bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-primary-dark disabled:opacity-40"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={!canAdvance[step] || status === "submitting"}
              className="tap-target flex-1 rounded-xl bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-primary-dark disabled:opacity-40"
            >
              {status === "submitting" ? "Sending…" : "Get My Free Quote"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
