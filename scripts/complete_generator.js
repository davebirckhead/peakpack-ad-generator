#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Base component assets (from Figma)
const imgBg = "http://localhost:3845/assets/767e7cb96a82dfc1b974632f8b628f4a3ef66609.svg";
const imgLogoMark = "http://localhost:3845/assets/bc15b87f152fc239880556178c77d0e8972a6615.svg";
const imgVector = "http://localhost:3845/assets/718396a08d350b1fbddd7a0f0cc61d620fefd0dc.svg";
const imgBadge1 = "http://localhost:3845/assets/e97d6951604b4cb81fd2cb729d2f35264abd351e.svg";
const imgCtaButton = "http://localhost:3845/assets/68efda75e1703a0306c6fbb9dc786455b2556f92.svg";

// Configuration
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

function generateAdComponent(variant) {
  const componentName = `PeakPackAd_${variant.format.replace('x', 'X')}_${variant.persona}_${variant.locale.replace('-', '_')}`;
  
  return `const imgBg = "${imgBg}";
const imgLogoMark = "${imgLogoMark}";
const imgVector = "${imgVector}";
const imgBadge1 = "${imgBadge1}";
const imgCtaButton = "${imgCtaButton}";

export default function ${componentName}() {
  return (
    <div className="relative size-full" data-name="${variant.exportName}" data-variant="${variant.persona}-${variant.locale}-${variant.format}">
      <div className="absolute inset-0" data-name="BG">
        <img alt="" className="block max-w-none size-full" src={imgBg} />
      </div>
      
      {/* Brand */}
      <div className="absolute contents inset-[6.37%_80.17%_87.26%_4%]" data-name="Brand">
        <div className="absolute inset-[6.37%_92.67%_87.26%_4%]" data-name="LogoMark">
          <img alt="" className="block max-w-none size-full" src={imgLogoMark} />
        </div>
        <div className="absolute font-['Inter:Bold_Italic',_sans-serif] font-bold inset-[6.69%_80.17%_87.9%_8.67%] italic leading-[0] text-[28px] text-gray-50 text-left text-nowrap">
          <p className="block leading-[normal] whitespace-pre">PeakPack</p>
        </div>
      </div>
      
      {/* Hero Image Placeholder */}
      <div className="absolute contents inset-[12.74%_6.67%_12.74%_60%]" data-name="HeroImage">
        <div className="absolute inset-[12.74%_6.67%_12.74%_60%]" data-name="Vector">
          <div className="absolute inset-[-0.21%_-0.25%]">
            <img alt="" className="block max-w-none size-full" src={imgVector} />
          </div>
        </div>
        <div className="absolute font-['Inter:Regular',_sans-serif] font-normal inset-[47.45%_15.46%_49.52%_68.79%] leading-[0] not-italic text-[16px] text-center text-gray-400 text-nowrap">
          <p className="block leading-[normal] whitespace-pre">Drop product image here</p>
        </div>
      </div>
      
      {/* Content */}
      <div className="absolute contents inset-[19.75%_30.08%_27.87%_4%]" data-name="Content">
        {/* Main Headline */}
        <div className="absolute font-['Inter:Bold_Italic',_sans-serif] font-bold inset-[19.75%_42.5%_69.43%_4%] italic leading-[0] text-[56px] text-gray-50 text-left text-nowrap">
          <p className="block leading-[normal] whitespace-pre">Carry More. Go Farther.</p>
        </div>
        
        {/* Description with persona angle */}
        <div className="absolute font-['Inter:Regular',_sans-serif] font-normal inset-[39.49%_30.08%_56.21%_4%] leading-[0] not-italic text-[22px] text-gray-200 text-left text-nowrap">
          <p className="block leading-[normal] whitespace-pre">Versatile PeakPack Pro 30L built for ${variant.personaAngle.toLowerCase()}. 30L. Weatherproof. Lifetime warranty.</p>
        </div>
        
        {/* Badge */}
        <div className="absolute contents inset-[49.36%_81.83%_44.9%_4%]" data-name="Badges">
          <div className="absolute inset-[49.36%_81.83%_44.9%_4%]" data-name="Badge-1">
            <div className="absolute inset-[-1.39%_-0.29%]">
              <img alt="" className="block max-w-none size-full" src={imgBadge1} />
            </div>
          </div>
          <div className="absolute font-['Inter:Regular',_sans-serif] font-normal inset-[50.64%_82.83%_46.34%_5.67%] leading-[0] not-italic text-[16px] text-gray-300 text-left text-nowrap">
            <p className="block leading-[normal] whitespace-pre">New • 20% lighter</p>
          </div>
        </div>
        
        {/* CTA Button */}
        <div className="absolute contents inset-[60.51%_76%_30.57%_4%]" data-name="CTA">
          <div className="absolute inset-[60.51%_76%_30.57%_4%]" data-name="CTA-Button">
            <img alt="" className="block max-w-none size-full" src={imgCtaButton} />
          </div>
          <div className="absolute font-['Inter:Bold_Italic',_sans-serif] font-bold inset-[63.06%_81.96%_33.12%_9.96%] italic leading-[0] text-[20px] text-center text-gray-900 text-nowrap">
            <p className="block leading-[normal] whitespace-pre">${variant.cta}</p>
          </div>
        </div>
        
        {/* Price */}
        <div className="absolute contents inset-[57.33%_69.42%_38.85%_26.5%]" data-name="Price">
          <div className="absolute font-['Inter:Bold_Italic',_sans-serif] font-bold inset-[57.33%_69.42%_38.85%_26.5%] italic leading-[0] text-[20px] text-gray-50 text-left text-nowrap">
            <p className="block leading-[normal] whitespace-pre">${variant.price}</p>
          </div>
        </div>
        
        {/* Legal Notice */}
        <div className="absolute contents inset-[69.75%_73%_27.87%_4%]" data-name="Legal">
          <div className="absolute font-['Inter:Regular',_sans-serif] font-normal inset-[69.75%_73%_27.87%_4%] leading-[0] not-italic text-[12px] text-gray-400 text-left text-nowrap">
            <p className="block leading-[normal] whitespace-pre">* Limited-time introductory price. ${variant.localeNotice}</p>
          </div>
        </div>
      </div>
      
      {/* Format indicator */}
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal inset-[95.54%_4%_2.07%_76.92%] leading-[0] not-italic text-[12px] text-gray-500 text-nowrap text-right">
        <p className="block leading-[normal] whitespace-pre">${variant.format} ${variant.personaName} ${variant.locale}</p>
      </div>
    </div>
  );
}`;
}

