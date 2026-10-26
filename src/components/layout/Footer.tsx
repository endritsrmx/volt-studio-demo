"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useState } from "react";
import site, { projects, services } from "@/config/site";
import { SocialIcon, ArrowUpRight } from "@/components/ui/Icons";
import { useUI } from "@/components/providers/UIProvider";
import { cn } from "@/lib/utils";

const GrainGradient = dynamic(() => import("@/components/gl/GrainGradient"), { ssr: false });

/**
 * Accent footer. The pill inside the giant logo is a real switch:
 * it flips the whole footer between "accent" and "dark" themes.
 */
export default function Footer() {
  const { open } = useUI();
  const [dark, setDark] = useState(false);
  const year = new Date().getFullYear();

  const info = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Work", href: "/works" },
    ...services.map((s) => ({ label: s.menuLabel.replace(" & Development", ""), href: `/services/${s.slug}` })),
    { label: "Lab", href: "/lab" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
    ...site.footer.legal,
  ];

  const ink = dark ? "text-accent" : "text-black";

  return (
    <footer
      data-nav={dark ? undefined : "light"}
      className={cn("relative overflow-hidden transition-colors duration-300 ease-out", dark ? "bg-black" : "bg-accent", ink)}
    >
      {/* grain gradient only visible in the dark variant */}
      <div className={cn("pointer-events-none absolute inset-0 transition-opacity duration-700", dark ? "opacity-100" : "opacity-0")} aria-hidden>
        {dark && <GrainGradient low={0.55} high={1.2} warpFrequency={5} warpAmplitude={0.5} />}
      </div>

      <div className="container-big relative pb-8 pt-[100px] max-sm:pt-16">
        {/* top row */}
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="text-[16px]">Contact Us</span>
            <ul className="flex gap-2">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    aria-label={s.label}
                    className={cn(
                      "icon-btn h-9 w-9",
                      dark ? "bg-accent text-black" : "bg-black text-accent",
                    )}
                  >
                    <SocialIcon name={s.icon} size={16} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={() => open("contact")}
            className={cn("roll-host btn btn-sm", dark ? "bg-accent text-black" : "bg-black text-accent")}
          >
            <span className="roll">
              <span>Start a Project</span>
              <span aria-hidden>Start a Project</span>
            </span>
            <ArrowUpRight size={16} className="ml-2" />
          </button>
        </div>

        {/* columns */}
        <div className="mt-16 grid gap-12 md:grid-cols-[1fr_1.3fr_1.6fr]">
          <div>
            <div className="mb-5 font-mono text-[11px] uppercase opacity-70">{site.footer.infoTitle}</div>
            <ul className="flex flex-col gap-[6px]">
              {info.map((l) => (
                <li key={l.href + l.label}>
                  <Link href={l.href} className="link-sweep text-[16px] leading-[22px]">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mb-5 flex items-center justify-between font-mono text-[11px] uppercase">
              <span className="opacity-70">{site.footer.projectsTitle}</span>
              <Link href="/works" className="link-sweep">
                View all
              </Link>
            </div>
            <ul className="flex flex-col gap-[6px]">
              {projects.map((p) => (
                <li key={p.slug}>
                  <Link href={`/works/${p.slug}`} className="link-sweep text-[13px]">
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-8 flex flex-col gap-1 text-[13px] opacity-80">
              <li>
                <a href={`mailto:${site.contact.email}`} className="link-sweep">
                  {site.contact.email}
                </a>
              </li>
              <li>{site.contact.phone}</li>
              <li>{site.contact.address}</li>
            </ul>
          </div>
          <p className="max-w-[440px] text-[15px] font-light leading-[1.6] md:justify-self-end">{site.footer.statement}</p>
        </div>

        {/* giant logo with a working switch */}
        <div className="mt-20 select-none max-sm:mt-14" aria-label={site.name}>
          <div
            className="flex items-center font-medium leading-[0.8] tracking-[-0.045em]"
            style={{ fontSize: "clamp(64px, 17.4vw, 330px)" }}
          >
            <span aria-hidden>{site.logo.prefix}</span>
            <button
              role="switch"
              aria-checked={dark}
              aria-label="Toggle footer theme"
              onClick={() => setDark((v) => !v)}
              className={cn(
                "relative mx-[0.03em] inline-flex h-[0.6em] w-[1.3em] shrink-0 items-center rounded-pill transition-colors duration-300",
                dark ? "bg-accent" : "bg-black",
              )}
            >
              <span
                className={cn(
                  "absolute top-1/2 h-[0.46em] w-[0.46em] -translate-y-1/2 rounded-full transition-[left,background-color] duration-300 ease-spring",
                  dark ? "left-[calc(100%-0.53em)] bg-black" : "left-[0.07em] bg-accent",
                )}
              />
            </button>
            <span aria-hidden>{site.logo.suffix}</span>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-current/20 pt-6 text-[12px] opacity-80" style={{ borderColor: "currentColor" }}>
          <span>
            © {year} {site.name}. All rights reserved.
          </span>
          <span>{site.footer.credit}</span>
        </div>
      </div>
    </footer>
  );
}
