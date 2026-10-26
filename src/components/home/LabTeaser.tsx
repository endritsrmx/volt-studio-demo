"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import site, { projects } from "@/config/site";
import TitleText, { Lines } from "@/components/ui/Title";
import Button from "@/components/ui/Button";
import ImageTrail from "./ImageTrail";
import { gsap } from "@/lib/gsap";

const GridScan = dynamic(() => import("@/components/gl/GridScan"), { ssr: false });

/**
 * Accent "Lab" section: giant logo lock-up, image trail under the cursor,
 * and a browser-window frame (grid-scan shader inside) that scales 0.9 → 1
 * as it scrolls through the viewport.
 */
export default function LabTeaser() {
  const l = site.labSection;
  const section = useRef<HTMLElement>(null);
  const win = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        win.current,
        { scale: 0.86, y: 60 },
        { scale: 1, y: 0, ease: "none", scrollTrigger: { trigger: win.current, start: "top bottom", end: "center center", scrub: 0.8 } },
      );
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={section} data-nav="light" className="relative overflow-hidden bg-accent pb-[140px] pt-[140px] text-black max-sm:pb-20 max-sm:pt-24">
      <ImageTrail hostRef={section} images={projects.map((p) => p.cover)} />
      <div className="container-big relative z-[2] flex flex-col items-center text-center">
        <div data-reveal className="font-mono text-[10px] uppercase tracking-[0.02em]">
          {l.tag}
        </div>
        <div data-reveal data-delay="0.15" className="mt-6 flex items-center font-medium leading-none tracking-[-0.045em]" style={{ fontSize: "clamp(56px, 9.2vw, 150px)" }}>
          <span>{site.logo.prefix}</span>
          <span className="relative mx-[0.03em] inline-flex h-[0.6em] w-[1.3em] items-center rounded-pill bg-black">
            <span className="absolute left-[0.07em] top-1/2 h-[0.46em] w-[0.46em] -translate-y-1/2 rounded-full bg-accent" />
          </span>
          <span>{site.logo.suffix}</span>
          <span className="mx-[0.25em] h-[0.9em] w-[3px] bg-black" aria-hidden />
          <span className="font-light">Lab</span>
        </div>
        <p data-reveal data-delay="0.25" className="p-body mt-6 max-w-[760px] text-black/90">
          {l.body}
        </p>
      </div>

      <div className="container-big relative z-[2] mt-20 max-sm:mt-12">
        <div
          ref={win}
          className="mx-auto overflow-hidden rounded-[24px] border border-black/60 bg-black shadow-[0_40px_120px_rgba(0,0,0,0.35)] will-change-transform"
        >
          {/* browser chrome */}
          <div className="flex items-center gap-4 border-b border-white/10 bg-[#111] px-5 py-3">
            <div className="flex gap-2" aria-hidden>
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="mx-auto rounded-pill bg-white/10 px-4 py-1 font-mono text-[11px] text-white/60">{l.windowUrl}</div>
            <div className="w-[52px]" />
          </div>
          <div className="relative aspect-[16/8.4] min-h-[520px] w-full max-sm:min-h-[560px]">
            <div className="absolute inset-0">
              <GridScan />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-6 text-center text-fg">
              <span className="tag">{l.windowTag}</span>
              <h2 className="title-l">
                <TitleText title={l.title} />
              </h2>
              <p className="p-small max-w-[520px] text-fg/90">
                <Lines text={l.windowBody} />
              </p>
              <div className="mt-2">
                <Button href={l.cta.href}>{l.cta.label}</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
