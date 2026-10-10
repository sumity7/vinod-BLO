/**
 * Themed scenes for e-cards: the picture behind a card that belongs to its occasion or to the
 * person being remembered (a charkha for Gandhi ji, a rocket for Dr. Kalam, the Samvidhan for
 * Dr. Ambedkar, and so on). Everything is drawn from simple shapes; no one's likeness is drawn,
 * the portrait comes from the Ideals list.
 *
 * Layout: the card's picture band is y 110-620. The centre (x 540, y 340) is kept free for the
 * portrait medallion on tribute cards; scenes put their objects either side of it.
 */
type Ctx = CanvasRenderingContext2D;
const TAU = Math.PI * 2;
const W = 1080;
const CX = W / 2;
const CY = 340;

export type Scene =
  | "charkha"
  | "constitution"
  | "rocket"
  | "sunrise"
  | "swords"
  | "khanda"
  | "torch"
  | "lotus-flags"
  | "om-sun"
  | "bow"
  | "flute"
  | "dharmachakra"
  | "diya-book"
  | "seva"
  | "ekta"
  | "crescent"
  | "christmas";

function rgba(hex: string, a: number) {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.replace(/./g, (c) => c + c) : h, 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function glow(ctx: Ctx, x: number, y: number, r: number, color: string, a: number) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, rgba(color, a));
  g.addColorStop(1, rgba(color, 0));
  ctx.fillStyle = g;
  ctx.fillRect(x - r, y - r, r * 2, r * 2);
}

function stroke(ctx: Ctx, color: string, width: number) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
}

function circle(ctx: Ctx, x: number, y: number, r: number) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, TAU);
}

/** Many faint rays from one point, behind everything. */
function rays(ctx: Ctx, x: number, y: number, color: string, n = 28, a = 0.1) {
  for (let i = 0; i < n; i++) {
    const a0 = (i / n) * TAU;
    ctx.fillStyle = rgba(color, a);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x, y, 900, a0, a0 + TAU / n / 2);
    ctx.closePath();
    ctx.fill();
  }
}

function stars(ctx: Ctx, seed: number, color: string, n = 70, y0 = 120, y1 = 620) {
  const r = seeded(seed);
  for (let i = 0; i < n; i++) {
    const x = r() * W;
    const y = y0 + r() * (y1 - y0);
    const s = 1 + r() * 2.6;
    ctx.fillStyle = rgba(color, 0.3 + r() * 0.6);
    circle(ctx, x, y, s);
    ctx.fill();
    if (s > 3) {
      stroke(ctx, rgba(color, 0.5), 1.5);
      ctx.beginPath();
      ctx.moveTo(x - s * 3, y);
      ctx.lineTo(x + s * 3, y);
      ctx.moveTo(x, y - s * 3);
      ctx.lineTo(x, y + s * 3);
      ctx.stroke();
    }
  }
}

function star(ctx: Ctx, x: number, y: number, r: number, n = 5, inner = 0.45) {
  ctx.beginPath();
  for (let i = 0; i < n * 2; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / n;
    const rr = i % 2 ? r * inner : r;
    ctx.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr);
  }
  ctx.closePath();
}

function waves(ctx: Ctx, y: number, color: string, n = 5, a = 0.35) {
  for (let i = 0; i < n; i++) {
    stroke(ctx, rgba(color, a - i * 0.04), 3);
    ctx.beginPath();
    for (let x = 0; x <= W; x += 16) ctx.lineTo(x, y + i * 18 + Math.sin(x / 46 + i * 1.3) * 6);
    ctx.stroke();
  }
}

