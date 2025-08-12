# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a creative production project for generating ad variants using Figma integration. The project is designed to work with Claude Code's Figma MCP (Model Context Protocol) to automate the creation of advertising assets for a fictional product "PeakPack Pro 30L" backpack.

## Architecture

The project follows a data-driven approach for ad variant generation:

- **Configuration Layer**: `config/ad_variant_plan.yaml` defines the campaign structure including personas (Trail Runner, Tech Commuter, Budget Explorer), locales (en-US, es-MX, fr-FR), and base copy templates
- **Data Matrix**: `data/ad_variants_matrix.csv` contains the complete combinatorial matrix of all ad variants with format specifications, persona targeting, and localization data
- **Assets**: `figma_assets/` directory contains SVG templates for Figma integration including master frame templates and logo assets

## Key Data Structure

The project generates ads across:
- **3 personas** with distinct messaging angles
- **3 locales** with localized pricing and copy
- **3 ad formats**: 1200x1200 (square), 1200x628 (landscape), 960x1200 (vertical)
- **Total**: 27 unique ad variants following Google Responsive Display Ads specifications

## Figma Integration

This project is designed to work with Figma's Dev Mode and MCP integration:
- Frame naming convention: `Ad/{format}/{persona}/{locale}` (e.g., `Ad/1200x1200/BudgetExplorer/en-US`)
- Export naming: `{format}_{persona}_{locale}.png`
- Character limits enforced per Google Ads specs (headlines: 30 chars, descriptions: 90 chars)

## Development Notes

- This is a data and configuration project with no executable code
- The `scripts/` directory exists but is currently empty
- Assets are template-based and designed for Figma manipulation rather than direct code generation
- Copy limits and specifications are defined in the YAML configuration to ensure compliance with advertising platform requirements