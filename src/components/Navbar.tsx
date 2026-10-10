import { getDict } from "@/content/ui";
import type { Lang } from "@/lib/i18n";
import { buildNav } from "@/lib/nav";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";
import { NavbarClient } from "./NavbarClient";

export function Navbar({ lang }: { lang: Lang }) {
  const d = getDict(lang);
  return (
    <NavbarClient
      lang={lang}
      items={buildNav(d, lang)}
      labels={{ menu: d.menu, close: d.closeMenu }}
      logo={<Logo lang={lang} />}
      switcher={<LanguageSwitcher lang={lang} label={d.switchTo} />}
    />
  );
}
