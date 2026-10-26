import type { Metadata, Viewport } from "next";
import "@fontsource/space-grotesk/300.css";
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/ibm-plex-mono/300.css";
import "@fontsource/ibm-plex-mono/400.css";
import "./globals.css";

import site from "@/config/site";
import { UIProvider } from "@/components/providers/UIProvider";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Transitions from "@/components/providers/Transitions";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MenuModal from "@/components/layout/MenuModal";
import ContactModal from "@/components/layout/ContactModal";
import PageLoader from "@/components/layout/PageLoader";
import Assistant from "@/components/layout/Assistant";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: site.seo.title, template: site.seo.titleTemplate },
  description: site.seo.description,
  keywords: site.seo.keywords,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.seo.title,
    description: site.seo.description,
    locale: site.seo.locale,
    images: [{ url: site.seo.ogImage, width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", creator: site.seo.twitter || undefined },
  icons: { icon: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/favicon.svg` },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

const themeVars = {
  "--c-bg": site.theme.bg,
  "--c-fg": site.theme.fg,
  "--c-accent": site.theme.accent,
  "--c-accent-ink": site.theme.accentInk,
  "--c-muted": site.theme.muted,
  "--c-panel": site.theme.panel,
} as React.CSSProperties;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: siteUrl,
  email: site.contact.email,
  address: site.contact.address,
  sameAs: site.socials.filter((s) => s.href.startsWith("http")).map((s) => s.href),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={themeVars} suppressHydrationWarning>
      <head>
        {/* mark JS early so reveal initial states apply without a flash */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <a
          href="#main"
          className="fixed left-4 top-4 z-[3000] -translate-y-24 rounded-pill bg-accent px-4 py-2 text-black transition-transform focus:translate-y-0"
          data-no-transition
        >
          Skip to content
        </a>
        <UIProvider>
          <SmoothScroll>
            <PageLoader />
            <Navbar />
            <main id="main">{children}</main>
            <Footer />
            <MenuModal />
            <ContactModal />
            <Assistant />
            <Transitions />
          </SmoothScroll>
        </UIProvider>
      </body>
    </html>
  );
}
