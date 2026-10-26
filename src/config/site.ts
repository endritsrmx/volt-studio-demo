export const BP = process.env.NEXT_PUBLIC_BASE_PATH || "";
/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SITE CONFIGURATION — the single source of truth for brand + content.
 * ─────────────────────────────────────────────────────────────────────────────
 *  Everything a visitor reads or sees (name, logo, copy, projects, services,
 *  blog posts, colors, SEO, contact details) lives in this file.
 *  Animation / layout logic lives in /src/components and never needs editing
 *  to rebrand the site.
 *
 *  Search for "PLACEHOLDER" to find every value you still need to replace.
 *
 *  Text conventions
 *  ─────────────────
 *  • `Title` = { text, accent? }  → `accent` is rendered in the accent color.
 *  • Use "\n" inside a string to force a line break on desktop.
 */

export type Title = { text: string; accent?: string; after?: string };

export type ArtKind = "burst" | "spiral" | "pulse" | "radial";

export type Project = {
  slug: string;
  name: string;
  tagline: string; // mono sub-headline (rendered uppercase)
  tags: string[];
  summary: string;
  /** Image path in /public, or leave empty to use the generated cover. */
  cover: string;
  /** Optional second image shown on the case-study page. */
  gallery?: string[];
  year: string;
  client: string;
  services: string[];
  liveUrl?: string;
  challenge: string;
  approach: string;
  outcome: string;
  results: { value: string; label: string }[];
};

export type ServiceItem = { title: string; body: string; projects: string[] };

export type Service = {
  slug: string;
  number: string;
  menuLabel: string;
  menuHint: string;
  title: Title;
  subtitle: string;
  items: ServiceItem[];
  page: {
    hero: { title: Title; body: string };
    highlight: { tag: string; title: Title; body: string; points: { title: string; body: string }[] };
    faq: { q: string; a: string }[];
    cta: { title: Title; body: string };
  };
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  readTime: string;
  category: string;
  cover: string;
  body: { heading?: string; paragraphs: string[] }[];
};

export type Experiment = {
  slug: string;
  name: string;
  category: string;
  description: string;
  /** Visual used inside the Lab window: one of the built-in live demos. */
  demo: "grid" | "grain" | "orbit" | "terminal" | "particles";
  icon: string; // a single emoji or 1–2 characters, shown as the desktop icon glyph
  color: string; // icon tile color
};

