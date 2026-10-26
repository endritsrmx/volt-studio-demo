"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import site, { experiments, type Experiment } from "@/config/site";
import { cn } from "@/lib/utils";

const GrainGradient = dynamic(() => import("@/components/gl/GrainGradient"), { ssr: false });
const GridScan = dynamic(() => import("@/components/gl/GridScan"), { ssr: false });
const HeroToggle3D = dynamic(() => import("@/components/gl/HeroToggle3D"), { ssr: false });
const Terminal = dynamic(() => import("./Terminal"), { ssr: false });
const Particles = dynamic(() => import("./Particles"), { ssr: false });

type Win = { id: string; x: number; y: number; z: number; max: boolean; min: boolean };
const FINDER = "finder";

function Demo({ e }: { e: Experiment }) {
  switch (e.demo) {
    case "grid":
      return <GridScan />;
    case "grain":
      return <GrainGradient low={0.2} high={1} warpFrequency={2.4} warpAmplitude={0.8} />;
    case "orbit":
      return (
        <div className="h-full w-full bg-[radial-gradient(70%_70%_at_50%_100%,rgba(204,255,0,0.35),#000_70%)]">
          <HeroToggle3D />
        </div>
      );
    case "terminal":
      return <Terminal />;
    case "particles":
      return <Particles />;
  }
}

function IconTile({ e, size = 56 }: { e: Experiment; size?: number }) {
  const dark = ["#1f1f1f", "#0e3b2a"].includes(e.color);
  return (
    <span
      className="flex items-center justify-center rounded-[14px] font-medium shadow-[0_6px_20px_rgba(0,0,0,0.35)]"
      style={{ width: size, height: size, background: e.color, color: dark ? "#ccff00" : "#000", fontSize: size * 0.38 }}
      aria-hidden
    >
      {e.icon}
    </span>
  );
}

/**
 * The Lab: a playful desktop OS.
 *  • desktop icons (click = select, double-click / Enter = open)
 *  • a magnifying dock
 *  • draggable, focusable, maximisable windows with live demos inside
 *  • deep links: /lab#<experiment-slug> opens that window
 */
