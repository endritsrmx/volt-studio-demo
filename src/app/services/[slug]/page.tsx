import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, services } from "@/config/site";
import PageHero from "@/components/pages/PageHero";
import SectionHead from "@/components/ui/SectionHead";
import ProjectCard from "@/components/ui/ProjectCard";
import FaqSection from "@/components/home/FaqSection";
import { CtaCard } from "@/components/home/CtaSection";
import { ArrowUpRight } from "@/components/ui/Icons";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) return {};
  return { title: s.menuLabel, description: s.page.hero.body };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) notFound();
  const related = projects.filter((p) => s.items.some((i) => i.projects.includes(p.slug))).slice(0, 2);

  return (
    <>
      <PageHero
        tag="Service"
        title={s.page.hero.title}
        body={s.page.hero.body}
        primary={{ label: "Start a project", href: "/contact" }}
        secondary={{ label: "See related work", href: "#related" }}
      />

      <section className="section">
        <div className="container-narrow">
          <SectionHead tag={s.page.highlight.tag} title={s.page.highlight.title} body={s.page.highlight.body} />
        </div>
        <div className="container-big mt-20 grid grid-cols-3 gap-4 max-md:grid-cols-1">
          {s.page.highlight.points.map((pt, i) => (
            <div key={pt.title} data-reveal data-delay={String(i * 0.1)} className="card-line grid-paper flex min-h-[260px] flex-col justify-between gap-8 p-8 transition-colors duration-300 hover:border-accent">
              <span className="font-mono text-[12px] text-accent">0{i + 1}</span>
              <div className="flex flex-col gap-3">
                <h3 className="title-m">{pt.title}</h3>
                <p className="p-small text-fg/80">{pt.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* detailed offering */}
      <section className="section">
        <div className="container-big">
          <ul className="flex flex-col">
            {s.items.map((it, i) => (
              <li key={it.title} data-reveal className="grid grid-cols-[120px_1fr_1.3fr] gap-8 border-t border-white/15 py-12 max-md:grid-cols-1 max-md:gap-4">
                <span className="title-m text-accent">0{i + 1}</span>
                <h3 className="title-m">{it.title}</h3>
                <div className="flex flex-col gap-5">
                  <p className="p-hero text-fg/90">{it.body}</p>
                  <div className="flex flex-wrap gap-2">
                    {it.projects.map((slug) => {
                      const p = projects.find((x) => x.slug === slug);
                      return p ? (
                        <Link key={slug} href={`/works/${slug}`} className="group inline-flex h-9 items-center gap-2 rounded-pill bg-white/10 px-4 text-[12px] transition-colors duration-300 hover:bg-accent hover:text-accent-ink">
                          {p.name}
                          <ArrowUpRight size={14} />
                        </Link>
                      ) : null;
                    })}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {related.length > 0 && (
        <section id="related" className="section">
          <div className="container-narrow mb-16">
            <SectionHead tag="Selected work" title={{ text: "Proof, ", accent: "not promises." }} />
          </div>
          <div className="container-big grid grid-cols-2 gap-10 max-md:grid-cols-1">
            {related.map((p) => (
              <div key={p.slug} data-reveal className="flex flex-col gap-5">
                <ProjectCard project={p} />
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="title-m">{p.name}</h3>
                  <span className="font-mono text-[11px] uppercase text-accent">{p.tags.slice(0, 2).join(" / ")}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <FaqSection items={s.page.faq} />

      <section className="section !pt-0">
        <div className="container-big">
          <CtaCard tag="Start here" title={s.page.cta.title} body={s.page.cta.body} primary={{ label: "Start a conversation", href: "/contact" }} secondary={{ label: "See our works", href: "/works" }} />
        </div>
      </section>
    </>
  );
}