const site = {
  /* ───────────────────────── BRAND ───────────────────────── */
  name: "Volt Studio", // PLACEHOLDER — your business name
  shortName: "Volt", // PLACEHOLDER
  /**
   * The logo is typeset: `prefix` + animated pill + `suffix`.
   * Example: "V" + (pill) + "lt." → reads like "Volt."
   * Set `image` to a path in /public (e.g. "/logo.svg") to use a file instead.
   */
  logo: { prefix: "V", suffix: "lt.", image: "" as string }, // PLACEHOLDER
  tagline: "Charging brands.", // PLACEHOLDER — short line shown in menu footer
  description:
    "An independent digital studio combining web design, real-time 3D and applied AI to build websites that people remember.", // PLACEHOLDER

  location: {
    city: "Zurich", // PLACEHOLDER — shown in the live clock (nav)
    timezone: "Europe/Zurich",
    label: "Independent Digital Studio · Zurich", // PLACEHOLDER
  },

  contact: {
    email: "hello@example.com", // PLACEHOLDER
    phone: "+41 00 000 00 00", // PLACEHOLDER
    address: "Street 1, 8000 Zurich, Switzerland", // PLACEHOLDER
    /** Optional booking page (Cal.com, Calendly…). Empty = booking card links to the contact form. */
    bookingUrl: "", // PLACEHOLDER e.g. "https://cal.com/your-name/30min"
    /** Optional booking iframe embed URL. Empty = no iframe is rendered. */
    bookingEmbedUrl: "",
  },

  socials: [
    // PLACEHOLDER — remove what you don't use. `icon` is one of: linkedin, instagram, x, github, dribbble, behance, mail
    { label: "LinkedIn", href: "https://www.linkedin.com/", icon: "linkedin" },
    { label: "Instagram", href: "https://www.instagram.com/", icon: "instagram" },
    { label: "Email", href: "mailto:hello@example.com", icon: "mail" },
  ],

  /* ───────────────────────── THEME ─────────────────────────
   *  Space-separated RGB triplets (used with Tailwind alpha modifiers).
   */
  theme: {
    bg: "0 0 0",
    fg: "255 255 255",
    accent: "204 255 0", // neon lime — swap for your brand color
    accentInk: "0 0 0", // text color used ON the accent color
    muted: "160 160 160",
    panel: "255 255 255", // glass panels use this at 10% alpha
    /** Shader gradient colors (hero + footer + CTA). Hex. */
    gradientFrom: "#000000",
    gradientTo: "#ccff00",
  },

  /** Global motion switches */
  motion: {
    smoothScroll: true, // Lenis smooth scrolling (disabled automatically for reduced-motion)
    pageLoader: true, // intro loader on first visit
    pageTransitions: true,
  },

  /* ───────────────────────── SEO ───────────────────────── */
  seo: {
    title: "Volt Studio — Web, 3D & AI Studio", // PLACEHOLDER
    titleTemplate: "%s | Volt Studio", // PLACEHOLDER
    description:
      "Volt Studio designs and engineers websites, real-time 3D experiences and AI integrations for brands that refuse to be forgettable.", // PLACEHOLDER
    keywords: ["web design", "web development", "3D websites", "WebGL", "AI integration", "creative studio"],
    ogImage: `${BP}/og.jpg`,
    locale: "en_US",
    twitter: "", // e.g. "@yourhandle"
  },

  /* ───────────────────────── NAVIGATION ───────────────────────── */
  nav: [
    { label: "Home", href: "/", hint: "Where it all begins." },
    { label: "Works", href: "/works", hint: "Proof, not promises." },
    { label: "Services", href: "/services", hint: "What we do best.", children: true },
    { label: "About", href: "/about", hint: "The people behind the work." },
    { label: "Lab", href: "/lab", hint: "Experiments and side quests." },
    { label: "Blog", href: "/blog", hint: "Notes from the studio." },
    { label: "Contact", href: "/contact", hint: "Start a conversation." },
  ],

  /* ───────────────────────── HOME ───────────────────────── */
  hero: {
    badge: "Independent Studio", // PLACEHOLDER (small blue-ish pill). Empty string hides it.
    tag: "Independent Digital Studio · Zurich", // PLACEHOLDER
    title: { text: "Websites people\n", accent: "can't forget." } as Title,
    subtitle: "Good enough is invisible. We build the opposite.",
    body: "Volt Studio blends web design, real-time 3D and applied AI under one roof. We partner with ambitious brands that want their digital presence to feel as good as the product behind it.",
    note: "Most sites peak on launch day. Ours are built to keep improving.",
    primaryCta: { label: "View our works", href: "/works" },
    secondaryCta: { label: "What we do", href: "#services" },
  },

  approach: {
    tag: "Approach",
    title: { text: "Strategy first.\n", accent: "Pixels second." } as Title,
    body: "Plenty of studios ship a site and vanish.\nWe stay, measure, and make the next release better than the last.",
    steps: [
      { title: "Spark", art: "burst" as ArtKind, body: "Every project opens with questions, not mockups. We dig into the audience, the market and the one thing the brand must own — before a single pixel moves." },
      { title: "Focus", art: "spiral" as ArtKind, body: "Insight becomes a sharp creative brief. Direction, structure and tone are locked so the build phase is about craft, not guesswork." },
      { title: "Build", art: "pulse" as ArtKind, body: "Design, code and 3D happen side by side, by the same small team that shaped the idea. Nothing is lost in translation between tools or people." },
      { title: "Amplify", art: "radial" as ArtKind, body: "Launch is the first data point. We monitor, test and iterate, so the site keeps getting faster, clearer and more persuasive over time." },
    ],
  },

  stats: {
    tag: "Stats",
    title: { text: "Numbers that ", accent: "move." } as Title,
    body: "Metrics only matter in context. These come from real launches, real budgets and real deadlines — for clients who needed results, not decoration.",
    conversion: {
      value: 3,
      suffix: "x",
      title: { text: "Conversion ", accent: "Lift" } as Title,
      body: "Average uplift measured after relaunch on a 3D e-commerce build.",
      chart: [0.9, 1.1, 1.4, 1.6, 2.1, 2.4, 3.0],
    },
    session: {
      value: 4,
      suffix: "x",
      title: { text: "Longer ", accent: "Sessions" } as Title,
      body: "Visitors stop skimming.\nThey explore.",
      counter: { from: 1.2, to: 4.18, decimals: 2, suffix: "min" },
    },
    disciplines: {
      value: 4,
      title: { text: "Core ", accent: "Disciplines" } as Title,
      body: "Design, development, 3D and AI — one team, one standard, zero handoffs.",
      tools: ["Figma", "Next.js", "Blender", "AI"],
    },
    inhouse: {
      value: 100,
      suffix: "%",
      title: { text: "Made ", accent: "in-house" } as Title,
      body: "Concept, design and engineering happen under one roof. Quality stays high because the people who care most never let go of the work.",
    },
  },

  /** Client / partner wordmarks for the marquee (text logos — replace with your own). */
  clients: ["NORTHWIND", "Aurelia", "KINETIC", "Halden & Co", "OBSIDIAN", "Meridian", "Lumen Labs", "ARCADIA"], // PLACEHOLDER

  workSection: {
    tag: "Selected Work",
    title: { text: "Built to be ", accent: "wanted." } as Title,
    body: "Big launch or small product, the bar stays the same.\nEach project is engineered to attract the right people and keep them there.\nHere is what that looks like in practice.",
  },

  servicesSection: {
    tag: "Services",
    title: { text: "Deep craft.\n", accent: "Full ownership." } as Title,
    body: "3D that makes products impossible to scroll past.\nAI that speeds the work up without watering it down.\nEngineering that holds up under real traffic.\nAnd design sharp enough to make all of it feel effortless.",
  },

  labSection: {
    tag: "Where curiosity becomes capability",
    body: "The Lab is our self-initiated playground. No client, no brief, no deadline — just questions we chase until they turn into skills we can bring to paid work.",
    windowUrl: "lab.example.com", // PLACEHOLDER
    windowTag: "Visit the Lab",
    title: { text: "See what we\n", accent: "can build." } as Title,
    windowBody: "We could describe it. It's more fun to explore it yourself.\nEvery piece is built to be opened, played with and broken.\nStart anywhere.",
    cta: { label: "Explore the Lab", href: "/lab" },
  },

  blogSection: {
    title: "Journal",
    cta: { label: "Read all articles", href: "/blog" },
  },

  ctaSection: {
    tag: "Start here",
    title: { text: "Your brand deserves\n", accent: "more than fine." } as Title,
    body: "Precision, depth, and a partner who cares about the outcome as much as you do.",
    primary: { label: "Start a conversation", href: "/contact" },
    secondary: { label: "See our works", href: "/works" },
  },

  booking: {
    host: "Your Name", // PLACEHOLDER
    title: "Book a discovery call",
    body: "A short call to understand your project and outline next steps. No pitch deck — just a focused conversation.",
    duration: "30 min",
    medium: "Video call",
  },

  faq: [
    { q: "What does Volt Studio do?", a: "We design and build websites, real-time 3D experiences and AI-powered features. Strategy, design, development and launch happen in one team, so the idea that wins the pitch is the one that ships." },
    { q: "Which technologies do you use?", a: "Mostly Next.js, React, TypeScript, GSAP and Three.js / WebGL on the front-end, with headless CMS or Webflow where editors need autonomy. For AI we work with current LLM APIs, retrieval pipelines and custom tooling." },
    { q: "What makes you different from other agencies?", a: "Size and ownership. A small senior team handles every project end-to-end, without account managers in between. We push back on briefs when it makes the result better." },
    { q: "Do you build 3D and immersive experiences?", a: "Yes — product configurators, interactive brand worlds, scroll-driven scenes and lightweight WebGL accents, always optimised for real devices, not just high-end desktops." },
    { q: "Can you add AI to our existing website?", a: "Yes. From content-grounded assistants to automation in your workflows, we start with an audit to find where AI genuinely pays off before building anything." },
    { q: "What does a project cost?", a: "It depends on scope. Focused landing pages start in the low five figures; larger platforms and 3D builds are quoted after a discovery call. You always get a fixed proposal before we start." },
    { q: "Where are you based and who do you work with?", a: "We're based in Zurich and work with clients across Europe and beyond — remotely by default, in person when it helps." },
  ],

  footer: {
    statement:
      "We sweat the details nobody notices — until they're missing. Every project starts with a point of view and the nerve to defend it, because conviction is what separates memorable work from merely competent.",
    infoTitle: "Info",
    projectsTitle: "Projects",
    legal: [{ label: "Privacy Policy", href: "/privacy-policy" }],
    credit: "Designed & engineered in-house.",
  },

  /* ───────────────────────── ABOUT PAGE ───────────────────────── */
  about: {
    tag: "About the studio",
    title: { text: "We make brands\n", accent: "hard to ignore." } as Title,
    body: "Volt is the moment before the spark: tension, anticipation, energy waiting to be released. That's the feeling we design for — the pull that makes someone click, stay, and come back.",
    team: {
      tag: "Small on purpose",
      title: { text: "Built by people who\n", accent: "care a little too much." } as Title,
      body: "A designer, a 3D artist and an engineer who all write code. Small by design: no handoffs, no telephone game, no junior team you never met.",
      members: [
        { name: "Team Member One", role: "Creative Director", image: "" }, // PLACEHOLDER
        { name: "Team Member Two", role: "3D & Motion", image: "" }, // PLACEHOLDER
        { name: "Team Member Three", role: "Engineering & AI", image: "" }, // PLACEHOLDER
      ],
    },
    pillars: {
      tag: "What we bring",
      title: { text: "3D, AI, code and design.\n", accent: "One goal." } as Title,
      items: [
        { title: "3D", body: "Depth you can almost touch through the screen." },
        { title: "AI", body: "Intelligence that sharpens a brand instead of flattening it." },
        { title: "Engineering", body: "Fast, accessible, maintainable — invisible when it works." },
        { title: "Design", body: "A point of view, executed with obsessive precision." },
      ],
    },
    manifesto: {
      title: { text: "Ownership, ", accent: "not execution." } as Title,
      body: "We arrive with an opinion about what the brand needs and the willingness to argue for it. We challenge briefs that would lead to forgettable work, and we stay after launch because that's when the real learning starts.",
    },
  },

  worksPage: {
    tag: "Our showcase",
    title: { text: "Where craft\n", accent: "meets numbers." } as Title,
    body: "Design that pulls, engineering that holds, results that compound. A cross-section of the work we're proudest of.",
  },

  contactPage: {
    tag: "Contact",
    title: { text: "Your next project starts\n", accent: "with a conversation." } as Title,
    body: "Tell us what you're building. We'll reply within one business day with honest thoughts on what it could become.",
    budgets: ["< 10k", "10k – 25k", "25k – 50k", "50k +"],
    topics: ["Website", "3D experience", "AI integration", "Something else"],
  },

  privacy: {
    updated: "2026-01-01", // PLACEHOLDER
    sections: [
      { heading: "Who we are", body: "This website is operated by Volt Studio (PLACEHOLDER — legal entity name, address). For any privacy request write to hello@example.com." },
      { heading: "Data we collect", body: "When you use the contact form we receive the information you enter (name, email, message and optional details). We use it only to answer your request." },
      { heading: "Cookies & analytics", body: "This template ships without tracking cookies. If you add analytics, describe the provider, purpose and legal basis here." },
      { heading: "Retention", body: "Messages are kept as long as needed to handle your request and any resulting business relationship, then deleted." },
      { heading: "Your rights", body: "You can request access, correction or deletion of your personal data at any time by contacting us." },
    ],
  },
};

