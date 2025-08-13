#!/usr/bin/env node
/**
 * Convert Fixed HTML to PNG
 * Converts all 27 fixed variants to PNG with proper localization and layout
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const { variants } = require('./fixed_local_image_generator.js');

async function convertFixedToPNG() {
  try {
    console.log(`🚀 Converting ${variants.length} FIXED HTML files to PNG...`);
    console.log(`🔧 Fixes: Localization + Larger headlines + Better layout`);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const htmlDir = path.join(__dirname, '../output/ad_variants_v3_fixed/html');
    const pngDir = path.join(__dirname, '../output/ad_variants_v3_fixed/png');

    // Create PNG directory
    if (!fs.existsSync(pngDir)) {
      fs.mkdirSync(pngDir, { recursive: true });
    }

    for (const [index, variant] of variants.entries()) {
      console.log(`\n${index + 1}. Converting ${variant.exportName} to PNG...`);
      console.log(`   Persona: ${variant.personaName}`);
      console.log(`   Locale: ${variant.locale} - ${variant.price} - "${variant.cta}"`);
      console.log(`   Format: ${variant.format}`);
      
      const htmlFileName = variant.exportName.replace('.png', '.html');
      const htmlPath = path.join(htmlDir, htmlFileName);
      const pngPath = path.join(pngDir, variant.exportName);
      
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
      
      console.log(`   ✓ Generated ${variant.exportName}`);
    }

    await browser.close();
    
    console.log(`\n✅ Successfully converted ${variants.length} FIXED HTML files to PNG!`);
    console.log(`📁 PNG files saved to: ${pngDir}`);
    console.log(`\n🎉 FIXED variants complete with:`);
    console.log(`   ✅ Proper Spanish and French headlines and descriptions`);
    console.log(`   ✅ Larger headlines for 960x1200 and 1200x1200 formats`);
    console.log(`   ✅ CTA, Price, and Legal moved closer to bottom`);
    console.log(`   ✅ Headlines prevented from overlapping product image`);
    console.log(`   ✅ Local backpack.avif from figma_assets`);
    console.log(`   ✅ All 3 formats with correct layouts`);

    // Generate summary manifest
    const summaryManifest = {
      generatedAt: new Date().toISOString(),
      version: "3.1",
      description: "FIXED ad variants with proper localization and improved layout",
      imageSource: "local",
      imagePath: "../figma_assets/backpack.avif",
      totalVariants: variants.length,
      fixes: [
        "Proper Spanish and French headlines and descriptions",
        "Larger headlines for 960x1200 and 1200x1200 formats (40px and 56px respectively)",
        "CTA, Price, and Legal moved closer to bottom with flexbox layout",
        "Headlines prevented from overlapping product image with better spacing",
        "Better responsive breakpoints for all three formats"
      ],
      formats: {
        "1200x1200": variants.filter(v => v.format === '1200x1200').length,
        "1200x628": variants.filter(v => v.format === '1200x628').length,
        "960x1200": variants.filter(v => v.format === '960x1200').length
      },
      personas: {
        "budget_explorer": variants.filter(v => v.persona === 'budget_explorer').length,
        "tech_commuter": variants.filter(v => v.persona === 'tech_commuter').length,
        "trail_runner": variants.filter(v => v.persona === 'trail_runner').length
      },
      locales: {
        "en-US": variants.filter(v => v.locale === 'en-US').length,
        "es-MX": variants.filter(v => v.locale === 'es-MX').length,
        "fr-FR": variants.filter(v => v.locale === 'fr-FR').length
      }
    };

    fs.writeFileSync(
      path.join(pngDir, 'generation_summary.json'),
      JSON.stringify(summaryManifest, null, 2)
    );

    console.log(`📋 Generation summary saved to: generation_summary.json`);

  } catch (error) {
    console.error('❌ Error converting fixed HTML to PNG:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  convertFixedToPNG();
}

module.exports = { convertFixedToPNG };