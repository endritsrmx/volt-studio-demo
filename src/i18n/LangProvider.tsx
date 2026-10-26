"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { dict, type Lang } from "./dict";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (typeof dict)[Lang] };
const LangCtx = createContext<Ctx | null>(null);
const KEY = "endrit-lang";

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("de");
  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    if (saved === "en" || saved === "de") setLangState(saved);
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang === "de" ? "de-CH" : "en";
  }, [lang]);
  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try { localStorage.setItem(KEY, l); } catch {}
  }, []);
  return <LangCtx.Provider value={{ lang, setLang, t: dict[lang] as (typeof dict)[Lang] }}>{children}</LangCtx.Provider>;
}

export function useLang() {
  const v = useContext(LangCtx);
  if (!v) throw new Error("useLang must be used inside <LangProvider>");
  return v;
}

export function LangToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();
  return (
    <div role="group" aria-label="Sprache / Language" className={`inline-flex rounded-pill border border-fg/20 p-0.5 font-mono text-[11px] ${className}`}>
      {(["de", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`rounded-pill px-2.5 py-1 uppercase transition-colors ${lang === l ? "bg-accent text-accent-ink" : "text-fg/70 hover:text-fg"}`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
