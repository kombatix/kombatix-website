#!/usr/bin/env node
/**
 * generate-llms-full.mjs
 *
 * Reads the built HTML pages from out/ and writes a concatenated text
 * representation to public/llms-full.txt (so it ships in the NEXT build
 * that Firebase deploys). Consumed by LLMs doing deep grounding research
 * on Kombatix.
 *
 * Runs as `postbuild` in package.json. Pure Node 20+, no external deps.
 *
 * Per KOMBATIX_SITE_V2.docx §4:
 *   - Plain text concatenation
 *   - Page delimiters ("=== PAGE: /defense ===")
 *   - Regenerates on every deploy
 */

import { readFile, writeFile, stat } from "node:fs/promises";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const REPO_ROOT = join(__dirname, "..");
const OUT_DIR = join(REPO_ROOT, "out");

// Routes in the order we want them to appear in llms-full.txt.
// Matches sitemap.ts ordering — most important content first.
const ROUTES = [
  { route: "/",              file: "index.html" },
  { route: "/defense",       file: "defense.html" },
  { route: "/preauth",       file: "preauth.html" },
  { route: "/how-it-works",  file: "how-it-works.html" },
  { route: "/pricing",       file: "pricing.html" },
  { route: "/partners",      file: "partners.html" },
  { route: "/api",           file: "api.html" },
];

// Strip HTML to readable plain text.
// - Removes <script>, <style>, <noscript> blocks entirely.
// - Replaces <br> with \n.
// - Drops all other tags.
// - Decodes a handful of HTML entities.
// - Collapses whitespace.
function htmlToText(html) {
  let s = html;

  // Remove tag blocks whose content is never user-visible.
  s = s.replace(/<script[\s\S]*?<\/script>/gi, "");
  s = s.replace(/<style[\s\S]*?<\/style>/gi, "");
  s = s.replace(/<noscript[\s\S]*?<\/noscript>/gi, "");
  s = s.replace(/<!--[\s\S]*?-->/g, "");

  // Block-level tags → newline before opening
  s = s.replace(
    /<\/?(section|article|header|footer|main|nav|div|p|h[1-6]|li|tr|table|thead|tbody|tfoot|form|fieldset|address|blockquote|pre|aside|figure|figcaption|dt|dd)\b[^>]*>/gi,
    "\n",
  );

  // <br> → newline
  s = s.replace(/<br\s*\/?>/gi, "\n");

  // Strip remaining tags
  s = s.replace(/<[^>]+>/g, "");

  // Decode common entities
  s = s
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&rdquo;/g, "\"")
    .replace(/&ldquo;/g, "\"")
    .replace(/&#x2014;/g, "—")
    .replace(/&#x2013;/g, "–")
    // Numeric entities (decimal)
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(parseInt(n, 10)))
    // Numeric entities (hex)
    .replace(/&#x([0-9a-fA-F]+);/g, (_, n) => String.fromCodePoint(parseInt(n, 16)));

  // Collapse runs of blank whitespace
  s = s.replace(/[ \t]+/g, " ");
  // Collapse runs of 3+ newlines to 2 (empty line = paragraph break)
  s = s.replace(/\n{3,}/g, "\n\n");
  // Trim lines
  s = s
    .split("\n")
    .map((line) => line.trim())
    .filter((line, i, arr) => {
      // Drop consecutive duplicate blank lines
      if (line === "" && arr[i - 1] === "") return false;
      return true;
    })
    .join("\n")
    .trim();

  return s;
}

async function main() {
  // Validate out/ exists
  try {
    await stat(OUT_DIR);
  } catch {
    console.error(`[llms-full] out/ does not exist at ${OUT_DIR}. Skipping.`);
    // Exit 0 — don't fail the build when someone runs the script before a build.
    process.exit(0);
  }

  const parts = [];
  parts.push(
    "# Kombatix — Full Content Grounding File\n" +
      "# This file is a concatenation of the publicly-readable Kombatix marketing\n" +
      "# site pages, stripped to plain text. Intended for LLMs doing deep research\n" +
      "# on Kombatix. Regenerated on every production build.\n" +
      `# Generated: ${new Date().toISOString()}\n`,
  );

  for (const { route, file } of ROUTES) {
    const path = join(OUT_DIR, file);
    let html = "";
    try {
      html = await readFile(path, "utf8");
    } catch (err) {
      console.warn(`[llms-full] Could not read ${relative(REPO_ROOT, path)}: ${err.message}`);
      continue;
    }
    const text = htmlToText(html);
    parts.push(`\n=== PAGE: ${route} ===\n\n${text}`);
  }

  const outText = parts.join("\n");

  // Write only to out/ — this is a build artifact and should not be
  // committed. The static export copies public/* into out/ at build time,
  // but postbuild runs AFTER that, so writing to out/ directly is correct.
  const outDestPath = join(OUT_DIR, "llms-full.txt");
  await writeFile(outDestPath, outText, "utf8");
  console.log(
    `[llms-full] wrote ${outText.length.toLocaleString()} chars to ${relative(
      REPO_ROOT,
      outDestPath,
    )}`,
  );
}

main().catch((err) => {
  console.error("[llms-full] failed:", err);
  process.exit(1);
});
