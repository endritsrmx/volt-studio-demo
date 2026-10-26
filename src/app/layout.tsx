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
import { INTRO_ENABLED } from "@/config/site";
import IntroOverlay from "@/components/site/IntroOverlay";
import { LangProvider } from "@/i18n/LangProvider";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { BP } from "@/config/site";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: site.seo.title, template: site.seo.titleTemplate },
  description: site.seo.description,
  keywords: site.seo.keywords,
  applicationName: site.name,
  authors: [{ name: site.owner }],
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.seo.title,
    description: site.seo.description,
    locale: site.seo.locale,
    url: "./",
    images: [{ url: site.seo.ogImage, width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: "summary_large_image", title: site.seo.title, description: site.seo.description, images: [site.seo.ogImage] },
  icons: {
    icon: [{ url: `${BP}/favicon.ico`, sizes: "any" }, { url: `${BP}/favicon.svg`, type: "image/svg+xml" }],
    apple: `${BP}/apple-touch-icon.png`,
  },
};

export const viewport: Viewport = {
  themeColor: "#0A051E",
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
  "@type": "ProfessionalService",
  name: site.name,
  url: siteUrl,
  logo: `${siteUrl}/brand/logo.png`,
  image: `${siteUrl}/og.png`,
  description: site.seo.description,
  email: site.contact.email,
  telephone: site.contact.phone,
  founder: { "@type": "Person", name: site.owner, jobTitle: "Informatiker" },
  address: { "@type": "PostalAddress", addressCountry: site.contact.country },
  areaServed: [{ "@type": "Country", name: "Schweiz" }],
  knowsLanguage: ["de-CH", "en"],
  makesOffer: ["IT-Dienstleistungen", "Webdesign & Website-Redesign", "Social-Media-Betreuung"].map((n) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: n } })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de-CH" style={themeVars} suppressHydrationWarning>
      <head>
        {/* mark JS early so reveal initial states apply without a flash */}
        <script dangerouslySetInnerHTML={{ __html: INTRO_ENABLED
              ? "(function(){var h=document.documentElement;h.classList.add('js','intro');setTimeout(function(){if(!window.__introDone){window.__introDone=true;h.classList.remove('intro');window.dispatchEvent(new Event('intro:done'));}},9000)})()"
              : "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <UIProvider>
          <LangProvider>
            <SmoothScroll>
              <Header />
              <main id="main">{children}</main>
              <Footer />
              <Transitions />
              {INTRO_ENABLED && <IntroOverlay />}
            </SmoothScroll>
          </LangProvider>
        </UIProvider>
      </body>
    </html>
  );
}
