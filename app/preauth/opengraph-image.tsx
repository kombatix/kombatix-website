import { ogImage } from "@/lib/og-shared";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function PreAuthOg() {
  return ogImage({
    headline: "Catch friendly fraudsters before you authorize.",
    subtext: "Screen every transaction against the Kombatix Network.",
    accentElement: "network",
  });
}
