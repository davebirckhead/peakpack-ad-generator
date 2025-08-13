const puppeteer = require('puppeteer');
const path = require('path');

const variants = [
  {
    "fileName": "1200x1200_budget_explorer_en_US.html",
    "pngFileName": "1200x1200_budget_explorer_en_US.png",
    "format": "1200x1200",
    "persona": "budget_explorer",
    "locale": "en-US",
    "htmlPath": "/Users/davebirckhead/ai-playground/creative-production/output/ad_variants/html/1200x1200_budget_explorer_en_US.html",
    "headline": "Smart Value. Big Adventures.",
    "description": "Student-friendly durability. Weatherproof. Lifetime warranty.",
    "price": "$129",
    "cta": "Shop now"
  },
  {
    "fileName": "1200x1200_budget_explorer_es_MX.html",
    "pngFileName": "1200x1200_budget_explorer_es_MX.png",
    "format": "1200x1200",
    "persona": "budget_explorer",
    "locale": "es-MX",
    "htmlPath": "/Users/davebirckhead/ai-playground/creative-production/output/ad_variants/html/1200x1200_budget_explorer_es_MX.html",
    "headline": "Smart Value. Big Adventures.",
    "description": "Student-friendly durability. Weatherproof. Lifetime warranty.",
    "price": "$2,190",
    "cta": "Compra ahora"
  },
  {
    "fileName": "1200x1200_budget_explorer_fr_FR.html",
    "pngFileName": "1200x1200_budget_explorer_fr_FR.png",
    "format": "1200x1200",
    "persona": "budget_explorer",
    "locale": "fr-FR",
    "htmlPath": "/Users/davebirckhead/ai-playground/creative-production/output/ad_variants/html/1200x1200_budget_explorer_fr_FR.html",
    "headline": "Smart Value. Big Adventures.",
    "description": "Student-friendly durability. Weatherproof. Lifetime warranty.",
    "price": "129 €",
    "cta": "Acheter"
  },
  {
    "fileName": "1200x1200_tech_commuter_en_US.html",
    "pngFileName": "1200x1200_tech_commuter_en_US.png",
    "format": "1200x1200",
    "persona": "tech_commuter",
    "locale": "en-US",
    "htmlPath": "/Users/davebirckhead/ai-playground/creative-production/output/ad_variants/html/1200x1200_tech_commuter_en_US.html",
    "headline": "Work Smart. Travel Sleek.",
    "description": "Laptop-safe design. TSA-friendly. Professional style.",
    "price": "$129",
    "cta": "Shop now"
  },
  {
    "fileName": "1200x1200_tech_commuter_es_MX.html",
    "pngFileName": "1200x1200_tech_commuter_es_MX.png",
    "format": "1200x1200",
    "persona": "tech_commuter",
    "locale": "es-MX",
    "htmlPath": "/Users/davebirckhead/ai-playground/creative-production/output/ad_variants/html/1200x1200_tech_commuter_es_MX.html",
    "headline": "Work Smart. Travel Sleek.",
    "description": "Laptop-safe design. TSA-friendly. Professional style.",
    "price": "$2,190",
    "cta": "Compra ahora"
  },
  {
    "fileName": "1200x1200_tech_commuter_fr_FR.html",
    "pngFileName": "1200x1200_tech_commuter_fr_FR.png",
    "format": "1200x1200",
    "persona": "tech_commuter",
    "locale": "fr-FR",
    "htmlPath": "/Users/davebirckhead/ai-playground/creative-production/output/ad_variants/html/1200x1200_tech_commuter_fr_FR.html",
    "headline": "Work Smart. Travel Sleek.",
    "description": "Laptop-safe design. TSA-friendly. Professional style.",
    "price": "129 €",
    "cta": "Acheter"
  },
  {
    "fileName": "1200x1200_trail_runner_en_US.html",
    "pngFileName": "1200x1200_trail_runner_en_US.png",
    "format": "1200x1200",
    "persona": "trail_runner",
    "locale": "en-US",
    "htmlPath": "/Users/davebirckhead/ai-playground/creative-production/output/ad_variants/html/1200x1200_trail_runner_en_US.html",
    "headline": "Light Weight. Zero Bounce.",
    "description": "Breathable mesh. Bounce-free design. Built for trails.",
    "price": "$129",
    "cta": "Shop now"
  },
  {
    "fileName": "1200x1200_trail_runner_es_MX.html",
    "pngFileName": "1200x1200_trail_runner_es_MX.png",
    "format": "1200x1200",
    "persona": "trail_runner",
    "locale": "es-MX",
    "htmlPath": "/Users/davebirckhead/ai-playground/creative-production/output/ad_variants/html/1200x1200_trail_runner_es_MX.html",
    "headline": "Light Weight. Zero Bounce.",
    "description": "Breathable mesh. Bounce-free design. Built for trails.",
    "price": "$2,190",
    "cta": "Compra ahora"
  },
  {
    "fileName": "1200x1200_trail_runner_fr_FR.html",
    "pngFileName": "1200x1200_trail_runner_fr_FR.png",
    "format": "1200x1200",
    "persona": "trail_runner",
    "locale": "fr-FR",
    "htmlPath": "/Users/davebirckhead/ai-playground/creative-production/output/ad_variants/html/1200x1200_trail_runner_fr_FR.html",
    "headline": "Light Weight. Zero Bounce.",
    "description": "Breathable mesh. Bounce-free design. Built for trails.",
    "price": "129 €",
    "cta": "Acheter"
  },
  {
    "fileName": "1200x628_budget_explorer_en_US.html",
    "pngFileName": "1200x628_budget_explorer_en_US.png",
    "format": "1200x628",
    "persona": "budget_explorer",
    "locale": "en-US",
    "htmlPath": "/Users/davebirckhead/ai-playground/creative-production/output/ad_variants/html/1200x628_budget_explorer_en_US.html",
    "headline": "Smart Value. Big Adventures.",
    "description": "Student-friendly durability. Weatherproof. Lifetime warranty.",
    "price": "$129",
    "cta": "Shop now"
  },
  {
    "fileName": "1200x628_budget_explorer_es_MX.html",
    "pngFileName": "1200x628_budget_explorer_es_MX.png",
    "format": "1200x628",
    "persona": "budget_explorer",
    "locale": "es-MX",
    "htmlPath": "/Users/davebirckhead/ai-playground/creative-production/output/ad_variants/html/1200x628_budget_explorer_es_MX.html",
    "headline": "Smart Value. Big Adventures.",
    "description": "Student-friendly durability. Weatherproof. Lifetime warranty.",
    "price": "$2,190",
    "cta": "Compra ahora"
  },
  {
    "fileName": "1200x628_budget_explorer_fr_FR.html",
    "pngFileName": "1200x628_budget_explorer_fr_FR.png",
    "format": "1200x628",
    "persona": "budget_explorer",
    "locale": "fr-FR",
    "htmlPath": "/Users/davebirckhead/ai-playground/creative-production/output/ad_variants/html/1200x628_budget_explorer_fr_FR.html",
    "headline": "Smart Value. Big Adventures.",
    "description": "Student-friendly durability. Weatherproof. Lifetime warranty.",
    "price": "129 €",
    "cta": "Acheter"
  },
  {
    "fileName": "1200x628_tech_commuter_en_US.html",
    "pngFileName": "1200x628_tech_commuter_en_US.png",
    "format": "1200x628",
    "persona": "tech_commuter",
    "locale": "en-US",
    "htmlPath": "/Users/davebirckhead/ai-playground/creative-production/output/ad_variants/html/1200x628_tech_commuter_en_US.html",
    "headline": "Work Smart. Travel Sleek.",
    "description": "Laptop-safe design. TSA-friendly. Professional style.",
    "price": "$129",
    "cta": "Shop now"
  },
  {
    "fileName": "1200x628_tech_commuter_es_MX.html",
    "pngFileName": "1200x628_tech_commuter_es_MX.png",
    "format": "1200x628",
    "persona": "tech_commuter",
    "locale": "es-MX",
    "htmlPath": "/Users/davebirckhead/ai-playground/creative-production/output/ad_variants/html/1200x628_tech_commuter_es_MX.html",
    "headline": "Work Smart. Travel Sleek.",
    "description": "Laptop-safe design. TSA-friendly. Professional style.",
    "price": "$2,190",
    "cta": "Compra ahora"
  },
  {
    "fileName": "1200x628_tech_commuter_fr_FR.html",
    "pngFileName": "1200x628_tech_commuter_fr_FR.png",
    "format": "1200x628",
    "persona": "tech_commuter",
    "locale": "fr-FR",
    "htmlPath": "/Users/davebirckhead/ai-playground/creative-production/output/ad_variants/html/1200x628_tech_commuter_fr_FR.html",
    "headline": "Work Smart. Travel Sleek.",
    "description": "Laptop-safe design. TSA-friendly. Professional style.",
    "price": "129 €",
    "cta": "Acheter"
  },
  {
    "fileName": "1200x628_trail_runner_en_US.html",
    "pngFileName": "1200x628_trail_runner_en_US.png",
    "format": "1200x628",
    "persona": "trail_runner",
    "locale": "en-US",
    "htmlPath": "/Users/davebirckhead/ai-playground/creative-production/output/ad_variants/html/1200x628_trail_runner_en_US.html",
    "headline": "Light Weight. Zero Bounce.",
    "description": "Breathable mesh. Bounce-free design. Built for trails.",
    "price": "$129",
    "cta": "Shop now"
  },
  {
    "fileName": "1200x628_trail_runner_es_MX.html",
    "pngFileName": "1200x628_trail_runner_es_MX.png",
    "format": "1200x628",
    "persona": "trail_runner",
    "locale": "es-MX",
    "htmlPath": "/Users/davebirckhead/ai-playground/creative-production/output/ad_variants/html/1200x628_trail_runner_es_MX.html",
    "headline": "Light Weight. Zero Bounce.",
    "description": "Breathable mesh. Bounce-free design. Built for trails.",
    "price": "$2,190",
    "cta": "Compra ahora"
  },
  {
    "fileName": "1200x628_trail_runner_fr_FR.html",
    "pngFileName": "1200x628_trail_runner_fr_FR.png",
    "format": "1200x628",
    "persona": "trail_runner",
    "locale": "fr-FR",
    "htmlPath": "/Users/davebirckhead/ai-playground/creative-production/output/ad_variants/html/1200x628_trail_runner_fr_FR.html",
    "headline": "Light Weight. Zero Bounce.",
    "description": "Breathable mesh. Bounce-free design. Built for trails.",
    "price": "129 €",
    "cta": "Acheter"
  },
  {
    "fileName": "960x1200_budget_explorer_en_US.html",
    "pngFileName": "960x1200_budget_explorer_en_US.png",
    "format": "960x1200",
    "persona": "budget_explorer",
    "locale": "en-US",
    "htmlPath": "/Users/davebirckhead/ai-playground/creative-production/output/ad_variants/html/960x1200_budget_explorer_en_US.html",
    "headline": "Smart Value. Big Adventures.",
    "description": "Student-friendly durability. Weatherproof. Lifetime warranty.",
    "price": "$129",
    "cta": "Shop now"
  },
  {
    "fileName": "960x1200_budget_explorer_es_MX.html",
    "pngFileName": "960x1200_budget_explorer_es_MX.png",
    "format": "960x1200",
    "persona": "budget_explorer",
    "locale": "es-MX",
    "htmlPath": "/Users/davebirckhead/ai-playground/creative-production/output/ad_variants/html/960x1200_budget_explorer_es_MX.html",
    "headline": "Smart Value. Big Adventures.",
    "description": "Student-friendly durability. Weatherproof. Lifetime warranty.",
    "price": "$2,190",
    "cta": "Compra ahora"
  },
  {
    "fileName": "960x1200_budget_explorer_fr_FR.html",
    "pngFileName": "960x1200_budget_explorer_fr_FR.png",
    "format": "960x1200",
    "persona": "budget_explorer",
    "locale": "fr-FR",
    "htmlPath": "/Users/davebirckhead/ai-playground/creative-production/output/ad_variants/html/960x1200_budget_explorer_fr_FR.html",
    "headline": "Smart Value. Big Adventures.",
    "description": "Student-friendly durability. Weatherproof. Lifetime warranty.",
    "price": "129 €",
    "cta": "Acheter"
  },
  {
    "fileName": "960x1200_tech_commuter_en_US.html",
    "pngFileName": "960x1200_tech_commuter_en_US.png",
    "format": "960x1200",
    "persona": "tech_commuter",
    "locale": "en-US",
    "htmlPath": "/Users/davebirckhead/ai-playground/creative-production/output/ad_variants/html/960x1200_tech_commuter_en_US.html",
    "headline": "Work Smart. Travel Sleek.",
    "description": "Laptop-safe design. TSA-friendly. Professional style.",
    "price": "$129",
    "cta": "Shop now"
  },
  {
    "fileName": "960x1200_tech_commuter_es_MX.html",
    "pngFileName": "960x1200_tech_commuter_es_MX.png",
    "format": "960x1200",
    "persona": "tech_commuter",
    "locale": "es-MX",
    "htmlPath": "/Users/davebirckhead/ai-playground/creative-production/output/ad_variants/html/960x1200_tech_commuter_es_MX.html",
    "headline": "Work Smart. Travel Sleek.",
    "description": "Laptop-safe design. TSA-friendly. Professional style.",
    "price": "$2,190",
    "cta": "Compra ahora"
  },
  {
    "fileName": "960x1200_tech_commuter_fr_FR.html",
    "pngFileName": "960x1200_tech_commuter_fr_FR.png",
    "format": "960x1200",
    "persona": "tech_commuter",
    "locale": "fr-FR",
    "htmlPath": "/Users/davebirckhead/ai-playground/creative-production/output/ad_variants/html/960x1200_tech_commuter_fr_FR.html",
    "headline": "Work Smart. Travel Sleek.",
    "description": "Laptop-safe design. TSA-friendly. Professional style.",
    "price": "129 €",
    "cta": "Acheter"
  },
  {
    "fileName": "960x1200_trail_runner_en_US.html",
    "pngFileName": "960x1200_trail_runner_en_US.png",
    "format": "960x1200",
    "persona": "trail_runner",
    "locale": "en-US",
    "htmlPath": "/Users/davebirckhead/ai-playground/creative-production/output/ad_variants/html/960x1200_trail_runner_en_US.html",
    "headline": "Light Weight. Zero Bounce.",
    "description": "Breathable mesh. Bounce-free design. Built for trails.",
    "price": "$129",
    "cta": "Shop now"
  },
  {
    "fileName": "960x1200_trail_runner_es_MX.html",
    "pngFileName": "960x1200_trail_runner_es_MX.png",
    "format": "960x1200",
    "persona": "trail_runner",
    "locale": "es-MX",
    "htmlPath": "/Users/davebirckhead/ai-playground/creative-production/output/ad_variants/html/960x1200_trail_runner_es_MX.html",
    "headline": "Light Weight. Zero Bounce.",
    "description": "Breathable mesh. Bounce-free design. Built for trails.",
    "price": "$2,190",
    "cta": "Compra ahora"
  },
  {
    "fileName": "960x1200_trail_runner_fr_FR.html",
    "pngFileName": "960x1200_trail_runner_fr_FR.png",
    "format": "960x1200",
    "persona": "trail_runner",
    "locale": "fr-FR",
    "htmlPath": "/Users/davebirckhead/ai-playground/creative-production/output/ad_variants/html/960x1200_trail_runner_fr_FR.html",
    "headline": "Light Weight. Zero Bounce.",
    "description": "Breathable mesh. Bounce-free design. Built for trails.",
    "price": "129 €",
    "cta": "Acheter"
  }
];

async function convertAll() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  for (const [index, variant] of variants.entries()) {
    console.log(`${index + 1}. Converting ${variant.fileName} to PNG...`);
    
    const htmlPath = path.join(__dirname, '../output/ad_variants/html', variant.fileName);
    const pngPath = path.join(__dirname, '../output/ad_variants/png', variant.pngFileName);
    
    await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });
    
    const [width, height] = variant.format.split('x').map(Number);
    await page.setViewport({ width, height });
    await page.screenshot({
      path: pngPath,
      clip: { x: 0, y: 0, width, height },
      type: 'png'
    });
    
    console.log(`   ✓ Generated ${variant.pngFileName}`);
  }
  
  await browser.close();
  console.log('\n✅ All PNG files generated!');
}

convertAll().catch(console.error);