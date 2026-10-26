"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/i18n/LangProvider";

/** Illustrative (not real) traffic / SEO card. Animates when scrolled into view. */
const LINE = "M0 70 C 20 66, 35 68, 50 60 S 80 52, 100 48 S 135 40, 150 30 S 185 18, 200 8";

function useCount(target: number, run: boolean, ms = 1600, from = 0) {
  const [v, setV] = useState(from);
  useEffect(() => {
    if (!run) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setV(target);
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / ms);
      const e = 1 - Math.pow(1 - k, 3);
      setV(Math.round(from + (target - from) * e));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target, ms, from]);
  return v;
}

export default function SeoDemo() {
  const { t } = useLang();
  const d = t.seoDemo;
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const visits = useCount(240, on);
  const rank = useCount(1, on, 1800, 14);
  const speed = useCount(98, on, 1600);
  const C = 2 * Math.PI * 22;

  return (
    <div ref={ref} className={`seo-demo ${on ? "is-on" : ""} relative overflow-hidden rounded-2xl border border-fg/10 bg-[#0A051E] p-5 sm:p-6`}>
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#3E02B2]/40 blur-3xl" aria-hidden />
      <div className="relative mb-4 flex items-center justify-between gap-3">
        <div>
          <div className="eyebrow">{d.eyebrow}</div>
          <div className="title-m mt-1">{d.title}</div>
        </div>
        <span className="rounded-pill border border-accent/40 px-2.5 py-1 font-mono text-[10px] uppercase text-accent">{d.badge}</span>
      </div>

      <div className="relative grid gap-4 sm:grid-cols-[1.6fr_1fr]">
        {/* traffic chart */}
        <div className="rounded-xl bg-panel/[0.04] p-4">
          <div className="flex items-baseline justify-between">
            <span className="p-small text-muted">{d.traffic}</span>
            <span className="font-mono text-[18px] text-accent">+{visits}%</span>
          </div>
          <svg viewBox="0 0 200 80" className="mt-2 h-[90px] w-full" aria-hidden>
            <defs>
              <linearGradient id="seoFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#27DAF2" stopOpacity=".35" />
                <stop offset="1" stopColor="#3E02B2" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[20, 40, 60].map((y) => <line key={y} x1="0" x2="200" y1={y} y2={y} stroke="rgb(255 255 255 / .06)" />)}
            <path d={`${LINE} L200 80 L0 80 Z`} fill="url(#seoFill)" className="seo-area" />
            <path d={LINE} fill="none" stroke="#27DAF2" strokeWidth="2.5" strokeLinecap="round" pathLength={1} className="seo-line" />
            <circle cx="200" cy="8" r="4" fill="#27DAF2" className="seo-dot" />
          </svg>
          <div className="mt-1 flex justify-between font-mono text-[10px] text-fg/40">
            {d.months.map((m) => <span key={m}>{m}</span>)}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-1">
          {/* ranking */}
          <div className="rounded-xl bg-panel/[0.04] p-4">
            <span className="p-small text-muted">{d.ranking}</span>
            <div className="mt-1 flex items-end gap-2">
              <span className="title-l leading-none text-fg">#{rank}</span>
              <svg viewBox="0 0 24 24" width="18" height="18" className="mb-1 text-accent" aria-hidden><path d="M12 4l7 8h-4v8H9v-8H5z" fill="currentColor" /></svg>
            </div>
            <span className="font-mono text-[10px] text-fg/40">{d.keyword}</span>
          </div>
          {/* pagespeed ring */}
          <div className="flex items-center gap-3 rounded-xl bg-panel/[0.04] p-4">
            <svg viewBox="0 0 52 52" width="52" height="52" className="-rotate-90 shrink-0" aria-hidden>
              <circle cx="26" cy="26" r="22" fill="none" stroke="rgb(255 255 255 / .08)" strokeWidth="5" />
              <circle cx="26" cy="26" r="22" fill="none" stroke="#27DAF2" strokeWidth="5" strokeLinecap="round"
                strokeDasharray={C} strokeDashoffset={C * (1 - speed / 100)} />
            </svg>
            <div>
              <div className="font-mono text-[18px] leading-none">{speed}</div>
              <span className="p-small text-muted">{d.speed}</span>
            </div>
          </div>
        </div>
      </div>
      <p className="relative mt-3 font-mono text-[10px] text-fg/40">{d.note}</p>
    </div>
  );
}
