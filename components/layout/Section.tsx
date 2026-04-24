import { type ReactNode, type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Tone = "dark" | "light" | "off-white" | "navy-light";
type Spacing = "default" | "tight" | "loose";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  tone?: Tone;
  spacing?: Spacing;
  // When true, renders as a full-bleed <section> with a constrained inner container
  fullBleed?: boolean;
  children: ReactNode;
}

// DESIGN.md §4 & §5 — Section rhythm.
// Standard vertical padding: py-16 mobile, py-24 desktop.
// Tight: py-8 / py-12 (trust bar, footer CTA band).
// Transitions between light/dark are hard edges — never gradient.

const toneClasses: Record<Tone, string> = {
  dark: "bg-navy text-white",
  light: "bg-white text-navy",
  "off-white": "bg-off-white text-navy",
  "navy-light": "bg-navy-light text-white",
};

const spacingClasses: Record<Spacing, string> = {
  default: "py-16 md:py-24",
  tight: "py-8 md:py-12",
  loose: "py-20 md:py-32",
};

export function Section({
  tone = "light",
  spacing = "default",
  fullBleed = true,
  className,
  children,
  ...rest
}: SectionProps) {
  const toneClass = toneClasses[tone];
  const spacingClass = spacingClasses[spacing];

  if (!fullBleed) {
    return (
      <section className={cn(toneClass, spacingClass, className)} {...rest}>
        <div className="mx-auto max-w-container px-6 md:px-8 lg:px-12">{children}</div>
      </section>
    );
  }

  return (
    <section className={cn(toneClass, spacingClass, className)} {...rest}>
      <div className="mx-auto max-w-container px-6 md:px-8 lg:px-12">{children}</div>
    </section>
  );
}

// Convenience: a container-only wrapper (no vertical padding, no tone),
// for when you need the max-w-container + page padding inside a custom section.
export function Container({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mx-auto max-w-container px-6 md:px-8 lg:px-12", className)} {...rest}>
      {children}
    </div>
  );
}
