# Kombatix Web

Marketing site for [kombatix.io](https://kombatix.io) — real-time identity scoring for friendly fraud defense and pre-authorization screening.

**This repo is not the Kombatix application.** The application lives separately on AWS. This is the public-facing marketing site only.

---

## Stack

- **Next.js** with static export (`output: 'export'`)
- **Tailwind CSS**
- **Firebase Hosting** — static CDN delivery
- **Firebase Cloud Functions** — single endpoint for partner inquiry form → HubSpot Forms API
- **GA4** — direct install, no GTM
- **Google Stitch** → **Claude Code** via MCP bridge for design-to-build pipeline
- **Nano Banana Pro** (`gemini-3-pro-image-preview`) for hero imagery
- **WordPress** at `blog.kombatix.io` — existing install, subdomain only

---

## Repo Layout

```
.
├── CLAUDE.md                    # Session operating rules (read first, every session)
├── KOMBATIX_SITE_V2.docx        # Full architecture and content reference
├── README.md                    # This file
├── app/                         # Next.js App Router pages
│   ├── page.tsx                 # Home (/)
│   ├── defense/page.tsx         # Kombatix Defense (/defense)
│   ├── preauth/page.tsx         # Kombatix PreAuth (/preauth)
│   ├── how-it-works/page.tsx    # (/how-it-works)
│   ├── pricing/page.tsx         # (/pricing)
│   ├── partners/page.tsx        # (/partners)
│   ├── api/page.tsx             # Developer-facing API landing (/api)
│   └── layout.tsx
├── components/                  # Reusable UI components
│   ├── ScoreDial.tsx            # Animated composite score dial (hero component)
│   ├── GapDiagram.tsx           # Three-zone flow diagram
│   └── ...
├── lib/
│   ├── schema.ts                # JSON-LD structured data generators
│   ├── hubspot.ts               # HubSpot Forms API client (server-only)
│   └── ...
├── public/
│   ├── robots.txt
│   ├── sitemap.xml              # Generated at build time
│   ├── llms.txt
│   ├── llms-full.txt
│   └── images/                  # Static assets (Nano Banana Pro outputs)
├── functions/                   # Firebase Cloud Functions
│   └── src/
│       └── partner-inquiry.ts   # HubSpot Forms API submission
├── firebase.json
├── .firebaserc
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```

---

## Local Dev

```bash
# Clone
git clone git@github.com:kombatix/kombatix-website.git
cd kombatix-website

# Install
npm install
cd functions && npm install && cd ..

# Environment
cp .env.example .env.local
# Fill in: GA4 measurement ID, HubSpot portal ID, HubSpot form GUID, HubSpot private app token

# Run Next.js dev server
npm run dev

# Run Firebase emulators (for Cloud Function)
firebase emulators:start --only functions,hosting
```

---

## Deploy

```bash
# Build static site
npm run build

# Deploy to preview channel first
firebase hosting:channel:deploy preview --expires 7d

# QA at preview URL, then promote to live
firebase deploy --only hosting,functions
```

Secrets (HubSpot token, etc.) managed via Firebase Secret Manager:

```bash
firebase functions:secrets:set HUBSPOT_TOKEN
firebase functions:secrets:set HUBSPOT_PORTAL_ID
firebase functions:secrets:set HUBSPOT_FORM_GUID
```

---

## Quality Bars

Before any merge to `main`:

- `next build` completes clean (no errors or warnings)
- Lighthouse ≥95 across performance, accessibility, SEO, best practices on home, /defense, /preauth
- W3C HTML validation clean on all pages
- All internal links resolve (link checker in CI)
- Form submission verified end-to-end against HubSpot sandbox

---

## Content Reference

All page copy lives in `KOMBATIX_SITE_V2.docx`. When building a page, copy from the doc rather than paraphrasing. The doc has been reviewed and approved — unreviewed paraphrasing reintroduces errors.

---

## Blog

`blog.kombatix.io` is a separate WordPress install, not part of this repo. It is kept as-is with non-blog pages set to Draft. Do not attempt to modify WordPress from this repo.

Lumis AI automated posting turns on after the main site is live and stable. Configuration lives in the LUMIS AI dashboard, not here.

---

## Account Lock

This repo is locked to:
- **GitHub:** `kombatix/kombatix-website`
- **Firebase / GCP Project:** `kombatix-website` (project number 614939493231)
- **Google Account:** `operations@kombatix.io`

See `CLAUDE.md` section 1 for session-start verification commands. Do not commit code from the wrong Google account or Firebase project — Darrel operates across PeopleFinders, Big Fat Dad, and Kombatix accounts simultaneously.
