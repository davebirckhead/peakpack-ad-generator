#!/usr/bin/env node
/**
 * Fix 960x1200 Format Generator
 * Regenerates only the 960x1200 vertical format with corrected layout
 */

const fs = require('fs');
const path = require('path');

// Import the updated generator
const { generateHTML, variants } = require('./html_to_png_generator.js');

async function fix960x1200Variants() {
  try {
    console.log("🔧 Fixing 960x1200 ad variants...");
    
    const outputBaseDir = path.join(__dirname, '../output/ad_variants');
    const htmlDir = path.join(outputBaseDir, 'html');
    
    // Filter to only 960x1200 variants
    const vertical960Variants = variants.filter(v => v.format === '960x1200');
    
    console.log(`📱 Found ${vertical960Variants.length} vertical (960x1200) variants to fix`);
    
    // Regenerate each 960x1200 variant
    for (const [index, variant] of vertical960Variants.entries()) {
      console.log(`\n${index + 1}. Fixing ${variant.exportName}`);
      console.log(`   Persona: ${variant.personaName} (${variant.personaAngle})`);
      console.log(`   Locale: ${variant.locale} - ${variant.price} - "${variant.cta}"`);
      
      const htmlContent = generateHTML(variant);
      const htmlFileName = variant.exportName.replace('.png', '.html');
      const htmlPath = path.join(htmlDir, htmlFileName);
      
      fs.writeFileSync(htmlPath, htmlContent);
      console.log(`   ✓ Fixed ${htmlFileName}`);
    }
    
    console.log(`\n✅ Successfully fixed ${vertical960Variants.length} vertical ad variants!`);
    console.log(`📁 Updated files in: ${htmlDir}`);
    console.log(`\n🔄 Next: Run PNG conversion to update the image files`);
    
  } catch (error) {
    console.error('❌ Error fixing 960x1200 variants:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  fix960x1200Variants();
}

module.exports = { fix960x1200Variants };