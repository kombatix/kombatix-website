import { ogImage } from "@/lib/og-shared";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function PricingOg() {
  return ogImage({
    headline: "Transparent pricing across all three products.",
    subtext: "No long-term contract. Instant access on signup.",
    accentElement: "pricing",
  });
}
