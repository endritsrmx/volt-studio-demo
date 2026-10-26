import Link from "next/link";
import { experiments } from "@/config/site";
import { ArrowUpRight } from "@/components/ui/Icons";

/** Horizontal rail of Lab experiments (used on works / project pages). */
export default function LabSlider({ tag = "Lab", title = "Explore projects from our lab" }: { tag?: string; title?: string }) {
  return (
    <section className="section">
      <div className="container-big">
        <div data-reveal className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div className="flex flex-col gap-3">
            <span className="eyebrow">{tag}</span>
            <h2 className="title-l">{title}</h2>
          </div>
          <Link href="/lab" className="link-sweep text-[14px] text-accent">
            Open the Lab →
          </Link>
        </div>
      </div>
      <div className="container-big">
        <ul className="-mx-[var(--gutter)] flex snap-x snap-mandatory gap-5 overflow-x-auto px-[var(--gutter)] pb-4 [scrollbar-width:none]" data-lenis-prevent-horizontal>
          {experiments.map((e, i) => (
            <li key={e.slug} data-reveal="fade" data-delay={String(i * 0.08)} className="w-[320px] shrink-0 snap-start">
              <Link
                href={`/lab#${e.slug}`}
                className="group orbit flex h-[380px] flex-col justify-between rounded-[24px] border border-white/10 bg-[#0c0c0c] p-7 transition-colors duration-300 hover:bg-[#121212]"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-14 w-14 items-center justify-center rounded-[16px] text-[22px] font-medium text-black" style={{ background: e.color === "#1f1f1f" || e.color === "#0e3b2a" ? "#2a2a2a" : e.color, color: e.color === "#1f1f1f" || e.color === "#0e3b2a" ? "#ccff00" : "#000" }}>
                    {e.icon}
                  </span>
                  <ArrowUpRight size={22} className="text-accent transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>
                <div className="flex flex-col gap-3">
                  <span className="font-mono text-[11px] uppercase text-accent">{e.category}</span>
                  <h3 className="title-m">{e.name}</h3>
                  <p className="p-small text-fg/75">{e.description}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
