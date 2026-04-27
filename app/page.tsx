import type { Metadata } from "next";
import { Link } from "@/components/ui/Link";
import { ArrowRight } from "lucide-react";

import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/layout/CtaBand";

import { Button } from "@/components/ui/Button";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { Card } from "@/components/ui/Card";
import { StatCard } from "@/components/ui/StatCard";
import { TrustBar } from "@/components/ui/TrustBar";

import { ScoreDialRotator } from "@/components/score-dial/ScoreDialRotator";
import { SignupButton } from "@/components/analytics/SignupButton";

import {
  websiteSchema,
  breadcrumbSchema,
  jsonLd,
} from "@/lib/schema";

const SIGNUP_URL = "https://app.kombatix.ai/signup";

// ── Metadata — approved per architecture doc §4 ────────────────────
export const metadata: Metadata = {
  title: "Kombatix — Identity Scoring for Friendly Fraud Defense",
  description:
    "Real-time identity scoring to fight friendly fraud at pre-auth and at dispute. Three products, one network. Get instant access.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Kombatix — Identity Scoring for Friendly Fraud Defense",
    description:
      "Real-time identity scoring to fight friendly fraud at pre-auth and at dispute. Three products, one network. Get instant access.",
    url: "https://kombatix.io/",
  },
};

