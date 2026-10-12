"use client";

import { useEffect } from "react";

/**
 * Tells the stylesheet which way the visitor is scrolling, by setting `data-fab-hidden` on <html>
 * while they scroll down the page. The floating buttons on phones (quick services, assistant) slide
 * out of the way then, so they never sit on top of the text being read, and come back as soon as the
 * visitor scrolls up, is near the top, or reaches the end of the page. Nothing here touches layout.
 */
export function ScrollDirection() {
  useEffect(() => {
    const html = document.documentElement;
    let last = window.scrollY;
    let queued = false;

    const update = () => {
      queued = false;
      const y = window.scrollY;
      const delta = y - last;
      const nearEnd = y + window.innerHeight > html.scrollHeight - 320;
      if (y < 160 || nearEnd) {
        html.removeAttribute("data-fab-hidden");
        last = y;
      } else if (delta > 8) {
        html.setAttribute("data-fab-hidden", "");
        last = y;
      } else if (delta < -8) {
        html.removeAttribute("data-fab-hidden");
        last = y;
      }
    };
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      html.removeAttribute("data-fab-hidden");
    };
  }, []);

  return null;
}
