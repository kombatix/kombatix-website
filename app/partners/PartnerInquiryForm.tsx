"use client";

import { useState, type FormEvent } from "react";
import {
  TextField,
  TextareaField,
  SelectField,
  Honeypot,
} from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";

type FormState = "idle" | "submitting" | "success" | "error";

// Partner inquiry form.
// Submits to /api/partner-inquiry (Firebase Cloud Function via firebase.json rewrite).
// On success: replaces the form with a thank-you message (no toast).
// On error: inline error with fallback to operations@kombatix.io.
// Honeypot field "website" is hidden; bots filling it get a silent 200.
//
// Fields match the HubSpot form exactly — do not rename without updating
// functions/src/partner-inquiry.ts REQUIRED_FIELDS list.
export function PartnerInquiryForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setErrorMessage("");
    setFieldErrors({});

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/partner-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.status === 200) {
        setState("success");
        // GA4 conversion event (wired up via gtag in layout)
        if (typeof window !== "undefined" && typeof window.gtag === "function") {
          window.gtag("event", "partner_form_submit");
        }
        return;
      }

      if (res.status === 400) {
        const body = await res.json().catch(() => ({ error: "Please check the form and try again." }));
        setErrorMessage(body.error || "Please check the form and try again.");
        setState("error");
        return;
      }

      if (res.status === 429) {
        setErrorMessage("Too many submissions. Please try again in a minute.");
        setState("error");
        return;
      }

      // 5xx / network
      setErrorMessage(
        "Something went wrong. Please email operations@kombatix.io and we'll follow up.",
      );
      setState("error");
    } catch {
      setErrorMessage(
        "Network error. Please email operations@kombatix.io and we'll follow up.",
      );
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="rounded-xl bg-white border border-gray-200 p-8 md:p-12" role="status" aria-live="polite">
        <h3 className="text-h2 text-navy">Thanks — we&apos;ll be in touch within one business day.</h3>
        <p className="mt-4 text-body text-gray-600">
          A Kombatix partnerships specialist will reach out to the email
          address you provided. In the meantime, feel free to reach us at{" "}
          <a href="mailto:operations@kombatix.io" className="text-accent hover:underline">
            operations@kombatix.io
          </a>{" "}
          with any questions.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <Honeypot name="website" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextField
          label="Company name"
          name="companyName"
          type="text"
          autoComplete="organization"
          required
          error={fieldErrors.companyName}
        />
        <TextField
          label="Your name"
          name="yourName"
          type="text"
          autoComplete="name"
          required
          error={fieldErrors.yourName}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextField
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          required
          error={fieldErrors.email}
        />
        <TextField
          label="Role / title"
          name="role"
          type="text"
          autoComplete="organization-title"
          required
          error={fieldErrors.role}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectField label="Company type" name="companyType" required defaultValue="">
          <option value="" disabled>Select one</option>
          <option value="Payment Processor">Payment Processor</option>
          <option value="Acquirer">Acquirer</option>
          <option value="Fraud Platform">Fraud Platform</option>
          <option value="Chargeback Platform">Chargeback Platform</option>
          <option value="Reseller">Reseller</option>
          <option value="Other">Other</option>
        </SelectField>
        <SelectField
          label="Estimated monthly transaction volume"
          name="monthlyVolume"
          required
          defaultValue=""
        >
          <option value="" disabled>Select one</option>
          <option value="<10K">Less than 10K</option>
          <option value="10K-100K">10K – 100K</option>
          <option value="100K-1M">100K – 1M</option>
          <option value="1M+">1M+</option>
        </SelectField>
      </div>

      <TextareaField
        label="Brief description of integration interest"
        name="interestDescription"
        rows={5}
        required
        error={fieldErrors.interestDescription}
      />

      <TextField
        label="How did you hear about Kombatix?"
        name="referralSource"
        type="text"
        helperText="Optional — tells us where our signal is landing."
      />

      {state === "error" && (
        <div
          role="alert"
          className="rounded-lg border border-red-500 bg-red-50 px-4 py-3 text-body-sm text-red-700"
        >
          {errorMessage}
        </div>
      )}

      <div className="pt-2">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={state === "submitting"}
          className={state === "submitting" ? "opacity-70 cursor-wait" : ""}
        >
          {state === "submitting" ? "Sending…" : "Send Inquiry"}
        </Button>
      </div>
    </form>
  );
}

// gtag type augmentation (added here so we can fire the conversion event
// without leaking a separate .d.ts file)
declare global {
  interface Window {
    gtag?: (command: "event" | "config" | "js" | "set", ...args: unknown[]) => void;
  }
}
