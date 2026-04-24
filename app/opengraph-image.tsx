import { ogImage } from "@/lib/og-shared";

// Static export: render at build time.
export const dynamic = "force-static";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function HomeOg() {
  return ogImage({
    headline: "Know who you're fighting.",
    subtext:
      "Real-time identity scoring for friendly fraud defense and pre-authorization screening.",
    accentElement: "score-dial",
  });
}
