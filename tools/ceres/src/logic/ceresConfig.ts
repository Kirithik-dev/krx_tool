export interface CeresCapability {
  id: string;
  title: string;
  summary: string;
}

export interface CeresToolMetadata {
  id: 'ceres';
  name: 'CERES';
  tagline: 'Know what goes into you. AI-powered product & ingredient intelligence.';
  shortTagline: 'Know what goes into you.';
  category: 'Product Intelligence';
  route: '/tools/ceres';
  description: string;
  capabilities: readonly CeresCapability[];
}

export const CERES_METADATA: CeresToolMetadata = {
  id: 'ceres',
  name: 'CERES',
  tagline: 'Know what goes into you. AI-powered product & ingredient intelligence.',
  shortTagline: 'Know what goes into you.',
  category: 'Product Intelligence',
  route: '/tools/ceres',
  description:
    'CERES is an AI-powered food-scanning and product intelligence system designed to analyse packaged products, decode ingredients, evaluate nutritional composition, explain daily intake limits, identify potential health concerns, discover healthier alternatives, and provide scientific evidence and regulatory reporting references.',
  capabilities: [
    {
      id: 'ingredient-decoding',
      title: 'Ingredient Decoding',
      summary: 'Decode complex ingredient labels, additives, and chemical nomenclature.',
    },
    {
      id: 'nutritional-evaluation',
      title: 'Nutritional Composition',
      summary: 'Evaluate macro- and micro-nutrient density and formulation balance.',
    },
    {
      id: 'daily-intake-limits',
      title: 'Daily Intake Thresholds',
      summary: 'Explain daily intake limits across sugars, sodium, fats, and micronutrients.',
    },
    {
      id: 'health-concerns',
      title: 'Health & Risk Screening',
      summary: 'Identify potential health concerns, allergens, and ultra-processed markers.',
    },
    {
      id: 'healthier-alternatives',
      title: 'Healthier Alternatives',
      summary: 'Discover cleaner, higher-integrity packaged product alternatives.',
    },
    {
      id: 'scientific-regulatory',
      title: 'Scientific & Regulatory Evidence',
      summary: 'Provide peer-reviewed scientific evidence and regulatory reporting references.',
    },
  ],
} as const;
