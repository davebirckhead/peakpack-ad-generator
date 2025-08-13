# PeakPack Ad Generator Demo Script
*A Claude Code + Figma MCP Prototype*

---

## 🎯 Demo Overview (2-3 minutes)
This prototype demonstrates automated ad variant generation using Claude Code's Figma MCP integration for the fictional "PeakPack Pro 30L" backpack campaign.

---

## 📋 Demo Checklist
- [ ] Figma file open: `https://www.figma.com/design/6Ax342VlJSvcvEPM9cCxjV/ad-master?node-id=7-650`
- [ ] Claude Code terminal ready
- [ ] Project files accessible in `/Users/davebirckhead/ai-playground/creative-production/`

---

## 🎬 Demo Script

### 1. Introduction (30 seconds)
> "Today I'm going to show you a prototype that automates ad variant generation using Claude Code's new Figma MCP integration. We're creating 27 unique ad variants for PeakPack backpacks across different personas, locales, and formats."

**Show**: Project structure
```
creative-production/
├── config/ad_variant_plan.yaml    # Campaign configuration
├── data/ad_variants_matrix.csv    # 27 variant specifications
└── figma_assets/                  # Design templates
```

### 2. The Challenge (45 seconds)
> "Traditional ad variant creation is manual and time-consuming. For this campaign, we need:"

**Show**: Open `data/ad_variants_matrix.csv`
- **3 personas**: Trail Runner, Tech Commuter, Budget Explorer
- **3 locales**: en-US ($129), es-MX ($2,190 MXN), fr-FR (129 €)
- **3 formats**: 1200x1200 (square), 1200x628 (landscape), 960x1200 (vertical)
- **= 27 total variants** with Google Ads compliance

### 3. The Figma Master Template (30 seconds)
> "Here's our starting point - a master ad template in Figma with placeholder content."

**Show**: Switch to Figma, display the master asset
- Point out placeholder text: `{persona}`, `{locale_notice}`
- Highlight modular design structure
- Note the 1200x628 landscape format

### 4. Claude Code + Figma MCP in Action (60 seconds)
> "Now watch Claude Code automatically generate all variants using the Figma MCP."

**Show**: Terminal demonstration
```bash
# Navigate to project
cd creative-production/scripts

# Run the generator (this is the money shot!)
claude "generate all ad variants based on this Figma master asset https://www.figma.com/design/6Ax342VlJSvcvEPM9cCxjV/ad-master?node-id=7-650&t=Fu5bCEdtdlvZ2prm-11"
```

**Highlight key moments**:
- Claude extracts node ID from URL automatically
- Reads the master template structure
- Systematically generates variants with:
  - Persona-specific messaging
  - Localized pricing and CTAs
  - Compliance with Google Ads specs

### 5. Generated Results (45 seconds)
> "In seconds, Claude generated systematic code for all 27 variants."

**Show**: Open `scripts/ad_variant_generator.js`
- Point out persona customization:
  ```javascript
  // Budget Explorer: "Durable value, student-friendly"
  // Tech Commuter: "Laptop-safe, TSA-friendly, sleek"  
  // Trail Runner: "Lightweight, bounce-free, breathable"
  ```
- Show localization:
  ```javascript
  // en-US: "$129" + "Shop now" + "Ships free in the U.S."
  // es-MX: "$2,190" + "Compra ahora" + "Envío gratis en México"
  // fr-FR: "129 €" + "Acheter" + "Livraison gratuite en France"
  ```

### 6. The Business Impact (30 seconds)
> "This prototype demonstrates how AI can transform creative production workflows."

**Key benefits**:
- **Speed**: 27 variants generated in under 2 minutes
- **Consistency**: All variants follow design system and brand guidelines
- **Compliance**: Automatic adherence to Google Ads character limits
- **Scalability**: Easy to add new personas, locales, or formats
- **Quality**: Maintains design integrity across all variants

---

## 🎤 Potential Q&A

**Q: "How does it handle different ad formats?"**
> A: The system automatically adjusts CSS classes and dimensions for each format - square (1:1), landscape (1.91:1), and vertical (4:5) ratios, all optimized for Google Responsive Display Ads.

**Q: "What about brand consistency?"**
> A: All variants use the same design system, fonts, colors, and layout structure. Only the persona messaging, pricing, and localization change while maintaining visual consistency.

**Q: "Could this work with real product data?"**
> A: Absolutely. The system is designed to pull from any data source - CMS, product catalogs, or marketing databases. The YAML configuration makes it easy to update campaigns.

**Q: "How does this compare to manual design work?"**
> A: This would typically take a designer 8-10 hours to create manually. With Claude Code + Figma MCP, it's done in under 2 minutes with perfect consistency.

---

## 🚀 Demo Wrap-up (15 seconds)
> "This prototype shows the future of creative production - where AI handles the systematic work, letting creatives focus on strategy and innovation. The combination of Claude Code's reasoning with Figma's design tools opens up entirely new workflows."

---

## 📊 Technical Notes for Follow-up

- **MCP Integration**: Uses Claude Code's Model Context Protocol for direct Figma API access
- **Data-Driven**: YAML configuration + CSV matrix drives all variant generation
- **Standards Compliant**: Follows Google Ads specs, responsive design principles
- **Scalable Architecture**: Easy to extend to new channels, formats, or campaigns
- **Code Output**: Generates production-ready React components with Tailwind CSS

---

*Demo Duration: ~4 minutes total*
*Best for: Product managers, creative directors, marketing teams, technical stakeholders*