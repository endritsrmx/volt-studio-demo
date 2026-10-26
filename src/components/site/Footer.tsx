"use client";

import Link from "next/link";
import site from "@/config/site";
import { useLang } from "@/i18n/LangProvider";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="border-t border-fg/10">
      <div className="container-big flex flex-wrap items-center justify-between gap-4 py-6 text-[12px] text-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={site.logoWhite} alt={site.name} width={110} height={40} className="h-8 w-auto opacity-90" />
        <span>© {new Date().getFullYear()} {site.name} · {site.owner} · {site.contact.postalCode} {site.contact.city}</span>
        <Link href="/privacy-policy/" className="link-sweep">{t.footer.privacy}</Link>
      </div>
    </footer>
  );
}
