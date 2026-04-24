"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

// CMP-01 — Animated Kombatix Defense Score Dial.
// DESIGN.md §8 + PROJECT.md Phase 3.
//
// Built as pure React + SVG. No Framer Motion dependency.
// Animates on mount: the needle sweeps from 0 to the target score over 1200ms,
// the numeric score counts up in step, and reason badges fade in.
//
// Props:
//   score          — 0..100
//   label          — always "Defense Score" variant (never "Risk Score")
//   reasonBadges   — optional array of short strings shown on the right
//   subLabel       — optional text under the score (e.g. "Likely Friendly Fraud")
//   animate        — default true; false for static rendering
//   size           — "md" | "lg", default "lg"
//
// Accessibility: aria-valuenow on the dial arc, reduced-motion renders static.

interface ScoreDialProps {
  score: number;
  subLabel?: string;
  reasonBadges?: string[];
  animate?: boolean;
  size?: "md" | "lg";
  className?: string;
  // Override the canonical label only for unusual contexts; NEVER pass "Risk Score".
  label?: "Defense Score" | "Kombatix Defense Score";
  // Force a particular zone color regardless of score (used for "live demo" states)
  // Leave undefined to derive from score.
  zoneOverride?: "low" | "mid" | "high";
}

const ZONE_COLORS = {
  low:  "#EF4444", // score-low   — 0–49
  mid:  "#F59E0B", // score-mid   — 50–79
  high: "#10B981", // score-high  — 80–100
} as const;

function zoneFromScore(score: number): "low" | "mid" | "high" {
  if (score >= 80) return "high";
  if (score >= 50) return "mid";
  return "low";
}

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

