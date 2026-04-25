import { Check } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";

interface PricingCardProps {
  planName: string;
  price: string;         // "75", "500", "Custom"
  priceSuffix?: string;  // "/month", "" (default "/month")
  intro?: string;        // short prelude line (optional, e.g. "Up to 75 Defense hits/month")
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  recommended?: boolean;
  ribbonLabel?: string;  // defaults to "Recommended" when recommended is true
  className?: string;
}

// DESIGN.md §7.7 — Pricing cards. Middle card in a triple gets the
// `recommended` treatment: thicker accent-color border + ribbon.
//
// Price treatment: numeric tiers render with a small "starts at" label
// stacked above the dollar amount, with the period suffix (/month) sitting
// inline next to the number. "Custom" and "Contact Us" prices skip the
// "starts at" label since they are not starting prices.
export function PricingCard({
  planName,
  price,
  priceSuffix = "/month",
  intro,
  features,
  ctaLabel,
  ctaHref,
  recommended = false,
  ribbonLabel = "Recommended",
  className,
}: PricingCardProps) {
  const isNonNumeric = price === "Custom" || price === "Contact Us";
  const isPrefixed = price.startsWith("$");

  return (
    <div
      className={cn(
        "relative rounded-xl bg-white p-8 flex flex-col",
        recommended ? "border-2 border-accent" : "border border-gray-200",
        className,
      )}
    >
      {recommended && (
        <span
          className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white text-body-sm font-semibold px-4 py-1 rounded-full whitespace-nowrap"
          aria-label={`${ribbonLabel} plan`}
        >
          {ribbonLabel}
        </span>
      )}

      <h3 className="text-h3 text-navy font-semibold">{planName}</h3>

      {/* Price block — stacked "starts at" + amount + inline suffix */}
      <div className="mt-4">
        {!isNonNumeric && (
          <p className="text-body-sm text-gray-500 font-medium uppercase tracking-wide leading-none">
            Starts at
          </p>
        )}
        <p
          className={cn(
            "flex items-baseline gap-1",
            !isNonNumeric && "mt-1",
          )}
        >
          <span className="text-display text-navy font-bold">
            {isNonNumeric || isPrefixed ? price : `$${price}`}
          </span>
          {!isNonNumeric && (
            <span className="text-body text-gray-500">{priceSuffix}</span>
          )}
        </p>
      </div>

      {intro && <p className="mt-4 text-body text-gray-600">{intro}</p>}

      <ul className="mt-6 space-y-3 flex-1">
        {features.map((feat, i) => (
          <li key={i} className="flex items-start gap-3 text-body text-gray-600">
            <Check className="w-5 h-5 shrink-0 text-accent mt-0.5" aria-hidden="true" />
            <span>{feat}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <Button href={ctaHref} variant="primary" className="w-full text-center">
          {ctaLabel}
        </Button>
      </div>
    </div>
  );
}
