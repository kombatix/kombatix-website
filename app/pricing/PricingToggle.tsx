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

type Product = "defense" | "preauth";

export function PricingToggle() {
  // Derive default tab from URL hash on mount; fall back to "defense".
  const [tab, setTab] = useState<Product>("defense");

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash === "preauth" || hash === "defense") setTab(hash);
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
      {/* Toggle */}
      <div
        role="tablist"
        aria-label="Product pricing"
        className="inline-flex rounded-xl border border-gray-200 bg-white p-1"
      >
        <button
          role="tab"
          aria-selected={tab === "defense"}
          aria-controls="defense-panel"
          id="defense-tab"
          onClick={() => handleTabClick("defense")}
          className={cn(
            "px-6 py-2.5 rounded-lg text-body font-semibold transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
            tab === "defense" ? "bg-accent text-white" : "text-navy hover:bg-gray-50",
          )}
        >
          Kombatix Defense
        </button>
        <button
          role="tab"
          aria-selected={tab === "preauth"}
          aria-controls="preauth-panel"
          id="preauth-tab"
          onClick={() => handleTabClick("preauth")}
          className={cn(
            "px-6 py-2.5 rounded-lg text-body font-semibold transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
            tab === "preauth" ? "bg-accent text-white" : "text-navy hover:bg-gray-50",
          )}
        >
          Kombatix PreAuth
        </button>
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
    </div>
  );
}
