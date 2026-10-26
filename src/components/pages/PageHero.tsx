"use client";

import dynamic from "next/dynamic";
import type { Title } from "@/config/site";
import TitleText from "@/components/ui/Title";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const GrainGradient = dynamic(() => import("@/components/gl/GrainGradient"), { ssr: false });

/** Generic internal-page hero: centered, grain gradient glow, optional image backdrop. */
export default function PageHero({
  tag,
  title,
  body,
  primary,
  secondary,
  image,
  compact,
  children,
}: {
  tag: string;
  title: Title;
  body?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  image?: string;
  compact?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <section className={cn("relative flex items-center overflow-hidden pt-[calc(var(--nav-h)+40px)]", compact ? "min-h-[70svh] pb-16" : "min-h-[100svh] pb-20")}>
      <div className="pointer-events-none absolute inset-x-0 top-[25%] h-full" aria-hidden>
        <GrainGradient low={0.5} high={1.2} warpFrequency={1.8} warpAmplitude={0.5} />
      </div>
      {image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt="" aria-hidden className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-35 mix-blend-luminosity" />
      )}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_45%,rgba(0,0,0,0.55),transparent)]" aria-hidden />
      <div className="container-narrow relative z-[2] flex flex-col items-center text-center">
        <div data-reveal data-delay="0.15" className="flex flex-col items-center gap-5">
          <span className="tag">{tag}</span>
          <h1 className="title-xl">
            <TitleText title={title} />
          </h1>
          {body && <p className="p-hero max-w-[720px]">{body}</p>}
          {(primary || secondary) && (
            <div className="mt-3 flex flex-wrap justify-center gap-4">
              {primary && <Button href={primary.href}>{primary.label}</Button>}
              {secondary && (
                <Button href={secondary.href} variant="secondary">
                  {secondary.label}
                </Button>
              )}
            </div>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
