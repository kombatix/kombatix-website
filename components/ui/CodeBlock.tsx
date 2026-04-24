"use client";

import { type ReactNode, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/cn";

// DESIGN.md §7.12 — Code blocks (API page).
// bg-navy-light border white/10, JetBrains Mono, white/90 text.
// Copy button top-right, ghost-small.
// No runtime syntax highlighting — clean monospace is enough.

interface CodeBlockProps {
  children: string | ReactNode;
  language?: string; // display only (e.g. "http", "json")
  copyText?: string; // defaults to children if string, required otherwise
  className?: string;
  // Show the language badge in the top-left corner
  showLanguageBadge?: boolean;
}

export function CodeBlock({
  children,
  language,
  copyText,
  className,
  showLanguageBadge = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const textToCopy =
    copyText ?? (typeof children === "string" ? children : "");

  async function handleCopy() {
    if (!textToCopy) return;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API fail is non-fatal — user can select manually
    }
  }

  return (
    <div
      className={cn(
        "relative rounded-lg bg-navy-light border border-white/10",
        className,
      )}
    >
      {(language || textToCopy) && (
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
          <span className="text-body-sm text-white/60 font-mono">
            {showLanguageBadge && language ? language : ""}
          </span>
          {textToCopy && (
            <button
              type="button"
              onClick={handleCopy}
              className={cn(
                "text-body-sm text-white/60 hover:text-white/90 inline-flex items-center gap-1.5",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded px-2 py-1",
              )}
              aria-label={copied ? "Code copied" : "Copy code"}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" aria-hidden="true" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" aria-hidden="true" />
                  Copy
                </>
              )}
            </button>
          )}
        </div>
      )}
      <pre className="p-6 overflow-x-auto font-mono text-mono text-white/90 leading-relaxed">
        <code>{children}</code>
      </pre>
    </div>
  );
}
