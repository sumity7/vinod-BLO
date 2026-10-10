import Image from "next/image";
import Link from "next/link";
import { localePath, type Lang } from "@/lib/i18n";
import { site } from "@/lib/site";

/** The emblem and the name, side by side. */
export function Logo({ lang }: { lang: Lang }) {
  const name = site.name[lang];
  return (
    <Link
      href={localePath(lang)}
      aria-label={`${name} – ${lang === "hi" ? "मुख्य पृष्ठ" : "home"}`}
      className="flex min-w-0 items-center gap-3"
    >
      <Image
        src="/images/logo.webp"
        alt=""
        width={540}
        height={540}
        sizes="64px"
        loading="eager"
        className="h-12 w-12 lg:h-14 lg:w-14"
      />
      <span className="min-w-0 leading-tight">
        <span className="block truncate font-display text-[1.1rem] font-semibold text-ink sm:text-[1.4rem] lg:text-[1.6rem]">
          {name}
        </span>
        <span className="block text-[0.75rem] font-medium text-saffron-deep sm:text-[0.85rem]">
          {site.roleShort[lang]}
        </span>
      </span>
    </Link>
  );
}
