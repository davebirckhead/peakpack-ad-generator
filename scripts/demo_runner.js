#!/usr/bin/env node
/**
 * PeakPack Ad Generator Demo Runner
 * Interactive demo script for showcasing the prototype
 */

const fs = require('fs');
const path = require('path');

// Demo configuration
const DEMO_CONFIG = {
  projectName: "PeakPack Ad Generator",
  figmaUrl: "https://www.figma.com/design/6Ax342VlJSvcvEPM9cCxjV/ad-master?node-id=7-650",
  totalVariants: 27,
  personas: 3,
  locales: 3,
  formats: 3
};

// ANSI colors for better terminal output
const colors = {
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

class DemoRunner {
  constructor() {
    this.currentStep = 0;
    this.totalSteps = 6;
  }

  log(message, color = colors.reset) {
    console.log(`${color}${message}${colors.reset}`);
  }

  header(title) {
    console.log('\n' + '='.repeat(60));
    this.log(`${colors.bold}${colors.cyan}${title}${colors.reset}`);
    console.log('='.repeat(60));
  }

  step(title) {
    this.currentStep++;
    this.log(`\n${colors.yellow}[Step ${this.currentStep}/${this.totalSteps}] ${title}${colors.reset}`);
  }

  success(message) {
    this.log(`${colors.green}✅ ${message}${colors.reset}`);
  }

  info(message) {
    this.log(`${colors.blue}ℹ️  ${message}${colors.reset}`);
  }

  warning(message) {
    this.log(`${colors.yellow}⚠️  ${message}${colors.reset}`);
  }

  async pause(message = "Press Enter to continue...") {
    return new Promise(resolve => {
      process.stdout.write(`\n${colors.cyan}${message}${colors.reset}`);
      process.stdin.once('data', () => resolve());
    });
  }

  showProjectStructure() {
    const structure = `
📁 creative-production/
├── 📄 config/ad_variant_plan.yaml    # Campaign configuration
├── 📊 data/ad_variants_matrix.csv    # ${DEMO_CONFIG.totalVariants} variant specifications  
├── 🎨 figma_assets/                  # Design templates
└── 🔧 scripts/                       # Generation tools
    ├── ad_variant_generator.js       # Variant generator
    ├── demo_script.md                # This demo guide
    └── demo_runner.js                # Interactive demo
`;
    this.log(structure);
  }

  showVariantMatrix() {
    this.log(`
${colors.bold}Variant Generation Matrix:${colors.reset}

${colors.green}Personas (${DEMO_CONFIG.personas}):${colors.reset}
• Trail Runner    → "Lightweight, bounce-free, breathable"
• Tech Commuter   → "Laptop-safe, TSA-friendly, sleek"  
• Budget Explorer → "Durable value, student-friendly"

${colors.blue}Locales (${DEMO_CONFIG.locales}):${colors.reset}
• en-US → $129 USD    + "Shop now"      + "Ships free in the U.S."
• es-MX → $2,190 MXN  + "Compra ahora"  + "Envío gratis en México"
• fr-FR → 129 € EUR   + "Acheter"       + "Livraison gratuite en France"

${colors.yellow}Formats (${DEMO_CONFIG.formats}):${colors.reset}
• 1200x1200 (1:1)     → Square format
• 1200x628  (1.91:1)  → Landscape format
• 960x1200  (4:5)     → Vertical format

${colors.bold}Total: ${DEMO_CONFIG.totalVariants} unique ad variants${colors.reset}
`);
  }

  showClaudeCodeCommand() {
    const command = `claude "generate all ad variants based on this Figma master asset ${DEMO_CONFIG.figmaUrl}"`;
    
    this.log(`\n${colors.bold}Claude Code Command:${colors.reset}`);
    this.log(`${colors.cyan}${command}${colors.reset}\n`);
    
    this.info("This command demonstrates:");
    this.log("• Automatic URL parsing and node ID extraction");
    this.log("• Figma MCP integration for design data access");
    this.log("• Systematic variant generation with persona/locale customization");
    this.log("• Google Ads compliance validation");
  }

  showGeneratedOutput() {
    this.log(`
${colors.bold}Generated Output Preview:${colors.reset}

${colors.green}1. 1200x1200_budget_explorer_en-US.png${colors.reset}
   Persona: Budget Explorer (Durable value, student-friendly)
   Locale: en-US - $129 - "Shop now"
   Notice: Ships free in the U.S.

${colors.green}2. 1200x1200_tech_commuter_es-MX.png${colors.reset}
   Persona: Tech Commuter (Seguro para laptop, amigable TSA, elegante)
   Locale: es-MX - $2,190 - "Compra ahora"  
   Notice: Envío gratis en México

${colors.green}3. 1200x1200_trail_runner_fr-FR.png${colors.reset}
   Persona: Trail Runner (Léger, sans rebond, respirant)
   Locale: fr-FR - 129 € - "Acheter"
   Notice: Livraison gratuite en France

${colors.blue}... and 24 more variants${colors.reset}
`);
  }

  showBusinessImpact() {
    this.log(`
${colors.bold}Business Impact:${colors.reset}

${colors.green}⚡ Speed:${colors.reset}        27 variants in <2 minutes (vs 8-10 hours manual)
${colors.green}🎯 Consistency:${colors.reset}  100% brand compliance across all variants  
${colors.green}📏 Compliance:${colors.reset}   Auto-adherence to Google Ads character limits
${colors.green}📈 Scalability:${colors.reset}  Easy to add personas, locales, formats
${colors.green}💎 Quality:${colors.reset}      Maintains design system integrity
`);
  }

  async runDemo() {
    this.header(`${DEMO_CONFIG.projectName} - Interactive Demo`);
    
    this.info(`Welcome to the ${DEMO_CONFIG.projectName} prototype demonstration!`);
    this.info("This demo shows automated ad variant generation using Claude Code + Figma MCP.");
    
    await this.pause();

    // Step 1: Project Overview
    this.step("Project Structure & Configuration");
    this.showProjectStructure();
    await this.pause();

    // Step 2: The Challenge
    this.step("The Variant Generation Challenge");
    this.showVariantMatrix();
    await this.pause();

    // Step 3: Figma Master Template
    this.step("Figma Master Template");
    this.info(`Master template: ${DEMO_CONFIG.figmaUrl}`);
    this.log("• Contains placeholder content for dynamic replacement");
    this.log("• Modular design system with consistent branding");
    this.log("• Optimized for Google Responsive Display Ads");
    await this.pause();

    // Step 4: Claude Code Integration
    this.step("Claude Code + Figma MCP in Action");
    this.showClaudeCodeCommand();
    await this.pause();

    // Step 5: Generated Results
    this.step("Generated Results");
    this.showGeneratedOutput();
    this.success(`Successfully generated ${DEMO_CONFIG.totalVariants} ad variants!`);
    await this.pause();

    // Step 6: Business Impact
    this.step("Business Impact & ROI");
    this.showBusinessImpact();

    // Demo conclusion
    this.header("Demo Complete!");
    this.success("The PeakPack Ad Generator prototype demonstrates the future of AI-powered creative production.");
    this.info("Questions? Let's discuss how this could transform your creative workflows!");
    
    console.log('\n');
  }

  // Quick stats method for elevator pitch
  showQuickStats() {
    this.header("Quick Stats");
    this.log(`${colors.bold}${colors.green}27 variants${colors.reset} generated automatically`);
    this.log(`${colors.bold}${colors.blue}2 minutes${colors.reset} vs 8-10 hours manual work`);
    this.log(`${colors.bold}${colors.yellow}100% compliant${colors.reset} with Google Ads specifications`);
    this.log(`${colors.bold}${colors.cyan}3 languages${colors.reset} with localized pricing & CTAs`);
    console.log('\n');
  }
}

// Main execution
async function main() {
  const demo = new DemoRunner();
  
  // Check for quick stats flag
  if (process.argv.includes('--quick')) {
    demo.showQuickStats();
    return;
  }
  
  // Check for help flag
  if (process.argv.includes('--help') || process.argv.includes('-h')) {
    console.log(`
Usage: node demo_runner.js [options]

Options:
  --quick, -q    Show quick stats only
  --help, -h     Show this help message
  
Default: Run full interactive demo
`);
    return;
  }

  // Run full demo
  await demo.runDemo();
}

// Handle Ctrl+C gracefully
process.on('SIGINT', () => {
  console.log('\n\n👋 Demo interrupted. Thanks for watching!');
  process.exit(0);
});

if (require.main === module) {
  main().catch(console.error);
}

module.exports = DemoRunner;