import Link from "next/link";
import site, { projects, services } from "@/config/site";
import SectionHead from "@/components/ui/SectionHead";
import TitleText, { Lines } from "@/components/ui/Title";
import Button from "@/components/ui/Button";
import { ArrowUpRight } from "@/components/ui/Icons";

const projectName = (slug: string) => projects.find((p) => p.slug === slug)?.name ?? slug;

export function ServiceBlock({ s }: { s: (typeof services)[number] }) {
  return (
    <div className="grid grid-cols-2 gap-x-[8vw] max-md:grid-cols-1 max-md:gap-y-12">
      {/* sticky intro */}
      <div className="md:sticky md:top-[30vh] md:self-start">
        <div data-reveal className="flex flex-col gap-4">
          <div className="title-xl text-accent">{s.number}</div>
          <h3 className="title-xl">
            <TitleText title={s.title} />
          </h3>
          <p className="p-body">
            <Lines text={s.subtitle} />
          </p>
          <div className="mt-4">
            <Button href={`/services/${s.slug}`} size="sm">
              Discover more
            </Button>
          </div>
        </div>
      </div>
      {/* sub-services */}
      <ul className="flex flex-col">
        {s.items.map((it, i) => (
          <li key={it.title} data-reveal data-delay={String(0.05 * i)} className="flex flex-col gap-4 border-t border-white/10 py-10 first:border-t-0 first:pt-0">
            <h4 className="title-mono">{it.title}</h4>
            <p className="p-small text-fg/90">{it.body}</p>
            {it.projects.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {it.projects.map((slug) => (
                  <Link
                    key={slug}
                    href={`/works/${slug}`}
                    className="group inline-flex h-9 items-center gap-2 rounded-pill bg-white/10 px-4 text-[12px] text-fg transition-colors duration-300 hover:bg-accent hover:text-accent-ink"
                  >
                    {projectName(slug)}
                    <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Services() {
  const s = site.servicesSection;
  return (
    <section id="services" className="section overflow-x-clip">
      <div className="container-narrow">
        <SectionHead tag={s.tag} title={s.title} body={s.body} />
      </div>
      <div className="h-[120px] max-sm:h-16" />
      <div className="container-big flex flex-col gap-[200px] max-md:gap-28">
        {services.map((sv) => (
          <ServiceBlock key={sv.slug} s={sv} />
        ))}
      </div>
    </section>
  );
}
