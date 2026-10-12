"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * A vertical timeline with one shared axis.
 *
 * Every marker is 1rem wide and sits at the left edge of its item, so its centre is 0.5rem from
 * the list's left edge. Each connector is centred on that same 0.5rem line, starts at the
 * centre of its own marker and runs to the centre of the next one. Marker and line therefore
 * share one coordinate, and nothing depends on the viewport width or on the text beside them.
 *
 * As the list scrolls into view each item is revealed in turn: its marker pops in, the line below
 * it draws downward and its text fades up. Items that come into view together are staggered. The
 * motion rules live in globals.css (`.tl-*`) and only apply when the visitor welcomes motion; the
 * items are never hidden without JavaScript.
 */
export function Timeline({ children, label }: { children: ReactNode; label?: string }) {
  const ref = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = ref.current;
    if (!list) return;
    const items = Array.from(list.children) as HTMLElement[];
    if (typeof IntersectionObserver === "undefined") {
      items.forEach((li) => li.classList.add("is-shown"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        let n = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const li = entry.target as HTMLElement;
          li.style.setProperty("--tl-delay", `${n * 0.16}s`);
          li.classList.add("is-shown");
          io.unobserve(li);
          n += 1;
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    items.forEach((li) => io.observe(li));
    return () => io.disconnect();
  }, []);

  return (
    <ol ref={ref} aria-label={label} className="m-0 list-none p-0">
      {children}
    </ol>
  );
}

export function TimelineItem({
  last = false,
  tone = "saffron",
  className = "pb-8",
  children,
}: {
  last?: boolean;
  tone?: "saffron" | "ink";
  /** Bottom spacing between items. Keep it as padding so the connector can reach the next marker. */
  className?: string;
  children: ReactNode;
}) {
  return (
    <li className={`tl-item relative pl-9 sm:pl-12 ${last ? "" : className}`}>
      {!last && (
        <span
          aria-hidden="true"
          className="tl-line absolute -bottom-3.5 left-2 top-3.5 w-0.5 -translate-x-1/2 bg-line"
        />
      )}
      <span
        aria-hidden="true"
        className={`tl-dot absolute left-0 top-1.5 z-10 h-4 w-4 rounded-full border-2 bg-paper ${
          tone === "ink" ? "border-ink" : "border-saffron"
        }`}
      />
      <div className="tl-body">{children}</div>
    </li>
  );
}