function sword(ctx: Ctx, x: number, y: number, len: number, angle: number, blade = "#e6ecf2", hilt = "#c9a227") {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  // Blade pointing up from the hilt.
  const g = ctx.createLinearGradient(-10, 0, 10, 0);
  g.addColorStop(0, "#9aa7b4");
  g.addColorStop(0.5, blade);
  g.addColorStop(1, "#9aa7b4");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.moveTo(-11, 0);
  ctx.lineTo(-9, -len * 0.88);
  ctx.lineTo(0, -len);
  ctx.lineTo(9, -len * 0.88);
  ctx.lineTo(11, 0);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = hilt;
  ctx.fillRect(-34, 0, 68, 11);
  ctx.fillRect(-7, 11, 14, 50);
  circle(ctx, 0, 66, 11);
  ctx.fill();
  ctx.restore();
}

/** Saffron flag (bhagwa dhwaj) on a pole. */
function flag(ctx: Ctx, x: number, y: number, h: number, dir: 1 | -1 = 1, color = "#ff7a1a") {
  stroke(ctx, "#d9c9a8", 6);
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x, y + h);
  ctx.stroke();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y + 6);
  ctx.quadraticCurveTo(x + dir * 60, y + 18, x + dir * 120, y + 44);
  ctx.quadraticCurveTo(x + dir * 66, y + 64, x + dir * 110, y + 96);
  ctx.quadraticCurveTo(x + dir * 50, y + 92, x, y + 100);
  ctx.closePath();
  ctx.fill();
  circle(ctx, x, y, 8);
  ctx.fillStyle = "#e6c35c";
  ctx.fill();
}

function lotus(ctx: Ctx, x: number, y: number, s: number, col = "#f7a8c0", mid = "#ffd7e2") {
  const petal = (a: number, len: number, wid: number, c: string) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(a);
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(wid, -len * 0.3, wid * 0.7, -len * 0.85, 0, -len);
    ctx.bezierCurveTo(-wid * 0.7, -len * 0.85, -wid, -len * 0.3, 0, 0);
    ctx.fill();
    ctx.restore();
  };
  for (const a of [-1.15, 1.15]) petal(a, s * 0.8, s * 0.3, rgba(col, 0.75));
  for (const a of [-0.6, 0.6]) petal(a, s * 0.95, s * 0.32, rgba(col, 0.9));
  petal(0, s, s * 0.34, mid);
}

function openBook(ctx: Ctx, x: number, y: number, w: number, cover: string, page = "#fff7e6") {
  const h = w * 0.62;
  ctx.fillStyle = cover;
  ctx.beginPath();
  ctx.moveTo(x - w / 2 - 10, y + 8);
  ctx.lineTo(x + w / 2 + 10, y + 8);
  ctx.lineTo(x + w / 2 + 10, y + h + 8);
  ctx.lineTo(x - w / 2 - 10, y + h + 8);
  ctx.closePath();
  ctx.fill();
  for (const dir of [-1, 1]) {
    ctx.fillStyle = page;
    ctx.beginPath();
    ctx.moveTo(x, y + 6);
    ctx.quadraticCurveTo(x + dir * w * 0.25, y - 14, x + dir * w * 0.5, y);
    ctx.lineTo(x + dir * w * 0.5, y + h);
    ctx.quadraticCurveTo(x + dir * w * 0.25, y + h - 14, x, y + h + 4);
    ctx.closePath();
    ctx.fill();
    stroke(ctx, "rgba(90,60,30,0.28)", 2);
    for (let i = 1; i <= 6; i++) {
      const yy = y + 14 + i * (h - 34) / 7;
      ctx.beginPath();
      ctx.moveTo(x + dir * 22, yy);
      ctx.lineTo(x + dir * (w * 0.43), yy - 4);
      ctx.stroke();
    }
  }
}

function wheel(ctx: Ctx, x: number, y: number, r: number, color: string, spokes = 24, width = 0.07) {
  stroke(ctx, color, r * width);
  circle(ctx, x, y, r);
  ctx.stroke();
  circle(ctx, x, y, r * 0.14);
  ctx.fillStyle = color;
  ctx.fill();
  stroke(ctx, color, r * width * 0.55);
  for (let i = 0; i < spokes; i++) {
    const a = (i / spokes) * TAU;
    ctx.beginPath();
    ctx.moveTo(x + Math.cos(a) * r * 0.14, y + Math.sin(a) * r * 0.14);
    ctx.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r);
    ctx.stroke();
  }
}