// Animate a number from 0 → target over duration (ms), easing with ease-out.
function useAnimatedScore(target: number, duration: number, enabled: boolean): number {
  const [value, setValue] = useState(enabled ? 0 : target);

  useEffect(() => {
    if (!enabled) {
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const from = 0;

    function tick(now: number) {
      const t = Math.min(1, (now - start) / duration);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(from + (target - from) * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, enabled]);

  return value;
}

export function ScoreDial({
  score,
  subLabel,
  reasonBadges = [],
  animate = true,
  size = "lg",
  className,
  label = "Defense Score",
  zoneOverride,
}: ScoreDialProps) {
  const reduced = useReducedMotion();
  const shouldAnimate = animate && !reduced;

  const zone = zoneOverride ?? zoneFromScore(score);
  const color = ZONE_COLORS[zone];

  const displayScore = useAnimatedScore(score, 1200, shouldAnimate);

  // SVG geometry
  // 270° sweep (from -135° to +135°), 90° bottom gap
  const viewBox = 200;
  const center = viewBox / 2;
  const radius = 80;
  const strokeWidth = 14;

  // Arc circumference portion for 270° sweep
  const TOTAL_ARC_DEG = 270;
  const circumference = 2 * Math.PI * radius;
  const arcLen = (TOTAL_ARC_DEG / 360) * circumference;
  // Progress from 0..100 score
  const progress = Math.max(0, Math.min(100, displayScore)) / 100;
  const visibleLen = arcLen * progress;

  // We start the stroke at -135° (bottom-left) and draw clockwise.
  // Using a rotation + stroke-dasharray trick:
  //  - track:  full 270° arc, muted
  //  - value:  animated 0..visibleLen, zone-colored
  //
  // Path: an arc from -135° to +135° on a circle centered at (center, center).
  // We'll describe it as a <circle> with stroke-dasharray tricks — but because
  // the dasharray maps to the full circumference (360°), we adjust:
  //   dasharray = visibleLen + " " + (circumference - visibleLen)
  //   dashoffset = computed so the arc begins at the bottom-left

  // Dimensions scale based on size
  const containerSize = size === "lg" ? 280 : 200;

  // ─────────────────────────────────────────────────────────────
  // Build the track path explicitly (an SVG arc) for the 270° sweep
  // instead of using a circle + dasharray. This gives a clean start/end
  // at the bottom gap and avoids the rotation-hack weirdness.
  // ─────────────────────────────────────────────────────────────
  const startAngle = -135; // degrees, 12 o'clock = -90
  const endAngle = 135;

  function polar(angleDeg: number, r = radius) {
    const a = ((angleDeg - 90) * Math.PI) / 180;
    return { x: center + r * Math.cos(a), y: center + r * Math.sin(a) };
  }

  const trackStart = polar(startAngle);
  const trackEnd = polar(endAngle);
  // Track arc path
  const trackPath = `M ${trackStart.x} ${trackStart.y} A ${radius} ${radius} 0 1 1 ${trackEnd.x} ${trackEnd.y}`;

  // For the value arc, we'll use the same path + dasharray magic on the arc length.
  const valueDashArray = `${visibleLen} ${arcLen}`;

  return (
    <div
      className={cn("flex flex-col md:flex-row items-center md:items-start gap-6", className)}
      role="img"
      aria-label={`${label} ${score} out of 100${subLabel ? ` — ${subLabel}` : ""}`}
    >
      {/* SVG Dial */}
      <div
        className="relative"
        style={{ width: containerSize, height: containerSize }}
      >
        <svg
          viewBox={`0 0 ${viewBox} ${viewBox}`}
          width={containerSize}
          height={containerSize}
          role="presentation"
        >
          {/* Track (muted) */}
          <path
            d={trackPath}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Zone dividers — subtle tick marks at 50 and 80 */}
          {(() => {
            // 50/100 of 270° = 135° from startAngle = angle -135+135 = 0
            // 80/100 of 270° = 216° from startAngle = angle -135+216 = 81
            const tick50Angle = startAngle + (50 / 100) * TOTAL_ARC_DEG;
            const tick80Angle = startAngle + (80 / 100) * TOTAL_ARC_DEG;
            const innerR = radius - strokeWidth / 2 - 2;
            const outerR = radius + strokeWidth / 2 + 2;
            const t50a = polar(tick50Angle, innerR);
            const t50b = polar(tick50Angle, outerR);
            const t80a = polar(tick80Angle, innerR);
            const t80b = polar(tick80Angle, outerR);
            return (
              <g stroke="rgba(255,255,255,0.15)" strokeWidth={1}>
                <line x1={t50a.x} y1={t50a.y} x2={t50b.x} y2={t50b.y} />
                <line x1={t80a.x} y1={t80a.y} x2={t80b.x} y2={t80b.y} />
              </g>
            );
          })()}
          {/* Value arc */}
          <path
            d={trackPath}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={valueDashArray}
            style={{ transition: shouldAnimate ? "stroke 200ms ease" : "none" }}
          />
        </svg>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span
            className="text-5xl md:text-6xl font-bold tabular-nums"
            style={{ color, lineHeight: 1 }}
            aria-hidden="true"
          >
            {displayScore}
          </span>
          <span className="text-body-sm text-white/70 mt-1 uppercase tracking-wide">
            {label}
          </span>
          {subLabel && (
            <span className="text-body-sm text-white/60 mt-1 text-center max-w-[10rem]">
              {subLabel}
            </span>
          )}
        </div>
      </div>

      {/* Reason badges */}
      {reasonBadges.length > 0 && (
        <ul className="flex flex-col gap-2 max-w-xs" aria-label="Reason codes">
          {reasonBadges.map((b, i) => (
            <li
              key={i}
              className={cn(
                "rounded-lg border border-white/10 bg-white/5 px-4 py-2",
                "text-body-sm text-white/80",
                shouldAnimate && "animate-fade-in-up",
              )}
              style={
                shouldAnimate
                  ? {
                      animationDelay: `${i * 120 + 400}ms`,
                      opacity: 0,
                      animationFillMode: "forwards",
                    }
                  : undefined
              }
            >
              {b}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
