import type { Metadata } from "next";
import site, { services } from "@/config/site";
import PageHero from "@/components/pages/PageHero";
import { ServiceBlock } from "@/components/home/Services";
import FaqSection from "@/components/home/FaqSection";
import { CtaCard } from "@/components/home/CtaSection";

export const metadata: Metadata = {
  title: "Services",
  description: "Web design & development, 3D experiences and AI integration — one team, end to end.",
};

export default function ServicesPage() {
  const s = site.servicesSection;
  return (
    <>
      <PageHero tag={s.tag} title={s.title} body={s.body.split("\n")[0]} compact />
      <section className="section !pt-10">
        <div className="container-big flex flex-col gap-[200px] max-md:gap-28">
          {services.map((sv) => (
            <ServiceBlock key={sv.slug} s={sv} />
          ))}
        </div>
      </section>
      <FaqSection />
      <section className="section !pt-0">
        <div className="container-big">
          <CtaCard tag={site.ctaSection.tag} title={site.ctaSection.title} body={site.ctaSection.body} primary={site.ctaSection.primary} secondary={site.ctaSection.secondary} />
        </div>
      </section>
    </>
  );
}
