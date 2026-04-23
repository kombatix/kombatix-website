# Kombatix Design System

This file is the source of truth for Kombatix's visual design. It applies to every page in this repo and to any future surface (OG images, emails, in-app UI). When a design decision isn't covered here, default to consistency with what's already built rather than inventing something new — and update this file if you add a new pattern.

---

## 1. Vision & Strategy

Kombatix is a high-performance B2B platform for real-time identity scoring. The visual strategy is **hybrid light/dark** — dark sections for emotional weight, light sections for readable content. Full dark-throughout signals "dev tool." Full light-throughout reads as generic SaaS. Hybrid gets us the credibility of both.

**Dark sections** — "brand moments":
- Navigation
- Hero
- Trust bar (continuous with hero)
- Network Effect callouts
- Footer CTA band
- Footer

**Light sections** — "knowledge moments":
- Two-product panels
- Problem / gap explainers
- Customer outcomes and stat cards
- Pricing cards and tables
- FAQ sections
- Partners content
- Developer-facing content (API page)

Reference patterns: Stripe, Plaid, Checkr, Modern Treasury. Hybrid, not dark-throughout.

---

## 2. Color System

### Brand Colors (locked — match brand guide)

| Token | Hex | Usage |
|---|---|---|
| `navy` | `#071325` | Primary dark background. Hero, nav, footer, dark sections. |
| `navy-light` | `#0F1E3A` | Dark-card background sitting on navy. Subtle elevation. |
| `accent` | `#005B9D` | Primary CTAs, key links, data-viz primary markers. |
| `accent-hover` | `#004A82` | CTA hover state. |
| `teal` | `#0EADA5` | Eyebrows, secondary highlights, accent data points. |

### Neutral Scale

| Token | Hex | Usage |
|---|---|---|
| `white` | `#FFFFFF` | Primary background for light sections. |
| `off-white` | `#F8FAFC` | Subtle container / alternate light background. |
| `gray-50` | `#F9FAFB` | Muted card backgrounds on light. |
| `gray-200` | `#E2E8F0` | Borders on light cards. |
| `gray-500` | `#64748B` | Muted supporting text on light. |
| `gray-600` | `#475569` | Body sub-text on light. |
| `gray-900` | `#071325` | Same as navy — used as primary text on light backgrounds. |

### Score Dial Zones (Defense Score visualization only)

| Token | Hex | Score Range | Semantic |
|---|---|---|---|
| `score-high` | `#10B981` | 80–100 | Confirmed friendly fraud (green) |
| `score-mid` | `#F59E0B` | 50–79 | Review warranted (amber) |
| `score-low` | `#EF4444` | 0–49 | Possible true fraud (red) |

### Text Colors

**On dark backgrounds:**
- Primary: `#FFFFFF`
- Secondary: `rgba(255, 255, 255, 0.72)`
- Muted: `rgba(255, 255, 255, 0.56)`

