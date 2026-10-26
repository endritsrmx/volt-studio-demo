"use client";

import { useEffect, useRef } from "react";
import site from "@/config/site";

/** Particles that flee from the pointer and spring back to their home position. */
export default function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const [r, g, b] = site.theme.accent.split(" ").map(Number);
    let w = 0, h = 0, raf = 0;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    type P = { x: number; y: number; hx: number; hy: number; vx: number; vy: number };
    let ps: P[] = [];
    const m = { x: -9999, y: -9999 };
    const init = () => {
      const rect = c.getBoundingClientRect();
      w = rect.width; h = rect.height;
      c.width = w * dpr; c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ps = [];
      const gap = 14;
      for (let y = gap; y < h; y += gap)
        for (let x = gap; x < w; x += gap) {
          const d = Math.hypot(x - w / 2, y - h / 2);
          if (d < Math.min(w, h) * 0.42) ps.push({ x, y, hx: x, hy: y, vx: 0, vy: 0 });
        }
    };
    init();
    const ro = new ResizeObserver(init);
    ro.observe(c);
    const move = (e: PointerEvent) => {
      const rect = c.getBoundingClientRect();
      m.x = e.clientX - rect.left; m.y = e.clientY - rect.top;
    };
    const leave = () => { m.x = -9999; m.y = -9999; };
    c.addEventListener("pointermove", move);
    c.addEventListener("pointerleave", leave);
    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of ps) {
        const dx = p.x - m.x, dy = p.y - m.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 9000) {
          const f = (9000 - d2) / 9000;
          p.vx += (dx / Math.sqrt(d2 + 1)) * f * 3;
          p.vy += (dy / Math.sqrt(d2 + 1)) * f * 3;
        }
        p.vx += (p.hx - p.x) * 0.04; p.vy += (p.hy - p.y) * 0.04;
        p.vx *= 0.86; p.vy *= 0.86;
        p.x += p.vx; p.y += p.vy;
        const sp = Math.min(1, Math.hypot(p.vx, p.vy) / 4);
        ctx.fillStyle = `rgba(${Math.round(255 - (255 - r) * sp)},${Math.round(255 - (255 - g) * sp)},${Math.round(255 - (255 - b) * sp)},${0.5 + sp * 0.5})`;
        ctx.fillRect(p.x - 1, p.y - 1, 2, 2);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      c.removeEventListener("pointermove", move);
      c.removeEventListener("pointerleave", leave);
    };
  }, []);
  return <canvas ref={ref} className="h-full w-full bg-black" aria-label="Interactive particle field" />;
}
