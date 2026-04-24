// JSON-LD structured data generators.
// Each function returns a plain object suitable for JSON.stringify
// and injection via a <script type="application/ld+json"> tag.
//
// See KOMBATIX_SITE_V2.docx Section 4 for per-page schema requirements.

const SITE_URL = "https://kombatix.io";

// ── WebSite (home) ─────────────────────────────────────────────────
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Kombatix",
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// ── BreadcrumbList ─────────────────────────────────────────────────
interface Crumb {
  name: string;
  url: string; // absolute or path — we resolve to absolute
}
export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.url.startsWith("http") ? c.url : `${SITE_URL}${c.url}`,
    })),
  };
}

// ── SoftwareApplication (product pages) ────────────────────────────
interface SoftwareAppArgs {
  name: string;              // "Kombatix Defense" or "Kombatix PreAuth"
  description: string;
  url: string;               // absolute product page URL
  priceMin: number;          // lowest tier price
  priceMax?: number;         // highest non-custom tier price (optional for Custom tiers)
  category?: string;         // e.g. "BusinessApplication"
}
export function softwareApplicationSchema({
  name,
  description,
  url,
  priceMin,
  priceMax,
  category = "BusinessApplication",
}: SoftwareAppArgs) {
  const offers: Record<string, unknown> =
    priceMax !== undefined
      ? {
          "@type": "AggregateOffer",
          priceCurrency: "USD",
          lowPrice: priceMin,
          highPrice: priceMax,
        }
      : {
          "@type": "Offer",
          priceCurrency: "USD",
          price: priceMin,
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: priceMin,
            priceCurrency: "USD",
            unitText: "MONTH",
          },
        };
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url,
    applicationCategory: category,
    operatingSystem: "Web",
    offers,
  };
}

// ── FAQPage ────────────────────────────────────────────────────────
interface FaqEntry {
  question: string;
  answer: string; // plain text; no HTML
}
export function faqSchema(entries: FaqEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
      // AEO-optimized "speakable" directive — tells voice assistants
      // the answer text is suitable to read aloud.
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["[data-speakable]"],
      },
    })),
  };
}

// ── Utility: inject JSON-LD as a <script> tag via dangerouslySetInnerHTML
export function jsonLd(obj: object) {
  return {
    __html: JSON.stringify(obj).replace(/</g, "\\u003c"),
  };
}
