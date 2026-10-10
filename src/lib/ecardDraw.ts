/**
 * Draws an e-card onto a canvas, entirely in the browser: no upload, no server. The card is
 * 1080 × 1350 (the 4:5 shape WhatsApp and Instagram show without cropping).
 */
import type { Motif } from "@/content/ecards";
import { drawScene, type Scene } from "./ecardScenes";

export const CARD_W = 1080;
export const CARD_H = 1350;
/** Scenes are drawn for a picture band centred on y 340; the card lifts them to leave room for text. */
const SCENE_LIFT = 45;
const MID_Y = 340 - SCENE_LIFT;

export type CardInput = {
  palette: [string, string, string, string];
  motif: Motif;
  greeting: string;
  line: string;
  /** Shown in a medallion instead of the motif's centrepiece (tribute cards): initials, used when there is no portrait. */
  medallion?: string;
  /** The portrait for the medallion on a tribute card. */
  medallionImage?: HTMLImageElement | null;
  /** Small text under the medallion, e.g. the years of a life. */
  caption?: string;
  /** The picture behind the card, themed to the occasion or the person remembered. */
  scene?: Scene;
  /** A further short line under the main line (what the day is, who said the words). */
  detail?: string;
  leader: { name: string; role: string; photo: HTMLImageElement | null; logo: HTMLImageElement | null };
  sender: { name: string; place: string; photo: HTMLImageElement | null; fromLabel: string };
  footer: string;
  fonts: { display: string; sans: string };
};

type Ctx = CanvasRenderingContext2D;

const TAU = Math.PI * 2;

function rgba(hex: string, a: number) {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.replace(/./g, (c) => c + c) : h, 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

/** Deterministic pseudo-random numbers, so a card looks the same every time it is drawn. */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function wrap(ctx: Ctx, text: string, maxWidth: number) {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = w;
    } else line = test;
  }
  if (line) lines.push(line);
  return lines;
}

/** Fit text into at most `maxLines` lines by shrinking the font. Returns the chosen size and lines. */
function fit(ctx: Ctx, text: string, family: string, start: number, min: number, maxWidth: number, maxLines: number) {
  for (let size = start; size >= min; size -= 4) {
    ctx.font = `${size}px ${family}`;
    const lines = wrap(ctx, text, maxWidth);
    if (lines.length <= maxLines) return { size, lines };
  }
  ctx.font = `${min}px ${family}`;
  return { size: min, lines: wrap(ctx, text, maxWidth) };
}

function circleImage(ctx: Ctx, img: HTMLImageElement, cx: number, cy: number, r: number) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, TAU);
  ctx.closePath();
  ctx.clip();
  // Cover-fit, biased to the top so faces stay in the circle.
  const scale = Math.max((r * 2) / img.width, (r * 2) / img.height);
  const w = img.width * scale;
  const h = img.height * scale;
  ctx.drawImage(img, cx - w / 2, cy - r - (h - r * 2) * 0.15, w, h);
  ctx.restore();
}

function ring(ctx: Ctx, cx: number, cy: number, r: number, color: string, width: number) {
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, TAU);
  ctx.lineWidth = width;
  ctx.strokeStyle = color;
  ctx.stroke();
}

/**
 * A transparent cut-out standing on the card, its foot and cropped sides faded out, so the
 * straight edges of the photograph never show.
 */
function standingImage(ctx: Ctx, img: HTMLImageElement, cx: number, bottom: number, h: number) {
  const w = (h * img.width) / img.height;
  const off = document.createElement("canvas");
  off.width = Math.round(w);
  off.height = Math.round(h);
  const o = off.getContext("2d");
  if (!o) return;
  o.drawImage(img, 0, 0, w, h);
  o.globalCompositeOperation = "destination-in";
  const foot = o.createLinearGradient(0, 0, 0, h);
  foot.addColorStop(0, "#000");
  foot.addColorStop(0.82, "#000");
  foot.addColorStop(1, "rgba(0,0,0,0)");
  o.fillStyle = foot;
  o.fillRect(0, 0, w, h);
  const sides = o.createLinearGradient(0, 0, w, 0);
  sides.addColorStop(0, "rgba(0,0,0,0)");
  sides.addColorStop(0.07, "#000");
  sides.addColorStop(0.93, "#000");
  sides.addColorStop(1, "rgba(0,0,0,0)");
  o.fillStyle = sides;
  o.fillRect(0, 0, w, h);
  ctx.drawImage(off, cx - w / 2, bottom - h);
}

