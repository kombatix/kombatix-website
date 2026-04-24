import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/layout/CtaBand";

import { Button } from "@/components/ui/Button";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { Card } from "@/components/ui/Card";
import { PricingCard } from "@/components/ui/PricingCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "@/components/ui/Table";

import {
  softwareApplicationSchema,
  breadcrumbSchema,
  jsonLd,
} from "@/lib/schema";

const SIGNUP_URL = "https://app.kombatix.ai/signup";

export const metadata: Metadata = {
  title: "Kombatix PreAuth — Pre-Authorization Fraud Screening",
  description:
    "Screen every transaction against the Kombatix Network of confirmed friendly fraudsters. Sub-cent no-hit checks, millisecond response.",
  alternates: { canonical: "/preauth" },
  openGraph: {
    title: "Kombatix PreAuth — Pre-Authorization Fraud Screening",
    description:
      "Screen every transaction against the Kombatix Network of confirmed friendly fraudsters. Sub-cent no-hit checks, millisecond response.",
    url: "https://kombatix.io/preauth",
  },
};

export default function PreAuthPage() {
  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          softwareApplicationSchema({
            name: "Kombatix PreAuth",
            description:
              "Pre-authorization identity screening against the Kombatix Network of confirmed friendly fraudsters. REST API, millisecond response.",
            url: "https://kombatix.io/preauth",
            priceMin: 49,
            priceMax: 499,
          }),
        )}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "PreAuth", url: "/preauth" },
          ]),
        )}
      />

      {/* 1 — Hero */}
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-container px-6 md:px-8 lg:px-12 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 items-center">
            <div>
              <EyebrowTag>
                Pre-Authorization Screening · The Kombatix Network
              </EyebrowTag>
              <h1 className="text-hero mt-3">
                Catch friendly fraudsters before you authorize.
              </h1>
              <p className="mt-6 text-body-lg text-white/72">
                Kombatix PreAuth checks every incoming transaction against the
                Kombatix Network — our growing database of identities
                confirmed as friendly fraud by other merchants. If someone
                who&apos;s filed a false dispute with another Kombatix customer
                tries to pay you, you know before the charge goes through.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button href={SIGNUP_URL} variant="primary" size="lg">
                  Start Screening <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </Button>
                <Button href="/pricing#preauth" variant="ghost-dark" size="lg">
                  See Pricing
                </Button>
              </div>
            </div>

            {/* IMG-09 placeholder */}
            <div
              className="rounded-xl bg-navy-light border border-white/10 p-6 aspect-square flex items-center justify-center"
              aria-label="Network screening diagram — placeholder for IMG-09"
            >
              <svg viewBox="0 0 240 240" className="w-full h-full" role="presentation">
                <defs>
                  <radialGradient id="center-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#0EADA5" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#0EADA5" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <circle cx="120" cy="120" r="80" fill="url(#center-glow)" />
                {/* Existing nodes */}
                {[30, 100, 170, 240, 310].map((deg) => {
                  const r = 95;
                  const rad = ((deg - 90) * Math.PI) / 180;
                  const x = 120 + r * Math.cos(rad);
                  const y = 120 + r * Math.sin(rad);
                  return (
                    <g key={deg}>
                      <line x1="120" y1="120" x2={x} y2={y} stroke="#005B9D" strokeWidth="1" opacity="0.5" />
                      <circle cx={x} cy={y} r="5" fill="white" opacity="0.9" />
                    </g>
                  );
                })}
                {/* Flagged incoming transaction */}
                <line x1="120" y1="120" x2="215" y2="80" stroke="#EF4444" strokeWidth="2" />
                <circle cx="215" cy="80" r="8" fill="#EF4444" />
                <circle cx="215" cy="80" r="14" fill="none" stroke="#EF4444" strokeWidth="1" opacity="0.4" />
                {/* Central check */}
                <circle cx="120" cy="120" r="14" fill="#0EADA5" />
                <path d="M 113 120 L 118 125 L 127 114" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* 2 — Why PreAuth Matters (LIGHT) */}
      <Section tone="light" spacing="default">
        <div className="max-w-3xl">
          <EyebrowTag tone="light">Why PreAuth Matters</EyebrowTag>
          <h2 className="text-display text-navy mt-3">
            Friendly fraudsters rarely stop at one merchant.
          </h2>
          <p className="mt-6 text-body-lg text-gray-600">
            Someone who successfully got a refund by disputing a legitimate
            purchase will try it again — with the same email, same card
            patterns, similar behavior. The Kombatix Network makes that
            pattern visible before the next merchant gets burned.
          </p>
        </div>

        {/* Full-width dark callout — The Network Is the Product */}
        <div className="mt-12 rounded-xl bg-navy text-white p-8 md:p-12">
          <EyebrowTag>The Network Is the Product</EyebrowTag>
          <p className="mt-3 text-h2">
            Every transaction a Kombatix Defense customer scores as friendly
            fraud populates the Kombatix Network. Every PreAuth customer
            screens against that network.
          </p>
          <p className="mt-6 text-body text-white/72">
            The more merchants in the network, the faster friendly fraudsters
            are identified across the ecosystem. Only Defense scores of 60 or
            higher contribute to the network — matches the &quot;pay for
            actionable results&quot; threshold.
          </p>
        </div>
      </Section>

      {/* 3 — How PreAuth Works (OFF-WHITE) */}
      <Section tone="off-white" spacing="default">
        <div className="max-w-3xl">
          <EyebrowTag tone="light">How PreAuth Works</EyebrowTag>
          <h2 className="text-display text-navy mt-3">
            Four steps. Milliseconds. Your decision.
          </h2>
        </div>

        <div className="mt-12">
          <Table caption="The PreAuth network check — step by step">
            <TableHead>
              <TableRow>
                <TableHeadCell className="w-1/4">Step</TableHeadCell>
                <TableHeadCell>What Happens</TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell className="font-semibold">1. Incoming Transaction</TableCell>
                <TableCell>
                  At checkout, subscription renewal, or any authorization
                  event, you call the PreAuth endpoint with the customer&apos;s
                  identity (name, email, phone, address, optional card token).
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">2. Network Check</TableCell>
                <TableCell>
                  Kombatix checks the submitted identity against the Network —
                  identities confirmed as friendly fraud by other merchants.
                  Milliseconds, no external latency added to your flow.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">3. Hit or No-Hit Response</TableCell>
                <TableCell>
                  If the identity is in the network, you get a hit response
                  with severity and optional match detail. If not, a clean
                  no-hit. Your downstream logic decides what to do with that
                  signal.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">4. Your Decision</TableCell>
                <TableCell>
                  You choose how to act — decline, step-up auth, hold for
                  review, flag for support — based on your risk tolerance.
                  Kombatix provides the signal; the decision stays with you.
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Section>

      {/* 4 — Where It Fits in Your Stack (LIGHT) */}
      <Section tone="light" spacing="default">
        <div className="max-w-3xl">
          <EyebrowTag tone="light">Where It Fits in Your Stack</EyebrowTag>
          <h2 className="text-display text-navy mt-3">
            Upstream of your existing fraud tools. Complementary, not a
            replacement.
          </h2>
          <p className="mt-6 text-body-lg text-gray-600">
            PreAuth sits upstream of your existing fraud tools. It is not a
            replacement for Kount, Signifyd, Stripe Radar, or Sift — those
            tools are excellent at catching strangers using stolen cards.
            PreAuth catches the opposite problem: authorized cardholders who
            have a history of disputing their own legitimate purchases.
            Different threat model, different screening layer, complementary
            stack.
          </p>
        </div>
      </Section>

      {/* 5 — Pricing Cards (OFF-WHITE) */}
      <Section tone="off-white" spacing="default" id="preauth-pricing">
        <div className="max-w-3xl">
          <EyebrowTag tone="light">PreAuth Pricing</EyebrowTag>
          <h2 className="text-display text-navy mt-3">
            Three plans. Pay-per-check overage. No long-term contract.
          </h2>
          <p className="mt-6 text-body-lg text-gray-600">
            Each plan includes a monthly usage credit. No-hit checks are a
            fraction of a cent; hits are billed at your tier&apos;s hit rate.
            One-time $250 implementation fee applies at onboarding for all
            tiers.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
          <PricingCard
            planName="PreAuth Starter"
            price="49"
            priceSuffix="/month"
            intro="Up to ~25K transactions/month"
            features={[
              "No-hit: $0.005 each",
              "Hits: $0.15 each",
              "$49 monthly credit toward usage",
              "API key + documentation access",
            ]}
            ctaLabel="Select Plan"
            ctaHref={SIGNUP_URL}
          />
          <PricingCard
            planName="PreAuth Growth"
            price="149"
            priceSuffix="/month"
            intro="25K–100K transactions/month"
            features={[
              "No-hit: $0.005 each",
              "Hits: $0.10 each",
              "$149 monthly credit",
              "Priority support",
              "API key + documentation access",
            ]}
            ctaLabel="Select Plan"
            ctaHref={SIGNUP_URL}
            recommended
          />
          <PricingCard
            planName="PreAuth Enterprise"
            price="499"
            priceSuffix="/month"
            intro="100K+ transactions/month"
            features={[
              "No-hit: $0.005 each",
              "Hits: $0.05 each",
              "$499 monthly credit",
              "Dedicated support",
              "Custom integrations",
            ]}
            ctaLabel="Select Plan"
            ctaHref={SIGNUP_URL}
          />
        </div>

        <p className="mt-8 text-body-sm text-gray-500 max-w-3xl">
          One-time $250 implementation fee applies to all PreAuth plans at
          onboarding.
        </p>
      </Section>

      {/* 6 — Who PreAuth Is For (LIGHT) */}
      <Section tone="light" spacing="default">
        <div className="max-w-3xl">
          <EyebrowTag tone="light">Who PreAuth Is For</EyebrowTag>
          <h2 className="text-display text-navy mt-3">Segment fit guide.</h2>
        </div>

        <div className="mt-12">
          <Table caption="PreAuth segment fit">
            <TableHead>
              <TableRow>
                <TableHeadCell>Segment</TableHeadCell>
                <TableHeadCell>Fit</TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell className="font-semibold">Subscription / SaaS with free or low-cost trials</TableCell>
                <TableCell>
                  Strong fit — trial-to-paid conversion is the highest-risk
                  moment for friendly fraud.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Digital goods / services (downloadable, streaming, content)</TableCell>
                <TableCell>
                  Strong fit — no physical delivery means no shipping
                  evidence, making friendly fraud easier to claim.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">High-volume e-commerce with repeat customers</TableCell>
                <TableCell>
                  Strong fit — catches serial refund-abuse patterns across
                  merchants.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Low-volume / high-ticket e-commerce</TableCell>
                <TableCell>
                  Check fit — volume-based pricing may not be the best match;
                  talk to sales about Defense-primary pricing.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Marketplaces</TableCell>
                <TableCell>
                  Case-by-case — depends on which side of the transaction
                  you&apos;re screening.
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Section>

      <CtaBand
        headline="The network grows every day. Join it."
        ctaLabel="Start PreAuth"
        ctaHref={SIGNUP_URL}
      />
    </PageShell>
  );
}