// ──────────────────────────────────────────────────────────────────
// Home page
// ──────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <PageShell>
      {/* WebSite + Breadcrumb JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(websiteSchema())}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([{ name: "Home", url: "/" }]),
        )}
      />

      {/* 1 — Hero (DARK) + Trust bar (continuous) */}
      <section className="bg-navy text-white min-h-[90vh] flex items-center">
        <div className="mx-auto max-w-container px-6 md:px-8 lg:px-12 py-12 md:py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 items-center">
            <div>
              <EyebrowTag>
                Real-Time Identity Scoring · From Pre-Authorization to Dispute
              </EyebrowTag>
              <h1 className="text-display mt-3">
                Know who you&apos;re fighting. Before you authorize, before you
                refund, before you pay out.
              </h1>
              <p className="mt-6 text-body-lg text-white/72 max-w-2xl">
                Fraud prevention stops strangers. Chargeback tools fight
                disputes after they&apos;re filed. Nothing sits in the middle.
              </p>
              <p className="mt-4 text-body-lg text-white/72 max-w-2xl">
                Kombatix scores identity at every critical point —
                pre-authorization screening against a growing network of known
                friendly fraudsters, and dispute-time defense with composite
                scoring at the moment of contact. Stop paying for transactions
                and refunds you don&apos;t owe.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <SignupButton event="signup_click_defense" href={SIGNUP_URL}>
                  Get Started <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </SignupButton>
                <Button href="/how-it-works" variant="ghost-dark" size="lg">
                  See How It Works
                </Button>
              </div>
            </div>

            {/* Score dial (CMP-01) */}
            <div className="flex justify-center lg:justify-end">
              <ScoreDialRotator />
            </div>
          </div>

          {/* Trust bar — continuous with hero */}
          <div className="mt-16 border-t border-white/10 pt-8">
            <TrustBar
              items={[
                "Self Signup",
                "Instant Web Access",
                "REST API",
                "Developer Portal",
                "No Long-Term Contract",
              ]}
            />
          </div>
        </div>
      </section>

      {/* 2 — The Gap in the Fraud Stack (LIGHT) */}
      <Section tone="light" spacing="default">
        <div className="max-w-3xl">
          <EyebrowTag tone="light">The Gap in the Fraud Stack</EyebrowTag>
          <h2 className="text-display text-navy mt-3">
            Fraud prevention stops strangers. Chargeback alerts give you a
            warning. Neither tells you whether the dispute is real.
          </h2>
          <p className="mt-6 text-body-lg text-gray-600">
            Your Kount or Signifyd catches the stolen credit card at checkout.
            Your Ethoca or Verifi alerts give you a window to refund before a
            dispute becomes a chargeback. But in between — when the authorized
            cardholder changes their mind, exploits your refund policy, or
            disputes a legitimate purchase claiming it wasn&apos;t them —
            you have nothing. No score. No proof. No answer. You guess, or you
            refund.
          </p>
          <p className="mt-6 text-body-lg text-gray-600">
            And when a fraud-coded chargeback does land at the bank, the burden
            shifts to you to <em>prove</em> the cardholder made the purchase.
            Most merchants lose. Without timestamped identity evidence —
            without a structured report tying the disputing party back to the
            original transaction — fraud-coded chargebacks become write-offs
            that no alert tool, no representment platform, no support script
            can recover.
          </p>
        </div>

        {/* IMG-02 placeholder — Nano Banana Pro in Phase 6 */}
        <div
          className="mt-12 rounded-xl bg-off-white border border-gray-200 p-8 md:p-12 flex items-center justify-center"
          aria-label="Gap diagram — placeholder for IMG-02"
        >
          <div className="grid grid-cols-3 gap-4 w-full max-w-3xl">
            <div className="rounded-lg border border-gray-200 bg-white p-6 text-center">
              <p className="text-eyebrow text-gray-500">Stage 1</p>
              <p className="mt-2 font-semibold text-navy">Fraud Prevention</p>
              <p className="mt-1 text-body-sm text-gray-500">
                Kount · Signifyd · Stripe Radar
              </p>
            </div>
            <div className="rounded-lg border-2 border-accent bg-accent/5 p-6 text-center">
              <p className="text-eyebrow text-accent">Gap Zone</p>
              <p className="mt-2 font-semibold text-navy">Kombatix scores here</p>
              <p className="mt-1 text-body-sm text-gray-600">
                PreAuth screening · Defense scoring
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-6 text-center">
              <p className="text-eyebrow text-gray-500">Stage 3</p>
              <p className="mt-2 font-semibold text-navy">Chargeback Resolution</p>
              <p className="mt-1 text-body-sm text-gray-500">
                Ethoca · Verifi · Chargebacks911
              </p>
            </div>
          </div>
        </div>

        <p className="mt-8 text-body-lg text-gray-600 max-w-3xl">
          Kombatix fills the gap with real-time identity scoring at two
          critical moments: pre-authorization (PreAuth) screens against a
          known-fraudster network, and dispute-time (Defense) scores identity
          against the original transaction and returns a 0–100 composite
          score you can act on.
        </p>
        <p className="mt-6 text-body-lg text-gray-600 max-w-3xl">
          When a fraud-coded chargeback does land at the bank, every Defense
          report ships with a structured evidence package — composite score,
          identity match breakdown, reason codes, and a ready-to-use AI
          Defense Narrative — your team attaches directly to your
          representment submission. The issuer sees timestamped identity
          evidence proving the disputing party is the same person who made
          the purchase. The fraud claim falls apart. Cases that used to be
          write-offs become winnable, and merchants in production are doubling
          their fraud-chargeback win rate.
        </p>
      </Section>

      {/* 3 — Product Lineup (OFF-WHITE) */}
      <Section tone="off-white" spacing="default">
        <div className="max-w-3xl">
          <EyebrowTag tone="light">One platform · Three products</EyebrowTag>
          <h2 className="text-display text-navy mt-3">
            Identity scoring at both ends of the fraud lifecycle — API or
            no-code, your choice.
          </h2>
          <p className="mt-6 text-body-lg text-gray-600">
            Kombatix is a full-lifecycle identity defense system. Screen
            transactions before authorization, score disputes at the moment of
            contact, and run those scores either through your own API
            integration or through a browser-based portal built for support
            teams without engineering capacity.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* PreAuth card */}
          <Card tone="light">
            <EyebrowTag tone="light">Pre-Authorization · API</EyebrowTag>
            <h3 className="text-h2 text-navy mt-3">Kombatix PreAuth</h3>
            <p className="mt-4 text-body text-gray-600">
              Screen every transaction against the growing Kombatix Network of
              confirmed friendly fraudsters — before you authorize.
              Lightweight API, millisecond response, fraction of a cent per
              no-hit check.
            </p>
            <div className="mt-6">
              <Link
                href="/preauth"
                className="text-accent font-semibold inline-flex items-center gap-1 hover:underline"
              >
                Explore PreAuth{" "}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </Card>

          {/* Defense API card */}
          <Card tone="light">
            <EyebrowTag tone="light">Dispute Defense · API</EyebrowTag>
            <h3 className="text-h2 text-navy mt-3">Kombatix Defense</h3>
            <p className="mt-4 text-body text-gray-600">
              When a customer disputes a charge, score their identity in
              real-time against the original transaction. Three engines, one
              composite score, AI-generated evidence narrative — embed the
              result directly in your CRM, helpdesk, or chargeback workflow.
            </p>
            <div className="mt-6">
              <Link
                href="/defense"
                className="text-accent font-semibold inline-flex items-center gap-1 hover:underline"
              >
                Explore Defense{" "}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </Card>

          {/* Web Portal card */}
          <Card tone="light">
            <EyebrowTag tone="light">Dispute Defense · No-Code</EyebrowTag>
            <h3 className="text-h2 text-navy mt-3">Web Portal Access</h3>
            <p className="mt-4 text-body text-gray-600">
              The same Defense scoring engine, accessed through a browser.
              Support and CX teams paste dispute details, get a full report
              with AI insights, export to PDF, and search past results — no
              developer required.
            </p>
            <div className="mt-6">
              <Link
                href="/web-portal"
                className="text-accent font-semibold inline-flex items-center gap-1 hover:underline"
              >
                Explore Web Portal{" "}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </Card>
        </div>
      </Section>

      {/* 4 — Network Effect (DARK, punch moment) */}
      <Section tone="dark" spacing="default">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 items-center">
          <div>
            <EyebrowTag>The Kombatix Network</EyebrowTag>
            <h2 className="text-display mt-3">
              Every Defense scoring customer strengthens every PreAuth
              customer.
            </h2>
            <p className="mt-6 text-body-lg text-white/72">
              When a Defense score confirms friendly fraud — whether scored
              through the API or the Web Portal — that identity joins the
              Kombatix Network, the shared database every PreAuth customer
              screens against. The more merchants in the network, the more
              friendly fraudsters caught at pre-authorization, before the
              transaction completes. This is a flywheel, not a feature.
            </p>
          </div>
          {/* IMG-08 placeholder */}
          <div
            className="rounded-xl bg-navy-light border border-white/10 p-8 aspect-square flex items-center justify-center"
            aria-label="Network diagram — placeholder for IMG-08"
          >
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full max-w-xs"
              role="presentation"
            >
              <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(14,173,165,0.3)" strokeWidth="1" />
              <circle cx="100" cy="100" r="12" fill="#0EADA5" />
              {[0, 60, 120, 180, 240, 300].map((deg) => {
                const r = 90;
                const rad = ((deg - 90) * Math.PI) / 180;
                const x = 100 + r * Math.cos(rad);
                const y = 100 + r * Math.sin(rad);
                return (
                  <g key={deg}>
                    <line
                      x1="100"
                      y1="100"
                      x2={x}
                      y2={y}
                      stroke="#005B9D"
                      strokeWidth="1"
                      strokeDasharray="2 3"
                      opacity="0.5"
                    />
                    <circle cx={x} cy={y} r="6" fill="white" />
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </Section>

      {/* 5 — Customer Outcomes (LIGHT) */}
      <Section tone="light" spacing="default">
        <div className="max-w-3xl">
          <EyebrowTag tone="light">Proven in Production</EyebrowTag>
          <h2 className="text-display text-navy mt-3">
            Real customer outcomes from Kombatix Defense.
          </h2>
          <p className="mt-6 text-body-lg text-gray-600">
            A leading digital subscription company — 500+ daily paying
            subscribers, friendly fraud as their #1 chargeback reason —
            integrated Kombatix Defense at two points in their support workflow.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <StatCard
            value="10% → 5%"
            label="Refund Rate"
            body="Support agents run disputing customers through Defense at first contact. Agents deflect confirmed friendly fraud using the AI-generated defense narrative. Refund requests cut in half."
          />
          <StatCard
            value="−60%"
            label="Post-Contact Disputes"
            body="Customers told 'your identity was verified against the original purchase and we will provide this information to your bank in case of a dispute' rarely escalate to their bank. Post-contact dispute volume dropped by 60% in the first 60 days."
          />
          <StatCard
            value="40% → 80%"
            label="Representment Wins"
            body="Every fraud-coded chargeback receives a Kombatix report when the score falls in the friendly fraud range. Overall representment win rate doubled."
          />
        </div>

        <p className="mt-8 text-body-sm text-gray-500 max-w-3xl">
          Customer anonymized; metrics verified from production API usage. Named-customer logos and case studies will be published as permissions are secured.
        </p>
      </Section>

      {/* 6 — Pricing Preview (LIGHT) */}
      <Section tone="light" spacing="default">
        <div className="max-w-3xl">
          <EyebrowTag tone="light">Pricing</EyebrowTag>
          <h2 className="text-display text-navy mt-3">
            Three products. Transparent pricing. No long-term contracts.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <Card tone="light">
            <p className="text-eyebrow text-teal uppercase tracking-[0.1em] font-bold">
              Kombatix PreAuth
            </p>
            <p className="mt-3 text-display text-navy font-bold">
              from <span className="text-accent">$49</span>
              <span className="text-body text-gray-500">/month</span>
            </p>
            <p className="mt-1 text-body-sm text-gray-500">API · pre-auth screening</p>
            <ul className="mt-6 space-y-2 text-body text-gray-600">
              <li>• Screen every transaction against the Kombatix Network</li>
              <li>• Sub-cent no-hit checks</li>
              <li>• Millisecond response</li>
            </ul>
            <div className="mt-6">
              <Link
                href="/pricing#preauth"
                className="text-accent font-semibold inline-flex items-center gap-1 hover:underline"
              >
                View PreAuth Pricing{" "}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </Card>

          <Card tone="light">
            <p className="text-eyebrow text-teal uppercase tracking-[0.1em] font-bold">
              Kombatix Defense
            </p>
            <p className="mt-3 text-display text-navy font-bold">
              from <span className="text-accent">$75</span>
              <span className="text-body text-gray-500">/month</span>
            </p>
            <p className="mt-1 text-body-sm text-gray-500">API · dispute scoring</p>
            <ul className="mt-6 space-y-2 text-body text-gray-600">
              <li>• Three-engine composite identity scoring</li>
              <li>• AI-generated defense narrative</li>
              <li>• Ready-to-attach evidence package</li>
            </ul>
            <div className="mt-6">
              <Link
                href="/pricing#defense"
                className="text-accent font-semibold inline-flex items-center gap-1 hover:underline"
              >
                View Defense Pricing{" "}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </Card>

          <Card tone="light">
            <p className="text-eyebrow text-teal uppercase tracking-[0.1em] font-bold">
              Web Portal Access
            </p>
            <p className="mt-3 text-display text-navy font-bold">
              from <span className="text-accent">$35</span>
              <span className="text-body text-gray-500">/month</span>
            </p>
            <p className="mt-1 text-body-sm text-gray-500">No-code · Defense scoring</p>
            <ul className="mt-6 space-y-2 text-body text-gray-600">
              <li>• Browser-only access for support and CX teams</li>
              <li>• PDF export with AI insights</li>
              <li>• Searchable report history</li>
            </ul>
            <div className="mt-6">
              <Link
                href="/pricing#web-portal"
                className="text-accent font-semibold inline-flex items-center gap-1 hover:underline"
              >
                View Web Portal Pricing{" "}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </Card>
        </div>

        <p className="mt-8 text-body text-gray-600 max-w-3xl">
          API documentation available immediately after signup, and keys can
          be generated in minutes.
        </p>

        <div className="mt-8">
          <Button href="/pricing" variant="primary">
            See Full Pricing <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Button>
        </div>
      </Section>

      {/* 7 — Partners Teaser (OFF-WHITE for subtle differentiation) */}
      <Section tone="off-white" spacing="default">
        <div className="max-w-3xl">
          <EyebrowTag tone="light">Built for Scale — Partnership Ready</EyebrowTag>
          <h2 className="text-display text-navy mt-3">
            Payment processors, fraud platforms, and acquirers embed Kombatix.
          </h2>
          <p className="mt-6 text-body-lg text-gray-600">
            Payment processors, fraud platforms, and acquirers embed Kombatix
            scoring into their dispute workflows and pre-auth decisioning.
            Every partner integration expands the Kombatix Network — more data,
            more caught fraudsters, stronger outcomes for every customer.
          </p>
          <div className="mt-8">
            <Button href="/partners" variant="primary">
              Learn About Partnerships <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </Section>

      {/* 8 — Footer CTA Band (DARK) */}
      <CtaBand
        headline="Stop guessing. Start scoring."
        ctaLabel="Get Instant Access"
        ctaHref={SIGNUP_URL}
      />

      {/* 9 — Footer (DARK) handled by PageShell */}
    </PageShell>
  );
}
