import type { ComponentType } from 'react';
import {
  CERES_ASSETS,
  CERES_METADATA,
  CeresApp,
  CeresCard,
  type CeresAppProps,
  type CeresCardProps,
} from '../../src/tools/ceres';

export interface ToolkitRegistryEntry {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  description: string;
  route: string;
  videoSrc: string;
  imageSrc: string;
  CardComponent: ComponentType<CeresCardProps>;
  ToolAppComponent: ComponentType<CeresAppProps>;
}

/**
 * Modular registry of independent KRX tools displayed in the `/tools` showcase grid.
 * CERES (`src/tools/ceres/card.mp4`) is registered as the first tool in the grid.
 */
export const KRX_TOOLKIT_REGISTRY: readonly ToolkitRegistryEntry[] = [
  {
    slug: CERES_METADATA.id,
    name: CERES_METADATA.name,
    tagline: CERES_METADATA.tagline,
    category: CERES_METADATA.category,
    description: CERES_METADATA.tagline,
    route: CERES_METADATA.route,
    videoSrc: CERES_ASSETS.cardVideo,
    imageSrc: CERES_ASSETS.cardPoster,
    CardComponent: CeresCard,
    ToolAppComponent: CeresApp,
  },
];
