import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MeetingCards } from "@/components/Meetings";
import { PageHero } from "@/components/PageHero";
import { meetingPhotos } from "@/content/media";
import { getDict } from "@/content/ui";
import { getLang, type LangParams } from "@/lib/page";
import { buildMetadata } from "@/lib/seo";

const PATH = "/media/meetings";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await getLang(params);
  const d = getDict(lang);
  return buildMetadata({
    lang,
    path: PATH,
    title: d.sections.meetings,
    description: d.sections.meetingsLead,
  });
}

export default async function MeetingsPage({ params }: LangParams) {
  const lang = await getLang(params);
  if (meetingPhotos().length === 0) notFound();
  const d = getDict(lang);
  return (
    <>
      <PageHero
        lang={lang}
        path={PATH}
        title={d.sections.meetings}
        lead={d.sections.meetingsLead}
        description={d.sections.meetingsLead}
        crumbs={[
          { name: d.nav.gallery, path: "/media" },
          { name: d.sections.meetings, path: PATH },
        ]}
      />
      <div className="section shell">
        <MeetingCards lang={lang} />
      </div>
    </>
  );
}
