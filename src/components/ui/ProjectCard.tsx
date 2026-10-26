"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/config/site";
import { ArrowUpRight } from "./Icons";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * Portfolio media card
 *  • scroll into view → image scales to 1.1 + accent glow behind (opacity .2); out of view → dims to .32
 *  • hover → orbiting conic border + 82px accent button appears (scale .2 → 1)
 *  • mouse move → the button follows the cursor (magnetic, damped)
 */
export default function ProjectCard({ project, className, priority }: { project: Project; className?: string; priority?: boolean }) {
  const wrap = useRef<HTMLAnchorElement>(null);
  const img = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      gsap.set(el, { opacity: reduced ? 1 : 0.32 });
      if (reduced) return;
      gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "bottom 20%",
          onEnter: () => enter(),
          onEnterBack: () => enter(),
          onLeave: () => leave(),
          onLeaveBack: () => leave(),
        },
      });
      function enter() {
        gsap.to(el, { opacity: 1, duration: 0.5, ease: "power2.out" });
        gsap.to(img.current, { scale: 1.1, duration: 0.6, ease: "power2.out" });
        gsap.to(glow.current, { opacity: 0.2, duration: 0.5, ease: "power2.out" });
      }
      function leave() {
        gsap.to(el, { opacity: 0.32, duration: 0.5, ease: "power2.out" });
        gsap.to(img.current, { scale: 1, duration: 0.75, ease: "power2.out" });
        gsap.to(glow.current, { opacity: 0, duration: 0.5, ease: "power2.out" });
      }
    }, el);
    return () => ctx.revert();
  }, []);

  // magnetic button
  useEffect(() => {
    const el = wrap.current;
    const b = btn.current;
    if (!el || !b) return;
    const xTo = gsap.quickTo(b, "x", { duration: 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(b, "y", { duration: 0.6, ease: "power3.out" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo(e.clientX - r.left - r.width / 2);
      yTo(e.clientY - r.top - r.height / 2);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div className={cn("relative rounded-[24px]", className)}>
      <div ref={glow} aria-hidden className="absolute inset-0 rounded-[64px] bg-accent opacity-0 blur-[80px]" />
      <Link
        ref={wrap}
        href={`/works/${project.slug}`}
        aria-label={`Open case study: ${project.name}`}
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
        className={cn("orbit relative z-[2] flex aspect-[707/450] w-full items-center justify-center overflow-hidden rounded-[24px] bg-[#0b0b0b] p-1", hover && "is-active")}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[20px]">
          <div ref={img} className="absolute inset-0 will-change-transform">
            <Image
              src={project.cover}
              alt={`${project.name} — ${project.tagline}`}
              fill
              sizes="(max-width: 991px) 100vw, 55vw"
              className="object-cover"
              priority={priority}
            />
          </div>
        </div>
        <div
          ref={btn}
          aria-hidden
          className={cn(
            "pc-btn pointer-events-none absolute left-1/2 top-1/2 z-[4] -ml-[41px] -mt-[41px] flex h-[82px] w-[82px] items-center justify-center rounded-pill bg-accent text-accent-ink duration-300 ease-out",
            hover ? "opacity-100" : "opacity-0",
          )}
          style={{ transitionProperty: "opacity, scale", scale: hover ? "1" : "0.2" }}
        >
          <ArrowUpRight size={34} />
        </div>
      </Link>
    </div>
  );
}
