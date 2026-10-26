"use client";

import Link from "next/link";
import site from "@/config/site";
import { LangToggle, useLang } from "@/i18n/LangProvider";

export default function Header() {
  const { t } = useLang();
  return (
    <header className="fixed inset-x-0 top-0 z-[100] border-b border-fg/10 bg-bg/70 backdrop-blur-md">
      <div className="container-big flex h-[var(--nav-h)] items-center justify-between gap-4">
        <Link href="/" aria-label={site.name} className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={site.logoWhite} alt={site.name} width={140} height={51} className="h-11 w-auto sm:h-12" />
        </Link>
        <nav className="flex items-center gap-6 text-[14px]">
          <Link href="/#services" className="link-sweep max-sm:hidden">{t.nav.services}</Link>
          <Link href="/#about" className="link-sweep max-sm:hidden">{t.nav.about}</Link>
          <Link href="/#contact" className="link-sweep max-sm:hidden">{t.nav.contact}</Link>
          <LangToggle />
        </nav>
      </div>
    </header>
  );
}
