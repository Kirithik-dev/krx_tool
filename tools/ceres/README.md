# CERES

> **Know what goes into you.**

## Overview

**CERES** is the first independent tool in the **KRX** ecosystem.

CERES is an AI-powered product intelligence system designed to analyse packaged products, decode ingredients, evaluate nutritional composition, explain daily intake limits, identify potential health concerns, discover healthier alternatives, and provide scientific evidence and regulatory reporting references.

---

## Core Capabilities (Planned)

- **Packaged Product Analysis**: Optical and structured analysis of consumer packaged goods.
- **Ingredient Decoding**: Plain-language breakdown of complex chemical, additive, and formulation nomenclature.
- **Nutritional Composition Evaluation**: Quantitative assessment of macro- and micro-nutrient profiles.
- **Daily Intake Limits**: Contextualized comparison against established daily dietary reference intakes.
- **Health Concern Identification**: Detection of allergens, controversial additives, ultra-processed markers, and metabolic risk factors.
- **Healthier Alternatives Discovery**: Evidence-backed recommendations for cleaner, higher-integrity product substitutes.
- **Scientific Evidence & Regulatory References**: Direct citation of peer-reviewed literature and international food safety / regulatory standards.

---

## Project Structure

CERES is architected as a self-contained, modular project within the KRX `tools/` directory, maintaining full separation from the main KRX website (`KRX_STUDIO/`):

```text
tools/
└── ceres/
    ├── README.md                 # CERES documentation & project specification
    ├── package.json              # Independent tool package manifest
    ├── tsconfig.json             # TypeScript configuration
    ├── index.html                # Standalone HTML entry point
    └── src/
        ├── card.png              # Official CERES tool card artwork
        ├── index.ts              # Public module exports & tool metadata
        ├── main.tsx              # Standalone React mount entry
        ├── App.tsx               # Root CERES UI shell
        ├── components/
        │   └── CeresCard.tsx     # Official CERES card presentation component
        ├── styles/
        │   └── ceres.css         # Scoped CERES design tokens & base styles
        ├── logic/
        │   └── ceresConfig.ts    # Tool identity, capabilities & typed schema definitions
        └── assets/
            └── index.ts          # Asset registry exporting card.png
```
