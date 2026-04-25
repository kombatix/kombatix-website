"use client";

import { useEffect } from "react";
import { trackEvent, type GA4Event } from "@/lib/analytics";

interface TrackPageViewProps {
  event: GA4Event;
}

// Fires a single GA4 event on mount. Used for page-view conversion events
// like `pricing_view` and `api_page_view`.
//
// Intentionally does NOT re-fire on navigation — Next App Router mount
// handles that because route changes mount a new page component.
export function TrackPageView({ event }: TrackPageViewProps) {
  useEffect(() => {
    trackEvent(event);
  }, [event]);
  return null;
}
