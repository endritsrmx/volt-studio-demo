"use client";

import { useEffect, useRef, useState } from "react";
import site, { projects, services } from "@/config/site";

type Line = { kind: "in" | "out"; text: string };

const banner = [
  `${site.shortName.toUpperCase()} OS v1.0 — type \`help\` to begin`,
  "──────────────────────────────────────",
];

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>(banner.map((t) => ({ kind: "out", text: t })));
  const [value, setValue] = useState("");
  const [hist, setHist] = useState<string[]>([]);
  const [hi, setHi] = useState(-1);
  const box = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    box.current?.scrollTo({ top: box.current.scrollHeight });
  }, [lines]);

  const run = (cmd: string) => {
    const [c, ...args] = cmd.trim().split(/\s+/);
    const out = (t: string | string[]) => (Array.isArray(t) ? t : [t]).map((x) => ({ kind: "out" as const, text: x }));
    switch ((c || "").toLowerCase()) {
      case "":
        return [];
      case "help":
        return out(["help       list commands", "about      who we are", "work       selected projects", "services   what we do", "contact    get in touch", "date       local studio time", "echo …     repeat after me", "clear      clear the screen"]);
      case "about":
        return out(site.description);
      case "work":
        return out(projects.map((p) => `• ${p.name.padEnd(14)} ${p.tagline}`));
      case "services":
        return out(services.map((s) => `${s.number}  ${s.menuLabel}`));
      case "contact":
        return out([`email  ${site.contact.email}`, `phone  ${site.contact.phone}`]);
      case "date":
        return out(new Date().toLocaleString("en-GB", { timeZone: site.location.timezone }) + ` (${site.location.city})`);
      case "echo":
        return out(args.join(" "));
      case "sudo":
        return out("Nice try. Permission denied ✋");
      case "clear":
        return null;
      default:
        return out(`command not found: ${c}`);
    }
  };

  return (
    <div
      className="relative h-full overflow-hidden bg-[#020a05] font-mono text-[13px] leading-[1.6] text-[#9dff9d]"
      onClick={() => input.current?.focus()}
    >
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.25)_0px,rgba(0,0,0,0.25)_1px,transparent_1px,transparent_3px)]" />
      <div ref={box} className="relative h-full overflow-y-auto p-5" data-lenis-prevent>
        {lines.map((l, i) => (
          <div key={i} className={l.kind === "in" ? "text-accent" : ""} style={{ textShadow: "0 0 8px rgba(120,255,120,.35)" }}>
            {l.kind === "in" ? `› ${l.text}` : l.text}
          </div>
        ))}
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            const res = run(value);
            setHist((h) => [value, ...h]);
            setHi(-1);
            if (res === null) setLines([]);
            else setLines((ls) => [...ls, { kind: "in", text: value }, ...res]);
            setValue("");
          }}
        >
          <span className="text-accent">›</span>
          <input
            ref={input}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowUp") {
                const n = Math.min(hist.length - 1, hi + 1);
                setHi(n);
                setValue(hist[n] ?? "");
              } else if (e.key === "ArrowDown") {
                const n = Math.max(-1, hi - 1);
                setHi(n);
                setValue(n === -1 ? "" : hist[n]);
              }
            }}
            aria-label="Terminal input"
            spellCheck={false}
            autoComplete="off"
            className="flex-1 bg-transparent text-accent caret-accent outline-none"
          />
        </form>
      </div>
    </div>
  );
}
