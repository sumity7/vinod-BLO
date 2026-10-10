import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { PhotoGrid, type GridPhoto } from "@/components/PhotoGrid";
import { media } from "@/content/media";
import { pageSeo } from "@/content/seo";
import { getDict } from "@/content/ui";
import { publishedUpdates } from "@/content/updates";
import { tr, type L, type Lang } from "@/lib/i18n";
import { getLang, type LangParams } from "@/lib/page";
import { buildMetadata } from "@/lib/seo";

const PATH = "/media";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await getLang(params);
  return buildMetadata({
    lang,
    path: PATH,
    absoluteTitle: true,
    title: pageSeo.media.title[lang],
    description: pageSeo.media.description[lang],
  });
}

type Album = { id: string; title: L; photos: GridPhoto[] };

/**
 * Every photograph on the site, grouped in albums: one per event (in the order of the Events
 * list), then the remaining photographs. A photograph appears once. Photographs under
 * Meetings & Interactions have their own page.
 */
function buildAlbums(lang: Lang, moreTitle: L): Album[] {
  const seen = new Set<string>();
  const take = (p: GridPhoto) => (seen.has(p.src) ? false : (seen.add(p.src), true));
  const albums: Album[] = [];

  for (const u of publishedUpdates()) {
    const photos = [u.image, ...(u.gallery ?? [])]
      .filter((i): i is NonNullable<typeof i> => Boolean(i))
      .map<GridPhoto>((i) => ({
        src: i.src,
        width: i.width,
        height: i.height,
        alt: tr(i.alt, lang),
        caption: i.caption ? tr(i.caption, lang) : undefined,
        position: i.position,
      }))
      .filter(take);
    if (photos.length > 0) albums.push({ id: u.slug, title: u.title, photos });
  }

  const rest = media
    .filter((m) => !m.video && !m.group)
    .map<GridPhoto>((m) => ({
      src: m.src,
      width: m.width,
      height: m.height,
      alt: tr(m.alt, lang),
      caption: tr(m.caption, lang),
    }))
    .filter(take);
  if (rest.length > 0) albums.push({ id: "more", title: moreTitle, photos: rest });
  return albums;
}

export default async function MediaPage({ params }: LangParams) {
  const lang = await getLang(params);
  const d = getDict(lang);
  const albums = buildAlbums(lang, { en: d.gallery.more, hi: d.gallery.more });

  return (
    <>
      <PageHero
        lang={lang}
        path={PATH}
        title={d.media.title}
        lead={d.media.lead}
        description={pageSeo.media.description[lang]}
        crumbs={[{ name: d.media.title, path: PATH }]}
      />
      <div className="section shell">
        {albums.length > 1 && (
          <nav aria-label={d.gallery.jump} className="mb-10 flex flex-wrap gap-2">
            {albums.map((a) => (
              <a
                key={a.id}
                href={`#album-${a.id}`}
                className="rounded-full border border-line bg-white px-4 py-2 text-[0.9rem] text-ink-2 transition-colors hover:border-saffron-deep hover:text-saffron-deep"
              >
                {tr(a.title, lang)}
              </a>
            ))}
          </nav>
        )}

        <div className="space-y-14">
          {albums.map((a, ai) => (
            <section key={a.id} id={`album-${a.id}`} aria-labelledby={`album-title-${a.id}`} className="scroll-mt-28">
              <h2
                id={`album-title-${a.id}`}
                className="h-card mb-5 text-[1.5rem]"
              >
                {tr(a.title, lang)}
              </h2>
              <PhotoGrid photos={a.photos} labels={d.photo} layout="uniform" eager={ai === 0 ? 4 : 0} />
            </section>
          ))}
        </div>
      </div>
      <JsonLd
        data={albums.flatMap((a) =>
          a.photos.map((p) => ({
            "@context": "https://schema.org",
            "@type": "ImageObject",
            contentUrl: p.src,
            name: p.caption ?? p.alt,
            description: p.alt,
          })),
        )}
      />
    </>
  );
}
