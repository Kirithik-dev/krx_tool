export const KRX_TOKENS = {
  colors: {
    dark: {
      abyss: '#050505',
      obsidian: '#0A0A0A',
      charcoal: '#141414',
      textPrimary: '#F3F1ED',
      textSecondary: 'rgba(243, 241, 237, 0.74)',
      textMuted: 'rgba(243, 241, 237, 0.50)',
    },
    light: {
      alabaster: '#F3F1ED',
      ivory: '#E9E4DC',
      textPrimary: '#0A0A0A',
      textSecondary: 'rgba(10, 10, 10, 0.74)',
      textMuted: 'rgba(10, 10, 10, 0.50)',
    },
    accents: {
      orange: '#FF5A1F',
      amber: '#D98A43',
      gold: '#D8B879',
    },
  },
  fonts: {
    display: "'Cormorant Garamond', Georgia, serif",
    sans: "'Plus Jakarta Sans', system-ui, sans-serif",
  },
  motion: {
    easeCinema: [0.16, 1, 0.3, 1] as const,
    easeGentle: [0.25, 0.1, 0.25, 1] as const,
  },
} as const;

export type SceneTone = 'dark' | 'light';

export interface SceneMeta {
  id: string;
  label: string;
  title: string;
  tone: SceneTone;
}

export const KRX_SCENES: SceneMeta[] = [
  { id: 'opening', label: 'Opening', title: 'Opening', tone: 'dark' },
  { id: 'identity', label: 'Foundation', title: 'The Foundation', tone: 'light' },
  { id: 'philosophy', label: 'Philosophy', title: 'Philosophy', tone: 'dark' },
  { id: 'blackbox', label: 'BLACKBOX', title: 'BLACKBOX', tone: 'dark' },
  { id: 'engineering', label: 'Engineering', title: 'Engineering', tone: 'dark' },
  { id: 'capabilities', label: 'Exploration', title: 'Exploration', tone: 'light' },
  { id: 'horizon', label: 'Horizon', title: 'The Horizon', tone: 'dark' },
  { id: 'closing', label: 'Contact', title: 'Contact', tone: 'dark' },
];
