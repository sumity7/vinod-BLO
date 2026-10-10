import type { Metadata } from "next";
import { IdealsView } from "@/components/ideals/IdealsView";
import { idealCategories } from "@/content/ideals";
import { pt } from "@/content/portal";
import { getLang, type LangParams } from "@/lib/page";
import { buildMetadata } from "@/lib/seo";

// The thought of the day changes daily.
export const revalidate = 3600;

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await getLang(params);
  const t = pt(lang).ideals;
  return buildMetadata({ lang, path: "/ideals", title: t.seoTitle, description: t.description });
}

export default async function IdealsPage({ params }: LangParams) {
  const lang = await getLang(params);
  return <IdealsView lang={lang} category={idealCategories[0]} />;
}
