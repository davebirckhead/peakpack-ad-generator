#!/usr/bin/env node
/**
 * Fixed Local Image Generator for PeakPack Ad Variants
 * FIXES: 
 * 1. Proper localized copy (Spanish/French headlines and descriptions)
 * 2. Larger headings for 960x1200 and 1200x1200 formats
 * 3. CTA, Price, and Legal moved closer to bottom
 * 4. Headlines won't overlap product image
 */

const fs = require('fs');
const path = require('path');

// Read the existing variants from our generator
const { variants } = require('./ad_variant_generator.js');

// FIXED: Persona-specific content with proper localization
const personaContent = {
  'budget_explorer': {
    'en-US': {
      headline: 'Smart Value. Big Adventures.',
      description: 'Student-friendly durability. Weatherproof. Lifetime warranty.'
    },
    'es-MX': {
      headline: 'Valor Inteligente. Grandes Aventuras.',
      description: 'Durabilidad amigable para estudiantes. Resistente al clima.'
    },
    'fr-FR': {
      headline: 'Valeur Intelligente. Grandes Aventures.',
      description: 'Durabilité abordable. Étanche. Garantie à vie.'
    }
  },
  'tech_commuter': {
    'en-US': {
      headline: 'Work Smart. Travel Sleek.',
      description: 'Laptop-safe design. TSA-friendly. Professional style.'
    },
    'es-MX': {
      headline: 'Trabaja Inteligente. Viaja Elegante.',
      description: 'Diseño seguro para laptop. Compatible TSA. Estilo profesional.'
    },
    'fr-FR': {
      headline: 'Travaillez Intelligent. Voyagez Élégant.',
      description: 'Design sécurisé pour ordinateur portable. Compatible TSA.'
    }
  },
  'trail_runner': {
    'en-US': {
      headline: 'Light Weight. Zero Bounce.',
      description: 'Breathable mesh. Bounce-free design. Built for trails.'
    },
    'es-MX': {
      headline: 'Peso Ligero. Cero Rebote.',
      description: 'Malla transpirable. Diseño sin rebote. Hecho para senderos.'
    },
    'fr-FR': {
      headline: 'Poids Léger. Zéro Rebond.',
      description: 'Maille respirante. Design anti-rebond. Conçu pour les sentiers.'
    }
  }
};

