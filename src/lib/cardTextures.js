import QRCode from "qrcode";
import { P } from "../data";

export async function loadFonts() {
  if (!document.fonts) return;
  try {
    await Promise.all(
      ["800 48px Sora", "600 24px Sora", "600 15px Inter", "500 20px Inter"].map((f) =>
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

export function drawFront(ctx, W, H, img, logo) {
  // Brushed dark obsidian metal finish
  let g = ctx.createLinearGradient(0, 0, W, H);
  g.addColorStop(0, "#1a1b22");
  g.addColorStop(0.5, "#0d0e13");
  g.addColorStop(1, "#15161d");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  ctx.globalAlpha = 0.04;
  for (let i = 0; i < H; i += 2) {
    ctx.fillStyle = i % 4 ? "#fff" : "#000";
    ctx.fillRect(0, i, W, 1);
  }
  ctx.globalAlpha = 1;

  // Portrait circle positioned cleanly on right (x: 616..964), leaving 56..590 completely clear for text
  const cx = W - 224, cy = H * 0.5, r = 160;
  g = ctx.createRadialGradient(cx, cy, 12, cx, cy, W * 0.44);
  g.addColorStop(0, "rgba(255,106,19,.45)");
  g.addColorStop(1, "rgba(255,106,19,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = "rgba(255,154,61,.45)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy, r + 20, 0, Math.PI * 2);
  ctx.stroke();

  g = ctx.createLinearGradient(cx - r, cy - r, cx + r, cy + r);
  g.addColorStop(0, "#ff9e52");
  g.addColorStop(1, "#e84c0b");
  ctx.strokeStyle = g;
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(cx, cy, r + 6, 0, Math.PI * 2);
  ctx.stroke();

  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.clip();
  g = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.35, r * 0.1, cx, cy, r * 1.15);
  g.addColorStop(0, "#ff7728");
  g.addColorStop(0.65, "#b83c14");
  g.addColorStop(1, "#24130d");
  ctx.fillStyle = g;
  ctx.fillRect(cx - r, cy - r, r * 2, r * 2);

  if (img) {
    const cropW = img.width * 0.84;
    const sx = (img.width - cropW) / 2;
    ctx.drawImage(img, sx, 0, cropW, cropW, cx - r, cy - r + 12, r * 2, r * 2);
  }
  ctx.restore();

  // Top-left HUTCH logo + clear Enterprise label
  if (logo) {
    const lw = 215, lh = (lw * logo.height) / logo.width;
    ctx.drawImage(logo, 56, 52, lw, lh);
    ctx.fillStyle = "#ff9a3d";
    ctx.font = "600 15px Inter, sans-serif";
    ctx.fillText("HUTCH ENTERPRISE", 58, 52 + lh + 24);
  } else {
    ctx.fillStyle = "#ff6a13";
    ctx.font = "800 36px Sora, sans-serif";
    ctx.fillText("HUTCH", 56, 90);
    ctx.fillStyle = "#ff9a3d";
    ctx.font = "600 15px Inter, sans-serif";
    ctx.fillText("HUTCH ENTERPRISE", 58, 116);
  }

  // Unclipped, high-contrast executive name, role & group
  ctx.fillStyle = "#ffffff";
  ctx.font = "800 46px Sora, sans-serif";
  ctx.fillText("P.A. Rohana", 56, H - 205);
  ctx.fillText("Piyadasa", 56, H - 151);

  ctx.fillStyle = "#ff9a3d";
  ctx.font = "600 23px Sora, sans-serif";
  ctx.fillText("Senior Manager", 56, H - 104);

  ctx.fillStyle = "rgba(255,255,255,.9)";
  ctx.font = "500 20px Inter, sans-serif";
  ctx.fillText("Enterprise Business", 56, H - 74);

  ctx.fillStyle = "rgba(255,255,255,.55)";
  ctx.font = "500 14.5px Inter, sans-serif";
  ctx.fillText("A Member of CK Hutchison Holdings", 56, H - 40);

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

  ctx.globalAlpha = 0.12;
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 2;
  for (let i = 1; i < 8; i++) {
    ctx.beginPath();
    ctx.arc(-40, H + 40, i * 110, -Math.PI / 2, 0);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  const lw = 280, lh = logo ? (lw * logo.height) / logo.width : 84;
  ctx.fillStyle = "#0b0b0f";
  rr(ctx, 56, 56, lw + 56, lh + 48, 20);
  ctx.fill();
  if (logo) ctx.drawImage(logo, 84, 80, lw, lh);

  ctx.fillStyle = "#ffffff";
  ctx.font = "700 24px Sora, sans-serif";
  ctx.fillText(P.name, 56, H - 188);

  ctx.fillStyle = "rgba(255,255,255,.95)";
  ctx.font = "600 20px Inter, sans-serif";
  ctx.fillText(P.mobileFmt, 56, H - 146);
  ctx.fillText(P.email, 56, H - 114);

  ctx.fillStyle = "rgba(255,255,255,.82)";
  ctx.font = "500 15px Inter, sans-serif";
  ctx.fillText("HUTCH Enterprise · Colombo, Sri Lanka", 56, H - 72);
  ctx.fillStyle = "rgba(255,255,255,.72)";
  ctx.font = "500 13.5px Inter, sans-serif";
  ctx.fillText("A Member of CK Hutchison Holdings", 56, H - 44);

  // Scannable QR on right (x: 688..968) — well clear of left text
  try {
    const qr = QRCode.create(url, { errorCorrectionLevel: "M" });
    const n = qr.modules.size;
    const box = 280;
    const bx = W - box - 56;
    const by = (H - box) / 2;
    ctx.fillStyle = "#fff";
    rr(ctx, bx, by, box, box, 24);
    ctx.fill();
    const pad = 24;
    const cell = (box - pad * 2) / n;
    ctx.fillStyle = "#0a0a0f";
    for (let r = 0; r < n; r++)
      for (let c = 0; c < n; c++)
        if (qr.modules.get(c, r)) ctx.fillRect(bx + pad + c * cell, by + pad + r * cell, cell + 0.6, cell + 0.6);
  } catch {
    /* QR optional */
  }

  ctx.strokeStyle = "rgba(255,255,255,.38)";
  ctx.lineWidth = 3;
  rr(ctx, 4, 4, W - 8, H - 8, 36);
  ctx.stroke();
}
