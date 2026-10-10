import Image from "next/image";
import { meetingPhotos } from "@/content/media";
import { tr, type Lang } from "@/lib/i18n";
import { Reveal } from "./Reveal";

/**
 * Cards for the Meetings & Interactions page: the photographs marked `group: "meeting"` in
 * content/media.ts, in the order given. A short last row is centred, so there are no gaps.
 */
export function MeetingCards({ lang }: { lang: Lang }) {
  const items = meetingPhotos();
  return (
    <ul className="flex flex-wrap justify-center gap-6">
      {items.map((m) => (
        <li key={m.id} className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]">
          <Reveal className="h-full">
            <figure className="card flex h-full flex-col">
              <Image
                src={m.src}
                alt={tr(m.alt, lang)}
                width={m.width}
                height={m.height}
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
                className="aspect-[4/3] w-full bg-sand object-cover object-[50%_20%]"
              />
              <figcaption className="flex flex-1 flex-col p-5">
                <p className="h-card">{tr(m.title ?? m.caption, lang)}</p>
                {m.description && (
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-2">{tr(m.description, lang)}</p>
                )}
              </figcaption>
            </figure>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