function generateAllVariants() {
  const outputDir = path.join(__dirname, 'generated');
  
  // Create output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('🚀 Generating 27 PeakPack ad variants...\n');

  let count = 0;
  const allVariants = [];

  for (const format of formats) {
    for (const [personaId, personaData] of Object.entries(personas)) {
      for (const [localeId, localeData] of Object.entries(locales)) {
        count++;
        
        const variant = {
          format,
          persona: personaId,
          locale: localeId,
          personaName: personaData.name,
          personaAngle: personaData.angle,
          price: localeData.price,
          cta: localeData.cta,
          localeNotice: localeData.localeNotice,
          exportName: `${format}_${personaId}_${localeId.replace('-', '_')}.png`
        };

        const componentCode = generateAdComponent(variant);
        const filename = `${variant.exportName.replace('.png', '.jsx')}`;
        const filepath = path.join(outputDir, filename);
        
        fs.writeFileSync(filepath, componentCode);
        allVariants.push(variant);
        
        console.log(`${count.toString().padStart(2)}. ${filename}`);
        console.log(`    ${variant.personaName} (${variant.personaAngle})`);
        console.log(`    ${variant.locale} - ${variant.price} - "${variant.cta}"`);
        console.log(`    ${variant.localeNotice}\n`);
      }
    }
  }

  // Generate index file
  const indexContent = `// Auto-generated index of all ad variants
${allVariants.map((variant, i) => {
    const componentName = `PeakPackAd_${variant.format.replace('x', 'X')}_${variant.persona}_${variant.locale.replace('-', '_')}`;
    return `import ${componentName} from './${variant.exportName.replace('.png', '.jsx')}';`;
  }).join('\n')}

export const allVariants = [
${allVariants.map((variant, i) => {
    const componentName = `PeakPackAd_${variant.format.replace('x', 'X')}_${variant.persona}_${variant.locale.replace('-', '_')}`;
    return `  { component: ${componentName}, variant: ${JSON.stringify(variant)} }`;
  }).join(',\n')}
];

export default allVariants;
`;

  fs.writeFileSync(path.join(outputDir, 'index.js'), indexContent);

  console.log(`✅ Generated ${count} ad variants in ${outputDir}/`);
  console.log(`📋 Each variant includes persona-specific messaging and localized pricing/CTA`);
  console.log(`📄 Index file created at ${outputDir}/index.js`);
  
  return allVariants;
}

if (require.main === module) {
  generateAllVariants();
}

module.exports = { generateAllVariants };