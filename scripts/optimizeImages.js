// scripts/optimize-images.js
const sharp = require("sharp");
const fs = require("fs");
const fsp = fs.promises;
const path = require("path");

const IMG_ROOT = path.join(process.cwd(), "public", "img");
const COVER_DIR = path.join(IMG_ROOT, "cover");

// Image types we will process
const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

// Helpers
const isHiddenOrJunk = (name) => name.startsWith(".") || name.startsWith("._");
const isImage = (file) => IMAGE_EXTS.has(path.extname(file).toLowerCase());

async function ensureDir(dir) {
  await fsp.mkdir(dir, { recursive: true }).catch(() => {});
}

async function processImage(inputPath, outputPath, width) {
  try {
    await sharp(inputPath)
      .resize({ width, withoutEnlargement: true })
      .toFormat("webp", { quality: 80 })
      .toFile(outputPath);
    console.log(`✅ ${path.relative(process.cwd(), outputPath)}`);
  } catch (err) {
    console.error(`❌ Failed: ${inputPath}\n   ${err.message}`);
  }
}

async function processFolder(folderPath, targetWidth) {
  const entries = await fsp.readdir(folderPath, { withFileTypes: true });

  for (const entry of entries) {
    const name = entry.name;
    if (isHiddenOrJunk(name)) continue;

    const fullPath = path.join(folderPath, name);

    if (entry.isDirectory()) {
      // 1-level deep only (your structure uses one level for projects)
      continue;
    }

    if (!isImage(name)) continue;

    const base = path.basename(name, path.extname(name));
    const outPath = path.join(folderPath, `${base}.webp`);
    await processImage(fullPath, outPath, targetWidth);
  }
}

async function main() {
  await ensureDir(IMG_ROOT);

  // 1) Process cover directory at 700px
  const hasCover = fs.existsSync(COVER_DIR) && fs.lstatSync(COVER_DIR).isDirectory();
  if (hasCover) {
    console.log(`\n— Processing covers @ 700px: ${path.relative(process.cwd(), COVER_DIR)} —`);
    await processFolder(COVER_DIR, 700);
  } else {
    console.log("ℹ️  No cover directory found, skipping covers.");
  }

  // 2) Process every subfolder (except 'cover') @ 1400px
  const rootEntries = await fsp.readdir(IMG_ROOT, { withFileTypes: true });
  const projectDirs = rootEntries
    .filter((d) => d.isDirectory() && d.name !== "cover" && !isHiddenOrJunk(d.name))
    .map((d) => path.join(IMG_ROOT, d.name));

  for (const dir of projectDirs) {
    console.log(`\n— Processing project @ 1400px: ${path.relative(process.cwd(), dir)} —`);
    await processFolder(dir, 1400);
  }

  console.log("\n✨ Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});