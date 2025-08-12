#!/usr/bin/env node

/**
 * Node.js Batch Generator for PeakPack Ad Variants
 * Generates all 27 variants and saves them to the output directory
 */

const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

class NodeAdGenerator {
    constructor() {
        this.variants = require('../output/variant_specifications.json').variants;
        this.outputDir = path.join(__dirname, '..', 'output');
    }

    ensureDirectories() {
        const dirs = ['1200x628', '1200x1200', '960x1200'];
        dirs.forEach(dir => {
            const fullPath = path.join(this.outputDir, dir);
            if (!fs.existsSync(fullPath)) {
                fs.mkdirSync(fullPath, { recursive: true });
            }
        });
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

    fitTextToWidth(ctx, text, maxWidth, originalSize) {
        let fontSize = originalSize;
        const fontStyle = ctx.font.replace(/\d+px/, `${fontSize}px`);
        ctx.font = fontStyle;
        
        // Try to fit text at original size first
        if (ctx.measureText(text).width <= maxWidth) {
            return fontSize;
        }
        
        // If text doesn't fit, reduce font size
        while (ctx.measureText(text).width > maxWidth && fontSize > originalSize * 0.6) {
            fontSize -= 2;
            ctx.font = fontStyle.replace(/\d+px/, `${fontSize}px`);
        }
        
        return fontSize;
    }

    getOptimalSingleLineFontSize(ctx, text, maxWidth, minSize, maxSize) {
        let bestSize = minSize;
        
        // Test font sizes from max to min to find the largest that fits on ONE LINE
        for (let size = maxSize; size >= minSize; size -= 1) {
            const fontStyle = ctx.font.replace(/\d+px/, `${size}px`);
            ctx.font = fontStyle;
            
            const textWidth = ctx.measureText(text).width;
            
            // Only accept if text fits on single line
            if (textWidth <= maxWidth) {
                bestSize = size;
                break;
            }
        }
        
        return bestSize;
    }

    getOptimalFontSize(ctx, text, maxWidth, maxHeight, minSize, maxSize) {
        let bestSize = minSize;
        
        // Test font sizes from max to min to find the largest that fits
        for (let size = maxSize; size >= minSize; size -= 2) {
            const fontStyle = ctx.font.replace(/\d+px/, `${size}px`);
            ctx.font = fontStyle;
            
            const textWidth = ctx.measureText(text).width;
            
            // For single line text
            if (textWidth <= maxWidth) {
                const textHeight = size * 1.2; // Account for line height
                if (textHeight <= maxHeight) {
                    bestSize = size;
                    break;
                }
            } else {
                // For multi-line text, estimate number of lines needed
                const words = text.split(' ');
                let lines = 1;
                let currentLineWidth = 0;
                
                for (const word of words) {
                    const wordWidth = ctx.measureText(word + ' ').width;
                    if (currentLineWidth + wordWidth > maxWidth) {
                        lines++;
                        currentLineWidth = wordWidth;
                    } else {
                        currentLineWidth += wordWidth;
                    }
                }
                
                const totalTextHeight = lines * size * 1.2;
                if (totalTextHeight <= maxHeight) {
                    bestSize = size;
                    break;
                }
            }
        }
        
        return bestSize;
    }

    async createProductImage(width, height) {
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');
        
        // Create a backpack illustration
        const centerX = width / 2;
        const centerY = height / 2;
        const backpackWidth = width * 0.6;
        const backpackHeight = height * 0.8;
        
        // Main body gradient
        const gradient = ctx.createLinearGradient(centerX - backpackWidth/2, centerY - backpackHeight/2, 
                                                centerX + backpackWidth/2, centerY + backpackHeight/2);
        gradient.addColorStop(0, '#2c5530');
        gradient.addColorStop(0.5, '#3d7040');
        gradient.addColorStop(1, '#1a3a1d');
        
        // Main backpack body
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(centerX - backpackWidth/2, centerY - backpackHeight/2, 
                     backpackWidth, backpackHeight, 20);
        ctx.fill();
        
        // Front pocket
        ctx.fillStyle = '#245027';
        ctx.beginPath();
        ctx.roundRect(centerX - backpackWidth/3, centerY - backpackHeight/3, 
                     backpackWidth * 0.66, backpackHeight * 0.4, 15);
        ctx.fill();
        
        // Zipper
        ctx.strokeStyle = '#888888';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(centerX - backpackWidth/3 + 10, centerY - backpackHeight/3 + 10);
        ctx.lineTo(centerX + backpackWidth/3 - 10, centerY - backpackHeight/3 + 10);
        ctx.stroke();
        
        // Straps
        ctx.fillStyle = '#1a1a1a';
        const strapWidth = backpackWidth * 0.12;
        ctx.fillRect(centerX - backpackWidth/2 + backpackWidth * 0.15, centerY - backpackHeight/2 - 20, 
                    strapWidth, backpackHeight + 40);
        ctx.fillRect(centerX + backpackWidth/2 - backpackWidth * 0.15 - strapWidth, centerY - backpackHeight/2 - 20, 
                    strapWidth, backpackHeight + 40);
        
        // Logo area
        ctx.fillStyle = '#ff9500';
        ctx.beginPath();
        ctx.arc(centerX, centerY + backpackHeight/4, 25, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('PP', centerX, centerY + backpackHeight/4 + 6);
        ctx.textAlign = 'left';
        
        return canvas;
    }

    async createAdCanvas(variant) {
        const [width, height] = variant.format.split('x').map(Number);
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');
        
        // Enable text antialiasing
        ctx.textBaseline = 'top';
        ctx.antialias = 'subpixel';
        
        const isVertical = height > width;
        
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
        ctx.font = `bold italic ${baseSize * 0.045}px Arial`;
        ctx.fillText('PeakPack', padding + logoSize + padding/2, padding * 1.5 + logoSize * 0.7);
        
        // Persona tag removed per user request
        
        // Calculate product image area first
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
        
        // Layout adjustments for different formats - avoid image area
        let headlineY, headlineSize, subheadlineSize, contentWidth, maxHeadlineWidth, maxHeadlineHeight;
        
        if (isVertical) {
            headlineY = height * 0.25;
            headlineSize = baseSize * 0.08;
            subheadlineSize = baseSize * 0.032;
            contentWidth = width * 0.9;
            maxHeadlineWidth = width - (padding * 2);
            maxHeadlineHeight = imgY - headlineY - padding; // Space until image starts
        } else {
            headlineY = height * 0.3;
            headlineSize = baseSize * 0.09;
            subheadlineSize = baseSize * 0.035;
            contentWidth = imgX - padding * 2; // Space to the left of image
            maxHeadlineWidth = imgX - padding * 2; // Use almost all space up to image
            maxHeadlineHeight = height * 0.4; // More vertical space available
        }
        
        // Main headline - single line only, maximum size
        ctx.fillStyle = '#ffffff';
        const truncatedHeadline = this.truncateText(variant.headline, 30);
        
        // Calculate size range for single line only - much larger range for landscape
        const minHeadlineSize = baseSize * 0.04;
        const maxHeadlineSize = isVertical ? baseSize * 0.20 : baseSize * 0.50; // Dramatically larger for landscape
        
        // Find optimal font size for SINGLE LINE that fits in available width
        ctx.font = `bold italic ${maxHeadlineSize}px Arial`;
        const optimalSize = this.getOptimalSingleLineFontSize(ctx, truncatedHeadline, maxHeadlineWidth, minHeadlineSize, maxHeadlineSize);
        
        ctx.font = `bold italic ${optimalSize}px Arial`;
        ctx.fillText(truncatedHeadline, padding, headlineY);
        
        // Subheadline (ensure ≤90 chars, wrap text)
        ctx.fillStyle = '#e0e0e0';
        ctx.font = `${subheadlineSize}px Arial`;
        const truncatedSubheadline = this.truncateText(variant.subheadline, 90);
        const subheadlineY = headlineY + headlineSize + padding;
        this.wrapText(ctx, truncatedSubheadline, padding, subheadlineY, contentWidth, subheadlineSize * 1.3);
        
        // Badge area with grey background
        const badgeY = subheadlineY + subheadlineSize * 3;
        const badgeWidth = width * 0.25;
        const badgeHeight = baseSize * 0.045;
        
        // Badge background with rounded corners (grey)
        ctx.fillStyle = '#555555';
        ctx.beginPath();
        ctx.roundRect(padding, badgeY, badgeWidth, badgeHeight, 8);
        ctx.fill();
        
        // Badge text (white on grey) - properly centered
        ctx.fillStyle = '#ffffff';
        ctx.font = `bold ${baseSize * 0.022}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('NEW • 20% LIGHTER', padding + badgeWidth/2, badgeY + badgeHeight/2);
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        
        // CTA and Price area
        const ctaY = isVertical ? height * 0.75 : height * 0.75;
        const ctaWidth = width * 0.2;
        const ctaHeight = baseSize * 0.1;
        
        // CTA Button
        ctx.fillStyle = '#ff9500';
        ctx.fillRect(padding, ctaY, ctaWidth, ctaHeight);
        ctx.fillStyle = '#000000';
        
        // Dynamic CTA text sizing to fit within button
        const truncatedCTA = this.truncateText(variant.cta, 15);
        const maxCTAWidth = ctaWidth - (padding * 0.5); // Leave some padding inside button
        const originalCTASize = baseSize * 0.032;
        const minCTASize = baseSize * 0.020;
        const maxCTASize = baseSize * 0.040;
        
        ctx.font = `bold italic ${originalCTASize}px Arial`;
        const optimalCTASize = this.getOptimalSingleLineFontSize(ctx, truncatedCTA, maxCTAWidth, minCTASize, maxCTASize);
        
        ctx.font = `bold italic ${optimalCTASize}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(truncatedCTA, padding + ctaWidth/2, ctaY + ctaHeight/2);
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        
        // Price
        ctx.fillStyle = '#ffffff';
        ctx.font = `bold italic ${baseSize * 0.032}px Arial`;
        ctx.fillText(variant.price, padding + ctaWidth + padding, ctaY + ctaHeight/2 - baseSize * 0.016);
        
        // Legal text (ensure ≤90 chars)
        ctx.fillStyle = '#888888';
        ctx.font = `${baseSize * 0.02}px Arial`;
        const truncatedLegal = this.truncateText(variant.legal, 90);
        ctx.fillText(truncatedLegal, padding, height - padding * 2);
        
        // Create and draw product image (coordinates already calculated above)
        const productCanvas = await this.createProductImage(imgW, imgH);
        ctx.drawImage(productCanvas, imgX, imgY);
        
        // Add subtle border
        ctx.strokeStyle = '#333333';
        ctx.lineWidth = 1;
        ctx.strokeRect(imgX, imgY, imgW, imgH);
        
        // Format label (bottom right)
        ctx.fillStyle = '#666666';
        ctx.font = `${baseSize * 0.018}px Arial`;
        ctx.textAlign = 'right';
        ctx.fillText(`${variant.format} • ${variant.persona} • ${variant.locale}`, width - padding, height - padding/2);
        ctx.textAlign = 'left';
        
        return canvas;
    }

    async generateAll() {
        this.ensureDirectories();
        
        console.log(`🎒 Starting generation of ${this.variants.length} PeakPack ad variants...`);
        
        const results = [];
        
        for (let i = 0; i < this.variants.length; i++) {
            const variant = this.variants[i];
            
            try {
                const canvas = await this.createAdCanvas(variant);
                const buffer = canvas.toBuffer('image/png');
                
                // Determine output path based on format
                const formatDir = variant.format;
                const outputPath = path.join(this.outputDir, formatDir, variant.export_filename);
                
                fs.writeFileSync(outputPath, buffer);
                
                const fileSizeKB = Math.round(buffer.length / 1024);
                console.log(`✅ Generated: ${variant.export_filename} (${fileSizeKB}KB)`);
                
                results.push({
                    variant: variant,
                    outputPath: outputPath,
                    fileSize: fileSizeKB
                });
                
            } catch (error) {
                console.error(`❌ Error generating ${variant.export_filename}:`, error.message);
            }
            
            // Progress indicator
            const progress = Math.round((i + 1) / this.variants.length * 100);
            process.stdout.write(`\rProgress: ${progress}% (${i + 1}/${this.variants.length})`);
        }
        
        console.log('\n\n🎉 Generation complete!');
        console.log(`📁 Files saved to: ${this.outputDir}`);
        
        // Summary
        const totalSize = results.reduce((sum, r) => sum + r.fileSize, 0);
        console.log(`📊 Summary: ${results.length} files, ${totalSize}KB total`);
        
        return results;
    }
}

// Check if canvas module is available
try {
    require('canvas');
} catch (error) {
    console.error('❌ Canvas module not found. Install with:');
    console.error('npm install canvas');
    process.exit(1);
}

// Run if called directly
if (require.main === module) {
    const generator = new NodeAdGenerator();
    generator.generateAll().catch(console.error);
}

module.exports = NodeAdGenerator;