#!/usr/bin/env node
/**
 * PeakPack Ad Variant Generator
 * Generates 27 unique ad variants based on persona, locale, and format
 * Updated to use Figma master template and generate actual component files
 */

const fs = require('fs');
const path = require('path');

// Base component assets (from Figma MCP)
const imgBg = "http://localhost:3845/assets/767e7cb96a82dfc1b974632f8b628f4a3ef66609.svg";
const imgLogoMark = "http://localhost:3845/assets/bc15b87f152fc239880556178c77d0e8972a6615.svg";
const imgVector = "http://localhost:3845/assets/718396a08d350b1fbddd7a0f0cc61d620fefd0dc.svg";
const imgBadge1 = "http://localhost:3845/assets/e97d6951604b4cb81fd2cb729d2f35264abd351e.svg";
const imgCtaButton = "http://localhost:3845/assets/68efda75e1703a0306c6fbb9dc786455b2556f92.svg";

// Variant configuration data - all 27 variants
const personas = {
  budget_explorer: { name: "Budget Explorer", angle: "Durable value, student-friendly" },
  tech_commuter: { name: "Tech Commuter", angle: "Laptop-safe, TSA-friendly, sleek" },
  trail_runner: { name: "Trail Runner", angle: "Lightweight, bounce-free, breathable" }
};

const locales = {
  "en-US": { price: "$129", cta: "Shop now", localeNotice: "Ships free in the U.S." },
  "es-MX": { price: "$2,190", cta: "Compra ahora", localeNotice: "Envío gratis en México" },
  "fr-FR": { price: "129 €", cta: "Acheter", localeNotice: "Livraison gratuite en France" }
};

const formats = ["1200x1200", "1200x628", "960x1200"];

// Generate all 27 variants
const variants = [];
for (const format of formats) {
  for (const [personaId, personaData] of Object.entries(personas)) {
    for (const [localeId, localeData] of Object.entries(locales)) {
      variants.push({
        format,
        persona: personaId,
        locale: localeId,
        personaName: personaData.name,
        personaAngle: personaData.angle,
        price: localeData.price,
        cta: localeData.cta,
        localeNotice: localeData.localeNotice,
        exportName: `${format}_${personaId}_${localeId.replace('-', '_')}.png`
      });
    }
  }
}

