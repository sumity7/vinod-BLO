import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { UpdateRow } from "@/components/UpdateCard";
import { publishedUpdates } from "@/content/updates";
import { pageSeo } from "@/content/seo";
import { getDict } from "@/content/ui";
import { getLang, type LangParams } from "@/lib/page";
import { buildMetadata } from "@/lib/seo";

const PATH = "/updates";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await getLang(params);
  return buildMetadata({
    lang,
    path: PATH,
    absoluteTitle: true,
    title: pageSeo.updates.title[lang],
    description: pageSeo.updates.description[lang],
  });
}

export default async function UpdatesPage({ params }: LangParams) {
  const lang = await getLang(params);
  const list = publishedUpdates();
  if (list.length === 0) notFound();
  const d = getDict(lang);
  return (
    <>
      <PageHero
        lang={lang}
        title={d.updates.title}
        lead={d.updates.lead}
        path={PATH}
        description={pageSeo.updates.description[lang]}
        crumbs={[{ name: d.updates.title, path: PATH }]}
      />
      <div className="section shell">
        <div className="space-y-6">
          {list.map((u) => (
            <UpdateRow
              key={u.slug}
              update={u}
              lang={lang}
              readMore={d.sections.readMore}
              featuredLabel={d.updates.featured}
            />
          ))}
        </div>
      </div>
    </>
  );
}