/* ───────────────────────── PROJECTS ───────────────────────── */
export const projects: Project[] = [
  {
    slug: "halo-assistant",
    name: "Halo",
    tagline: "An on-site assistant powered by our AI engine",
    tags: ["Design", "Development", "AI"],
    summary:
      "Halo lives on client websites and answers like a senior team member: what the company does, which project fits, what it costs. Grounded in real content, it never invents what it doesn't know.",
    cover: `${BP}/images/projects/halo.webp`,
    year: "2026",
    client: "Internal product",
    services: ["Product design", "LLM integration", "Front-end"],
    challenge: "Visitors leave when they can't find answers fast. Generic chatbots answer confidently and wrongly.",
    approach: "A retrieval pipeline over the site's own pages, a tight persona, and an interface that feels like part of the brand instead of a bolted-on widget.",
    outcome: "Qualified enquiries went up while support emails went down — the assistant now handles the first conversation.",
    results: [
      { value: "62%", label: "Questions resolved without email" },
      { value: "2.4x", label: "More qualified leads" },
      { value: "<1s", label: "Median first token" },
    ],
  },
  {
    slug: "terra-olive",
    name: "Terra Olive",
    tagline: "Built to sell out. It did.",
    tags: ["Design", "Development", "3D"],
    summary:
      "A small-batch olive oil producer with a product worth obsessing over. We built the bottle in 3D, the story around it, and a store that turned first-time visitors into repeat buyers.",
    cover: `${BP}/images/projects/terra.webp`,
    year: "2025",
    client: "Terra Olive (PLACEHOLDER)",
    services: ["Brand site", "3D product", "E-commerce"],
    challenge: "Premium product, commodity perception. The old shop looked like every other oil shop.",
    approach: "A scroll-driven 3D bottle that reveals harvest, pressing and tasting notes, paired with a frictionless checkout.",
    outcome: "The first harvest sold out in nine days after launch.",
    results: [
      { value: "9 days", label: "To sell out the harvest" },
      { value: "3.1x", label: "Conversion vs. old store" },
      { value: "+48%", label: "Average order value" },
    ],
  },
  {
    slug: "table-ai",
    name: "TableAI",
    tagline: "The AI waiter that works every table, every shift",
    tags: ["Design", "Development", "SaaS", "AI", "Brand"],
    summary:
      "A SaaS platform for restaurants: guests scan, ask and order in their own language while staff focus on hospitality. We designed the product, the brand and the marketing site.",
    cover: `${BP}/images/projects/table.webp`,
    year: "2025",
    client: "TableAI (PLACEHOLDER)",
    services: ["Product design", "SaaS development", "AI"],
    challenge: "Restaurants are understaffed and guests hate waiting — but nobody wants a cold, robotic experience.",
    approach: "A warm conversational menu with dietary filters, upsell logic and a dashboard staff can learn in five minutes.",
    outcome: "Live in dozens of venues with measurable gains in ticket size and table turnover.",
    results: [
      { value: "+18%", label: "Average ticket" },
      { value: "12", label: "Languages supported" },
      { value: "5 min", label: "Staff onboarding" },
    ],
  },
  {
    slug: "fizz-gum",
    name: "Fizz Gum",
    tagline: "A candy brand you can spin",
    tags: ["3D", "Development", "Brand"],
    summary:
      "A playful 3D product experience for a functional chewing-gum brand: every flavour gets its own world, its own physics and its own soundtrack.",
    cover: `${BP}/images/projects/fizz.webp`,
    year: "2024",
    client: "Fizz (PLACEHOLDER)",
    services: ["3D modelling", "WebGL", "Launch site"],
    challenge: "A crowded shelf and a young audience with zero patience.",
    approach: "Real-time 3D packs that react to the cursor, flavour worlds that load instantly, and a site that feels like a toy.",
    outcome: "Launch campaign traffic converted at more than double the category benchmark.",
    results: [
      { value: "2.2x", label: "Category benchmark" },
      { value: "1m 50s", label: "Avg. session" },
      { value: "95", label: "Lighthouse performance" },
    ],
  },
  {
    slug: "solace",
    name: "Solace",
    tagline: "Eyewear you can try on in AR",
    tags: ["AR", "3D", "E-commerce"],
    summary:
      "An eyewear label wanted the in-store fitting experience online. We built a web-based AR try-on and a catalogue where every frame is a real-time 3D model.",
    cover: `${BP}/images/projects/solace.webp`,
    year: "2024",
    client: "Solace (PLACEHOLDER)",
    services: ["AR", "3D catalogue", "Shopify"],
    challenge: "Returns were eating margins because customers couldn't judge fit online.",
    approach: "Lightweight glTF frames, browser AR with no app install, and honest sizing guidance.",
    outcome: "Returns dropped and try-on users converted far above average.",
    results: [
      { value: "-31%", label: "Return rate" },
      { value: "4x", label: "Conversion for try-on users" },
      { value: "0", label: "Apps to install" },
    ],
  },
];

