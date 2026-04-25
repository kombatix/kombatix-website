// GA4 analytics helper — direct gtag calls, no GTM (per CLAUDE.md hard rules).
//
// gtag is loaded in app/layout.tsx via next/script when
// NEXT_PUBLIC_GA4_MEASUREMENT_ID is set. When unset (preview builds, local
// dev), all event calls become no-ops — no console errors, no network
// requests.

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "js" | "set",
      ...args: unknown[]
    ) => void;
    dataLayer?: unknown[];
  }
}

// Approved conversion events — keep this union in sync with GA4 conversion
// configuration and the architecture doc §8 GA4 setup list.
export type GA4Event =
  | "signup_click_defense"
  | "signup_click_preauth"
  | "signup_click_web_portal"
  | "partner_form_submit"
  | "pricing_view"
  | "api_page_view"
  | "web_portal_page_view"
  | "how_it_works_scroll_50"
  | "how_it_works_scroll_100";

export function trackEvent(
  name: GA4Event,
  params?: Record<string, string | number | boolean>,
): void {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", name, params || {});
}

// Optional: clean export to satisfy `import type`-only modules
export {};
