import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { TrackForm } from "@/components/shikayat/TrackForm";
import { pt } from "@/content/portal";
import { getLang, type LangParams } from "@/lib/page";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await getLang(params);
  const t = pt(lang);
  return buildMetadata({ lang, path: "/e-shikayat/track", title: t.track.title, description: t.track.description });
}

export default async function TrackPage({ params }: LangParams) {
  const lang = await getLang(params);
  const t = pt(lang);
  return (
    <>
      <PageHero
        lang={lang}
        path="/e-shikayat/track"
        crumbs={[
          { name: t.shikayat.title, path: "/e-shikayat" },
          { name: t.track.title, path: "/e-shikayat/track" },
        ]}
        title={t.track.title}
        lead={t.track.lead}
        description={t.track.description}
      />
      <section className="section">
        <div className="shell max-w-3xl">
          <TrackForm lang={lang} t={t.track} statuses={t.statuses} categories={t.categories} />
        </div>
      </section>
    </>
  );
}
