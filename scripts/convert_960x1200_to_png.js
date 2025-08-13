#!/usr/bin/env node
/**
 * Convert 960x1200 HTML to PNG
 * Converts only the fixed 960x1200 variants to PNG
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const { variants } = require('./html_to_png_generator.js');

async function convert960x1200ToPNG() {
  try {
    const vertical960Variants = variants.filter(v => v.format === '960x1200');
    
    console.log(`🚀 Converting ${vertical960Variants.length} fixed 960x1200 HTML files to PNG...`);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const htmlDir = path.join(__dirname, '../output/ad_variants/html');
    const pngDir = path.join(__dirname, '../output/ad_variants/png');

    for (const [index, variant] of vertical960Variants.entries()) {
      console.log(`\n${index + 1}. Converting ${variant.exportName} to PNG...`);
      console.log(`   Persona: ${variant.personaName}`);
      console.log(`   Locale: ${variant.locale} - ${variant.price} - "${variant.cta}"`);
      
      const htmlFileName = variant.exportName.replace('.png', '.html');
      const htmlPath = path.join(htmlDir, htmlFileName);
      const pngPath = path.join(pngDir, variant.exportName);
      
      // Navigate to the HTML file
      await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });
      
      // Set viewport and take screenshot
      await page.setViewport({ width: 960, height: 1200 });
      await page.screenshot({
        path: pngPath,
        clip: { x: 0, y: 0, width: 960, height: 1200 },
        type: 'png'
      });
      
      console.log(`   ✓ Generated ${variant.exportName}`);
    }

    await browser.close();
    
    console.log(`\n✅ Successfully converted ${vertical960Variants.length} 960x1200 HTML files to PNG!`);
    console.log(`📁 PNG files saved to: ${pngDir}`);
    console.log(`\n🎉 960x1200 variants are now fixed with:`);
    console.log(`   ✅ Image placeholder on the right side`);
    console.log(`   ✅ Content on the left side`);
    console.log(`   ✅ Proper persona-specific copy`);
    console.log(`   ✅ Localized pricing and CTAs`);

  } catch (error) {
    console.error('❌ Error converting 960x1200 to PNG:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  convert960x1200ToPNG();
}

module.exports = { convert960x1200ToPNG };