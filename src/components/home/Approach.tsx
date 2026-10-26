"use client";

import { useState } from "react";
import site from "@/config/site";
import SectionHead from "@/components/ui/SectionHead";
import ArtSvg from "@/components/ui/ArtSvg";
import { cn } from "@/lib/utils";

/**
 * 4 art cards. Hovering one: siblings fade to 0.15, its art turns accent and
 * animates, and its copy panel appears beside it (right for 1–2, left for 3–4).
 * Touch / small screens: copy is always visible under each card.
 */
export default function Approach() {
  const a = site.approach;
  const [active, setActive] = useState<number | null>(null);
  return (
    <section className="section min-h-[100svh]">
      <div className="container-narrow">
        <SectionHead tag={a.tag} title={a.title} body={a.body} />
      </div>
      <div className="h-[80px] max-sm:h-12" />
      <div className="container-big">
        <div className="grid grid-cols-4 gap-10 max-lg:gap-6 max-md:grid-cols-2 max-xs:grid-cols-1" onPointerLeave={() => setActive(null)}>
          {a.steps.map((s, i) => {
            const isActive = active === i;
            const dim = active !== null && !isActive;
            const right = i < 2;
            return (
              <div
                key={s.title}
                data-reveal
                data-delay={String(0.1 + i * 0.1)}
                className="relative"
                onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
              >
                <div
                  className={cn(
                    "relative aspect-square rounded-[14px] border transition-[opacity,border-color,color] duration-300 ease-out",
                    isActive ? "border-white/40 text-accent is-hovered" : "border-transparent text-white/80",
                    dim && "opacity-[0.15]",
                  )}
                >
                  <ArtSvg kind={s.art} className="absolute inset-[8%] h-[84%] w-[84%]" />
                </div>
                {/* desktop hover copy */}
                <div
                  aria-hidden={!isActive}
                  className={cn(
                    "pointer-events-none absolute top-1/2 z-10 hidden w-[min(180%,504px)] -translate-y-1/2 flex-col gap-[14px] transition-[opacity,filter] duration-300 md:flex",
                    right ? "left-[calc(100%+40px)]" : "right-[calc(100%+40px)]",
                    isActive ? "opacity-100 blur-0" : "opacity-0 blur-[6px]",
                  )}
                >
                  <div className="font-mono text-[18px] uppercase text-accent">{s.title}</div>
                  <p className="p-body">{s.body}</p>
                </div>
                {/* mobile copy */}
                <div className="mt-4 flex flex-col gap-2 md:hidden">
                  <div className="font-mono text-[16px] uppercase text-accent">{s.title}</div>
                  <p className="p-small">{s.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
