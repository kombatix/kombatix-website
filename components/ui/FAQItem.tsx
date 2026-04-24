"use client";

import { type ReactNode, useState, useId } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

interface FAQItemProps {
  question: string;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

// DESIGN.md §7.13 — FAQ accordion item.
// - Full-width <button> as the question trigger (keyboard accessible)
// - aria-expanded reflects open/closed
// - Chevron rotates 180° when expanded
// - Revealed answer gets padding-top for breathing room
// - Focus-visible ring on the button per DESIGN.md §11
//
// AEO note: The first sentence of each answer must be a quotable,
// standalone answer under 25 words. That's content-authoring discipline,
// enforced via this component's usage, not the component itself.
export function FAQItem({ question, children, defaultOpen = false, className }: FAQItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  const buttonId = `faq-q-${id}`;
  const panelId = `faq-a-${id}`;

  return (
    <div className={cn("border-b border-gray-200 py-6", className)}>
      <h3 className="text-h4">
        <button
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((o) => !o)}
          className={cn(
            "w-full text-left text-navy font-semibold flex items-center justify-between gap-6",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded",
          )}
        >
          <span>{question}</span>
          <ChevronDown
            className={cn(
              "w-5 h-5 shrink-0 text-gray-500 transition-transform duration-200",
              open && "rotate-180",
            )}
            aria-hidden="true"
          />
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!open}
        className="text-body text-gray-600 pt-4 leading-relaxed"
      >
        {children}
      </div>
    </div>
  );
}
