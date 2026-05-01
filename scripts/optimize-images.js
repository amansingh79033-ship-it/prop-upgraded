import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES_DIR = path.join(__dirname, '..', 'images');
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images');

// Image optimization settings
const WEBP_QUALITY = 80; // Good balance between quality and size
const AVIF_QUALITY = 75; // AVIF provides better compression
const MAX_WIDTH = 1920; // Max width for responsive images
const SIZES = [320, 640, 768, 1024, 1440, 1920]; // Responsive breakpoints

async function optimizeImage(inputFile, outputDir) {
  const filename = path.basename(inputFile, path.extname(inputFile));
  
  try {
    // Get original image metadata
    const metadata = await sharp(inputFile).metadata();
    console.log(`Processing: ${filename} (${metadata.width}x${metadata.height})`);

    // Create responsive images in WebP format
    for (const width of SIZES) {
      if (width <= metadata.width) {
        const outputPath = path.join(outputDir, `${filename}-${width}w.webp`);
        
        await sharp(inputFile)
          .resize(width, null, {
            withoutEnlargement: true,
            fit: 'inside'
          })
          .webp({ 
            quality: WEBP_QUALITY,
            effort: 6 // Higher effort = better compression (0-6)
          })
          .toFile(outputPath);
        
        console.log(`  ✓ Created ${width}w version`);
      }
    }

    // Also create AVIF versions (even better compression)
    const avifOutput = path.join(outputDir, `${filename}.avif`);
    await sharp(inputFile)
      .resize(MAX_WIDTH, null, { withoutEnlargement: true })
      .avif({ 
        quality: AVIF_QUALITY,
        effort: 9 // Highest effort (0-9)
      })
      .toFile(avifOutput);
    
    console.log(`  ✓ Created AVIF version`);

    // Keep original as fallback
    const fallbackOutput = path.join(outputDir, `${filename}.jpg`);
    await sharp(inputFile)
      .resize(MAX_WIDTH, null, { withoutEnlargement: true })
      .jpeg({ quality: 85, progressive: true })
      .toFile(fallbackOutput);
    
    console.log(`  ✓ Created JPEG fallback`);
    console.log('');

  } catch (error) {
    console.error(`Error processing ${filename}:`, error.message);
  }
}

async function optimizeAllImages() {
  // Create output directory if it doesn't exist
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Get all image files
  const imageFiles = fs.readdirSync(IMAGES_DIR)
    .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file));

  console.log(`Found ${imageFiles.length} images to optimize\n`);

  // Process each image
  for (const file of imageFiles) {
    const inputFile = path.join(IMAGES_DIR, file);
    await optimizeImage(inputFile, OUTPUT_DIR);
  }

  console.log('✨ Image optimization complete!');
  console.log(`\nOptimized images saved to: ${OUTPUT_DIR}`);
  console.log('\nTo use responsive images in your components:');
  console.log('<img src="/images/hero-interior.avif"');
  console.log('     srcSet="/images/hero-interior-320w.webp 320w,');
  console.log('               /images/hero-interior-640w.webp 640w,');
  console.log('               /images/hero-interior-1920w.webp 1920w"');
  console.log('     sizes="(max-width: 768px) 100vw, 50vw"');
  console.log('     alt="Description" />');
}

// Run the optimization
optimizeAllImages();
