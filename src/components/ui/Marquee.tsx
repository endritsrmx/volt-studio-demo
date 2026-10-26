import { cn } from "@/lib/utils";

/** Infinite CSS marquee (two identical tracks). Pauses on hover. */
export default function Marquee({ items, reverse, className, speed = 20 }: { items: React.ReactNode[]; reverse?: boolean; className?: string; speed?: number }) {
  const track = (hidden?: boolean) => (
    <div className="marquee-track" aria-hidden={hidden} style={{ animationDuration: `${speed}s` }}>
      {items.map((it, i) => (
        <div key={i} className="shrink-0">
          {it}
        </div>
      ))}
    </div>
  );
  return (
    <div className={cn("marquee", reverse && "marquee-reverse", className)}>
      {track()}
      {track(true)}
    </div>
  );
}
