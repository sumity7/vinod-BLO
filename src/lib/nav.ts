import type { Dict } from "@/content/ui";
import { media } from "@/content/media";
import { publishedUpdates } from "@/content/updates";
import { pt } from "@/content/portal";
import { idealCategories } from "@/content/ideals";
import { articles } from "@/content/vichar";
import type { Lang } from "@/lib/i18n";

export type NavChild = { label: string; href: string };
export type NavItem = { id: string; label: string; href?: string; children?: NavChild[] };

/**
 * Navigation follows the reference site: Home, Biography, Events, Media, Contact. Each item is
 * built only from pages that have real content behind them. Media holds two related
 * sub-pages: Gallery (every photograph, grouped in albums) and Meetings & Interactions.
 */
export function buildNav(d: Dict, lang: Lang): NavItem[] {
  const n = d.nav;
  const p = pt(lang).nav;
  const gallery: NavChild[] = [
    ...(media.some((m) => !m.video && !m.group) || publishedUpdates().length > 0
      ? [{ label: n.gallery, href: "/media" }]
      : []),
    ...(media.some((m) => m.group === "meeting") ? [{ label: n.meetings, href: "/media/meetings" }] : []),
  ];
  const items: NavItem[] = [
    { id: "home", label: n.home, href: "/" },
    { id: "about", label: n.biography, href: "/about" },
  ];
  items.push(
    {
      id: "services",
      label: p.services,
      href: "/e-shikayat",
      children: [
        { label: p.shikayatNew, href: "/e-shikayat" },
        { label: p.track, href: "/e-shikayat/track" },
        { label: p.ecard, href: "/e-card" },
      ],
    },
  );
  // Events and Media come before Development & Ideas.
  if (publishedUpdates().length > 0) {
    items.push({ id: "updates", label: n.events, href: "/updates" });
  }
  if (gallery.length > 1) {
    items.push({ id: "media", label: n.media, href: "/media", children: gallery });
  } else if (gallery.length === 1) {
    items.push({ id: "media", label: gallery[0].label, href: gallery[0].href });
  }
  items.push(
    {
      id: "vimarsh",
      label: p.vimarsh,
      href: "/vimarsh",
      children: [
        { label: p.vichar, href: "/vichar" },
        { label: p.vikas, href: "/vikas-yatra" },
      ],
    },
    { id: "ideals", label: p.ideals, href: "/ideals" },
  );
  items.push({ id: "contact", label: n.contact, href: "/contact" });
  return items;
}

/**
 * Every route that belongs in the sitemap, without the language prefix. The privacy and terms
 * pages stay indexable but are left out: they are not pages anyone searches for.
 */
export function allRoutes(): string[] {
  const routes = [
    "",
    "/about",
    "/media",
    "/contact",
    "/e-shikayat",
    "/e-shikayat/track",
    "/e-card",
    "/ideals",
    ...idealCategories.slice(1).map((c) => `/ideals/${c.slug}`),
    "/vimarsh",
    "/vichar",
    ...articles.map((a) => `/vichar/${a.slug}`),
    "/vikas-yatra",
  ];
  if (media.some((m) => m.group === "meeting")) routes.splice(3, 0, "/media/meetings");
  if (publishedUpdates().length > 0) {
    routes.push("/updates", ...publishedUpdates().map((u) => `/updates/${u.slug}`));
  }
  return routes;
}
