import { type ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

interface PageShellProps {
  children: ReactNode;
}

// PageShell wraps page content with Header + <main> + Footer so each
// page file only has to worry about its own sections. Semantic landmarks
// (header, main, footer) are provided here.
export function PageShell({ children }: PageShellProps) {
  return (
    <>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}
