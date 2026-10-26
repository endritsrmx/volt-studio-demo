"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap } from "@/lib/gsap";
import { useLenis } from "@/components/providers/SmoothScroll";
import { cn } from "@/lib/utils";
import { Close } from "@/components/ui/Icons";

/**
 * Centered glass modal (menu / contact).
 * Open: overlay fades in (300ms easeOut) → panel fades + rises.
 * Close: panel fades → overlay fades → unmount.
 */
export default function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  className,
  labelledBy,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  labelledBy: string;
}) {
  const [mounted, setMounted] = useState(false);
  const [render, setRender] = useState(open);
  const overlay = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const lenis = useLenis();

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (open) setRender(true);
  }, [open]);

  useEffect(() => {
    if (!render || !overlay.current || !panel.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const d = reduced ? 0 : 1;
    if (open) {
      lastFocus.current = document.activeElement as HTMLElement;
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
      gsap.fromTo(overlay.current, { opacity: 0 }, { opacity: 1, duration: 0.3 * d, ease: "power2.out" });
      gsap.fromTo(
        panel.current,
        { opacity: 0, y: 16 * d, scale: 0.985 },
        { opacity: 1, y: 0, scale: 1, duration: 0.45 * d, delay: 0.12 * d, ease: "quart.out" },
      );
      const first = panel.current.querySelector<HTMLElement>("button, a, input, textarea");
      window.setTimeout(() => first?.focus({ preventScroll: true }), 50);
    } else {
      const tl = gsap.timeline({
        onComplete: () => {
          setRender(false);
          lenis?.start();
          document.documentElement.style.overflow = "";
          lastFocus.current?.focus?.({ preventScroll: true });
        },
      });
      tl.to(panel.current, { opacity: 0, y: 10 * d, duration: 0.25 * d, ease: "power2.in" }).to(
        overlay.current,
        { opacity: 0, duration: 0.3 * d, ease: "power2.out" },
        "-=0.1",
      );
    }
  }, [open, render, lenis]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panel.current) {
        const f = panel.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled]), input, textarea, select");
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!mounted || !render) return null;

  return createPortal(
    <div
      ref={overlay}
      className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/80 px-4 py-6 backdrop-blur-[8px] sm:px-8"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      style={{ opacity: 0 }}
    >
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        data-lenis-prevent
        className={cn(
          "glass flex max-h-full w-full max-w-[602px] flex-col overflow-hidden rounded-[24px] p-px",
          className,
        )}
        style={{ opacity: 0 }}
      >
        <div className="flex items-center justify-between p-6">
          <h2 id={labelledBy} className="text-[16px] font-light leading-[22px] text-fg">
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="group flex h-9 w-9 items-center justify-center rounded-pill bg-panel/10 text-accent transition-[background-color,transform] duration-300 ease-out hover:rotate-90 hover:bg-accent hover:text-accent-ink"
          >
            <Close size={20} />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto border-t border-[#343434]">{children}</div>
        {footer && <div className="border-t border-[#343434] px-6 py-5">{footer}</div>}
      </div>
    </div>,
    document.body,
  );
}