function glow(ctx: Ctx, x: number, y: number, r: number, color: string, a = 0.55) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, rgba(color, a));
  g.addColorStop(1, rgba(color, 0));
  ctx.fillStyle = g;
  ctx.fillRect(x - r, y - r, r * 2, r * 2);
}

function flame(ctx: Ctx, x: number, y: number, h: number) {
  glow(ctx, x, y - h * 0.4, h * 1.6, "#ffb627", 0.5);
  const g = ctx.createLinearGradient(x, y - h, x, y);
  g.addColorStop(0, "#fff6c2");
  g.addColorStop(0.45, "#ffc93c");
  g.addColorStop(1, "#ff7a00");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.moveTo(x, y - h);
  ctx.bezierCurveTo(x + h * 0.42, y - h * 0.45, x + h * 0.32, y, x, y);
  ctx.bezierCurveTo(x - h * 0.32, y, x - h * 0.42, y - h * 0.45, x, y - h);
  ctx.fill();
}

function diya(ctx: Ctx, x: number, y: number, w: number) {
  flame(ctx, x, y - w * 0.12, w * 0.55);
  const g = ctx.createLinearGradient(x, y - w * 0.15, x, y + w * 0.3);
  g.addColorStop(0, "#e8833a");
  g.addColorStop(1, "#8a3a10");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.moveTo(x - w / 2, y - w * 0.08);
  ctx.quadraticCurveTo(x, y + w * 0.5, x + w / 2, y - w * 0.08);
  ctx.quadraticCurveTo(x + w * 0.62, y - w * 0.16, x + w * 0.72, y - w * 0.2);
  ctx.quadraticCurveTo(x + w * 0.5, y - w * 0.02, x, y - w * 0.04);
  ctx.quadraticCurveTo(x - w * 0.5, y - w * 0.02, x - w / 2, y - w * 0.08);
  ctx.fill();
  ctx.fillStyle = "rgba(255,220,150,0.35)";
  ctx.beginPath();
  ctx.ellipse(x, y - w * 0.06, w * 0.44, w * 0.06, 0, 0, TAU);
  ctx.fill();
}

function petals(ctx: Ctx, cx: number, cy: number, r: number, n: number, color: string, inner: string) {
  for (let i = 0; i < n; i++) {
    const a = (i / n) * TAU;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(a);
    ctx.fillStyle = i % 2 ? color : inner;
    ctx.beginPath();
    ctx.ellipse(0, -r * 0.55, r * 0.22, r * 0.5, 0, 0, TAU);
    ctx.fill();
    ctx.restore();
  }
}

function lotus(ctx: Ctx, cx: number, cy: number, s: number, accent: string) {
  const layers: [number, number, string][] = [
    [0.95, 0.9, rgba(accent, 0.55)],
    [0.62, 0.95, rgba(accent, 0.8)],
    [0.3, 1, accent],
  ];
  for (const [spread, height, color] of layers) {
    for (const dir of [-1, 1, 0]) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(dir * spread);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(s * 0.32, -s * 0.5 * height, 0, -s * height);
      ctx.quadraticCurveTo(-s * 0.32, -s * 0.5 * height, 0, 0);
      ctx.fill();
      ctx.restore();
    }
  }
}

function marigoldString(ctx: Ctx, x1: number, x2: number, y: number, sag: number, r: number) {
  const n = Math.max(0, Math.floor((x2 - x1) / (r * 1.5)));
  for (let i = 0; i <= n; i++) {
    const t = n === 0 ? 0 : i / n;
    const x = x1 + (x2 - x1) * t;
    const yy = y + Math.sin(t * Math.PI) * sag;
    const g = ctx.createRadialGradient(x - r * 0.3, yy - r * 0.3, 1, x, yy, r);
    g.addColorStop(0, i % 3 === 0 ? "#ffd84d" : "#ffb11a");
    g.addColorStop(1, i % 3 === 0 ? "#e89a00" : "#e2620a");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, yy, r, 0, TAU);
    ctx.fill();
  }
}

