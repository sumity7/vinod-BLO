import Image from "next/image";
import { getCategory, type Ideal, type IdealCategory } from "@/content/ideals";
import type { Lang } from "@/lib/i18n";

const tones: Record<IdealCategory["tone"], { ring: string; bg: string; ink: string }> = {
  saffron: { ring: "#f47216", bg: "#fde3cf", ink: "#9e3c03" },
  ganga: { ring: "#0f3a48", bg: "#d9e8ea", ink: "#0f3a48" },
  sindoor: { ring: "#a3281a", bg: "#f6e3e1", ink: "#7a1616" },
  marigold: { ring: "#f2a51a", bg: "#fff1cf", ink: "#8a5400" },
};

/**
 * Round portrait of an Ideal in the ring colour of their category, or a drawn monogram in a double
 * ring when there is no portrait (see content/ideals.ts).
 */
export function Monogram({ ideal, lang, size = 96 }: { ideal: Ideal; lang: Lang; size?: number }) {
  const t = tones[getCategory(ideal.category)?.tone ?? "saffron"];
  if (ideal.image) {
    return (
      <span
        className="relative block shrink-0 overflow-hidden rounded-full ring-4"
        style={{ width: size, height: size, ["--tw-ring-color" as string]: t.ring }}
      >
        <Image
          src={ideal.image}
          alt={ideal.name[lang]}
          fill
          sizes={`${size}px`}
          className="object-cover object-[50%_25%]"
        />
      </span>
    );
  }
  return (
    <span
      aria-hidden="true"
      className="grid shrink-0 place-items-center rounded-full font-display"
      style={{
        width: size,
        height: size,
        background: t.bg,
        color: t.ink,
        boxShadow: `inset 0 0 0 ${Math.max(2, size / 30)}px ${t.ring}, inset 0 0 0 ${Math.max(5, size / 12)}px ${t.bg}, inset 0 0 0 ${Math.max(6, size / 11)}px ${t.ring}55`,
        fontSize: size * (lang === "hi" ? 0.36 : 0.32),
        lineHeight: 1,
        paddingTop: lang === "hi" ? size * 0.06 : 0,
      }}
    >
      {ideal.initials[lang]}
    </span>
  );
}
