"use client";

import dynamic from "next/dynamic";
import site from "@/config/site";
import Button from "@/components/ui/Button";
import TitleText from "@/components/ui/Title";
import { useReducedMotion } from "@/lib/hooks";

const GrainGradient = dynamic(() => import("@/components/gl/GrainGradient"), { ssr: false });
const HeroToggle3D = dynamic(() => import("@/components/gl/HeroToggle3D"), { ssr: false });

export default function Hero() {
  const reduced = useReducedMotion();
  const h = site.hero;
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-[calc(var(--nav-h)+48px)] max-md:flex-col max-md:items-stretch">
      {/* animated grain gradient — offset down like the reference */}
      <div className="pointer-events-none absolute inset-x-0 top-[15%] -z-0 h-full" aria-hidden>
        <GrainGradient low={0.42} high={1.12} warpFrequency={1.4} warpAmplitude={0.6} />
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[30%] bg-gradient-to-b from-black to-transparent" aria-hidden />

      {/* 3D object */}
      <div
        data-reveal
        data-delay="0.35"
        className="absolute right-0 top-0 z-[1] h-full w-[45vw] max-lg:w-[40vw] max-md:relative max-md:order-2 max-md:mt-6 max-md:h-[320px] max-md:w-full"
      >
        <HeroToggle3D reduced={reduced} />
      </div>

      <div className="container-big relative z-[3] max-md:order-1">
        <div data-reveal data-delay="0.15" className="flex max-w-[min(671px,50vw)] flex-col max-md:max-w-none">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            {h.badge && (
              <span className="inline-flex h-[29px] items-center gap-2 rounded-pill bg-accent px-3 text-[12px] font-medium text-accent-ink">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-ink" />
                {h.badge}
              </span>
            )}
            <span className="tag">{h.tag}</span>
          </div>
          <h1 className="title-xl">
            <TitleText title={h.title} />
          </h1>
          <h2 className="title-mono mt-4">{h.subtitle}</h2>
          <p className="p-hero mt-4">{h.body}</p>
          <p className="p-hero mt-3 text-fg/90">{h.note}</p>
          <div className="mt-7 flex flex-wrap gap-5">
            <Button href={h.primaryCta.href}>{h.primaryCta.label}</Button>
            <Button href={h.secondaryCta.href} variant="secondary">
              {h.secondaryCta.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
