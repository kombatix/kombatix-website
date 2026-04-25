import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kombatix.io";
const GA4_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Kombatix — Identity Scoring for Friendly Fraud Defense",
    template: "%s | Kombatix",
  },
  description:
    "Real-time identity scoring to fight friendly fraud at pre-auth and at dispute. Three products, one network. Start free.",
  openGraph: {
    type: "website",
    siteName: "Kombatix",
    url: SITE_URL,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@kombatix",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* Organization schema — sitewide */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Kombatix",
              url: SITE_URL,
              logo: `${SITE_URL}/logo.png`,
              contactPoint: {
                "@type": "ContactPoint",
                email: "operations@kombatix.io",
                contactType: "Customer Service",
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Eagle",
                addressRegion: "ID",
                addressCountry: "US",
              },
            }),
          }}
        />
      </head>
      <body className="bg-navy text-white antialiased">
        {children}

        {/* GA4 — direct install, no GTM */}
        {GA4_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA4_ID}', { anonymize_ip: true });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
