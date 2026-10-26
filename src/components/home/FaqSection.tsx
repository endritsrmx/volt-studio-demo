import site from "@/config/site";
import Faq from "@/components/ui/Faq";

export default function FaqSection({ items = site.faq, title = "Questions, answered." }: { items?: { q: string; a: string }[]; title?: string }) {
  return (
    <section className="section !pt-0">
      <div className="container-narrow">
        <h2 data-reveal className="title-m mb-10 text-center">
          {title}
        </h2>
        <Faq items={items} />
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          }),
        }}
      />
    </section>
  );
}
