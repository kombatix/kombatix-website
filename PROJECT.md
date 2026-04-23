# PROJECT.md — Kombatix Web Build Plan

This is the ordered build plan for the Kombatix marketing site. Claude Code works through it phase by phase. Each phase has a **Definition of Done** — do not advance to the next phase until every item is checked off.

**Read these in order before starting:**
1. `CLAUDE.md` — session operating rules (account lock, MCP servers, hard rules)
2. `DESIGN.md` — design system source of truth (colors, typography, components, prohibited elements)
3. `KOMBATIX_SITE_V2.docx` — approved content and page-by-page architecture
4. `README.md` — repo setup and stack overview
5. This file

---

## Build Strategy — Read Before Phase 0

This build has a specific division of labor between design and code:

**Google Stitch (Gemini 3 Pro mode)** is used for **design only** — visual design system, layout patterns, section rhythm, component appearance. Stitch produced the homepage design and generated the `DESIGN.md` reference in this repo.

**We do NOT use Stitch for content.** Every Stitch regeneration has a nonzero chance of hallucinating copy — fabricating statistics, inventing pricing models, upgrading certification claims, or introducing competitor terminology. The homepage design is accepted as-is for its layout and patterns; all copy on every page is taken verbatim from `KOMBATIX_SITE_V2.docx` in code.

**Claude Code's job:**
1. Apply `DESIGN.md` tokens and patterns
2. Build pages with design patterns from the homepage
3. Use `KOMBATIX_SITE_V2.docx` as the verbatim content source — do not paraphrase
4. Wire up forms, analytics, and AEO infrastructure
5. Ship

**When in doubt, trust the docs, not your instincts.** If Stitch's homepage output and the architecture doc conflict, the architecture doc wins. If the architecture doc and `DESIGN.md` conflict, flag it to the user — don't guess.

---

## Phase 0 — Preflight (MANDATORY, every session start)

**Objective:** Verify the session is pointed at the correct accounts and has the right MCP servers active.

### Tasks

1. Run account lock verification (from CLAUDE.md section 1):
   ```bash
   gh repo view --json nameWithOwner
   git remote get-url origin
   firebase use
   gcloud config get-value project
   gcloud auth list --filter=status:ACTIVE --format="value(account)"
   gcloud projects describe kombatix-website --format="value(projectNumber)"
   ```
   All must match:
   - Repo: `kombatix/kombatix-website`
   - Remote: `https://github.com/kombatix/kombatix-website.git` (or SSH)
   - Firebase/GCP project: `kombatix-website`
   - Project number: `614939493231`
   - Google account: `operations@kombatix.io`

   On ANY mismatch: **STOP, alert the user, do not proceed.**

2. Verify MCP servers are active:
   - `firebase-tools` MCP
   - Google Developer Knowledge MCP
   - `context7` MCP
   - Stitch MCP (only needed if importing a Stitch design; optional after Phase 4 homepage is shipped)

3. Verify you can read and have processed:
   - `CLAUDE.md` — hard rules locked in
   - `DESIGN.md` — design system internalized
   - `KOMBATIX_SITE_V2.docx` — sitemap, page content, approved metrics
   - This file

### Definition of Done

- [ ] All six account-lock commands return expected values
- [ ] All required MCP servers confirmed active
- [ ] DESIGN.md read in full — brand colors, type scale, component patterns, prohibited elements internalized
- [ ] Architecture doc sitemap and approved content are clear

**STOP and confirm with user before advancing to Phase 1.**

---

## Phase 1 — Scaffold and Install

**Objective:** Get Next.js + Firebase + Tailwind running locally.

### Tasks

1. Confirm repo is on `main` and `git status` is clean.
2. Verify `.firebaserc` contains `"default": "kombatix-website"`.
3. **Verify `tailwind.config.ts` colors match `DESIGN.md`:**
   - `navy.DEFAULT: "#071325"`
   - `navy.light: "#0F1E3A"`
   - `accent.DEFAULT: "#005B9D"`
   - `accent.hover: "#004A82"`
   - `teal.DEFAULT: "#0EADA5"`
   If any of these are wrong, the scaffold is stale — fix before proceeding.
4. Install dependencies:
   ```bash
   npm install
   ```
   (`postinstall` runs `cd functions && npm install` automatically.)
