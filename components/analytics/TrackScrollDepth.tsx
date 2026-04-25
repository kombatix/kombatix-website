"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

// Fires `how_it_works_scroll_50` when the user passes the 50% scroll mark,
// and `how_it_works_scroll_100` when they reach the bottom.
// Each event fires at most once per page view.
//
// Uses scroll position rather than IntersectionObserver on a sentinel
// element so it handles pages of any length without special markup.
export function TrackScrollDepth() {
  const fired50 = useRef(false);
  const fired100 = useRef(false);

  useEffect(() => {
    function onScroll() {
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      if (total <= 0) return;
      const pct = scrolled / total;

      if (!fired50.current && pct >= 0.5) {
        fired50.current = true;
        trackEvent("how_it_works_scroll_50");
      }
      if (!fired100.current && pct >= 0.98) {
        fired100.current = true;
        trackEvent("how_it_works_scroll_100");
      }
    }

    // Passive listener — no scroll handler perf impact
    window.addEventListener("scroll", onScroll, { passive: true });
    // Fire once to handle short pages
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
