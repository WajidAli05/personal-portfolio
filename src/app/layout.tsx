import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, Instrument_Sans } from "next/font/google";
import "./globals.css";

const display = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--f-display", display: "swap" });
const body = Instrument_Sans({ subsets: ["latin"], variable: "--f-body", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--f-mono", display: "swap" });

// DEPLOY STEP: set NEXT_PUBLIC_SITE_URL to the live address (e.g. https://example.com) before
// building for production, so og:url and og:image become absolute URLs.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const description =
  "Wajid Ali is a full-stack engineer in Islamabad who builds clinic systems, online stores and cinematic marketing sites, and co-authored CodeComClassify (IEEE/ACM NLBSE 2025).";

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
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#05070f" }, { media: "(prefers-color-scheme: light)", color: "#eef1f8" }],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" className={`${display.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "try{var d=document.documentElement,t=localStorage.getItem('wa-theme');if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';d.dataset.theme=t;if(!matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('motion');if(sessionStorage.getItem('wa-intro')==='1')d.classList.add('intro-seen')}catch(e){document.documentElement.dataset.theme='dark'}" }} />
      </head>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
