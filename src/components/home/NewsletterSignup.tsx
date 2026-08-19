export default function NewsletterSignup() {
  return (
    <section className="py-12 md:py-16">
      <div className="container-page flex flex-col items-center gap-4 text-center">
        <h2 className="font-heading text-2xl font-bold text-gold md:text-3xl">
          Get $10 Off Your First Order
        </h2>
        <p className="max-w-md text-sm text-white/85">
          Join our email &amp; text list for seasonal planting tips, restock
          alerts, and subscriber-only discounts.
        </p>
        <form
          action="/api/newsletter"
          method="POST"
          className="mt-2 flex w-full max-w-md flex-col gap-3 sm:flex-row"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            required
            placeholder="you@email.com"
            className="tap-target w-full rounded-xl border-0 px-4 py-3 text-sm text-neutral-dark focus:outline-none focus-visible:outline-3 focus-visible:outline-gold"
          />
          <button
            type="submit"
            className="tap-target shrink-0 rounded-xl bg-gold px-6 py-3 text-sm font-bold text-primary-dark hover:bg-white"
          >
            Sign Up
          </button>
        </form>
      </div>
    </section>
  );
}
