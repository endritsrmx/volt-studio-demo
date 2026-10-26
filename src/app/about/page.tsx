import type { Metadata } from "next";
import Image from "next/image";
import site, { services, BP } from "@/config/site";
import PageHero from "@/components/pages/PageHero";
import SectionHead from "@/components/ui/SectionHead";
import TitleText from "@/components/ui/Title";
import { ServiceBlock } from "@/components/home/Services";
import BlogPreview from "@/components/home/BlogPreview";
import { CtaCard } from "@/components/home/CtaSection";

export const metadata: Metadata = {
  title: "About",
  description: site.about.body,
};

export default function AboutPage() {
  const a = site.about;
  return (
    <>
      <PageHero
        tag={a.tag}
        title={a.title}
        body={a.body}
        image={`${BP}/images/projects/fizz.webp`}
        primary={{ label: "See our works", href: "/works" }}
        secondary={{ label: "Our services", href: "/services" }}
      />

      {/* team */}
      <section className="section">
        <div className="container-narrow">
          <SectionHead tag={a.team.tag} title={a.team.title} body={a.team.body} />
        </div>
        <div className="container-big mt-20 grid grid-cols-3 gap-6 max-md:grid-cols-1">
          {a.team.members.map((m, i) => (
            <figure key={m.name} data-reveal data-delay={String(0.1 * i)} className="group relative overflow-hidden rounded-[24px] border border-white/10">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={m.image || `${BP}/images/team/member-${i + 1}.webp`}
                  alt={m.name}
                  fill
                  sizes="(max-width: 991px) 100vw, 33vw"
                  className="object-cover grayscale transition-[transform,filter] duration-700 ease-out-expo group-hover:scale-105 group-hover:grayscale-0"
                />
              </div>
              <figcaption className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-[16px] bg-black/60 px-5 py-4 backdrop-blur-glass">
                <span className="text-[16px]">{m.name}</span>
                <span className="font-mono text-[11px] uppercase text-accent">{m.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* pillars */}
      <section className="section">
        <div className="container-narrow">
          <SectionHead tag={a.pillars.tag} title={a.pillars.title} />
        </div>
        <div className="container-big mt-20 grid grid-cols-4 gap-4 max-lg:grid-cols-2 max-xs:grid-cols-1">
          {a.pillars.items.map((p, i) => (
            <div
              key={p.title}
              data-reveal
              data-delay={String(0.08 * i)}
              className="card-line grid-paper group flex min-h-[300px] flex-col justify-between p-8 transition-colors duration-300 hover:border-accent"
            >
              <span className="font-mono text-[12px] text-accent">0{i + 1}</span>
              <div className="flex flex-col gap-3">
                <h3 className="title-l transition-colors duration-300 group-hover:text-accent">{p.title}</h3>
                <p className="p-small text-fg/80">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* services (sticky blocks) */}
      <section className="section">
        <div className="container-narrow mb-24">
          <SectionHead tag="Services" title={{ text: "What we ", accent: "build." }} />
        </div>
        <div className="container-big flex flex-col gap-[160px] max-md:gap-24">
          {services.map((s) => (
            <ServiceBlock key={s.slug} s={s} />
          ))}
        </div>
      </section>

      {/* manifesto */}
      <section className="section">
        <div className="container-narrow text-center">
          <h2 data-reveal className="title-xl">
            <TitleText title={a.manifesto.title} />
          </h2>
          <p data-reveal data-delay="0.2" className="p-hero mx-auto mt-6 max-w-[760px]">
            {a.manifesto.body}
          </p>
        </div>
      </section>

      <BlogPreview />

      <section className="section !pt-0">
        <div className="container-big">
          <CtaCard tag={site.ctaSection.tag} title={site.ctaSection.title} body={site.ctaSection.body} primary={site.ctaSection.primary} secondary={site.ctaSection.secondary} />
        </div>
      </section>
    </>
  );
}
