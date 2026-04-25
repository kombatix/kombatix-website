import type { Metadata } from "next";

import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/layout/CtaBand";

import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { FAQItem } from "@/components/ui/FAQItem";

import { breadcrumbSchema, faqSchema, jsonLd } from "@/lib/schema";
import { PricingToggle } from "./PricingToggle";
import { TrackPageView } from "@/components/analytics/TrackPageView";

const SIGNUP_URL = "https://app.kombatix.ai/signup";

export const metadata: Metadata = {
  title: "Pricing — Defense, PreAuth, and Web Portal Access",
  description:
    "Transparent pricing across three products: PreAuth from $49/mo, Defense from $75/mo, Web Portal from $35/mo. No long-term contract.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Pricing — Defense, PreAuth, and Web Portal Access",
    description:
      "Transparent pricing across three products: PreAuth from $49/mo, Defense from $75/mo, Web Portal from $35/mo. No long-term contract.",
    url: "https://kombatix.io/pricing",
  },
};

// ── Approved FAQ entries (architecture doc §3, Page 5) ────────────
// Each answer must open with a quotable, <25 word sentence for AEO lift.
const FAQS: Array<{ question: string; answer: string; detail?: string }> = [
  {
    question: "Is there a free trial?",
    answer:
      "Not at this time. Subscribe to any Standard or Starter plan and be running API calls within minutes — access is granted as soon as your first month is paid.",
    detail: "Upgrade or cancel anytime — no long-term contract.",
  },
  {
    question: "What counts as a 'hit' for Defense?",
    answer:
      "One API call that returns a scored Defense Report. Sandbox test calls do not count against your monthly allocation.",
  },
  {
    question: "What's the difference between a no-hit and a hit in PreAuth?",
    answer:
      "A no-hit means the identity was not found in the Kombatix Network; a hit means we found a match and returned severity plus match data.",
    detail:
      "You pay a fraction of a cent per check on a no-hit, and your tier's hit rate on hits. Most checks in production are no-hits.",
  },
  {
    question: "Can I use Kombatix with my existing support and fraud tools?",
    answer:
      "Yes. The Defense and PreAuth APIs return structured JSON over REST and integrate with any CRM, helpdesk, or fraud platform.",
    detail:
      "If your team doesn't have engineering capacity, Web Portal Access exposes the same Defense scoring through a browser-based UI — paste dispute details, get a full report, copy or export results into your existing ticketing system. PreAuth sits upstream of your existing fraud stack and complements rather than replaces it.",
  },
  {
    question: "What's the difference between the Defense API and Web Portal Access?",
    answer:
      "The Defense API and Web Portal Access run the same three-engine Defense scoring; the API is for engineering integrations and the Web Portal is no-code for support and CX teams.",
    detail:
      "They are billed as independent subscriptions — pick one, the other, or both. Most teams without developer capacity start with Web Portal Access ($35/month) and add the API later when they're ready to automate.",
  },
  {
    question: "What if I need more than 50,000 Defense calls per month?",
    answer:
      "Contact us for Enterprise pricing. A product specialist will reach out within one business day.",
  },
  {
    question: "Is my customer data stored?",
    answer:
      "Kombatix uses query data to return a scored result and, where applicable, to contribute to the Kombatix Network.",
    detail:
      "See our Privacy Policy for full data handling details, including opt-outs and data retention.",
  },
  {
    question: "Can I subscribe to multiple Kombatix products?",
    answer:
      "Yes. Defense, PreAuth, and Web Portal Access are billed independently — most customers run two or all three side-by-side.",
    detail:
      "Defense scoring (whether via API or Web Portal) feeds the Kombatix Network with every confirmed friendly-fraud identity (60+ score). Every PreAuth customer screens against that network. Running multiple products strengthens the network for everyone.",
  },
  {
    question: "Is there a setup fee?",
    answer:
      "Defense API and Web Portal Access have no setup fee. PreAuth has a one-time $250 implementation fee that covers the pre-authorization workflow integration.",
  },
];

export default function PricingPage() {
  return (
    <PageShell>
      <TrackPageView event="pricing_view" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Pricing", url: "/pricing" },
          ]),
        )}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          faqSchema(
            FAQS.map((f) => ({
              question: f.question,
              answer: f.detail ? `${f.answer} ${f.detail}` : f.answer,
            })),
          ),
        )}
      />

      {/* 1 — Hero */}
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-container px-6 md:px-8 lg:px-12 py-20 md:py-28">
          <div className="max-w-3xl">
            <EyebrowTag>Pricing</EyebrowTag>
            <h1 className="text-hero mt-3">
              Transparent pricing across all three products.
            </h1>
            <p className="mt-6 text-body-lg text-white/72">
              Pay for what moves the needle. PreAuth starts at $49/month,
              Defense at $75/month, and Web Portal Access at $35/month.
              All three are self-service — subscribe and your access is
              live the moment your first month is paid.
            </p>
          </div>
        </div>
      </section>

      {/* 2 — Pricing Toggle + Cards (LIGHT) */}
      <Section tone="light" spacing="default">
        <PricingToggle />
      </Section>

      {/* 3 — FAQ (OFF-WHITE) */}
      <Section tone="off-white" spacing="default">
        <div className="max-w-3xl">
          <EyebrowTag tone="light">Frequently Asked Questions</EyebrowTag>
          <h2 className="text-display text-navy mt-3">
            Everything you&apos;d ask before signing up.
          </h2>
        </div>

        <div className="mt-12 max-w-3xl">
          {FAQS.map((f) => (
            <FAQItem key={f.question} question={f.question}>
              <p data-speakable>{f.answer}</p>
              {f.detail && <p className="mt-3">{f.detail}</p>}
            </FAQItem>
          ))}
        </div>
      </Section>

      <CtaBand
        headline="Pick a plan. Be running in minutes."
        ctaLabel="Get Instant Access"
        ctaHref={SIGNUP_URL}
      />
    </PageShell>
  );
}