// Format-specific styling configurations
const formatConfigs = {
  '1200x1200': {
    brandInset: 'inset-[6.37%_80.17%_87.26%_4%]',
    logoInset: 'inset-[6.37%_92.67%_87.26%_4%]',
    brandTextInset: 'inset-[6.69%_80.17%_87.9%_8.67%]',
    brandTextSize: 'text-[28px]',
    heroInset: 'inset-[12.74%_6.67%_12.74%_60%]',
    heroTextInset: 'inset-[47.45%_15.46%_49.52%_68.79%]',
    heroTextSize: 'text-[16px]',
    contentInset: 'inset-[19.75%_30.08%_27.87%_4%]',
    headlineInset: 'inset-[19.75%_42.5%_69.43%_4%]',
    headlineSize: 'text-[46px]',
    descriptionInset: 'inset-[39.49%_30.08%_56.21%_4%]',
    descriptionSize: 'text-[18px]',
    badgesInset: 'inset-[49.36%_81.83%_44.9%_4%]',
    badgeTextInset: 'inset-[50.64%_82.83%_46.34%_5.67%]',
    badgeTextSize: 'text-[14px]',
    ctaInset: 'inset-[60.51%_76%_30.57%_4%]',
    ctaTextInset: 'inset-[63.06%_81.96%_33.12%_9.96%]',
    ctaTextSize: 'text-[18px]',
    priceInset: 'inset-[57.33%_69.42%_38.85%_26.5%]',
    priceTextSize: 'text-[18px]',
    legalInset: 'inset-[69.75%_73%_27.87%_4%]',
    legalTextSize: 'text-[10px]',
    formatLabelInset: 'inset-[95.54%_4%_2.07%_76.92%]'
  },
  '1200x628': {
    brandInset: 'inset-[6.37%_80.17%_87.26%_4%]',
    logoInset: 'inset-[6.37%_92.67%_87.26%_4%]',
    brandTextInset: 'inset-[6.69%_80.17%_87.9%_8.67%]',
    brandTextSize: 'text-[28px]',
    heroInset: 'inset-[12.74%_6.67%_12.74%_60%]',
    heroTextInset: 'inset-[47.45%_15.46%_49.52%_68.79%]',
    heroTextSize: 'text-[16px]',
    contentInset: 'inset-[19.75%_30.08%_27.87%_4%]',
    headlineInset: 'inset-[19.75%_42.5%_69.43%_4%]',
    headlineSize: 'text-[56px]',
    descriptionInset: 'inset-[39.49%_30.08%_56.21%_4%]',
    descriptionSize: 'text-[22px]',
    badgesInset: 'inset-[49.36%_81.83%_44.9%_4%]',
    badgeTextInset: 'inset-[50.64%_82.83%_46.34%_5.67%]',
    badgeTextSize: 'text-[16px]',
    ctaInset: 'inset-[60.51%_76%_30.57%_4%]',
    ctaTextInset: 'inset-[63.06%_81.96%_33.12%_9.96%]',
    ctaTextSize: 'text-[20px]',
    priceInset: 'inset-[57.33%_69.42%_38.85%_26.5%]',
    priceTextSize: 'text-[20px]',
    legalInset: 'inset-[69.75%_73%_27.87%_4%]',
    legalTextSize: 'text-[12px]',
    formatLabelInset: 'inset-[95.54%_4%_2.07%_76.92%]'
  },
  '960x1200': {
    brandInset: 'inset-[3%_70%_92%_5%]',
    logoInset: 'inset-[3%_88%_92%_5%]',
    brandTextInset: 'inset-[3.5%_70%_92.5%_12%]',
    brandTextSize: 'text-[24px]',
    heroInset: 'inset-[8%_5%_65%_5%]',
    heroTextInset: 'inset-[25%_10%_25%_10%]',
    heroTextSize: 'text-[14px]',
    contentInset: 'inset-[35%_5%_15%_5%]',
    headlineInset: 'inset-[35%_5%_75%_5%]',
    headlineSize: 'text-[42px]',
    descriptionInset: 'inset-[45%_5%_65%_5%]',
    descriptionSize: 'text-[16px]',
    badgesInset: 'inset-[55%_5%_50%_5%]',
    badgeTextInset: 'inset-[56%_8%_51%_8%]',
    badgeTextSize: 'text-[12px]',
    ctaInset: 'inset-[65%_5%_25%_5%]',
    ctaTextInset: 'inset-[67%_8%_27%_8%]',
    ctaTextSize: 'text-[16px]',
    priceInset: 'inset-[62%_5%_30%_35%]',
    priceTextSize: 'text-[16px]',
    legalInset: 'inset-[75%_5%_15%_5%]',
    legalTextSize: 'text-[10px]',
    formatLabelInset: 'inset-[95%_5%_2%_60%]'
  }
};

// Persona-specific content variations
const personaContent = {
  'budget_explorer': {
    headline: 'Smart Value. Big Adventures.',
    description: 'Student-friendly durability. Weatherproof. Lifetime warranty.'
  },
  'tech_commuter': {
    headline: 'Work Smart. Travel Sleek.',
    description: 'Laptop-safe design. TSA-friendly. Professional style.'
  },
  'trail_runner': {
    headline: 'Light Weight. Zero Bounce.',
    description: 'Breathable mesh. Bounce-free design. Built for trails.'
  }
};