function chakra(ctx: Ctx, cx: number, cy: number, r: number) {
  ctx.strokeStyle = "#0b3d91";
  ctx.lineWidth = r * 0.08;
  ring(ctx, cx, cy, r, "#0b3d91", r * 0.08);
  ctx.lineWidth = r * 0.035;
  for (let i = 0; i < 24; i++) {
    const a = (i / 24) * TAU;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
    ctx.stroke();
  }
  ctx.fillStyle = "#0b3d91";
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.14, 0, TAU);
  ctx.fill();
}

/** Ghat steps across the bottom of the motif band. */
function ghatSteps(ctx: Ctx, y: number, color: string) {
  ctx.fillStyle = color;
  const steps = 7;
  for (let i = 0; i < steps; i++) {
    const h = 12;
    const inset = i * 26;
    ctx.fillRect(inset, y + i * h, CARD_W - inset * 2, h - 3);
  }
}

function drawMotif(ctx: Ctx, input: CardInput) {
  const [, , accent] = input.palette;
  const rand = seeded(input.motif.length * 97 + input.greeting.length);
  const cx = CARD_W / 2;

  switch (input.motif) {
    case "diya": {
      for (let i = 0; i < 40; i++) {
        ctx.fillStyle = rgba(accent, 0.15 + rand() * 0.35);
        ctx.beginPath();
        ctx.arc(rand() * CARD_W, 160 + rand() * 300, 1.5 + rand() * 3, 0, TAU);
        ctx.fill();
      }
      diya(ctx, cx - 260, 420, 140);
      diya(ctx, cx + 260, 420, 140);
      diya(ctx, cx, 400, 220);
      break;
    }
    case "ghat-lamps": {
      // Crescent moon, river, floating lamps and the ghat steps.
      ctx.fillStyle = "#fff4d6";
      ctx.beginPath();
      ctx.arc(cx + 300, 210, 46, 0, TAU);
      ctx.fill();
      ctx.fillStyle = input.palette[0];
      ctx.beginPath();
      ctx.arc(cx + 322, 196, 42, 0, TAU);
      ctx.fill();
      for (let i = 0; i < 60; i++) {
        const x = rand() * CARD_W;
        const y = 300 + rand() * 100;
        glow(ctx, x, y, 16, accent, 0.6);
        ctx.fillStyle = "#ffd36b";
        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, TAU);
        ctx.fill();
      }
      ghatSteps(ctx, 420, rgba("#e7d2b0", 0.22));
      // Lamps on the top step.
      for (let i = 0; i < 9; i++) flame(ctx, 120 + i * 105, 418, 30);
      break;
    }
    case "sun": {
      glow(ctx, cx, 290, 300, "#fff1b0", 0.7);
      ctx.fillStyle = "#ffe08a";
      ctx.beginPath();
      ctx.arc(cx, 290, 110, 0, TAU);
      ctx.fill();
      ctx.strokeStyle = rgba("#fff7d6", 0.8);
      ctx.lineWidth = 6;
      for (let i = 0; i < 24; i++) {
        const a = (i / 24) * TAU;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(a) * 138, 290 + Math.sin(a) * 138);
        ctx.lineTo(cx + Math.cos(a) * 180, 290 + Math.sin(a) * 180);
        ctx.stroke();
      }
      ctx.strokeStyle = rgba("#ffffff", 0.45);
      ctx.lineWidth = 4;
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        for (let x = 0; x <= CARD_W; x += 20) ctx.lineTo(x, 440 + i * 16 + Math.sin(x / 40 + i) * 5);
        ctx.stroke();
      }
      break;
    }
    case "colours": {
      const cols = ["#ff4fa3", "#ffd54f", "#4fc3f7", "#7cdb5a", "#ff7043", "#b388ff"];
      for (let i = 0; i < 26; i++) {
        glow(ctx, rand() * CARD_W, 120 + rand() * 380, 60 + rand() * 120, cols[i % cols.length], 0.55);
      }
      break;
    }
    case "flag": {
      const bands = ["#ff9933", "#ffffff", "#138808"];
      for (let b = 0; b < 3; b++) {
        ctx.fillStyle = bands[b];
        ctx.beginPath();
        for (let x = 0; x <= CARD_W; x += 10) ctx.lineTo(x, 200 + b * 70 + Math.sin(x / 120) * 26);
        for (let x = CARD_W; x >= 0; x -= 10) ctx.lineTo(x, 270 + b * 70 + Math.sin(x / 120) * 26);
        ctx.closePath();
        ctx.fill();
      }
      ctx.strokeStyle = "rgba(0,0,0,0.06)";
      ctx.lineWidth = 2;
      ctx.strokeRect(0, 0, 0, 0);
      chakra(ctx, cx, 305 + Math.sin(cx / 120) * 26, 32);
      break;
    }
    case "shiva": {
      // Crescent, trishul and damru.
      glow(ctx, cx, 300, 260, accent, 0.35);
      ctx.strokeStyle = "#e8f6fb";
      ctx.lineWidth = 10;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(cx, 470);
      ctx.lineTo(cx, 170);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx - 70, 190);
      ctx.quadraticCurveTo(cx - 70, 270, cx, 280);
      ctx.quadraticCurveTo(cx + 70, 270, cx + 70, 190);
      ctx.stroke();
      ctx.fillStyle = "#e8f6fb";
      for (const dx of [-70, 0, 70]) {
        ctx.beginPath();
        ctx.moveTo(cx + dx, 140);
        ctx.lineTo(cx + dx - 14, 185);
        ctx.lineTo(cx + dx + 14, 185);
        ctx.closePath();
        ctx.fill();
      }
      // Damru.
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.moveTo(cx - 34, 320);
      ctx.lineTo(cx + 34, 320);
      ctx.lineTo(cx - 34, 380);
      ctx.lineTo(cx + 34, 380);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#fff4d6";
      ctx.beginPath();
      ctx.arc(cx + 210, 200, 54, 0, TAU);
      ctx.fill();
      ctx.fillStyle = input.palette[0];
      ctx.beginPath();
      ctx.arc(cx + 236, 186, 50, 0, TAU);
      ctx.fill();
      break;
    }
    case "rakhi": {
      ctx.strokeStyle = "#ffd27a";
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(40, 330);
      ctx.bezierCurveTo(300, 280, 780, 380, CARD_W - 40, 320);
      ctx.stroke();
      petals(ctx, cx, 325, 150, 16, "#ffcf5a", "#ff8a3d");
      ctx.fillStyle = "#c2185b";
      ctx.beginPath();
      ctx.arc(cx, 325, 54, 0, TAU);
      ctx.fill();
      ring(ctx, cx, 325, 54, "#ffe9a8", 6);
      break;
    }
    case "kite": {
      const kite = (x: number, y: number, s: number, c1: string, c2: string, rot: number) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rot);
        ctx.fillStyle = c1;
        ctx.beginPath();
        ctx.moveTo(0, -s);
        ctx.lineTo(s * 0.7, 0);
        ctx.lineTo(0, s);
        ctx.lineTo(-s * 0.7, 0);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = c2;
        ctx.beginPath();
        ctx.moveTo(0, -s);
        ctx.lineTo(s * 0.7, 0);
        ctx.lineTo(0, 0);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
        ctx.strokeStyle = "rgba(255,255,255,0.7)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, y + s);
        ctx.quadraticCurveTo(x - 60, y + s + 100, x - 160, 470);
        ctx.stroke();
      };
      kite(cx - 180, 250, 100, "#f2a51a", "#e8630a", -0.2);
      kite(cx + 220, 200, 80, "#ffffff", "#ff4f7a", 0.25);
      kite(cx + 60, 360, 55, "#7cdb5a", "#2e9e4f", 0.1);
      break;
    }
    case "lotus": {
      glow(ctx, cx, 330, 280, accent, 0.4);
      lotus(ctx, cx, 450, 230, accent);
      break;
    }
    case "garland": {
      marigoldString(ctx, -20, CARD_W + 20, 140, 90, 20);
      marigoldString(ctx, -20, CARD_W / 2, 148, 40, 15);
      marigoldString(ctx, CARD_W / 2, CARD_W + 20, 148, 40, 15);
      for (let i = 0; i < 9; i++) {
        const x = 80 + i * 115;
        const len = 70 + (i % 2) * 50;
        ctx.strokeStyle = "#d9a441";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, 160);
        ctx.lineTo(x, 160 + len);
        ctx.stroke();
        marigoldString(ctx, x, x + 0.01, 160 + len, 0, 13);
      }
      lotus(ctx, cx, 480, 140, accent);
      break;
    }
  }
}

