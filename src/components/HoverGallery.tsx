"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Images } from "lucide-react";
import type { UpdateImage } from "@/content/updates";

const STEP_MS = 1800;

/**
 * An event's photographs, stacked in one frame. The first shows at rest; while the pointer is over
 * the surrounding card (or, on touch screens, while the card is on screen) the rest glide in one
 * after another with a slow zoom, and it returns to the first when the pointer leaves. The other
 * photographs are only loaded once the card is first hovered or seen. Visitors who prefer reduced
 * motion get the still first photograph.
 */
export function HoverGallery({ images, sizes }: { images: UpdateImage[]; sizes: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [armed, setArmed] = useState(false);
  const many = images.length > 1;

  useEffect(() => {
    const el = ref.current;
    const card = el?.closest("article") ?? el;
    if (!el || !card || !many) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (window.matchMedia("(hover: hover)").matches) {
      const enter = () => {
        setArmed(true);
        setPlaying(true);
      };
      const leave = () => {
        setPlaying(false);
        setActive(0);
      };
      card.addEventListener("pointerenter", enter);
      card.addEventListener("pointerleave", leave);
      return () => {
        card.removeEventListener("pointerenter", enter);
        card.removeEventListener("pointerleave", leave);
      };
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setArmed(true);
        setPlaying(entry.isIntersecting);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [many]);

  useEffect(() => {
    if (!playing) return;
    // The first step comes quickly so the hover is answered at once.
    const first = window.setTimeout(() => setActive((i) => (i + 1) % images.length), 450);
    const id = window.setInterval(() => setActive((i) => (i + 1) % images.length), STEP_MS);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, [playing, images.length]);

  const shown = armed ? images : images.slice(0, 1);

  return (
    <div ref={ref} className="absolute inset-0">
      {shown.map((img, i) => {
        const state = i === active ? "now" : i === (active - 1 + images.length) % images.length ? "past" : "next";
        const tall = img.height > img.width;
        return (
          <Image
            key={img.src}
            src={img.src}
            alt=""
            fill
            sizes={sizes}
            style={{ objectPosition: img.position ?? (tall ? "50% 30%" : "50% 50%") }}
            className={`object-cover transition-[opacity,transform] ease-[var(--ease-out)] will-change-transform ${
              state === "now"
                ? `z-10 opacity-100 ${playing ? "translate-x-0 scale-[1.08] duration-[700ms,2600ms]" : "translate-x-0 scale-100 duration-500"}`
                : state === "past"
                  ? "z-0 -translate-x-[6%] scale-100 opacity-0 duration-700"
                  : "z-0 translate-x-[8%] scale-100 opacity-0 duration-0"
            }`}
          />
        );
      })}

      {many && (
        <>
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 z-20 h-16 bg-gradient-to-t from-black/45 to-transparent" />
          <span
            aria-hidden="true"
            className={`absolute bottom-3 right-3 z-20 flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm transition-opacity duration-300 ${
              playing ? "opacity-0" : "opacity-100"
            }`}
          >
            <Images className="h-3.5 w-3.5" />
            {images.length}
          </span>
          <span
            aria-hidden="true"
            className={`absolute bottom-3 right-3 z-20 rounded-full bg-black/55 px-2.5 py-1 text-xs font-semibold tabular-nums text-white backdrop-blur-sm transition-opacity duration-300 ${
              playing ? "opacity-100" : "opacity-0"
            }`}
          >
            {active + 1}/{images.length}
          </span>
          <div
            aria-hidden="true"
            className={`absolute inset-x-0 bottom-4 z-20 flex justify-center gap-1.5 transition-opacity duration-300 ${
              playing ? "opacity-100" : "opacity-0"
            }`}
          >
            {images.map((img, i) => (
              <span
                key={img.src}
                className={`h-1.5 rounded-full bg-white transition-all duration-500 ${i === active ? "w-5 opacity-100" : "w-1.5 opacity-60"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
