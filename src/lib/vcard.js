import { P, pageUrl } from "../data";

async function photoBase64() {
  try {
    const img = new Image();
    img.src = P.photo;
    await img.decode();
    const s = 320;
    const c = document.createElement("canvas");
    c.width = c.height = s;
    const x = c.getContext("2d");
    const g = x.createLinearGradient(0, 0, s, s);
    g.addColorStop(0, "#ff7a26");
    g.addColorStop(1, "#c93d00");
    x.fillStyle = g;
    x.fillRect(0, 0, s, s);
    // square crop from the top (head & shoulders)
    x.drawImage(img, 0, 0, img.width, img.width, 0, 0, s, s);
    return c.toDataURL("image/jpeg", 0.86).split(",")[1];
  } catch {
    return null;
  }
}

const fold = (line) => {
  const out = [];
  let rest = line;
  out.push(rest.slice(0, 74));
  rest = rest.slice(74);
  while (rest.length) {
    out.push(" " + rest.slice(0, 73));
    rest = rest.slice(73);
  }
  return out.join("\r\n");
};

export async function buildVCard() {
  const photo = await photoBase64();
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "N:Piyadasa;P.A. Rohana;;;",
    `FN:${P.name}`,
    `ORG:${P.company};${P.unit}`,
    `TITLE:${P.title} ${P.unit}`,
    `TEL;TYPE=CELL,VOICE,PREF:${P.mobile}`,
    `TEL;TYPE=WORK,VOICE:${P.general}`,
    `EMAIL;TYPE=INTERNET,WORK:${P.email}`,
    "ADR;TYPE=WORK:;;;Colombo;Western Province;;Sri Lanka",
    `URL:${pageUrl()}`,
    P.linkedin && `URL;TYPE=LinkedIn:${P.linkedin}`,
    P.website && `URL;TYPE=Work:${P.website}`,
    `NOTE:${P.company} - a member of ${P.group}`,
    photo && fold(`PHOTO;ENCODING=b;TYPE=JPEG:${photo}`),
    "END:VCARD",
  ].filter(Boolean);
  return lines.join("\r\n");
}

export async function saveVCard() {
  const text = await buildVCard();
  const blob = new Blob([text], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Rohana-Piyadasa.vcf";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}
