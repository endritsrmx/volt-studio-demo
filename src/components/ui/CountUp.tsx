"use client";

import { useEffect, useRef, useState } from "react";

/** Eased count-up (easeOutQuart) that starts when visible. */
export default function CountUp({ from = 0, to, decimals = 0, duration = 2200, locale = "de-CH", className }: { from?: number; to: number; decimals?: number; duration?: number; locale?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(from);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduced) return setV(to);
        const t0 = performance.now();
        const step = (t: number) => {
          const p = Math.min(1, (t - t0) / duration);
          const e = 1 - Math.pow(1 - p, 4);
          setV(from + (to - from) * e);
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [from, to, duration]);
  const f = new Intl.NumberFormat(locale.startsWith("de") ? "it-IT" : locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {f.format(v)}
    </span>
  );
}
