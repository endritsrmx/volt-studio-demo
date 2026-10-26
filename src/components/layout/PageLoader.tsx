"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import Logo from "@/components/ui/Logo";
import site from "@/config/site";

/**
 * First-visit loader: logo + progress bar that fills (1s inOutCubic),
 * then the whole overlay fades out. Shown once per browser session.
 */
export default function PageLoader() {
  const [show, setShow] = useState(site.motion.pageLoader);
  const root = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!show) return;
    let seen = false;
    try {
      seen = sessionStorage.getItem("loader-seen") === "1";
      sessionStorage.setItem("loader-seen", "1");
    } catch {
      /* storage unavailable – show loader */
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduced) {
      setShow(false);
      return;
    }
    const tl = gsap.timeline({ onComplete: () => setShow(false) });
    tl.fromTo(bar.current, { scaleX: 0 }, { scaleX: 0.6, duration: 0.6, ease: "cubic.inOut" })
      .to(bar.current, { scaleX: 1, duration: 0.6, ease: "cubic.inOut" })
      .to(root.current, { opacity: 0, duration: 0.5, ease: "power2.out" }, "+=0.1");
    return () => {
      tl.kill();
    };
  }, [show]);

  if (!show) return null;
  return (
    <div ref={root} className="fixed inset-0 z-[2000] flex flex-col items-center justify-center gap-8 bg-black" aria-hidden>
      <div className="text-[44px] text-fg">
        <Logo on />
      </div>
      <div className="h-[2px] w-[200px] overflow-hidden rounded-full bg-white/10">
        <div ref={bar} className="h-full w-full origin-left bg-accent" style={{ transform: "scaleX(0)" }} />
      </div>
    </div>
  );
}
