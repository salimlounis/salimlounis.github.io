// scripts/optimize.mjs
import fs from "fs";
import fsp from "fs/promises";
import path from "path";
import sharp from "sharp";

const SRC_ROOT = path.resolve("./originals");
const OUT_ROOT = path.resolve("./public/img");

const VALID_INPUT_EXT = new Set([".jpg", ".jpeg", ".png", ".tif", ".tiff", ".bmp", ".gif", ".webp", ".avif", ".heic", ".heif"]);
const COVER_DIRNAME = "cover";
const COVER_WIDTH = 700;     // covers -> 700px wide
const PAGE_WIDTH = 1400;     // page images -> 1400px wide
const QUALITY = 80;

async function ensureDir(dir) {
  await fsp.mkdir(dir, { recursive: true });
}

async function* walk(dir) {
  const entries = await fsp.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      yield* walk(full);
    } else {
      yield full;
    }
  }
}

function isImageFile(filePath) {
  return VALID_INPUT_EXT.has(path.extname(filePath).toLowerCase());
}

async function optimizeOne(srcFile) {
  const rel = path.relative(SRC_ROOT, srcFile);          // e.g. "cover/atgv.jpg" or "hkg/1.png"
  const parts = rel.split(path.sep);
  const topLevel = parts[0];

  // Decide target folder + width
  const isCover = topLevel === COVER_DIRNAME;
  const width = isCover ? COVER_WIDTH : PAGE_WIDTH;

  const outDir = isCover
    ? path.join(OUT_ROOT, COVER_DIRNAME)
    : path.join(OUT_ROOT, ...parts.slice(0, parts.length - 1));

  const base = path.parse(srcFile).name;                 // filename without ext
  const outFile = path.join(outDir, `${base}.webp`);     // we always output webp

  await ensureDir(outDir);

  // Convert -> webp at target width
  await sharp(srcFile)
    .resize({ width, withoutEnlargement: false }) // you said upscaling is fine; set to true if you want to avoid it
    .toFormat("webp", { quality: QUALITY })
    .toFile(outFile);

  console.log(`✅ ${rel} → ${path.relative(OUT_ROOT, outFile)} (${width}px)`);
}

async function main() {
  // Ensure OUT_ROOT exists
  await ensureDir(OUT_ROOT);

  // Ensure /public/img/cover exists even if no covers yet
  await ensureDir(path.join(OUT_ROOT, COVER_DIRNAME));

  if (!fs.existsSync(SRC_ROOT)) {
    console.error(`❌ Source folder not found: ${SRC_ROOT}`);
    process.exit(1);
  }

  const tasks = [];
  for await (const file of walk(SRC_ROOT)) {
    if (!isImageFile(file)) continue;
    tasks.push(optimizeOne(file).catch(err => {
      console.error(`❌ Failed: ${path.relative(SRC_ROOT, file)} — ${err.message}`);
    }));
  }

  if (tasks.length === 0) {
    console.log("ℹ️ No source images found in /originals.");
    return;
  }

  // Run with a tiny concurrency guard (to avoid blowing RAM on huge batches)
  const CONCURRENCY = 4;
  let i = 0;
  async function runBatch() {
    while (i < tasks.length) {
      const chunk = tasks.slice(i, i + CONCURRENCY);
      i += CONCURRENCY;
      await Promise.all(chunk);
    }
  }

  await runBatch();
  console.log("✨ Done.");
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});