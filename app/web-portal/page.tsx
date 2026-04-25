import type { Metadata } from "next";
import { ArrowRight, Search, Download, History, Sparkles } from "lucide-react";

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

import { ScoreDial } from "@/components/score-dial/ScoreDial";

import {
  softwareApplicationSchema,
  breadcrumbSchema,
  jsonLd,
} from "@/lib/schema";

const SIGNUP_URL = "https://app.kombatix.ai/signup";

export const metadata: Metadata = {
  title: "Kombatix Web Portal — No-Code Defense Scoring",
  description:
    "Run Defense scoring from your browser. Paste dispute details, get a full report with AI insights, export to PDF. No developer required.",
  alternates: { canonical: "/web-portal" },
  openGraph: {
    title: "Kombatix Web Portal — No-Code Defense Scoring",
    description:
      "Run Defense scoring from your browser. Paste dispute details, get a full report with AI insights, export to PDF. No developer required.",
    url: "https://kombatix.io/web-portal",
  },
};

export default function WebPortalPage() {
  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          softwareApplicationSchema({
            name: "Kombatix Web Portal Access",
            description:
              "Browser-based interface to Kombatix Defense scoring. No-code dispute identity scoring with PDF export and searchable history.",
            url: "https://kombatix.io/web-portal",
            priceMin: 35,
            priceMax: 250,
          }),
        )}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Web Portal", url: "/web-portal" },
          ]),
        )}
      />

      {/* 1 — Hero */}
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-container px-6 md:px-8 lg:px-12 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 items-center">
            <div>
              <EyebrowTag>Web Portal · No-Code Defense Scoring</EyebrowTag>
              <h1 className="text-hero mt-3">
                Run Defense scoring from your browser.
              </h1>
              <p className="mt-6 text-body-lg text-white/72">
                Kombatix Web Portal is the no-code path to Defense scoring.
                Your support team logs in, pastes dispute details, and gets a
                full Defense Report — three-engine composite score, identity
                match breakdown, AI insights, and a downloadable PDF — in
                seconds. No developer required, no integration needed.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button href={SIGNUP_URL} variant="primary" size="lg">
                  Start in the Web Portal{" "}
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </Button>
                <Button href="#pricing" variant="ghost-dark" size="lg">
                  See Web Portal Pricing
                </Button>
              </div>
            </div>

            {/* Hero visual — styled sample of the portal search input */}
            <div className="rounded-xl bg-navy-light border border-white/10 p-6">
              <div className="flex items-center gap-2 text-body-sm text-white/60 border-b border-white/10 pb-3 mb-4">
                <span className="inline-block w-2 h-2 rounded-full bg-score-low/70" />
                <span className="inline-block w-2 h-2 rounded-full bg-score-mid/70" />
                <span className="inline-block w-2 h-2 rounded-full bg-score-high/70" />
                <span className="ml-2">portal.kombatix.io</span>
              </div>
              <p className="text-eyebrow text-teal uppercase tracking-[0.1em] font-bold">
                New Defense Search
              </p>
              <div className="mt-4 space-y-3">
                <div className="rounded-lg bg-navy border border-white/10 px-3 py-2 text-body-sm text-white/80">
                  <span className="text-white/40">Dispute name:</span> John
                  Smith
                </div>
                <div className="rounded-lg bg-navy border border-white/10 px-3 py-2 text-body-sm text-white/80">
                  <span className="text-white/40">Transaction email:</span>{" "}
                  johnsmith@gmail.com
                </div>
                <div className="rounded-lg bg-navy border border-white/10 px-3 py-2 text-body-sm text-white/80">
                  <span className="text-white/40">Transaction date:</span>{" "}
                  2026-04-22 · $24.99
                </div>
              </div>
              <div className="mt-4 text-center text-body-sm text-white/40">
                ↓
              </div>
              <div className="mt-2 flex justify-center">
                <ScoreDial
                  score={94}
                  subLabel="Likely Friendly Fraud"
                  animate={false}
                  size="md"
                  label="Defense Score"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2 — How it fits (LIGHT) */}
      <Section tone="light" spacing="default">
        <div className="max-w-3xl">
          <EyebrowTag tone="light">When You Use the Web Portal</EyebrowTag>
          <h2 className="text-display text-navy mt-3">
            For teams who need Defense scoring without writing code.
          </h2>
          <p className="mt-6 text-body-lg text-gray-600">
            Web Portal Access is a separate subscription from the Defense API.
            Use the portal when your support team needs to score disputes
            manually — at first contact, at chargeback time, or anywhere a
            ticket lands without an API workflow attached. Use the API when
            you want scores returned automatically inside your CRM, helpdesk,
            or chargeback platform. Most customers start with the portal and
            add the API later; some run both side-by-side.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card tone="light">
            <h3 className="text-h3 text-navy">Best fit for the Web Portal</h3>
            <ul className="mt-4 space-y-2 text-body text-gray-600">
              <li>• Support, billing, and chargeback teams without engineering capacity</li>
              <li>• Companies just getting started with friendly-fraud scoring</li>
              <li>• Lower-volume dispute pipelines (10–100 disputes/month)</li>
              <li>• Trial or pilot deployments before committing to API integration</li>
            </ul>
          </Card>
          <Card tone="light">
            <h3 className="text-h3 text-navy">Web Portal + Defense API</h3>
            <p className="mt-4 text-body text-gray-600">
              The two products sit side by side. Subscribe to one, the other,
              or both depending on your team. Web Portal billing is
              independent of API billing — you only pay for what each team
              uses.
            </p>
          </Card>
        </div>
      </Section>

      {/* 3 — What you get (OFF-WHITE) */}
      <Section tone="off-white" spacing="default">
        <div className="max-w-3xl">
          <EyebrowTag tone="light">What&apos;s in the Portal</EyebrowTag>
          <h2 className="text-display text-navy mt-3">
            Four core surfaces. Day-one ready.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Search */}
          <Card tone="light">
            <Search className="w-7 h-7 text-accent" aria-hidden="true" />
            <h3 className="text-h3 text-navy mt-4">Defense Search</h3>
            <p className="mt-3 text-body text-gray-600">
              Paste dispute name, email, phone, address — plus the original
              transaction details — and get a full three-engine Defense
              Report in seconds. The same scoring model your engineering
              team would call via API, surfaced in a clean form-based UI.
            </p>
          </Card>

          {/* PDF export */}
          <Card tone="light">
            <Download className="w-7 h-7 text-accent" aria-hidden="true" />
            <h3 className="text-h3 text-navy mt-4">PDF Export</h3>
            <p className="mt-3 text-body text-gray-600">
              Every report exports as a polished PDF — composite score,
              sub-scores, reason codes, identity match breakdown, and the
              AI Defense Narrative. Drop it straight into your representment
              package, attach to a Zendesk ticket, or send to the issuing
              bank as evidence.
            </p>
          </Card>

          {/* AI insights */}
          <Card tone="light">
            <Sparkles className="w-7 h-7 text-accent" aria-hidden="true" />
            <h3 className="text-h3 text-navy mt-4">AI Insights</h3>
            <p className="mt-3 text-body text-gray-600">
              Each report includes a plain-English narrative explaining what
              the score means and what the evidence shows. Built for support
              teams who don&apos;t want to interpret raw sub-scores — the
              insights tell them what to do next.
            </p>
          </Card>

          {/* Searchable history */}
          <Card tone="light">
            <History className="w-7 h-7 text-accent" aria-hidden="true" />
            <h3 className="text-h3 text-navy mt-4">Searchable History</h3>
            <p className="mt-3 text-body text-gray-600">
              Every Defense Search your team has run — searchable by name,
              email, score, date, or status. Pull up a prior report when a
              chargeback lands weeks after the original ticket, or audit
              your team&apos;s decisions over time.
            </p>
          </Card>
        </div>

        {/* Screenshot placeholders — replaced with real screenshots later */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            className="rounded-xl bg-white border border-gray-200 aspect-[4/3] flex items-center justify-center text-body-sm text-gray-400"
            aria-label="Screenshot placeholder — Defense Report inside Web Portal"
          >
            <div className="text-center">
              <p className="text-eyebrow text-gray-400">Screenshot · Coming soon</p>
              <p className="mt-2 text-body text-gray-500">
                Defense Report view
              </p>
            </div>
          </div>
          <div
            className="rounded-xl bg-white border border-gray-200 aspect-[4/3] flex items-center justify-center text-body-sm text-gray-400"
            aria-label="Screenshot placeholder — Search history view"
          >
            <div className="text-center">
              <p className="text-eyebrow text-gray-400">Screenshot · Coming soon</p>
              <p className="mt-2 text-body text-gray-500">
                Searchable report history
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* 4 — How a Defense Search Works (LIGHT) */}
      <Section tone="light" spacing="default">
        <div className="max-w-3xl">
          <EyebrowTag tone="light">How a Defense Search Works</EyebrowTag>
          <h2 className="text-display text-navy mt-3">
            Four steps. Browser-only.
          </h2>
        </div>

        <div className="mt-12">
          <Table caption="Defense Search workflow inside the Web Portal">
            <TableHead>
              <TableRow>
                <TableHeadCell className="w-1/4">Step</TableHeadCell>
                <TableHeadCell>What Happens</TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell className="font-semibold">1. Open the portal</TableCell>
                <TableCell>
                  Sign in at portal.kombatix.io. Each team member gets their
                  own login; usage rolls up to your subscription.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">2. Paste dispute details</TableCell>
                <TableCell>
                  Disputing party&apos;s name, email, phone, billing address —
                  plus the transaction&apos;s name, email, address, date, and
                  amount. Same fields the API takes; just typed in instead of
                  POSTed.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">3. Run the search</TableCell>
                <TableCell>
                  Click search. Defense returns a full report in seconds —
                  composite score, sub-scores, reason codes, identity match
                  breakdown, AI Defense Narrative.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">4. Act on the result</TableCell>
                <TableCell>
                  Copy the AI narrative into your support ticket, export the
                  PDF for representment, or save the report to your team&apos;s
                  history for later reference.
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Section>

      {/* 5 — Pricing (OFF-WHITE) */}
      <Section tone="off-white" spacing="default" id="pricing">
        <div className="max-w-3xl">
          <EyebrowTag tone="light">Web Portal Pricing</EyebrowTag>
          <h2 className="text-display text-navy mt-3">
            Two plans. Pay-per-actionable-result overage.
          </h2>
          <p className="mt-6 text-body-lg text-gray-600">
            Web Portal subscriptions are independent of Defense API
            subscriptions. Every search returns a full report; we charge for
            scores in the friendly-fraud band (60+) — the results your team
            can actually act on. No setup fee. No long-term contract.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
          <PricingCard
            planName="Web Portal · Standard"
            price="35"
            priceSuffix="/month"
            intro="Up to 10 reports/month included"
            features={[
              "Full three-engine Defense scoring",
              "$3 per additional actionable report (60+)",
              "PDF export with AI Defense Narrative",
              "Searchable report history",
              "Multi-user team logins",
              "No setup fee",
            ]}
            ctaLabel="Start Standard"
            ctaHref={SIGNUP_URL}
          />
          <PricingCard
            planName="Web Portal · Pro"
            price="250"
            priceSuffix="/month"
            intro="Up to 100 reports/month included"
            features={[
              "Everything in Standard",
              "$2 per additional actionable report (60+)",
              "Higher daily search rate limits",
              "Priority support response",
              "PDF export with AI Defense Narrative",
              "Searchable report history",
            ]}
            ctaLabel="Start Pro"
            ctaHref={SIGNUP_URL}
            recommended
          />
          <PricingCard
            planName="Web Portal · Enterprise"
            price="Contact Us"
            intro="High-volume, multi-team, custom fit"
            features={[
              "Custom report allocation",
              "Multi-team account hierarchy",
              "SSO / SAML available",
              "Dedicated success contact",
              "Custom onboarding",
            ]}
            ctaLabel="Contact Sales"
            ctaHref="mailto:operations@kombatix.io?subject=Web%20Portal%20Enterprise%20Inquiry"
          />
        </div>

        <p className="mt-8 text-body-sm text-gray-500 max-w-3xl">
          &quot;Reports&quot; on Web Portal are equivalent to &quot;hits&quot;
          on the API — one Defense Search returns one report. We bill for
          searches that return a Defense Score of 60 or higher, matching the
          API&apos;s &quot;pay for actionable results&quot; threshold.
        </p>
      </Section>

      {/* 6 — Web Portal vs Defense API (LIGHT) */}
      <Section tone="light" spacing="default">
        <div className="max-w-3xl">
          <EyebrowTag tone="light">Web Portal vs Defense API</EyebrowTag>
          <h2 className="text-display text-navy mt-3">
            Same scoring engine. Two access paths.
          </h2>
          <p className="mt-6 text-body-lg text-gray-600">
            The Web Portal and the Defense API hit the same three-engine
            composite scoring infrastructure. The difference is how your
            team gets to it.
          </p>
        </div>

        <div className="mt-12">
          <Table caption="Web Portal Access vs Defense API comparison">
            <TableHead>
              <TableRow>
                <TableHeadCell></TableHeadCell>
                <TableHeadCell>Web Portal Access</TableHeadCell>
                <TableHeadCell>Defense API</TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell className="font-semibold">Access</TableCell>
                <TableCell>Browser, no-code</TableCell>
                <TableCell>REST API, JSON in/out</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Best for</TableCell>
                <TableCell>Support / billing / CX teams</TableCell>
                <TableCell>Engineering integrations</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Scoring engine</TableCell>
                <TableCell>Three-engine composite (same model)</TableCell>
                <TableCell>Three-engine composite (same model)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">PDF export</TableCell>
                <TableCell>Built in</TableCell>
                <TableCell>Generate from API response</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">History</TableCell>
                <TableCell>Searchable in-portal</TableCell>
                <TableCell>Persist via your own systems</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Starting price</TableCell>
                <TableCell>$35 / month</TableCell>
                <TableCell>$75 / month</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Setup fee</TableCell>
                <TableCell>None</TableCell>
                <TableCell>None</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Sandbox</TableCell>
                <TableCell>—</TableCell>
                <TableCell>Yes (sandbox calls free)</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <p className="mt-8 text-body text-gray-600 max-w-3xl">
          Need both? Most customers start with the Web Portal for their support
          team, then add the API later when their engineers are ready to
          automate. Web Portal and API subscriptions are independent — you
          can run either, both, or switch between them at any time.
        </p>
      </Section>

      <CtaBand
        headline="Score your next dispute in your browser."
        ctaLabel="Start in the Web Portal"
        ctaHref={SIGNUP_URL}
      />
    </PageShell>
  );
}
