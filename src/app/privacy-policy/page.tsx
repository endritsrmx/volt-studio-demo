import type { Metadata } from "next";
import site from "@/config/site";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Privacy Policy", robots: { index: true } };

export default function PrivacyPage() {
  return (
    <section className="pb-32 pt-[calc(var(--nav-h)+80px)]">
      <div className="container-narrow max-w-[760px]">
        <span className="eyebrow">Legal</span>
        <h1 data-reveal className="title-xl mt-4">Privacy Policy</h1>
        <p className="mt-4 font-mono text-[11px] uppercase text-fg/60">Last updated {formatDate(site.privacy.updated)}</p>
        {site.privacy.sections.map((s) => (
          <div key={s.heading} className="mt-12">
            <h2 className="title-m text-accent">{s.heading}</h2>
            <p className="p-hero mt-4 text-fg/90">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
