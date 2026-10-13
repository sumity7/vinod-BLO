"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IdCard, LayoutGrid, MessageSquarePlus, Search, TrendingUp, X } from "lucide-react";

const ICONS = { shikayat: MessageSquarePlus, track: Search, ecard: IdCard, vikas: TrendingUp };

export type DockItem = { href: string; icon: keyof typeof ICONS; title: string; text: string };

/**
 * Quick services side bar. On wide screens a column of icon buttons stands on the right edge of
 * the window, and each one slides out its title and line on hover or focus. On smaller screens a
 * single tab on the edge opens a panel with the four services, so the bar never covers the text.
 */
export function QuickDockClient({ label, close, items }: { label: string; close: string; items: DockItem[] }) {
  const pathname = usePathname();
  // The page the panel was opened on: moving to another page closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (v: boolean) => setOpenOn(v ? pathname : null);
  const panel = useRef<HTMLDivElement>(null);

  // Close on Escape and on a tap outside the panel.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(null);
    const onDown = (e: PointerEvent) => {
      if (panel.current && !panel.current.contains(e.target as Node)) setOpenOn(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  // The admin screen has its own tools.
  if (pathname?.includes("/admin")) return null;

  return (
    <>
      {/* Wide screens: the column of icons, always on the edge. */}
      <nav aria-label={label} className="fixed right-0 top-1/2 z-30 hidden -translate-y-1/2 lg:block">
        <ul className="flex flex-col gap-1 rounded-l-2xl bg-white p-1.5 shadow-[0_14px_36px_-12px_rgba(0,0,0,0.45)] ring-1 ring-line">
          {items.map(({ href, icon, title, text }) => {
            const Icon = ICONS[icon];
            const current = pathname === href;
            return (
              <li key={href} className="group relative">
                <Link
                  href={href}
                  aria-current={current ? "page" : undefined}
                  className={`relative grid h-12 w-12 place-items-center rounded-xl text-ganga transition-[background-color,color,transform] duration-200 hover:bg-saffron-deep hover:text-white focus-visible:bg-saffron-deep focus-visible:text-white focus-visible:outline-none ${
                    current ? "bg-ganga-mist" : ""
                  }`}
                >
                  <Icon aria-hidden="true" className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                  <span className="sr-only">{title}</span>
                  {current && <span aria-hidden="true" className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r bg-saffron" />}
                </Link>
                {/* The label slides out to the left of the icon. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-[calc(100%+0.75rem)] top-1/2 w-64 -translate-y-1/2 translate-x-2 rounded-xl bg-white px-4 py-3 opacity-0 shadow-raised ring-1 ring-line transition-[opacity,transform] duration-200 ease-[var(--ease-out)] group-focus-within:translate-x-0 group-focus-within:opacity-100 group-hover:translate-x-0 group-hover:opacity-100"
                >
                  <span className="h-card block text-[0.98rem] text-ink">{title}</span>
                  <span className="mt-0.5 block text-sm leading-snug text-muted">{text}</span>
                  <span className="absolute -right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 bg-white" />
                </span>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Smaller screens: a round button in the corner, just above the assistant button (so it never covers
          the edge of the content), that opens the panel upward from the same spot. */}
      <div ref={panel} className="fixed bottom-[5.25rem] right-4 z-30 lg:hidden">
        <button
          type="button"
          aria-expanded={open}
          aria-controls="quick-dock-panel"
          onClick={() => setOpen(!open)}
          className={`fab grid h-12 w-12 place-items-center rounded-full bg-white text-ganga ring-1 ring-line shadow-[0_10px_28px_-10px_rgba(0,0,0,0.6)] transition-opacity duration-200 ${
            open ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <LayoutGrid aria-hidden="true" className="h-5 w-5" />
          <span className="sr-only">{label}</span>
        </button>
        <div
          id="quick-dock-panel"
          role="region"
          aria-label={label}
          hidden={!open}
          className="absolute bottom-0 right-0 w-[min(19rem,calc(100vw-2rem))] overflow-hidden rounded-2xl bg-white shadow-[0_18px_44px_-12px_rgba(0,0,0,0.45)] ring-1 ring-line"
        >
          <div className="flex items-center justify-between bg-ganga px-4 py-2.5 text-white">
            <p className="text-sm font-semibold">{label}</p>
            <button type="button" onClick={() => setOpen(false)} className="shrink-0 -mr-1 grid h-8 w-8 place-items-center rounded-full hover:bg-white/10">
              <X aria-hidden="true" className="h-4 w-4" />
              <span className="sr-only">{close}</span>
            </button>
          </div>
          <ul className="p-2">
            {items.map(({ href, icon, title, text }) => {
              const Icon = ICONS[icon];
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={pathname === href ? "page" : undefined}
                    className="flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-ganga-mist/60"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ganga text-marigold">
                      <Icon aria-hidden="true" className="h-[1.1rem] w-[1.1rem]" />
                    </span>
                    <span>
                      <span className="h-card block text-[0.98rem]">{title}</span>
                      <span className="mt-0.5 block text-sm leading-snug text-muted">{text}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
