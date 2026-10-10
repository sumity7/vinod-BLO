import { ArrowUpRight } from "lucide-react";
import { getDict } from "@/content/ui";
import type { Lang } from "@/lib/i18n";
import { site } from "@/lib/site";
import { latestVideos } from "@/lib/youtube";
import { FacebookFeed } from "./FacebookFeed";
import { Reveal } from "./Reveal";
import { VideoShowcase } from "./VideoShowcase";
import { FacebookIcon, socialIcons } from "./icons";

const date = (iso: string, lang: Lang) =>
  new Intl.DateTimeFormat(lang === "hi" ? "hi-IN" : "en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));

/**
 * Both panels share one height on wide screens, so the two columns line up edge to edge. The whole
 * section is held to a centred column about as wide as two Facebook plugins (at most 500px each).
 */
const HEIGHT = 500;
const PANEL = "card relative w-full lg:h-[500px]";

/**
 * "Stay Connected", the closing band of the home page: the Facebook page's latest posts on the
 * left and the YouTube channel's latest videos on the right, in two equal panels, with the
 * official pages in a single row underneath.
 */
export async function StayConnected({ lang }: { lang: Lang }) {
  const d = getDict(lang);
  const videos = await latestVideos(6);
  const youtube = site.socials.find((s) => s.id === "youtube");

  return (
    <section id="connect" aria-labelledby="connect-title" className="section bg-paper">
      <div className="shell">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <h2 id="connect-title" className="h-section">
              {d.feed.connectTitle}
            </h2>
            <p className="mt-3 max-w-2xl text-ink-2">{d.feed.lead}</p>
          </Reveal>

          <div className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-2">
            {/* Left: Facebook */}
            <Reveal>
              <div className="mb-3 flex min-h-8 flex-wrap items-center justify-between gap-3">
                <h3 className="h-card">{d.feed.latestPosts}</h3>
                <a
                  href={site.feeds.facebookPage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-arrow"
                >
                  {d.feed.facebookOpen}
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </div>
              <div className={`${PANEL} h-[500px]`}>
                {/* Shown behind the plugin: it stays visible if Facebook does not load the timeline. */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-saffron text-white">
                    <FacebookIcon className="h-7 w-7" />
                  </span>
                  <p className="font-display text-xl font-semibold text-ink">{site.name[lang]}</p>
                  <p className="max-w-xs text-ink-2">{d.feed.facebookCta}</p>
                  <a
                    href={site.feeds.facebookPage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    {d.feed.facebookOpen}
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </div>
                {/* Sized to the panel, so the plugin is never cut off on phones. */}
                <FacebookFeed
                  page={site.feeds.facebookPage}
                  height={HEIGHT}
                  locale={lang === "hi" ? "hi_IN" : "en_GB"}
                  title={`${d.feed.facebook}: ${site.name[lang]}`}
                />
              </div>
            </Reveal>

            {/* Right: YouTube */}
            <Reveal delay={0.08}>
              <div className="mb-3 flex min-h-8 flex-wrap items-center justify-between gap-3">
                <h3 className="h-card">{d.feed.videosTitle}</h3>
                {youtube && (
                  <a href={youtube.href} target="_blank" rel="noopener noreferrer" className="link-arrow">
                    {d.feed.youtubeOpen}
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                )}
              </div>
              <div className={PANEL}>
                {videos.length > 0 ? (
                  <VideoShowcase
                    videos={videos.map((v) => ({
                      id: v.id,
                      title: v.title,
                      date: date(v.published, lang),
                      thumbnail: v.thumbnail,
                    }))}
                    labels={{ play: d.feed.playVideo, nowPlaying: d.feed.nowPlaying, more: d.feed.moreVideos }}
                  />
                ) : (
                  <p className="p-6 text-ink-2">{d.feed.empty}</p>
                )}
              </div>
            </Reveal>
          </div>

          {/* Every official page, in one row */}
          <Reveal className="mt-8">
            <h3 className="h-card mb-3">{d.feed.otherPages}</h3>
            <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {site.socials.map((s) => {
                const Icon = socialIcons[s.id as keyof typeof socialIcons];
                return (
                  <li key={s.id}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group card card-hover flex h-full items-center gap-3 p-3 sm:p-4"
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-soft bg-saffron text-white sm:h-12 sm:w-12">
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-semibold text-ink">{s.label}</span>
                        <span className="block truncate text-xs text-muted sm:text-sm">{s.handle}</span>
                      </span>
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