**On light backgrounds:**
- Primary: `navy` (#071325)
- Secondary: `gray-600` (#475569)
- Muted: `gray-500` (#64748B)

---

## 3. Typography

**Typeface:** Inter (primary), JetBrains Mono (code blocks only).

Loaded via `next/font/google` in `app/layout.tsx`. CSS variables: `--font-inter`, `--font-jetbrains-mono`.

### Type Scale

| Token | Size (desktop) | Size (mobile) | Weight | Line-height | Tracking | Use |
|---|---|---|---|---|---|---|
| `hero` | 4rem (64px) | 2.5rem (40px) | 700 | 1.1 | -0.02em | Hero headlines only |
| `display` | 2.75rem (44px) | 2rem (32px) | 700 | 1.15 | -0.01em | Section headlines |
| `h2` | 2rem (32px) | 1.75rem (28px) | 700 | 1.2 | -0.01em | Sub-section headers |
| `h3` | 1.5rem (24px) | 1.375rem (22px) | 600 | 1.3 | 0 | Card titles |
| `h4` | 1.25rem (20px) | 1.125rem (18px) | 600 | 1.4 | 0 | Small headers |
| `body-lg` | 1.125rem (18px) | 1rem (16px) | 400 | 1.6 | 0 | Hero subheadlines, intro paragraphs |
| `body` | 1rem (16px) | 0.9375rem (15px) | 400 | 1.6 | 0 | Default body |
| `body-sm` | 0.875rem (14px) | 0.875rem (14px) | 400 | 1.5 | 0 | Captions, footnotes |
| `eyebrow` | 0.875rem (14px) | 0.8125rem (13px) | 700 | 1 | 0.1em | Eyebrow tags (uppercase) |
| `mono` | 0.875rem (14px) | 0.8125rem (13px) | 400 | 1.5 | 0 | Code blocks |

### Tailwind class map

In `tailwind.config.ts` these are exposed as custom `fontSize` keys. Use via `text-hero`, `text-display`, etc. Responsive sizing via `clamp()` or Tailwind responsive prefixes.

---

## 4. Spacing & Layout

### Container

- Max-width: **1200px** (`max-w-container` in Tailwind).
- Horizontal padding: `px-6` (24px) mobile, `px-8` (32px) tablet, `px-12` (48px) desktop.
- All content sits inside this container except full-bleed section backgrounds.

### Section Rhythm

- Standard section vertical padding: `py-16` (64px) mobile, `py-24` (96px) desktop.
- Tight sections (trust bar, footer CTA band): `py-8` (32px) mobile, `py-12` (48px) desktop.
- Full-bleed hero: `min-h-[90vh]` with internal content vertically centered.

### Vertical Rhythm Inside Sections

- Section label (eyebrow) → headline: `mt-3` (12px)
- Headline → subheadline/body: `mt-6` (24px)
- Body → primary CTA: `mt-10` (40px)
- Between stacked cards in a section: `mt-12` (48px)

### Grid

- Two-column layouts: `grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12`
- Three-column layouts (stat cards, pricing): `grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8`
- Four-column footer: `grid grid-cols-2 md:grid-cols-4 gap-8`

---

## 5. Section Rhythm (Hybrid Pattern)

Pages alternate light and dark. A page never has two dark sections or two light sections adjacent unless the second is a visually distinct treatment (e.g., footer sitting directly under footer CTA band is fine — both dark, but the CTA band is a punch and the footer is information).

**Canonical homepage rhythm:**
1. Nav + Hero + Trust bar → **DARK** (continuous band, no visible break)
2. Two-product panel → **LIGHT**
3. Problem / Gap → **LIGHT** (same background or slight off-white variation)
4. Network Effect → **DARK** (punch moment)
5. Customer Outcomes → **LIGHT**
6. Pricing Preview → **LIGHT**
7. Partners Teaser → **LIGHT** (off-white for subtle differentiation)
8. Footer CTA Band → **DARK** (punch)
9. Footer → **DARK**

**Transition rule:** no fancy gradient or diagonal transitions between light and dark sections. Hard edge, full-bleed. The break itself is the design.

---

## 6. Responsive Breakpoints

| Name | Min width | Tailwind prefix |
|---|---|---|
| Mobile | 0 | (default) |
| Tablet | 768px | `md:` |
| Desktop | 1024px | `lg:` |
| Wide | 1280px | `xl:` |

**Breakpoint rules:**
- Mobile-first in CSS: design at mobile, use `md:` and `lg:` to add complexity.
- Hero is single-column on mobile (score dial stacks below headline).
- Two-product panel collapses to single column on mobile.
- Three-column stat cards collapse to single column on mobile, stay three on tablet+.
- Pricing cards: single column mobile, three across on desktop.
- Nav collapses to hamburger menu below `md`.

---

## 7. Component Specifications

### 7.1 Global Navigation

- Background: `bg-navy/95 backdrop-blur`
- Height: 72px desktop, 64px mobile
- Sticky (`position: sticky; top: 0; z-50`)
- Logo: left-aligned, 32px height
- Nav items (desktop, center): sentence case, `text-white/80 hover:text-white`, gap-8
- Dropdown: `Products ▾` reveals Defense + PreAuth on hover/focus
- Right side: `Sign In` as ghost link + `Get Started` primary button
- Mobile: hamburger menu, full-height slide-in panel
- **Never** use ALL CAPS nav items
- **Never** include "Solutions" or "Network" as standalone nav items

### 7.2 Buttons

**Primary**
```
bg-accent text-white font-semibold px-6 py-3 rounded-lg
hover:bg-accent-hover transition-colors
focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-navy
```

**Ghost (on dark)**
```
border border-white/20 text-white font-semibold px-6 py-3 rounded-lg
hover:bg-white/5 transition-colors
focus-visible:ring-2 focus-visible:ring-white/40
```

**Ghost (on light)**
```
border border-gray-200 text-navy font-semibold px-6 py-3 rounded-lg
hover:bg-gray-50 transition-colors
```

**Link-style CTA** (used inside cards)
```
text-accent font-semibold inline-flex items-center gap-1
hover:underline
```

**Sizes:**
- Default: `px-6 py-3` (used above)
- Large: `px-8 py-4 text-lg` (hero primary only)
- Small: `px-4 py-2 text-sm` (trust bar, footer, tight contexts)

### 7.3 Eyebrow Tags

```
text-eyebrow text-teal uppercase tracking-[0.1em] font-bold
```

Sits directly above section headlines. Always teal. Uppercase. Letter-spaced. Never bolded differently. Never underlined. Never used as a link target.

### 7.4 Cards — Light Sections

Default card on a light section:
```
bg-white border border-gray-200 rounded-xl p-8 md:p-12
```

Alternate: `bg-off-white` for the card on a white-page-background case.

### 7.5 Cards — Dark Sections

Default card on a dark section:
```
bg-navy-light border border-white/10 rounded-xl p-8 md:p-12
```

### 7.6 Stat Cards (Customer Outcomes)

Used in light sections. Three across on desktop.

```
bg-white border border-gray-200 rounded-xl p-8
```

Internal structure:
- Stat number: `text-display text-accent font-bold` (e.g., "10% → 5%")
- Stat label: `text-h4 text-navy font-semibold mt-2`
- Body: `text-body text-gray-600 mt-4`

Stats use the **before → after** pattern (e.g., "Refund Rate: 10% → 5%", "Representment Wins: 40% → 80%") where applicable. This is more credible than a single percentage.

### 7.7 Pricing Cards

Three across on desktop. Middle card (recommended tier) gets a highlight treatment.

Default:
```
bg-white border border-gray-200 rounded-xl p-8
```

Recommended (middle) card:
```
bg-white border-2 border-accent rounded-xl p-8 relative
```

With a ribbon:
```
Ribbon: absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white 
        text-body-sm font-semibold px-4 py-1 rounded-full
```

Structure inside card:
- Plan name: `text-h3 text-navy font-semibold`
- Price: `text-display text-navy font-bold` (e.g., "$75")
- Period: `text-body text-gray-500` (e.g., "/month")
- Feature list: `ul` with check-icon prefixes, `text-body text-gray-600`
- Primary CTA button at the bottom

### 7.8 CTA Band (Footer CTA)

Full-bleed dark section:
```
bg-navy py-16 md:py-24
```

Internal layout: two-column on desktop (headline left, button right), stacked on mobile. The button here should feel like a **punch** — use the primary button style at large size with a subtle glow:

```
bg-accent text-white font-semibold px-10 py-5 text-lg rounded-lg
shadow-[0_0_32px_rgba(0,91,157,0.4)] hover:shadow-[0_0_48px_rgba(0,91,157,0.6)]
transition-shadow
```

Headline on left: `text-display text-white font-bold`.

### 7.9 Footer

Full-bleed `bg-navy`. Four-column grid on desktop.

Column headers: `text-eyebrow text-white uppercase tracking-[0.1em] font-bold mb-4`
Column links: `text-body text-white/70 hover:text-white`, stacked with `gap-3`

Bottom bar (separated by `border-t border-white/10 mt-12 pt-6`):
- Left: Kombatix logo + copyright text (`text-body-sm text-white/60`)
- Right: Social icons if present, muted
- Never put legal disclosure text in the bottom bar — keep it in the Legal column

### 7.10 Forms (Partner Inquiry)

Form lives on light background. Input styling:

**Text input / email / textarea:**
```
w-full bg-white border border-gray-200 rounded-lg px-4 py-3
text-body text-navy placeholder:text-gray-500
focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none
```

**Select (dropdown):**
Same as text input + chevron icon on right.

**Label:**
```
text-body-sm text-navy font-semibold mb-2 block
```

**Required indicator:** red asterisk (`text-red-500`) after label text.

**Error state:** `border-red-500` on input; error message below in `text-body-sm text-red-600 mt-1`.

**Submit button:** primary button, full-width on mobile, inline on desktop.

**Honeypot field:** rendered with `tabIndex={-1}` + `autoComplete="off"` + `style={{ display: "none" }}`. Never visible.

**Success state:** replace form entirely with a success message on successful submission. Don't show a toast and keep the form — the form disappearing is the signal.

### 7.11 Tables (Feature Comparison, Pricing Comparison)

Semantic `<table>` with `<caption>` for accessibility.

```
w-full text-left
thead: bg-navy text-white text-body-sm font-semibold uppercase tracking-wide
th: py-4 px-6
tbody tr: border-b border-gray-200
td: py-4 px-6 text-body text-navy
```

Alternating row backgrounds not needed — the borders handle rhythm.

Checkmarks: use Lucide `Check` icon in `text-accent`. Em dashes for missing features (`—` in `text-gray-400`).

### 7.12 Code Blocks (API Page)

```
bg-navy-light border border-white/10 rounded-lg p-6
font-mono text-mono text-white/90
```

Inside, syntax highlighting is optional — for a marketing page, clean monospace is enough. If we want syntax highlighting, use `prism-react-renderer` with a dark theme. Never use an online syntax highlighter at runtime.

Copy button in top-right of code block (ghost-style, small icon).

### 7.13 FAQ Accordion

Used on `/pricing` and `/how-it-works`.

Item structure:
```
border-b border-gray-200 py-6

Question button (full-width, left-aligned):
  text-h4 text-navy font-semibold flex items-center justify-between
  aria-expanded="true"/"false"
  Chevron rotates 180° when expanded

Answer (revealed on expand):
  text-body text-gray-600 pt-4 leading-relaxed
```

Keyboard accessible — space/enter toggle, focus-visible ring on the button.

First sentence of every answer must be a **direct, quotable answer under 25 words**. This is the AEO extraction target. See architecture doc Section 4.

### 7.14 Trust Bar

Thin band directly below hero, same dark background. Horizontal list of text badges separated by middle dots:

```
flex items-center justify-center gap-8 py-6
text-body-sm text-white/70 font-medium
```

Divider dot between items: `•` rendered as a separate span in `text-white/40`.

Current approved content: "API-First · REST Integration · Self-Service Portal · SOC 2 In Progress · No Long-Term Contract".

**DO NOT** change "SOC 2 In Progress" to "SOC 2 Type II" or any other certification status. This is a compliance statement.

---

## 8. Data Visualization

### Defense Score Dial

- **Always call it Defense Score or Kombatix Defense Score.** Never "Risk Score." Never "Score." Never "Fraud Score." This is a competitor terminology issue — "RiskScore" is a Kount-owned term.
- Built as a React/SVG component (see `components/score-dial/`). Never an AI-generated image.
- Three color zones using `score-low`, `score-mid`, `score-high` tokens.
- Score number is brand accent blue (`accent`) when highlighting product capability; uses zone color when showing an actual score result.
- Animates on mount if `prefers-reduced-motion` is not set; static if it is.

### Charts / Graphs (if added later)

- Line/bar charts use `accent` (primary) and `teal` (secondary).
- Axis labels in `gray-500` on light, `white/60` on dark.
- Grid lines in `gray-200` on light, `white/10` on dark.

### Network Diagrams

- Generated via Nano Banana Pro (`gemini-3-pro-image-preview`). Static PNG assets.
- Dark navy background to match dark sections.
- Primary flow lines in `accent`, secondary in `teal`.
- Nodes are white or near-white circles with subtle glow.

---

## 9. Icon System

**Library:** Lucide React (`lucide-react` package).

**Default size:** 20px (`size={20}` or `w-5 h-5`).

**Stroke weight:** 2 (Lucide default).

**Color:** inherits from parent text color unless explicitly overridden.

**Common icons:**
- Arrow right: `ArrowRight` (CTAs)
- Check: `Check` (feature lists, included items)
- Chevron down: `ChevronDown` (dropdowns, FAQ)
- External link: `ExternalLink` (links to blog, external docs)
- Shield: `Shield` (security/trust contexts only — use sparingly)

**Do not use:**
- Lock icons for "security" — feels generic B2B
- Handshake icons for "partnerships" — feels 2010s
- Three-stacked-books icons for anything

---

## 10. Motion & Animation

**Principles:**
- Motion should amplify, not decorate. If an animation doesn't communicate state change, cut it.
- Respect `prefers-reduced-motion`. Every animation should have a reduced-motion fallback.

**Standard durations:**
- Micro-interactions (button hover, link underline): 150ms
- Card/section fade-in: 400ms
- Page transitions (if added): 200ms
- Score dial needle sweep: 1200ms (one-time, on mount)

**Easing:**
- Default: `ease-out` for things appearing, `ease-in` for things disappearing
- Spring-y animations: use Framer Motion with `type: "spring"` sparingly

**Do not:**
- Parallax-scroll hero backgrounds
- Animate large elements continuously (looping animations are distracting)
- Fade in every section on scroll — only use `IntersectionObserver` fade-ins for sections where it genuinely aids comprehension (e.g., network diagram, score dial)

---

## 11. Accessibility & Focus States

**Focus visibility — non-negotiable.**

Every interactive element has a visible focus ring when navigated via keyboard:

```
focus-visible:outline-none focus-visible:ring-2 
focus-visible:ring-accent focus-visible:ring-offset-2 
focus-visible:ring-offset-navy   (adjust offset color for context)
```

**Color contrast:**
- Body text on dark: must meet WCAG AA (4.5:1). `white/72` on `navy` passes.
- Body text on light: `gray-600` on white passes AA.
- Button text on accent: white on `#005B9D` passes AAA.
- Muted text: `white/56` on `navy` may dip below AA; reserve for decorative context only (footnotes, deemphasized metadata), never body copy.

**Semantic HTML:**
- Use real `<button>` for buttons, `<a>` for links. Never `<div onClick>`.
- Headings are hierarchical — one `<h1>` per page, `<h2>` for sections, `<h3>` for cards. Don't skip levels.
- Form inputs have associated `<label>` elements (use `htmlFor` matching `id`).
- Landmarks: `<header>`, `<nav>`, `<main>`, `<footer>` used correctly.

**Reduced motion:**
- Score dial animation disabled under `prefers-reduced-motion: reduce`
- Any fade-in/slide-in animations become instant
- Hover scale effects removed

**Keyboard navigation:**
- Tab order follows visual order
- Products dropdown opens on Enter/Space and closes on Escape
- FAQ accordion expands on Enter/Space
- Modal/dialog (if added) traps focus and closes on Escape

---

## 12. OG Image Design

All OG images are pre-rendered, not runtime-generated. Dimensions: 1200×630.

**Template:**
- Background: `navy` solid
- Kombatix logo top-left, 80px tall, with 60px padding
- Page title centered vertically, `text-hero` scaled to fit, white
- Accent element per page:
  - Homepage: score dial graphic at right
  - /defense: three-engine icon stack
  - /preauth: network node graphic
  - /pricing: pricing tier cards miniaturized
- Generated via Nano Banana Pro (`gemini-3-pro-image-preview`) for sharp text rendering
- Stored in `public/og/<route>.png`

---

## 13. Class & Component Naming Conventions

**Components:** PascalCase. Files match component name: `ScoreDial.tsx`, `PricingCard.tsx`.

**Folders:** kebab-case. `components/score-dial/`, `components/layout/`.

**Custom utility classes in globals.css:** kebab-case, prefix-free. `.btn-primary`, `.btn-ghost`, `.section`, `.container-page`.

**Tailwind composition:** prefer inline Tailwind utilities for one-off styling. Extract to a custom class only when a pattern repeats 3+ times across components.

**CSS variables in `:root`:** kebab-case with `--` prefix. Match Tailwind tokens: `--color-navy: #071325`.

---

## 14. Prohibited Elements

Hard prohibitions — if any of these appear in a generated page, they are build errors that must be fixed before merge:

- **"Risk Score"** used anywhere as a label or in body copy (use Defense Score)
- **All-caps navigation** (sentence case only)
- **Stock photography** of people, handshakes, generic security imagery
- **Lock icons** used as decorative elements (use only with specific security context)
- **Handshake icons** used anywhere
- **Emojis** in body copy or UI labels
- **Dead space above the hero** (hero starts directly below nav)
- **"Solutions" or "Network"** as top-level nav items (Network is a cross-cutting story, not a page)
- **Uncited stats** ("$100B friendly fraud market" without a current-year source)
- **Redundant nav items** (Products dropdown AND flat Defense/PreAuth links — pick one)
- **"SOC 2 Type II"** or any other certification claim beyond "SOC 2 In Progress" (compliance issue)
- **"Block stolen credentials"** or similar fraud-prevention framing (wrong product positioning)
- **Per-transaction pricing in copy** ($0.02/transaction, $0.50/dispute) — the model is monthly tiers
- **Fabricated customer metrics** — only use approved figures from the architecture doc
- **"Free" framing around sub-60 Defense scoring** — use "pay for actionable outcomes"
- **OmniScore** terminology anywhere (Kount-owned term)
- **GTM** (Google Tag Manager) — GA4 only, direct install
- **localStorage / sessionStorage** anywhere in page code
- **HubSpot JS embed** — the form submits server-side via the Cloud Function

---

## 15. When to Update This File

Update `DESIGN.md` when:
- A new component pattern is added that will be reused
- A design token (color, font size, spacing) is added or changed
- A new prohibition is identified (e.g., a new competitor term to avoid)
- A new responsive breakpoint is added
- An accessibility requirement is discovered

Do **not** update this file for:
- One-off decorative choices used on a single page
- Experimental styles that haven't been adopted across the system

Every change to this file requires a commit message that starts with `docs(design):`.
