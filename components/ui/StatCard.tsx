import { type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Card } from "@/components/ui/Card";

interface StatCardProps {
  // Before → after style stats (e.g. "10% → 5%", "40% → 80%").
  // Use `value` alone for non-before-after stats (e.g. "−60%").
  value: string;
  label: string;
  body?: ReactNode;
  className?: string;
}

// DESIGN.md §7.6 — Stat Cards.
// Three across on desktop. Value is display-size, accent blue, bold.
// Label is h4 navy semibold. Body is body gray-600.
export function StatCard({ value, label, body, className }: StatCardProps) {
  return (
    <Card tone="light" padding="md" className={cn("flex flex-col", className)}>
      <p className="text-display text-accent font-bold">{value}</p>
      <p className="text-h4 text-navy font-semibold mt-2">{label}</p>
      {body && <div className="text-body text-gray-600 mt-4 leading-relaxed">{body}</div>}
    </Card>
  );
}
