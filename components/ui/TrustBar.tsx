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
// Current approved content (architecture doc, homepage):
//   "API-First · REST Integration · Self-Service Portal ·
//    SOC 2 In Progress · No Long-Term Contract"
//
// DO NOT change "SOC 2 In Progress" to "SOC 2 Type II" — see CLAUDE.md.
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
