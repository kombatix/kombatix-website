import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/layout/CtaBand";

import { Button } from "@/components/ui/Button";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { Card } from "@/components/ui/Card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "@/components/ui/Table";

import { ScoreDial } from "@/components/score-dial/ScoreDial";
import { CostDecisionTree } from "@/components/cost-decision-tree/CostDecisionTree";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";
import { TrackScrollDepth } from "@/components/analytics/TrackScrollDepth";

const SIGNUP_URL = "https://app.kombatix.ai/signup";

export const metadata: Metadata = {
  title: "How Kombatix Works — Scoring Methodology Explained",
  description:
    "Two products, three scoring engines, one composite score. Learn how Kombatix fights friendly fraud at every stage of the lifecycle.",
  alternates: { canonical: "/how-it-works" },
  openGraph: {
    title: "How Kombatix Works — Scoring Methodology Explained",
    description:
      "Two products, three scoring engines, one composite score. Learn how Kombatix fights friendly fraud at every stage of the lifecycle.",
    url: "https://kombatix.io/how-it-works",
  },
};

export default function HowItWorksPage() {
  return (
    <PageShell>
      <TrackScrollDepth />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "How It Works", url: "/how-it-works" },
          ]),
        )}
      />

      {/* 1 — Hero */}
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-container px-6 md:px-8 lg:px-12 py-20 md:py-28">
          <div className="max-w-3xl">
            <EyebrowTag>How Kombatix Works</EyebrowTag>
            <h1 className="text-hero mt-3">
              Identity scoring at every stage of the fraud lifecycle.
            </h1>
            <p className="mt-6 text-body-lg text-white/72">
              Kombatix runs two complementary products on a shared identity
              infrastructure — PreAuth screens before the transaction;
              Defense scores when a dispute is filed. Both feed the Kombatix
              Network, which grows stronger with every customer.
            </p>
          </div>
        </div>
      </section>

      {/* 2 — The Cost of a Single Friendly Fraud Claim (LIGHT) — CMP-03 placeholder */}
      <Section tone="light" spacing="default">
        <div className="max-w-3xl">
          <EyebrowTag tone="light">The Cost of a Friendly Fraud Claim</EyebrowTag>
          <h2 className="text-display text-navy mt-3">
            Every claim costs $25 – $45. Where Kombatix intervenes changes the
            math.
          </h2>
          <p className="mt-6 text-body-lg text-gray-600">
            A single $25 friendly fraud claim can cost a merchant anywhere from
            $25 to $45 depending on how it&apos;s handled. Defense intervenes
            before the chargeback — recovering the transaction and saving the
            downstream fees.
          </p>
        </div>

        {/* CMP-03 — Cost decision tree */}
        <CostDecisionTree className="mt-12" />
      </Section>

      {/* 3 — Kombatix PreAuth (OFF-WHITE) */}
      <Section tone="off-white" spacing="default">
        <div className="max-w-3xl">
          <EyebrowTag tone="light">Pre-Authorization Screening</EyebrowTag>
          <h2 className="text-display text-navy mt-3">
            Is this transaction about to be trouble?
          </h2>
          <p className="mt-6 text-body-lg text-gray-600">
            Before authorization completes, PreAuth checks the transaction&apos;s
            identity against the Kombatix Network. The check is lightweight —
            one POST, millisecond response, sub-cent cost on no-hits. When a
            hit returns, you know the identity has been confirmed as friendly
            fraud by at least one other Kombatix merchant. What you do next is
            your call.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card tone="light">
            <h3 className="text-h3 text-navy">Inputs</h3>
            <p className="mt-3 text-body text-gray-600">
              Name · email · phone · billing address · optional shipping ·
              optional card token
            </p>
          </Card>
          <Card tone="light">
            <h3 className="text-h3 text-navy">Output</h3>
            <p className="mt-3 text-body text-gray-600">
              Hit / no-hit, severity level on hits, optional match metadata
            </p>
          </Card>
        </div>
      </Section>

      {/* 4 — Defense Engines (LIGHT) */}
      <Section tone="light" spacing="default">
        <div className="max-w-3xl">
          <EyebrowTag tone="light">Kombatix Defense — The Composite Score</EyebrowTag>
          <h2 className="text-display text-navy mt-3">
            Three engines, one composite score, one clear answer.
          </h2>
          <p className="mt-6 text-body-lg text-gray-600">
            When a customer files a dispute — directly with you at support, or
            via their bank as a chargeback — Defense scores the disputing
            identity against the original transaction.
          </p>
        </div>

        <div className="mt-12 space-y-8">
          {/* Engine 01 */}
          <Card tone="light">
            <EyebrowTag tone="light">Engine 01 — Identity Match</EyebrowTag>
            <h3 className="text-h2 text-navy mt-3">
              Did the person who bought it just say they didn&apos;t?
            </h3>
            <p className="mt-4 text-body text-gray-600">
              The Identity Match engine cross-references the disputing
              party&apos;s submitted contact data — name, email, phone,
              address — against the data provided at the time of the original
              transaction, and against a verified identity network. Match
              strength determines how likely it is that the person claiming
              &quot;I didn&apos;t buy this&quot; is the same person who did.
            </p>
            <p className="mt-4 text-body-sm text-gray-500">
              <strong className="text-navy">Score range:</strong> 0–100. 100 =
              all dispute and transaction fields match the same verified
              identity. 0 = no identity match (possible stolen identity,
              synthetic fraud, or thin-file target).
            </p>
          </Card>

          {/* Engine 02 */}
          <Card tone="light">
            <EyebrowTag tone="light">Engine 02 — Identity Risk</EyebrowTag>
            <h3 className="text-h2 text-navy mt-3">
              Is this a trustworthy identity or one with a history?
            </h3>
            <p className="mt-4 text-body text-gray-600">
              The Identity Risk engine evaluates the identity itself,
              independent of the transaction match. It weighs identity age,
              fraud history connections, verified data point volume, activity
              consistency across data streams, and flags for suspicious
              patterns.
            </p>
            <p className="mt-4 text-body-sm text-gray-500">
              <strong className="text-navy">Score range:</strong> 0–100. Higher
              scores indicate a cleaner identity. Lower scores indicate fraud
              history, narrow verified footprint, or inconsistent data.
            </p>
          </Card>

          {/* Engine 03 */}
          <Card tone="light">
            <EyebrowTag tone="light">Engine 03 — Behavioral Risk</EyebrowTag>
            <h3 className="text-h2 text-navy mt-3">
              Does this person behave like a legitimate customer?
            </h3>
            <p className="mt-4 text-body text-gray-600">
              The Behavioral Risk engine analyzes activity patterns over
              time — transaction velocity, payment method stability, IP
              address and location changes, identity element modification
              frequency, chargeback and refund history. Legitimate customers
              show stable, consistent behavior. Fraud actors show sudden
              changes clustered around the disputed transaction.
            </p>
            <p className="mt-4 text-body-sm text-gray-500">
              <strong className="text-navy">Score range:</strong> 0–100. High
              scores indicate stable behavior. Low scores indicate velocity
              spikes, chargeback history, or multiple simultaneous risk
              indicators.
            </p>
          </Card>
        </div>
      </Section>

      {/* 5 — Composite Defense Score (DARK) */}
      <Section tone="dark" spacing="default">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 items-center">
          <div>
            <EyebrowTag>The Composite Defense Score</EyebrowTag>
            <h2 className="text-display mt-3">
              One number. Clear signal. Decide fast.
            </h2>
            <p className="mt-6 text-body-lg text-white/72">
              All three engines feed their scores into the composite Defense
              scoring model, which weights signals based on data completeness
              and cross-signal consistency. The result is a single 0–100 score
              your team — or your automated workflow — can act on without
              interpretation.
            </p>
          </div>
          <div className="flex justify-center">
            <ScoreDial
              score={94}
              subLabel="Likely Friendly Fraud"
              animate={true}
              size="lg"
              label="Defense Score"
            />
          </div>
        </div>

        <div className="mt-12">
          <Table caption="Score band interpretation and recommended action">
            <TableHead>
              <TableRow>
                <TableHeadCell>Defense Score</TableHeadCell>
                <TableHeadCell>Signal</TableHeadCell>
                <TableHeadCell>Recommended Action</TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow className="!border-white/10">
                <TableCell className="!text-white font-semibold">80–100</TableCell>
                <TableCell className="!text-white">
                  <span className="text-score-high font-semibold">Strong friendly fraud indicator</span>
                </TableCell>
                <TableCell className="!text-white/80">
                  Deny refund. Provide identity-match evidence to customer
                  and/or issuing bank. Close account if policy allows.
                </TableCell>
              </TableRow>
              <TableRow className="!border-white/10">
                <TableCell className="!text-white font-semibold">50–79</TableCell>
                <TableCell className="!text-white">
                  <span className="text-score-mid font-semibold">Mixed signals — review warranted</span>
                </TableCell>
                <TableCell className="!text-white/80">
                  Manual review. Request additional customer verification
                  before refund or representment decision.
                </TableCell>
              </TableRow>
              <TableRow className="!border-white/10">
                <TableCell className="!text-white font-semibold">0–49</TableCell>
                <TableCell className="!text-white">
                  <span className="text-score-low font-semibold">Low match / possible true fraud</span>
                </TableCell>
                <TableCell className="!text-white/80">
                  Treat as potential true fraud. Consider refund or escalation
                  to fraud team. Defense billing is weighted toward actionable
                  results — scores in this band contribute minimally to your
                  monthly usage.
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Section>

      {/* 6 — AI Defense Narrative (LIGHT) */}
      <Section tone="light" spacing="default">
        <div className="max-w-3xl">
          <EyebrowTag tone="light">The AI Defense Narrative</EyebrowTag>
          <h2 className="text-display text-navy mt-3">
            Every report comes with a ready-to-use narrative.
          </h2>
          <p className="mt-6 text-body-lg text-gray-600">
            Along with the score, every Defense report includes a plain-English
            narrative summarizing the result. Your agents copy it directly into
            support tickets, customer responses, or bank representment
            packages. No writing required, no interpretation needed.
          </p>
        </div>

        <div className="mt-12 max-w-3xl">
          <Card tone="light">
            <p className="text-eyebrow text-teal uppercase tracking-[0.1em] font-bold">
              Sample AI Defense Narrative
            </p>
            <div className="mt-4 space-y-4 text-body text-gray-600 leading-relaxed font-mono text-body-sm">
              <p>
                The disputing party submitted the name &quot;John Smith&quot;
                and phone &quot;555-123-4567,&quot; both of which match the
                verified identity associated with the original transaction
                dated 2026-02-24. The transaction email
                &quot;johnsmith@gmail.com&quot; and the billing address
                &quot;123 Main St, Anytown, CA 12345&quot; also match this
                identity exactly.
              </p>
              <p>
                Behavioral signals identified include use of 8+ distinct
                payment methods and transactions originating from 5+ locations
                over the past 90 days, both of which are consistent with
                identity churn rather than theft.
              </p>
              <p>
                The composite Defense Score of 94.3 indicates strong evidence
                of friendly fraud. The dispute claim that the cardholder did
                not make the purchase is not supported by the identity data
                submitted.
              </p>
            </div>
          </Card>
        </div>
      </Section>

      {/* 7 — Access Methods (OFF-WHITE) */}
      <Section tone="off-white" spacing="default">
        <div className="max-w-3xl">
          <EyebrowTag tone="light">Access Methods</EyebrowTag>
          <h2 className="text-display text-navy mt-3">
            Three independent subscriptions.
          </h2>
          <p className="mt-6 text-body-lg text-gray-600">
            Kombatix sells access to scoring three ways. Pick the products
            your team actually uses — they&apos;re all billed independently.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <Card tone="light">
            <h3 className="text-h3 text-navy">Defense API</h3>
            <p className="mt-2 text-body-sm text-gray-500">From $75/month</p>
            <p className="mt-3 text-body text-gray-600">
              REST endpoint for engineering integrations. Embed Defense
              scoring in your CRM, helpdesk, or chargeback workflow.
            </p>
            <div className="mt-6">
              <Button href="/api" variant="primary" size="sm">
                Defense API <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Button>
            </div>
          </Card>
          <Card tone="light">
            <h3 className="text-h3 text-navy">PreAuth API</h3>
            <p className="mt-2 text-body-sm text-gray-500">From $49/month</p>
            <p className="mt-3 text-body text-gray-600">
              REST endpoint for pre-authorization screening against the
              Kombatix Network. API-only — not available in the portal.
            </p>
            <div className="mt-6">
              <Button href="/preauth" variant="primary" size="sm">
                PreAuth API <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Button>
            </div>
          </Card>
          <Card tone="light">
            <h3 className="text-h3 text-navy">Web Portal Access</h3>
            <p className="mt-2 text-body-sm text-gray-500">From $35/month</p>
            <p className="mt-3 text-body text-gray-600">
              No-code Defense scoring in your browser. Built for support and
              CX teams without engineering capacity. PDF export, AI insights,
              searchable history.
            </p>
            <div className="mt-6">
              <Button href="/web-portal" variant="primary" size="sm">
                Web Portal <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Button>
            </div>
          </Card>
        </div>
      </Section>

      <CtaBand
        headline="The gap in your stack has a product. Two of them."
        ctaLabel="Sign Up"
        ctaHref={SIGNUP_URL}
      />
    </PageShell>
  );
}
