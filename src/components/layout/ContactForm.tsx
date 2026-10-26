"use client";

import Link from "next/link";
import { useState } from "react";
import site from "@/config/site";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-[10px] border border-white/10 bg-white/[0.06] px-4 py-3 text-[15px] font-light text-fg placeholder:text-white/35 outline-none transition-colors focus:border-accent/70";

export default function ContactForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<Status>("idle");
  const [topic, setTopic] = useState<string>("");
  const [budget, setBudget] = useState<string>("");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      message: String(fd.get("message") || "").trim(),
      company: String(fd.get("company") || ""), // honeypot
      topic,
      budget,
      consent: fd.get("consent") === "on",
    };
    if (!payload.name || !/^\S+@\S+\.\S+$/.test(payload.email) || !payload.message) {
      setError("Please add your name, a valid email and a short message.");
      return;
    }
    if (!payload.consent) {
      setError("Please accept the privacy policy so we can reply.");
      return;
    }
    setError("");
    setStatus("sending");
    try {
      // Static demo: no backend — simulate a successful submission
      await new Promise((r) => setTimeout(r, 600));
      void payload;
      setStatus("sent");
    } catch {
      setStatus("error");
      setError(`Something went wrong. Email us directly at ${site.contact.email}.`);
    }
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-start gap-3 p-6" role="status">
        <div className="eyebrow">Message received</div>
        <p className="title-m">Thanks — we&apos;ll be in touch within one business day.</p>
        <p className="p-small text-muted">In the meantime, feel free to browse our latest work.</p>
      </div>
    );
  }

  const Chips = ({ options, value, onChange, label }: { options: string[]; value: string; onChange: (v: string) => void; label: string }) => (
    <fieldset className="flex flex-col gap-2">
      <legend className="mb-2 font-mono text-[11px] uppercase text-accent">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            type="button"
            key={o}
            aria-pressed={value === o}
            onClick={() => onChange(value === o ? "" : o)}
            className={cn(
              "rounded-pill border px-4 py-2 text-[13px] font-light transition-colors duration-300",
              value === o ? "border-accent bg-accent text-accent-ink" : "border-white/15 bg-white/[0.04] text-fg hover:border-accent/60",
            )}
          >
            {o}
          </button>
        ))}
      </div>
    </fieldset>
  );

  return (
    <form onSubmit={onSubmit} noValidate className={cn("flex flex-col gap-5", compact ? "p-6" : "")}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="font-mono text-[11px] uppercase text-accent">Name</span>
          <input name="name" autoComplete="name" required className={field} placeholder="Your name" />
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-mono text-[11px] uppercase text-accent">Email</span>
          <input name="email" type="email" autoComplete="email" required className={field} placeholder="you@company.com" />
        </label>
      </div>
      <Chips label="I'm interested in" options={site.contactPage.topics} value={topic} onChange={setTopic} />
      <Chips label="Budget" options={site.contactPage.budgets} value={budget} onChange={setBudget} />
      <label className="flex flex-col gap-2">
        <span className="font-mono text-[11px] uppercase text-accent">Message</span>
        <textarea name="message" required rows={compact ? 4 : 6} className={cn(field, "resize-none")} placeholder="Tell us about your project…" />
      </label>
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <label className="flex items-start gap-3 text-[13px] font-light text-muted">
        <input name="consent" type="checkbox" className="mt-[3px] h-4 w-4 accent-[rgb(var(--c-accent))]" />
        <span>
          I agree to the{" "}
          <Link href="/privacy-policy" className="text-fg underline underline-offset-2">
            privacy policy
          </Link>
          .
        </span>
      </label>
      {error && (
        <p className="text-[13px] text-[#ff8a8a]" role="alert">
          {error}
        </p>
      )}
      <div>
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send message"}
        </Button>
      </div>
    </form>
  );
}
