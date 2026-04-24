import { type ReactNode } from "react";
import { Button } from "@/components/ui/Button";

interface CtaBandProps {
  headline: string;
  ctaLabel: string;
  ctaHref: string;
  subtext?: ReactNode;
}

// DESIGN.md §7.8 — CTA band.
// Full-bleed bg-navy, py-16/24.
// Two-column desktop (headline left, button right); stacked on mobile.
// Button uses the "punch" variant — accent glow shadow.
export function CtaBand({ headline, ctaLabel, ctaHref, subtext }: CtaBandProps) {
  return (
    <section className="bg-navy py-16 md:py-24 text-white">
      <div className="mx-auto max-w-container px-6 md:px-8 lg:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="flex-1">
          <h2 className="text-display font-bold">{headline}</h2>
          {subtext && <p className="mt-4 text-body-lg text-white/70 max-w-xl">{subtext}</p>}
        </div>
        <Button href={ctaHref} variant="punch" size="lg">
          {ctaLabel}
        </Button>
      </div>
    </section>
  );
}
