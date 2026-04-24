import { ogImage } from "@/lib/og-shared";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function HowItWorksOg() {
  return ogImage({
    headline: "Identity scoring at every stage of the fraud lifecycle.",
    subtext: "Two products, three engines, one composite score.",
    accentElement: "score-dial",
  });
}
