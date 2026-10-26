"use client";

import { useEffect, useRef } from "react";

/**
 * Mouse image trail: as the cursor travels across the host element, images
 * pop in at the pointer, drift with momentum and fade/scale out.
 * Only runs on devices with a fine pointer; respects reduced motion.
 */
export default function ImageTrail({ images, hostRef, threshold = 90 }: { images: string[]; hostRef: React.RefObject<HTMLElement | null>; threshold?: number }) {
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const root = layer.current;
    if (!host || !root) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const pool: HTMLImageElement[] = images.map((src) => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = "";
      img.decoding = "async";
      img.className = "absolute left-0 top-0 h-[190px] w-[150px] rounded-[14px] object-cover opacity-0 will-change-transform";
      root.appendChild(img);
      return img;
    });
    let idx = 0;
    let z = 1;
    let last = { x: 0, y: 0 };
    let started = false;

    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (!started) {
        last = { x, y };
        started = true;
        return;
      }
      const dx = x - last.x;
      const dy = y - last.y;
      if (Math.hypot(dx, dy) < threshold) return;
      const img = pool[idx % pool.length];
      idx++;
      img.getAnimations().forEach((a) => a.cancel());
      img.style.zIndex = String(z++);
      const tx = x + dx * 0.9;
      const ty = y + dy * 0.9;
      img.animate(
        [
          { opacity: 1, transform: `translate(${last.x - 75}px, ${last.y - 95}px) scale(1)` },
          { opacity: 1, transform: `translate(${tx - 75}px, ${ty - 95}px) scale(1)`, offset: 0.35 },
          { opacity: 0, transform: `translate(${tx - 75}px, ${ty - 95 + 40}px) scale(0.2)` },
        ],
        { duration: 1300, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "forwards" },
      );
      last = { x, y };
    };
    const onLeave = () => {
      started = false;
    };
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    return () => {
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      pool.forEach((p) => p.remove());
    };
  }, [images, hostRef, threshold]);

  return <div ref={layer} aria-hidden className="pointer-events-none absolute inset-0 z-[1] overflow-hidden" />;
}
