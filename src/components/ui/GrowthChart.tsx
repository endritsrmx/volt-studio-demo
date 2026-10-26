"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/** Line chart that draws itself, pops its dots, then raises value labels — staggered along the line. */
export default function GrowthChart({ points, className }: { points: number[]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const W = 700;
  const H = 240;
  const padX = 24;
  const padY = 50;
  const max = Math.max(...points);
  const min = Math.min(...points) * 0.6;
  const xy = points.map((p, i) => {
    const x = padX + (i / (points.length - 1)) * (W - padX * 2);
    const y = H - 12 - ((p - min) / (max - min)) * (H - padY - 12);
    return [x, y] as const;
  });
  // smooth path (Catmull-Rom → Bezier)
  let d = `M${xy[0][0]},${xy[0][1]}`;
  for (let i = 0; i < xy.length - 1; i++) {
    const p0 = xy[i - 1] || xy[i];
    const p1 = xy[i];
    const p2 = xy[i + 1];
    const p3 = xy[i + 2] || p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0]},${c1[1]} ${c2[0]},${c2[1]} ${p2[0]},${p2[1]}`;
  }
  const LINE = 1600;

  return (
    <div ref={ref} className={cn("relative w-full", vis && "is-visible", className)}>
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full overflow-visible" role="img" aria-label={`Growth from x${points[0]} to x${points[points.length - 1]}`}>
        {/* horizontal guides */}
        {[0.25, 0.5, 0.75, 1].map((g) => (
          <line key={g} x1={0} x2={W} y1={H * g - 1} y2={H * g - 1} stroke="rgb(255 255 255 / 0.07)" strokeDasharray="3 6" />
        ))}
        <path d={d} pathLength={1} className="growth-line" />
        {xy.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={5} className="growth-dot" style={{ animationDelay: `${(i / (xy.length - 1)) * LINE}ms` }} />
        ))}
      </svg>
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {xy.map(([x, y], i) => (
          <span
            key={i}
            className="growth-label"
            style={{ left: `${(x / W) * 100}%`, top: `calc(${(y / H) * 100}% - 40px)`, animationDelay: `${(i / (xy.length - 1)) * LINE + 120}ms` }}
          >
            x{points[i].toFixed(1)}
          </span>
        ))}
      </div>
    </div>
  );
}
