"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { PricingCard } from "@/components/ui/PricingCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TableCheck,
  TableDash,
} from "@/components/ui/Table";

const SIGNUP_URL = "https://app.kombatix.ai/signup";

type Product = "defense" | "preauth" | "web-portal";

const TABS: Array<{ id: Product; label: string; sublabel: string }> = [
  { id: "defense",    label: "Defense",            sublabel: "API · from $75/mo" },
  { id: "preauth",    label: "PreAuth",            sublabel: "API · from $49/mo" },
  { id: "web-portal", label: "Web Portal Access",  sublabel: "No-code · from $35/mo" },
];

function isProduct(s: string): s is Product {
  return s === "defense" || s === "preauth" || s === "web-portal";
}

export function PricingToggle() {
  // Derive default tab from URL hash on mount; fall back to "defense".
  const [tab, setTab] = useState<Product>("defense");

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (isProduct(hash)) setTab(hash);
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  function handleTabClick(next: Product) {
    setTab(next);
    // update hash for deep-linking without scroll
    history.replaceState(null, "", `#${next}`);
  }

  return (
    <div>
      {/* Toggle — 3 tabs, wraps gracefully on narrow viewports */}
      <div
        role="tablist"
        aria-label="Product pricing"
        className="inline-flex flex-wrap gap-1 rounded-xl border border-gray-200 bg-white p-1"
      >
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            aria-controls={`${t.id}-panel`}
            id={`${t.id}-tab`}
            onClick={() => handleTabClick(t.id)}
            className={cn(
              "px-5 py-2.5 rounded-lg text-body font-semibold transition-colors text-left",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
              tab === t.id ? "bg-accent text-white" : "text-navy hover:bg-gray-50",
            )}
          >
            <span className="block leading-tight">Kombatix {t.label}</span>
            <span
              className={cn(
                "block text-body-sm font-normal mt-0.5",
                tab === t.id ? "text-white/80" : "text-gray-500",
              )}
            >
              {t.sublabel}
            </span>
          </button>
        ))}
      </div>

      {/* Defense panel */}
      <div
        id="defense-panel"
        role="tabpanel"
        aria-labelledby="defense-tab"
        hidden={tab !== "defense"}
        className="mt-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
          <PricingCard
            planName="Standard"
            price="75"
            intro="Up to 75 Defense hits/month"
            features={[
              "Full three-engine scoring",
              "$0.60 per additional hit",
              "API key in 4 business hours",
              "Self-service portal access",
            ]}
            ctaLabel="Get Started"
            ctaHref={SIGNUP_URL}
          />
          <PricingCard
            planName="Advanced"
            price="500"
            intro="Up to 1,000 Defense hits/month"
            features={[
              "Full three-engine scoring",
              "$0.40 per additional hit",
              "API key in 4 business hours",
              "Self-service portal access",
            ]}
            ctaLabel="Get Started"
            ctaHref={SIGNUP_URL}
            recommended
          />
          <PricingCard
            planName="Enterprise"
            price="Custom"
            intro="50,000+ calls/month"
            features={[
              "Custom data dictionary options",
              "Dedicated product specialist",
              "SLA & priority support",
              "Enterprise contract + invoicing",
            ]}
            ctaLabel="Contact Us"
            ctaHref="mailto:operations@kombatix.io?subject=Defense%20Enterprise%20Pricing"
          />
        </div>

        <div className="mt-12 rounded-xl bg-off-white border border-gray-200 p-8 md:p-12">
          <h3 className="text-h2 text-navy">Pay for actionable results.</h3>
          <p className="mt-4 text-body-lg text-gray-600 max-w-3xl">
            Defense billing is weighted toward high-confidence results.
            Scores in the friendly-fraud band (60+) — the outputs your team
            can act on — count against your monthly hit allocation. Scores
            below that range contribute minimally, so you&apos;re paying for
            the results that move the needle, not for ones that don&apos;t.
            Full rate schedule shared during onboarding.
          </p>
        </div>

        <div className="mt-12">
          <h3 className="text-h2 text-navy">Defense feature comparison</h3>
          <div className="mt-6">
            <Table caption="Features included in each Defense plan">
              <TableHead>
                <TableRow>
                  <TableHeadCell>Feature</TableHeadCell>
                  <TableHeadCell>Standard</TableHeadCell>
                  <TableHeadCell>Advanced</TableHeadCell>
                  <TableHeadCell>Enterprise</TableHeadCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  "Identity Match Scoring",
                  "Identity Risk Scoring",
                  "Behavioral Risk Scoring",
                  "Composite Defense Score",
                  "AI Defense Narrative",
                  "Self-Service Web Portal",
                  "REST API Access",
                ].map((feat) => (
                  <TableRow key={feat}>
                    <TableCell className="font-semibold">{feat}</TableCell>
                    <TableCell><TableCheck /></TableCell>
                    <TableCell><TableCheck /></TableCell>
                    <TableCell><TableCheck /></TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell className="font-semibold">Included Hits / Month</TableCell>
                  <TableCell>75</TableCell>
                  <TableCell>1,000</TableCell>
                  <TableCell>Custom</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold">Per Additional Hit</TableCell>
                  <TableCell>$0.60</TableCell>
                  <TableCell>$0.40</TableCell>
                  <TableCell>Volume rate</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold">Custom Data Dictionary</TableCell>
                  <TableCell><TableDash /></TableCell>
                  <TableCell><TableDash /></TableCell>
                  <TableCell><TableCheck /></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold">Dedicated Product Specialist</TableCell>
                  <TableCell><TableDash /></TableCell>
                  <TableCell><TableDash /></TableCell>
                  <TableCell><TableCheck /></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold">SLA & Priority Support</TableCell>
                  <TableCell><TableDash /></TableCell>
                  <TableCell><TableDash /></TableCell>
                  <TableCell><TableCheck /></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* PreAuth panel */}
      <div
        id="preauth-panel"
        role="tabpanel"
        aria-labelledby="preauth-tab"
        hidden={tab !== "preauth"}
        className="mt-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
          <PricingCard
            planName="PreAuth Starter"
            price="49"
            intro="Up to ~25K transactions/month"
            features={[
              "No-hit: $0.005 each",
              "Hits: $0.15 each",
              "$49 monthly credit",
              "API key + documentation access",
            ]}
            ctaLabel="Select Plan"
            ctaHref={SIGNUP_URL}
          />
          <PricingCard
            planName="PreAuth Growth"
            price="149"
            intro="25K–100K transactions/month"
            features={[
              "No-hit: $0.005 each",
              "Hits: $0.10 each",
              "$149 monthly credit",
              "Priority support",
            ]}
            ctaLabel="Select Plan"
            ctaHref={SIGNUP_URL}
            recommended
          />
          <PricingCard
            planName="PreAuth Enterprise"
            price="499"
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

        <div className="mt-8 rounded-xl bg-off-white border border-gray-200 p-6">
          <p className="text-body text-gray-600">
            One-time $250 implementation fee applies to all PreAuth plans at
            onboarding.
          </p>
        </div>
      </div>

      {/* Web Portal panel */}
      <div
        id="web-portal-panel"
        role="tabpanel"
        aria-labelledby="web-portal-tab"
        hidden={tab !== "web-portal"}
        className="mt-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
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
            ]}
            ctaLabel="Contact Sales"
            ctaHref="mailto:operations@kombatix.io?subject=Web%20Portal%20Enterprise%20Inquiry"
          />
        </div>

        <div className="mt-12 rounded-xl bg-off-white border border-gray-200 p-8 md:p-12">
          <h3 className="text-h2 text-navy">
            Web Portal Access is separate from the Defense API.
          </h3>
          <p className="mt-4 text-body-lg text-gray-600 max-w-3xl">
            Web Portal subscriptions are billed independently of Defense API
            subscriptions. Most teams pick one based on how their staff
            works — support and CX teams often start with the portal; teams
            with engineering capacity start with the API. Some run both
            side-by-side.
          </p>
          <div className="mt-6">
            <a
              href="/web-portal"
              className="text-accent font-semibold inline-flex items-center gap-1 hover:underline"
            >
              Learn more about Web Portal Access →
            </a>
          </div>
        </div>

        <p className="mt-8 text-body-sm text-gray-500 max-w-3xl">
          &quot;Reports&quot; on Web Portal are equivalent to &quot;hits&quot;
          on the API — one Defense Search returns one report. We bill for
          searches that return a Defense Score of 60 or higher, matching the
          API&apos;s &quot;pay for actionable results&quot; threshold.
        </p>
      </div>
    </div>
  );
}
