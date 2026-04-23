# CLAUDE.md — Kombatix Web

This file is the operating constitution for Claude Code sessions in this repo. Read it fully at the start of every session. If anything here conflicts with a user instruction, stop and ask before proceeding.

---

## 1. Account Lock (verify BEFORE writing or committing any code)

**STRICT RULE:** At session start, run all four checks. If any mismatch, STOP and alert the user before continuing.

Expected values (LOCKED — do not change without explicit user confirmation):

```
GitHub Org/Repo:      kombatix/kombatix-website
GitHub Remote URL:    https://github.com/kombatix/kombatix-website.git
Firebase Project ID:  kombatix-website
GCP Project ID:       kombatix-website          (same as Firebase — one project)
GCP Project Number:   614939493231
GCP Parent Org:       operations-org
Google Account:       operations@kombatix.io
```

Verification commands at session start — all four must return the expected values:

```bash
# 1. GitHub repo
gh repo view --json nameWithOwner
# expected: {"nameWithOwner":"kombatix/kombatix-website"}

# 2. Git remote
git remote get-url origin
# expected: https://github.com/kombatix/kombatix-website.git  (or git@github.com:kombatix/kombatix-website.git)

# 3. Firebase project
firebase use
# expected: kombatix-website (default)

# 4. GCP project + account
gcloud config get-value project
# expected: kombatix-website

gcloud auth list --filter=status:ACTIVE --format="value(account)"
# expected: operations@kombatix.io

gcloud projects describe kombatix-website --format="value(projectNumber)"
# expected: 614939493231
```

If ANY of these return a different value, STOP immediately. Do not run `gcloud config set project`, `firebase use <other>`, or `gcloud auth login <other>` without explicit chat confirmation. Darrel operates across PeopleFinders, Big Fat Dad, and Kombatix accounts simultaneously — drift into the wrong account is the #1 risk on this repo.

**Never** run `gcloud config set project`, `firebase use <project>`, or change Google auth mid-session without explicit confirmation from the user in chat. Credential drift across projects is the single most common way code ships to the wrong account. Treat it as a hard stop.

**Before first commit:** Verify `git remote get-url origin` returns `https://github.com/kombatix/kombatix-website.git` (or the SSH equivalent). If it returns any other URL, STOP.

### Implementation: run `scripts/verify-context.sh --strict`

This repo is hardened against cross-project credential drift following the PersonIQ pattern. Instead of running the six commands above by hand, run:

```bash
scripts/verify-context.sh --strict
```

It checks all six values, exits 0 on success, and exits 1 with a remediation guide on any mismatch. It is also wired into the `pre-push` hook and `scripts/deploy-safe.sh` so drifted state cannot push or deploy.

