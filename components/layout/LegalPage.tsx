import { type ReactNode } from "react";
import { PageShell } from "@/components/layout/PageShell";

interface LegalPageProps {
  title: string;
  lastUpdated: string;       // e.g. "March 1, 2025"
  children: ReactNode;
}

// Shared layout for legal pages (Privacy, Terms, etc.).
// Renders a long-form document inside a constrained reading column with
// generous typography. Uses semantic <article> for the body content.
export function LegalPage({ title, lastUpdated, children }: LegalPageProps) {
  return (
    <PageShell>
      <section className="bg-white text-navy">
        <div className="mx-auto max-w-3xl px-6 md:px-8 lg:px-12 py-16 md:py-24">
          <header className="mb-12">
            <h1 className="text-display text-navy">{title}</h1>
            <p className="mt-3 text-body text-gray-500">
              Last updated: {lastUpdated}
            </p>
          </header>

          <article
            className={[
              // Base spacing & color
              "text-body text-gray-700 leading-relaxed",
              // Headings
              "[&_h2]:text-h2 [&_h2]:text-navy [&_h2]:font-bold [&_h2]:mt-12 [&_h2]:mb-4",
              "[&_h3]:text-h3 [&_h3]:text-navy [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3",
              "[&_h4]:text-h4 [&_h4]:text-navy [&_h4]:font-semibold [&_h4]:mt-6 [&_h4]:mb-2",
              // Paragraphs and lists
              "[&_p]:mt-4 [&_p:first-child]:mt-0",
              "[&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2",
              "[&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2",
              "[&_li]:text-body [&_li]:text-gray-700",
              // Inline emphasis + links
              "[&_strong]:text-navy [&_strong]:font-semibold",
              "[&_a]:text-accent [&_a]:font-medium hover:[&_a]:underline",
              // Tables (used in CCPA section)
              "[&_table]:mt-6 [&_table]:w-full [&_table]:text-left [&_table]:border [&_table]:border-gray-200",
              "[&_th]:bg-navy [&_th]:text-white [&_th]:text-body-sm [&_th]:font-semibold [&_th]:uppercase [&_th]:tracking-wide [&_th]:py-3 [&_th]:px-4",
              "[&_td]:py-3 [&_td]:px-4 [&_td]:border-t [&_td]:border-gray-200 [&_td]:align-top [&_td]:text-body-sm",
              // <hr> dividers
              "[&_hr]:my-12 [&_hr]:border-gray-200",
            ].join(" ")}
          >
            {children}
          </article>
        </div>
      </section>
    </PageShell>
  );
}
