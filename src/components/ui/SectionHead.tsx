import TitleText, { Lines } from "./Title";
import type { Title } from "@/config/site";
import { cn } from "@/lib/utils";

/** Centered (or left) section header: mono eyebrow, title with accent, paragraph. */
export default function SectionHead({
  tag,
  title,
  body,
  align = "center",
  as: As = "h2",
  className,
  size = "l",
}: {
  tag?: string;
  title: Title;
  body?: string;
  align?: "center" | "left";
  as?: "h1" | "h2";
  className?: string;
  size?: "xl" | "l";
}) {
  return (
    <div
      data-reveal
      className={cn("flex flex-col gap-[14px]", align === "center" ? "items-center text-center" : "items-start text-left", className)}
    >
      {tag && <div className="eyebrow">{tag}</div>}
      <As className={size === "xl" ? "title-xl" : "title-l"}>
        <TitleText title={title} />
      </As>
      {body && (
        <p className="p-body max-w-[760px] text-fg">
          <Lines text={body} />
        </p>
      )}
    </div>
  );
}
