// Complete Ad Variant Generator with all 27 variants
class AdVariantGenerator {
    constructor() {
        this.variants = [
            // 1200x628 variants
            {
                "frame_name": "Ad/1200x628/TrailRunner/en-US",
                "format": "1200x628",
                "persona": "Trail Runner",
                "locale": "en-US",
                "headline": "Go Farther. Stay Light.",
                "subheadline": "Lightweight, bounce-free, breathable design for every trail",
                "price": "$129",
                "cta": "Shop now",
                "legal": "Ships free in the U.S.",
                "export_filename": "1200x628_trail_runner_en-US.png"
            },
            {
                "frame_name": "Ad/1200x628/TrailRunner/es-MX",
                "format": "1200x628",
                "persona": "Trail Runner",
                "locale": "es-MX",
                "headline": "Ve Más Lejos. Más Ligero.",
                "subheadline": "Diseño liviano y transpirable para cada sendero",
                "price": "$2,190",
                "cta": "Compra ahora",
                "legal": "Envío gratis en México",
                "export_filename": "1200x628_trail_runner_es-MX.png"
            },
            {
                "frame_name": "Ad/1200x628/TrailRunner/fr-FR",
                "format": "1200x628",
                "persona": "Trail Runner",
                "locale": "fr-FR",
                "headline": "Plus Loin. Plus Léger.",
                "subheadline": "Design léger et respirant pour chaque sentier",
                "price": "129 €",
                "cta": "Acheter",
                "legal": "Livraison gratuite en France",
                "export_filename": "1200x628_trail_runner_fr-FR.png"
            },
            {
                "frame_name": "Ad/1200x628/TechCommuter/en-US",
                "format": "1200x628",
                "persona": "Tech Commuter",
                "locale": "en-US",
                "headline": "Laptop-Safe. TSA-Friendly.",
                "subheadline": "Sleek design for tech professionals on the go",
                "price": "$129",
                "cta": "Shop now",
                "legal": "Ships free in the U.S.",
                "export_filename": "1200x628_tech_commuter_en-US.png"
            },
            {
                "frame_name": "Ad/1200x628/TechCommuter/es-MX",
                "format": "1200x628",
                "persona": "Tech Commuter",
                "locale": "es-MX",
                "headline": "Seguro. TSA-Amigable.",
                "subheadline": "Diseño elegante para profesionales tech",
                "price": "$2,190",
                "cta": "Compra ahora",
                "legal": "Envío gratis en México",
                "export_filename": "1200x628_tech_commuter_es-MX.png"
            },
            {
                "frame_name": "Ad/1200x628/TechCommuter/fr-FR",
                "format": "1200x628",
                "persona": "Tech Commuter",
                "locale": "fr-FR",
                "headline": "Portable Sûr. TSA OK.",
                "subheadline": "Design élégant pour professionnels tech",
                "price": "129 €",
                "cta": "Acheter",
                "legal": "Livraison gratuite en France",
                "export_filename": "1200x628_tech_commuter_fr-FR.png"
            },
            {
                "frame_name": "Ad/1200x628/BudgetExplorer/en-US",
                "format": "1200x628",
                "persona": "Budget Explorer",
                "locale": "en-US",
                "headline": "Durable Value. Student-Friendly",
                "subheadline": "Quality backpack that won't break the bank",
                "price": "$129",
                "cta": "Shop now",
                "legal": "Ships free in the U.S.",
                "export_filename": "1200x628_budget_explorer_en-US.png"
            },
            {
                "frame_name": "Ad/1200x628/BudgetExplorer/es-MX",
                "format": "1200x628",
                "persona": "Budget Explorer",
                "locale": "es-MX",
                "headline": "Valor Duradero. Estudiantes.",
                "subheadline": "Mochila de calidad a precio accesible",
                "price": "$2,190",
                "cta": "Compra ahora",
                "legal": "Envío gratis en México",
                "export_filename": "1200x628_budget_explorer_es-MX.png"
            },
            {
                "frame_name": "Ad/1200x628/BudgetExplorer/fr-FR",
                "format": "1200x628",
                "persona": "Budget Explorer",
                "locale": "fr-FR",
                "headline": "Valeur Durable. Étudiants.",
                "subheadline": "Sac de qualité à prix abordable",
                "price": "129 €",
                "cta": "Acheter",
                "legal": "Livraison gratuite en France",
                "export_filename": "1200x628_budget_explorer_fr-FR.png"
            },
            // 1200x1200 variants
            {
                "frame_name": "Ad/1200x1200/TrailRunner/en-US",
                "format": "1200x1200",
                "persona": "Trail Runner",
                "locale": "en-US",
                "headline": "Go Farther. Stay Light.",
                "subheadline": "Lightweight, bounce-free, breathable design for every trail",
                "price": "$129",
                "cta": "Shop now",
                "legal": "Ships free in the U.S.",
                "export_filename": "1200x1200_trail_runner_en-US.png"
            },
            {
                "frame_name": "Ad/1200x1200/TrailRunner/es-MX",
                "format": "1200x1200",
                "persona": "Trail Runner",
                "locale": "es-MX",
                "headline": "Ve Más Lejos. Más Ligero.",
                "subheadline": "Diseño liviano y transpirable para cada sendero",
                "price": "$2,190",
                "cta": "Compra ahora",
                "legal": "Envío gratis en México",
                "export_filename": "1200x1200_trail_runner_es-MX.png"
            },
            {
                "frame_name": "Ad/1200x1200/TrailRunner/fr-FR",
                "format": "1200x1200",
                "persona": "Trail Runner",
                "locale": "fr-FR",
                "headline": "Plus Loin. Plus Léger.",
                "subheadline": "Design léger et respirant pour chaque sentier",
                "price": "129 €",
                "cta": "Acheter",
                "legal": "Livraison gratuite en France",
                "export_filename": "1200x1200_trail_runner_fr-FR.png"
            },
            {
                "frame_name": "Ad/1200x1200/TechCommuter/en-US",
                "format": "1200x1200",
                "persona": "Tech Commuter",
                "locale": "en-US",
                "headline": "Laptop-Safe. TSA-Friendly.",
                "subheadline": "Sleek design for tech professionals on the go",
                "price": "$129",
                "cta": "Shop now",
                "legal": "Ships free in the U.S.",
                "export_filename": "1200x1200_tech_commuter_en-US.png"
            },
            {
                "frame_name": "Ad/1200x1200/TechCommuter/es-MX",
                "format": "1200x1200",
                "persona": "Tech Commuter",
                "locale": "es-MX",
                "headline": "Seguro. TSA-Amigable.",
                "subheadline": "Diseño elegante para profesionales tech",
                "price": "$2,190",
                "cta": "Compra ahora",
                "legal": "Envío gratis en México",
                "export_filename": "1200x1200_tech_commuter_es-MX.png"
            },
            {
                "frame_name": "Ad/1200x1200/TechCommuter/fr-FR",
                "format": "1200x1200",
                "persona": "Tech Commuter",
                "locale": "fr-FR",
                "headline": "Portable Sûr. TSA OK.",
                "subheadline": "Design élégant pour professionnels tech",
                "price": "129 €",
                "cta": "Acheter",
                "legal": "Livraison gratuite en France",
                "export_filename": "1200x1200_tech_commuter_fr-FR.png"
            },
            {
                "frame_name": "Ad/1200x1200/BudgetExplorer/en-US",
                "format": "1200x1200",
                "persona": "Budget Explorer",
                "locale": "en-US",
                "headline": "Durable Value. Student-Friendly",
                "subheadline": "Quality backpack that won't break the bank",
                "price": "$129",
                "cta": "Shop now",
                "legal": "Ships free in the U.S.",
                "export_filename": "1200x1200_budget_explorer_en-US.png"
            },
            {
                "frame_name": "Ad/1200x1200/BudgetExplorer/es-MX",
                "format": "1200x1200",
                "persona": "Budget Explorer",
                "locale": "es-MX",
                "headline": "Valor Duradero. Estudiantes.",
                "subheadline": "Mochila de calidad a precio accesible",
                "price": "$2,190",
                "cta": "Compra ahora",
                "legal": "Envío gratis en México",
                "export_filename": "1200x1200_budget_explorer_es-MX.png"
            },
            {
                "frame_name": "Ad/1200x1200/BudgetExplorer/fr-FR",
                "format": "1200x1200",
                "persona": "Budget Explorer",
                "locale": "fr-FR",
                "headline": "Valeur Durable. Étudiants.",
                "subheadline": "Sac de qualité à prix abordable",
                "price": "129 €",
                "cta": "Acheter",
                "legal": "Livraison gratuite en France",
                "export_filename": "1200x1200_budget_explorer_fr-FR.png"
            },
            // 960x1200 variants
            {
                "frame_name": "Ad/960x1200/TrailRunner/en-US",
                "format": "960x1200",
                "persona": "Trail Runner",
                "locale": "en-US",
                "headline": "Go Farther. Stay Light.",
                "subheadline": "Lightweight, bounce-free design",
                "price": "$129",
                "cta": "Shop now",
                "legal": "Ships free in the U.S.",
                "export_filename": "960x1200_trail_runner_en-US.png"
            },
            {
                "frame_name": "Ad/960x1200/TrailRunner/es-MX",
                "format": "960x1200",
                "persona": "Trail Runner",
                "locale": "es-MX",
                "headline": "Ve Más Lejos. Más Ligero.",
                "subheadline": "Diseño liviano y transpirable",
                "price": "$2,190",
                "cta": "Compra ahora",
                "legal": "Envío gratis en México",
                "export_filename": "960x1200_trail_runner_es-MX.png"
            },
            {
                "frame_name": "Ad/960x1200/TrailRunner/fr-FR",
                "format": "960x1200",
                "persona": "Trail Runner",
                "locale": "fr-FR",
                "headline": "Plus Loin. Plus Léger.",
                "subheadline": "Design léger et respirant",
                "price": "129 €",
                "cta": "Acheter",
                "legal": "Livraison gratuite en France",
                "export_filename": "960x1200_trail_runner_fr-FR.png"
            },
            {
                "frame_name": "Ad/960x1200/TechCommuter/en-US",
                "format": "960x1200",
                "persona": "Tech Commuter",
                "locale": "en-US",
                "headline": "Laptop-Safe. TSA-Friendly.",
                "subheadline": "Sleek design for professionals",
                "price": "$129",
                "cta": "Shop now",
                "legal": "Ships free in the U.S.",
                "export_filename": "960x1200_tech_commuter_en-US.png"
            },
            {
                "frame_name": "Ad/960x1200/TechCommuter/es-MX",
                "format": "960x1200",
                "persona": "Tech Commuter",
                "locale": "es-MX",
                "headline": "Seguro. TSA-Amigable.",
                "subheadline": "Diseño elegante para profesionales",
                "price": "$2,190",
                "cta": "Compra ahora",
                "legal": "Envío gratis en México",
                "export_filename": "960x1200_tech_commuter_es-MX.png"
            },
            {
                "frame_name": "Ad/960x1200/TechCommuter/fr-FR",
                "format": "960x1200",
                "persona": "Tech Commuter",
                "locale": "fr-FR",
                "headline": "Portable Sûr. TSA OK.",
                "subheadline": "Design élégant pour professionnels",
                "price": "129 €",
                "cta": "Acheter",
                "legal": "Livraison gratuite en France",
                "export_filename": "960x1200_tech_commuter_fr-FR.png"
            },
            {
                "frame_name": "Ad/960x1200/BudgetExplorer/en-US",
                "format": "960x1200",
                "persona": "Budget Explorer",
                "locale": "en-US",
                "headline": "Durable Value. Student-Friendly",
                "subheadline": "Quality backpack, great value",
                "price": "$129",
                "cta": "Shop now",
                "legal": "Ships free in the U.S.",
                "export_filename": "960x1200_budget_explorer_en-US.png"
            },
            {
                "frame_name": "Ad/960x1200/BudgetExplorer/es-MX",
                "format": "960x1200",
                "persona": "Budget Explorer",
                "locale": "es-MX",
                "headline": "Valor Duradero. Estudiantes.",
                "subheadline": "Mochila de calidad, gran valor",
                "price": "$2,190",
                "cta": "Compra ahora",
                "legal": "Envío gratis en México",
                "export_filename": "960x1200_budget_explorer_es-MX.png"
            },
            {
                "frame_name": "Ad/960x1200/BudgetExplorer/fr-FR",
                "format": "960x1200",
                "persona": "Budget Explorer",
                "locale": "fr-FR",
                "headline": "Valeur Durable. Étudiants.",
                "subheadline": "Sac de qualité, excellent rapport",
                "price": "129 €",
                "cta": "Acheter",
                "legal": "Livraison gratuite en France",
                "export_filename": "960x1200_budget_explorer_fr-FR.png"
            }
        ];
    }

    truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength - 1) + '…';
    }

    wrapText(ctx, text, x, y, maxWidth, lineHeight) {
        const words = text.split(' ');
        let line = '';
        let currentY = y;
        
        for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + ' ';
            const metrics = ctx.measureText(testLine);
            const testWidth = metrics.width;
            
            if (testWidth > maxWidth && n > 0) {
                ctx.fillText(line, x, currentY);
                line = words[n] + ' ';
                currentY += lineHeight;
            } else {
                line = testLine;
            }
        }
        ctx.fillText(line, x, currentY);
        return currentY + lineHeight;
    }

    createAdCanvas(variant) {
        const [width, height] = variant.format.split('x').map(Number);
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        
        // Enable text antialiasing
        ctx.textBaseline = 'top';
        ctx.imageSmoothingEnabled = true;
        
        const isVertical = height > width;
        const isSquare = width === height;
        
        // Background gradient
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, '#1a2332');
        gradient.addColorStop(1, '#0f1419');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        
        // Calculate responsive sizing
        const baseSize = Math.min(width, height);
        const padding = baseSize * 0.04;
        const logoSize = baseSize * 0.06;
        
        // Logo area (top left)
        ctx.fillStyle = '#ff9500';
        ctx.fillRect(padding, padding * 1.5, logoSize, logoSize);
        
        // Brand name
        ctx.fillStyle = '#ffffff';
        ctx.font = `bold italic ${baseSize * 0.045}px Arial, sans-serif`;
        ctx.fillText('PeakPack', padding + logoSize + padding/2, padding * 1.5 + logoSize * 0.7);
        
        // Persona tag
        const personaY = padding * 1.5 + logoSize + padding;
        ctx.fillStyle = '#444444';
        ctx.fillRect(padding, personaY, width * 0.25, baseSize * 0.04);
        ctx.fillStyle = '#cccccc';
        ctx.font = `${baseSize * 0.022}px Arial, sans-serif`;
        ctx.fillText(`Persona: ${variant.persona}`, padding + padding/2, personaY + baseSize * 0.015);
        
        // Layout adjustments for different formats
        let headlineY, headlineSize, subheadlineSize, contentWidth;
        
        if (isVertical) {
            headlineY = height * 0.25;
            headlineSize = baseSize * 0.08;
            subheadlineSize = baseSize * 0.032;
            contentWidth = width * 0.9;
        } else {
            headlineY = height * 0.3;
            headlineSize = baseSize * 0.09;
            subheadlineSize = baseSize * 0.035;
            contentWidth = width * 0.55;
        }
        
        // Main headline (ensure ≤30 chars)
        ctx.fillStyle = '#ffffff';
        ctx.font = `bold italic ${headlineSize}px Arial, sans-serif`;
        const truncatedHeadline = this.truncateText(variant.headline, 30);
        ctx.fillText(truncatedHeadline, padding, headlineY);
        
        // Subheadline (ensure ≤90 chars, wrap text)
        ctx.fillStyle = '#e0e0e0';
        ctx.font = `${subheadlineSize}px Arial, sans-serif`;
        const truncatedSubheadline = this.truncateText(variant.subheadline, 90);
        const subheadlineY = headlineY + headlineSize + padding;
        this.wrapText(ctx, truncatedSubheadline, padding, subheadlineY, contentWidth, subheadlineSize * 1.3);
        
        // Badge area
        const badgeY = subheadlineY + subheadlineSize * 3;
        ctx.fillStyle = '#444444';
        ctx.fillRect(padding, badgeY, width * 0.2, baseSize * 0.035);
        ctx.fillStyle = '#cccccc';
        ctx.font = `${baseSize * 0.025}px Arial, sans-serif`;
        ctx.fillText('New • 20% lighter', padding + padding/2, badgeY + baseSize * 0.013);
        
        // CTA and Price area
        const ctaY = isVertical ? height * 0.75 : height * 0.75;
        const ctaWidth = width * 0.2;
        const ctaHeight = baseSize * 0.1;
        
        // CTA Button
        ctx.fillStyle = '#ff9500';
        ctx.fillRect(padding, ctaY, ctaWidth, ctaHeight);
        ctx.fillStyle = '#000000';
        ctx.font = `bold italic ${baseSize * 0.032}px Arial, sans-serif`;
        ctx.textAlign = 'center';
        const truncatedCTA = this.truncateText(variant.cta, 15);
        ctx.fillText(truncatedCTA, padding + ctaWidth/2, ctaY + ctaHeight/2 - baseSize * 0.016);
        ctx.textAlign = 'left';
        
        // Price
        ctx.fillStyle = '#ffffff';
        ctx.font = `bold italic ${baseSize * 0.032}px Arial, sans-serif`;
        ctx.fillText(variant.price, padding + ctaWidth + padding, ctaY + ctaHeight/2 - baseSize * 0.016);
        
        // Legal text (ensure ≤90 chars)
        ctx.fillStyle = '#888888';
        ctx.font = `${baseSize * 0.02}px Arial, sans-serif`;
        const truncatedLegal = this.truncateText(variant.legal, 90);
        ctx.fillText(truncatedLegal, padding, height - padding * 2);
        
        // Product placeholder (right side or bottom for vertical)
        let imgX, imgY, imgW, imgH;
        
        if (isVertical) {
            imgX = width * 0.1;
            imgY = height * 0.45;
            imgW = width * 0.8;
            imgH = height * 0.25;
        } else {
            imgX = width * 0.6;
            imgY = height * 0.15;
            imgW = width * 0.35;
            imgH = height * 0.7;
        }
        
        ctx.strokeStyle = '#555555';
        ctx.lineWidth = 2;
        ctx.setLineDash([10, 5]);
        ctx.strokeRect(imgX, imgY, imgW, imgH);
        
        ctx.fillStyle = '#666666';
        ctx.font = `${baseSize * 0.025}px Arial, sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText('Drop product image here', imgX + imgW/2, imgY + imgH/2);
        ctx.textAlign = 'left';
        ctx.setLineDash([]);
        
        // Format label (bottom right)
        ctx.fillStyle = '#666666';
        ctx.font = `${baseSize * 0.018}px Arial, sans-serif`;
        ctx.textAlign = 'right';
        ctx.fillText(`${variant.format} • ${variant.persona} • ${variant.locale}`, width - padding, height - padding/2);
        ctx.textAlign = 'left';
        
        return canvas;
    }

    async generateAll(progressCallback) {
        const results = [];
        
        for (let i = 0; i < this.variants.length; i++) {
            const variant = this.variants[i];
            const canvas = this.createAdCanvas(variant);
            
            results.push({
                canvas: canvas,
                variant: variant,
                dataUrl: canvas.toDataURL('image/png', 0.9)
            });
            
            if (progressCallback) {
                progressCallback(i + 1, this.variants.length, variant);
            }
            
            // Small delay to prevent blocking
            await new Promise(resolve => setTimeout(resolve, 50));
        }
        
        return results;
    }

    downloadCanvas(canvas, filename) {
        const link = document.createElement('a');
        link.download = filename;
        link.href = canvas.toDataURL('image/png', 0.9);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// Export for use in HTML or Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdVariantGenerator;
} else if (typeof window !== 'undefined') {
    window.AdVariantGenerator = AdVariantGenerator;
}