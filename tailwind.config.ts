import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Kombatix brand colors — from brand guide (see DESIGN.md)
        navy: {
          DEFAULT: "#071325", // Primary dark background
          light: "#0F1E3A",   // Dark cards on dark backgrounds
        },
        accent: {
          DEFAULT: "#005B9D", // Primary CTA blue
          hover: "#004A82",
        },
        teal: {
          DEFAULT: "#0EADA5", // Secondary accent, eyebrows
        },
        // Neutral scale (light-section UI)
        "off-white": "#F8FAFC",
        // Score dial zones — Defense Score visualization only
        score: {
          high: "#10B981", // 80-100: confirmed friendly fraud
          mid: "#F59E0B",  // 50-79: review warranted
          low: "#EF4444",  // 0-49: possible true fraud
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        container: "1200px",
        prose: "72ch",
      },
      fontSize: {
        // Full typographic scale — see DESIGN.md Section 3
        "hero": ["clamp(2.5rem, 5vw, 4rem)", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display": ["clamp(2rem, 3.5vw, 2.75rem)", { lineHeight: "1.15", letterSpacing: "-0.01em", fontWeight: "700" }],
        "h2": ["clamp(1.75rem, 2.5vw, 2rem)", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "700" }],
        "h3": ["clamp(1.375rem, 2vw, 1.5rem)", { lineHeight: "1.3", fontWeight: "600" }],
        "h4": ["clamp(1.125rem, 1.5vw, 1.25rem)", { lineHeight: "1.4", fontWeight: "600" }],
        "body-lg": ["clamp(1rem, 1.2vw, 1.125rem)", { lineHeight: "1.6" }],
        "body":    ["clamp(0.9375rem, 1vw, 1rem)", { lineHeight: "1.6" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5" }],
        "eyebrow": ["0.875rem", { lineHeight: "1", letterSpacing: "0.1em", fontWeight: "700" }],
        "mono":    ["0.875rem", { lineHeight: "1.5" }],
      },
      boxShadow: {
        // Accent glow for the footer CTA band punch button
        "accent-glow": "0 0 32px rgba(0, 91, 157, 0.4)",
        "accent-glow-strong": "0 0 48px rgba(0, 91, 157, 0.6)",
      },
      animation: {
        "score-sweep": "scoreSweep 1.2s ease-out forwards",
        "fade-in-up": "fadeInUp 0.5s ease-out forwards",
      },
      keyframes: {
        scoreSweep: {
          "0%": { strokeDashoffset: "100%" },
          "100%": { strokeDashoffset: "var(--score-offset)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
