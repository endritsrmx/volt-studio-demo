"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/i18n/LangProvider";

/** Illustrative (not real) traffic / SEO dashboard. Animates when scrolled into view. */
const LINE = "M0 74 C 18 72, 30 70, 42 66 S 70 62, 84 54 S 112 46, 126 36 S 156 22, 170 16 S 192 6, 200 4";

function useCount(target: number, run: boolean, ms = 1800, from = 0, dec = 0, delay = 0) {
  const [v, setV] = useState(from);
  useEffect(() => {
    if (!run) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setV(target);
    let raf = 0;
    const f = 10 ** dec;
    const t0 = performance.now() + delay;
    const tick = (t: number) => {
      const k = Math.max(0, Math.min(1, (t - t0) / ms));
      const e = 1 - Math.pow(1 - k, 4);
      setV(Math.round((from + (target - from) * e) * f) / f);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target, ms, from, dec, delay]);
  return v;
}

const ch = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "’");

function Tile({ label, sub, children }: { label: string; sub: string; children: React.ReactNode }) {
  return (
    <div className="seo-tile min-w-0 rounded-xl border border-fg/[0.06] bg-panel/[0.04] p-3.5 sm:p-4">
      <div className="truncate p-small text-muted">{label}</div>
      <div className="mt-1.5">{children}</div>
      <div className="mt-1 truncate font-mono text-[10px] text-fg/45">{sub}</div>
    </div>
  );
}

export default function SeoDemo() {
  const { t } = useLang();
  const d = t.seoDemo;
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const visitors = useCount(12480, on, 2200, 0);
  const growth = useCount(340, on, 2000, 0, 0, 200);
  const rank = useCount(1, on, 1800, 24, 0, 400);
  const speed = useCount(100, on, 1800, 0, 0, 500);
  const conv = useCount(85, on, 1800, 0, 0, 600);
  const load = useCount(0.8, on, 1800, 3.2, 1, 700);
  const C = 2 * Math.PI * 16;
  const big = "font-mono text-[22px] leading-none tabular-nums text-fg sm:text-[26px]";

  return (
    <div ref={ref} className={`seo-demo ${on ? "is-on" : ""} relative overflow-hidden rounded-2xl border border-fg/10 bg-[#0A051E] p-4 sm:p-6`}>
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#3E02B2]/45 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-48 w-48 rounded-full bg-[#27DAF2]/10 blur-3xl" aria-hidden />
      <div className="relative mb-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="eyebrow">{d.eyebrow}</div>
          <div className="title-m mt-1">{d.title}</div>
        </div>
        <span className="shrink-0 rounded-pill border border-accent/40 px-2.5 py-1 font-mono text-[10px] uppercase text-accent">{d.badge}</span>
      </div>

      {/* main chart */}
      <div className="relative rounded-xl border border-fg/[0.06] bg-panel/[0.04] p-4">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <div className="p-small text-muted">{d.traffic}</div>
            <div className="mt-1 font-mono text-[34px] leading-none tabular-nums text-fg sm:text-[44px]">{ch(visitors)}</div>
          </div>
          <span className="seo-chip mb-1 inline-flex items-center gap-1 rounded-pill bg-accent/15 px-2.5 py-1 font-mono text-[13px] text-accent">
            <svg viewBox="0 0 24 24" width="12" height="12" aria-hidden><path d="M12 4l7 8h-4v8H9v-8H5z" fill="currentColor" /></svg>
            +{growth} % {d.growth}
          </span>
        </div>
        <svg viewBox="0 0 200 80" preserveAspectRatio="none" className="mt-3 h-[90px] w-full sm:h-[120px]" aria-hidden>
          <defs>
            <linearGradient id="seoFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#27DAF2" stopOpacity=".38" />
              <stop offset="1" stopColor="#3E02B2" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="seoStroke" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#6B3BF0" />
              <stop offset="1" stopColor="#27DAF2" />
            </linearGradient>
          </defs>
          {[20, 40, 60].map((y) => <line key={y} x1="0" x2="200" y1={y} y2={y} stroke="rgb(255 255 255 / .06)" vectorEffect="non-scaling-stroke" />)}
          <path d={`${LINE} L200 80 L0 80 Z`} fill="url(#seoFill)" className="seo-area" />
          <path d={LINE} fill="none" stroke="url(#seoStroke)" strokeWidth="2.5" strokeLinecap="round" pathLength={1} vectorEffect="non-scaling-stroke" className="seo-line" />
        </svg>
        <div className="mt-1 flex justify-between font-mono text-[10px] text-fg/40">
          {d.months.map((m) => <span key={m}>{m}</span>)}
        </div>
      </div>

      {/* KPI tiles */}
      <div className="relative mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Tile label={d.ranking} sub={d.keyword}>
          <span className={big}>#{rank}</span>
        </Tile>
        <Tile label={d.speed} sub={d.speedSub}>
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 40 40" width="30" height="30" className="-rotate-90 shrink-0" aria-hidden>
              <circle cx="20" cy="20" r="16" fill="none" stroke="rgb(255 255 255 / .08)" strokeWidth="4" />
              <circle cx="20" cy="20" r="16" fill="none" stroke="#27DAF2" strokeWidth="4" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - speed / 100)} />
            </svg>
            <span className={big}>{speed}</span>
          </div>
        </Tile>
        <Tile label={d.conversion} sub={d.conversionSub}>
          <span className={big}>+{conv} %</span>
        </Tile>
        <Tile label={d.load} sub={d.loadSub}>
          <span className={big}>{load.toFixed(1)} s</span>
        </Tile>
      </div>
      <p className="relative mt-3 font-mono text-[10px] text-fg/40">{d.note}</p>
    </div>
  );
}
