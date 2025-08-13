#!/usr/bin/env node
/**
 * Convert Local Image HTML to PNG
 * Converts all 27 local image variants to PNG
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const { variants } = require('./local_image_generator.js');

async function convertLocalImageToPNG() {
  try {
    console.log(`🚀 Converting ${variants.length} local image HTML files to PNG...`);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const htmlDir = path.join(__dirname, '../output/ad_variants_v3/html');
    const pngDir = path.join(__dirname, '../output/ad_variants_v3/png');

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
    
    console.log(`\n✅ Successfully converted ${variants.length} local image HTML files to PNG!`);
    console.log(`📁 PNG files saved to: ${pngDir}`);
    console.log(`\n🎉 Local image variants complete with:`);
    console.log(`   ✅ Local backpack.avif from figma_assets`);
    console.log(`   ✅ No external image dependencies`);
    console.log(`   ✅ Persona-specific copy`);
    console.log(`   ✅ Localized pricing and CTAs`);
    console.log(`   ✅ All 3 formats (1200x1200, 1200x628, 960x1200)`);

    // Generate summary manifest
    const summaryManifest = {
      generatedAt: new Date().toISOString(),
      version: "3.0",
      description: "Complete ad variant generation with local backpack.avif image",
      imageSource: "local",
      imagePath: "../figma_assets/backpack.avif",
      totalVariants: variants.length,
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
      },
      improvements: [
        "Local backpack.avif image from figma_assets directory",
        "No external image dependencies",
        "Faster loading with local assets",
        "Better quality control with local images",
        "Consistent branding with figma assets"
      ]
    };

    fs.writeFileSync(
      path.join(pngDir, 'generation_summary.json'),
      JSON.stringify(summaryManifest, null, 2)
    );

    console.log(`📋 Generation summary saved to: generation_summary.json`);

  } catch (error) {
    console.error('❌ Error converting local image to PNG:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  convertLocalImageToPNG();
}

module.exports = { convertLocalImageToPNG };