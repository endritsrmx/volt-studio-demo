export const BP = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** Intro animation variant (1 = classic, 2 = pixel-jump, 3 = pixel-jump + loading bar).
 *  Files expected in /public/intro/intro-{n}.mp4, intro-{n}.webm, intro-{n}-final.png */
export const INTRO_VARIANT: 1 | 2 | 3 = 3;
export const INTRO_ENABLED = true;

/** Central brand + contact config for endrIT Solutions. Texts live in src/i18n/dict.ts */
const site = {
  name: "endrIT Solutions",
  owner: "Endrit Sermaxhaj",
  logo: `${BP}/brand/logo.svg`,
  logoWhite: `${BP}/brand/logo-white.svg`,
  contact: {
    email: "esermaxhaj@icloud.com",
    phone: "+41 79 788 54 21",
    phoneHref: "+41797885421",
    country: "CH",
  },
  /** Colours derived from the logo: brand purple #3E02B2, pixel cyan #27DAF2 (RGB triplets) */
  theme: {
    bg: "10 5 30",
    fg: "246 244 255",
    accent: "39 218 242",
    accentInk: "10 5 30",
    muted: "170 162 205",
    panel: "255 255 255",
    gradientFrom: "#0A051E",
    gradientTo: "#3E02B2",
  },
  motion: { smoothScroll: true, pageTransitions: true },
  seo: {
    title: "endrIT Solutions – IT-Dienstleistungen, Webdesign & Social Media | Schweiz",
    titleTemplate: "%s | endrIT Solutions",
    description:
      "endrIT Solutions von Endrit Sermaxhaj in der Schweiz: IT-Support, Netzwerke, Einrichtung und Wartung, Webdesign und Website-Redesign inkl. 1 Jahr Wartung sowie Social-Media-Betreuung für Instagram und TikTok.",
    keywords: [
      "IT-Dienstleistungen", "IT-Support", "Informatiker Schweiz", "Netzwerk", "Webdesign", "Website-Redesign",
      "Social-Media-Betreuung", "Instagram", "TikTok", "Schweiz", "endrIT Solutions",
    ],
    ogImage: "./og.png", // relative to metadataBase (which already contains the basePath),
    locale: "de_CH",
  },
};

export default site;
