import type { Metadata } from "next";
import site from "@/config/site";
import PageHero from "@/components/pages/PageHero";
import ContactForm from "@/components/layout/ContactForm";
import { BookingCard } from "@/components/home/CtaSection";
import FaqSection from "@/components/home/FaqSection";
import { SocialIcon } from "@/components/ui/Icons";

export const metadata: Metadata = { title: "Contact", description: site.contactPage.body };

export default function ContactPage() {
  const c = site.contactPage;
  return (
    <>
      <PageHero tag={c.tag} title={c.title} body={c.body} compact />
      <section className="section !pt-0">
        <div className="container-big grid grid-cols-[1.4fr_1fr] gap-10 max-md:grid-cols-1">
          <div data-reveal className="glass rounded-[24px] border border-white/10 p-10 max-sm:p-6">
            <ContactForm />
          </div>
          <aside data-reveal data-delay="0.15" className="flex flex-col gap-6">
            <div className="card-line grid-paper flex flex-col gap-4 p-8">
              <span className="font-mono text-[11px] uppercase text-accent">Direct</span>
              <a href={`mailto:${site.contact.email}`} className="title-m link-sweep self-start">{site.contact.email}</a>
              <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className="p-body link-sweep self-start">{site.contact.phone}</a>
              <p className="p-small text-fg/70">{site.contact.address}</p>
            </div>
            <div className="card-line flex flex-wrap gap-3 p-8">
              {site.socials.map((s) => (
                <a key={s.label} href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="inline-flex h-11 items-center gap-2 rounded-pill bg-white/10 px-5 text-[13px] transition-colors hover:bg-accent hover:text-accent-ink">
                  <SocialIcon name={s.icon} size={16} /> {s.label}
                </a>
              ))}
            </div>
          </aside>
        </div>
        <div className="container-big mt-10">
          <BookingCard />
        </div>
      </section>
      <FaqSection />
    </>
  );
}
