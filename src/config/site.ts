export const BP = process.env.NEXT_PUBLIC_BASE_PATH || "";

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
    postalCode: "5033",
    city: "Buchs AG",
    region: "AG",
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
    title: "endrIT Solutions – IT-Dienstleistungen, Webdesign & Social Media | Buchs AG",
    titleTemplate: "%s | endrIT Solutions",
    description:
      "endrIT Solutions von Endrit Sermaxhaj (BSc Informatik) in Buchs AG: IT-Support, Netzwerke, Einrichtung und Wartung, Webdesign und Website-Redesign inkl. 1 Jahr Wartung sowie Social-Media-Betreuung für Instagram und TikTok.",
    keywords: [
      "IT-Dienstleistungen", "IT-Support", "Informatiker Buchs AG", "Netzwerk", "Webdesign", "Website-Redesign",
      "Social-Media-Betreuung", "Instagram", "TikTok", "Aargau", "Aarau", "endrIT Solutions",
    ],
    ogImage: "./og.png", // relative to metadataBase (which already contains the basePath),
    locale: "de_CH",
  },
};

export default site;
