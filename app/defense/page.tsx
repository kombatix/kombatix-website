import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

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

import {
  softwareApplicationSchema,
  breadcrumbSchema,
  jsonLd,
} from "@/lib/schema";

const SIGNUP_URL = "https://app.kombatix.ai/signup";

export const metadata: Metadata = {
  title: "Kombatix Defense — Friendly Fraud Dispute Scoring",
  description:
    "Score dispute identity against the original transaction in milliseconds. Deflect refund abuse and win chargeback representments.",
  alternates: { canonical: "/defense" },
  openGraph: {
    title: "Kombatix Defense — Friendly Fraud Dispute Scoring",
    description:
      "Score dispute identity against the original transaction in milliseconds. Deflect refund abuse and win chargeback representments.",
    url: "https://kombatix.io/defense",
  },
};

export default function DefensePage() {
  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          softwareApplicationSchema({
            name: "Kombatix Defense",
            description:
              "Real-time composite identity scoring for dispute defense. Three scoring engines, AI narrative, REST API.",
            url: "https://kombatix.io/defense",
            priceMin: 75,
            priceMax: 500,
          }),
        )}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Defense", url: "/defense" },
          ]),
        )}
      />

      {/* 1 — Hero */}
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-container px-6 md:px-8 lg:px-12 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 items-center">
            <div>
              <EyebrowTag>
                Dispute Defense · Identity Scoring in Milliseconds
              </EyebrowTag>
              <h1 className="text-hero mt-3">
                Stop refunding money you don&apos;t owe.
              </h1>
              <p className="mt-6 text-body-lg text-white/72">
                Kombatix Defense scores the identity of anyone disputing a
                charge — against the original transaction and a verified
                identity network — in under a second. Three engines, one
                composite score, one clear answer. Use it at first contact to
                deflect refund abuse, or at chargeback time to strengthen your
                representment package.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button href={SIGNUP_URL} variant="primary" size="lg">
                  Start Defending <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </Button>
                <Button href="/how-it-works" variant="ghost-dark" size="lg">
                  See How It Works
                </Button>
              </div>
            </div>

            {/* CMP-02 placeholder — sample Defense Report card */}
            <div className="rounded-xl bg-navy-light border border-white/10 p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-eyebrow text-teal uppercase tracking-[0.1em] font-bold">
                    Defense Report
                  </p>
                  <p className="mt-1 text-body-sm text-white/60">
                    Request ID fd8c7a53 · 2026-04-22
                  </p>
                </div>
              </div>
              <div className="mt-6 flex justify-center">
                <ScoreDial
                  score={94}
                  subLabel="Likely Friendly Fraud"
                  animate={false}
                  size="md"
                  label="Defense Score"
                />
              </div>
              <div className="mt-6 space-y-2 text-body-sm">
                <div className="flex items-center justify-between border-t border-white/10 pt-2">
                  <span className="text-white/60">Identity Match</span>
                  <span className="font-semibold text-score-high">100.0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Identity Risk</span>
                  <span className="font-semibold text-score-mid">40.5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Behavioral Risk</span>
                  <span className="font-semibold text-score-high">90.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2 — When You Use It (LIGHT) */}
      <Section tone="light" spacing="default">
        <div className="max-w-3xl">
          <EyebrowTag tone="light">When You Use It</EyebrowTag>
          <h2 className="text-display text-navy mt-3">
            Defense fits into two points in the merchant dispute workflow.
          </h2>
          <p className="mt-6 text-body-lg text-gray-600">
            Most customers use both.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card tone="light">
            <EyebrowTag tone="light">Use Case 1</EyebrowTag>
            <h3 className="text-h2 text-navy mt-3">At First Contact</h3>
            <p className="mt-4 text-body text-gray-600">
              When a customer calls, emails, or submits a ticket claiming
              fraud, your support agent runs them through Defense. If the score
              shows friendly fraud, the agent follows a pre-written script: the
              identity was verified against the original purchase, the account
              will be closed, no refund will be issued, and the report will
              accompany any bank dispute.
            </p>
            <p className="mt-4 text-body text-navy font-semibold">
              Outcome: Most friendly fraudsters back down once they know
              they&apos;ve been caught.
            </p>
          </Card>

          <Card tone="light">
            <EyebrowTag tone="light">Use Case 2</EyebrowTag>
            <h3 className="text-h2 text-navy mt-3">
              At Chargeback Representment
            </h3>
            <p className="mt-4 text-body text-gray-600">
              When a fraud-coded chargeback lands, you attach the Kombatix
              Defense Report to your representment package. The bank sees
              timestamped identity evidence — disputing party&apos;s name,
              email, phone, and address all matching the original transaction —
              and a clear defense narrative they can act on.
            </p>
            <p className="mt-4 text-body text-navy font-semibold">
              Outcome: Fraud-coded chargebacks that used to be write-offs
              become winnable cases.
            </p>
          </Card>
        </div>
      </Section>

      {/* 3 — The Three Scoring Engines (OFF-WHITE) */}
      <Section tone="off-white" spacing="default">
        <div className="max-w-3xl">
          <EyebrowTag tone="light">The Three Scoring Engines</EyebrowTag>
          <h2 className="text-display text-navy mt-3">
            One composite score from three independent engines.
          </h2>
          <p className="mt-6 text-body-lg text-gray-600">
            Defense runs three independent scoring engines in parallel and
            combines them into a single composite score. Each engine tells you
            something different; the composite tells you what to do.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8">
          <Card tone="light">
            <EyebrowTag tone="light">Engine 01 — Identity Match</EyebrowTag>
            <h3 className="text-h2 text-navy mt-3">
              Did the same person who bought it just claim they didn&apos;t?
            </h3>
            <p className="mt-4 text-body text-gray-600">
              Cross-references the disputing party&apos;s name, email, phone,
              and address against the data submitted at the time of the
              original transaction, and against a verified identity network.
            </p>
          </Card>

          <Card tone="light">
            <EyebrowTag tone="light">Engine 02 — Identity Risk</EyebrowTag>
            <h3 className="text-h2 text-navy mt-3">
              Is this a trustworthy identity or one with a history?
            </h3>
            <p className="mt-4 text-body text-gray-600">
              Evaluates the identity itself — separate from whether it matches
              the transaction. Looks at identity age, fraud history
              connections, verified data point volume, and consistency across
              data streams. An identity can match the transaction perfectly and
              still carry fraud history; this engine surfaces that.
            </p>
          </Card>

          <Card tone="light">
            <EyebrowTag tone="light">Engine 03 — Behavioral Risk</EyebrowTag>
            <h3 className="text-h2 text-navy mt-3">
              Does this person behave like a legitimate customer?
            </h3>
            <p className="mt-4 text-body text-gray-600">
              Analyzes activity patterns — transaction velocity, payment method
              stability, IP and location changes, identity element
              modifications, and chargeback history. A legitimate customer
              looks stable. A fraud actor shows sudden changes around the
              disputed transaction.
            </p>
          </Card>
        </div>
      </Section>

      {/* 4 — What You Get (LIGHT) */}
      <Section tone="light" spacing="default">
        <div className="max-w-3xl">
          <EyebrowTag tone="light">What You Get</EyebrowTag>
          <h2 className="text-display text-navy mt-3">
            Every Defense search returns a structured report your agents can
            act on immediately.
          </h2>
        </div>

        <div className="mt-12">
          <Table caption="Components included in every Defense report">
            <TableHead>
              <TableRow>
                <TableHeadCell>Component</TableHeadCell>
                <TableHeadCell>What It&apos;s For</TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell className="font-semibold">Composite Score (0–100)</TableCell>
                <TableCell>
                  One number your team can route on. Above 80 = confident
                  friendly fraud. Below 50 = possible true fraud. In between =
                  review warranted.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Sub-scores</TableCell>
                <TableCell>
                  Identity Match, Identity Risk, Behavioral Risk — individually
                  scored. Shows why the composite landed where it did.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Reason Codes</TableCell>
                <TableCell>
                  Specific flags — &quot;Multiple payment methods (8)&quot;,
                  &quot;Transactions from different locations (5)&quot;, etc.
                  Explainability for agents and for bank evidence.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Identity Match Breakdown</TableCell>
                <TableCell>
                  Field-level match view — name, email, phone, billing,
                  shipping — green check or red X per field. Instantly
                  readable.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">AI Defense Narrative</TableCell>
                <TableCell>
                  Plain-English summary of the result, template-generated from
                  the data. Agents copy-paste into support tickets or bank
                  evidence packages. No writing required.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Transaction Metadata</TableCell>
                <TableCell>
                  Payment card type, transaction date, transaction amount,
                  first-seen / last-seen dates for the identity. Context for
                  the score.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Request ID + Timestamp</TableCell>
                <TableCell>
                  Every report timestamped and uniquely identified —
                  admissible as structured evidence in bank dispute workflows.
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Section>

      {/* 5 — How You Access It (OFF-WHITE) */}
      <Section tone="off-white" spacing="default">
        <div className="max-w-3xl">
          <EyebrowTag tone="light">How You Access It</EyebrowTag>
          <h2 className="text-display text-navy mt-3">
            REST API or no-code Web App.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card tone="light">
            <h3 className="text-h2 text-navy">REST API</h3>
            <p className="mt-4 text-body text-gray-600">
              Full Defense scoring via a single POST endpoint. Integrate into
              your helpdesk (Zendesk, Intercom, Gorgias), CRM, or chargeback
              workflow. API key and documentation delivered within 4 business
              hours of signup. Self-service developer portal available
              immediately.
            </p>
            <div className="mt-6">
              <Link
                href="/api"
                className="text-accent font-semibold inline-flex items-center gap-1 hover:underline"
              >
                See API details <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </Card>
          <Card tone="light">
            <h3 className="text-h2 text-navy">Web Application</h3>
            <p className="mt-4 text-body text-gray-600">
              No-code access via browser. Agents log into the Kombatix portal,
              paste dispute details, run a Defense Search, copy the result
              directly into their ticket or evidence package. No developer time
              required to get value on day one.
            </p>
            <div className="mt-6">
              <Link
                href={SIGNUP_URL}
                className="text-accent font-semibold inline-flex items-center gap-1 hover:underline"
              >
                Sign Up <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </Card>
        </div>
      </Section>

      {/* 6 — Pricing preview (LIGHT) */}
      <Section tone="light" spacing="default">
        <div className="max-w-3xl">
          <EyebrowTag tone="light">Defense Pricing</EyebrowTag>
          <h2 className="text-display text-navy mt-3">
            From $75/month. Billed for actionable results.
          </h2>
          <p className="mt-6 text-body-lg text-gray-600">
            Standard starts at $75/month with 75 hits included. Advanced
            $500/month includes 1,000 hits. Enterprise plans are custom. Defense
            billing is weighted toward high-confidence friendly-fraud results —
            you&apos;re charged for scores that move the needle, not for ones
            that don&apos;t.
          </p>
          <div className="mt-8">
            <Button href="/pricing#defense" variant="primary">
              View Full Defense Pricing{" "}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </Section>

      <CtaBand
        headline="Your next friendly-fraud dispute is already in the queue. Be ready."
        ctaLabel="Start Defense"
        ctaHref={SIGNUP_URL}
      />
    </PageShell>
  );
}
