"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

export type GridPhoto = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
  position?: string;
};

type Labels = { close: string; prev: string; next: string; open: string };

/**
 * Photographs in a tidy grid (first one wide), each opening in a full-size viewer with
 * previous/next, arrow keys and Escape. Tiles are cropped evenly; the viewer shows the whole photo.
 */
export function PhotoGrid({
  photos,
  labels,
  layout = "feature",
  eager = 0,
}: {
  photos: GridPhoto[];
  labels: Labels;
  /** How many leading photographs are above the fold: they load at once, the first with high priority. */
  eager?: number;
  /** "feature": two columns, first photo wide (event pages). "uniform": equal tiles, 2 to 4 columns (albums). */
  layout?: "feature" | "uniform";
}) {
  const [current, setCurrent] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const count = photos.length;
  const uniform = layout === "uniform";
  const wide = (i: number) =>
    !uniform && (i === 0 || (i === count - 1 && count % 2 === 0));

  const close = useCallback(() => {
    setCurrent(null);
    lastFocus.current?.focus();
  }, []);
  const step = useCallback(
    (d: number) =>
      setCurrent((c) => (c === null ? c : (c + d + count) % count)),
    [count],
  );

  useEffect(() => {
    if (current === null) return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      html.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [current, close, step]);

  const active = current === null ? null : photos[current];

  return (
    <>
      <ul
        className={`grid gap-3 sm:gap-4 ${uniform ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-2"}`}
      >
        {photos.map((p, i) => (
          <li key={p.src} className={wide(i) ? "col-span-2" : ""}>
            <button
              type="button"
              aria-label={`${labels.open}: ${p.alt}`}
              onClick={(e) => {
                lastFocus.current = e.currentTarget;
                setCurrent(i);
              }}
              className="group relative block w-full overflow-hidden rounded-card bg-sand"
            >
              <Image
                src={p.src}
                alt=""
                width={p.width}
                height={p.height}
                sizes={
                  wide(i)
                    ? "(min-width: 1024px) 58vw, 92vw"
                    : uniform
                      ? "(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 46vw"
                      : "(min-width: 1024px) 28vw, 46vw"
                }
                loading={i < eager ? "eager" : "lazy"}
                fetchPriority={i === 0 && eager > 0 ? "high" : "auto"}
                style={{ objectPosition: p.position ?? "50% 25%" }}
                className={`w-full object-cover transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-[1.03] ${
                  wide(i) ? "aspect-[3/2]" : "aspect-[4/3]"
                }`}
              />
              <span className="absolute right-2 top-2 grid h-9 w-9 place-items-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                <ZoomIn aria-hidden="true" className="h-4 w-4" />
              </span>
            </button>
          </li>
        ))}
      </ul>

      {/* Rendered into <body>: inside the page, an animated (transformed) ancestor would make
          "fixed" cover only that section, leaving the header over the close button. */}
      {active &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={active.alt}
            className="page-in fixed inset-0 z-[100] flex flex-col bg-black/90 p-3 sm:p-6"
            onClick={close}
          >
            <div className="flex justify-end">
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label={labels.close}
                className="shrink-0 grid h-11 w-11 place-items-center rounded-full bg-black/60 text-white ring-1 ring-white/40 hover:bg-white/20"
              >
                <X aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <div
              className="relative flex min-h-0 flex-1 items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                key={active.src}
                src={active.src}
                alt={active.alt}
                width={active.width}
                height={active.height}
                sizes="100vw"
                className="max-h-full w-auto max-w-full object-contain"
              />
              {count > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label={labels.prev}
                    className="absolute left-0 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center bg-black/50 text-white hover:bg-black/80"
                  >
                    <ChevronLeft aria-hidden="true" className="h-7 w-7" />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label={labels.next}
                    className="absolute right-0 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center bg-black/50 text-white hover:bg-black/80"
                  >
                    <ChevronRight aria-hidden="true" className="h-7 w-7" />
                  </button>
                </>
              )}
            </div>
            <p
              className="pt-3 text-center text-sm text-white/85"
              onClick={(e) => e.stopPropagation()}
            >
              {(current ?? 0) + 1} / {count}
              {active.caption ? ` · ${active.caption}` : ""}
            </p>
          </div>,
          document.body,
        )}
    </>
  );
}
