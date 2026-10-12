"use client";

import { useEffect, useRef, useState } from "react";

/** The first figure written with a plus sign: "2000+", "10,000+". Years and ages are left alone. */
const FIGURE = /(\d[\d,]*)\+/;

/**
 * Text in which a figure like "2000+" counts up from zero the first time it is on screen.
 *
 * The final figure always stays in the layout (tabular digits, so every digit is the same width),
 * so the box has its final size from the first frame and nothing around it moves; the running
 * number is drawn on top of it. Visitors who prefer reduced motion, and text without such a
 * figure, just get the text.
 *
 * `active` is for a figure that sits on a hidden slide: it counts only while `active` is true (and
 * on screen), and counts again each time it becomes true.
 */
export function CountUp({ text, className = "", active = true }: { text: string; className?: string; active?: boolean }) {
  const match = FIGURE.exec(text);
  const root = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState<string | null>(null);

  const target = match ? Number(match[1].replace(/,/g, "")) : 0;
  const grouped = match?.[1].includes(",") ?? false;

  useEffect(() => {
    const el = root.current;
    if (!el || !match) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || typeof IntersectionObserver === "undefined") return;
    if (!active) {
      // Back to the resting state (the final figure), ready to count again.
      el.classList.remove("is-on");
      return;
    }

    let raf = 0;
    const show = (n: number) => (grouped ? n.toLocaleString("en-IN") : String(n));
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        el.classList.add("is-on");
        const start = performance.now();
        const run = (now: number) => {
          const t = Math.min(1, (now - start) / 1400);
          const eased = 1 - Math.pow(1 - t, 3);
          setValue(show(Math.round(target * eased)));
          if (t < 1) raf = requestAnimationFrame(run);
        };
        raf = requestAnimationFrame(run);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // The figure comes from `text`; it is parsed again on every render, so depend on the text itself.
  }, [text, target, grouped, active]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!match) return <span className={className}>{text}</span>;

  const before = text.slice(0, match.index);
  const after = text.slice(match.index + match[0].length);
  return (
    <span className={className}>
      {before}
      <span ref={root} className="count">
        <span aria-hidden="true" className="count-live">
          {value ?? match[1]}+
        </span>
        <span className="count-final">{match[1]}+</span>
      </span>
      {after}
    </span>
  );
}
