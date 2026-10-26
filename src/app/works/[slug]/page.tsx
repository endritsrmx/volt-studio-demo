import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/config/site";
import Button from "@/components/ui/Button";
import NumberTickerish from "@/components/pages/ResultValue";
import LabSlider from "@/components/pages/LabSlider";
import { ArrowRight } from "@/components/ui/Icons";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return { title: `${p.name} — ${p.tagline}`, description: p.summary, openGraph: { images: [p.cover] } };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const idx = projects.findIndex((x) => x.slug === slug);
  if (idx < 0) notFound();
  const p = projects[idx];
  const next = projects[(idx + 1) % projects.length];

  return (
    <>
      <section className="relative pt-[calc(var(--nav-h)+80px)]">
        <div className="container-big">
          <div data-reveal data-delay="0.15" className="flex flex-col gap-5">
            <div className="font-mono text-[11px] uppercase text-accent">{p.tags.join(" / ")}</div>
            <h1 className="title-xl" style={{ fontSize: "clamp(48px, 7vw, 110px)", lineHeight: 1 }}>
              {p.name}
            </h1>
            <p className="title-mono max-w-[760px]">{p.tagline}</p>
          </div>
          <div data-reveal data-delay="0.3" className="relative mt-14 aspect-[1410/900] w-full overflow-hidden rounded-[24px] border border-white/10">
            <Image src={p.cover} alt={p.name} fill priority sizes="100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-big grid grid-cols-[1fr_2fr] gap-16 max-md:grid-cols-1">
          <dl data-reveal className="flex flex-col gap-6 md:sticky md:top-[120px] md:self-start">
            {[
              ["Client", p.client],
              ["Year", p.year],
              ["Services", p.services.join(", ")],
            ].map(([k, v]) => (
              <div key={k} className="border-t border-white/15 pt-4">
                <dt className="font-mono text-[11px] uppercase text-accent">{k}</dt>
                <dd className="mt-2 text-[16px] font-light">{v}</dd>
              </div>
            ))}
            {p.liveUrl && (
              <div>
                <Button href={p.liveUrl} variant="secondary" size="sm">
                  Visit live site
                </Button>
              </div>
            )}
          </dl>
          <div className="flex flex-col gap-16">
            <p data-reveal className="text-[22px] font-light leading-[1.5] sm:text-[26px]">
              {p.summary}
            </p>
            {[
              ["The challenge", p.challenge],
              ["Our approach", p.approach],
              ["The outcome", p.outcome],
            ].map(([h, t]) => (
              <div key={h} data-reveal className="flex flex-col gap-4">
                <h2 className="title-mono">{h}</h2>
                <p className="p-hero text-fg/90">{t}</p>
              </div>
            ))}
            <div className="grid grid-cols-3 gap-4 max-sm:grid-cols-1">
              {p.results.map((r, i) => (
                <div key={r.label} data-reveal data-delay={String(i * 0.1)} className="card-line grid-paper flex flex-col gap-3 p-6">
                  <NumberTickerish value={r.value} />
                  <span className="text-[13px] font-light text-fg/80">{r.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section !pt-0">
        <div className="container-big">
          <Link
            href={`/works/${next.slug}`}
            className="group flex items-center justify-between gap-6 border-y border-white/15 py-12 transition-colors hover:border-accent"
          >
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[11px] uppercase text-accent">Next project</span>
              <span className="title-xl transition-colors duration-300 group-hover:text-accent">{next.name}</span>
            </div>
            <span className="flex h-[82px] w-[82px] shrink-0 items-center justify-center rounded-pill bg-accent text-accent-ink transition-transform duration-500 ease-out-expo group-hover:scale-110">
              <ArrowRight size={30} />
            </span>
          </Link>
        </div>
      </section>
      <LabSlider tag="See also" title="Other experiments you'll like" />
    </>
  );
}
