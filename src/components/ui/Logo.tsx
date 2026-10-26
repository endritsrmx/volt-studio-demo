"use client";

import site from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Typeset logo: prefix + pill + suffix (configure in site.ts → logo).
 * The pill's dot slides on hover (or when `on` is true).
 * Size is driven by font-size (em units), so it scales from nav to footer.
 */
export default function Logo({ className, on, interactive = true }: { className?: string; on?: boolean; interactive?: boolean }) {
  if (site.logo.image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={site.logo.image} alt={site.name} className={cn("h-[1em] w-auto", className)} />;
  }
  return (
    <span className={cn("group/logo inline-flex items-center font-medium leading-none tracking-[-0.03em]", className)} aria-label={site.name}>
      <span aria-hidden>{site.logo.prefix}</span>
      <span
        aria-hidden
        className={cn(
          "relative mx-[0.04em] inline-flex h-[0.62em] w-[1.25em] items-center rounded-pill bg-current p-[0.08em] transition-colors",
        )}
      >
        <span
          className={cn(
            "absolute left-[0.08em] top-1/2 h-[0.46em] w-[0.46em] -translate-y-1/2 rounded-full bg-accent transition-[left] duration-[350ms] ease-spring",
            on && "left-[calc(100%-0.54em)]",
            interactive && !on && "group-hover/logo:left-[calc(100%-0.54em)]",
          )}
          style={{ mixBlendMode: "normal" }}
        />
      </span>
      <span aria-hidden>{site.logo.suffix}</span>
    </span>
  );
}
