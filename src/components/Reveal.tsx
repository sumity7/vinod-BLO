"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Fades content up once it scrolls into view, using one shared IntersectionObserver and a CSS
 * transition (see `.reveal` in globals.css) instead of an animation library. Content is only
 * hidden after the inline script has marked the page as running JavaScript, and it is shown at
 * once for visitors who prefer reduced motion.
 */
let observer: IntersectionObserver | null = null;

function observe(el: Element) {
  if (typeof IntersectionObserver === "undefined") {
    el.classList.add("is-shown");
    return () => {};
  }
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-shown");
          observer?.unobserve(entry.target);
        }
      }
    },
    { rootMargin: "0px 0px -8% 0px" },
  );
  observer.observe(el);
  return () => observer?.unobserve(el);
}

export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    return el ? observe(el) : undefined;
  }, []);

  const style = delay ? ({ "--reveal-delay": `${delay}s` } as CSSProperties) : undefined;
  return (
    <Tag ref={ref as never} className={`reveal ${className}`} style={style}>
      {children}
    </Tag>
  );
}
