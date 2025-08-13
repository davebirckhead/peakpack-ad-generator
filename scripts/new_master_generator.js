#!/usr/bin/env node
/**
 * New Master Template Generator for PeakPack Ad Variants
 * Based on updated Figma master with actual product image
 */

const fs = require('fs');
const path = require('path');

// Read the existing variants from our generator
const { variants } = require('./ad_variant_generator.js');

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

// Generate HTML template for each variant with new design
function generateNewHTML(variant) {
  const persona = personaContent[variant.persona];
  const [width, height] = variant.format.split('x').map(Number);
  
  // Calculate scaling factors for different formats
  const isSquare = variant.format === '1200x1200';
  const isVertical = variant.format === '960x1200';
  const isLandscape = variant.format === '1200x628';
  
  let headlineSize = isVertical ? '32px' : isSquare ? '46px' : '56px';
  let descriptionSize = isVertical ? '14px' : isSquare ? '18px' : '22px';
  let priceSize = isVertical ? '14px' : isSquare ? '18px' : '20px';
  let ctaSize = isVertical ? '14px' : isSquare ? '18px' : '20px';
  
  return `<!DOCTYPE html>
<html lang="en">
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
            right: 30.08%;
            bottom: 27.87%;
        }
        
        .headline {
            font-weight: 700;
            font-style: italic;
            font-size: ${headlineSize};
            color: #f8fafc;
            line-height: 1.1;
            margin-bottom: 20px;
        }
        
        .description {
            font-size: ${descriptionSize};
            color: #e2e8f0;
            line-height: 1.3;
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
        
        .cta-section {
            display: flex;
            align-items: center;
            gap: 20px;
            margin-bottom: 20px;
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
        }
        
        .price {
            font-weight: 700;
            font-style: italic;
            font-size: ${priceSize};
            color: #f8fafc;
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
            bottom: 35%;
            left: 50%;
        }
        .content {
            top: 35%;
            left: 5%;
            right: 50%;
            bottom: 15%;
        }
        .brand {
            top: 3%;
            left: 5%;
            right: 50%;
        }
        .headline {
            font-size: 32px !important;
            line-height: 1.1;
        }
        .description {
            font-size: 14px !important;
            line-height: 1.4;
        }
        .cta-button {
            font-size: 14px !important;
            padding: 10px 20px !important;
        }
        .price {
            font-size: 14px !important;
        }
        .legal {
            font-size: 10px !important;
        }
        ` : ''}
        
        ${isSquare ? `
        .headline {
            font-size: 46px !important;
        }
        .description {
            font-size: 18px !important;
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
                src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                alt="PeakPack Pro 30L Backpack"
                class="product-image"
            />
        </div>
        
        <div class="content">
            <h1 class="headline">${persona.headline}</h1>
            <p class="description">${persona.description}</p>
            <div class="badge">New • 20% lighter</div>
            
            <div class="cta-section">
                <button class="cta-button">${variant.cta}</button>
                <div class="price">${variant.price}</div>
            </div>
            
            <p class="legal">* Limited-time introductory price. ${variant.localeNotice}</p>
        </div>
        
        <div class="format-label">
            ${variant.format} ${variant.personaName.toLowerCase()} • ${variant.locale}
        </div>
    </div>
</body>
</html>`;
}

// Generate all HTML files with new design
async function generateNewMasterVariants() {
  try {
    console.log("🚀 Generating new master template ad variants...");
    
    const outputBaseDir = path.join(__dirname, '../output/ad_variants_v2');
    const htmlDir = path.join(outputBaseDir, 'html');
    
    // Create directories
    if (!fs.existsSync(htmlDir)) {
      fs.mkdirSync(htmlDir, { recursive: true });
    }
    
    // Generate manifest
    const manifest = {
      generatedAt: new Date().toISOString(),
      version: "2.0",
      description: "Updated variants with new Figma master template",
      totalVariants: variants.length,
      variants: []
    };
    
    // Generate each variant
    for (const [index, variant] of variants.entries()) {
      console.log(`\n${index + 1}. ${variant.exportName}`);
      console.log(`   Persona: ${variant.personaName} (${variant.personaAngle})`);
      console.log(`   Locale: ${variant.locale} - ${variant.price} - "${variant.cta}"`);
      console.log(`   Format: ${variant.format}`);
      
      const htmlContent = generateNewHTML(variant);
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
        headline: personaContent[variant.persona].headline,
        description: personaContent[variant.persona].description,
        price: variant.price,
        cta: variant.cta
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
    <title>PeakPack Ad Variants V2 - Gallery</title>
    <style>
        body { font-family: Inter, sans-serif; margin: 40px; background: #f8fafc; }
        h1 { color: #0f172a; margin-bottom: 40px; }
        .version-badge { background: #f59e0b; color: #0f172a; padding: 4px 12px; border-radius: 20px; font-size: 14px; font-weight: 700; }
        .gallery { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-top: 40px; }
        .variant { background: white; border-radius: 8px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .variant h3 { margin: 0 0 10px 0; color: #1e293b; }
        .variant iframe { width: 100%; height: 200px; border: 1px solid #e2e8f0; border-radius: 4px; }
        .details { margin-top: 10px; font-size: 14px; color: #64748b; }
    </style>
</head>
<body>
    <h1>PeakPack Ad Variants <span class="version-badge">V2.0</span></h1>
    <p>Updated with new master template featuring actual product imagery (${variants.length} total variants)</p>
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
        </div>
        `).join('')}
    </div>
</body>
</html>`;
    
    fs.writeFileSync(path.join(htmlDir, 'index.html'), indexHTML);
    
    console.log(`\n✅ Successfully generated ${variants.length} new master template variants!`);
    console.log(`📁 Files saved to: ${htmlDir}`);
    console.log(`📋 Manifest: manifest.json`);
    console.log(`🖼️ Gallery: index.html`);
    console.log(`\n🆕 New features:`);
    console.log(`   ✨ Real product image instead of placeholder`);
    console.log(`   ✨ Enhanced visual styling`);
    console.log(`   ✨ Improved button shadow effects`);
    
  } catch (error) {
    console.error('❌ Error generating new master variants:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  generateNewMasterVariants();
}

module.exports = { generateNewMasterVariants, generateNewHTML, variants };