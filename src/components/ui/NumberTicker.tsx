"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Rolling-digit ticker: each digit is a vertical strip that slides to its value
 * when the element scrolls into view. Suffix fades in after the roll.
 */
export default function NumberTicker({
  value,
  decimals = 0,
  suffix,
  className,
  suffixClassName,
  locale = "en-US",
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  className?: string;
  suffixClassName?: string;
  locale?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [on, setOn] = useState(false);
  const text = new Intl.NumberFormat(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <span ref={ref} className={cn("ticker", className)} aria-label={`${text}${suffix ?? ""}`}>
      {text.split("").map((ch, i) =>
        /\d/.test(ch) ? (
          <span key={i} className="ticker-digit" aria-hidden>
            <span
              className="ticker-strip"
              style={{ transform: `translateY(${on ? -Number(ch) : 0}em)`, transitionDelay: `${i * 80}ms` }}
            >
              {Array.from({ length: 10 }, (_, d) => (
                <span key={d}>{d}</span>
              ))}
            </span>
          </span>
        ) : (
          <span key={i} aria-hidden>
            {ch}
          </span>
        ),
      )}
      {suffix && (
        <span
          aria-hidden
          className={cn("inline-block transition-[opacity,transform] duration-500", on ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0", suffixClassName)}
          style={{ transitionDelay: on ? "1.3s" : "0s" }}
        >
          {suffix}
        </span>
      )}
    </span>
  );
}
