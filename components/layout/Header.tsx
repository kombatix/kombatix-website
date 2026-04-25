"use client";

import Link from "next/link";
import { useState, useRef, useEffect, useId } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";

// DESIGN.md §7.1 — Global navigation.
// - bg-navy/95 with backdrop-blur
// - 72px desktop / 64px mobile height
// - Sticky, z-50
// - Logo left; center nav; Sign In + Get Started right
// - Products ▾ dropdown reveals Defense + PreAuth
// - Hamburger menu below md breakpoint
// - NEVER ALL CAPS. NEVER a "Solutions" or "Network" standalone item.

const SIGNUP_URL = "https://app.kombatix.ai/signup";
const SIGNIN_URL = "https://app.kombatix.ai/login";

const NAV_ITEMS: { label: string; href: string }[] = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "Partners", href: "/partners" },
  { label: "API", href: "/api" },
  { label: "Blog", href: "https://blog.kombatix.io" },
];

const PRODUCTS = [
  {
    label: "Defense",
    description: "Dispute-time identity scoring (API)",
    href: "/defense",
  },
  {
    label: "PreAuth",
    description: "Pre-authorization network check (API)",
    href: "/preauth",
  },
  {
    label: "Web Portal Access",
    description: "No-code Defense scoring in your browser",
    href: "/web-portal",
  },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const productsRef = useRef<HTMLLIElement>(null);
  const productsButtonId = useId();
  const productsMenuId = useId();

  // Close products dropdown on outside click
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (
        productsRef.current &&
        !productsRef.current.contains(e.target as Node)
      ) {
        setProductsOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setProductsOpen(false);
        setMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-navy/95 backdrop-blur border-b border-white/5">
      <nav
        aria-label="Main navigation"
        className="mx-auto max-w-container px-6 md:px-8 lg:px-12 h-16 md:h-[72px] flex items-center justify-between"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-white font-bold text-xl tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
          aria-label="Kombatix home"
        >
          <span>Kombatix</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {/* Products dropdown */}
          <li className="relative" ref={productsRef}>
            <button
              id={productsButtonId}
              aria-haspopup="menu"
              aria-expanded={productsOpen}
              aria-controls={productsMenuId}
              onClick={() => setProductsOpen((o) => !o)}
              className={cn(
                "text-white/80 hover:text-white inline-flex items-center gap-1 py-2",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded",
              )}
            >
              Products
              <ChevronDown
                className={cn(
                  "w-4 h-4 transition-transform",
                  productsOpen && "rotate-180",
                )}
                aria-hidden="true"
              />
            </button>
            {productsOpen && (
              <div
                id={productsMenuId}
                role="menu"
                aria-labelledby={productsButtonId}
                className="absolute top-full left-0 mt-2 w-72 bg-navy-light border border-white/10 rounded-xl p-2 shadow-xl"
              >
                {PRODUCTS.map((p) => (
                  <Link
                    key={p.href}
                    href={p.href}
                    role="menuitem"
                    onClick={() => setProductsOpen(false)}
                    className="block rounded-lg px-4 py-3 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <span className="block text-white font-semibold">
                      Kombatix {p.label}
                    </span>
                    <span className="block text-white/60 text-body-sm mt-0.5">
                      {p.description}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </li>

          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-white/80 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded py-2"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={SIGNIN_URL}
            className="text-white/80 hover:text-white text-body font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded px-2 py-2"
          >
            Sign In
          </a>
          <Button href={SIGNUP_URL} variant="primary" size="sm">
            Get Started
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden text-white p-2 -mr-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-navy border-t border-white/10"
        >
          <ul className="px-6 py-4 space-y-1">
            {PRODUCTS.map((p) => (
              <li key={p.href}>
                <Link
                  href={p.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 text-white/90 hover:text-white"
                >
                  Kombatix {p.label}
                  <span className="block text-white/60 text-body-sm">
                    {p.description}
                  </span>
                </Link>
              </li>
            ))}
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 text-white/90 hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-4 space-y-3 border-t border-white/10 mt-4">
              <a
                href={SIGNIN_URL}
                className="block py-2 text-white/80 hover:text-white"
              >
                Sign In
              </a>
              <Button href={SIGNUP_URL} variant="primary" className="w-full text-center">
                Get Started
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
