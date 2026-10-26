import Link from "next/link";
import site, { posts } from "@/config/site";
import Button from "@/components/ui/Button";
import { ArrowUpRight } from "@/components/ui/Icons";

export function PostRows({ list }: { list: typeof posts }) {
  return (
    <ul className="flex flex-col">
      {list.map((p, i) => (
        <li key={p.slug} data-reveal="fade" data-delay={String(0.06 * i)}>
          <Link
            href={`/blog/${p.slug}`}
            className="group grid grid-cols-[1fr_1fr] gap-8 border-b border-white/15 py-8 transition-colors max-sm:grid-cols-1 max-sm:gap-3"
          >
            <h3 className="flex items-start gap-3 text-[22px] font-normal leading-[1.3] text-accent transition-colors duration-300 group-hover:text-fg">
              <span>{p.title}</span>
              <ArrowUpRight
                size={20}
                className="mt-1 shrink-0 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
              />
            </h3>
            <div className="flex flex-col gap-3">
              <p className="p-small text-fg/80 transition-colors duration-300 group-hover:text-fg">{p.excerpt}</p>
              <span className="font-mono text-[10px] uppercase text-fg/50">
                {p.category} · {p.readTime} read
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function BlogPreview() {
  const b = site.blogSection;
  return (
    <section className="section">
      <div className="container-big grid grid-cols-[1fr_2.4fr] gap-16 max-md:grid-cols-1 max-md:gap-10">
        <div className="md:sticky md:top-[140px] md:self-start">
          <h2 data-reveal className="title-l" style={{ fontSize: "clamp(32px, 2.92vw, 42px)" }}>
            {b.title}
          </h2>
        </div>
        <PostRows list={posts.slice(0, 5)} />
      </div>
      <div className="mt-16 flex justify-center">
        <Button href={b.cta.href}>{b.cta.label}</Button>
      </div>
    </section>
  );
}
