"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
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
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-border bg-white p-6 md:p-8">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-semibold">
          Name
        </label>
        <input
          id="name"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="tap-target w-full rounded-xl border border-border px-4 py-3 text-sm focus:outline-none focus-visible:outline-3 focus-visible:outline-accent"
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
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="tap-target w-full rounded-xl border border-border px-4 py-3 text-sm focus:outline-none focus-visible:outline-3 focus-visible:outline-accent"
        />
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
          className="tap-target w-full rounded-xl border border-border px-4 py-3 text-sm focus:outline-none focus-visible:outline-3 focus-visible:outline-accent"
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-semibold">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full rounded-xl border border-border px-4 py-3 text-sm focus:outline-none focus-visible:outline-3 focus-visible:outline-accent"
        />
      </div>
      {status === "error" && (
        <p className="text-sm text-sale">
          Something went wrong — please call us directly instead.
        </p>
      )}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="tap-target w-full rounded-xl bg-accent px-6 py-3 text-sm font-bold text-white disabled:opacity-40"
      >
        {status === "submitting" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
