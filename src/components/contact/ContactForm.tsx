"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import GoldFlourish from "@/components/home/GoldFlourish";

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  // Honeypot: a field real visitors never see or fill in (hidden off-screen,
  // not display:none, so naive bots that skip hidden inputs still fill it).
  // Any value here means it's a bot — reject silently, no error shown.
  const [company, setCompany] = useState("");
  const [emailError, setEmailError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setEmailError("");

    if (!EMAIL_PATTERN.test(form.email)) {
      setEmailError("Enter a valid email address.");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, company }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center">
        <h2 className="font-heading text-xl font-bold text-primary">
          Message sent!
        </h2>
        <p className="mt-2 text-sm text-neutral-dark/70">
          We typically respond within one business day.
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

      {/* Honeypot — visually hidden but still in the DOM/tab order removed
          via tabIndex/aria, not display:none (which some bots detect and
          skip). Real visitors never see or reach it. */}
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

      <div className="space-y-4">
        <SectionLabel step={1}>Your Info</SectionLabel>
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-semibold">
            Name
          </label>
          <input
            id="name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="tap-target w-full rounded-xl border border-border bg-white px-4 py-3 text-sm focus:outline-none focus-visible:outline-3 focus-visible:outline-accent"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-semibold">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => {
              setForm({ ...form, email: e.target.value });
              if (emailError) setEmailError("");
            }}
            className="tap-target w-full rounded-xl border border-border bg-white px-4 py-3 text-sm focus:outline-none focus-visible:outline-3 focus-visible:outline-accent"
          />
          {emailError && <p className="mt-1 text-xs text-sale">{emailError}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="mb-1 block text-sm font-semibold">
            Phone (optional)
          </label>
          <input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="tap-target w-full rounded-xl border border-border bg-white px-4 py-3 text-sm focus:outline-none focus-visible:outline-3 focus-visible:outline-accent"
          />
        </div>
      </div>

      <div className="mt-6 border-t border-[color:var(--color-nav-bronze)]/40 pt-4">
        <SectionLabel step={2}>Your Message</SectionLabel>
        <textarea
          id="message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm focus:outline-none focus-visible:outline-3 focus-visible:outline-accent"
        />
      </div>

      {status === "error" && (
        <p className="mt-4 text-sm text-sale">
          Something went wrong — please call us directly instead.
        </p>
      )}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="tap-target mt-4 w-full rounded-xl bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-primary-dark disabled:opacity-40"
      >
        {status === "submitting" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
