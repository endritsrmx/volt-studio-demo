"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import site from "@/config/site";
import Button from "@/components/ui/Button";
import { useLang } from "@/i18n/LangProvider";
import { useReducedMotion } from "@/lib/hooks";

const GrainGradient = dynamic(() => import("@/components/gl/GrainGradient"), { ssr: false });
const HeroToggle3D = dynamic(() => import("@/components/gl/HeroToggle3D"), { ssr: false });

const icons = [
  // monitor / network
  <svg key="a" viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /></svg>,
  <svg key="b" viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" /></svg>,
  <svg key="c" viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="4" y="4" width="16" height="16" rx="5" /><circle cx="12" cy="12" r="3.5" /><circle cx="16.8" cy="7.2" r=".8" fill="currentColor" /></svg>,
];

export default function Home() {
  const { t } = useLang();
  const reduced = useReducedMotion();
  return (
    <>
      {/* HERO – compact */}
      <section className="relative overflow-hidden pt-[calc(var(--nav-h)+40px)] pb-10 md:min-h-[78svh] md:flex md:items-center">
        <div className="pointer-events-none absolute inset-x-0 top-[20%] h-full" aria-hidden>
          <GrainGradient low={0.42} high={1.12} warpFrequency={1.4} warpAmplitude={0.6} />
        </div>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[30%] bg-gradient-to-b from-bg to-transparent" aria-hidden />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[22%] bg-gradient-to-t from-bg to-transparent" aria-hidden />
        <div data-reveal data-delay="0.3" className="absolute right-0 top-0 z-[1] h-full w-[42vw] max-md:hidden">
          <HeroToggle3D reduced={reduced} />
        </div>
        <div className="container-big relative z-[3]">
          <div data-reveal data-delay="0.1" className="max-w-[640px]">
            <span className="tag mb-5 inline-flex">{t.hero.tag}</span>
            <h1 className="title-xl">{t.hero.title}</h1>
            <p className="p-hero mt-4 text-fg/85">{t.hero.body}</p>
            <div className="mt-7 flex flex-wrap gap-4">
              <Button href="/#contact">{t.hero.cta}</Button>
              <Button href="/#services" variant="secondary">{t.hero.cta2}</Button>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="container-big scroll-mt-[var(--nav-h)] py-12">
        <div className="eyebrow mb-2">{t.services.eyebrow}</div>
        <h2 className="title-l mb-8">{t.services.title}</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {t.services.items.map((s, i) => (
            <article key={s.title} data-reveal="up" data-delay={String(0.05 + i * 0.08)} className="group relative rounded-2xl border border-fg/10 bg-panel/[0.04] p-6 transition-colors hover:border-accent/50">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#3E02B2] text-accent">{icons[i]}</div>
              <h3 className="title-m mb-2">{s.title}</h3>
              <p className="p-small mb-4 text-muted">{s.body}</p>
              <ul className="space-y-1.5 text-[14px]">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-2"><span className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-accent" />{p}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* ABOUT + CONTACT side by side */}
      <section className="container-big grid gap-10 py-12 md:grid-cols-2">
        <div id="about" className="scroll-mt-[calc(var(--nav-h)+24px)]" data-reveal="up">
          <div className="eyebrow mb-2">{t.about.eyebrow}</div>
          <h2 className="title-l mb-4">{t.about.title}</h2>
          <p className="p-body text-fg/85">{t.about.body}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {t.about.facts.map((f) => <li key={f} className="chip">{f}</li>)}
          </ul>
          <dl className="mt-8 grid gap-3 text-[15px]">
            <div><dt className="eyebrow">{t.contact.email}</dt><dd><a className="link-sweep" href={`mailto:${site.contact.email}`}>{site.contact.email}</a></dd></div>
            <div><dt className="eyebrow">{t.contact.phone}</dt><dd><a className="link-sweep" href={`tel:${site.contact.phoneHref}`}>{site.contact.phone}</a></dd></div>
            <div><dt className="eyebrow">{t.contact.location}</dt><dd>{site.contact.postalCode} {site.contact.city}, Schweiz</dd></div>
          </dl>
        </div>
        <div id="contact" className="scroll-mt-[calc(var(--nav-h)+24px)]" data-reveal="up" data-delay="0.15">
          <div className="eyebrow mb-2">{t.contact.eyebrow}</div>
          <h2 className="title-l mb-2">{t.contact.title}</h2>
          <p className="p-body mb-5 text-fg/85">{t.contact.body}</p>
          <ContactForm />
        </div>
      </section>
    </>
  );
}

function ContactForm() {
  const { t } = useLang();
  const [error, setError] = useState("");
  const field = "w-full rounded-xl border border-fg/15 bg-panel/[0.04] px-4 py-3 text-[15px] outline-none transition-colors placeholder:text-fg/40 focus:border-accent";
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") || "").trim();
    const email = String(f.get("email") || "").trim();
    const service = String(f.get("service") || "");
    const message = String(f.get("message") || "").trim();
    if (!name || !/^\S+@\S+\.\S+$/.test(email) || !message) return setError(t.contact.error);
    setError("");
    const body = `${message}\n\n—\n${t.contact.name}: ${name}\n${t.contact.email}: ${email}\n${t.contact.service}: ${service}`;
    window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(`${t.contact.subject}: ${service}`)}&body=${encodeURIComponent(body)}`;
  }
  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="name" aria-label={t.contact.name} placeholder={t.contact.name} className={field} autoComplete="name" />
        <input name="email" type="email" aria-label={t.contact.email} placeholder={t.contact.email} className={field} autoComplete="email" />
      </div>
      <select name="service" aria-label={t.contact.service} className={`${field} appearance-none`} defaultValue={t.contact.serviceAny}>
        <option className="bg-bg">{t.contact.serviceAny}</option>
        {t.services.items.map((s) => <option key={s.title} className="bg-bg">{s.title}</option>)}
      </select>
      <textarea name="message" rows={4} aria-label={t.contact.message} placeholder={t.contact.message} className={field} />
      {error && <p role="alert" className="text-[13px] text-[#ff8a8a]">{error}</p>}
      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit">{t.contact.send}</Button>
        <span className="p-small text-muted">{t.contact.hint}</span>
      </div>
    </form>
  );
}