// Generate HTML template for each variant with localized content and improved layout
function generateFixedLocalImageHTML(variant) {
  const personaLocaleContent = personaContent[variant.persona][variant.locale];
  const [width, height] = variant.format.split('x').map(Number);
  
  // Calculate scaling factors for different formats
  const isSquare = variant.format === '1200x1200';
  const isVertical = variant.format === '960x1200';
  const isLandscape = variant.format === '1200x628';
  
  // FIXED: Larger headline sizes for 960x1200 and 1200x1200
  let headlineSize = isVertical ? '40px' : isSquare ? '56px' : '56px';
  let descriptionSize = isVertical ? '16px' : isSquare ? '20px' : '22px';
  let priceSize = isVertical ? '16px' : isSquare ? '20px' : '20px';
  let ctaSize = isVertical ? '16px' : isSquare ? '20px' : '20px';
  
  return `<!DOCTYPE html>
<html lang="${variant.locale.split('-')[0]}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PeakPack Ad - ${variant.exportName}</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,700;1,700&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        .ad-container {
            width: ${width}px;
            height: ${height}px;
            position: relative;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            font-family: 'Inter', sans-serif;
            overflow: hidden;
        }
        
        .brand {
            position: absolute;
            top: 6.37%;
            left: 4%;
            right: 80.17%;
            bottom: 87.26%;
        }
        
        .logo-mark {
            position: absolute;
            top: 0;
            left: 0;
            width: 40px;
            height: 40px;
            background: #f59e0b;
            border-radius: 8px;
        }
        
        .brand-text {
            position: absolute;
            top: 10%;
            left: 60px;
            font-weight: 700;
            font-style: italic;
            font-size: 28px;
            color: #f8fafc;
            white-space: nowrap;
        }
        
        .hero-image {
            position: absolute;
            top: 12.74%;
            right: 6.67%;
            bottom: 12.74%;
            left: 60%;
            border-radius: 12px;
            background: rgba(15, 23, 42, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
        }
        
        .product-image {
            width: 85%;
            height: 85%;
            object-fit: contain;
            object-position: center;
        }
        
        .content {
            position: absolute;
            top: 19.75%;
            left: 4%;
            right: 42%; /* FIXED: More space so headline doesn't overlap image */
            bottom: 15%; /* FIXED: Moved closer to bottom */
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        
        .top-content {
            flex-grow: 1;
        }
        
        .headline {
            font-weight: 700;
            font-style: italic;
            font-size: ${headlineSize};
            color: #f8fafc;
            line-height: 1.1;
            margin-bottom: 20px;
            word-wrap: break-word;
            hyphens: auto;
        }
        
        .description {
            font-size: ${descriptionSize};
            color: #e2e8f0;
            line-height: 1.4;
            margin-bottom: 20px;
        }
        
        .badge {
            display: inline-block;
            background: rgba(15, 23, 42, 0.8);
            border: 1px solid #334155;
            border-radius: 20px;
            padding: 8px 16px;
            font-size: 14px;
            color: #cbd5e1;
            margin-bottom: 20px;
        }
        
        .bottom-content {
            margin-top: auto;
        }
        
        .cta-section {
            display: flex;
            align-items: center;
            gap: 20px;
            margin-bottom: 15px;
        }
        
        .cta-button {
            background: #f59e0b;
            color: #0f172a;
            border: none;
            border-radius: 8px;
            padding: 12px 24px;
            font-weight: 700;
            font-style: italic;
            font-size: ${ctaSize};
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
            white-space: nowrap;
        }
        
        .price {
            font-weight: 700;
            font-style: italic;
            font-size: ${priceSize};
            color: #f8fafc;
            white-space: nowrap;
        }
        
        .legal {
            font-size: 12px;
            color: #94a3b8;
            line-height: 1.3;
        }
        
        .format-label {
            position: absolute;
            bottom: 2.07%;
            right: 4%;
            font-size: 12px;
            color: #64748b;
        }
        
        /* Format-specific adjustments */
        ${isVertical ? `
        .hero-image {
            top: 8%;
            right: 5%;
            bottom: 40%; /* FIXED: More space for content at bottom */
            left: 50%;
        }
        .content {
            top: 40%; /* FIXED: Adjusted to match hero image */
            left: 5%;
            right: 52%; /* FIXED: Better spacing from image */
            bottom: 8%; /* FIXED: Closer to bottom */
        }
        .brand {
            top: 3%;
            left: 5%;
            right: 52%;
        }
        .headline {
            font-size: 40px !important; /* FIXED: Larger headline */
            line-height: 1.1;
            margin-bottom: 15px;
        }
        .description {
            font-size: 16px !important; /* FIXED: Slightly larger */
            line-height: 1.4;
            margin-bottom: 15px;
        }
        .cta-button {
            font-size: 16px !important;
            padding: 12px 20px !important;
        }
        .price {
            font-size: 16px !important;
        }
        .legal {
            font-size: 11px !important;
        }
        ` : ''}
        
        ${isSquare ? `
        .headline {
            font-size: 56px !important; /* FIXED: Larger headline */
            line-height: 1.05;
        }
        .description {
            font-size: 20px !important; /* FIXED: Slightly larger */
        }
        .content {
            right: 42%; /* FIXED: More space so headline doesn't overlap */
            bottom: 12%; /* FIXED: Closer to bottom */
        }
        ` : ''}
        
        ${isLandscape ? `
        .content {
            bottom: 15%; /* FIXED: Closer to bottom */
        }
        ` : ''}
    </style>
</head>
<body>
    <div class="ad-container">
        <div class="brand">
            <div class="logo-mark"></div>
            <div class="brand-text">PeakPack</div>
        </div>
        
        <div class="hero-image">
            <img 
                src="../../../figma_assets/backpack.avif"
                alt="PeakPack Pro 30L Backpack"
                class="product-image"
            />
        </div>
        
        <div class="content">
            <div class="top-content">
                <h1 class="headline">${personaLocaleContent.headline}</h1>
                <p class="description">${personaLocaleContent.description}</p>
                <div class="badge">New • 20% lighter</div>
            </div>
            
            <div class="bottom-content">
                <div class="cta-section">
                    <button class="cta-button">${variant.cta}</button>
                    <div class="price">${variant.price}</div>
                </div>
                
                <p class="legal">* Limited-time introductory price. ${variant.localeNotice}</p>
            </div>
        </div>
        
        <div class="format-label">
            ${variant.format} ${variant.personaName.toLowerCase()} • ${variant.locale}
        </div>
    </div>
</body>
</html>`;
}

