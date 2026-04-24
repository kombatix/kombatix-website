import type { MetadataRoute } from "next";

// Next.js 15+ sitemap convention. Generates sitemap.xml at build time.
// https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
//
// output: 'export' requires this to be static — evaluated once at build.
export const dynamic = "force-static";

const SITE = "https://kombatix.io";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE}/`,              lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${SITE}/defense`,       lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${SITE}/preauth`,       lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${SITE}/how-it-works`,  lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/pricing`,       lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/partners`,      lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/api`,           lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];
}
