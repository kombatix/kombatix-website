import { cn } from "@/lib/cn";

// CMP-03 — Cost Decision Tree
// Adapts the existing one-sheet decision tree (Kombatix.pdf page 2) into a
// responsive React/SVG component.
//
// Shows the full outcome space for a single $25 friendly fraud claim:
//   - Direct refund at first contact              — $25 loss
//   - Ethoca / Verifi alert resolution            — $10 + $25 refund = $35 loss
//   - Full chargeback → successful representment  — approx -$5 net (chargeback fee)
//   - Full chargeback → failed representment      — approx -$45 loss
//
// Kombatix intervention shown as a GREEN branch:
//   - Defense deflects at first contact → transaction retained, -$0 net
//
// The diagram is horizontal on desktop and collapses to a stacked vertical
// layout on mobile. Pure SVG for graphic elements, HTML for labels and
// responsive text (so screen readers can still navigate it).

interface CostDecisionTreeProps {
  className?: string;
}

type Path = {
  headline: string;
  outcome: string;
  net: string;      // e.g. "-$25", "−$45", "$0"
  tone: "loss" | "win" | "kombatix";
  detail: string;
};

const PATHS: Path[] = [
  {
    headline: "Direct refund at first contact",
    outcome: "Customer called, claimed fraud, got refund",
    net: "−$25",
    tone: "loss",
    detail: "Full transaction lost. No chargeback, no evidence, no deterrent.",
  },
  {
    headline: "Alert-based resolution",
    outcome: "Ethoca / Verifi alert fires post-dispute, pre-chargeback",
    net: "−$35",
    tone: "loss",
    detail: "$25 refund + $10 alert fee. Chargeback avoided but money gone.",
  },
  {
    headline: "Chargeback filed — representment wins",
    outcome: "You contest the chargeback successfully",
    net: "−$5",
    tone: "win",
    detail:
      "Transaction retained but $5 chargeback fee assessed. Best case without Kombatix.",
  },
  {
    headline: "Chargeback filed — representment fails",
    outcome: "Contest rejected, money returned to cardholder",
    net: "−$45",
    tone: "loss",
    detail:
      "$25 refund + $20 chargeback penalty. Worst case. Merchant monitoring program exposure.",
  },
  {
    headline: "Kombatix Defense deflection",
    outcome: "Defense confirms friendly fraud at first contact; agent deflects",
    net: "$0",
    tone: "kombatix",
    detail:
      "Transaction retained. Customer declines to escalate after identity-match evidence is presented. No chargeback filed.",
  },
];

const toneClasses: Record<Path["tone"], { card: string; net: string; pill: string }> = {
  loss: {
    card: "border-gray-200 bg-white",
    net: "text-score-low",
    pill: "bg-score-low/10 text-score-low",
  },
  win: {
    card: "border-gray-200 bg-white",
    net: "text-score-mid",
    pill: "bg-score-mid/10 text-score-mid",
  },
  kombatix: {
    card: "border-2 border-accent bg-white",
    net: "text-accent",
    pill: "bg-accent/10 text-accent",
  },
};

export function CostDecisionTree({ className }: CostDecisionTreeProps) {
  return (
    <figure
      className={cn(
        "rounded-xl bg-off-white border border-gray-200 p-6 md:p-10",
        className,
      )}
      aria-describedby="cmp03-description"
    >
      <figcaption id="cmp03-description" className="sr-only">
        Cost decision tree showing four outcome paths for a single $25 friendly
        fraud claim without Kombatix, plus the Kombatix Defense intervention
        that preserves the transaction entirely.
      </figcaption>

      {/* Starting node */}
      <div className="flex flex-col items-center text-center">
        <div className="rounded-full bg-navy text-white px-6 py-3 font-semibold">
          Customer makes $25 purchase
        </div>
        <svg
          className="mt-4 w-1 h-6 text-gray-300"
          viewBox="0 0 2 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <rect x="0" y="0" width="2" height="20" />
        </svg>
        <div className="rounded-xl bg-white border border-gray-200 px-6 py-3">
          <p className="text-body-sm text-gray-500">Customer later disputes the charge</p>
        </div>
      </div>

      {/* Outcome paths — 5 cards in a responsive grid, Kombatix card visually distinct */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {PATHS.map((path) => {
          const tone = toneClasses[path.tone];
          return (
            <div
              key={path.headline}
              className={cn(
                "rounded-xl p-5 flex flex-col relative",
                tone.card,
              )}
            >
              {path.tone === "kombatix" && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-body-sm font-semibold px-3 py-0.5 rounded-full bg-accent text-white">
                  With Kombatix
                </span>
              )}
              <span
                className={cn(
                  "inline-block self-start text-body-sm font-semibold px-2 py-0.5 rounded",
                  tone.pill,
                )}
              >
                Net: {path.net}
              </span>
              <h3 className="mt-3 text-h4 text-navy font-semibold">
                {path.headline}
              </h3>
              <p className="mt-2 text-body-sm text-gray-500">{path.outcome}</p>
              <p className="mt-3 text-body-sm text-gray-600 flex-1">
                {path.detail}
              </p>
              <p
                className={cn(
                  "mt-4 text-2xl font-bold tabular-nums",
                  tone.net,
                )}
              >
                {path.net}
              </p>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-body-sm text-gray-500">
        <span className="inline-flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded-full bg-score-low" />
          Loss paths
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded-full bg-score-mid" />
          Best case without Kombatix
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded-full bg-accent" />
          Kombatix intervention
        </span>
      </div>
    </figure>
  );
}
