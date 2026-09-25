/**
 * Generates all public/ images from resources/ originals:
 *   - favicon + apple-touch-icon + PWA icons (192/512)
 *   - avatar WebP set (hero + navbar)
 *   - artwork WebP set (phases + project covers + blog covers)
 *   - og-image.jpg (1200×630 social share card)
 *
 * Run with: node scripts/generate-favicon.mjs
 */
import sharp from "sharp";
import { mkdir, rm } from "node:fs/promises";
import path from "node:path";

const AVATARS = "resources/images/avatars";
const ARTWORKS = "resources/images/artworks";
const OUT = "public/images";

await mkdir(OUT, { recursive: true });
await mkdir(path.join(OUT, "icons"), { recursive: true });
// Remove earlier PNG copies so only optimized files ship.
await rm(path.join(OUT, "avatar-headphone-off.png"), { force: true });
await rm(path.join(OUT, "avatar-headphone-on.png"), { force: true });
await rm(path.join(OUT, "avatar-waiting.png"), { force: true });
await rm(path.join(OUT, "avatar-working.png"), { force: true });
await rm(path.join(OUT, "hack-room-artwork.png"), { force: true });
await rm(path.join(OUT, "3-phase-of-building-artwork.png"), { force: true });
await rm(path.join(OUT, "3-phases-of-building-artwork.png"), { force: true });
await rm(path.join(OUT, "volunteer-cloud-artwork.png"), { force: true });
await rm(path.join(OUT, "Student-toolkit.png"), { force: true });
await rm(path.join(OUT, "GitGame.png"), { force: true });

// --- Favicon + PWA icons: square-crop the working avatar ---------------------
const iconSizes = [64, 180, 192, 512];
for (const size of iconSizes) {
  await sharp(path.join(AVATARS, "avatar-working.png"))
    .resize(size, size, { fit: "cover", position: "attention" })
    .png({ quality: 90, palette: true })
    .toFile(
      size === 64
        ? path.join(OUT, "favicon.png")
        : path.join(OUT, "icons", `icon-${size}.png`)
    );
}

// --- Hero avatars: 720px WebP (displayed at <=360px, retina-safe) -----------
const avatars = [
  "avatar-headphone-off",
  "avatar-headphone-on",
  "avatar-waiting",
  "avatar-working",
];

for (const name of avatars) {
  await sharp(path.join(AVATARS, `${name}.png`))
    .resize({ width: 720, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(path.join(OUT, `${name}.webp`));
}

// --- Editorial artworks: 1600px WebP -----------------------------------------
const artworks = ["hack-room-artwork", "3-phases-of-building-artwork"];

for (const name of artworks) {
  await sharp(path.join(ARTWORKS, `${name}.png`))
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(path.join(OUT, `${name}.webp`));
}

// --- Project covers: 1280px WebP (16:9-ish cards) -----------------------------
const projectCovers = ["volunteer-cloud-artwork", "Student-toolkit", "GitGame"];

for (const name of projectCovers) {
  await sharp(path.join(ARTWORKS, `${name}.png`))
    .resize({ width: 1280, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(path.join(OUT, `${name}.webp`));
}

// --- Social share card: 1200×630, dark, avatar left + name right --------------
const W = 1200;
const H = 630;
const avatarPng = await sharp(path.join(AVATARS, "avatar-headphone-on.png"))
  .resize(420, 420, { fit: "cover", position: "attention" })
  .png()
  .toBuffer();

const svgText = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#161514"/>
      <stop offset="1" stop-color="#0e0d0c"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <circle cx="330" cy="315" r="215" fill="none" stroke="#ff5c1a" stroke-width="3" opacity="0.55"/>
  <text x="620" y="300" font-family="Georgia, serif" font-size="64" fill="#ece8e2">Nirmit Aggarwal</text>
  <text x="620" y="372" font-family="Georgia, serif" font-size="30" fill="#ff5c1a">Software Engineer in Progress</text>
  <text x="620" y="428" font-family="monospace" font-size="24" fill="#9b958d">theboringedit.in</text>
</svg>`);

await sharp(svgText)
  .composite([
    {
      input: avatarPng,
      left: 120,
      top: 105,
      blend: "over",
    },
  ])
  .jpeg({ quality: 88 })
  .toFile(path.join(OUT, "og-image.jpg"));

console.log(
  "Done: favicon + PWA icons + WebP avatars/artworks + og-image.jpg written to public/images"
);
