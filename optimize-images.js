const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const INPUT_DIR = path.join(__dirname, 'public', 'products');
const OUTPUT_DIR = path.join(__dirname, 'public', 'products_optimized');
const TARGET_WIDTH = 800;

function optimizeDirectory(inputDir, outputDir) {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.readdirSync(inputDir).forEach(file => {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file);

    const stat = fs.statSync(inputPath);

    if (stat.isDirectory()) {
      // rekursif ke dalam folder
      optimizeDirectory(inputPath, outputPath);
    } else {
      const ext = path.extname(file).toLowerCase();
      const basename = path.basename(file, ext);

      if (!['.jpg', '.jpeg', '.png'].includes(ext)) return;

      const outputFile = path.join(outputDir, `${basename}.webp`);

      sharp(inputPath)
        .resize({ width: TARGET_WIDTH })
        .webp({ quality: 90 })
        .toFile(outputFile)
        .then(() => console.log(`✅ Optimized: ${inputPath} → ${outputFile}`))
        .catch(err => console.error(`❌ Error optimizing ${inputPath}:`, err));
    }
  });
}

// jalankan
optimizeDirectory(INPUT_DIR, OUTPUT_DIR);
