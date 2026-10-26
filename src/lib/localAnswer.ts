import site, { services } from "@/config/site";
const tokenize = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2);

/** Tiny local retrieval over the FAQ + services (used when no webhook is configured). */
export function localAnswer(q: string) {
  const qt = new Set(tokenize(q));
  const docs = [
    ...site.faq.map((f) => ({ text: `${f.q} ${f.a}`, answer: f.a })),
    ...services.map((s) => ({
      text: `${s.menuLabel} ${s.subtitle} ${s.items.map((i) => i.title + " " + i.body).join(" ")}`,
      answer: `${s.menuLabel}: ${s.page.hero.body} Learn more at /services/${s.slug}.`,
    })),
    { text: "contact email reach talk call book meeting", answer: `You can reach us at ${site.contact.email} or use the contact form — we reply within one business day.` },
  ];
  let best = { score: 0, answer: "" };
  for (const d of docs) {
    const dt = tokenize(d.text);
    const score = dt.reduce((acc, w) => acc + (qt.has(w) ? 1 : 0), 0) / Math.sqrt(dt.length + 1);
    if (score > best.score) best = { score, answer: d.answer };
  }
  return best.score > 0.05
    ? best.answer
    : `Good question! I don't have that one yet — drop us a line at ${site.contact.email} and a human will answer.`;
}
