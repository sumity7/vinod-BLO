import type { Metadata } from "next";
import { About } from "@/components/About";
import { ContactSection } from "@/components/ContactSection";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { JourneyBand } from "@/components/JourneyBand";
import { PortalCtas } from "@/components/HomePortal";
import { StayConnected } from "@/components/StayConnected";
import { Updates } from "@/components/Updates";
import { getLang, type LangParams } from "@/lib/page";
import { homeSeo } from "@/content/seo";
import { buildMetadata, profilePageLd } from "@/lib/seo";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await getLang(params);
  return buildMetadata({
    lang,
    path: "",
    absoluteTitle: true,
    title: homeSeo.title[lang],
    description: homeSeo.description[lang],
  });
}

/**
 * Home is only about the leader and his office: banner, quick services, biography, journey, events,
 * the complaint and e-card invitations, Stay Connected (Facebook and YouTube), then the contact
 * form. Ideals, Vikas Yatra and Vichar live on their own pages, reached from the navigation.
 */
export default async function HomePage({ params }: LangParams) {
  const lang = await getLang(params);
  return (
    <>
      <Hero lang={lang} />
      <About lang={lang} />
      <JourneyBand lang={lang} />
      <Updates lang={lang} />
      <PortalCtas lang={lang} />
      <StayConnected lang={lang} />
      <ContactSection lang={lang} />
      <JsonLd data={profilePageLd(lang, "", homeSeo.title[lang], homeSeo.description[lang])} />
    </>
  );
}
