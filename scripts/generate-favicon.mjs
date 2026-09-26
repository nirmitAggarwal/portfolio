/**
 * Generates all public/ images from resources/ originals:
 *   - favicon.ico (multi-size, from the headphone-on avatar) + apple-touch-icon + PWA icons (192/512)
 *   - avatar WebP set (hero + navbar)
 *   - artwork WebP set (phases + project covers + blog covers)
 *   - og-image.jpg (1200×630 social share card)
 *
 * Run with: node scripts/generate-favicon.mjs
 */
import sharp from "sharp";
import { mkdir, rm, writeFile } from "node:fs/promises";
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
await rm(path.join(OUT, "favicon.png"), { force: true });

// --- Favicon.ico: multi-size icon from the headphone-on avatar ---------------
// Pixel art: nearest-neighbor keeps edges crisp when downscaling hard.
const icoSizes = [16, 32, 48, 64, 256];
const icoFrames = await Promise.all(
  icoSizes.map((size) =>
    sharp(path.join(AVATARS, "avatar-headphone-on.png"))
      .resize(size, size, {
        fit: "cover",
        position: "attention",
        kernel: "nearest",
      })
      .png()
      .toBuffer()
  )
);

// Wrap the PNG frames in a minimal ICO container (PNG-compressed entries).
const icoHeader = Buffer.alloc(6);
icoHeader.writeUInt16LE(0, 0); // reserved
icoHeader.writeUInt16LE(1, 2); // type: icon
icoHeader.writeUInt16LE(icoSizes.length, 4); // image count

let icoOffset = 6 + 16 * icoSizes.length;
const icoEntries = icoFrames.map((frame, i) => {
  const size = icoSizes[i];
  const entry = Buffer.alloc(16);
  entry.writeUInt8(size === 256 ? 0 : size, 0); // width (0 = 256)
  entry.writeUInt8(size === 256 ? 0 : size, 1); // height (0 = 256)
  entry.writeUInt16LE(1, 4); // color planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(frame.length, 8); // data size
  entry.writeUInt32LE(icoOffset, 12); // data offset
  icoOffset += frame.length;
  return entry;
});

await writeFile(
  path.join("public", "favicon.ico"),
  Buffer.concat([icoHeader, ...icoEntries, ...icoFrames])
);

// --- Apple-touch + PWA icons: square-crop the headphone-on avatar ------------
const iconSizes = [180, 192, 512];
for (const size of iconSizes) {
  await sharp(path.join(AVATARS, "avatar-headphone-on.png"))
    .resize(size, size, { fit: "cover", position: "attention" })
    .png({ quality: 90, palette: true })
    .toFile(path.join(OUT, "icons", `icon-${size}.png`));
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
