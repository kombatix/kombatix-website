import Link from "next/link";

// DESIGN.md §7.9 — Footer
// Full-bleed bg-navy. 4-column grid on desktop.
// Column headers: eyebrow white uppercase.
// Links: body text, white/70 → white on hover.
// Bottom bar separated by border-t white/10, with logo + copyright.
//
// Current 4-column layout:
//   Product: Defense, PreAuth, Web Portal, How It Works, Pricing, API
//   Company: Partners, Blog, Contact
//   Legal:   Privacy Policy, Terms of Service
//            (Opt-Out intentionally NOT included — Kombatix is a service
//             provider not a data broker, so CCPA/CPRA opt-out-of-sale and
//             broker-registration regimes don't apply. Privacy rights are
//             handled inside the Privacy Policy itself.)
//   Contact: operations@kombatix.io, (208) 944-1422,
//            Kombatix, LLC, 2976 E State St, STE 120-2914, Eagle, ID 83616

const FOOTER_COLUMNS = [
  {
    heading: "Product",
    links: [
      { label: "Defense", href: "/defense" },
      { label: "PreAuth", href: "/preauth" },
      { label: "Web Portal", href: "/web-portal" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Pricing", href: "/pricing" },
      { label: "API", href: "/api" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Partners", href: "/partners" },
      { label: "Blog", href: "https://blog.kombatix.io" },
      { label: "Contact", href: "mailto:operations@kombatix.io" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-container px-6 md:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {FOOTER_COLUMNS.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h2 className="text-eyebrow text-white uppercase tracking-[0.1em] font-bold mb-4">
                {col.heading}
              </h2>
              <ul className="space-y-3">
                {col.links.map((link) => {
                  const isExternal = link.href.startsWith("http") || link.href.startsWith("mailto:");
                  if (isExternal) {
                    return (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          className="text-body text-white/70 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                        >
                          {link.label}
                        </a>
                      </li>
                    );
                  }
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-body text-white/70 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          ))}

          {/* Contact column — Kombatix, LLC contact info */}
          <div>
            <h2 className="text-eyebrow text-white uppercase tracking-[0.1em] font-bold mb-4">
              Contact
            </h2>
            <ul className="space-y-3 text-body text-white/70">
              <li>
                <a
                  href="mailto:operations@kombatix.io"
                  className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                >
                  operations@kombatix.io
                </a>
              </li>
              <li>
                <a
                  href="tel:+12089441422"
                  className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                >
                  (208) 944-1422
                </a>
              </li>
              <li>
                <address className="not-italic leading-relaxed">
                  Kombatix, LLC
                  <br />
                  2976 E State St, STE 120-2914
                  <br />
                  Eagle, ID 83616
                </address>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-body-sm text-white/60">
            © {year} Kombatix, LLC. All rights reserved.
          </p>
          {/* Social icons placeholder — add when handles confirmed */}
          <div className="text-body-sm text-white/60" aria-hidden="true" />
        </div>
      </div>
    </footer>
  );
}
