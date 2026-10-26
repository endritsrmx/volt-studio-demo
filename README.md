# Studio Site — premium interactive agency website

A Next.js site with WebGL shaders, a real-time 3D hero object, GSAP scroll choreography, Lenis smooth scrolling and a desktop-OS style Lab. Its layout system, motion language and interactions are modelled on the public experience of a premium web/3D/AI studio site. All code, shaders, copy and artwork here are original. Everything brand-specific lives in **one file**: `src/config/site.ts`.

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run start        # serve the production build
```

Requires **Node 18.18+** (Node 20 or 22 recommended).

Other scripts:

| Script | What it does |
| --- | --- |
| `npm run lint` | ESLint (Next.js core-web-vitals + TypeScript rules) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test:e2e` | Playwright tests on desktop 1440, tablet 768 and mobile 390. Run `npm run build` first. Run `npx playwright install chromium` once beforehand. |
| `node scripts/generate-assets.mjs` | Re-generates the placeholder artwork in `public/images` (needs Playwright's Chromium) |

---

## Rebranding — `src/config/site.ts`

Search the file for **`PLACEHOLDER`**. You can change all of the following without touching any animation code:

| Area | Keys |
| --- | --- |
| Identity | `name`, `shortName`, `logo` (typeset `prefix` + animated pill + `suffix`, or set `logo.image` to an SVG/PNG in `/public`), `tagline`, `description` |
| Location / clock | `location.city`, `location.timezone` (IANA, e.g. `Europe/Zurich`) |
| Contact | `contact.email`, `phone`, `address`, `bookingUrl` (Cal.com/Calendly link), `bookingEmbedUrl` (iframe) |
| Social | `socials[]` (`icon`: linkedin, instagram, x, github, mail) |
| Theme | `theme.accent`, `bg`, `fg`, … as RGB triplets; `gradientFrom` / `gradientTo` (hex) feed every shader |
| Motion | `motion.smoothScroll`, `motion.pageLoader`, `motion.pageTransitions` |
| SEO | `seo.title`, `titleTemplate`, `description`, `keywords`, `ogImage` |
| Home content | `hero`, `approach`, `stats`, `clients`, `workSection`, `servicesSection`, `labSection`, `blogSection`, `ctaSection`, `booking`, `faq`, `footer` |
| Pages | `about`, `worksPage`, `contactPage`, `privacy` |
| Collections | `projects[]`, `services[]`, `experiments[]` (Lab), `posts[]` (blog) |

Text conventions: a `Title` is `{ text, accent }` and the `accent` part is shown in the brand colour. Use `"\n"` to force a line break on desktop.

**Images**: put your files in `/public/images/...` and point `project.cover`, `post.cover` or `team.members[].image` at them. Recommended sizes are 1410×900 (projects), 1200×750 (posts) and 800×1000 (team). `next/image` optimises them to AVIF/WebP automatically.

**Adding a project, service, post or experiment** = add an object to the array. Routes, sitemap, menu, footer and cross-links update themselves.

---

## Project structure

```
src/
  app/                    # routes (App Router)
    page.tsx              # home
    about/ works/ works/[slug]/ services/ services/[slug]/
    lab/ blog/ blog/[slug]/ contact/ privacy-policy/
    api/contact/          # contact form endpoint (webhook-ready)
    api/assistant/        # "Ask me anything" endpoint (webhook-ready, local FAQ fallback)
    layout.tsx            # fonts, theme variables, providers, nav/footer/modals
    globals.css           # design tokens, typography, buttons, effects
    sitemap.ts robots.ts not-found.tsx
  config/site.ts          # ← all content + brand
  components/
    gl/                   # ShaderCanvas, GrainGradient, GridScan, HeroToggle3D (R3F), Safe3D
    providers/            # UIProvider (modals), SmoothScroll (Lenis+GSAP), Transitions (routes + reveals)
    layout/               # Navbar, MenuModal, ContactModal/Form, Footer, PageLoader, Assistant, Modal
    home/                 # Hero, Approach, Stats, Work, Services, LabTeaser, ImageTrail, BlogPreview, CtaSection, FaqSection
    pages/                # PageHero, LabSlider, ResultValue
    lab/                  # Desktop (windows + dock), Terminal, Particles
    ui/                   # Button, Title, SectionHead, Logo, Clock, Icons, NumberTicker, CountUp, GrowthChart, Marquee, Faq, ArtSvg, ProjectCard
  lib/                    # gsap registration, hooks, utils
tests/site.spec.ts        # Playwright e2e
scripts/generate-assets.mjs
```

---

## Interaction inventory

| Effect | Where | Implementation |
| --- | --- | --- |
| "UnBlur" reveal (blur 20px→0, opacity 0→1, 1.5s expo-out, 0.1s delay) | Every block with `data-reveal` (also `data-reveal="fade"` / `"up"`, `data-delay`) | `providers/Transitions.tsx` + ScrollTrigger |
| Animated grain gradient | Hero, CTA cards, page heroes, dark footer, Lab wallpaper | `gl/GrainGradient.tsx` (fragment shader, pauses off-screen) |
| Interactive 3D switch (pointer tilt, click to toggle, idle auto-toggle, intro spin) | Hero, Lab "Orbit Object" | `gl/HeroToggle3D.tsx` (React Three Fiber, lightformer env, no HDR download) |
| Perspective grid tunnel with scan sweep + cursor parallax | Lab teaser window, Lab "Grid Tunnel" | `gl/GridScan.tsx` |
| Lab window scales 0.86→1 with scroll (scrub) | Home Lab section | GSAP ScrollTrigger |
| Mouse image trail | Home Lab section (fine pointers only) | `home/ImageTrail.tsx` (WAAPI) |
| Approach cards: hovering one dims the others to 0.15, turns its art accent-coloured and animated, and shows its copy beside it | Home | `home/Approach.tsx`, `ui/ArtSvg.tsx` |
| Rolling-digit tickers, eased count-up, self-drawing growth chart with popping dots and labels | Stats | `ui/NumberTicker`, `ui/CountUp`, `ui/GrowthChart` |
| Infinite logo marquee (pauses on hover) | Stats | `ui/Marquee` |
| Project card: in-view scale 1.1 + accent glow, dims when out of view, orbiting conic border on hover, magnetic 82px arrow button | Work, services | `ui/ProjectCard.tsx` |
| Sticky service columns | Home, About, Services | CSS `position: sticky` |
| Buttons: pointer-origin fill circle + rolling label | Everywhere | `ui/Button.tsx` + `.btn` / `.roll` CSS |
| Navbar glass + auto dark ink over accent sections (`data-nav="light"`) | Global | `layout/Navbar.tsx` |
| Live city clock | Navbar | `ui/Clock.tsx` |
| Menu modal: overlay fade, panel rise, Services accordion, ESC, focus trap, scroll lock | Global | `layout/Modal.tsx`, `layout/MenuModal.tsx` |
| Contact modal + page form (validation, honeypot, consent, success state) | Global | `layout/ContactForm.tsx`, `api/contact` |
| FAQ accordion (grid-rows height, rotating plus, accent stripe) + FAQPage JSON-LD | Home, services, contact | `ui/Faq.tsx` |
| Footer logo switch toggles the footer between accent and dark (with grain gradient) | Global | `layout/Footer.tsx` |
| First-visit loader (progress bar, then fade) | Global, once per session | `layout/PageLoader.tsx` |
| Route transitions: curtain fades in, route changes, curtain fades out, scroll resets, reveals re-run; smooth in-page anchor scrolling | Global | `providers/Transitions.tsx` |
| Lab desktop: icons (click selects, double-click / Enter opens), magnifying dock, draggable/maximisable windows, deep links `/lab#slug`, terminal, particle field | /lab | `lab/*` |
| "Ask me anything" assistant with toggle pill | Global | `layout/Assistant.tsx`, `api/assistant` |

**Touch devices**: hover-only effects have touch alternatives. Approach copy is always visible, project arrow buttons are always shown, the image trail and magnetic effects are disabled, and Lab icons open on a single tap with full-screen windows.

**Reduced motion** (`prefers-reduced-motion`): Lenis, reveals, loader, transitions and shader animation are turned off (shaders render one still frame), and CSS animations are neutralised.

---

## Environment variables

Copy `.env.example` to `.env.local`:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata, sitemap and robots |
| `CONTACT_WEBHOOK_URL` | Optional. Contact submissions are POSTed here as JSON (Formspree, Zapier, Make, n8n, Slack…). Without it, submissions are logged server-side. |
| `ASSISTANT_WEBHOOK_URL` | Optional. Receives `{ question }` and must return `{ answer }` (e.g. your own LLM endpoint). Without it, the assistant answers from the FAQ and services in the config. |

---

## Deployment

**Vercel (recommended)**
1. Push the folder to a Git repository (GitHub/GitLab/Bitbucket).
2. On vercel.com choose *Add New → Project* and import the repo. The framework is auto-detected as Next.js.
3. Add the environment variables above, then deploy.
4. Add your domain under *Settings → Domains* and set `NEXT_PUBLIC_SITE_URL` to it.

**Any Node host** (Render, Railway, Fly, a VPS): run `npm ci && npm run build && npm run start`. Set `PORT` if needed.

---

## Performance notes

- The WebGL canvases cap DPR (1.5 for shaders, 1.75 for 3D), pause when off-screen or when the tab is hidden, and release their GL context on unmount.
- Heavy modules (three / R3F, shaders, Lab demos) are loaded with `next/dynamic` and `ssr:false`, so they are split into their own chunks.
- Fonts are self-hosted via `@fontsource`, so there is no request to Google Fonts.
- Animations only touch `transform`, `opacity` and `filter`. ScrollTriggers are scoped per route with `gsap.context` and reverted on navigation.
- If WebGL is unavailable, CSS fallbacks render instead (gradient backgrounds and a CSS version of the 3D switch).

## Licensing of assets

All images in `/public/images` and `/public/og.jpg` are generated by `scripts/generate-assets.mjs` and are free to use. Fonts are Space Grotesk and IBM Plex Mono (SIL Open Font License) via Fontsource. Replace the placeholders with your own photography and renders before launch.