export function drawCard(canvas: HTMLCanvasElement, input: CardInput) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  canvas.width = CARD_W;
  canvas.height = CARD_H;
  const [top, bottom, accent, ink] = input.palette;
  const { display, sans } = input.fonts;

  // Background.
  const bg = ctx.createLinearGradient(0, 0, 0, CARD_H);
  bg.addColorStop(0, top);
  bg.addColorStop(1, bottom);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, CARD_W, CARD_H);

  // Motif band.
  ctx.save();
  drawMotif(ctx, input);
  if (input.scene) {
    ctx.translate(0, -SCENE_LIFT);
    drawScene(ctx, input.scene, accent, ink, display);
  }
  ctx.restore();

  const hasMedallion = Boolean(input.medallion || input.medallionImage);
  if (hasMedallion) {
    const mx = CARD_W / 2;
    const my = MID_Y;
    const mr = 136;
    glow(ctx, mx, my, 280, accent, 0.5);
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(mx, my, mr + 12, 0, TAU);
    ctx.fill();
    if (input.medallionImage) {
      circleImage(ctx, input.medallionImage, mx, my, mr);
    } else {
      ctx.fillStyle = rgba(top, 0.9);
      ctx.beginPath();
      ctx.arc(mx, my, mr, 0, TAU);
      ctx.fill();
      ctx.fillStyle = ink;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = `120px ${display}`;
      ctx.fillText(input.medallion ?? "", mx, my + 10);
      ctx.textBaseline = "alphabetic";
    }
    ring(ctx, mx, my, mr + 12, accent, 8);
    ring(ctx, mx, my, mr + 34, rgba(accent, 0.55), 2);
    if (input.caption) {
      ctx.textAlign = "center";
      ctx.textBaseline = "alphabetic";
      ctx.font = `600 28px ${sans}`;
      const cw = ctx.measureText(input.caption).width + 44;
      ctx.fillStyle = "rgba(0,0,0,0.38)";
      ctx.beginPath();
      ctx.roundRect(mx - cw / 2, my + mr + 44, cw, 44, 22);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.fillText(input.caption, mx, my + mr + 75);
    }
  } else if (input.scene) {
    // Scenes without a portrait get a quiet ornament in the middle.
    glow(ctx, CARD_W / 2, MID_Y, 260, accent, 0.5);
    ring(ctx, CARD_W / 2, MID_Y, 150, rgba(accent, 0.85), 6);
    ring(ctx, CARD_W / 2, MID_Y, 124, rgba(accent, 0.45), 2);
    ctx.fillStyle = rgba(accent, 0.9);
    ctx.beginPath();
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * TAU - Math.PI / 2;
      const r = i % 2 ? 46 : 96;
      ctx.lineTo(CARD_W / 2 + Math.cos(a) * r, MID_Y + Math.sin(a) * r);
    }
    ctx.closePath();
    ctx.fill();
  }

  // Header: party symbol, name and role.
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  const headerBg = ctx.createLinearGradient(0, 0, 0, 130);
  headerBg.addColorStop(0, "rgba(0,0,0,0.28)");
  headerBg.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = headerBg;
  ctx.fillRect(0, 0, CARD_W, 130);
  let hx = 56;
  if (input.leader.logo) {
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(hx + 34, 66, 36, 0, TAU);
    ctx.fill();
    circleImage(ctx, input.leader.logo, hx + 34, 66, 33);
    hx += 90;
  }
  const lightHeader = isLight(top);
  ctx.fillStyle = lightHeader ? "#0a2832" : "#ffffff";
  ctx.font = `600 34px ${sans}`;
  ctx.fillText(input.leader.name, hx, 62);
  ctx.font = `400 24px ${sans}`;
  ctx.fillStyle = lightHeader ? "rgba(10,40,50,0.75)" : "rgba(255,255,255,0.82)";
  ctx.fillText(input.leader.role, hx, 98);

  // Text block: greeting, rule, main line and an optional detail, centred in the space between the
  // picture and the people.
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  const tribute = hasMedallion;
  const top0 = tribute ? (input.caption ? 540 : 500) : 500;
  const bottom0 = 890;
  const avail = bottom0 - top0;
  // Shrink the three pieces together until the block fits the space.
  let g!: ReturnType<typeof fit>;
  let l!: ReturnType<typeof fit>;
  let d: ReturnType<typeof fit> | null = null;
  let total = 0;
  for (let k = 1; k >= 0.6; k -= 0.05) {
    g = fit(ctx, input.greeting, display, Math.round((tribute ? 62 : 92) * k), 30, 940, tribute ? 2 : 3);
    l = fit(ctx, input.line, sans, Math.round((tribute ? 34 : 38) * k), 20, 900, tribute ? 5 : 2);
    d = input.detail ? fit(ctx, input.detail, sans, Math.round(28 * k), 18, 880, 2) : null;
    total = g.lines.length * g.size * 1.22 + 46 + l.lines.length * l.size * 1.4 + (d ? 14 + d.lines.length * d.size * 1.4 : 0);
    if (total <= avail) break;
  }
  let y = top0 + Math.max(0, (avail - total) / 2) + g.size * 0.95;

  ctx.fillStyle = ink;
  ctx.font = `${g.size}px ${display}`;
  for (const line of g.lines) {
    ctx.fillText(line, CARD_W / 2, y);
    y += g.size * 1.22;
  }
  // Accent rule.
  y -= g.size * 0.22;
  ctx.fillStyle = accent;
  ctx.fillRect(CARD_W / 2 - 60, y - g.size * 0.5, 120, 6);
  y += 34;
  ctx.fillStyle = rgba(ink, 0.92);
  ctx.font = `400 ${l.size}px ${sans}`;
  for (const line of l.lines) {
    ctx.fillText(line, CARD_W / 2, y);
    y += l.size * 1.4;
  }
  if (d) {
    y += 6;
    ctx.fillStyle = rgba(ink, 0.72);
    ctx.font = `400 ${d.size}px ${sans}`;
    for (const line of d.lines) {
      ctx.fillText(line, CARD_W / 2, y);
      y += d.size * 1.4;
    }
  }

  // People: the leader on the left, the sender on the right (or the leader alone, centred).
  const hasSender = input.sender.name.trim().length > 0;
  const py = 1052;
  const leaderX = hasSender ? 290 : CARD_W / 2;
  const panel = ctx.createLinearGradient(0, 900, 0, CARD_H);
  panel.addColorStop(0, rgba(ink, 0));
  panel.addColorStop(1, rgba(isLight(bottom) ? "#000000" : "#000000", 0.25));
  ctx.fillStyle = panel;
  ctx.fillRect(0, 900, CARD_W, CARD_H - 900);

  const person = (x: number, r: number, img: HTMLImageElement | null, initials: string) => {
    glow(ctx, x, py, r * 1.5, accent, 0.35);
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(x, py, r + 10, 0, TAU);
    ctx.fill();
    if (img) circleImage(ctx, img, x, py, r);
    else {
      ctx.fillStyle = rgba(accent, 0.9);
      ctx.beginPath();
      ctx.arc(x, py, r, 0, TAU);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.font = `${Math.round(r * 0.9)}px ${display}`;
      ctx.textBaseline = "middle";
      ctx.fillText(initials, x, py + r * 0.06);
      ctx.textBaseline = "alphabetic";
    }
    ring(ctx, x, py, r + 10, accent, 5);
  };

  // The leader stands large in the lower part of the card, with his name on a plate over his feet.
  if (input.leader.photo) {
    glow(ctx, leaderX, 1110, 300, accent, 0.4);
    // As tall as the room under the text allows, so his head never meets the greeting.
    const textBottom = y - l.size * 0.9;
    const h = Math.min(520, Math.max(360, CARD_H - 10 - textBottom - 36));
    standingImage(ctx, input.leader.photo, leaderX, CARD_H - 10, h);
    ctx.font = `600 32px ${sans}`;
    const nw = ctx.measureText(input.leader.name).width;
    ctx.font = `400 22px ${sans}`;
    const rw = ctx.measureText(input.leader.role).width;
    const pw = Math.max(nw, rw) + 64;
    const plateY = CARD_H - 128;
    ctx.fillStyle = "rgba(255,255,255,0.94)";
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(leaderX - pw / 2, plateY - 46, pw, 92, 46);
    else ctx.rect(leaderX - pw / 2, plateY - 46, pw, 92);
    ctx.fill();
    ctx.fillStyle = "#1c1410";
    ctx.font = `600 32px ${sans}`;
    ctx.fillText(input.leader.name, leaderX, plateY - 4);
    ctx.font = `400 22px ${sans}`;
    ctx.fillStyle = "#6e625a";
    ctx.fillText(input.leader.role, leaderX, plateY + 28);
  } else {
    person(leaderX, 128, null, input.leader.name.slice(0, 1));
    ctx.fillStyle = ink;
    ctx.font = `600 32px ${sans}`;
    ctx.fillText(input.leader.name, leaderX, py + 188);
    ctx.font = `400 22px ${sans}`;
    ctx.fillStyle = rgba(ink, 0.8);
    ctx.fillText(input.leader.role, leaderX, py + 220);
  }

  if (hasSender) {
    const sx = 790;
    person(sx, 104, input.sender.photo, input.sender.name.trim().slice(0, 1));
    ctx.fillStyle = rgba(ink, 0.8);
    ctx.font = `400 22px ${sans}`;
    ctx.fillText(input.sender.fromLabel, sx, py + 150);
    ctx.fillStyle = ink;
    const n = fit(ctx, input.sender.name.trim(), sans, 34, 24, 380, 1);
    ctx.font = `600 ${n.size}px ${sans}`;
    ctx.fillText(n.lines[0], sx, py + 188);
    if (input.sender.place.trim()) {
      const p = fit(ctx, input.sender.place.trim(), sans, 22, 18, 380, 1);
      ctx.font = `400 ${p.size}px ${sans}`;
      ctx.fillStyle = rgba(ink, 0.8);
      ctx.fillText(p.lines[0], sx, py + 220);
    }
  }

  // Footer: tricolour and the website.
  const fy = CARD_H - 10;
  const third = CARD_W / 3;
  ctx.fillStyle = "#ff9933";
  ctx.fillRect(0, fy, third, 10);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(third, fy, third, 10);
  ctx.fillStyle = "#138808";
  ctx.fillRect(third * 2, fy, third, 10);
  ctx.fillStyle = rgba(ink, 0.7);
  ctx.font = `400 20px ${sans}`;
  ctx.fillText(input.footer, CARD_W / 2, CARD_H - 24);
}

function isLight(hex: string) {
  const h = hex.replace("#", "");
  const n = parseInt(h, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return 0.299 * r + 0.587 * g + 0.114 * b > 170;
}

export function loadImage(src: string) {
  return new Promise<HTMLImageElement | null>((resolve) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

/** Resolve the real family name next/font gave a CSS variable, for use in canvas `font`. */
export function fontFromVar(name: string, fallback: string) {
  if (typeof window === "undefined") return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  if (!v) return fallback;
  return fallback ? `${v}, ${fallback}` : v;
}
