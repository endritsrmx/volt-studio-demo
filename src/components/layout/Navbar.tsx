"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Logo from "@/components/ui/Logo";
import Clock from "@/components/ui/Clock";
import { MenuGrid, Bolt } from "@/components/ui/Icons";
import { useUI } from "@/components/providers/UIProvider";
import site from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Fixed glass navbar. Switches to dark ink while it overlaps any element
 * marked `data-nav="light"` (accent-colored sections).
 */
export default function Navbar() {
  const { toggle, open, panel } = useUI();
  const pathname = usePathname();
  const [light, setLight] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      const h = navRef.current?.offsetHeight ?? 74;
      const probe = h / 2;
      const lights = document.querySelectorAll<HTMLElement>('[data-nav="light"]');
      let isLight = false;
      lights.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= probe && r.bottom >= probe) isLight = true;
      });
      setLight(isLight);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const t = window.setTimeout(check, 400);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.clearTimeout(t);
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  return (
    <header
      ref={navRef}
      className={cn(
        "fixed inset-x-0 top-0 z-[999] h-[var(--nav-h)] backdrop-blur-glass transition-colors duration-300",
        light ? "bg-black/[0.03] text-black" : "bg-black/10 text-fg",
      )}
    >
      <nav className="container-big flex h-full items-center justify-between" aria-label="Primary">
        <Link href="/" aria-label={`${site.name} — home`} className="text-[20px]">
          <Logo />
        </Link>

        <div className="flex items-center gap-3 sm:gap-6">
          <button
            onClick={() => toggle("menu")}
            aria-haspopup="dialog"
            aria-expanded={panel === "menu"}
            className={cn(
              "roll-host group flex h-10 items-center gap-2 rounded-pill px-4 text-[13px] transition-colors duration-300",
              light ? "bg-black/10 hover:bg-black/20" : "hover:bg-white/10",
            )}
          >
            <MenuGrid size={14} className="transition-transform duration-500 ease-out-expo group-hover:rotate-90" />
            <span className="roll">
              <span>Menu</span>
              <span aria-hidden>Menu</span>
            </span>
          </button>

          <Clock className={cn("font-mono text-[11px] max-sm:hidden", light ? "text-black/80" : "text-accent")} />

          <button
            onClick={() => open("contact")}
            aria-label="Start a project"
            className={cn(
              "icon-btn h-10 w-10",
              light ? "bg-black text-accent" : "bg-accent text-accent-ink",
            )}
          >
            <Bolt size={18} />
          </button>
        </div>
      </nav>
    </header>
  );
}
