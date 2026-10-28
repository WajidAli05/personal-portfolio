import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Calm, modern type: Geist for everything, Geist Mono for small labels and dates.
const sans = Geist({ subsets: ["latin"], variable: "--f-sans", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--f-mono", display: "swap" });

// DEPLOY STEP: set NEXT_PUBLIC_SITE_URL to the live address (e.g. https://example.com) before
// building for production, so og:url and og:image become absolute URLs.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const description =
  "Wajid Ali is a full-stack engineer in Islamabad who builds clinic systems, online stores and marketing websites, and co-authored CodeComClassify (IEEE/ACM NLBSE 2025).";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Wajid Ali · Full-stack engineer",
  description,
  openGraph: {
    title: "Wajid Ali · Full-stack engineer",
    description,
    url: "/",
    siteName: "Wajid Ali",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Wajid Ali, full-stack engineer" }],
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Wajid Ali · Full-stack engineer", description, images: ["/og.png"] },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#f6f5f1",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion')}catch(e){}" }} />
      </head>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
