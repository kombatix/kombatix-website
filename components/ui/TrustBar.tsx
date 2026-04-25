import { type ReactNode, Fragment } from "react";
import { cn } from "@/lib/cn";

interface TrustBarProps {
  items: ReactNode[];
  className?: string;
}

// DESIGN.md §7.14 — Trust bar.
// Thin band, typically directly under the hero (same dark background).
// Horizontal list of text badges separated by middle dots.
//
// Current approved content (homepage):
//   "Self Signup · Instant Web Access · REST API ·
//    Developer Portal · No Long-Term Contract"
//
// SOC 2 status is intentionally NOT included anywhere on the site —
// we do not currently make a SOC 2 claim of any kind. NEVER add
// "SOC 2 Type II" or "SOC 2 In Progress" without explicit Darrel
// approval; both are competitor-positioning or compliance claims
// we cannot back today.
export function TrustBar({ items, className }: TrustBarProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-4 md:gap-8 py-6 flex-wrap",
        "text-body-sm text-white/70 font-medium",
        className,
      )}
      role="list"
      aria-label="Trust indicators"
    >
      {items.map((item, i) => (
        <Fragment key={i}>
          <span role="listitem">{item}</span>
          {i < items.length - 1 && (
            <span className="text-white/40" aria-hidden="true">
              •
            </span>
          )}
        </Fragment>
      ))}
    </div>
  );
}
