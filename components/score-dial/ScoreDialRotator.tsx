"use client";

import { useEffect, useState } from "react";
import { ScoreDial } from "@/components/score-dial/ScoreDial";

// CMP-01 — Rotator wrapper.
// Cycles through three canonical scenarios every 4 seconds with a gentle
// cross-fade. When prefers-reduced-motion is set, the first scenario is
// shown statically and never rotates.
//
// Scenarios are from PROJECT.md Phase 3 spec — do not drift.
//
// Rotation timing:
//   Each scenario is shown for 4000ms total, with a 300ms cross-fade.

const SCENARIOS: Array<{
  score: number;
  subLabel: string;
  reasonBadges: string[];
}> = [
  {
    score: 95,
    subLabel: "Likely Friendly Fraud",
    reasonBadges: [
      "All identity fields match",
      "8+ payment methods used",
      "Transactions from 5+ locations",
    ],
  },
  {
    score: 62,
    subLabel: "Review Warranted",
    reasonBadges: [
      "Mixed identity signals",
      "Partial transaction match",
      "Velocity anomaly flagged",
    ],
  },
  {
    score: 18,
    subLabel: "Possible True Fraud",
    reasonBadges: [
      "No identity match",
      "New account (< 30 days)",
      "Stolen-card behavioral pattern",
    ],
  },
];

const SCENARIO_DURATION_MS = 4000;

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

export function ScoreDialRotator() {
  const reduced = useReducedMotion();
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState(false); // true = fading out

  useEffect(() => {
    if (reduced) return; // never rotate under reduced motion
    const id = setInterval(() => {
      // Start fade-out
      setFade(true);
      setTimeout(() => {
        setIdx((i) => (i + 1) % SCENARIOS.length);
        setFade(false);
      }, 300);
    }, SCENARIO_DURATION_MS);
    return () => clearInterval(id);
  }, [reduced]);

  const scenario = SCENARIOS[idx];

  return (
    <div
      className="transition-opacity duration-300"
      style={{ opacity: fade ? 0 : 1 }}
      aria-live="polite"
      aria-atomic="true"
    >
      <ScoreDial
        key={idx}
        score={scenario.score}
        subLabel={scenario.subLabel}
        reasonBadges={scenario.reasonBadges}
        label="Defense Score"
        animate={true}
      />
    </div>
  );
}
