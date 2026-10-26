"use client";

import dynamic from "next/dynamic";
import site from "@/config/site";
import type { Title } from "@/config/site";
import TitleText from "@/components/ui/Title";
import Button from "@/components/ui/Button";
import { useUI } from "@/components/providers/UIProvider";
import { ArrowUpRight } from "@/components/ui/Icons";

const GrainGradient = dynamic(() => import("@/components/gl/GrainGradient"), { ssr: false });

/** Grain-gradient CTA card (reusable on every page). */
export function CtaCard({ tag, title, body, primary, secondary }: { tag: string; title: Title; body: string; primary: { label: string; href: string }; secondary?: { label: string; href: string } }) {
  const { open } = useUI();
  return (
    <div data-reveal className="relative overflow-hidden rounded-[24px] border border-white/10">
      <div className="absolute inset-0" aria-hidden>
        <GrainGradient low={0.5} high={1.35} angle={-0.7} warpFrequency={2.2} warpAmplitude={0.45} />
      </div>
      <div className="relative flex min-h-[460px] flex-col items-center justify-center gap-5 px-6 py-20 text-center">
        <span className="tag">{tag}</span>
        <h2 className="title-l">
          <TitleText title={title} />
        </h2>
        <p className="p-body max-w-[560px]">{body}</p>
        <div className="mt-3 flex flex-wrap justify-center gap-4">
          {primary.href === "/contact" ? (
            <Button onClick={() => open("contact")}>{primary.label}</Button>
          ) : (
            <Button href={primary.href}>{primary.label}</Button>
          )}
          {secondary && (
            <Button href={secondary.href} variant="dark">
              {secondary.label}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export function BookingCard() {
  const { open } = useUI();
  const b = site.booking;
  const c = site.contact;
  if (c.bookingEmbedUrl) {
    return (
      <div data-reveal className="overflow-hidden rounded-[24px] border border-white/10 bg-[#0d0d0d]">
        <iframe src={c.bookingEmbedUrl} title={b.title} className="h-[640px] w-full" loading="lazy" />
      </div>
    );
  }
  const days = Array.from({ length: 14 }, (_, i) => i);
  return (
    <div data-reveal className="grid overflow-hidden rounded-[24px] border border-white/10 bg-[#0d0d0d] md:grid-cols-[1fr_1.4fr]">
      <div className="flex flex-col gap-4 border-white/10 p-8 md:border-r">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-[14px] font-medium text-accent-ink">
          {b.host
            .split(" ")
            .map((w) => w[0])
            .join("")
            .slice(0, 2)}
        </div>
        <div className="text-[13px] text-fg/60">{b.host}</div>
        <h3 className="title-m">{b.title}</h3>
        <p className="p-small text-fg/80">{b.body}</p>
        <ul className="mt-2 flex flex-col gap-2 text-[13px] text-fg/80">
          <li>◷ {b.duration}</li>
          <li>◎ {b.medium}</li>
          <li>⌖ {site.location.timezone}</li>
        </ul>
      </div>
      <div className="flex flex-col gap-6 p-8">
        <div className="font-mono text-[11px] uppercase text-accent">Pick a day</div>
        <div className="grid grid-cols-7 gap-2">
          {days.map((d) => (
            <button
              key={d}
              onClick={() => (c.bookingUrl ? window.open(c.bookingUrl, "_blank", "noopener") : open("contact"))}
              className="aspect-square rounded-[10px] bg-white/[0.06] text-[13px] text-fg transition-colors duration-200 hover:bg-accent hover:text-accent-ink"
              aria-label={`Request a call — option ${d + 1}`}
            >
              {d + 1}
            </button>
          ))}
        </div>
        <div className="mt-auto">
          {c.bookingUrl ? (
            <Button href={c.bookingUrl} icon={<ArrowUpRight size={16} />}>
              Open booking page
            </Button>
          ) : (
            <Button onClick={() => open("contact")}>Request a call</Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CtaSection() {
  const c = site.ctaSection;
  return (
    <section className="section">
      <div className="container-big flex flex-col gap-10">
        <CtaCard tag={c.tag} title={c.title} body={c.body} primary={c.primary} secondary={c.secondary} />
        <BookingCard />
      </div>
    </section>
  );
}
