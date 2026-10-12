"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * A thin saffron line along the top of the window. It starts the moment an internal link is
 * clicked and runs until the new page has arrived, so a click always answers at once, even when the
 * next page takes a moment. It knows nothing about the page it is on: it only remembers where the
 * click happened and is "running" while the route is still that one.
 */
export function NavProgress() {
  const pathname = usePathname();
  const [startedOn, setStartedOn] = useState<string | null>(null);
  const running = startedOn !== null && startedOn === pathname;

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || url.hash) return;
      const clean = (p: string) => p.replace(/\/$/, "");
      if (clean(url.pathname) === clean(window.location.pathname)) return;
      setStartedOn(window.location.pathname);
    };
    // Capture phase: Next's Link cancels the default action while the click is still travelling up.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return <div aria-hidden="true" data-run={running} className="nav-progress" />;
}
