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

import { breadcrumbSchema, jsonLd } from "@/lib/schema";
import { PartnerInquiryForm } from "./PartnerInquiryForm";

const SIGNUP_URL = "https://app.kombatix.ai/signup";

export const metadata: Metadata = {
  title: "Partnerships — Kombatix for PSPs, Fraud Platforms & Acquirers",
  description:
    "Embed Kombatix scoring into your platform. API integration, white-label licensing, and reseller options for payments partners.",
  alternates: { canonical: "/partners" },
  openGraph: {
    title: "Partnerships — Kombatix for PSPs, Fraud Platforms & Acquirers",
    description:
      "Embed Kombatix scoring into your platform. API integration, white-label licensing, and reseller options for payments partners.",
    url: "https://kombatix.io/partners",
    images: [
      { url: "/og/partners.png", width: 1200, height: 630, alt: "Kombatix Partnerships" },
    ],
  },
};

export default function PartnersPage() {
  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Kombatix Partnerships",
          url: "https://kombatix.io/partners",
          about: {
            "@type": "Organization",
            name: "Kombatix",
          },
        })}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Partners", url: "/partners" },
          ]),
        )}
      />

      {/* 1 — Hero */}
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-container px-6 md:px-8 lg:px-12 py-20 md:py-28">
          <div className="max-w-3xl">
            <EyebrowTag>
              For Payment Processors · Fraud Platforms · Acquirers · Chargeback Platforms
            </EyebrowTag>
            <h1 className="text-hero mt-3">
              Embed identity scoring across your platform — and grow the
              network with every transaction.
            </h1>
            <p className="mt-6 text-body-lg text-white/72">
              Kombatix is API-first and built for scale. Embed Defense scoring
              into your dispute workflows or PreAuth screening into your
              authorization flow, and your merchants automatically contribute
              to and benefit from the Kombatix Network — the shared identity
              graph of confirmed friendly fraudsters, growing every day.
            </p>
            <div className="mt-10">
              <Button href="#partner-inquiry" variant="primary" size="lg">
                Contact Partnership Team <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 2 — Network Advantage (LIGHT) */}
      <Section tone="light" spacing="default">
        <div className="max-w-3xl">
          <EyebrowTag tone="light">The Network Advantage for Partners</EyebrowTag>
          <h2 className="text-display text-navy mt-3">
            Every Kombatix partnership makes the network stronger.
          </h2>
          <p className="mt-6 text-body-lg text-gray-600">
            When a Kombatix-integrated platform screens transactions through
            PreAuth, it benefits from the cumulative scoring activity of every
            Defense customer. When that platform&apos;s customers use Defense
            to fight disputes, the confirmed friendly-fraud identities flow
            back into the network for every PreAuth customer to screen
            against.
          </p>
        </div>

        <div className="mt-12 rounded-xl bg-navy text-white p-8 md:p-12">
          <EyebrowTag>Flywheel, not feature.</EyebrowTag>
          <p className="mt-3 text-h2">
            Most fraud data sources are static. The Kombatix Network compounds.
          </p>
          <p className="mt-4 text-body-lg text-white/72">
            Every new Defense customer adds data; every new PreAuth customer
            adds screening volume. The value to any individual partner grows
            with every other partner — and every merchant — in the network.
          </p>
        </div>
      </Section>

      {/* 3 — Who We Partner With (OFF-WHITE) */}
      <Section tone="off-white" spacing="default">
        <div className="max-w-3xl">
          <EyebrowTag tone="light">Who We Partner With</EyebrowTag>
          <h2 className="text-display text-navy mt-3">
            Three partner archetypes.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card tone="light">
            <h3 className="text-h2 text-navy">Fraud & Chargeback Platforms</h3>
            <p className="mt-4 text-body text-gray-600">
              Add Kombatix Defense as a complementary scoring layer inside
              your existing dispute workflow. Or surface PreAuth screening at
              order review. Kombatix sits between your upstream prevention
              and downstream resolution products — expanding coverage and
              customer ROI.
            </p>
          </Card>
          <Card tone="light">
            <h3 className="text-h2 text-navy">Payment Processors & Acquirers</h3>
            <p className="mt-4 text-body text-gray-600">
              Embed PreAuth scoring into authorization decisioning to reduce
              chargeback ratios across your merchant portfolio. Better network
              standing, lower monitoring program exposure, and stronger
              merchant retention through reduced fraud friction.
            </p>
          </Card>
          <Card tone="light">
            <h3 className="text-h2 text-navy">Custom Integration Partners</h3>
            <p className="mt-4 text-body text-gray-600">
              Building in the fraud, identity, or payments space? Kombatix
              scoring embeds via API into custom workflows, white-label
              solutions, and proprietary platforms. Data dictionary access
              and custom integration options available.
            </p>
          </Card>
        </div>
      </Section>

      {/* 4 — Integration Options (LIGHT) */}
      <Section tone="light" spacing="default">
        <div className="max-w-3xl">
          <EyebrowTag tone="light">Integration Options</EyebrowTag>
          <h2 className="text-display text-navy mt-3">
            Four paths to integration.
          </h2>
        </div>

        <div className="mt-12">
          <Table caption="Kombatix partnership integration options">
            <TableHead>
              <TableRow>
                <TableHeadCell>Option</TableHeadCell>
                <TableHeadCell>What It Looks Like</TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell className="font-semibold">API Integration</TableCell>
                <TableCell>
                  Your platform calls Kombatix PreAuth or Defense endpoints
                  directly. Standard REST, JSON, fast response.
                  Lowest-friction integration.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">White-Label Data Licensing</TableCell>
                <TableCell>
                  Kombatix scoring surfaced under your brand inside your
                  product UI. Custom API keys, custom response formatting,
                  your domain.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Co-Branded Network Integration</TableCell>
                <TableCell>
                  Your merchants benefit from a co-branded &quot;Powered by
                  Kombatix&quot; experience. Joint marketing, shared case
                  studies, preferred pricing.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Reseller Program</TableCell>
                <TableCell>
                  Resell Kombatix to your merchant base with volume discounts
                  and revenue share. Your sales team, our product.
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Section>

      {/* 5 — Partnership Inquiry Form (OFF-WHITE) */}
      <Section tone="off-white" spacing="default" id="partner-inquiry">
        <div className="max-w-3xl">
          <EyebrowTag tone="light">Partnership Inquiry</EyebrowTag>
          <h2 className="text-display text-navy mt-3">Let&apos;s talk.</h2>
          <p className="mt-6 text-body-lg text-gray-600">
            Tell us who you are and how you&apos;re thinking about integrating.
            A Kombatix partnerships specialist will respond within one
            business day.
          </p>
        </div>

        <div className="mt-12 max-w-3xl">
          <PartnerInquiryForm />
        </div>

        <div className="mt-8 max-w-3xl">
          <p className="text-body text-gray-600">
            Prefer email? Reach us directly at{" "}
            <a
              href="mailto:operations@kombatix.io"
              className="text-accent font-semibold hover:underline"
            >
              operations@kombatix.io
            </a>{" "}
            — we respond within one business day. Partnership deck available
            on request.
          </p>
        </div>
      </Section>

      <CtaBand
        headline="Every partner grows the network."
        ctaLabel="Start Exploring"
        ctaHref={SIGNUP_URL}
      />
    </PageShell>
  );
}
