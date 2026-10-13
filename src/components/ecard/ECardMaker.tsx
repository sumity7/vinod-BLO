"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Download, ImagePlus, Loader2, Share2, X } from "lucide-react";
import { CARD_H, CARD_W, drawCard, fontFromVar, loadImage } from "@/lib/ecardDraw";
import type { ECardTemplate } from "@/content/ecards";
import type { Scene } from "@/lib/ecardScenes";

export type CardOption = {
  id: string;
  label: string;
  greeting: string;
  title?: string;
  kicker?: string;
  line: string;
  motif: ECardTemplate["motif"];
  palette: ECardTemplate["palette"];
  medallion?: string;
  /** Themed picture behind the card. */
  scene?: Scene;
  /** What the day is, or who said the words. */
  detail?: string;
  /** Portrait for the medallion of a tribute card, and the small text under it. */
  portrait?: string;
  caption?: string;
  /** Group heading in the picker. */
  group: "festival" | "tribute";
  /** mm-dd of the anniversary, for tributes: the picker shows the soonest few. */
  date?: string;
};

type Labels = {
  occasion: string;
  yourName: string;
  namePlaceholder: string;
  yourPlace: string;
  placePlaceholder: string;
  photo: string;
  photoHint: string;
  choosePhoto: string;
  removePhoto: string;
  download: string;
  share: string;
  preparing: string;
  preview: string;
  shareFallback: string;
  from: string;
  festivals: string;
  tributes: string;
  today: string;
  tomorrow: string;
  inDays: string;
};

function daysTo(mmdd: string) {
  const [m, d] = mmdd.split("-").map(Number);
  const now = new Date();
  const base = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let next = new Date(base.getFullYear(), m - 1, d);
  if (next < base) next = new Date(base.getFullYear() + 1, m - 1, d);
  return Math.round((next.getTime() - base.getTime()) / 86_400_000);
}

/** Anek Latin first, then Anek Devanagari: each covers only its own script. */
const sansFamily = () => {
  const latin = fontFromVar("--font-anek-latin", "");
  const deva = fontFromVar("--font-anek-deva", "sans-serif");
  return latin ? `${latin.replace(/,\s*$/, "")}, ${deva}` : deva;
};

/** Reads a photo the visitor picks and shrinks it, entirely in the browser. */
function readPhoto(file: File) {
  return new Promise<HTMLImageElement | null>((resolve) => {
    const url = URL.createObjectURL(file);
    loadImage(url).then((img) => {
      URL.revokeObjectURL(url);
      resolve(img);
    });
  });
}

