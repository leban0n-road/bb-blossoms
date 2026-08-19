import { toJsonLd } from "@/lib/schema";

export default function JsonLd({ data }: { data: unknown }) {
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={toJsonLd(data)}
    />
  );
}