function diyaSmall(ctx: Ctx, x: number, y: number, w: number) {
  glow(ctx, x, y - w * 0.4, w * 1.6, "#ffb627", 0.5);
  const g = ctx.createLinearGradient(x, y - w, x, y);
  g.addColorStop(0, "#fff6c2");
  g.addColorStop(0.5, "#ffc93c");
  g.addColorStop(1, "#ff7a00");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.moveTo(x, y - w * 0.62);
  ctx.bezierCurveTo(x + w * 0.2, y - w * 0.3, x + w * 0.16, y - w * 0.1, x, y - w * 0.08);
  ctx.bezierCurveTo(x - w * 0.16, y - w * 0.1, x - w * 0.2, y - w * 0.3, x, y - w * 0.62);
  ctx.fill();
  ctx.fillStyle = "#c2602a";
  ctx.beginPath();
  ctx.moveTo(x - w / 2, y - w * 0.08);
  ctx.quadraticCurveTo(x, y + w * 0.5, x + w / 2, y - w * 0.08);
  ctx.closePath();
  ctx.fill();
}

/** Marigold-and-leaf string across the top. */
function bunting(ctx: Ctx, y: number, colors: string[]) {
  stroke(ctx, "rgba(255,255,255,0.35)", 3);
  ctx.beginPath();
  for (let x = 0; x <= W; x += 10) ctx.lineTo(x, y + Math.sin((x / W) * Math.PI) * 30);
  ctx.stroke();
  for (let i = 1; i < 14; i++) {
    const x = (i / 14) * W;
    const yy = y + Math.sin((x / W) * Math.PI) * 30;
    ctx.fillStyle = colors[i % colors.length];
    ctx.beginPath();
    ctx.moveTo(x - 16, yy);
    ctx.lineTo(x + 16, yy);
    ctx.lineTo(x, yy + 36);
    ctx.closePath();
    ctx.fill();
  }
}

