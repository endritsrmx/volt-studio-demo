import type { ArtKind } from "@/config/site";

/**
 * Procedural line-art used by the Approach cards. Pure SVG, generated at
 * render time (no image assets). Colour = currentColor.
 */
const S = 280;
const C = S / 2;
const r2 = (n: number) => Math.round(n * 100) / 100;

function burst() {
  // string-art star: chords between points on two offset circles
  const lines: string[] = [];
  const n = 72;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const b = a + Math.PI * 0.62;
    const rA = i % 2 ? 118 : 70;
    const rB = i % 3 ? 118 : 60;
    lines.push(`M${r2(C + Math.cos(a) * rA)},${r2(C + Math.sin(a) * rA)}L${r2(C + Math.cos(b) * rB)},${r2(C + Math.sin(b) * rB)}`);
  }
  return (
    <g className="art-spin">
      <path d={lines.join("")} strokeWidth={0.6} />
    </g>
  );
}

function spiral() {
  const items = [];
  for (let i = 0; i < 40; i++) {
    items.push(<ellipse key={i} cx={C} cy={C} rx={104} ry={46} transform={`rotate(${(i * 180) / 40} ${C} ${C})`} strokeWidth={0.5} />);
  }
  return (
    <g className="art-spin">
      <circle cx={C} cy={C} r={30} strokeWidth={0.5} />
      {items}
    </g>
  );
}

function pulse() {
  const dots = [];
  for (let x = 0; x < 15; x++)
    for (let y = 0; y < 15; y++) {
      const px = 28 + x * 16;
      const py = 28 + y * 16;
      const d = Math.hypot(px - C, py - C);
      if (d > 112) continue;
      dots.push(<circle key={`${x}-${y}`} cx={px} cy={py} r={d < 46 ? 1.6 : 0.9} fill="currentColor" stroke="none" opacity={1 - d / 140} />);
    }
  return (
    <g>
      <rect x={14} y={14} width={S - 28} height={S - 28} rx={6} strokeWidth={0.5} opacity={0.6} />
      {Array.from({ length: 9 }, (_, i) => (
        <line key={`v${i}`} x1={14 + ((S - 28) / 8) * i} x2={14 + ((S - 28) / 8) * i} y1={14} y2={S - 14} strokeWidth={0.3} opacity={0.35} />
      ))}
      {Array.from({ length: 9 }, (_, i) => (
        <line key={`h${i}`} y1={14 + ((S - 28) / 8) * i} y2={14 + ((S - 28) / 8) * i} x1={14} x2={S - 14} strokeWidth={0.3} opacity={0.35} />
      ))}
      {dots}
      <g className="art-pulse">
        <circle cx={C} cy={C} r={22} strokeWidth={1} />
        <circle cx={C} cy={C} r={14} strokeWidth={1} />
        <circle cx={C} cy={C} r={6} strokeWidth={1} />
      </g>
    </g>
  );
}

function radial() {
  // deterministic pseudo-random radial strokes inside a circle
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const ls: string[] = [];
  for (let i = 0; i < 64; i++) {
    const a = rnd() * Math.PI * 2;
    const r0 = 30 + rnd() * 60;
    const r1 = r0 + 10 + rnd() * 30;
    ls.push(`M${r2(C + Math.cos(a) * r0)},${r2(C + Math.sin(a) * r0)}L${r2(C + Math.cos(a) * r1)},${r2(C + Math.sin(a) * r1)}`);
  }
  return (
    <g>
      <circle cx={C} cy={C} r={120} strokeWidth={0.8} />
      <g className="art-spin">
        <path d={ls.join("")} strokeWidth={1.2} strokeLinecap="round" />
      </g>
    </g>
  );
}

export default function ArtSvg({ kind, className }: { kind: ArtKind; className?: string }) {
  return (
    <svg viewBox={`0 0 ${S} ${S}`} className={`art-svg ${className ?? ""}`} fill="none" stroke="currentColor" aria-hidden>
      {kind === "burst" ? burst() : kind === "spiral" ? spiral() : kind === "pulse" ? pulse() : radial()}
    </svg>
  );
}
