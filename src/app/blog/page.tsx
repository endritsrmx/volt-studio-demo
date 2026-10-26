import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { posts } from "@/config/site";
import site from "@/config/site";
import { PostRows } from "@/components/home/BlogPreview";
import LabSlider from "@/components/pages/LabSlider";
import { CtaCard } from "@/components/home/CtaSection";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Journal",
  description: "Guides and notes on web design, 3D on the web and practical AI.",
};

export default function BlogPage() {
  const [feature, ...rest] = posts;
  return (
    <>
      <section className="pt-[calc(var(--nav-h)+80px)]">
        <div className="container-big">
          <div data-reveal data-delay="0.15" className="flex flex-col gap-4">
            <span className="eyebrow">Journal</span>
            <h1 className="title-xl">
              Notes from <span className="text-accent">the studio.</span>
            </h1>
          </div>
          <Link href={`/blog/${feature.slug}`} data-reveal data-delay="0.3" className="group orbit mt-14 grid grid-cols-[1.4fr_1fr] overflow-hidden rounded-[24px] border border-white/10 bg-[#0c0c0c] max-md:grid-cols-1">
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image src={feature.cover} alt="" fill priority sizes="(max-width: 991px) 100vw, 60vw" className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105" />
            </div>
            <div className="flex flex-col justify-center gap-5 p-10 max-sm:p-6">
              <span className="font-mono text-[11px] uppercase text-accent">
                Featured · {feature.category} · {formatDate(feature.date)}
              </span>
              <h2 className="title-m transition-colors duration-300 group-hover:text-accent">{feature.title}</h2>
              <p className="p-small text-fg/80">{feature.excerpt}</p>
              <span className="text-[13px] text-accent">Read article →</span>
            </div>
          </Link>
        </div>
      </section>
      <section className="section">
        <div className="container-big">
          <PostRows list={rest} />
        </div>
      </section>
      <LabSlider tag="See also" title="Discover our lab projects" />
      <section className="section !pt-0">
        <div className="container-big">
          <CtaCard tag="Contact us" title={site.contactPage.title} body={site.contactPage.body} primary={{ label: "Start a conversation", href: "/contact" }} />
        </div>
      </section>
    </>
  );
}
