import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { PhotoGrid, type GridPhoto } from "@/components/PhotoGrid";
import { PageHeader } from "@/components/PageHeader";
import { formatDate } from "@/components/UpdateCard";
import { VideoCard } from "@/components/VideoCard";
import { media } from "@/content/media";
import { publishedUpdates, updateCategories, updates } from "@/content/updates";
import { getDict } from "@/content/ui";
import { localePath, locales, tr } from "@/lib/i18n";
import { getLang } from "@/lib/page";
import { articleLd, buildMetadata } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Props = { params: Promise<{ lang: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((lang) => publishedUpdates().map((u) => ({ lang, slug: u.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const lang = await getLang(params);
  const update = updates.find((u) => u.slug === slug);
  if (!update) return {};
  return buildMetadata({
    lang,
    path: `/updates/${slug}`,
    title: tr(update.title, lang),
    description: tr(update.summary, lang),
    type: "article",
    publishedTime: update.date,
    image: update.image && {
      src: update.image.src,
      width: update.image.width,
      height: update.image.height,
      alt: tr(update.image.alt, lang),
    },
  });
}

export default async function UpdatePage({ params }: Props) {
  const { slug } = await params;
  const lang = await getLang(params);
  const update = updates.find((u) => u.slug === slug);
  if (!update) notFound();
  const d = getDict(lang);
  const path = `/updates/${slug}`;
  const video = update.videoId ? media.find((m) => m.id === update.videoId && m.video) : undefined;
  const photos: GridPhoto[] = [update.image, ...(update.gallery ?? [])]
    .filter((img): img is NonNullable<typeof img> => Boolean(img))
    .map((img) => ({
      src: img.src,
      width: img.width,
      height: img.height,
      alt: tr(img.alt, lang),
      caption: img.caption ? tr(img.caption, lang) : undefined,
      position: img.position,
    }));

  return (
    <>
      <PageHeader
        lang={lang}
        path={path}
        title={tr(update.title, lang)}
        lead={update.description ? tr(update.description, lang) : undefined}
        description={tr(update.summary, lang)}
        eyebrow={[
          tr(updateCategories[update.category], lang),
          update.date ? formatDate(update.date, lang) : null,
          update.location ? tr(update.location, lang) : null,
        ]
          .filter(Boolean)
          .join(" · ")}
        crumbs={[
          { name: d.updates.title, path: "/updates" },
          { name: tr(update.title, lang), path },
        ]}
      />
      <article className="section shell">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Photographs: one wide lead photo, then an even grid. Each opens full size. */}
          {photos.length > 0 && (
            <div className="lg:col-span-7">
              <PhotoGrid photos={photos} labels={d.photo} eager={1} />
            </div>
          )}

          {/* Text (and the video, if there is one) */}
          <div
            className={`space-y-6 ${photos.length > 0 ? "lg:sticky lg:top-24 lg:col-span-5" : "mx-auto max-w-3xl lg:col-span-12"}`}
          >
            <div className="prose-ed fill text-[1.0625rem] leading-[1.9] text-ink-2 [text-wrap:pretty]">
              {update.body.map((p) => (
                <p key={p.en}>{tr(p, lang)}</p>
              ))}
            </div>
            {video && (
              <section aria-label={d.media.videos}>
                <VideoCard
                  item={video}
                  lang={lang}
                  variant="compact"
                  playLabel={d.media.play}
                  closeLabel={d.media.close}
                />
              </section>
            )}
          </div>
        </div>
      </article>
      <nav aria-label={d.biography.alsoSee} className="border-t border-line bg-white py-8">
        <div className="shell flex flex-wrap gap-x-12 gap-y-4">
          {[
            { href: "/updates", label: d.updates.title },
            { href: "/media", label: d.nav.gallery },
          ].map((l) => (
            <Link key={l.href} href={localePath(lang, l.href)} className="link-arrow">
              {l.label}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          ))}
        </div>
      </nav>
      <JsonLd
        data={articleLd({
          lang,
          path,
          headline: update.title,
          description: update.summary,
          date: update.date,
          image: update.image?.src,
        })}
      />
    </>
  );
}
