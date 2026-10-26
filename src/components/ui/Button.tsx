"use client";

import Link from "next/link";
import { cn, isExternal } from "@/lib/utils";

type Variant = "primary" | "secondary" | "dark";
type Props = {
  href?: string;
  onClick?: () => void;
  children: string;
  variant?: Variant;
  size?: "md" | "sm";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  icon?: React.ReactNode;
};

/** Pill button with an expanding fill circle (follows pointer entry) and a rolling label. */
export default function Button({ href, onClick, children, variant = "primary", size = "md", className, type = "button", disabled, icon }: Props) {
  const cls = cn("btn roll-host", `btn-${variant}`, size === "sm" && "btn-sm", disabled && "pointer-events-none opacity-50", className);
  const onEnter = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--fx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--fy", `${e.clientY - r.top}px`);
  };
  const inner = (
    <>
      <span className="btn-fill" aria-hidden />
      <span className="roll">
        <span>{children}</span>
        <span aria-hidden>{children}</span>
      </span>
      {icon && <span className="ml-2 inline-flex">{icon}</span>}
    </>
  );
  if (href) {
    if (isExternal(href)) {
      return (
        <a href={href} className={cls} onPointerEnter={onEnter} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} onPointerEnter={onEnter}>
        {inner}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls} onPointerEnter={onEnter} disabled={disabled}>
      {inner}
    </button>
  );
}
