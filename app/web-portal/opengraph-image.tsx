import { ogImage } from "@/lib/og-shared";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function WebPortalOg() {
  return ogImage({
    headline: "Run Defense scoring from your browser.",
    subtext:
      "No-code, full reports with AI insights, PDF export, searchable history.",
    accentElement: "score-dial",
  });
}
