"use client";

import Link from "next/link";
import { useLang } from "@/i18n/LangProvider";

export default function Privacy() {
  const { t } = useLang();
  return (
    <section className="container-narrow pb-16 pt-[calc(var(--nav-h)+48px)]">
      <h1 className="title-l mb-8">{t.privacy.title}</h1>
      {t.privacy.sections.map((s) => (
        <div key={s.h} className="mb-6">
          <h2 className="title-m mb-2">{s.h}</h2>
          <p className="p-body text-fg/85">{s.p}</p>
        </div>
      ))}
      <Link href="/" className="link-sweep text-accent">← {t.privacy.back}</Link>
    </section>
  );
}