// Generate component for each variant
function generateAdVariant(variant) {
  const config = formatConfigs[variant.format];
  const persona = personaContent[variant.persona];
  
  if (!config || !persona) {
    console.error(`Missing config for format ${variant.format} or persona ${variant.persona}`);
    return null;
  }

  const componentName = `PeakPackAd_${variant.format.replace('x', '_')}_${variant.persona}_${variant.locale.replace('-', '_')}`;
  const formatLabel = `${variant.format} ${variant.personaName.toLowerCase()} • ${variant.locale}`;
  
  return `const imgBg = "http://localhost:3845/assets/767e7cb96a82dfc1b974632f8b628f4a3ef66609.svg";
const imgLogoMark = "http://localhost:3845/assets/bc15b87f152fc239880556178c77d0e8972a6615.svg";
const imgVector = "http://localhost:3845/assets/718396a08d350b1fbddd7a0f0cc61d620fefd0dc.svg";
const imgBadge1 = "http://localhost:3845/assets/e97d6951604b4cb81fd2cb729d2f35264abd351e.svg";
const imgCtaButton = "http://localhost:3845/assets/68efda75e1703a0306c6fbb9dc786455b2556f92.svg";

export default function ${componentName}() {
  return (
    <div className="relative size-full" data-name="${variant.exportName}" data-variant="${variant.persona}-${variant.locale}-${variant.format}">
      <div className="absolute inset-0" data-name="BG">
        <img alt className="block max-w-none size-full" src={imgBg} />
      </div>
      
      <div className="absolute contents ${config.brandInset}" data-name="Brand">
        <div className="absolute ${config.logoInset}" data-name="LogoMark">
          <img alt className="block max-w-none size-full" src={imgLogoMark} />
        </div>
        <div className="absolute font-['Inter:Bold_Italic',_sans-serif] font-bold ${config.brandTextInset} italic leading-[0] ${config.brandTextSize} text-gray-50 text-left text-nowrap">
          <p className="block leading-[normal] whitespace-pre">PeakPack</p>
        </div>
      </div>
      
      <div className="absolute contents ${config.heroInset}" data-name="HeroImage">
        <div className="absolute ${config.heroInset}" data-name="Vector">
          <div className="absolute inset-[-0.21%_-0.25%]">
            <img alt className="block max-w-none size-full" src={imgVector} />
          </div>
        </div>
        <div className="absolute font-['Inter:Regular',_sans-serif] font-normal ${config.heroTextInset} leading-[0] not-italic ${config.heroTextSize} text-center text-gray-400 text-nowrap">
          <p className="block leading-[normal] whitespace-pre">Drop product image here</p>
        </div>
      </div>
      
      <div className="absolute contents ${config.contentInset}" data-name="Content">
        <div className="absolute font-['Inter:Bold_Italic',_sans-serif] font-bold ${config.headlineInset} italic leading-[0] ${config.headlineSize} text-gray-50 text-left text-nowrap">
          <p className="block leading-[normal] whitespace-pre">${persona.headline}</p>
        </div>
        
        <div className="absolute font-['Inter:Regular',_sans-serif] font-normal ${config.descriptionInset} leading-[0] not-italic ${config.descriptionSize} text-gray-200 text-left text-nowrap">
          <p className="block leading-[normal] whitespace-pre">${persona.description}</p>
        </div>
        
        <div className="absolute contents ${config.badgesInset}" data-name="Badges">
          <div className="absolute ${config.badgesInset}" data-name="Badge-1">
            <div className="absolute inset-[-1.39%_-0.29%]">
              <img alt className="block max-w-none size-full" src={imgBadge1} />
            </div>
          </div>
          <div className="absolute font-['Inter:Regular',_sans-serif] font-normal ${config.badgeTextInset} leading-[0] not-italic ${config.badgeTextSize} text-gray-300 text-left text-nowrap">
            <p className="block leading-[normal] whitespace-pre">New • 20% lighter</p>
          </div>
        </div>
        
        <div className="absolute contents ${config.ctaInset}" data-name="CTA">
          <div className="absolute ${config.ctaInset}" data-name="CTA-Button">
            <img alt className="block max-w-none size-full" src={imgCtaButton} />
          </div>
          <div className="absolute font-['Inter:Bold_Italic',_sans-serif] font-bold ${config.ctaTextInset} italic leading-[0] ${config.ctaTextSize} text-center text-gray-900 text-nowrap">
            <p className="block leading-[normal] whitespace-pre">${variant.cta}</p>
          </div>
        </div>
        
        <div className="absolute contents ${config.priceInset}" data-name="Price">
          <div className="absolute font-['Inter:Bold_Italic',_sans-serif] font-bold ${config.priceInset} italic leading-[0] ${config.priceTextSize} text-gray-50 text-left text-nowrap">
            <p className="block leading-[normal] whitespace-pre">${variant.price}</p>
          </div>
        </div>
        
        <div className="absolute contents ${config.legalInset}" data-name="Legal">
          <div className="absolute font-['Inter:Regular',_sans-serif] font-normal ${config.legalInset} leading-[0] not-italic ${config.legalTextSize} text-gray-400 text-left text-nowrap">
            <p className="block leading-[normal] whitespace-pre">* Limited-time introductory price. ${variant.localeNotice}</p>
          </div>
        </div>
      </div>
      
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal ${config.formatLabelInset} leading-[0] not-italic text-[12px] text-gray-500 text-nowrap text-right">
        <p className="block leading-[normal] whitespace-pre">${formatLabel}</p>
      </div>
    </div>
  );
}`;
}

