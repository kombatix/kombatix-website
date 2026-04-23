/**
 * Partner Inquiry → HubSpot Forms API
 *
 * Endpoint: POST /api/partner-inquiry (routed via firebase.json rewrite)
 *
 * Flow:
 *   1. CORS + method check
 *   2. Rate limit per IP (3/minute) via Firestore
 *   3. Honeypot check (silent success if triggered)
 *   4. Required field + email validation
 *   5. Backup write to Firestore
 *   6. Submit to HubSpot Forms API v3 (public submission endpoint — no auth needed)
 *   7. Return 200 on success, 4xx on validation, 5xx on backend failure
 *
 * Secrets required (set via `firebase functions:secrets:set`):
 *   - HUBSPOT_PORTAL_ID
 *   - HUBSPOT_FORM_GUID
 *
 * HubSpot form field names below MUST match what's configured in the HubSpot form.
 * Update them if Darrel renames fields in HubSpot.
 */

import { onRequest, type Request } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import { initializeApp, getApps } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { logger } from "firebase-functions/v2";
import type { Response } from "express";

if (getApps().length === 0) initializeApp();

const HUBSPOT_PORTAL_ID = defineSecret("HUBSPOT_PORTAL_ID");
const HUBSPOT_FORM_GUID = defineSecret("HUBSPOT_FORM_GUID");

const ALLOWED_ORIGINS = [
  "https://kombatix.io",
  "https://www.kombatix.io",
];

const RATE_LIMIT_PER_MINUTE = 3;

interface PartnerInquiryBody {
  companyName: string;
  yourName: string;
  email: string;
  role: string;
  companyType: string;
  monthlyVolume: string;
  interestDescription: string;
  referralSource?: string;
  // Honeypot — must be empty on legit submissions
  website?: string;
}

const REQUIRED_FIELDS: (keyof PartnerInquiryBody)[] = [
  "companyName",
  "yourName",
  "email",
  "role",
  "companyType",
  "monthlyVolume",
  "interestDescription",
];

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function applyCors(res: Response, origin: string | undefined): void {
  const allowed =
    origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  res.set("Access-Control-Allow-Origin", allowed);
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Max-Age", "3600");
  res.set("Vary", "Origin");
}

async function checkRateLimit(ip: string): Promise<boolean> {
  const db = getFirestore();
  const now = Date.now();
  const windowStart = now - 60_000;
  const ref = db.collection("rateLimits").doc(ip.replace(/[^a-zA-Z0-9.:_-]/g, "_"));
  const snap = await ref.get();
  const existing = snap.exists ? ((snap.data()?.submissions as number[]) || []) : [];
  const recent = existing.filter((t) => t > windowStart);
  if (recent.length >= RATE_LIMIT_PER_MINUTE) return false;
  recent.push(now);
  await ref.set({ submissions: recent, updatedAt: FieldValue.serverTimestamp() }, { merge: true });
  return true;
}

function splitName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return { firstName: parts[0], lastName: "" };
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(" "),
  };
}

export const partnerInquiry = onRequest(
  {
    region: "us-central1",
    cors: false, // handled explicitly
    secrets: [HUBSPOT_PORTAL_ID, HUBSPOT_FORM_GUID],
    memory: "256MiB",
    timeoutSeconds: 30,
  },
  async (req: Request, res: Response): Promise<void> => {
    const origin = req.headers.origin as string | undefined;
    applyCors(res, origin);

    if (req.method === "OPTIONS") {
      res.status(204).send("");
      return;
    }

    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    const ip =
      ((req.headers["x-forwarded-for"] as string) || "")
        .split(",")[0]
        .trim() ||
      req.ip ||
      "unknown";

    // Rate limit
    try {
      const underLimit = await checkRateLimit(ip);
      if (!underLimit) {
        logger.warn("Rate limit hit", { ip });
        res.status(429).json({
          error: "Too many requests. Please try again in a minute.",
        });
        return;
      }
    } catch (err) {
      logger.error("Rate limit check failed", err);
      // Fail open — do not block legit users on rate-limit infra failure
    }

    const body = (req.body || {}) as Partial<PartnerInquiryBody>;

    // Honeypot — if filled, silently return success (don't tell the bot)
    if (body.website) {
      logger.warn("Honeypot triggered", { ip });
      res.status(200).json({ ok: true });
      return;
    }

    // Required field validation
    for (const field of REQUIRED_FIELDS) {
      const v = body[field];
      if (typeof v !== "string" || !v.trim()) {
        res.status(400).json({ error: `Missing required field: ${field}` });
        return;
      }
    }

    if (!isValidEmail(body.email!)) {
      res.status(400).json({ error: "Please provide a valid email address." });
      return;
    }

    // Backup write to Firestore
    try {
      await getFirestore()
        .collection("partnerInquiries")
        .add({
          ...body,
          ip,
          userAgent: req.headers["user-agent"] || "",
          receivedAt: FieldValue.serverTimestamp(),
        });
    } catch (err) {
      logger.error("Firestore backup write failed", err);
      // Non-fatal — HubSpot is the primary destination
    }

    // Submit to HubSpot Forms API v3
    try {
      const portalId = HUBSPOT_PORTAL_ID.value();
      const formGuid = HUBSPOT_FORM_GUID.value();
      const { firstName, lastName } = splitName(body.yourName!);

      const hubspotPayload = {
        fields: [
          { name: "firstname", value: firstName },
          { name: "lastname", value: lastName },
          { name: "email", value: body.email! },
          { name: "company", value: body.companyName! },
          { name: "jobtitle", value: body.role! },
          { name: "company_type", value: body.companyType! },
          { name: "monthly_transaction_volume", value: body.monthlyVolume! },
          { name: "integration_interest", value: body.interestDescription! },
          ...(body.referralSource
            ? [{ name: "referral_source", value: body.referralSource }]
            : []),
        ],
        context: {
          pageUri: (req.headers.referer as string) || "https://kombatix.io/partners",
          pageName: "Partnership Inquiry",
          ipAddress: ip,
        },
        legalConsentOptions: {
          consent: {
            consentToProcess: true,
            text: "I agree to Kombatix processing my personal data to respond to my inquiry.",
          },
        },
      };

      const url = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(hubspotPayload),
      });

      if (!response.ok) {
        const detail = await response.text();
        logger.error("HubSpot submission failed", {
          status: response.status,
          detail,
        });
        res.status(502).json({
          error:
            "Unable to submit right now. Please email operations@kombatix.io and we'll follow up.",
        });
        return;
      }

      logger.info("Partner inquiry submitted", {
        company: body.companyName,
        companyType: body.companyType,
      });
      res.status(200).json({ ok: true });
      return;
    } catch (err) {
      logger.error("Unexpected error in partnerInquiry", err);
      res.status(500).json({
        error:
          "Something went wrong. Please email operations@kombatix.io and we'll follow up.",
      });
      return;
    }
  }
);