/* ───────────────────────── SERVICES ───────────────────────── */
export const services: Service[] = [
  {
    slug: "web-design",
    number: "01",
    menuLabel: "Web Design & Development",
    menuHint: "Engineered, not assembled.",
    title: { text: "Web ", accent: "Design &\nDevelopment" },
    subtitle: "Design conviction and production precision, in one build.",
    items: [
      { title: "Design systems & websites", body: "Built from a system, not a stack of pages. Every component is shaped for clarity and conversion, so the site stays consistent long after launch and your team can grow it without breaking it.", projects: ["terra-olive", "fizz-gum"] },
      { title: "Custom web development", body: "Hand-written front-ends and full-stack builds when off-the-shelf won't do. Fast, accessible, typed end-to-end and documented for whoever comes next.", projects: ["table-ai", "halo-assistant"] },
      { title: "Immersive UI & custom interfaces", body: "Interfaces for brands where the experience is the value proposition. Motion, sound and interaction design that communicates before a single word is read.", projects: ["solace"] },
      { title: "Growth & iteration", body: "Ongoing partnerships for clients who want their digital presence to compound. Testing, performance work and new features shipped every month.", projects: ["terra-olive"] },
    ],
    page: {
      hero: { title: { text: "Web development,\n", accent: "done properly." }, body: "Most websites look exactly like their brief: functional, forgettable, done. We build the version that people remember and teams can actually maintain." },
      highlight: {
        tag: "The full range",
        title: { text: "See how far ", accent: "we can take it." },
        body: "From editorial marketing sites to full-blown platforms, the stack bends to the idea — never the other way around.",
        points: [
          { title: "Performance budgets", body: "Every page ships against a budget. Fast is a feature." },
          { title: "Accessible by default", body: "Semantic markup, keyboard support and motion that respects preferences." },
          { title: "Editor friendly", body: "Content teams publish without calling a developer." },
        ],
      },
      faq: [
        { q: "Do you work with Webflow or custom code?", a: "Both. Webflow when editors need autonomy and speed, custom Next.js when the project needs logic, integrations or performance beyond a site builder." },
        { q: "How long does a website take?", a: "Typically 6–12 weeks from kickoff to launch, depending on scope and content readiness." },
        { q: "Do you offer maintenance?", a: "Yes — monthly growth retainers cover updates, testing, performance and new features." },
      ],
      cta: { title: { text: "The right brief ", accent: "changes everything." }, body: "Tell us what you're building. The brief takes ten minutes and we reply within a day." },
    },
  },
  {
    slug: "3d-experiences",
    number: "02",
    menuLabel: "3D Experiences",
    menuHint: "Made for the browser.",
    title: { text: "3D-Powered\n", accent: "Experiences" },
    subtitle: "Real-time 3D in the browser.\nBuilt to perform, not just to impress.",
    items: [
      { title: "3D modelling & animation", body: "Models and motion built for the web from day one: tight geometry, baked lighting and animations that tell the story in seconds.", projects: ["fizz-gum", "terra-olive"] },
      { title: "Augmented reality (AR)", body: "Place the product in the customer's space with browser-based AR. No app, no friction — just a better reason to buy.", projects: ["solace"] },
      { title: "Interactive brand worlds", body: "Explorable scenes for launches and campaigns, tuned to run smoothly on the phones your audience actually owns.", projects: ["fizz-gum"] },
    ],
    page: {
      hero: { title: { text: "3D experiences,\n", accent: "built for the browser." }, body: "Flat pages describe a product. Immersive ones make people want it. We bring real-time 3D to the web without sacrificing speed." },
      highlight: {
        tag: "Beneath the surface",
        title: { text: "Fidelity you ", accent: "can feel." },
        body: "Geometry, light, materials and weight — every surface is tuned until it reads as real, then optimised until it loads instantly.",
        points: [
          { title: "Product visualisation", body: "Configurators and hero renders that sell the details." },
          { title: "Scroll-driven scenes", body: "Narratives that unfold as you move through the page." },
          { title: "Optimised assets", body: "Compressed glTF, texture budgets and graceful fallbacks." },
        ],
      },
      faq: [
        { q: "Will 3D slow my site down?", a: "Not if it's built properly. We set budgets for polygons, textures and draw calls and lazy-load scenes only when they're needed." },
        { q: "Do I need existing 3D models?", a: "No. We can model from CAD files, photos or physical samples." },
        { q: "Does it work on mobile?", a: "Yes. Every scene is tested on mid-range phones and degrades gracefully when needed." },
      ],
      cta: { title: { text: "Your product has never looked like this. ", accent: "It should." }, body: "Tell us about your product and we'll show you what it could become in 3D." },
    },
  },
  {
    slug: "ai-development",
    number: "03",
    menuLabel: "AI Business Integration",
    menuHint: "Useful, not hyped.",
    title: { text: "AI Business\n", accent: "Integration" },
    subtitle: "AI that earns its place.\nFor brands ready to put it to work.",
    items: [
      { title: "AI-powered experiences", body: "Assistants, recommendations and search that understand your content and speak in your brand's voice — grounded, measurable, and never making things up.", projects: ["halo-assistant", "table-ai"] },
      { title: "Workflow & automation", body: "Automations that remove repetitive work from teams: document handling, triage, enrichment and reporting, connected to the tools you already use.", projects: ["table-ai"] },
      { title: "Search, GEO & AEO", body: "Make your content legible to AI search engines and answer engines, so your brand shows up where buyers now ask their questions.", projects: ["halo-assistant"] },
    ],
    page: {
      hero: { title: { text: "AI integration,\n", accent: "without the hype." }, body: "AI isn't a trend, it's a widening gap between companies that use it well and those that don't. We help you land on the right side of it." },
      highlight: {
        tag: "Built, not borrowed",
        title: { text: "AI that ", accent: "actually ships." },
        body: "We build agents and features that understand a business and represent it precisely — then measure whether they pay off.",
        points: [
          { title: "Opportunity audit", body: "Find where AI pays back before writing any code." },
          { title: "Grounded answers", body: "Retrieval over your own content, with citations and guardrails." },
          { title: "Measured impact", body: "Dashboards that show what the AI actually changed." },
        ],
      },
      faq: [
        { q: "Which AI models do you use?", a: "We're model-agnostic and pick the best fit for quality, cost and data requirements." },
        { q: "Is our data safe?", a: "We design for data minimisation, use providers with appropriate data-processing terms and can deploy within your infrastructure." },
        { q: "How do we start?", a: "With a short audit: we map processes and content, then propose the two or three use cases with the clearest return." },
      ],
      cta: { title: { text: "AI is already reshaping your category. ", accent: "Start here." }, body: "Tell us where the friction is. We'll show you what AI can realistically fix." },
    },
  },
];

