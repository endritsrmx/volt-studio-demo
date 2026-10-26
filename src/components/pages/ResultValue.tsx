import NumberTicker from "@/components/ui/NumberTicker";

/** Animates the numeric part of strings like "3.1x", "+48%", "9 days"; renders others as-is. */
export default function ResultValue({ value }: { value: string }) {
  const m = value.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
  if (!m) return <span className="text-[40px] font-light leading-none text-accent">{value}</span>;
  const [, pre, num, post] = m;
  const decimals = num.includes(".") ? num.split(".")[1].length : 0;
  return (
    <span className="flex items-baseline text-[40px] font-light leading-none text-accent">
      {pre}
      <NumberTicker value={parseFloat(num)} decimals={decimals} />
      {post && <span className="ml-0.5 text-[24px] text-fg">{post}</span>}
    </span>
  );
}
