import Link from "next/link";
import site, { projects } from "@/config/site";
import SectionHead from "@/components/ui/SectionHead";
import ProjectCard from "@/components/ui/ProjectCard";
import Button from "@/components/ui/Button";

export function ProjectRow({ p, index }: { p: (typeof projects)[number]; index: number }) {
  return (
    <article data-reveal className="grid grid-cols-[471fr_707fr] items-center gap-[60px] max-md:grid-cols-1 max-md:gap-8">
      <div className="flex flex-col gap-[14px] max-md:order-2">
        <ul className="flex flex-wrap gap-2" aria-label="Disciplines">
          {p.tags.map((t) => (
            <li key={t} className="chip">
              {t}
            </li>
          ))}
        </ul>
        <h3 className="title-l">
          <Link href={`/works/${p.slug}`} className="link-sweep">
            {p.name}
          </Link>
        </h3>
        <p className="title-mono">{p.tagline}</p>
        <p className="p-small text-fg/90">{p.summary}</p>
      </div>
      <ProjectCard project={p} className="max-md:order-1" priority={index === 0} />
    </article>
  );
}

export default function Work({ limit }: { limit?: number }) {
  const w = site.workSection;
  const list = limit ? projects.slice(0, limit) : projects;
  return (
    <section className="section" id="work">
      <div className="container-big">
        <SectionHead tag={w.tag} title={w.title} body={w.body} />
        <div className="h-[160px] max-sm:h-16" />
        <div className="flex flex-col gap-[180px] max-md:gap-24">
          {list.map((p, i) => (
            <ProjectRow key={p.slug} p={p} index={i} />
          ))}
        </div>
        {limit && projects.length > limit && (
          <div className="mt-24 flex justify-center">
            <Button href="/works" variant="secondary">
              View all works
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
