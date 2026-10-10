import { pt } from "@/content/portal";
import { localePath, type Lang } from "@/lib/i18n";
import { QuickDockClient, type DockItem } from "./QuickDockClient";

/** The four quick services, in a side bar on the right edge of every page. */
export function QuickDock({ lang }: { lang: Lang }) {
  const t = pt(lang).serviceBar;
  const items: DockItem[] = [
    { href: localePath(lang, "/e-shikayat"), icon: "shikayat", ...t.items.shikayat },
    { href: localePath(lang, "/e-shikayat/track"), icon: "track", ...t.items.track },
    { href: localePath(lang, "/e-card"), icon: "ecard", ...t.items.ecard },
    { href: localePath(lang, "/vikas-yatra"), icon: "vikas", ...t.items.vikas },
  ];
  return <QuickDockClient label={t.label} close={t.close} items={items} />;
}