export function ECardMaker({
  options,
  initial,
  labels,
  leader,
  footer,
  fileStem,
}: {
  options: CardOption[];
  initial?: string;
  labels: Labels;
  leader: { name: string; role: string; photo: string; logo: string };
  footer: string;
  fileStem: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selected, setSelected] = useState(() => options.find((o) => o.id === initial)?.id ?? options[0].id);
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [photo, setPhoto] = useState<HTMLImageElement | null>(null);
  const [assets, setAssets] = useState<{ photo: HTMLImageElement | null; logo: HTMLImageElement | null } | null>(null);
  const [busy, setBusy] = useState<"download" | "share" | null>(null);
  const [notice, setNotice] = useState("");
  const option = useMemo(() => options.find((o) => o.id === selected) ?? options[0], [options, selected]);
  // Anniversaries depend on today's date, so they are worked out in the browser after load.
  const [tributes, setTributes] = useState<(CardOption & { days: number })[]>([]);
  useEffect(() => {
    const list = options
      .filter((o) => o.group === "tribute" && o.date)
      .map((o) => ({ ...o, days: daysTo(o.date!) }))
      .sort((a, b) => a.days - b.days);
    const soon = list.slice(0, 4);
    const chosen = list.find((o) => o.id === selected);
    if (chosen && !soon.includes(chosen)) soon.push(chosen);
    setTributes(soon);
  }, [options, selected]);
  const badge = (days: number) =>
    days === 0 ? labels.today : days === 1 ? labels.tomorrow : labels.inDays.replace("{n}", String(days));

  // The portrait of the person remembered, for tribute cards.
  const [portrait, setPortrait] = useState<{ src: string; img: HTMLImageElement | null } | null>(null);
  useEffect(() => {
    const src = option.portrait;
    if (!src) return;
    let alive = true;
    loadImage(src).then((img) => alive && setPortrait({ src, img }));
    return () => {
      alive = false;
    };
  }, [option.portrait]);
  const medallionImage = option.portrait && portrait?.src === option.portrait ? portrait.img : null;
  // A tribute card waits for its portrait so it never flashes the initials first.
  const portraitPending = Boolean(option.portrait) && portrait?.src !== option.portrait;

  // Load the leader's photo, the party symbol and the fonts once.
  useEffect(() => {
    let alive = true;
    const display = fontFromVar("--font-tiro", "serif");
    const sans = sansFamily();
    Promise.all([
      loadImage(leader.photo),
      loadImage(leader.logo),
      document.fonts?.load(`64px ${display}`, "शुभकामनाएँ Aa").catch(() => []),
      document.fonts?.load(`600 32px ${sans}`, "विनोद Aa").catch(() => []),
      document.fonts?.load(`400 32px ${sans}`, "विनोद Aa").catch(() => []),
    ]).then(([p, l]) => alive && setAssets({ photo: p, logo: l }));
    return () => {
      alive = false;
    };
  }, [leader.photo, leader.logo]);

  // Redraw on every change.
  useEffect(() => {
    if (!assets || !canvasRef.current || portraitPending) return;
    drawCard(canvasRef.current, {
      palette: option.palette,
      motif: option.motif,
      greeting: option.greeting,
      title: option.title,
      kicker: option.kicker,
      line: option.line,
      medallion: option.medallion,
      medallionImage,
      caption: option.caption,
      scene: option.scene,
      detail: option.detail,
      leader: { name: leader.name, role: leader.role, photo: assets.photo, logo: assets.logo },
      sender: { name, place, photo, fromLabel: labels.from },
      footer,
      fonts: {
        display: fontFromVar("--font-tiro", "serif"),
        sans: sansFamily(),
      },
    });
  }, [assets, option, medallionImage, portraitPending, name, place, photo, leader.name, leader.role, labels.from, footer]);

  // canvas.toBlob returns nothing and calls back later, so the promise resolves in the callback.
  const toBlob = () =>
    new Promise<Blob | null>((resolve) => {
      const canvas = canvasRef.current;
      if (!canvas) return resolve(null);
      try {
        canvas.toBlob((b) => resolve(b), "image/png");
      } catch {
        resolve(null);
      }
    });

  const fileName = `${fileStem}-${option.id}.png`;

  const download = async () => {
    setBusy("download");
    setNotice("");
    const blob = await toBlob();
    if (blob) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 2000);
    }
    setBusy(null);
  };

  const share = async () => {
    setBusy("share");
    setNotice("");
    const blob = await toBlob();
    if (!blob) return setBusy(null);
    const file = new File([blob], fileName, { type: "image/png" });
    // Phones: the share sheet sends the image itself to WhatsApp.
    if (navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({ files: [file], text: option.greeting });
      } catch {
        /* The visitor closed the share sheet. */
      }
      return setBusy(null);
    }
    // Computers: download the card and open WhatsApp with the greeting text.
    await download();
    setNotice(labels.shareFallback);
    window.open(`https://wa.me/?text=${encodeURIComponent(`${option.greeting} 🙏`)}`, "_blank", "noopener,noreferrer");
    setBusy(null);
  };

  const groups: { key: CardOption["group"]; title: string }[] = [
    { key: "festival", title: labels.festivals },
    { key: "tribute", title: labels.tributes },
  ];

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-6 xl:col-span-7">
        <fieldset>
          <legend className="field-label text-lg">{labels.occasion}</legend>
          {groups.map((g) => {
            const list: (CardOption & { days?: number })[] =
              g.key === "tribute" ? tributes : options.filter((o) => o.group === g.key);
            if (list.length === 0) return null;
            return (
              <div key={g.key} className="mt-3">
                <p className="mb-2 text-sm font-semibold text-muted">{g.title}</p>
                <div className="flex flex-wrap gap-2">
                  {list.map((o) => (
                    <button
                      key={o.id}
                      type="button"
                      className="chip"
                      aria-pressed={o.id === selected}
                      onClick={() => setSelected(o.id)}
                    >
                      <span
                        aria-hidden="true"
                        className="h-3.5 w-3.5 rounded-full ring-1 ring-black/10"
                        style={{ background: `linear-gradient(135deg, ${o.palette[0]}, ${o.palette[2]})` }}
                      />
                      {o.label}
                      {o.days !== undefined && o.days <= 60 && (
                        <span className="text-xs font-semibold text-saffron-deep">{badge(o.days)}</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </fieldset>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="ec-name" className="field-label">
              {labels.yourName}
            </label>
            <input
              id="ec-name"
              className="field"
              value={name}
              maxLength={40}
              autoComplete="name"
              placeholder={labels.namePlaceholder}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="ec-place" className="field-label">
              {labels.yourPlace}
            </label>
            <input
              id="ec-place"
              className="field"
              value={place}
              maxLength={50}
              placeholder={labels.placePlaceholder}
              onChange={(e) => setPlace(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-5">
          <span className="field-label">{labels.photo}</span>
          <div className="flex flex-wrap items-center gap-3">
            <label className="btn btn-ghost cursor-pointer">
              <ImagePlus aria-hidden="true" className="h-4 w-4" />
              {labels.choosePhoto}
              <input
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={async (e) => {
                  const f = e.target.files?.[0];
                  if (f) setPhoto(await readPhoto(f));
                  e.target.value = "";
                }}
              />
            </label>
            {photo && (
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setPhoto(null)}>
                <X aria-hidden="true" className="h-4 w-4" />
                {labels.removePhoto}
              </button>
            )}
          </div>
          <p className="mt-2 text-sm text-muted">{labels.photoHint}</p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <button type="button" onClick={share} disabled={!assets || busy !== null} className="btn btn-primary">
            {busy === "share" ? <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" /> : <Share2 aria-hidden="true" className="h-4 w-4" />}
            {busy === "share" ? labels.preparing : labels.share}
          </button>
          <button type="button" onClick={download} disabled={!assets || busy !== null} className="btn btn-ghost">
            {busy === "download" ? <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" /> : <Download aria-hidden="true" className="h-4 w-4" />}
            {busy === "download" ? labels.preparing : labels.download}
          </button>
        </div>
        <p role="status" className="mt-3 min-h-6 text-sm text-ganga">
          {notice}
        </p>
      </div>

      <div className="lg:col-span-6 xl:col-span-5">
        <div className="lg:sticky lg:top-28">
          <p className="mb-3 text-sm font-semibold text-muted">{labels.preview}</p>
          <div className="relative overflow-hidden rounded-panel bg-sand shadow-raised" style={{ aspectRatio: `${CARD_W} / ${CARD_H}` }}>
            {!assets && (
              <div className="absolute inset-0 grid place-items-center text-muted">
                <Loader2 aria-hidden="true" className="h-8 w-8 animate-spin" />
              </div>
            )}
            <canvas
              ref={canvasRef}
              width={CARD_W}
              height={CARD_H}
              role="img"
              aria-label={`${labels.preview}: ${option.greeting}`}
              className="block h-full w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
