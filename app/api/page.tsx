import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/layout/CtaBand";

import { Button } from "@/components/ui/Button";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { Card } from "@/components/ui/Card";
import { CodeBlock } from "@/components/ui/CodeBlock";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "@/components/ui/Table";

import { breadcrumbSchema, jsonLd } from "@/lib/schema";
import { TrackPageView } from "@/components/analytics/TrackPageView";

const SIGNUP_URL = "https://app.kombatix.ai/signup";

export const metadata: Metadata = {
  title: "Kombatix API — REST Identity Scoring for Developers",
  description:
    "Score identity in a single POST. JSON in, JSON out, sub-second response. API keys delivered within 4 business hours.",
  alternates: { canonical: "/api" },
  openGraph: {
    title: "Kombatix API — REST Identity Scoring for Developers",
    description:
      "Score identity in a single POST. JSON in, JSON out, sub-second response. API keys delivered within 4 business hours.",
    url: "https://kombatix.io/api",
  },
};

// Sample request — verbatim from architecture doc §3 Page 7.
// Do not substitute real-looking placeholder data beyond what the doc specifies.
const SAMPLE_REQUEST = `POST /v1/defense HTTP/1.1
Host: api.kombatix.io
Content-Type: application/json
Authorization: Bearer <your_api_key>

{
  "operation": "defense",
  "disputeName": "John Smith",
  "disputeEmail": "",
  "disputePhone": "5551234567",
  "disputeBillingAddress": {
    "street1": "", "city": "", "state": "", "zip": "", "country": ""
  },
  "transactionName": "",
  "transactionEmail": "johnsmith@gmail.com",
  "transactionPhone": "",
  "transactionBillingAddress": {
    "street1": "123 Main St", "city": "Anytown",
    "state": "CA", "zip": "12345", "country": "US"
  },
  "transactionShippingAddress": {
    "street1": "", "city": "", "state": "", "zip": "", "country": ""
  },
  "paymentCardType": "Visa",
  "transactionDate": "2026-04-22",
  "transactionAmount": "24.99",
  "deviceIds": [""],
  "payments": [
    { "type": "CARD", "token": "" }
  ]
}`;

const SAMPLE_RESPONSE = `HTTP/1.1 200 OK
Content-Type: application/json

{
  "requestID": "fd8c7a53-b9e6-42f1-a8e5-e8d3f69c1234",
  "identitySource": {
    "disputeName": {
      "identity": "Identity 1",
      "validated": true,
      "standardized": "JOHN DOE"
    },
    "confirmedSource": "Identity 1 (Dispute Name is Identity 1)"
  },
  "disputeInputValidation": {
    "name":            { "matchStatus": "Matches Identity 1" },
    "phone":           { "matchStatus": "Matches Identity 1" },
    "email":           { "matchStatus": "Matches Identity 1" },
    "billingAddress":  { "matchStatus": "Matches Identity 1" }
  },
  "transactionInputValidation": {
    "email":           { "matchStatus": "Matches Identity 1" },
    "billingAddress":  { "matchStatus": "Matches Identity 1" },
    "shippingAddress": { "matchStatus": "Matches Identity 1" }
  },
  "identityConsistencySummary": {
    "disputeNameMatches": true,
    "disputeEmailMatches": true,
    "disputeBillingAddressMatches": true,
    "transactionEmailMatches": true,
    "transactionBillingMatches": true
  },
  "dateFirstSeen": "03-15-2018",
  "dateLastSeen":  "02-25-2025",
  "kombatixDefenseScore": {
    "Defense Score": "95.44",
    "Risk Category": "High Dispute Risk - Likely Friendly Fraud",
    "Sub-Scores": {
      "Identity Match Score":   "100.00",
      "Identity Risk Score":    "1.05",
      "Behavioral Risk Score":  "30.00"
    },
    "Reason Codes": {
      "Behavioral Risk": [
        "Multiple payment methods used (8).",
        "Transactions from different locations (5)."
      ]
    },
    "Match Insights": {
      "insight": "Transaction likely valid."
    }
  },
  "transactionDetails": {
    "paymentCardType":  "Visa",
    "transactionDate":  "02-24-2025",
    "transactionAmount": "125.50"
  }
}`;