// Generate all HTML files with fixed localization and layout
async function generateFixedLocalImageVariants() {
  try {
    console.log("🔧 Generating FIXED ad variants with proper localization and layout...");
    
    const outputBaseDir = path.join(__dirname, '../output/ad_variants_v3_fixed');
    const htmlDir = path.join(outputBaseDir, 'html');
    
    // Create directories
    if (!fs.existsSync(htmlDir)) {
      fs.mkdirSync(htmlDir, { recursive: true });
    }
    
    // Verify backpack image exists
    const backpackPath = path.join(__dirname, '../figma_assets/backpack.avif');
    if (!fs.existsSync(backpackPath)) {
      console.error('❌ backpack.avif not found in figma_assets directory');
      return;
    }
    
    console.log(`✅ Using local backpack image: ${backpackPath}`);
    
    // Generate manifest
    const manifest = {
      generatedAt: new Date().toISOString(),
      version: "3.1",
      description: "FIXED ad variants with proper localization and improved layout",
      backpackImagePath: "../../../figma_assets/backpack.avif",
      totalVariants: variants.length,
      fixes: [
        "Proper Spanish and French headlines and descriptions",
        "Larger headlines for 960x1200 and 1200x1200 formats",
        "CTA, Price, and Legal moved closer to bottom",
        "Headlines prevented from overlapping product image"
      ],
      variants: []
    };
    
    // Generate each variant
    for (const [index, variant] of variants.entries()) {
      console.log(`\n${index + 1}. ${variant.exportName}`);
      console.log(`   Persona: ${variant.personaName} (${variant.personaAngle})`);
      console.log(`   Locale: ${variant.locale} - ${variant.price} - "${variant.cta}"`);
      
      // Show the localized content being used
      const localeContent = personaContent[variant.persona][variant.locale];
      console.log(`   Headline: "${localeContent.headline}"`);
      console.log(`   Description: "${localeContent.description}"`);
      console.log(`   Format: ${variant.format}`);
      
      const htmlContent = generateFixedLocalImageHTML(variant);
      const htmlFileName = variant.exportName.replace('.png', '.html');
      const htmlPath = path.join(htmlDir, htmlFileName);
      
      fs.writeFileSync(htmlPath, htmlContent);
      console.log(`   ✓ Generated ${htmlFileName}`);
      
      manifest.variants.push({
        fileName: htmlFileName,
        pngFileName: variant.exportName,
        format: variant.format,
        persona: variant.persona,
        locale: variant.locale,
        htmlPath: htmlPath,
        headline: localeContent.headline,
        description: localeContent.description,
        price: variant.price,
        cta: variant.cta,
        localeNotice: variant.localeNotice
      });
    }
    
    // Write manifest
    fs.writeFileSync(
      path.join(htmlDir, 'manifest.json'),
      JSON.stringify(manifest, null, 2)
    );
    
    // Create an index file listing all variants
    const indexHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PeakPack Ad Variants V3.1 - FIXED Gallery</title>
    <style>
        body { font-family: Inter, sans-serif; margin: 40px; background: #f8fafc; }
        h1 { color: #0f172a; margin-bottom: 40px; }
        .version-badge { background: #10b981; color: white; padding: 4px 12px; border-radius: 20px; font-size: 14px; font-weight: 700; }
        .fix-badge { background: #f59e0b; color: white; padding: 2px 8px; border-radius: 12px; font-size: 12px; margin-left: 8px; }
        .fixes { background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 20px; margin: 20px 0; }
        .fixes h3 { color: #92400e; margin-bottom: 10px; }
        .fixes ul { color: #92400e; }
        .gallery { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-top: 40px; }
        .variant { background: white; border-radius: 8px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .variant h3 { margin: 0 0 10px 0; color: #1e293b; }
        .variant iframe { width: 100%; height: 200px; border: 1px solid #e2e8f0; border-radius: 4px; }
        .details { margin-top: 10px; font-size: 14px; color: #64748b; }
        .locale-content { background: #f1f5f9; padding: 10px; border-radius: 4px; margin-top: 10px; font-size: 12px; }
    </style>
</head>
<body>
    <h1>PeakPack Ad Variants <span class="version-badge">V3.1</span> <span class="fix-badge">FIXED</span></h1>
    
    <div class="fixes">
        <h3>🔧 Fixes Applied:</h3>
        <ul>
            <li>✅ Proper Spanish and French headlines and descriptions</li>
            <li>✅ Larger headlines for 960x1200 and 1200x1200 formats</li>
            <li>✅ CTA, Price, and Legal moved closer to bottom</li>
            <li>✅ Headlines prevented from overlapping product image</li>
        </ul>
    </div>
    
    <p>All ${variants.length} variants now use correct localized copy and improved layout</p>
    
    <div class="gallery">
        ${manifest.variants.map(v => `
        <div class="variant">
            <h3>${v.pngFileName}</h3>
            <iframe src="${v.fileName}" frameborder="0"></iframe>
            <div class="details">
                <strong>Format:</strong> ${v.format}<br>
                <strong>Persona:</strong> ${v.persona}<br>
                <strong>Locale:</strong> ${v.locale}<br>
                <strong>Price:</strong> ${v.price}<br>
                <strong>CTA:</strong> ${v.cta}
            </div>
            <div class="locale-content">
                <strong>Headline:</strong> ${v.headline}<br>
                <strong>Description:</strong> ${v.description}<br>
                <strong>Legal:</strong> ${v.localeNotice}
            </div>
        </div>
        `).join('')}
    </div>
</body>
</html>`;
    
    fs.writeFileSync(path.join(htmlDir, 'index.html'), indexHTML);
    
    console.log(`\n✅ Successfully generated ${variants.length} FIXED variants!`);
    console.log(`📁 Files saved to: ${htmlDir}`);
    console.log(`📋 Manifest: manifest.json`);
    console.log(`🖼️ Gallery: index.html`);
    console.log(`\n🔧 V3.1 FIXES:`);
    console.log(`   ✅ Proper Spanish and French copy`);
    console.log(`   ✅ Larger headlines for 960x1200 and 1200x1200`);
    console.log(`   ✅ CTA/Price/Legal moved closer to bottom`);
    console.log(`   ✅ Headlines won't overlap product image`);
    
  } catch (error) {
    console.error('❌ Error generating fixed variants:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  generateFixedLocalImageVariants();
}

module.exports = { generateFixedLocalImageVariants, generateFixedLocalImageHTML, variants };