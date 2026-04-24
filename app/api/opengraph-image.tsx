import { ogImage } from "@/lib/og-shared";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function ApiOg() {
  return ogImage({
    headline: "Score identity in a single POST.",
    subtext: "REST-first. JSON in, JSON out. Sub-second response.",
    accentElement: "api",
  });
}
