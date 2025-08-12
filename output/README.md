# Ad Variants Output

This directory contains the exported ad variants and specifications.

## Structure

```
output/
├── 1200x628/          # Landscape format exports
├── 1200x1200/         # Square format exports  
├── 960x1200/          # Vertical format exports
├── variant_specifications.json  # Complete variant specifications
└── README.md          # This file
```

## Workflow

1. **Create Figma Frames**: In Figma, duplicate the master frame 27 times using the frame names from `variant_specifications.json`
2. **Update Content**: Apply the copy (headline, subheadline, price, CTA, legal) from the specifications to each frame
3. **Export Assets**: Export each frame as PNG to the appropriate format directory using the `export_filename` from specifications
4. **Quality Check**: Ensure all exports meet Google RDA specs and maintain WCAG AA contrast

## Specifications

- **Total Variants**: 27 (3 formats × 3 personas × 3 locales)
- **Formats**: 1200×628 (landscape), 1200×1200 (square), 960×1200 (vertical)
- **Personas**: Trail Runner, Tech Commuter, Budget Explorer
- **Locales**: en-US, es-MX, fr-FR
- **Character Limits**: Headlines ≤30, Subheadlines ≤90, Business name ≤25
- **File Size**: Max 5MB per image