5. Verify Firebase connection:
   ```bash
   firebase projects:list
   firebase use kombatix-website
   ```
6. Run dev server — confirm stub home page renders at `http://localhost:3000`:
   ```bash
   npm run dev
   ```
7. Start Firebase emulators — confirm clean start:
   ```bash
   npm run emulators
   ```
8. Run production build — confirm success:
   ```bash
   npm run build
   ```
   Output directory must be `out/`.
9. Commit: `chore: initial scaffold (next.js + firebase + tailwind)`

### Definition of Done

- [ ] Tailwind config reflects real brand colors from DESIGN.md
- [ ] `npm run dev` clean, stub home page renders with correct brand navy background
- [ ] `npm run build` completes clean
- [ ] Emulators start clean
- [ ] One clean commit on `main`

**STOP and confirm with user before advancing to Phase 2.**

---

## Phase 2 — Design System Primitives

**Objective:** Build the reusable primitives every page will consume. Primitives are DESIGN.md patterns expressed as React components.

### Tasks

1. Create `components/` directory.
2. Build these primitives, each matching the spec in `DESIGN.md` Section 7:

   | Component | File | DESIGN.md Reference |
   |---|---|---|
   | `Header` | `components/layout/Header.tsx` | 7.1 Global Navigation |
   | `Footer` | `components/layout/Footer.tsx` | 7.9 Footer |
   | `PageShell` | `components/layout/PageShell.tsx` | Wraps Header + main + Footer |
   | `Section` | `components/layout/Section.tsx` | Section rhythm (4, 5) |
   | `Button` | `components/ui/Button.tsx` | 7.2 Buttons (primary, ghost-dark, ghost-light, link) |
   | `EyebrowTag` | `components/ui/EyebrowTag.tsx` | 7.3 Eyebrow Tags |
   | `Card` | `components/ui/Card.tsx` | 7.4 / 7.5 (light + dark variants) |
   | `StatCard` | `components/ui/StatCard.tsx` | 7.6 Stat Cards |
   | `PricingCard` | `components/ui/PricingCard.tsx` | 7.7 Pricing Cards (incl. recommended ribbon) |
   | `CtaBand` | `components/layout/CtaBand.tsx` | 7.8 CTA Band (with glow button) |
   | `TrustBar` | `components/ui/TrustBar.tsx` | 7.14 Trust Bar |
   | `FAQItem` | `components/ui/FAQItem.tsx` | 7.13 FAQ Accordion |
   | `FormField` | `components/ui/FormField.tsx` | 7.10 Forms |
   | `Table` | `components/ui/Table.tsx` | 7.11 Tables |
   | `CodeBlock` | `components/ui/CodeBlock.tsx` | 7.12 Code Blocks |

3. Icons: use `lucide-react`. Import per component. Default size 20px unless noted otherwise.

4. Do NOT build page-specific sections yet (two-product panel, network callout, etc.) — those come in Phase 4 with real content.

### Definition of Done

