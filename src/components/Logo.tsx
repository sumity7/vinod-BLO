import Image from "next/image";
import Link from "next/link";
import { localePath, type Lang } from "@/lib/i18n";
import { site } from "@/lib/site";

/** The official logo: the lotus and the name in Devanagari over a saffron-to-green sweep. */
export function Logo({ lang }: { lang: Lang }) {
  const name = site.name[lang];
  return (
    <Link
      href={localePath(lang)}
      aria-label={`${name} – ${lang === "hi" ? "मुख्य पृष्ठ" : "home"}`}
      className="flex min-h-11 min-w-0 shrink items-center transition-opacity duration-200 hover:opacity-80"
    >
      <Image
        src="/images/brand-logo-h.webp"
        alt={name}
        width={871}
        height={180}
        sizes="(min-width: 1024px) 270px, 220px"
        loading="eager"
        className="h-auto w-[12.5rem] max-w-full sm:w-[14rem] lg:w-[16.5rem]"
      />
    </Link>
  );
}
