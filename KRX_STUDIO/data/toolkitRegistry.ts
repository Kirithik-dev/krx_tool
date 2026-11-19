import type { ComponentType } from 'react';
import { DrakCard } from '../components/drak/DrakCard';
import { DrakPage } from '../pages/DrakPage';

export interface ToolkitCardProps {
  href?: string;
  onSelect: () => void;
}

export interface ToolkitAppProps {
  onBackToTools: () => void;
}

export interface ToolkitRegistryEntry {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  description: string;
  route: string;
  videoSrc: string;
  imageSrc: string;
  CardComponent: ComponentType<ToolkitCardProps>;
  ToolAppComponent: ComponentType<ToolkitAppProps>;
}

/**
 * Modular registry of independent KRX tools displayed in the `/tools` showcase grid.
 */
export const KRX_TOOLKIT_REGISTRY: readonly ToolkitRegistryEntry[] = [
  {
    slug: 'drak',
    name: 'DRAK AI',
    tagline: 'AUTONOMOUS RESEARCH & EVOLUTION ENGINE',
    category: 'Autonomous Research & Evolution Engine',
    description: 'Autonomous Research & Evolution Engine',
    route: '/drak',
    videoSrc: '',
    imageSrc: '',
    CardComponent: DrakCard,
    ToolAppComponent: DrakPage,
  },
];