- [ ] All 15 primitives render correctly in isolation
- [ ] Each primitive uses the correct brand color tokens from Tailwind config
- [ ] `Header` dropdown works on keyboard (focus + arrow keys + Escape) and click
- [ ] `Button` variants visually match DESIGN.md (primary is brand accent blue #005B9D, not generic)
- [ ] `FAQItem` passes a11y check (aria-expanded, keyboard toggle, focus-visible ring)
- [ ] `FormField` handles error, success, and disabled states
- [ ] `CtaBand` button has the accent glow shadow per DESIGN.md 7.8
- [ ] Commit: `feat(design-system): build layout and ui primitives from DESIGN.md`

**STOP and confirm with user before advancing to Phase 3.**

---

## Phase 3 — Hero Score Dial Component (CMP-01)

**Objective:** Build the animated composite score dial for the homepage hero.

### Tasks

1. Create `components/score-dial/ScoreDial.tsx`.
2. Implementation requirements:
   - Pure React + SVG. No external dependencies beyond what's already installed.
   - Conic gradient ring via SVG `<path>` with `stroke-dasharray` animation
   - Three color zones using `score-high`, `score-mid`, `score-low` tokens (DESIGN.md Section 8)
   - Center displays numeric score (large, bold) and label ("Defense Score" — NEVER "Risk Score")
   - Animates on mount: needle sweeps to score over 1200ms, number counts up
   - Props: `{ score: number; label: string; reasonBadges?: string[] }`
   - Respects `prefers-reduced-motion`
3. Create `components/score-dial/ScoreDialRotator.tsx`:
   - Cycles through 3 scenarios every ~4 seconds
   - Scenarios:
     ```ts
     const SCENARIOS = [
       { score: 95, label: "Likely Friendly Fraud", reasonBadges: ["All identity fields match", "8+ payment methods", "5+ locations"] },
       { score: 62, label: "Review Warranted", reasonBadges: ["Mixed signals", "Partial match", "Velocity anomaly"] },
       { score: 18, label: "Possible True Fraud", reasonBadges: ["No identity match", "New account", "Stolen card pattern"] },
     ];
     ```
   - Cross-fade between scenarios via `opacity`
   - `prefers-reduced-motion`: display first scenario only, no rotation
4. Manually test on a scratch route — verify scores render in all three color zones correctly

### Definition of Done

- [ ] Renders correctly at scores 0, 18, 50, 62, 80, 95, 100
- [ ] Color transitions properly at 50 and 80 boundaries
- [ ] Rotates cleanly through three scenarios with no layout shift
- [ ] Respects `prefers-reduced-motion`
- [ ] No AI imagery, no decorative elements that aren't functional
- [ ] Label always says "Defense Score" — NEVER "Risk Score"
- [ ] Commit: `feat(home): build animated defense score dial (CMP-01)`

**STOP and confirm with user before advancing to Phase 4.**

---

## Phase 4 — Homepage Build

**Objective:** Ship the homepage. Two parts: (a) import or rebuild the Stitch design layout, (b) fix all content against the architecture doc.

### Part A — Layout from Stitch

Two options, pick whichever is cleaner:

**Option A1 — Stitch MCP bridge import:**
- Verify Stitch MCP is active
- Import the approved Kombatix homepage design from Stitch directly into the codebase
- Stitch output will include Tailwind classes — verify those use the right tokens (e.g., `bg-navy` not `bg-[#0A1628]`)
- The homepage design is already approved; do not regenerate

**Option A2 — Manual rebuild following DESIGN.md + sitemap:**
- Use DESIGN.md Section 5 for the nine-section rhythm
- Build from scratch using the primitives from Phase 2 + the score dial from Phase 3
- This is often faster than fighting Stitch MCP for a page that's already designed

### Part B — Content Correction (MANDATORY)

**Known Stitch content drifts to fix:**

The homepage design Stitch produced has known content errors. Every one of these must be replaced with the approved copy from `KOMBATIX_SITE_V2.docx` before merge:

1. **Hero subheadline** — Stitch produced: "Bridging the gap between fraud prevention and chargeback resolution with real-time intelligence." Approved (from doc): "Kombatix scores identity at every critical point — pre-authorization screening against a growing network of known friendly fraudsters, and dispute-time defense with composite scoring at the moment of contact. Stop paying for transactions and refunds you don't owe."

2. **Trust bar** — Stitch produced: "API-First · REST Integration · <50ms Latency · SOC2 Type II". Approved: "API-First · REST Integration · Self-Service Portal · SOC 2 In Progress · No Long-Term Contract". **Compliance note:** "SOC 2 Type II" is a false claim — we are In Progress only. "<50ms Latency" is undefensible without a documented SLA. Fix before merge.

3. **Two-product cards** — Stitch produced generic fraud-tool copy ("Block stolen credentials", "Win more disputes automatically"). Approved copy is in the architecture doc, Section 3, Page 1. Stitch's language positions us as a fraud-prevention tool, which we explicitly are NOT. Replace verbatim.

4. **Gap in the Fraud Stack** — Stitch paraphrased to generic language. Approved headline: "Fraud prevention stops strangers. Chargeback tools fight disputes after they're filed. Nothing sits in the middle." Full body and competitor-naming copy in the architecture doc.

5. **Stat cards** — Stitch generated fabricated metrics ("42% Reduction in Refund Rate", "60% Fewer Post-Contact Disputes", "3x Increase in Representment Wins"). Approved metrics (from real customer data):
   - "Refund Rate: 10% → 5%"
   - "Post-Contact Disputes: −60%"
   - "Representment Wins: 40% → 80%"
   Use the **before → after** framing. Full supporting copy for each card is in the architecture doc.

6. **Pricing preview** — Stitch invented per-transaction pricing ("$0.02 / transaction", "$0.50 / dispute"). Our actual model is monthly tiered subscription:
   - Kombatix PreAuth: from $49/month
   - Kombatix Defense: from $75/month
   Approved bullet lists and CTA copy in the architecture doc.

7. **Partners teaser** — Stitch rendered three empty logo placeholders. We do not have partner logos to show yet. Replace with the approved body copy ("Built for scale — partnership ready") and a single CTA link to `/partners`. No placeholder logo boxes.

8. **Footer** — verify all four columns match the architecture doc Section 2. Contact column should have `operations@kombatix.io` and `Eagle, ID 83616`.

### Part C — Metadata, JSON-LD, OG

1. `export const metadata` with approved meta title and description (architecture doc Section 4)
2. `Organization` JSON-LD — should already be in `app/layout.tsx` from scaffold
3. `WebSite` JSON-LD with sitelinks search
4. `BreadcrumbList` JSON-LD
5. OG image placeholder reference (actual OG image generated in Phase 5)

### Definition of Done

- [ ] All nine sections built per DESIGN.md Section 5 rhythm (dark-dark-light-light-dark-light-light-light-dark-dark)
- [ ] Score dial (CMP-01) appears in hero right column
- [ ] All eight content drifts from Part B fixed against architecture doc
- [ ] Trust bar says "SOC 2 In Progress" — NOT "SOC 2 Type II"
- [ ] No "Risk Score" anywhere on the page
- [ ] No "block stolen credentials" / fraud-prevention positioning
- [ ] Metadata block exports correct title and description
- [ ] `Organization`, `WebSite`, `BreadcrumbList` JSON-LD present
- [ ] Lighthouse ≥95 across all four categories
- [ ] `npm run build` clean
- [ ] Commit: `feat(home): ship homepage with approved content`

**STOP and confirm with user before advancing to Phase 5.**

---

## Phase 5 — Remaining Page Builds (Iterative)

**Objective:** Build the other six pages using design patterns from the homepage + DESIGN.md + verbatim content from the architecture doc.

**Rule:** Read the corresponding page specification in `KOMBATIX_SITE_V2.docx` before each page. Copy text verbatim. Do not invent.

**Build order (do NOT reorder):**
1. Defense (`/defense`)
2. PreAuth (`/preauth`)
3. How It Works (`/how-it-works`)
4. Pricing (`/pricing`)
5. Partners (`/partners`)
6. API (`/api`)

### For each page:

#### Universal Build Checklist

- [ ] Read page spec in `KOMBATIX_SITE_V2.docx` (Section 3)
- [ ] Create route file: `app/<route>/page.tsx`
- [ ] Add `export const metadata` with approved title + description
- [ ] Build page using `PageShell` + `Section` + primitives from Phase 2
- [ ] **Copy ALL body copy verbatim** from the architecture doc — no paraphrasing
- [ ] Apply section rhythm per DESIGN.md Section 5 (light/dark alternation)
- [ ] Add page-specific JSON-LD schema:
  - All pages: `BreadcrumbList`
  - `/defense`, `/preauth`: `SoftwareApplication` + `Product` with `offers`
  - `/pricing`: `FAQPage` for all 8 Q&A entries
  - `/how-it-works`: `FAQPage` if FAQ added
- [ ] Add placeholders for Nano Banana Pro images with IMG-XX labels (images generated in Phase 6)
- [ ] Verify internal links resolve
- [ ] Run `npm run build` clean
- [ ] Lighthouse ≥95 across all four categories
- [ ] Commit: `feat(<route>): ship <page name>`

#### Page-Specific Notes

**Defense (`/defense`)**
- Hero visual is CMP-02 (Defense Results Report card) — build as styled inline card, not AI image
- "When You Use It" section: two-column split
- Three scoring engines: stacked sections
- "What You Get" table with `<caption>` for a11y
- `SoftwareApplication` + `Product` JSON-LD

**PreAuth (`/preauth`)**
- Hero visual IMG-09 placeholder (Nano Banana Pro image, generated Phase 6)
- "How PreAuth Works" 4-step table
- Three pricing cards, middle (Growth $149) has "Recommended" ribbon
- "Who PreAuth Is For" segment fit table
- `SoftwareApplication` + `Product` JSON-LD

**How It Works (`/how-it-works`)**
- Decision tree (IMG-10 or CMP-03) — prefer SVG component for dark-mode responsiveness
- Three scoring engine sections (stacked, not cards)
- Composite score table with actions
- AI Defense Narrative sample card

**Pricing (`/pricing`)**
- Product toggle at top — React state, URL hash support (`#preauth`, `#defense`)
- Both sets of three pricing cards
- 8-entry FAQ with `FAQPage` JSON-LD + `speakable` schema
- Each FAQ answer opens with a direct, quotable sentence under 25 words (AEO pattern — architecture doc Section 4)

**Partners (`/partners`)**
- Form built here, wired to Cloud Function in Phase 7
- Form fields per architecture doc + honeypot field `website` (hidden via `display: none`, `tabIndex={-1}`, `autoComplete="off"`)
- Form state managed with React, submits via `fetch('/api/partner-inquiry')`
- Success/error states inline, no redirect

**API (`/api`)**
- Sample request/response code blocks using `CodeBlock` primitive from Phase 2
- Real endpoint payloads from architecture doc Section 3 Page 7
- JetBrains Mono font, dark card background (navy-light)

### Phase 5 Definition of Done (all 6 pages)

- [ ] All 6 pages built and linked correctly in nav
- [ ] Each page's metadata exports unique title + description
- [ ] Each page has appropriate JSON-LD schema
- [ ] All internal links resolve (`npx linkinator out/ --recurse`)
- [ ] `npm run build` clean across all pages
- [ ] Lighthouse ≥95 on every page

**STOP and confirm with user before advancing to Phase 6.**

---

## Phase 6 — AEO / SEO / GEO Wiring

**Objective:** Ship the full citation stack — sitemap, llms files, OG images, and any schemas not yet added.

### Tasks

1. **Sitemap** — `app/sitemap.ts` using Next.js 15 pattern. Include all 7 routes with `lastModified`, `changeFrequency`, `priority`.

2. **llms-full.txt** — Build script `scripts/generate-llms-full.ts`:
   - Reads text content of all 7 built pages from `out/*.html`
   - Strips tags, preserves structure with page delimiters (`=== PAGE: /defense ===`)
   - Writes to `public/llms-full.txt`
   - Runs as `postbuild` in `package.json`

3. **Verify `public/llms.txt`** — already in scaffold; update if product details changed during builds

4. **Verify `public/robots.txt`** — allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot, anthropic-ai, Applebot-Extended, OAI-SearchBot, Bytespider. Already in scaffold; verify no regression.

5. **OG images** — generate via Nano Banana Pro per DESIGN.md Section 12. Save as `public/og/<route>.png`. Reference in each page's metadata:
   ```ts
   export const metadata: Metadata = {
     openGraph: {
       images: [{ url: "/og/defense.png", width: 1200, height: 630 }],
     },
   };
   ```

6. **Nano Banana Pro image queue** — generate per architecture doc Section 6:
   - IMG-02 (gap diagram, homepage)
   - IMG-04 (lifecycle pipeline, /how-it-works)
   - IMG-05 (identity match cards, /how-it-works)
   - IMG-06 (behavioral timeline, /how-it-works)
   - IMG-07 (composite score dial graphic, /how-it-works)
   - IMG-08 (network diagram, homepage)
   - IMG-09 (preauth network viz, /preauth)
   - IMG-10 (cost decision tree, /how-it-works — or build as CMP-03 instead)

7. **Canonical URLs** — verify each page sets canonical in metadata

8. **FAQ schema validation** — run every FAQPage JSON-LD through Google Rich Results Test

### Definition of Done

- [ ] `/sitemap.xml` generates, contains all 7 URLs
- [ ] `/llms.txt` resolves as plain text
- [ ] `/llms-full.txt` resolves with concatenated page text + delimiters
- [ ] `/robots.txt` allows all major AI crawlers
- [ ] OG images present for all 7 routes
- [ ] All Nano Banana Pro images generated and placed in `public/images/`
- [ ] Google Rich Results Test passes on `/defense`, `/preauth`, `/pricing`, `/`
- [ ] Commit: `feat(aeo): sitemap, llms files, og images, schemas`

**STOP and confirm with user before advancing to Phase 7.**

---

## Phase 7 — Forms and Analytics

**Objective:** Wire the partner inquiry form to HubSpot and confirm GA4 conversion events.

### Tasks

1. **HubSpot setup (Darrel does):**
   - Create HubSpot form in Kombatix HubSpot account with fields: `firstname`, `lastname`, `email`, `company`, `jobtitle`, `company_type`, `monthly_transaction_volume`, `integration_interest`, `referral_source`
   - Note portal ID and form GUID

2. **Set Firebase secrets:**
   ```bash
   firebase functions:secrets:set HUBSPOT_PORTAL_ID
   firebase functions:secrets:set HUBSPOT_FORM_GUID
   ```

3. **Deploy function to preview:**
   ```bash
   firebase deploy --only functions:partnerInquiry
   ```

4. **Test function end-to-end:**
   - Valid test inquiry → verify appears in HubSpot
   - Missing fields → verify 400 response
   - Honeypot triggered → verify silent 200
   - 4 rapid inquiries same IP → verify 429 on the 4th
   - Firestore `partnerInquiries` collection receives backup copy

5. **Wire `/partners` form frontend:**
   - `onSubmit` calls `fetch('/api/partner-inquiry', { method: 'POST', ... })`
   - Loading state during submission
   - 200: success state — "Thanks — we'll be in touch within one business day."
   - 4xx: inline error with server's message
   - 5xx / network error: fallback "Please email operations@kombatix.io"
   - Hidden honeypot field per DESIGN.md Section 7.10

6. **GA4 conversion events** via `gtag('event', ...)`:
   - `signup_click_defense` — Start Free CTA on `/defense` or `/`
   - `signup_click_preauth` — PreAuth signup CTAs
   - `partner_form_submit` — successful HubSpot submission
   - `pricing_view` — pageview on `/pricing`
   - `api_page_view` — pageview on `/api`
   - `how_it_works_scroll_50` / `how_it_works_scroll_100` — Intersection Observer on `/how-it-works`

7. **GA4 admin:** Darrel marks events as conversions in GA4 UI; Claude Code confirms events firing from DevTools Network tab

### Definition of Done

- [ ] Form submits end-to-end, lead lands in HubSpot
- [ ] All error paths verified
- [ ] Firestore backup collection receives every submission
- [ ] GA4 DebugView shows all 7 events firing
- [ ] Commit: `feat(forms,analytics): wire hubspot and ga4`

**STOP and confirm with user before advancing to Phase 8.**

---

## Phase 8 — Quality Gates

**Objective:** Verify every quality bar before deploy.

### Tasks

1. **Build clean:**
   ```bash
   npm run build
   npm run check  # tsc --noEmit
   ```

2. **Lighthouse** — all 7 pages, ≥95 across performance / a11y / SEO / best practices:
   ```bash
   npx serve out/
   npx lighthouse http://localhost:3000/ --chrome-flags="--headless"
   # Repeat for each route
   ```

3. **HTML validation** — W3C, every page, zero errors:
   ```bash
   npx html-validate out/**/*.html
   ```

4. **Link check** — zero broken internal links:
   ```bash
   npx linkinator out/ --recurse --silent
   ```

5. **Accessibility audit** — axe-core, zero violations per page:
   ```bash
   npx @axe-core/cli http://localhost:3000/
   ```

6. **Schema validation** — Google Rich Results Test on:
   - `/` (Organization, WebSite)
   - `/defense` (SoftwareApplication, BreadcrumbList)
   - `/preauth` (SoftwareApplication, BreadcrumbList)
   - `/pricing` (FAQPage, BreadcrumbList)

7. **Security headers** — [securityheaders.com](https://securityheaders.com) on preview URL. A or A+.

8. **Prohibited-element scan** — grep the `out/` directory for hard-banned terms:
   ```bash
   # Must return zero matches in rendered HTML:
   grep -r "Risk Score" out/
   grep -r "SOC 2 Type II" out/
   grep -r "OmniScore" out/
   grep -r "block stolen credentials" out/
   ```

### Definition of Done

- [ ] Build + type check clean
- [ ] Lighthouse ≥95 on all 7 pages, all 4 categories
- [ ] HTML validator zero errors
- [ ] Link checker zero broken links
- [ ] Axe-core zero violations
- [ ] Rich Results Test passes all schema pages
- [ ] Security headers grade A or better
- [ ] Prohibited-element scan returns zero matches

**STOP and confirm with user before advancing to Phase 9.**

---

## Phase 9 — Deploy

**Objective:** Ship to production with rollback capability.

### Tasks

1. **Preview deploy:**
   ```bash
   firebase hosting:channel:deploy preview --expires 7d
   ```

2. **Final QA on preview URL:**
   - Click through every page manually
   - Submit partner inquiry form → verify lands in production HubSpot
   - Verify GA4 receives events from preview domain (may need to add preview domain to GA4 data stream)

3. **Promote to live:**
   ```bash
   firebase deploy --only hosting,functions
   ```

4. **DNS cutover window (coordinated with Darrel):**
   - Flip `kombatix.io` A/CNAME to Firebase Hosting
   - Flip `blog.kombatix.io` to existing WordPress host
   - On WordPress: set non-blog pages to Draft, install Redirection plugin, 301 rule for non-blog URLs → `https://kombatix.io/`
   - Firebase auto-provisions SSL (24–48h after DNS propagation)

5. **Post-deploy monitoring:**
   - Watch Cloud Functions logs for 24h: `firebase functions:log`
   - GA4 real-time view shows production traffic
   - At least one test HubSpot submission from live domain

6. **Rollback plan:**
   - `firebase hosting:rollback` reverts to previous deploy
   - DNS fallback: keep previous hosting provider active first 48h

### Definition of Done

- [ ] Preview deployed and QA'd
- [ ] Production deployed
- [ ] DNS cutover complete
- [ ] SSL provisioned
- [ ] GA4 receiving live traffic
- [ ] HubSpot receiving live submissions
- [ ] No errors in Cloud Functions logs for 24h
- [ ] Commit: `chore: production deploy`

**LAUNCH COMPLETE.**

---

## Ongoing Maintenance

- **Blog:** WordPress stays on `blog.kombatix.io`. Lumis AI automation turns on after 2 weeks of stability.
- **Content updates:** Changes to pricing, products, or positioning → update the affected page + `/llms.txt` + `KOMBATIX_SITE_V2.docx`.
- **OG images:** Regenerate via Nano Banana Pro when page titles or key visuals change. Flat file swap.
- **Dependencies:** Monthly `npm audit` + update. Firebase Functions runtime upgrade as Google releases new LTS Node versions.

---

## Anti-Drift Reminders

Before every commit, verify:

- [ ] No localStorage / sessionStorage anywhere
- [ ] No GTM — GA4 direct install only
- [ ] No HubSpot JS embed — only the Cloud Function wrapper
- [ ] No `OmniScore` mentioned anywhere (Kount-owned term)
- [ ] No `Risk Score` — always `Defense Score`
- [ ] No "SOC 2 Type II" claim — we are "In Progress"
- [ ] No "<50ms latency" or similar performance claims without SLA backing
- [ ] No "block stolen credentials" / fraud-prevention framing
- [ ] No per-transaction pricing copy ($0.02/transaction) — only monthly tiers
- [ ] No "free" language around sub-60 Defense scoring — use "pay for actionable outcomes"
- [ ] No unsourced friendly-fraud stats ($100B, $41B)
- [ ] No named customer case studies unless explicitly approved
- [ ] Gemini model IDs current — verify via MCP before commit
- [ ] Firebase account matches `kombatix-website` project (number 614939493231)

If any of these drift: stop, fix, then resume. Drift is easier to catch early than late.

---

## Key Resources

- **CLAUDE.md** — session rules, account lock, hard limits
- **DESIGN.md** — design system source of truth
- **KOMBATIX_SITE_V2.docx** — page-by-page approved content
- **README.md** — stack overview and local dev
- **firebase.json** — hosting + functions config
- **`functions/src/partner-inquiry.ts`** — HubSpot integration reference implementation

When in doubt, trust the docs. When the docs conflict, ask the user.