// Main execution function
async function generateAllVariants() {
  try {
    console.log("🚀 Generating 27 PeakPack ad variants...");
    
    // Create generated directory
    const generatedDir = path.join(__dirname, 'generated');
    if (!fs.existsSync(generatedDir)) {
      fs.mkdirSync(generatedDir, { recursive: true });
    }
    
    // Generate manifest
    const manifest = {
      generatedAt: new Date().toISOString(),
      totalVariants: variants.length,
      variants: []
    };
    
    // Generate each variant
    for (const [index, variant] of variants.entries()) {
      console.log(`\n${index + 1}. ${variant.exportName}`);
      console.log(`   Persona: ${variant.personaName} (${variant.personaAngle})`);
      console.log(`   Locale: ${variant.locale} - ${variant.price} - "${variant.cta}"`);
      console.log(`   Notice: ${variant.localeNotice}`);
      
      // Generate the component code
      const componentCode = generateAdVariant(variant);
      
      if (componentCode) {
        const fileName = `${variant.exportName.replace('.png', '.jsx')}`;
        const filePath = path.join(generatedDir, fileName);
        
        fs.writeFileSync(filePath, componentCode);
        console.log(`   ✓ Generated ${fileName}`);
        
        manifest.variants.push({
          fileName,
          format: variant.format,
          persona: variant.persona,
          locale: variant.locale,
          exportName: variant.exportName
        });
      }
    }
    
    // Write manifest
    fs.writeFileSync(
      path.join(generatedDir, 'manifest.json'),
      JSON.stringify(manifest, null, 2)
    );
    
    // Generate index file for easy imports
    const indexContent = manifest.variants.map(v => 
      `export { default as ${v.fileName.replace('.jsx', '').replace(/[^a-zA-Z0-9_]/g, '_')} } from './${v.fileName.replace('.jsx', '')}';`
    ).join('\n');
    
    fs.writeFileSync(path.join(generatedDir, 'index.js'), indexContent);
    
    console.log(`\n✅ Successfully generated ${variants.length} ad variants!`);
    console.log(`📁 Files saved to: ${generatedDir}`);
    console.log(`📋 Manifest: manifest.json`);
    console.log(`📦 Index: index.js`);
    
  } catch (error) {
    console.error('❌ Error generating variants:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  generateAllVariants();
}

module.exports = { generateAllVariants, generateAdVariant, variants };