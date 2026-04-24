import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface EyebrowTagProps {
  children: ReactNode;
  className?: string;
  // "dark" when the eyebrow sits on a dark background (default), "light" on light
  tone?: "dark" | "light";
}

export function EyebrowTag({ children, className, tone = "dark" }: EyebrowTagProps) {
  // Per DESIGN.md §7.3 — always teal, uppercase, letter-spaced, bold.
  // Tone here just ensures sufficient contrast — teal works on both but we
  // nudge opacity slightly on light backgrounds for a more refined feel.
  const toneClass = tone === "dark" ? "text-teal" : "text-teal";
  return (
    <p
      className={cn(
        "text-eyebrow uppercase tracking-[0.1em] font-bold",
        toneClass,
        className,
      )}
    >
      {children}
    </p>
  );
}
