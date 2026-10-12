"use client";

import { useState, type ReactNode } from "react";

/**
 * Category filter for the Vichar list. The cards are rendered on the server and passed in;
 * this only decides which ones are visible.
 */
export function VicharList({
  categories,
  allLabel,
  heading,
  items,
}: {
  categories: { id: string; label: string; count: number }[];
  allLabel: string;
  /** Heading for the list, read by screen readers only: the cards below it are H3s, so they need an H2. */
  heading: string;
  items: { id: string; category: string; node: ReactNode }[];
}) {
  const [active, setActive] = useState<string>("all");
  const visible = active === "all" ? items : items.filter((i) => i.category === active);
  return (
    <>
      <h2 className="sr-only">{heading}</h2>
      <div role="group" aria-label={allLabel} className="flex flex-wrap gap-2">
        <button type="button" className="chip" aria-pressed={active === "all"} onClick={() => setActive("all")}>
          {allLabel} <span className="text-sm text-muted">{items.length}</span>
        </button>
        {categories
          .filter((c) => c.count > 0)
          .map((c) => (
            <button key={c.id} type="button" className="chip" aria-pressed={active === c.id} onClick={() => setActive(c.id)}>
              {c.label} <span className="text-sm text-muted">{c.count}</span>
            </button>
          ))}
      </div>
      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((i) => (
          <li key={i.id}>{i.node}</li>
        ))}
      </ul>
    </>
  );
}
