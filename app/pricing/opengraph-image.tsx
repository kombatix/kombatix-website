import { ogImage } from "@/lib/og-shared";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function PricingOg() {
  return ogImage({
    headline: "Transparent pricing for both products.",
    subtext: "No long-term contract. Start running in 4 business hours.",
    accentElement: "pricing",
  });
}
