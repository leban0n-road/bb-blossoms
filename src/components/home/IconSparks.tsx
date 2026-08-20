import type { CSSProperties } from "react";

const SPARKS: { x: string; y: string; delay: string }[] = [
  { x: "-11px", y: "-9px", delay: "0s" },
  { x: "11px", y: "-8px", delay: "0.05s" },
  { x: "-9px", y: "10px", delay: "0.1s" },
  { x: "10px", y: "9px", delay: "0.15s" },
];

/** One-shot gold particle burst on hover — flagship buttons only (Fast-
 * Growing Privacy Plants, Pollinator Plants, Full Sun Plants, Shop
 * Plants). Delay/direction are set inline per spark since inline styles
 * win over the external :hover trigger rule's animation-* longhands
 * without any specificity fights. */
export default function IconSparks() {
  return (
    <>
      {SPARKS.map((spark, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="icon-spark"
          style={
            {
              "--spark-x": spark.x,
              "--spark-y": spark.y,
              animationDelay: spark.delay,
            } as CSSProperties
          }
        />
      ))}
    </>
  );
}
