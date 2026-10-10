import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IdealsView, categoryPath } from "@/components/ideals/IdealsView";
import { getCategory, idealCategories, idealsIn } from "@/content/ideals";
import { pt } from "@/content/portal";
import { isLang, locales, type Lang } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

type Params = { params: Promise<{ lang: string; slug: string }> };

// The first category is /ideals itself.
export function generateStaticParams() {
  return locales.flatMap((lang) => idealCategories.slice(1).map((c) => ({ lang, slug: c.slug })));
}
export const dynamicParams = false;

// The thought of the day changes daily.
export const revalidate = 3600;

async function resolve(params: Params["params"]) {
  const { lang, slug } = await params;
  const category = getCategory(slug);
  if (!isLang(lang) || !category || categoryPath(category) === "/ideals") notFound();
  return { lang: lang as Lang, category };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang, category } = await resolve(params);
  const t = pt(lang).ideals;
  const names = idealsIn(category.slug).map((i) => i.name[lang]);
  return buildMetadata({
    lang,
    path: categoryPath(category),
    title: `${t.title}: ${category.name[lang]}`,
    description: `${category.name[lang]}: ${names.join(", ")}.`,
  });
}

export default async function IdealCategoryPage({ params }: Params) {
  const { lang, category } = await resolve(params);
  return <IdealsView lang={lang} category={category} />;
}
