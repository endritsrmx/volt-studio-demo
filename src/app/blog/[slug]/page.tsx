import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import site, { posts } from "@/config/site";
import { PostRows } from "@/components/home/BlogPreview";
import { CtaCard } from "@/components/home/CtaSection";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = posts.find((x) => x.slug === slug);
  if (!p) return {};
  return { title: p.title, description: p.excerpt, openGraph: { type: "article", images: [p.cover], publishedTime: p.date } };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = posts.find((x) => x.slug === slug);
  if (!p) notFound();
  const more = posts.filter((x) => x.slug !== p.slug).slice(0, 3);
  return (
    <>
      <article>
        <header className="pt-[calc(var(--nav-h)+70px)]">
          <div className="container-narrow">
            <nav data-reveal aria-label="Breadcrumb" className="mb-8 flex gap-2 font-mono text-[11px] uppercase text-fg/60">
              <Link href="/" className="hover:text-accent">Home</Link>/<Link href="/blog" className="hover:text-accent">Journal</Link>/<span className="text-accent">{p.category}</span>
            </nav>
            <h1 data-reveal data-delay="0.15" className="title-xl">{p.title}</h1>
            <div data-reveal data-delay="0.25" className="mt-6 flex flex-wrap gap-3">
              <span className="chip">{formatDate(p.date)}</span>
              <span className="chip">{p.readTime} read</span>
              <span className="chip">{site.name}</span>
            </div>
          </div>
          <div className="container-big mt-14">
            <div data-reveal data-delay="0.3" className="relative aspect-[16/8] overflow-hidden rounded-[24px] border border-white/10">
              <Image src={p.cover} alt="" fill priority sizes="100vw" className="object-cover" />
            </div>
          </div>
        </header>
        <div className="section">
          <div className="container-narrow max-w-[760px]">
            <p data-reveal className="text-[22px] font-light leading-[1.55] text-fg">{p.excerpt}</p>
            {p.body.map((b, i) => (
              <section key={i} data-reveal className="mt-12">
                {b.heading && <h2 className="title-m mb-5 text-accent">{b.heading}</h2>}
                {b.paragraphs.map((t, j) => (
                  <p key={j} className="p-hero mb-5 text-fg/90">{t}</p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </article>
      <section className="section !pt-0">
        <div className="container-big">
          <CtaCard tag={site.name} title={{ text: "Want this applied to ", accent: "your site?" }} body="We'll map where it pays off for you — in one short call." primary={{ label: "Start a conversation", href: "/contact" }} secondary={{ label: "All articles", href: "/blog" }} />
        </div>
      </section>
      <section className="section !pt-0">
        <div className="container-big">
          <h2 data-reveal className="title-m mb-6">Keep reading</h2>
          <PostRows list={more} />
        </div>
      </section>
    </>
  );
}
