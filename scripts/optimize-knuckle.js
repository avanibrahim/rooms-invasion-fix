// ESM version – langsung jalan di project yang punya "type":"module"
// Jalankan: node scripts/optimize-knuckle.js
// Opsional ENV:
//   INPUT_DIR=public/KNUCKLE OUTPUT_DIR=public/products_optimized/KNUCKLE TARGET_WIDTH=800 QUALITY=90 node scripts/optimize-knuckle.js

import fs from 'fs';
import fsp from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const INPUT_DIR  = process.env.INPUT_DIR  || path.join(process.cwd(), 'public', 'KNUCKLE');
const OUTPUT_DIR = process.env.OUTPUT_DIR || path.join(process.cwd(), 'public', 'products_optimized', 'KNUCKLE');
const TARGET_WIDTH = Number(process.env.TARGET_WIDTH || 800);
const QUALITY      = Number(process.env.QUALITY || 90);

const VALID = new Set(['.jpg', '.jpeg', '.png']);

async function ensureDir(p) { await fsp.mkdir(p, { recursive: true }); }

function outWebpPath(inFile, outDir) {
  const base = path.basename(inFile, path.extname(inFile));
  return path.join(outDir, `${base}.webp`);
}

async function isFresh(inputPath, outputPath) {
  try {
    const [inStat, outStat] = await Promise.all([fsp.stat(inputPath), fsp.stat(outputPath)]);
    return outStat.mtimeMs >= inStat.mtimeMs; // sudah up-to-date
  } catch {
    return false;
  }
}

async function optimizeFile(inputPath, outputPath) {
  await ensureDir(path.dirname(outputPath));
  if (await isFresh(inputPath, outputPath)) {
    console.log(`⏭️  Skip (cached): ${path.relative(process.cwd(), inputPath)}`);
    return;
  }
  await sharp(inputPath).resize({ width: TARGET_WIDTH }).webp({ quality: QUALITY }).toFile(outputPath);
  console.log(`✅ ${path.relative(process.cwd(), inputPath)} → ${path.relative(process.cwd(), outputPath)}`);
}

async function walk(dir, outBase) {
  await ensureDir(outBase);
  const entries = await fsp.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const inPath = path.join(dir, e.name);
    const outPath = path.join(outBase, e.name);
    if (e.isDirectory()) {
      await walk(inPath, outPath);
    } else {
      const ext = path.extname(e.name).toLowerCase();
      if (!VALID.has(ext)) continue;
      await optimizeFile(inPath, outWebpPath(inPath, outBase));
    }
  }
}

console.log('🔧 Input :', INPUT_DIR);
console.log('📦 Output:', OUTPUT_DIR);
console.log('↔️  Width :', TARGET_WIDTH, 'px');
console.log('🎚️  Quality:', QUALITY);
await walk(INPUT_DIR, OUTPUT_DIR);
console.log('🏁 Done.');
