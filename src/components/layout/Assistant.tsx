"use client";
import { localAnswer } from "@/lib/localAnswer";

import { useEffect, useRef, useState } from "react";
import { useUI } from "@/components/providers/UIProvider";
import { Close, Send } from "@/components/ui/Icons";
import site from "@/config/site";
import { cn } from "@/lib/utils";

type Msg = { from: "bot" | "me"; text: string };

/**
 * "Ask me anything" assistant.
 * Calls /api/assistant (which proxies ASSISTANT_WEBHOOK_URL if configured),
 * otherwise answers from the FAQ in site config.
 */
export default function Assistant() {
  const { panel, toggle, close } = useUI();
  const isOpen = panel === "assistant";
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: "bot", text: `Hi! I'm the ${site.shortName} assistant. Ask me about our services, process or pricing.` },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const list = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    list.current?.scrollTo({ top: list.current.scrollHeight, behavior: "smooth" });
  }, [msgs]);
  useEffect(() => {
    if (isOpen) window.setTimeout(() => inputRef.current?.focus(), 250);
  }, [isOpen]);

  async function ask(q: string) {
    if (!q.trim() || busy) return;
    setMsgs((m) => [...m, { from: "me", text: q }]);
    setInput("");
    setBusy(true);
    try {
      // Static demo: answer locally from FAQ + services (no API route)
      const data = { answer: localAnswer(q) };
      setMsgs((m) => [...m, { from: "bot", text: data.answer || "Sorry, I couldn't find that." }]);
    } catch {
      setMsgs((m) => [...m, { from: "bot", text: `I'm offline right now — email us at ${site.contact.email}.` }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <div
        role="dialog"
        aria-label="Assistant"
        aria-hidden={!isOpen}
        data-lenis-prevent
        className={cn(
          "glass fixed bottom-20 right-4 z-[1100] flex h-[min(520px,70vh)] w-[min(380px,calc(100vw-32px))] origin-bottom-right flex-col overflow-hidden rounded-[20px] border border-white/10 bg-black/60 transition-[opacity,transform] duration-300 ease-out-quart sm:right-6",
          isOpen ? "pointer-events-auto scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0",
        )}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
            <span className="text-[14px]">{site.shortName} Assistant</span>
          </div>
          <button onClick={close} aria-label="Close assistant" tabIndex={isOpen ? 0 : -1} className="text-accent transition-transform duration-300 hover:rotate-90">
            <Close size={18} />
          </button>
        </div>
        <div ref={list} className="flex flex-1 flex-col gap-3 overflow-y-auto px-5 py-4" aria-live="polite">
          {msgs.map((m, i) => (
            <div
              key={i}
              className={cn(
                "max-w-[85%] rounded-[14px] px-4 py-3 text-[13px] leading-[1.55]",
                m.from === "bot" ? "self-start bg-white/10 text-fg" : "self-end bg-accent text-accent-ink",
              )}
            >
              {m.text}
            </div>
          ))}
          {busy && <div className="self-start rounded-[14px] bg-white/10 px-4 py-3 text-[13px] text-muted">…</div>}
          {msgs.length === 1 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {site.faq.slice(0, 3).map((f) => (
                <button
                  key={f.q}
                  tabIndex={isOpen ? 0 : -1}
                  onClick={() => ask(f.q)}
                  className="rounded-pill border border-white/15 px-3 py-2 text-left text-[12px] text-fg transition-colors hover:border-accent"
                >
                  {f.q}
                </button>
              ))}
            </div>
          )}
        </div>
        <form
          className="flex items-center gap-2 border-t border-white/10 p-3"
          onSubmit={(e) => {
            e.preventDefault();
            ask(input);
          }}
        >
          <input
            ref={inputRef}
            value={input}
            tabIndex={isOpen ? 0 : -1}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything…"
            aria-label="Your question"
            className="flex-1 rounded-pill bg-white/[0.06] px-4 py-3 text-[13px] text-fg outline-none placeholder:text-white/35 focus:bg-white/10"
          />
          <button type="submit" aria-label="Send" tabIndex={isOpen ? 0 : -1} className="icon-btn bg-accent text-accent-ink">
            <Send size={16} />
          </button>
        </form>
      </div>

      {/* floating trigger: pill with a working toggle */}
      <button
        onClick={() => toggle("assistant")}
        aria-expanded={isOpen}
        className="fixed bottom-4 right-4 z-[1100] flex h-9 items-center gap-3 rounded-pill bg-accent pl-4 pr-1.5 text-[12px] text-accent-ink shadow-[0_8px_30px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:scale-[1.04] sm:right-6"
      >
        Ask me anything!
        <span className={cn("relative h-6 w-11 rounded-pill transition-colors duration-300", isOpen ? "bg-black" : "bg-black/85")}>
          <span
            className={cn(
              "absolute top-1 h-4 w-4 rounded-full bg-accent transition-[left] duration-[350ms] ease-spring",
              isOpen ? "left-[calc(100%-20px)]" : "left-1",
            )}
          />
        </span>
      </button>
    </>
  );
}
