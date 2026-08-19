export default function FastFactsBox({
  facts,
  title = "Fast Facts",
}: {
  facts: string[];
  title?: string;
}) {
  if (!facts.length) return null;
  return (
    <div className="rounded-2xl border-2 border-accent-light/60 bg-accent-light/10 p-5">
      <h2 className="font-heading text-sm font-bold uppercase tracking-wide text-accent-dark">
        {title}
      </h2>
      <ul className="mt-3 space-y-1.5 text-sm text-neutral-dark">
        {facts.map((fact) => (
          <li key={fact} className="flex gap-2">
            <span aria-hidden="true" className="text-accent">
              •
            </span>
            <span>{fact}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
