import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { vicharCategories, type Article } from "@/content/vichar";
import { pt, fill } from "@/content/portal";
import { localePath, type Lang } from "@/lib/i18n";

/**
 * Card for an article: a photo of its subject with the category on it and, where the article has
 * one, its large figure; then the title and summary.
 */
export function ArticleCard({ article, lang, compact = false }: { article: Article; lang: Lang; compact?: boolean }) {
  const t = pt(lang).vichar;
  return (
    <Link href={localePath(lang, `/vichar/${article.slug}`)} className="card card-hover group flex h-full flex-col">
      <div className="relative aspect-[16/10] overflow-hidden bg-ganga">
        <Image
          src={article.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-sm font-semibold text-saffron-deep shadow-soft">
          {vicharCategories[article.category][lang]}
        </span>
        {article.highlight && !compact && (
          <div className="absolute inset-x-4 bottom-3 text-white [text-shadow:0_1px_8px_rgb(0_0_0/0.5)]">
            <p className="font-display text-[2rem] leading-none text-marigold">{article.highlight.value[lang]}</p>
            <p className="mt-1 text-sm text-white/90">{article.highlight.label[lang]}</p>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-sm text-muted">{fill(t.readTime, { n: article.readMin })}</p>
        <h3 className="h-card mt-1.5">{article.title[lang]}</h3>
        {!compact && <p className="mt-3 flex-1 leading-relaxed text-ink-2">{article.summary[lang]}</p>}
        <span className="link-arrow mt-4">
          {pt(lang).ideals.read}
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
