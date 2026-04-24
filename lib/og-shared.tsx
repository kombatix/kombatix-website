import { ImageResponse } from "next/og";

// Shared OG image template used by each page's opengraph-image.tsx.
// This file starts with underscore so Next.js does not route it.
//
// Per-page files: app/<route>/opengraph-image.tsx
//   → export default async function Og() { return ogImage({...}); }
//
// Design: DESIGN.md §12 — navy bg, Kombatix wordmark top-left (teal),
// large white headline centered-vertically, accent element on the right.

interface OgArgs {
  headline: string;
  subtext?: string;
  accentElement?: "score-dial" | "network" | "engines" | "pricing" | "api" | "partners";
}

export function ogImage({ headline, subtext, accentElement = "score-dial" }: OgArgs) {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#071325",
          color: "white",
          padding: 80,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ fontSize: 40, fontWeight: 700, color: "#0EADA5", letterSpacing: 2 }}>
            KOMBATIX
          </div>
          <div
            style={{
              marginTop: "auto",
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: -1,
            }}
          >
            {headline}
          </div>
          {subtext && (
            <div
              style={{
                marginTop: 24,
                fontSize: 26,
                color: "rgba(255,255,255,0.72)",
                maxWidth: 700,
                lineHeight: 1.4,
              }}
            >
              {subtext}
            </div>
          )}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 320,
            height: "100%",
          }}
        >
          <AccentMark kind={accentElement} />
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}

function AccentMark({ kind }: { kind: NonNullable<OgArgs["accentElement"]> }) {
  switch (kind) {
    case "score-dial":
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 280,
            height: 280,
            borderRadius: "50%",
            border: "14px solid #10B981",
            color: "#10B981",
            fontSize: 96,
            fontWeight: 700,
          }}
        >
          94
        </div>
      );
    case "network":
      return (
        <div
          style={{
            display: "flex",
            width: 280,
            height: 280,
            borderRadius: "50%",
            border: "3px dashed rgba(14,173,165,0.4)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "#0EADA5",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 36,
              fontWeight: 700,
            }}
          >
            K
          </div>
        </div>
      );
    case "engines":
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {["Match", "Risk", "Behavior"].map((eng) => (
            <div
              key={eng}
              style={{
                display: "flex",
                background: "#005B9D",
                color: "white",
                padding: "20px 36px",
                borderRadius: 12,
                fontSize: 28,
                fontWeight: 600,
              }}
            >
              {eng}
            </div>
          ))}
        </div>
      );
    case "pricing":
      return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              background: "#0F1E3A",
              border: "2px solid #005B9D",
              padding: "20px 32px",
              borderRadius: 12,
              color: "white",
              fontSize: 28,
            }}
          >
            <span style={{ opacity: 0.6, fontSize: 18 }}>PreAuth from</span>
            <span style={{ fontSize: 44, fontWeight: 700 }}>$49/mo</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              background: "#0F1E3A",
              border: "2px solid #005B9D",
              padding: "20px 32px",
              borderRadius: 12,
              color: "white",
              fontSize: 28,
            }}
          >
            <span style={{ opacity: 0.6, fontSize: 18 }}>Defense from</span>
            <span style={{ fontSize: 44, fontWeight: 700 }}>$75/mo</span>
          </div>
        </div>
      );
    case "api":
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            background: "#0F1E3A",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 12,
            padding: 28,
            color: "rgba(255,255,255,0.85)",
            fontSize: 18,
            fontFamily: "ui-monospace, monospace",
            width: 280,
          }}
        >
          <span style={{ color: "#0EADA5" }}>POST /v1/defense</span>
          <span>{"{"}</span>
          <span>&nbsp;&nbsp;&quot;score&quot;: 94.3,</span>
          <span>&nbsp;&nbsp;&quot;verdict&quot;:</span>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&quot;friendly fraud&quot;</span>
          <span>{"}"}</span>
        </div>
      );
    case "partners":
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 280,
            height: 280,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(0,91,157,0.5) 0%, transparent 70%)",
              alignItems: "center",
              justifyContent: "center",
              color: "#0EADA5",
              fontSize: 96,
              fontWeight: 700,
            }}
          >
            →
          </div>
        </div>
      );
  }
}
