import { ogImage } from "@/lib/og-shared";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function DefenseOg() {
  return ogImage({
    headline: "Stop refunding money you don't owe.",
    subtext:
      "Three scoring engines, one composite Defense Score, one clear answer.",
    accentElement: "engines",
  });
}