export default function ApiPage() {
  return (
    <PageShell>
      <TrackPageView event="api_page_view" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "API", url: "/api" },
          ]),
        )}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd({
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: "Kombatix API — Identity Scoring REST Endpoints",
          author: { "@type": "Organization", name: "Kombatix" },
          url: "https://kombatix.io/api",
          description:
            "Defense and PreAuth REST endpoints for identity scoring against dispute context and the Kombatix Network.",
        })}
      />

      {/* 1 — Hero */}
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-container px-6 md:px-8 lg:px-12 py-20 md:py-28">
          <div className="max-w-3xl">
            <EyebrowTag>Developer Landing</EyebrowTag>
            <h1 className="text-hero mt-3">Score identity in a single POST.</h1>
            <p className="mt-6 text-body-lg text-white/72">
              Kombatix is REST-first. JSON in, JSON out, sub-second response.
              API keys and full developer documentation delivered within 4
              business hours of signup — the self-service portal is live now.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button href={SIGNUP_URL} variant="primary" size="lg">
                Sign Up for API Access <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Button>
              <Button href="/pricing" variant="ghost-dark" size="lg">
                View Pricing
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 2 — Endpoint summary (DARK continuation) */}
      <section className="bg-navy text-white border-t border-white/10">
        <div className="mx-auto max-w-container px-6 md:px-8 lg:px-12 py-16 md:py-20">
          <EyebrowTag>What you can do with the API</EyebrowTag>
          <div className="mt-6">
            <Table caption="Kombatix API endpoint summary">
              <TableHead>
                <TableRow>
                  <TableHeadCell>Endpoint</TableHeadCell>
                  <TableHeadCell>Purpose</TableHeadCell>
                  <TableHeadCell>Response Time</TableHeadCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow className="!border-white/10">
                  <TableCell className="!text-white font-mono">POST /v1/defense</TableCell>
                  <TableCell className="!text-white/80">
                    Score a dispute: three engines + composite 0–100 score +
                    AI narrative + reason codes + identity match breakdown.
                  </TableCell>
                  <TableCell className="!text-white">&lt; 1 second</TableCell>
                </TableRow>
                <TableRow className="!border-white/10">
                  <TableCell className="!text-white font-mono">POST /v1/preauth</TableCell>
                  <TableCell className="!text-white/80">
                    Screen a transaction&apos;s identity against the Kombatix
                    Network. Hit/no-hit response with severity on hits.
                  </TableCell>
                  <TableCell className="!text-white">&lt; 200ms</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </section>

      {/* 3 — Sample Defense Request (DARK) */}
      <Section tone="navy-light" spacing="default">
        <div className="max-w-3xl">
          <EyebrowTag>Sample Defense Request</EyebrowTag>
          <h2 className="text-display mt-3 text-white">POST /v1/defense</h2>
          <p className="mt-6 text-body-lg text-white/72">
            The Defense endpoint takes dispute context plus original
            transaction context and returns a composite score. The example
            below shows the operation, dispute-side fields, transaction-side
            fields, and metadata inputs.
          </p>
        </div>
        <div className="mt-8">
          <CodeBlock language="http" copyText={SAMPLE_REQUEST}>
            {SAMPLE_REQUEST}
          </CodeBlock>
        </div>
      </Section>

      {/* 4 — Sample Defense Response (DARK continuation) */}
      <Section tone="navy-light" spacing="default">
        <div className="max-w-3xl">
          <EyebrowTag>Sample Defense Response</EyebrowTag>
          <h2 className="text-display mt-3 text-white">200 OK</h2>
          <p className="mt-6 text-body-lg text-white/72">
            The response returns the validated and standardized identity
            inputs, field-by-field match status, the full composite score with
            sub-scores, and any triggered reason codes.
          </p>
        </div>
        <div className="mt-8">
          <CodeBlock language="http" copyText={SAMPLE_RESPONSE}>
            {SAMPLE_RESPONSE}
          </CodeBlock>
        </div>
      </Section>

      {/* 5 — Response Field Reference (LIGHT) */}
      <Section tone="light" spacing="default">
        <div className="max-w-3xl">
          <EyebrowTag tone="light">Response Field Reference</EyebrowTag>
          <h2 className="text-display text-navy mt-3">
            What each response field means.
          </h2>
        </div>

        <div className="mt-12">
          <Table caption="Defense response field reference">
            <TableHead>
              <TableRow>
                <TableHeadCell>Field</TableHeadCell>
                <TableHeadCell>Type</TableHeadCell>
                <TableHeadCell>Notes</TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell className="font-mono font-semibold">requestID</TableCell>
                <TableCell>UUID</TableCell>
                <TableCell>Every request uniquely identified. Persist this for audit trails and bank evidence.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono font-semibold">identitySource</TableCell>
                <TableCell>object</TableCell>
                <TableCell>Which submitted field Kombatix used as the canonical identity reference.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono font-semibold">disputeInputValidation</TableCell>
                <TableCell>object</TableCell>
                <TableCell>Per-field validation + standardization + match status for the dispute-side inputs.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono font-semibold">transactionInputValidation</TableCell>
                <TableCell>object</TableCell>
                <TableCell>Per-field validation + standardization + match status for the transaction-side inputs.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono font-semibold">identityConsistencySummary</TableCell>
                <TableCell>object</TableCell>
                <TableCell>Boolean flags — does each submitted field match the canonical identity?</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono font-semibold">dateFirstSeen / dateLastSeen</TableCell>
                <TableCell>date string</TableCell>
                <TableCell>When the identity was first and last observed in our verified data network.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono font-semibold">kombatixDefenseScore</TableCell>
                <TableCell>object</TableCell>
                <TableCell>The composite score, risk category, sub-scores, reason codes, and match insights.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono font-semibold">transactionDetails</TableCell>
                <TableCell>object</TableCell>
                <TableCell>Echoed transaction metadata for audit.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Section>

      {/* 6 — PreAuth endpoint + Authentication + Rate Limits (OFF-WHITE) */}
      <Section tone="off-white" spacing="default">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card tone="light">
            <h3 className="text-h2 text-navy">PreAuth Endpoint</h3>
            <p className="mt-4 text-body text-gray-600">
              PreAuth takes a subset of the Defense fields — identity without
              the dispute/transaction split — and returns a hit/no-hit
              response. Full request/response reference available in the
              developer portal after signup.
            </p>
          </Card>
          <Card tone="light">
            <h3 className="text-h2 text-navy">Authentication</h3>
            <p className="mt-4 text-body text-gray-600 font-mono">
              Authorization: Bearer &lt;your_api_key&gt;
            </p>
            <p className="mt-2 text-body text-gray-600">
              Bearer token (API key). Include in every request.
            </p>
          </Card>
          <Card tone="light">
            <h3 className="text-h2 text-navy">Environments</h3>
            <p className="mt-4 text-body text-gray-600">
              Sandbox environment available for integration testing. Sandbox
              calls do not count against your monthly allocation and do not
              contribute to the Kombatix Network.
            </p>
          </Card>
          <Card tone="light">
            <h3 className="text-h2 text-navy">Rate Limits</h3>
            <p className="mt-4 text-body text-gray-600">
              Per-plan rate limits apply. Enterprise plans have custom rate
              limits. Full schedule in developer portal.
            </p>
          </Card>
        </div>
      </Section>

      {/* 7 — Full Documentation CTA + Web Portal alternative (LIGHT) */}
      <Section tone="light" spacing="default">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card tone="light">
            <h3 className="text-h2 text-navy">Full developer documentation is behind login.</h3>
            <p className="mt-4 text-body text-gray-600">
              Complete endpoint documentation, error codes, response schemas,
              SDKs, and integration guides are inside the developer portal.
              Sign up to access — API keys and docs delivered within 4
              business hours.
            </p>
            <div className="mt-6">
              <Button href={SIGNUP_URL} variant="primary">
                Sign Up <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Button>
            </div>
          </Card>
          <Card tone="light">
            <h3 className="text-h2 text-navy">No engineering capacity? Use the Web Portal.</h3>
            <p className="mt-4 text-body text-gray-600">
              Web Portal Access is the no-code path to Defense scoring —
              browser-only, no integration required. Same scoring engine,
              full reports with AI insights, PDF export, searchable history.
              Subscribe separately from the API.
            </p>
            <div className="mt-6">
              <Button href="/web-portal" variant="ghost-light">
                See Web Portal <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Button>
            </div>
          </Card>
        </div>
      </Section>

      <CtaBand
        headline="From signup to first scored request in 4 business hours."
        ctaLabel="Sign Up"
        ctaHref={SIGNUP_URL}
      />
    </PageShell>
  );
}
