import type { Title as T } from "@/config/site";
import { Fragment } from "react";

/** Renders "\n" as a desktop-only line break. */
export function Lines({ text }: { text: string }) {
  const parts = text.split("\n");
  return (
    <>
      {parts.map((p, i) => (
        <Fragment key={i}>
          {p}
          {i < parts.length - 1 && <br className="max-sm:hidden" />}
          {i < parts.length - 1 && <span className="sm:hidden"> </span>}
        </Fragment>
      ))}
    </>
  );
}

/** A heading string with an accent-colored part. */
export default function TitleText({ title }: { title: T }) {
  return (
    <>
      <Lines text={title.text} />
      {title.accent && (
        <span className="text-accent">
          <Lines text={title.accent} />
        </span>
      )}
      {title.after && <Lines text={title.after} />}
    </>
  );
}
