# endrIT Solutions – Website

One-page site for **endrIT Solutions** (Endrit Sermaxhaj, Schweiz): IT-Dienstleistungen, Webdesign & Website-Redesign, Social-Media-Betreuung.

- Next.js static export (`output: "export"`), deployed to GitHub Pages via `.github/workflows/pages.yml`
- Texts (DE-CH / EN): `src/i18n/dict.ts` · Brand/contact/colours: `src/config/site.ts`
- Logo assets: `public/brand/`, favicon/OG: `public/`

```bash
npm ci
npm run dev
NEXT_PUBLIC_BASE_PATH=/volt-studio-demo npm run build   # -> out/
```
