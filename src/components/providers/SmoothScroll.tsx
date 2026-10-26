"use client";

import Lenis from "lenis";
import { createContext, useContext, useEffect, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import site from "@/config/site";

const LenisCtx = createContext<Lenis | null>(null);
export const useLenis = () => useContext(LenisCtx);

/** Lenis smooth scrolling, synced with GSAP's ticker + ScrollTrigger. */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!site.motion.smoothScroll || reduced) return;
    const l = new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true, syncTouch: false });
    l.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => l.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    setLenis(l);
    return () => {
      gsap.ticker.remove(tick);
      l.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisCtx.Provider value={lenis}>{children}</LenisCtx.Provider>;
}

/** Scroll helper that works with or without Lenis. */
export function scrollToTarget(lenis: Lenis | null, target: string | number | HTMLElement, immediate = false) {
  const offset = -80;
  if (lenis) {
    lenis.scrollTo(target, { offset: typeof target === "number" ? 0 : offset, immediate, duration: 1.2 });
    return;
  }
  let y = 0;
  if (typeof target === "number") y = target;
  else {
    const el = typeof target === "string" ? document.querySelector(target) : target;
    if (!el) return;
    y = el.getBoundingClientRect().top + window.scrollY + offset;
  }
  window.scrollTo({ top: y, behavior: immediate ? "auto" : "smooth" });
}
