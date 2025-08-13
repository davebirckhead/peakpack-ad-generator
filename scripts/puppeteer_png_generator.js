#!/usr/bin/env node
/**
 * Puppeteer PNG Generator for PeakPack Ad Variants
 * Converts HTML ad variants to PNG files using headless Chrome
 */

const fs = require('fs');
const path = require('path');

// Check if puppeteer is available
let puppeteer;
try {
  puppeteer = require('puppeteer');
} catch (e) {
  console.log('📦 Puppeteer not found. Install with: npm install puppeteer');
  console.log('📝 For now, generating PNG conversion script...');
}

// Read the HTML manifest
const htmlDir = path.join(__dirname, '../output/ad_variants/html');
const manifestPath = path.join(htmlDir, 'manifest.json');

async function convertHTMLToPNG() {
  try {
    if (!fs.existsSync(manifestPath)) {
      console.error('❌ HTML manifest not found. Run html_to_png_generator.js first.');
      return;
    }

    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    console.log(`🚀 Converting ${manifest.variants.length} HTML files to PNG...`);

    if (!puppeteer) {
      // Generate a script for manual conversion
      const conversionScript = generateConversionScript(manifest);
      const scriptPath = path.join(__dirname, 'convert_to_png.sh');
      fs.writeFileSync(scriptPath, conversionScript);
      fs.chmodSync(scriptPath, '755');
      
      console.log('📝 Generated conversion script: convert_to_png.sh');
      console.log('🔧 Run this script after installing dependencies:');
      console.log('   npm install puppeteer');
      console.log('   ./convert_to_png.sh');
      return;
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const outputDir = path.join(__dirname, '../output/ad_variants/png');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    for (const [index, variant] of manifest.variants.entries()) {
      console.log(`\n${index + 1}. Converting ${variant.fileName} to PNG...`);
      
      const htmlPath = path.join(htmlDir, variant.fileName);
      const pngPath = path.join(outputDir, variant.pngFileName);
      
      // Navigate to the HTML file
      await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });
      
      // Extract dimensions from format
      const [width, height] = variant.format.split('x').map(Number);
      
      // Set viewport and take screenshot
      await page.setViewport({ width, height });
      await page.screenshot({
        path: pngPath,
        clip: { x: 0, y: 0, width, height },
        type: 'png'
      });
      
      console.log(`   ✓ Generated ${variant.pngFileName}`);
    }

    await browser.close();
    
    console.log(`\n✅ Successfully converted ${manifest.variants.length} HTML files to PNG!`);
    console.log(`📁 PNG files saved to: ${outputDir}`);

  } catch (error) {
    console.error('❌ Error converting to PNG:', error);
    process.exit(1);
  }
}

function generateConversionScript(manifest) {
  return `#!/bin/bash
# PNG Conversion Script for PeakPack Ad Variants
# Generated automatically - converts HTML files to PNG using Puppeteer

echo "🚀 Converting ${manifest.variants.length} HTML files to PNG..."

# Check if Node.js and Puppeteer are available
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js first."
    exit 1
fi

# Create output directory
mkdir -p "../output/ad_variants/png"

# Convert each HTML file
${manifest.variants.map((variant, index) => {
  const [width, height] = variant.format.split('x').map(Number);
  return `
echo "${index + 1}. Converting ${variant.fileName} to PNG..."
node -e "
const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('file://${path.join(htmlDir, variant.fileName)}', { waitUntil: 'networkidle0' });
  await page.setViewport({ width: ${width}, height: ${height} });
  await page.screenshot({
    path: '../output/ad_variants/png/${variant.pngFileName}',
    clip: { x: 0, y: 0, width: ${width}, height: ${height} },
    type: 'png'
  });
  await browser.close();
  console.log('✓ Generated ${variant.pngFileName}');
})();
"`;
}).join('')}

echo "\\n✅ Successfully converted ${manifest.variants.length} HTML files to PNG!"
echo "📁 PNG files saved to: ../output/ad_variants/png"
`;
}

// Alternative: Generate a simple Node.js script for conversion
function generateNodeConversionScript(manifest) {
  const nodeScript = `const puppeteer = require('puppeteer');
const path = require('path');

const variants = ${JSON.stringify(manifest.variants, null, 2)};

async function convertAll() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  for (const [index, variant] of variants.entries()) {
    console.log(\`\${index + 1}. Converting \${variant.fileName} to PNG...\`);
    
    const htmlPath = path.join(__dirname, '../output/ad_variants/html', variant.fileName);
    const pngPath = path.join(__dirname, '../output/ad_variants/png', variant.pngFileName);
    
    await page.goto(\`file://\${htmlPath}\`, { waitUntil: 'networkidle0' });
    
    const [width, height] = variant.format.split('x').map(Number);
    await page.setViewport({ width, height });
    await page.screenshot({
      path: pngPath,
      clip: { x: 0, y: 0, width, height },
      type: 'png'
    });
    
    console.log(\`   ✓ Generated \${variant.pngFileName}\`);
  }
  
  await browser.close();
  console.log('\\n✅ All PNG files generated!');
}

convertAll().catch(console.error);`;

  fs.writeFileSync(path.join(__dirname, 'convert_html_to_png.js'), nodeScript);
  console.log('📝 Generated Node.js conversion script: convert_html_to_png.js');
  console.log('🔧 To run: node convert_html_to_png.js');
}

// Run if called directly
if (require.main === module) {
  if (fs.existsSync(manifestPath)) {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    
    if (puppeteer) {
      convertHTMLToPNG();
    } else {
      generateNodeConversionScript(manifest);
    }
  } else {
    console.error('❌ HTML manifest not found. Run html_to_png_generator.js first.');
  }
}

module.exports = { convertHTMLToPNG };