**Environment pins** live in `.envrc` — load them at session start with `source .envrc`, or install [direnv](https://direnv.net) and run `direnv allow .` once for auto-loading. See `PROJECT_SAFETY.md` for full setup, remediation, and bypass mechanics.

**Files that encode the account lock** — keep these in sync when expected values change:
- `CLAUDE.md` §1 (this file — canonical source)
- `scripts/verify-context.sh` (EXPECTED_* constants)
- `scripts/deploy-safe.sh` (PROJECT_ID)
- `.githooks/pre-push` (EXPECTED_HTTPS / EXPECTED_SSH)
- `.envrc` (exports)
- `PROJECT_SAFETY.md` (documented expected-values table)

---

## 2. Project Purpose

This repo is the Kombatix marketing website (kombatix.io). It is **not** the Kombatix application, which lives separately on AWS. This site is:

- A statically-exported Next.js site
- Hosted on Firebase Hosting (not App Hosting — we do not need SSR)
- Two dynamic endpoints via Firebase Cloud Functions (contact form submission to HubSpot, nothing else)
- Designed AEO/SEO/GEO-heavy for citation by AI engines

Out of scope in this repo:
- The Kombatix application itself
- API documentation (logged-in product experience)
- Customer portal
- Billing

---

## 3. Required MCP Servers (verify active before writing framework/SDK code)

Before writing any Firebase, Gemini, or Next.js code, verify the relevant MCP server is active. If not active, install and enable first.

| Purpose | MCP Server | Install command |
|---|---|---|
| Firebase SDK / Hosting / Functions patterns | firebase-tools MCP | `claude mcp add firebase -- npx -y firebase-tools@latest experimental:mcp` |
| Gemini / Vertex AI / GCP docs | Google Developer Knowledge | per Google Developer Docs |
| Next.js, library lookups | Context7 | `claude mcp add context7 -- npx -y @upstash/context7-mcp` |

**Rule:** Do not write from memory for Gemini model IDs, Firebase API shapes, or Next.js conventions. Look up first. Your training data is older than these APIs.

---

## 4. Model ID Rules (live-verify before writing)

Training data for these models is stale. Always verify before committing.

- **Image generation (hero/infographic):** `gemini-3-pro-image-preview` (Nano Banana Pro — for sharp text rendering, 2K/4K output, complex infographics)
- **Image generation (batch/social via Lumis):** `gemini-3.1-flash-image-preview` (Nano Banana 2 — fast, cheap, high volume)
- **Text/reasoning:** verify current Gemini text model via MCP before hardcoding. Do not use `gemini-pro`, `gemini-1.5-*`, or `gemini-2.0-*` — these are deprecated or wrong.

If a session produces code with a deprecated model ID, that's a signal the MCP lookup step was skipped. Fix immediately.

---

## 5. Stack

| Layer | Choice | Rationale |
|---|---|---|
| Framework | Next.js (latest stable, use `output: 'export'`) | Static export means no SSR, no Cloud Run, near-zero cost |
| Styling | Tailwind CSS | Direct control, no component library bloat |
| Hosting | Firebase Hosting | Free tier, global CDN, simple deploy |
| Forms | Firebase Cloud Function → HubSpot Forms API | Keeps HubSpot portal ID server-side; leads land in HubSpot unchanged |
| Analytics | GA4 (direct install, no GTM) | No ads ever; GTM overhead not justified |
| Blog | WordPress at blog.kombatix.io (existing install, subdomain only) | Preserve existing content, isolate plugin rot |
| Images | Nano Banana Pro for heroes, Flash for batch | Pro for text rendering / infographics; Flash for volume |
| Design | Google Stitch (Gemini 3 Pro mode) via MCP bridge | Skip Figma intermediate; Stitch MCP → Claude Code direct |

Firebase Hosting **not** App Hosting. App Hosting is for SSR/ISR workloads; this site is static + one function. Do not overspec.

---

## 6. Hard Rules

- **No localStorage / sessionStorage.** Not needed on a marketing site and breaks in some Claude artifact environments if we ever port components.
- **No browser storage APIs of any kind** — everything is either static or in-memory React state.
- **No HubSpot JS client embed.** The form submits via our Cloud Function to HubSpot's server-side API. The current live site has a broken HubSpot shortcode rendering; we do not repeat that mistake.
- **No inline API keys.** HubSpot portal ID, GA4 measurement ID, HubSpot private app token — all via Firebase Secret Manager or environment variables, never committed.
- **Semantic HTML.** Proper `<article>`, `<section>`, `<nav>`, h1→h6 hierarchy. This is load-bearing for both accessibility and AEO.
- **JSON-LD on every page.** `Organization` sitewide, `SoftwareApplication` on product pages (both Defense and PreAuth), `FAQPage` on pricing and /how-it-works, `BreadcrumbList` on interior pages, `WebSite` on home.
- **Hero score dial is a built component, not an AI image.** Built as a real React/SVG animated component. AI images are for infographic sections, not the hero.
- **No "free" language around scoring below 60.** Use "pay for actionable outcomes" framing. Reason: the policy may change, and public commitments are hard to walk back.

---

## 7. AEO/SEO/GEO Requirements

Every page ships with:

- Meta title (max 60 chars), meta description (max 155 chars, primary keyword front-loaded)
- OpenGraph + Twitter card tags
- Pre-rendered OG image (generated via Nano Banana Pro, static asset — no runtime generation)
- Canonical URL
- JSON-LD structured data (see hard rules above)
- Semantic HTML with proper heading hierarchy

Sitewide:

- `/robots.txt` with explicit allow for: `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`, `CCBot`, `anthropic-ai`, `Applebot-Extended`
- `/sitemap.xml` auto-generated from Next.js routes
- `/llms.txt` — structured product summary (see section 8 of architecture doc for spec)
- `/llms-full.txt` — full concatenated page content for deep LLM grounding

FAQ content pattern (this is the real AEO trick):
- Question phrased naturally as a user would ask
- Answer opens with a direct, quotable sentence under 25 words that LLMs can lift
- Full detail follows the opening sentence
- Each Q&A wrapped in FAQPage JSON-LD with `speakable` schema

---

## 8. Build Conventions

- **Commits:** Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `style:`, `perf:`). Scope optional but helpful (`feat(defense):`, `fix(form):`).
- **Branches:** `main` is production. Feature work in `feat/<slug>`. No direct commits to main after initial scaffold.
- **PRs:** Self-reviewed during solo work; CI must pass (lint + build) before merge to main.
- **Testing:** Marketing site does not need unit tests. Do need:
  - `next build` must complete without errors or warnings
  - Lighthouse scores on home, defense, preauth: ≥95 performance, ≥95 accessibility, ≥95 SEO, ≥95 best practices
  - HTML validation clean (W3C validator) on all pages
  - All internal links resolve (link checker in CI)
- **Code style:** Prettier + ESLint defaults from Next.js. No custom rules unless we hit a specific problem.

---

## 9. Deploy Flow

1. Build on `.hosted.app` subdomain first via Firebase Hosting preview channel
2. QA every page on preview URL
3. Run Lighthouse + HTML validation + link checker
4. Verify GA4 receiving events from preview
5. Verify Cloud Function form submission lands in HubSpot correctly
6. When all green: promote preview to live channel, then flip DNS apex to Firebase Hosting
7. Blog subdomain DNS flip happens in the same window
8. Keep WordPress install as-is, set non-blog pages to Draft, install Redirection plugin to 301 non-blog URLs to kombatix.io root

---

## 10. Anti-Drift Reminders

When working on this repo, the following behaviors indicate the session has drifted and should be corrected:

- Writing Gemini model IDs from memory without MCP lookup
- Reaching for App Hosting (Cloud Run) when static export suffices
- Adding localStorage / browser storage
- Using GTM when the file above says no GTM
- Rebuilding the WordPress blog (we are keeping it as-is)
- Creating /api page documentation content without referencing the sample request/response in the architecture doc (section 3, page 7)
- Using OmniScore anywhere — this is a Kount-owned term we cannot use
- Putting a "$100B" or "$41B" friendly-fraud stat anywhere without a cited current-year source
- Writing "free" or "no charge" language around sub-60 scoring — use "pay for actionable outcomes"
- Attributing customer stories to named companies — current policy is anonymized + specific (see architecture doc section 3, page 1 for exact approved copy)

---

## 11. Reference Artifacts

- `KOMBATIX_SITE_V2.docx` — full architecture reference (all page content, sitemap, Stitch prompts, image brief)
- `README.md` — repo setup + local dev
- This file — session operating rules

When producing page content, copy directly from the architecture doc rather than paraphrasing. The doc has already been reviewed and approved.
