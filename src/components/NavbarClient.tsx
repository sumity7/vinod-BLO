"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { localePath, type Lang } from "@/lib/i18n";
import type { NavItem } from "@/lib/nav";

type Props = {
  lang: Lang;
  items: NavItem[];
  labels: { menu: string; close: string };
  logo: ReactNode;
  /** Language toggle, shown at the right end of the row. */
  switcher: ReactNode;
};

const CLOSE_DELAY = 140;

/**
 * One sticky row: logo on the left, the navigation in sentence case with Contact as the one solid
 * button, and the language toggle at the right end. On phones the navigation collapses into a
 * Menu button in the same row.
 */
export function NavbarClient({ lang, items, labels, logo, switcher }: Props) {
  const pathname = usePathname() ?? "";
  const [open, setOpen] = useState<string | null>(null);
  const [drawer, setDrawer] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [seenPath, setSeenPath] = useState(pathname);
  const [scrolled, setScrolled] = useState(false);
  const stripRef = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isActive = useCallback(
    (item: NavItem) => {
      const paths = item.href ? [item.href] : (item.children ?? []).map((c) => c.href);
      return paths.some((href) => {
        const target = localePath(lang, href.split("#")[0]);
        return href === "/" ? pathname === target : pathname.startsWith(target);
      });
    },
    [lang, pathname],
  );

  const cancelClose = () => {
    if (timer.current) clearTimeout(timer.current);
  };
  const scheduleClose = () => {
    cancelClose();
    timer.current = setTimeout(() => setOpen(null), CLOSE_DELAY);
  };

  if (seenPath !== pathname) {
    setSeenPath(pathname);
    setDrawer(false);
    setOpen(null);
  }

  const closeAll = () => {
    setOpen(null);
    setDrawer(false);
  };

  // Scroll state: the bar keeps its height (so nothing below it moves) and only gains a shadow.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setDrawer(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Opening the drawer moves focus into it; closing it puts focus back on the Menu button.
  useEffect(() => {
    if (drawer) {
      closeButton.current?.focus({ preventScroll: true });
      wasOpen.current = true;
    } else if (wasOpen.current) {
      wasOpen.current = false;
      menuButton.current?.focus({ preventScroll: true });
    }
  }, [drawer]);

  // While the mobile drawer is open the page behind it must not move. Only <html> is given
  // overflow: hidden (the document scroller on phones); <body> is left alone so the sticky strip
  // keeps working. The scrollbar's room is kept by `scrollbar-gutter: stable` on <html>, so nothing
  // slides sideways. Touch moves outside the drawer are cancelled for older iOS.
  useEffect(() => {
    if (!drawer) return;
    const html = document.documentElement;
    const prev = { overflow: html.style.overflow, overscroll: html.style.overscrollBehavior };
    html.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";

    const onTouchMove = (e: TouchEvent) => {
      const menu = document.getElementById("mobile-menu");
      const inside = menu?.contains(e.target as Node);
      if (!inside || (menu && menu.scrollHeight <= menu.clientHeight + 1)) {
        if (e.cancelable) e.preventDefault();
      }
    };
    document.addEventListener("touchmove", onTouchMove, { passive: false });

    const mq = window.matchMedia("(min-width: 1280px)");
    const onWide = () => mq.matches && setDrawer(false);
    mq.addEventListener("change", onWide);

    return () => {
      document.removeEventListener("touchmove", onTouchMove);
      mq.removeEventListener("change", onWide);
      html.style.overflow = prev.overflow;
      html.style.overscrollBehavior = prev.overscroll;
    };
  }, [drawer]);

  // Current page: deep saffron text with a bar drawn under it (scaleX, so nothing changes size). Others:
  // ink, with a soft fill and a lighter bar on hover.
  const itemClass = (active: boolean, open = false) =>
    `group/link relative flex min-h-11 items-center gap-1 rounded-soft px-3.5 py-2 text-[1rem] font-medium transition-colors duration-200 xl:px-4 ${
      active ? "text-saffron-deep" : open ? "bg-sand text-ink" : "text-ink-2 hover:bg-sand hover:text-ink"
    }`;
  const underline = (active: boolean) => (
    <span
      aria-hidden="true"
      data-active={active}
      className="nav-underline absolute inset-x-3.5 bottom-1 h-[2px] rounded-full bg-saffron xl:inset-x-4"
    />
  );

  return (
    <>
      <header
        ref={stripRef}
        // Named, so the page transition leaves it fixed (see globals.css).
        style={{ viewTransitionName: "site-header" }}
        className={`sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md transition-[box-shadow,border-color] duration-300 ${
          scrolled ? "border-transparent shadow-[0_10px_30px_-18px_rgba(60,30,10,0.45)]" : "border-line shadow-none"
        }`}
      >
        <div className="shell flex h-[4.5rem] items-center justify-between gap-4 lg:h-[5rem]">
          <div className="flex items-center py-2">{logo}</div>

          {/* Desktop navigation, on the same row as the logo */}
          {/* From 1280px only: with the longer English labels the row does not fit at 1024px. */}
          <nav aria-label="Primary" className="ml-auto hidden xl:block">
            <ul className="flex items-center gap-0.5">
              {items.map((item) => {
                const active = isActive(item);
                if (!item.children) {
                  return (
                    <li key={item.id}>
                      <Link
                        href={localePath(lang, item.href)}
                        onClick={closeAll}
                        aria-current={active ? "page" : undefined}
                        className={item.id === "contact" ? "btn btn-primary btn-sm ml-3" : itemClass(active)}
                      >
                        {item.label}
                        {item.id === "contact" ? null : underline(active)}
                      </Link>
                    </li>
                  );
                }
                const isOpen = open === item.id;
                return (
                  <li
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => {
                      cancelClose();
                      setOpen(item.id);
                    }}
                    onMouseLeave={scheduleClose}
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(null);
                    }}
                  >
                    <div className="flex items-center">
                      <Link
                        href={localePath(lang, item.href)}
                        onClick={closeAll}
                        aria-current={active ? "page" : undefined}
                        className={`${itemClass(active, isOpen)} !pr-1`}
                      >
                        {item.label}
                        {underline(active)}
                      </Link>
                      <button
                        type="button"
                        aria-haspopup="true"
                        aria-expanded={isOpen}
                        aria-controls={`menu-${item.id}`}
                        aria-label={`${item.label}: ${labels.menu}`}
                        onClick={() => setOpen(isOpen ? null : item.id)}
                        className={`-ml-1 flex min-h-11 items-center rounded-soft px-1.5 transition-colors duration-200 ${
                          active ? "text-saffron-deep" : isOpen ? "text-ink" : "text-ink-2 hover:bg-sand hover:text-ink"
                        }`}
                      >
                        <ChevronDown
                          aria-hidden="true"
                          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                    </div>
                    <div
                      id={`menu-${item.id}`}
                      className={`absolute left-0 top-full z-50 w-[16.25rem] pt-2 transition-[opacity,transform,visibility] duration-200 ease-[var(--ease-out)] ${
                        isOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
                      }`}
                    >
                      <ul className="rounded-card border border-line bg-white p-1.5 shadow-raised">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={localePath(lang, child.href)}
                              onClick={closeAll}
                              className="block rounded-soft px-3.5 py-2.5 text-[0.98rem] text-ink-2 transition-colors duration-200 hover:bg-sand hover:text-saffron-deep"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-3 xl:ml-3">
            <div className="hidden sm:block">{switcher}</div>
            <button
              ref={menuButton}
              type="button"
              className="inline-flex h-10 min-w-10 items-center justify-center gap-2 rounded-soft border border-line px-2.5 font-semibold leading-none text-ink transition-[background-color,transform] duration-200 ease-[var(--ease-out)] hover:bg-sand active:scale-[0.97] xl:hidden"
              aria-label={labels.menu}
              aria-expanded={drawer}
              aria-controls="mobile-menu"
              onClick={() => setDrawer((v) => !v)}
            >
              <Menu aria-hidden="true" className="h-5 w-5" />
              <span className="hidden whitespace-nowrap text-sm sm:inline">{labels.menu}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu: a panel that slides in from the right over a fading overlay. It lives outside the
          header (whose backdrop blur would otherwise become the containing block of fixed children).
          It closes on Escape, on the overlay, on the close button and when the route changes. */}
      <div
        aria-hidden="true"
        onClick={closeAll}
        className={`fixed inset-0 z-[60] bg-ink/50 transition-[opacity,visibility] duration-300 ease-[var(--ease-out)] xl:hidden ${
          drawer ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />
      <aside
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label={labels.menu}
        inert={!drawer}
        className={`fixed inset-y-0 right-0 z-[61] flex w-[min(22rem,88vw)] flex-col bg-white shadow-raised transition-[transform,visibility] duration-300 ease-[var(--ease-out)] xl:hidden ${
          drawer ? "visible translate-x-0" : "invisible translate-x-full"
        }`}
      >
        <div className="flex h-[4.5rem] shrink-0 items-center justify-between border-b border-line px-5">
          <p className="text-sm font-semibold text-muted">{labels.menu}</p>
          <button
            ref={closeButton}
            type="button"
            onClick={closeAll}
            aria-label={labels.close}
            className="inline-flex h-10 w-10 items-center justify-center rounded-soft border border-line text-ink transition-[background-color,transform] duration-200 ease-[var(--ease-out)] hover:bg-sand active:scale-[0.97]"
          >
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch] [touch-action:pan-y]">
        <nav aria-label="Mobile" className="px-5 py-2">
          <div className="border-b border-line py-3 sm:hidden">{switcher}</div>
          <ul className="divide-y divide-line">
            {items.map((item) => {
              const active = isActive(item);
              const linkClass = `flex min-h-14 flex-1 items-center text-xl font-semibold ${
                active ? "text-saffron-deep" : "text-ink"
              }`;
              if (!item.children) {
                return (
                  <li key={item.id}>
                    <Link
                      href={localePath(lang, item.href)}
                      onClick={closeAll}
                      aria-current={active ? "page" : undefined}
                      className={linkClass}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              }
              const isOpen = expanded === item.id;
              return (
                <li key={item.id}>
                  <div className="flex items-stretch">
                    <Link
                      href={localePath(lang, item.href)}
                      onClick={closeAll}
                      aria-current={active ? "page" : undefined}
                      className={linkClass}
                    >
                      {item.label}
                    </Link>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`m-${item.id}`}
                      aria-label={`${item.label}: ${labels.menu}`}
                      onClick={() => setExpanded(isOpen ? null : item.id)}
                      className="flex w-14 items-center justify-center text-ink-2"
                    >
                      <ChevronDown
                        aria-hidden="true"
                        className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                  </div>
                  {isOpen && (
                    <ul id={`m-${item.id}`} className="mb-3 ml-1 border-l-2 border-saffron/50 pl-4">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={localePath(lang, child.href)}
                            onClick={closeAll}
                            className="flex min-h-12 items-center text-base text-ink-2 hover:text-saffron-deep"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
        </div>
      </aside>
    </>
  );
}