export default function Desktop() {
  const [wins, setWins] = useState<Win[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const zTop = useRef(10);
  const area = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const u = () => setMobile(mq.matches);
    u();
    mq.addEventListener("change", u);
    return () => mq.removeEventListener("change", u);
  }, []);

  const openWin = useCallback((id: string) => {
    setWins((ws) => {
      const z = ++zTop.current;
      const ex = ws.find((w) => w.id === id);
      if (ex) return ws.map((w) => (w.id === id ? { ...w, z, min: false } : w));
      const rect = area.current?.getBoundingClientRect();
      const n = ws.length;
      const x = Math.max(16, (rect ? rect.width / 2 - 360 : 120) + n * 34);
      const y = Math.max(16, 70 + n * 30);
      return [...ws, { id, x, y, z, max: false, min: false }];
    });
  }, []);

  const closeWin = (id: string) => setWins((ws) => ws.filter((w) => w.id !== id));
  const focusWin = (id: string) => setWins((ws) => ws.map((w) => (w.id === id ? { ...w, z: ++zTop.current } : w)));
  const patch = (id: string, p: Partial<Win>) => setWins((ws) => ws.map((w) => (w.id === id ? { ...w, ...p } : w)));

  // deep link / default window
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && experiments.some((e) => e.slug === hash)) openWin(hash);
    else openWin(FINDER);
    const onHash = () => {
      const h = window.location.hash.slice(1);
      if (experiments.some((e) => e.slug === h)) openWin(h);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [openWin]);

  return (
    <section className="relative h-[100svh] min-h-[640px] overflow-hidden" aria-label="Lab desktop">
      {/* wallpaper */}
      <div className="absolute inset-0" aria-hidden>
        <GrainGradient from="#010b07" to="#19c47a" low={0.15} high={1.25} angle={0.9} warpFrequency={2.6} warpAmplitude={0.9} grain={0.06} />
      </div>

      <div ref={area} className="absolute inset-x-0 bottom-[96px] top-[var(--nav-h)]" onPointerDown={(e) => e.target === e.currentTarget && setSelected(null)}>
        {/* desktop icons */}
        <ul className="absolute left-4 top-4 z-[1] grid grid-flow-col grid-rows-[repeat(4,auto)] gap-x-2 gap-y-3 max-md:left-1/2 max-md:-translate-x-1/2 max-md:grid-flow-row max-md:grid-cols-3 max-md:grid-rows-none" role="list">
          <li>
            <button
              onClick={() => (mobile ? openWin(FINDER) : setSelected(FINDER))}
              onDoubleClick={() => openWin(FINDER)}
              onKeyDown={(e) => e.key === "Enter" && openWin(FINDER)}
              className={cn("flex w-[92px] flex-col items-center gap-2 rounded-[10px] p-2 text-center", selected === FINDER && "bg-white/15")}
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-[14px] bg-[#2d6cdf] text-[24px] shadow-[0_6px_20px_rgba(0,0,0,0.35)]" aria-hidden>
                ⌘
              </span>
              <span className="text-[11px] leading-tight text-white [text-shadow:0_1px_3px_rgba(0,0,0,.8)]">All Experiments</span>
            </button>
          </li>
          {experiments.map((e) => (
            <li key={e.slug}>
              <button
                onClick={() => (mobile ? openWin(e.slug) : setSelected(e.slug))}
                onDoubleClick={() => openWin(e.slug)}
                onKeyDown={(ev) => ev.key === "Enter" && openWin(e.slug)}
                className={cn("flex w-[92px] flex-col items-center gap-2 rounded-[10px] p-2 text-center", selected === e.slug && "bg-white/15")}
                aria-label={`Open ${e.name}`}
              >
                <IconTile e={e} />
                <span className="text-[11px] leading-tight text-white [text-shadow:0_1px_3px_rgba(0,0,0,.8)]">{e.name}</span>
              </button>
            </li>
          ))}
        </ul>

        {/* windows */}
        {wins.map((w) => {
          const e = experiments.find((x) => x.slug === w.id);
          return (
            <Window
              key={w.id}
              win={w}
              mobile={mobile}
              title={e ? e.name : "All Experiments"}
              onClose={() => closeWin(w.id)}
              onFocus={() => focusWin(w.id)}
              onMove={(x, y) => patch(w.id, { x, y })}
              onMax={() => patch(w.id, { max: !w.max })}
              onMin={() => patch(w.id, { min: true })}
            >
              {e ? (
                <div className="flex h-full flex-col">
                  <div className="relative min-h-0 flex-1">
                    <Demo e={e} />
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-[#0d0d0d] px-5 py-4">
                    <div className="flex flex-col">
                      <span className="font-mono text-[10px] uppercase text-accent">{e.category}</span>
                      <span className="text-[13px] text-fg/80">{e.description}</span>
                    </div>
                    <Link href="/contact" className="rounded-pill bg-accent px-4 py-2 text-[12px] text-accent-ink transition-transform hover:scale-105">
                      Want this for your brand?
                    </Link>
                  </div>
                </div>
              ) : (
                <ul className="h-full overflow-y-auto bg-[#111] p-2" data-lenis-prevent>
                  {experiments.map((x) => (
                    <li key={x.slug}>
                      <button onClick={() => openWin(x.slug)} className="flex w-full items-center gap-4 rounded-[10px] px-3 py-3 text-left transition-colors hover:bg-white/10">
                        <IconTile e={x} size={40} />
                        <span className="flex flex-1 flex-col">
                          <span className="text-[14px] text-fg">{x.name}</span>
                          <span className="font-mono text-[10px] uppercase text-accent">{x.category}</span>
                        </span>
                        <span className="text-[12px] text-fg/40 max-sm:hidden">Open ↗</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </Window>
          );
        })}
      </div>

      {/* dock */}
      <Dock onOpen={openWin} running={wins.map((w) => w.id)} />

      <p className="sr-only">
        {site.name} Lab. Use the icons to open each experiment in its own window.
      </p>
    </section>
  );
}

function Window({
  win,
  mobile,
  title,
  children,
  onClose,
  onFocus,
  onMove,
  onMax,
  onMin,
}: {
  win: Win;
  mobile: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onFocus: () => void;
  onMove: (x: number, y: number) => void;
  onMax: () => void;
  onMin: () => void;
}) {
  const drag = useRef<{ dx: number; dy: number } | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const full = win.max || mobile;
  return (
    <div
      role="dialog"
      aria-label={title}
      onPointerDown={onFocus}
      className={cn(
        "absolute flex flex-col overflow-hidden border border-white/15 bg-[#0b0b0b] shadow-[0_30px_80px_rgba(0,0,0,0.6)] transition-[opacity,transform,border-radius] duration-300 ease-out-quart",
        full ? "inset-2 rounded-[14px]" : "h-[min(520px,70vh)] w-[min(720px,calc(100%-32px))] rounded-[14px]",
        shown && !win.min ? "scale-100 opacity-100" : "pointer-events-none scale-90 opacity-0",
      )}
      style={full ? { zIndex: win.z } : { left: win.x, top: win.y, zIndex: win.z }}
    >
      <div
        className="flex h-10 shrink-0 cursor-grab select-none items-center gap-3 border-b border-white/10 bg-[#161616] px-4 active:cursor-grabbing"
        onPointerDown={(e) => {
          if (full || (e.target as HTMLElement).closest("button")) return;
          drag.current = { dx: e.clientX - win.x, dy: e.clientY - win.y };
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (!drag.current) return;
          onMove(Math.max(-200, e.clientX - drag.current.dx), Math.max(0, e.clientY - drag.current.dy));
        }}
        onPointerUp={() => (drag.current = null)}
        onDoubleClick={onMax}
      >
        <div className="group/tl flex gap-2">
          <button onClick={onClose} aria-label="Close window" className="flex h-3 w-3 items-center justify-center rounded-full bg-[#ff5f57] text-[8px] leading-none text-black/70">
            <span className="opacity-0 group-hover/tl:opacity-100">×</span>
          </button>
          <button onClick={onMin} aria-label="Minimise window" className="flex h-3 w-3 items-center justify-center rounded-full bg-[#febc2e] text-[8px] leading-none text-black/70">
            <span className="opacity-0 group-hover/tl:opacity-100">–</span>
          </button>
          <button onClick={onMax} aria-label="Maximise window" className="flex h-3 w-3 items-center justify-center rounded-full bg-[#28c840] text-[8px] leading-none text-black/70">
            <span className="opacity-0 group-hover/tl:opacity-100">+</span>
          </button>
        </div>
        <span className="mx-auto pr-12 text-[12px] text-fg/70">{title}</span>
      </div>
      <div className="min-h-0 flex-1">{children}</div>
    </div>
  );
}

function Dock({ onOpen, running }: { onOpen: (id: string) => void; running: string[] }) {
  const [mx, setMx] = useState<number | null>(null);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const scale = (i: number) => {
    const el = refs.current[i];
    if (mx === null || !el) return 1;
    const r = el.getBoundingClientRect();
    const d = Math.abs(mx - (r.left + r.width / 2));
    return 1 + Math.max(0, 1 - d / 140) * 0.55;
  };
  return (
    <nav
      aria-label="Dock"
      className="glass absolute bottom-5 left-1/2 z-[50] flex -translate-x-1/2 items-end gap-2 rounded-[22px] border border-white/15 bg-black/30 px-3 pb-2 pt-2"
      onPointerMove={(e) => e.pointerType === "mouse" && setMx(e.clientX)}
      onPointerLeave={() => setMx(null)}
    >
      {experiments.map((e, i) => (
        <button
          key={e.slug}
          ref={(el) => {
            refs.current[i] = el;
          }}
          onClick={() => onOpen(e.slug)}
          aria-label={`Open ${e.name}`}
          title={e.name}
          className="relative flex flex-col items-center transition-transform duration-150 ease-out"
          style={{ transform: `scale(${scale(i)})`, transformOrigin: "bottom center" }}
        >
          <IconTile e={e} size={44} />
          <span className={cn("mt-1 h-1 w-1 rounded-full bg-white/80", running.includes(e.slug) ? "opacity-100" : "opacity-0")} />
        </button>
      ))}
    </nav>
  );
}
