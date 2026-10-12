import Image from "next/image";
import {
  Banknote,
  BriefcaseMedical,
  Flame,
  GraduationCap,
  Landmark,
  Plane,
  Route,
  TrainFront,
  TrendingUp,
  Waypoints,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { Stat } from "@/content/vikas";
import { ratio } from "@/content/vikas";
import { fill, pt } from "@/content/portal";
import type { Lang } from "@/lib/i18n";

const icons: Record<Stat["icon"], LucideIcon> = {
  road: Route,
  plane: Plane,
  metro: TrainFront,
  hospital: BriefcaseMedical,
  seat: GraduationCap,
  bank: Landmark,
  flame: Flame,
  rise: TrendingUp,
  rail: Zap,
  rupee: Banknote,
  expressway: Waypoints,
  temple: Landmark,
};

const num = (n: number, lang: Lang) =>
  new Intl.NumberFormat(lang === "hi" ? "hi-IN" : "en-IN", { maximumFractionDigits: 2 }).format(n);

/**
 * One figure as a photo card: the work it measures on top, the figure now in large type, and, where
 * there is a "then", the two values as bars on the figure's own scale (units differ between figures,
 * so they never share an axis). The source sits underneath.
 */
export function StatCompare({ stat, lang, headingLevel = "h3" }: { stat: Stat; lang: Lang; headingLevel?: "h3" | "h4" }) {
  const t = pt(lang).vikas;
  const Icon = icons[stat.icon];
  const r = ratio(stat);
  const max = Math.max(stat.now.value, stat.then?.value ?? 0);
  const unit = stat.unit[lang];
  const show = (v: { value: number; display?: { en: string; hi: string } }) =>
    `${v.display ? v.display[lang] : num(v.value, lang)}${unit ? ` ${unit}` : ""}`;
  const H = headingLevel;

  return (
    <article className="card group flex h-full flex-col">
      <div className="relative aspect-[16/10] overflow-hidden bg-ganga">
        <Image
          src={stat.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
        <span className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/95 text-ganga shadow-soft">
          <Icon aria-hidden="true" className="h-5 w-5" />
        </span>
        {r && r >= 1.15 && (
          <span className="absolute right-4 top-4 rounded-full bg-saffron-deep px-3 py-1 text-sm font-semibold text-white shadow-soft">
            {fill(t.times, { x: num(Math.round(r * 10) / 10, lang) })}
          </span>
        )}
        <H className="h-card absolute inset-x-4 bottom-3 text-white [text-shadow:0_1px_8px_rgb(0_0_0/0.5)]">{stat.label[lang]}</H>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-sm text-muted">
          {stat.then ? t.now : t.sinceLaunch} ({stat.now.when[lang]})
        </p>
        <p className="font-display mt-1 text-[2.1rem] leading-none text-saffron-deep tabular-nums">{show(stat.now)}</p>

        {stat.then && (
          <div className="mt-5">
            <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 gap-y-2 text-sm">
              <span className="font-semibold text-ink">{t.now}</span>
              <div className="h-2 overflow-hidden rounded-full bg-sand-deep/70">
                <div className="h-full w-full rounded-full bg-saffron-deep" />
              </div>
              <span className="text-muted">{t.then}</span>
              <div className="h-2 overflow-hidden rounded-full bg-sand-deep/70">
                <div className="h-full rounded-full bg-[#b9a896]" style={{ width: `${Math.max(3, (stat.then.value / max) * 100)}%` }} />
              </div>
            </div>
            <p className="mt-2.5 text-sm text-ink-2">
              {t.then} ({stat.then.when[lang]}): <span className="font-semibold tabular-nums text-ink">{show(stat.then)}</span>
            </p>
          </div>
        )}

        {stat.note && <p className="mt-4 text-sm leading-relaxed text-ink-2">{stat.note[lang]}</p>}
        <div className="mt-auto pt-5">
          <p className="border-t border-line pt-4 text-xs leading-relaxed text-muted">
            {t.source}:{" "}
            <a href={stat.source.url} target="_blank" rel="noopener noreferrer" className="underline decoration-line underline-offset-2 hover:text-ganga">
              {stat.source.label}
            </a>
          </p>
        </div>
      </div>
    </article>
  );
}
