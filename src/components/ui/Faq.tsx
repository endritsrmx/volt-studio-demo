"use client";

import { useState } from "react";
import { Plus } from "./Icons";
import { cn } from "@/lib/utils";

/** Accordion. Height animates via grid rows; icon rotates; accent stripe on the open item. */
export default function Faq({ items, className }: { items: { q: string; a: string }[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div
            key={it.q}
            data-reveal="fade"
            data-delay={String(0.05 * i)}
            className={cn(
              "group relative overflow-hidden rounded-lg border border-transparent bg-white/10 transition-[border-color,background-color] duration-300 ease-out hover:border-accent/50",
              isOpen && "bg-white/[0.13]",
            )}
          >
            <span
              aria-hidden
              className={cn("absolute left-0 top-0 h-full w-[2px] bg-accent transition-opacity duration-300", isOpen ? "opacity-100" : "opacity-0")}
            />
            <h3>
              <button
                className="flex w-full items-center gap-4 text-left"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className="flex-1 p-5 text-[17px] font-light leading-[1.6] text-accent sm:text-[19px]">{it.q}</span>
                <span className="p-5 text-accent">
                  <Plus size={20} className={cn("transition-transform duration-[350ms] ease-out", isOpen && "rotate-45")} />
                </span>
              </button>
            </h3>
            <div className="grid transition-[grid-template-rows] duration-[350ms] ease-out" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
              <div className="overflow-hidden">
                <div className="mx-5 border-t border-dashed border-white/25" />
                <p
                  className={cn(
                    "p-5 text-[16px] font-light leading-[1.6] text-fg transition-[opacity,transform] duration-[350ms] ease-out",
                    isOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                  )}
                >
                  {it.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
