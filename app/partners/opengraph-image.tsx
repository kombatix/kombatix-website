import { ogImage } from "@/lib/og-shared";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function PartnersOg() {
  return ogImage({
    headline: "Embed identity scoring across your platform.",
    subtext: "For payment processors, fraud platforms, and acquirers.",
    accentElement: "partners",
  });
}
