import type { Metadata } from "next";
import site, { projects } from "@/config/site";
import PageHero from "@/components/pages/PageHero";
import { ProjectRow } from "@/components/home/Work";
import LabSlider from "@/components/pages/LabSlider";

export const metadata: Metadata = {
  title: "Works",
  description: site.worksPage.body,
};

export default function WorksPage() {
  const w = site.worksPage;
  return (
    <>
      <PageHero tag={w.tag} title={w.title} body={w.body} compact />
      <section className="section !pt-10">
        <div className="container-big flex flex-col gap-[180px] max-md:gap-24">
          {projects.map((p, i) => (
            <ProjectRow key={p.slug} p={p} index={i} />
          ))}
        </div>
      </section>
      <LabSlider tag="Lab" title="See projects from our lab" />
    </>
  );
}