/* ───────────────────────── LAB EXPERIMENTS ───────────────────────── */
export const experiments: Experiment[] = [
  { slug: "grid-tunnel", name: "Grid Tunnel", category: "WebGL / Shader", description: "A perspective grid with a scanning light sweep, written as a single fragment shader.", demo: "grid", icon: "▦", color: "#1f1f1f" },
  { slug: "grain-field", name: "Grain Field", category: "WebGL / Gradient", description: "An animated, film-grain gradient that warps over time — the same engine that powers this site's hero.", demo: "grain", icon: "◐", color: "#cfff00" },
  { slug: "orbit-object", name: "Orbit Object", category: "3D / Three.js", description: "A glossy 3D switch that reacts to your cursor. Click it.", demo: "orbit", icon: "◉", color: "#2d6cdf" },
  { slug: "retro-terminal", name: "Retro Terminal", category: "UI / Terminal", description: "A fake terminal with a typing engine and scanlines. Type `help`.", demo: "terminal", icon: ">_", color: "#0e3b2a" },
  { slug: "particle-field", name: "Particle Field", category: "Canvas / Physics", description: "Thousands of particles that flee from the cursor and spring back home.", demo: "particles", icon: "✺", color: "#e8a33d" },
];

/* ───────────────────────── BLOG POSTS ───────────────────────── */
export const posts: Post[] = [
  {
    slug: "what-a-website-chatbot-really-costs",
    title: "What does a website chatbot really cost?",
    excerpt: "Pricing runs from fractions of a cent to around a dollar per conversation. Here's how per-message, per-seat and custom builds compare once you add real traffic.",
    date: "2026-09-18",
    readTime: "7 min",
    category: "AI",
    cover: `${BP}/images/posts/post-1.webp`,
    body: [
      { paragraphs: ["Every vendor quotes a different unit: messages, seats, resolutions or tokens. That makes comparisons almost impossible until you translate everything into cost per conversation at your traffic level."] },
      { heading: "Three pricing models", paragraphs: ["Per-seat tools look cheap for small teams but scale with headcount, not value. Per-resolution pricing aligns incentives but can surprise you in busy months.", "Custom builds have an upfront cost and then a running cost close to the raw model price — usually the cheapest option at volume."] },
      { heading: "What to measure", paragraphs: ["Track resolution rate, escalations and lead quality, not just message counts. A chatbot that answers fewer questions correctly is worth more than one that answers everything badly."] },
    ],
  },
  {
    slug: "chatbot-that-only-answers-from-your-content",
    title: "How to add a chatbot that only answers from your content",
    excerpt: "Most visitors want a straight answer, not a hallucination. Here's how retrieval keeps an assistant grounded in what your site actually says.",
    date: "2026-08-30",
    readTime: "6 min",
    category: "AI",
    cover: `${BP}/images/posts/post-2.webp`,
    body: [
      { paragraphs: ["Grounding is the difference between a helpful assistant and a liability. The model should only answer with information it can point to."] },
      { heading: "Retrieval in plain words", paragraphs: ["Your pages are split into passages and indexed. For each question the system finds the most relevant passages and asks the model to answer using only those."] },
      { heading: "Guardrails that matter", paragraphs: ["Refuse when nothing relevant is found, cite sources, and log unanswered questions — they are your next content roadmap."] },
    ],
  },
  {
    slug: "you-probably-dont-need-to-train-a-model",
    title: "You probably don't need to train a model",
    excerpt: "Fine-tuning changes how a model writes, not what it knows. For most websites, retrieval is cheaper, faster and easier to keep up to date.",
    date: "2026-08-12",
    readTime: "5 min",
    category: "AI",
    cover: `${BP}/images/posts/post-3.webp`,
    body: [
      { paragraphs: ["'Training on our content' is the most common request we hear — and usually the wrong tool for the job."] },
      { heading: "When fine-tuning helps", paragraphs: ["Fine-tuning shines for tone, format and narrow repetitive tasks. It's poor at keeping facts current."] },
      { heading: "The pragmatic path", paragraphs: ["Start with retrieval and a good prompt. Measure. Only fine-tune if a specific gap remains."] },
    ],
  },
  {
    slug: "off-the-shelf-or-custom",
    title: "Off-the-shelf tools or a custom build? How to decide",
    excerpt: "SaaS gets you live this week; custom gets you exactly what you need. A simple framework for picking the right one — and when to switch.",
    date: "2026-07-21",
    readTime: "6 min",
    category: "Strategy",
    cover: `${BP}/images/posts/post-4.webp`,
    body: [
      { paragraphs: ["The right answer depends on how central the capability is to your differentiation."] },
      { heading: "Buy the commodity", paragraphs: ["If every competitor needs it and nobody wins on it, buy it."] },
      { heading: "Build the edge", paragraphs: ["If it's how customers choose you, own it — design, data and roadmap."] },
    ],
  },
  {
    slug: "3d-on-the-web-without-the-weight",
    title: "3D on the web without the weight",
    excerpt: "Real-time 3D doesn't have to wreck your Core Web Vitals. Budgets, compression and lazy scenes that keep things fast on mid-range phones.",
    date: "2026-06-30",
    readTime: "8 min",
    category: "3D",
    cover: `${BP}/images/posts/post-5.webp`,
    body: [
      { paragraphs: ["The heaviest part of most 3D sites isn't the code — it's unoptimised assets."] },
      { heading: "Set budgets early", paragraphs: ["Define triangle counts, texture sizes and draw calls per scene before modelling starts."] },
      { heading: "Load only what's seen", paragraphs: ["Defer canvases until they approach the viewport and dispose of them when they leave."] },
    ],
  },
];

export default site;
export type SiteConfig = typeof site;
