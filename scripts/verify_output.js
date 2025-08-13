#!/usr/bin/env node
/**
 * Verification Script for PeakPack Ad Generation
 * Verifies all 27 PNG files were generated correctly
 */

const fs = require('fs');
const path = require('path');

function verifyOutput() {
  console.log('🔍 Verifying PeakPack ad variant generation...\n');
  
  const outputDir = path.join(__dirname, '../output/ad_variants');
  const pngDir = path.join(outputDir, 'png');
  const htmlDir = path.join(outputDir, 'html');
  
  // Expected variants
  const formats = ['1200x1200', '1200x628', '960x1200'];
  const personas = ['budget_explorer', 'tech_commuter', 'trail_runner'];
  const locales = ['en_US', 'es_MX', 'fr_FR'];
  
  const expectedVariants = [];
  for (const format of formats) {
    for (const persona of personas) {
      for (const locale of locales) {
        expectedVariants.push(`${format}_${persona}_${locale}`);
      }
    }
  }
  
  console.log(`📊 Expected: ${expectedVariants.length} variants`);
  
  // Check PNG files
  let pngCount = 0;
  let htmlCount = 0;
  const missingFiles = [];
  
  for (const variant of expectedVariants) {
    const pngFile = path.join(pngDir, `${variant}.png`);
    const htmlFile = path.join(htmlDir, `${variant}.html`);
    
    if (fs.existsSync(pngFile)) {
      pngCount++;
      const stats = fs.statSync(pngFile);
      if (stats.size === 0) {
        console.log(`⚠️  Empty PNG file: ${variant}.png`);
      }
    } else {
      missingFiles.push(`${variant}.png`);
    }
    
    if (fs.existsSync(htmlFile)) {
      htmlCount++;
    } else {
      missingFiles.push(`${variant}.html`);
    }
  }
  
  // Results
  console.log(`\n✅ PNG files generated: ${pngCount}/${expectedVariants.length}`);
  console.log(`✅ HTML files generated: ${htmlCount}/${expectedVariants.length}`);
  
  if (missingFiles.length > 0) {
    console.log(`\n❌ Missing files (${missingFiles.length}):`);
    missingFiles.forEach(file => console.log(`   - ${file}`));
  }
  
  // Check directories and manifests
  const manifestPath = path.join(htmlDir, 'manifest.json');
  if (fs.existsSync(manifestPath)) {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    console.log(`\n📋 Manifest contains ${manifest.variants.length} variants`);
  }
  
  const indexPath = path.join(htmlDir, 'index.html');
  if (fs.existsSync(indexPath)) {
    console.log(`🖼️  Gallery index.html created`);
  }
  
  // Summary by format
  console.log('\n📐 Breakdown by format:');
  for (const format of formats) {
    const formatPngs = expectedVariants.filter(v => v.startsWith(format));
    const generatedCount = formatPngs.filter(v => 
      fs.existsSync(path.join(pngDir, `${v}.png`))
    ).length;
    console.log(`   ${format}: ${generatedCount}/${formatPngs.length} PNG files`);
  }
  
  // Summary by persona
  console.log('\n👥 Breakdown by persona:');
  for (const persona of personas) {
    const personaPngs = expectedVariants.filter(v => v.includes(persona));
    const generatedCount = personaPngs.filter(v => 
      fs.existsSync(path.join(pngDir, `${v}.png`))
    ).length;
    console.log(`   ${persona}: ${generatedCount}/${personaPngs.length} PNG files`);
  }
  
  // Summary by locale
  console.log('\n🌍 Breakdown by locale:');
  for (const locale of locales) {
    const localePngs = expectedVariants.filter(v => v.endsWith(locale));
    const generatedCount = localePngs.filter(v => 
      fs.existsSync(path.join(pngDir, `${v}.png`))
    ).length;
    console.log(`   ${locale}: ${generatedCount}/${localePngs.length} PNG files`);
  }
  
  console.log('\n📁 Output locations:');
  console.log(`   PNG files: ${pngDir}`);
  console.log(`   HTML files: ${htmlDir}`);
  console.log(`   Gallery: ${indexPath}`);
  
  if (pngCount === expectedVariants.length && htmlCount === expectedVariants.length) {
    console.log('\n🎉 SUCCESS: All 27 ad variants generated successfully!');
  } else {
    console.log('\n⚠️  Some files may be missing. Check the output above.');
  }
}

if (require.main === module) {
  verifyOutput();
}

module.exports = { verifyOutput };