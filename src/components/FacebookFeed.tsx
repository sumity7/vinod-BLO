"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The Facebook page plugin, sized to its box. The plugin's iframe draws at the width it is asked
 * for (180 to 500px) and ignores `adapt_container_width`, so a fixed 500 is cut off on phones. The
 * box is measured first, and again when it changes size; the width is rounded to 10px so small
 * changes do not reload the plugin.
 */
export function FacebookFeed({ page, height, locale, title }: { page: string; height: number; locale: string; title: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const measure = () => {
      const w = Math.max(180, Math.min(500, Math.floor(el.clientWidth / 10) * 10));
      setWidth((prev) => (prev === w ? prev : w));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const src =
    "https://www.facebook.com/plugins/page.php?" +
    new URLSearchParams({
      href: page,
      tabs: "timeline",
      width: String(width),
      height: String(height),
      small_header: "true",
      adapt_container_width: "true",
      hide_cover: "false",
      show_facepile: "false",
      locale,
    }).toString();

  return (
    <div ref={box} className="relative h-full w-full">
      {width > 0 && (
        <iframe
          key={width}
          src={src}
          title={title}
          loading="lazy"
          allow="encrypted-media"
          width={width}
          height={height}
          style={{ width }}
          className="mx-auto block h-full max-w-full border-0"
        />
      )}
    </div>
  );
}
