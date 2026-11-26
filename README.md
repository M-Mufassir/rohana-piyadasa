# HUTCH Enterprise – NFC Digital Card (P.A. Rohana Piyadasa)

Mobile-first React + Three.js digital business card. Write the hosted URL to an NFC metal card and it opens this page.

## Features
- 3D metal HUTCH Enterprise card (Three.js): his photo + name on the front, live QR code on the back
- Drag to rotate, tap to flip, device-tilt parallax (iOS shows an "Enable tilt" button)
- NFC "card detected" splash, scroll progress bar, animated counters (Framer Motion + GSAP)
- One-tap Call / WhatsApp / Email / SMS
- **Save Contact** – downloads a .vcf (both numbers, email, title, company, photo)
- QR modal + native Share sheet, "Request a call back" (WhatsApp / email)
- Respects reduced-motion; pauses 3D when off-screen

## Run
    npm install
    npm run dev        # http://localhost:5173 (also on your LAN – test on a phone)
    npm run build      # outputs dist/

## Edit content
Everything lives in `src/data.js` (name, numbers, email, about, experience, LinkedIn/website URLs).
Portrait: replace `public/photo.png` (transparent PNG cut-out, ~900px wide).
Colours: CSS variables at the top of `src/styles.css`.
Logo: `public/hutch-logo.png` (card, header, splash) and `public/hutch-powered-by.png` (footer). Replace with a higher-resolution/SVG version for sharper results on the metal card.

## Deploy on Vercel (via Git)
1. Unzip this project into the ROOT of your Git repo (so `package.json` sits at the top), commit and push.
2. vercel.com → Add New → Project → import the repo. Vercel auto-detects Vite
   (Build: `npm run build`, Output: `dist`; already set in `vercel.json`). Click Deploy.
3. Open the `https://<project>.vercel.app` link on a phone and test.
4. Optional: Project → Settings → Domains to add a short custom domain for the NFC card.
Every push to the main branch redeploys automatically. The QR code, share link and vCard URL use whatever address the page is served from.

## Write to the NFC card
Use an app such as NFC Tools → Write → Add a record → URL/URI → paste the live URL → Write → tap the card.
Tip: use a short custom domain (e.g. card.yourdomain.lk/rohana).
