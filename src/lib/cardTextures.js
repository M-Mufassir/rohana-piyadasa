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
  // Architectural matte charcoal metal base
  let g = ctx.createLinearGradient(0, 0, W, H);
  g.addColorStop(0, "#1c1d25");
  g.addColorStop(0.5, "#0d0e13");
  g.addColorStop(1, "#171820");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  ctx.globalAlpha = 0.045;
  for (let i = 0; i < H; i += 2) {
    ctx.fillStyle = i % 4 ? "#fff" : "#000";
    ctx.fillRect(0, i, W, 1);
  }
  ctx.globalAlpha = 1;

  // Portix-inspired warm glowing portrait sphere on the right
  const cx = W - 222, cy = H * 0.5, r = 172;
  g = ctx.createRadialGradient(cx, cy, 12, cx, cy, W * 0.48);
  g.addColorStop(0, "rgba(255,106,19,.52)");
  g.addColorStop(1, "rgba(255,106,19,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = "rgba(255,255,255,.06)";
  ctx.lineWidth = 2;
  for (let i = 1; i < 5; i++) {
    ctx.beginPath();
    ctx.arc(cx, cy, r + 22 + i * 44, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Outer precision ring + vibrant orange bezel
  ctx.strokeStyle = "rgba(255,154,61,.5)";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(cx, cy, r + 24, 0, Math.PI * 2);
  ctx.stroke();

  g = ctx.createLinearGradient(cx - r, cy - r, cx + r, cy + r);
  g.addColorStop(0, "#ff9e52");
  g.addColorStop(1, "#e84c0b");
  ctx.strokeStyle = g;
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.arc(cx, cy, r + 8, 0, Math.PI * 2);
  ctx.stroke();

  // Authentic portrait inside the circle (head & collar cleanly framed)
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.clip();
  g = ctx.createRadialGradient(cx - r * 0.35, cy - r * 0.4, r * 0.1, cx, cy, r * 1.15);
  g.addColorStop(0, "#ff7728");
  g.addColorStop(0.65, "#b83c14");
  g.addColorStop(1, "#2a1610");
  ctx.fillStyle = g;
  ctx.fillRect(cx - r, cy - r, r * 2, r * 2);

  if (img) {
    // Frame head, white dress collar, and dark blazer lapels cleanly inside the circle
    const cropW = img.width * 0.74;
    const sx = (img.width - cropW) / 2;
    const sy = 0;
    ctx.drawImage(img, sx, sy, cropW, cropW, cx - r, cy - r + 10, r * 2, r * 2);
  } else {
    ctx.fillStyle = "#fff";
    ctx.font = "800 110px Sora, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("RP", cx, cy + 38);
    ctx.textAlign = "left";
  }
  ctx.restore();

  // Brand logo top-left
  if (logo) {
    const lw = 246, lh = (lw * logo.height) / logo.width;
    ctx.drawImage(logo, 52, 46, lw, lh);
  } else {
    ctx.fillStyle = "#fff";
    ctx.font = "800 34px Sora, sans-serif";
    spaced(ctx, "HUTCH", 52, 84, 6);
    ctx.fillStyle = "#ff9a3d";
    ctx.font = "600 15px Sora, sans-serif";
    spaced(ctx, "ENTERPRISE", 54, 108, 9);
  }

  // Executive identity
  ctx.fillStyle = "#ff7a26";
  ctx.fillRect(52, H - 238, 12, 12);
  ctx.fillStyle = "rgba(255,255,255,.68)";
  ctx.font = "600 14px Inter, sans-serif";
  spaced(ctx, "NFC EXECUTIVE CARD", 74, H - 227, 3);

  ctx.fillStyle = "#fff";
  ctx.font = "800 52px Sora, sans-serif";
  ctx.fillText("P.A. Rohana", 52, H - 172);
  ctx.fillText("Piyadasa", 52, H - 116);
  ctx.fillStyle = "#ff9a3d";
  ctx.font = "600 24px Sora, sans-serif";
  ctx.fillText("Senior Manager", 52, H - 74);
  ctx.fillStyle = "rgba(255,255,255,.85)";
  ctx.font = "500 20px Inter, sans-serif";
  ctx.fillText("Enterprise Business", 52, H - 46);
  ctx.fillStyle = "rgba(255,255,255,.46)";
  ctx.font = "500 13.5px Inter, sans-serif";
  spaced(ctx, "A MEMBER OF CK HUTCHISON HOLDINGS", 52, H - 18, 1.4);

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

  ctx.fillStyle = "rgba(255,255,255,.94)";
  ctx.font = "600 21px Inter, sans-serif";
  ctx.fillText(P.email, 60, H - 150);
  ctx.fillText(P.mobileFmt, 60, H - 114);
  ctx.fillStyle = "rgba(255,255,255,.78)";
  ctx.font = "500 15px Inter, sans-serif";
  spaced(ctx, "TAP  ·  SCAN  ·  CONNECT", 60, H - 62, 4);
  spaced(ctx, "A MEMBER OF CK HUTCHISON HOLDINGS", 60, H - 34, 1.5);

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