/** Draws the scene behind a card's picture band. */
export function drawScene(ctx: Ctx, scene: Scene, accent: string, ink: string, display: string) {
  switch (scene) {
    case "charkha": {
      // Khadi weave, a charkha on one side, round spectacles on the other, thread between.
      rays(ctx, CX, CY, "#ffd9a0", 30, 0.07);
      stroke(ctx, "rgba(255,240,215,0.07)", 2);
      for (let x = 0; x < W; x += 14) {
        ctx.beginPath();
        ctx.moveTo(x, 110);
        ctx.lineTo(x, 620);
        ctx.stroke();
      }
      for (let y = 110; y < 620; y += 14) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }
      // Charkha: big wheel, stand, small spindle.
      const wx = 150;
      const wy = 360;
      stroke(ctx, "#e9c68c", 9);
      circle(ctx, wx, wy, 92);
      ctx.stroke();
      stroke(ctx, "#e9c68c", 4);
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * TAU;
        ctx.beginPath();
        ctx.moveTo(wx, wy);
        ctx.lineTo(wx + Math.cos(a) * 92, wy + Math.sin(a) * 92);
        ctx.stroke();
      }
      circle(ctx, wx, wy, 11);
      ctx.fillStyle = "#e9c68c";
      ctx.fill();
      stroke(ctx, "#cfa968", 10);
      ctx.beginPath();
      ctx.moveTo(wx - 20, wy + 92);
      ctx.lineTo(wx - 64, wy + 160);
      ctx.moveTo(wx + 20, wy + 92);
      ctx.lineTo(wx + 64, wy + 160);
      ctx.moveTo(wx - 90, wy + 160);
      ctx.lineTo(wx + 150, wy + 160);
      ctx.stroke();
      stroke(ctx, "#cfa968", 7);
      ctx.beginPath();
      ctx.moveTo(wx + 40, wy + 120);
      ctx.lineTo(wx + 150, wy + 120);
      ctx.stroke();
      stroke(ctx, "rgba(255,248,235,0.9)", 2);
      ctx.beginPath();
      ctx.moveTo(wx + 92, wy);
      ctx.quadraticCurveTo(wx + 220, wy - 20, wx + 170, wy + 118);
      ctx.stroke();
      // Round spectacles and a walking stick.
      const sx = 905;
      const sy = 330;
      stroke(ctx, "#e9c68c", 7);
      circle(ctx, sx - 52, sy, 40);
      ctx.stroke();
      circle(ctx, sx + 52, sy, 40);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(sx - 12, sy - 6);
      ctx.quadraticCurveTo(sx, sy - 18, sx + 12, sy - 6);
      ctx.moveTo(sx - 92, sy - 6);
      ctx.lineTo(sx - 128, sy - 22);
      ctx.moveTo(sx + 92, sy - 6);
      ctx.lineTo(sx + 128, sy - 22);
      ctx.stroke();
      stroke(ctx, "#cfa968", 10);
      ctx.beginPath();
      ctx.moveTo(sx + 60, sy + 70);
      ctx.lineTo(sx + 36, sy + 250);
      ctx.stroke();
      break;
    }
    case "constitution": {
      rays(ctx, CX, CY, "#9cc4ff", 30, 0.07);
      wheel(ctx, 160, 345, 100, "#cfe3ff", 24, 0.08);
      wheel(ctx, CX, CY, 230, rgba("#9cc4ff", 0.22), 24, 0.03);
      openBook(ctx, 915, 300, 190, "#f2c14e");
      stroke(ctx, "#ffffff", 6);
      circle(ctx, 915, 220, 4);
      ctx.fillStyle = "#fff";
      ctx.fill();
      // Scales of justice above the book.
      stroke(ctx, "#cfe3ff", 5);
      ctx.beginPath();
      ctx.moveTo(915, 200);
      ctx.lineTo(915, 250);
      ctx.moveTo(865, 218);
      ctx.lineTo(965, 218);
      ctx.stroke();
      for (const x of [865, 965]) {
        ctx.beginPath();
        ctx.moveTo(x, 218);
        ctx.lineTo(x - 22, 250);
        ctx.lineTo(x + 22, 250);
        ctx.closePath();
        ctx.stroke();
      }
      waves(ctx, 575, "#9cc4ff", 3, 0.25);
      break;
    }
    case "rocket": {
      stars(ctx, 11, "#ffffff", 110);
      glow(ctx, 160, 560, 380, "#4f8bff", 0.28);
      // Orbit ellipses.
      stroke(ctx, "rgba(255,210,122,0.4)", 2.5);
      ctx.save();
      ctx.translate(CX, CY);
      ctx.rotate(-0.38);
      ctx.beginPath();
      ctx.ellipse(0, 0, 330, 120, 0, 0, TAU);
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(0, 0, 400, 160, 0, 0, TAU);
      ctx.stroke();
      ctx.restore();
      // Rocket climbing on the right.
      ctx.save();
      ctx.translate(900, 340);
      ctx.rotate(0.35);
      const trail = ctx.createLinearGradient(0, 40, 0, 230);
      trail.addColorStop(0, "rgba(255,190,80,0.85)");
      trail.addColorStop(1, "rgba(255,120,40,0)");
      ctx.fillStyle = trail;
      ctx.beginPath();
      ctx.moveTo(-20, 40);
      ctx.lineTo(0, 230);
      ctx.lineTo(20, 40);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#f3f6ff";
      ctx.beginPath();
      ctx.moveTo(0, -150);
      ctx.bezierCurveTo(46, -90, 40, 10, 30, 44);
      ctx.lineTo(-30, 44);
      ctx.bezierCurveTo(-40, 10, -46, -90, 0, -150);
      ctx.fill();
      ctx.fillStyle = "#ff7a1a";
      ctx.beginPath();
      ctx.moveTo(0, -150);
      ctx.bezierCurveTo(26, -122, 36, -100, 40, -78);
      ctx.lineTo(-40, -78);
      ctx.bezierCurveTo(-36, -100, -26, -122, 0, -150);
      ctx.fill();
      ctx.fillStyle = "#4f8bff";
      circle(ctx, 0, -34, 17);
      ctx.fill();
      ctx.fillStyle = "#138808";
      ctx.beginPath();
      ctx.moveTo(-30, 20);
      ctx.lineTo(-62, 60);
      ctx.lineTo(-30, 44);
      ctx.closePath();
      ctx.moveTo(30, 20);
      ctx.lineTo(62, 60);
      ctx.lineTo(30, 44);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
      // A small satellite on the left.
      ctx.save();
      ctx.translate(150, 250);
      ctx.rotate(-0.4);
      ctx.fillStyle = "#cfd8ea";
      ctx.fillRect(-16, -16, 32, 32);
      ctx.fillStyle = "#4f8bff";
      ctx.fillRect(-84, -9, 56, 18);
      ctx.fillRect(28, -9, 56, 18);
      ctx.restore();
      break;
    }
    case "sunrise": {
      // A sun rising behind the portrait over the sea, lotuses either side: Kanyakumari at dawn.
      glow(ctx, CX, CY, 640, "#ffb347", 0.5);
      rays(ctx, CX, CY, "#ffd9a0", 26, 0.1);
      ctx.fillStyle = "rgba(255,207,122,0.42)";
      circle(ctx, CX, CY, 215);
      ctx.fill();
      lotus(ctx, 165, 520, 120, "#ffc0d4", "#ffe1ea");
      lotus(ctx, 915, 520, 120, "#ffc0d4", "#ffe1ea");
      break;
    }
    case "swords": {
      glow(ctx, CX, CY, 520, "#ff7a1a", 0.32);
      flag(ctx, 90, 150, 330, 1);
      flag(ctx, 990, 150, 330, -1);
      sword(ctx, 190, 570, 330, 0.5);
      sword(ctx, 190, 570, 330, -0.1, "#e6ecf2", "#e6c35c");
      sword(ctx, 890, 570, 330, -0.5);
      sword(ctx, 890, 570, 330, 0.1, "#e6ecf2", "#e6c35c");
      // Shield.
      ctx.fillStyle = "#7a1616";
      ctx.beginPath();
      ctx.arc(CX, 600, 70, Math.PI, TAU);
      ctx.fill();
      stroke(ctx, "#e6c35c", 5);
      ctx.beginPath();
      ctx.arc(CX, 600, 70, Math.PI, TAU);
      ctx.stroke();
      break;
    }
    case "khanda": {
      glow(ctx, CX, CY, 520, "#ffcf3a", 0.28);
      flag(ctx, 90, 150, 330, 1, "#f39a12");
      flag(ctx, 990, 150, 330, -1, "#f39a12");
      // Khanda: double-edged sword, a ring (chakkar) and two crossed kirpans.
      const kx = 905;
      const ky = 350;
      stroke(ctx, "#e6ecf2", 9);
      circle(ctx, kx, ky, 70);
      ctx.stroke();
      ctx.save();
      ctx.translate(kx, ky);
      ctx.fillStyle = "#e6ecf2";
      ctx.beginPath();
      ctx.moveTo(0, -140);
      ctx.lineTo(18, -90);
      ctx.lineTo(10, 70);
      ctx.lineTo(-10, 70);
      ctx.lineTo(-18, -90);
      ctx.closePath();
      ctx.fill();
      stroke(ctx, "#e6ecf2", 12);
      for (const s of [-1, 1]) {
        ctx.beginPath();
        ctx.moveTo(s * 52, 90);
        ctx.quadraticCurveTo(s * 112, 20, s * 80, -70);
        ctx.stroke();
      }
      ctx.restore();
      wheel(ctx, 170, 350, 85, rgba("#ffe08a", 0.9), 12, 0.07);
      break;
    }
    case "torch": {
      // Revolutionary: a torch, a rising sun and a broken chain.
      glow(ctx, CX, 560, 640, "#ff7a1a", 0.4);
      rays(ctx, CX, 600, "#ffb36b", 24, 0.08);
      const tx = 905;
      stroke(ctx, "#7a4a1f", 22);
      ctx.beginPath();
      ctx.moveTo(tx, 560);
      ctx.lineTo(tx, 400);
      ctx.stroke();
      glow(ctx, tx, 300, 180, "#ffb627", 0.6);
      const f = ctx.createLinearGradient(tx, 200, tx, 410);
      f.addColorStop(0, "#fff6c2");
      f.addColorStop(0.5, "#ffc93c");
      f.addColorStop(1, "#ff5a00");
      ctx.fillStyle = f;
      ctx.beginPath();
      ctx.moveTo(tx, 190);
      ctx.bezierCurveTo(tx + 90, 290, tx + 60, 400, tx, 410);
      ctx.bezierCurveTo(tx - 60, 400, tx - 90, 290, tx, 190);
      ctx.fill();
      // Broken chain on the left.
      stroke(ctx, "#cfd6de", 12);
      const links = [
        [100, 280, -0.5],
        [150, 330, 0.3],
        [215, 360, -0.2],
      ];
      for (const [x, y, a] of links) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(a);
        ctx.beginPath();
        ctx.ellipse(0, 0, 44, 24, 0, 0, TAU);
        ctx.stroke();
        ctx.restore();
      }
      ctx.save();
      ctx.translate(140, 450);
      ctx.rotate(0.9);
      ctx.beginPath();
      ctx.ellipse(0, 0, 44, 24, 0, 0, TAU * 0.78);
      ctx.stroke();
      ctx.restore();
      break;
    }
    case "lotus-flags": {
      glow(ctx, CX, CY, 520, "#ff9a3a", 0.3);
      flag(ctx, 90, 160, 330, 1);
      flag(ctx, 990, 160, 330, -1);
      lotus(ctx, 205, 520, 170, "#ffb0c8", "#ffe1ea");
      lotus(ctx, 875, 520, 170, "#ffb0c8", "#ffe1ea");
      break;
    }
    case "om-sun": {
      rays(ctx, CX, CY, "#ffd9a0", 36, 0.09);
      glow(ctx, CX, CY, 440, "#ffcf7a", 0.4);
      ctx.fillStyle = rgba(accent, 0.95);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = `210px ${display}`;
      ctx.fillText("ॐ", 175, 350);
      diyaSmall(ctx, 905, 420, 120);
      diyaSmall(ctx, 800, 470, 80);
      break;
    }
    case "bow": {
      // Dhanush and baan under a rising sun, with diyas.
      glow(ctx, CX, 330, 520, "#ffb347", 0.45);
      rays(ctx, CX, 560, "#ffd9a0", 26, 0.09);
      stroke(ctx, "#e9c68c", 12);
      ctx.beginPath();
      ctx.moveTo(190, 195);
      ctx.quadraticCurveTo(80, 370, 190, 545);
      ctx.stroke();
      stroke(ctx, "rgba(255,248,235,0.9)", 3);
      ctx.beginPath();
      ctx.moveTo(190, 195);
      ctx.lineTo(190, 545);
      ctx.stroke();
      stroke(ctx, "#f4e3b8", 6);
      ctx.beginPath();
      ctx.moveTo(190, 370);
      ctx.lineTo(330, 370);
      ctx.stroke();
      ctx.fillStyle = "#f4e3b8";
      ctx.beginPath();
      ctx.moveTo(350, 370);
      ctx.lineTo(320, 355);
      ctx.lineTo(320, 385);
      ctx.fill();
      flag(ctx, 940, 160, 300, -1);
      diyaSmall(ctx, 820, 540, 90);
      diyaSmall(ctx, 330, 545, 90);
      break;
    }
    case "flute": {
      // Bansuri, a peacock feather and a butter pot against a dark blue sky.
      stars(ctx, 5, "#cfe0ff", 60);
      glow(ctx, CX, CY, 520, "#5aa7ff", 0.3);
      ctx.save();
      ctx.translate(180, 350);
      ctx.rotate(-0.5);
      const g = ctx.createLinearGradient(0, -10, 0, 10);
      g.addColorStop(0, "#e9c68c");
      g.addColorStop(1, "#a9772f");
      ctx.fillStyle = g;
      ctx.fillRect(-130, -10, 260, 20);
      ctx.fillStyle = "#5a3a12";
      for (let i = 0; i < 5; i++) {
        circle(ctx, -70 + i * 34, 0, 4.5);
        ctx.fill();
      }
      ctx.restore();
      // Peacock feather.
      const fx = 905;
      const fy = 340;
      stroke(ctx, "#2f8f6b", 4);
      ctx.beginPath();
      ctx.moveTo(fx - 36, fy + 220);
      ctx.quadraticCurveTo(fx, fy + 100, fx, fy - 60);
      ctx.stroke();
      for (let i = 0; i < 28; i++) {
        const t = i / 28;
        const yy = fy + 150 - t * 270;
        stroke(ctx, rgba("#3fb98f", 0.7), 2);
        ctx.beginPath();
        ctx.moveTo(fx - 2, yy);
        ctx.lineTo(fx - 56 * (1 - t * 0.2), yy - 20);
        ctx.moveTo(fx - 2, yy);
        ctx.lineTo(fx + 56 * (1 - t * 0.2), yy - 20);
        ctx.stroke();
      }
      const eye = (r: number, c: string) => {
        ctx.fillStyle = c;
        ctx.beginPath();
        ctx.ellipse(fx, fy - 70, r * 0.7, r, 0, 0, TAU);
        ctx.fill();
      };
      eye(56, "#1e8a6a");
      eye(40, "#e8c04a");
      eye(28, "#1b5fb5");
      eye(12, "#0b2a5b");
      break;
    }
    case "dharmachakra": {
      rays(ctx, CX, CY, "#ffe4a8", 32, 0.08);
      wheel(ctx, 170, 350, 105, "#f2c14e", 8, 0.09);
      lotus(ctx, 905, 470, 150, "#ffd2a8", "#fff0dc");
      stroke(ctx, "#f2c14e", 3);
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.arc(905, 330, 24 + i * 16, Math.PI * 1.1, Math.PI * 1.9);
        ctx.stroke();
      }
      waves(ctx, 585, "#ffe4a8", 2, 0.25);
      break;
    }
    case "diya-book": {
      glow(ctx, CX, CY, 520, "#ffb347", 0.28);
      diyaSmall(ctx, 190, 400, 150);
      openBook(ctx, 905, 300, 200, "#8a3a10");
      diyaSmall(ctx, 905, 280, 60);
      stroke(ctx, "rgba(255,230,180,0.5)", 3);
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.arc(190, 330, 130 + i * 36, Math.PI * 1.15, Math.PI * 1.85);
        ctx.stroke();
      }
      break;
    }
    case "seva": {
      rays(ctx, CX, CY, "#cfe8ff", 30, 0.08);
      glow(ctx, CX, CY, 440, "#8fc8ff", 0.35);
      // Two hearts, joined hands of service.
      const heart = (x: number, y: number, s: number, c: string) => {
        ctx.fillStyle = c;
        ctx.beginPath();
        ctx.moveTo(x, y + s * 0.35);
        ctx.bezierCurveTo(x - s, y - s * 0.4, x - s * 0.4, y - s * 0.95, x, y - s * 0.4);
        ctx.bezierCurveTo(x + s * 0.4, y - s * 0.95, x + s, y - s * 0.4, x, y + s * 0.35);
        ctx.fill();
      };
      heart(170, 380, 120, "#ff8fab");
      heart(905, 400, 90, "#ffd2dc");
      heart(800, 290, 44, "#ff8fab");
      break;
    }
    case "ekta": {
      // Unity: the tricolour with the chakra, and a ribbon of the three colours.
      const bands = ["#ff9933", "#ffffff", "#138808"];
      for (let b = 0; b < 3; b++) {
        ctx.fillStyle = rgba(bands[b], 0.9);
        ctx.beginPath();
        for (let x = 0; x <= W; x += 10) ctx.lineTo(x, 160 + b * 90 + Math.sin(x / 130 + 0.6) * 26);
        for (let x = W; x >= 0; x -= 10) ctx.lineTo(x, 250 + b * 90 + Math.sin(x / 130 + 0.6) * 26);
        ctx.closePath();
        ctx.fill();
      }
      break;
    }
    case "crescent": {
      // Chand, a star and hanging lanterns.
      stars(ctx, 21, "#fff1c4", 60);
      glow(ctx, CX, CY, 520, "#ffd36b", 0.25);
      ctx.fillStyle = "#ffe29a";
      circle(ctx, 190, 330, 100);
      ctx.fill();
      ctx.fillStyle = "#0e3b32";
      circle(ctx, 232, 308, 88);
      ctx.fill();
      ctx.fillStyle = "#ffe29a";
      star(ctx, 285, 255, 26);
      ctx.fill();
      for (const [x, h, c] of [
        [820, 190, "#ffd36b"],
        [900, 260, "#ff9a5a"],
        [980, 200, "#ffd36b"],
      ] as const) {
        stroke(ctx, "rgba(255,240,200,0.7)", 3);
        ctx.beginPath();
        ctx.moveTo(x, 110);
        ctx.lineTo(x, h);
        ctx.stroke();
        glow(ctx, x, h + 50, 90, c, 0.5);
        ctx.fillStyle = c;
        ctx.beginPath();
        ctx.moveTo(x - 20, h);
        ctx.lineTo(x + 20, h);
        ctx.lineTo(x + 32, h + 62);
        ctx.quadraticCurveTo(x, h + 94, x - 32, h + 62);
        ctx.closePath();
        ctx.fill();
      }
      break;
    }
    case "christmas": {
      stars(ctx, 8, "#ffffff", 80);
      glow(ctx, CX, 200, 480, "#ffd36b", 0.22);
      // Tree.
      const tx = 190;
      ctx.fillStyle = "#6b3f1d";
      ctx.fillRect(tx - 14, 520, 28, 60);
      for (let i = 0; i < 4; i++) {
        ctx.fillStyle = i % 2 ? "#1f7a4a" : "#1a6a40";
        ctx.beginPath();
        ctx.moveTo(tx, 190 + i * 80);
        ctx.lineTo(tx + 90 + i * 22, 300 + i * 80);
        ctx.lineTo(tx - 90 - i * 22, 300 + i * 80);
        ctx.closePath();
        ctx.fill();
      }
      ctx.fillStyle = "#ffd36b";
      star(ctx, tx, 176, 26);
      ctx.fill();
      for (const [x, y, c] of [
        [tx - 40, 300, "#ff5a5a"],
        [tx + 50, 360, "#ffd36b"],
        [tx - 70, 430, "#ffd36b"],
        [tx + 30, 480, "#ff5a5a"],
      ] as const) {
        ctx.fillStyle = c;
        circle(ctx, x, y, 9);
        ctx.fill();
      }
      // A large star and snow.
      glow(ctx, 880, 260, 200, "#ffe29a", 0.5);
      ctx.fillStyle = "#ffe29a";
      star(ctx, 880, 260, 70, 8, 0.35);
      ctx.fill();
      const r = seeded(3);
      for (let i = 0; i < 60; i++) {
        ctx.fillStyle = `rgba(255,255,255,${0.4 + r() * 0.5})`;
        circle(ctx, r() * W, 120 + r() * 500, 1.5 + r() * 3);
        ctx.fill();
      }
      break;
    }
  }
  void ink;
}
