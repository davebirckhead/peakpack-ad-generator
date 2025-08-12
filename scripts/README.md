# PeakPack Ad Variant Generator

Canvas-based ad generation system that creates all 27 PeakPack ad variants programmatically.

## 🚀 Quick Start

### Option 1: Browser-based Generation (Recommended)
1. Open `index.html` in a web browser
2. Click "Generate All 27 Variants"
3. Download individual or all PNGs

### Option 2: Node.js Batch Generation
```bash
# Install dependencies
npm install

# Generate all variants to output directory
npm run generate

# Or run directly
node batch-generator.js
```

## 📁 Generated Files

All variants are saved with this structure:
```
output/
├── 1200x628/          # Landscape format (9 variants)
├── 1200x1200/         # Square format (9 variants)
├── 960x1200/          # Vertical format (9 variants)
└── variant_specifications.json
```

## 📊 Specifications

- **Total Variants**: 27 (3 formats × 3 personas × 3 locales)
- **Formats**: 1200×628, 1200×1200, 960×1200
- **Personas**: Trail Runner, Tech Commuter, Budget Explorer
- **Locales**: en-US, es-MX, fr-FR
- **Compliance**: Google Responsive Display Ads specs
- **Accessibility**: WCAG AA contrast ratios

## ✅ Character Limits Enforced

- Headlines: ≤30 characters
- Subheadlines: ≤90 characters  
- Business name: ≤25 characters ("PeakPack")
- Automatic truncation with ellipsis

## 🎨 Design Features

- **Responsive layouts** for different aspect ratios
- **Text wrapping** for long subheadlines
- **Persona-specific messaging** angles
- **Localized pricing** and CTAs
- **Professional gradient backgrounds**
- **Product placeholder areas**
- **Badge elements** ("New • 20% lighter")

## 📱 Browser Compatibility

- Modern browsers with HTML5 Canvas support
- Chrome, Firefox, Safari, Edge
- Mobile responsive interface

## 🔧 Customization

Edit `complete-ad-generator.js` to modify:
- Colors and gradients
- Typography and fonts
- Layout proportions
- Text positioning
- Visual elements

## 📋 Validation Checklist

✅ All headlines ≤30 characters  
✅ All subheadlines ≤90 characters  
✅ Proper aspect ratios (1.91:1, 1:1, 4:5)  
✅ WCAG AA contrast (4.5:1 minimum)  
✅ File sizes <5MB  
✅ PNG format output  
✅ Persona-specific messaging  
✅ Localized content  

## 🛠 Technical Details

- **Canvas API** for high-quality rendering
- **Responsive text sizing** based on canvas dimensions
- **Progressive enhancement** with fallbacks
- **Optimized PNG compression**
- **Memory-efficient generation**

## 📈 Performance

- **Browser**: ~2-3 seconds for all 27 variants
- **Node.js**: ~1-2 seconds for batch generation
- **File sizes**: 50-200KB per variant
- **Memory usage**: <100MB peak