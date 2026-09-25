/**
 * Generates a small favicon from the "working" avatar illustration and
 * optimizes images (avatars + large artwork) to WebP for web delivery.
 *
 * Run with: node scripts/generate-favicon.mjs
 */
import sharp from "sharp";
import { mkdir, rm } from "node:fs/promises";
import path from "node:path";

const SRC = "resources/images/avatars";
const OUT = "public/images";

await mkdir(OUT, { recursive: true });
// Remove earlier PNG copies so only optimized files ship.
await rm(path.join(OUT, "avatar-headphone-off.png"), { force: true });
await rm(path.join(OUT, "avatar-headphone-on.png"), { force: true });
await rm(path.join(OUT, "avatar-waiting.png"), { force: true });
await rm(path.join(OUT, "avatar-working.png"), { force: true });
await rm(path.join(OUT, "hack-room-artwork.png"), { force: true });
await rm(path.join(OUT, "3-phase-of-building-artwork.png"), { force: true });

// --- Favicon: square-crop the working avatar at 64px ------------------------
await sharp(path.join(SRC, "avatar-working.png"))
  .resize(64, 64, { fit: "cover", position: "attention" })
  .png({ quality: 90, palette: true })
  .toFile(path.join(OUT, "favicon.png"));

// --- Hero avatars: 720px WebP (displayed at <=360px, retina-safe) -----------
const avatars = [
  "avatar-headphone-off",
  "avatar-headphone-on",
  "avatar-waiting",
  "avatar-working",
];

for (const name of avatars) {
  await sharp(path.join(SRC, `${name}.png`))
    .resize({ width: 720, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(path.join(OUT, `${name}.webp`));
}

// --- Large editorial artworks: 1600px WebP -----------------------------------
const artworks = ["hack-room-artwork", "3-phase-of-building-artwork"];

for (const name of artworks) {
  await sharp(path.join(SRC, `${name}.png`))
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(path.join(OUT, `${name}.webp`));
}

console.log("Done: favicon + WebP images written to public/images");
