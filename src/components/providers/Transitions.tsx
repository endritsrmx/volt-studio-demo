"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { scrollToTarget, useLenis } from "./SmoothScroll";
import { useUI } from "./UIProvider";
import site from "@/config/site";

/**
 * Global page-transition + reveal controller.
 *  • Intercepts internal <a> clicks → curtain fades in → route changes → curtain fades out.
 *  • Handles in-page hash links with smooth scrolling.
 *  • (Re)initialises [data-reveal] "unblur" reveals on every route.
 */
export default function Transitions() {
  const router = useRouter();
  const pathname = usePathname();
  const lenis = useLenis();
  const { close } = useUI();
  const curtain = useRef<HTMLDivElement>(null);
  const navigating = useRef(false);
  const lenisRef = useRef(lenis);
  lenisRef.current = lenis;

  /* ── link interception ── */
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement).closest("a");
      if (!a || a.target === "_blank" || a.hasAttribute("download") || a.dataset.noTransition !== undefined) return;
      const href = a.getAttribute("href");
      if (!href || /^(mailto:|tel:|https?:)/.test(href)) return;
      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) return;

      // same-page anchor
      if (url.pathname === window.location.pathname && url.hash) {
        e.preventDefault();
        close();
        scrollToTarget(lenisRef.current, url.hash);
        history.replaceState(null, "", url.hash);
        return;
      }
      if (url.pathname === window.location.pathname && !url.hash) {
        e.preventDefault();
        close();
        scrollToTarget(lenisRef.current, 0);
        return;
      }

      e.preventDefault();
      close();
      if (navigating.current) return;
      navigating.current = true;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!site.motion.pageTransitions || reduced || !curtain.current) {
        router.push(url.pathname + url.search + url.hash);
        return;
      }
      gsap.to(curtain.current, {
        autoAlpha: 1,
        backdropFilter: "blur(12px)",
        duration: 0.45,
        ease: "power2.out",
        onComplete: () => router.push(url.pathname + url.search + url.hash),
      });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [router, close]);

  /* ── on every route: reset scroll, hide curtain, init reveals ── */
  useEffect(() => {
    navigating.current = false;
    const hash = window.location.hash;
    if (hash) {
      requestAnimationFrame(() => scrollToTarget(lenisRef.current, hash, true));
    } else {
      lenisRef.current?.scrollTo(0, { immediate: true, force: true });
      window.scrollTo(0, 0);
    }
    if (curtain.current) {
      gsap.to(curtain.current, { autoAlpha: 0, backdropFilter: "blur(0px)", duration: 0.6, ease: "power2.out", delay: 0.05 });
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let ctx: gsap.Context | null = null;
    let t = 0;
    const start = () => {
    ctx = gsap.context(() => {
      const els = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      els.forEach((el) => {
        // On small screens, show "up" blocks immediately (avoids empty gaps while scrolling on phones)
        if (reduced || (el.dataset.reveal === "up" && window.innerWidth < 768)) {
          el.dataset.revealed = "1";
          return;
        }
        const delay = parseFloat(el.dataset.delay || "0.1");
        const kind = el.dataset.reveal;
        const from: gsap.TweenVars = kind === "up" ? { y: 32 } : kind === "fade" ? {} : { filter: "blur(20px)" };
        const to: gsap.TweenVars =
          kind === "up"
            ? { opacity: 1, y: 0, duration: 0.6, ease: "power1.out" }
            : kind === "fade"
              ? { opacity: 1, duration: 1.2, ease: "power1.inOut" }
              : { opacity: 1, filter: "blur(0px)", duration: 1.5, ease: "expo.out" };
        gsap.fromTo(el, { opacity: 0, ...from }, {
          ...to,
          delay,
          onComplete: () => {
            el.dataset.revealed = "1";
            gsap.set(el, { clearProps: "filter,transform,opacity" });
          },
          scrollTrigger: { trigger: el, start: "top 100%", once: true },
        });
      });
    });
    t = window.setTimeout(() => ScrollTrigger.refresh(), 300);
    };
    // Wait for the intro overlay (if any) before revealing the hero
    const w = window as unknown as { __introDone?: boolean };
    const html = document.documentElement;
    if (w.__introDone || !html.classList.contains("intro")) start();
    else window.addEventListener("intro:done", start, { once: true });
    return () => {
      window.removeEventListener("intro:done", start);
      window.clearTimeout(t);
      ctx?.revert();
    };
  }, [pathname]);

  return (
    <div
      ref={curtain}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1500] bg-black/80"
      style={{ opacity: 0, visibility: "hidden" }}
    />
  );
}
