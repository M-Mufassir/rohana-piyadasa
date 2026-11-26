import QRCode from "qrcode";
import { P } from "../data";

export async function loadFonts() {
  if (!document.fonts) return;
  try {
    await Promise.all(
      ["800 52px Sora", "700 20px Sora", "600 24px Sora", "500 17px Inter"].map((f) =>
        document.fonts.load(f)
      )
    );
  } catch {
    /* fall back to system fonts */
  }
}

function rr(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// letter-spaced text that works in every browser (ctx.letterSpacing is not universal)
function spaced(ctx, text, x, y, sp, align = "left") {
  const chars = [...text];
  const ws = chars.map((c) => ctx.measureText(c).width);
  const total = ws.reduce((a, b) => a + b, 0) + sp * (chars.length - 1);
  let cx = align === "center" ? x - total / 2 : align === "right" ? x - total : x;
  const prev = ctx.textAlign;
  ctx.textAlign = "left";
  chars.forEach((c, i) => {
    ctx.fillText(c, cx, y);
    cx += ws[i] + sp;
  });
  ctx.textAlign = prev;
}

export function drawFront(ctx, W, H, img, logo) {
  // brushed black metal
  let g = ctx.createLinearGradient(0, 0, W, H);
  g.addColorStop(0, "#1a1b23");
  g.addColorStop(0.5, "#0a0a0f");
  g.addColorStop(1, "#16171e");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
  ctx.globalAlpha = 0.05;
  for (let i = 0; i < H; i += 2) {
    ctx.fillStyle = i % 4 ? "#fff" : "#000";
    ctx.fillRect(0, i, W, 1);
  }
  ctx.globalAlpha = 1;

  // orange glow behind the portrait
  g = ctx.createRadialGradient(W * 0.78, H * 0.45, 10, W * 0.78, H * 0.45, W * 0.55);
  g.addColorStop(0, "rgba(255,106,19,.95)");
  g.addColorStop(0.4, "rgba(255,106,19,.35)");
  g.addColorStop(1, "rgba(255,106,19,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  // arc lines
  ctx.strokeStyle = "rgba(255,255,255,.08)";
  ctx.lineWidth = 2;
  for (let i = 1; i < 7; i++) {
    ctx.beginPath();
    ctx.arc(W * 0.8, H * 0.5, i * 80, 0, Math.PI * 2);
    ctx.stroke();
  }

  // portrait (transparent cut-out)
  if (img) {
    const ph = H * 0.94;
    const pw = (ph * img.width) / img.height;
    ctx.save();
    ctx.shadowColor = "rgba(0,0,0,.55)";
    ctx.shadowBlur = 28;
    ctx.drawImage(img, W - pw - 6, H - ph + 2, pw, ph);
    ctx.restore();
  }

  // left shade so text stays readable
  g = ctx.createLinearGradient(0, 0, W * 0.62, 0);
  g.addColorStop(0, "rgba(8,8,12,.85)");
  g.addColorStop(1, "rgba(8,8,12,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W * 0.62, H);

  // logo
  if (logo) {
    const lw = 250, lh = (lw * logo.height) / logo.width;
    ctx.drawImage(logo, 52, 44, lw, lh);
  } else {
    ctx.fillStyle = "#fff";
    ctx.font = "800 34px Sora, sans-serif";
    spaced(ctx, "HUTCH", 52, 84, 6);
    ctx.fillStyle = "#ff9a3d";
    ctx.font = "600 15px Sora, sans-serif";
    spaced(ctx, "ENTERPRISE", 54, 108, 9);
  }

  // identity
  ctx.fillStyle = "#fff";
  ctx.font = "800 54px Sora, sans-serif";
  ctx.fillText("P.A. Rohana", 52, H - 190);
  ctx.fillText("Piyadasa", 52, H - 132);
  ctx.fillStyle = "#ff9a3d";
  ctx.font = "600 25px Sora, sans-serif";
  ctx.fillText("Senior Manager", 52, H - 84);
  ctx.fillStyle = "rgba(255,255,255,.85)";
  ctx.font = "500 21px Inter, sans-serif";
  ctx.fillText("Enterprise Business", 52, H - 54);
  ctx.fillStyle = "rgba(255,255,255,.5)";
  ctx.font = "500 15px Inter, sans-serif";
  spaced(ctx, "A MEMBER OF CK HUTCHISON HOLDINGS", 52, H - 22, 1.5);

  // border
  ctx.strokeStyle = "rgba(255,255,255,.14)";
  ctx.lineWidth = 3;
  rr(ctx, 4, 4, W - 8, H - 8, 36);
  ctx.stroke();
}

export function drawBack(ctx, W, H, url, logo) {
  let g = ctx.createLinearGradient(0, 0, W, H);
  g.addColorStop(0, "#ff7a26");
  g.addColorStop(1, "#d94100");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  ctx.globalAlpha = 0.13;
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 2;
  for (let i = 1; i < 9; i++) {
    ctx.beginPath();
    ctx.arc(-40, H + 40, i * 110, -Math.PI / 2, 0);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  // wordmark – logo is orange, so sit it on a dark plate for contrast
  const lw = 330, lh = logo ? (lw * logo.height) / logo.width : 100;
  ctx.fillStyle = "#0a0a0f";
  rr(ctx, 48, 56, lw + 64, lh + 56, 22);
  ctx.fill();
  if (logo) ctx.drawImage(logo, 80, 84, lw, lh);
  else {
    ctx.fillStyle = "#ff6a13";
    ctx.font = "800 70px Sora, sans-serif";
    spaced(ctx, "HUTCH", 80, 150, 8);
  }

  ctx.fillStyle = "rgba(255,255,255,.92)";
  ctx.font = "600 21px Inter, sans-serif";
  ctx.fillText(P.email, 60, H - 150);
  ctx.fillText(P.mobileFmt, 60, H - 114);
  ctx.fillStyle = "rgba(255,255,255,.75)";
  ctx.font = "500 15px Inter, sans-serif";
  spaced(ctx, "TAP  ·  SCAN  ·  CONNECT", 60, H - 62, 4);
  spaced(ctx, "A MEMBER OF CK HUTCHISON HOLDINGS", 60, H - 34, 1.5);

  // QR
  try {
    const qr = QRCode.create(url, { errorCorrectionLevel: "M" });
    const n = qr.modules.size;
    const box = 290;
    const bx = W - box - 56;
    const by = (H - box) / 2;
    ctx.fillStyle = "#fff";
    rr(ctx, bx, by, box, box, 26);
    ctx.fill();
    const pad = 26;
    const cell = (box - pad * 2) / n;
    ctx.fillStyle = "#0a0a0f";
    for (let r = 0; r < n; r++)
      for (let c = 0; c < n; c++)
        if (qr.modules.get(c, r)) ctx.fillRect(bx + pad + c * cell, by + pad + r * cell, cell + 0.6, cell + 0.6);
  } catch {
    /* QR optional */
  }

  ctx.strokeStyle = "rgba(255,255,255,.4)";
  ctx.lineWidth = 3;
  rr(ctx, 4, 4, W - 8, H - 8, 36);
  ctx.stroke();
}
