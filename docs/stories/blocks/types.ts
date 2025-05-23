import type { ImageBlockProps } from '../../../../src/blocks/media-block/ImageBlock';

export type BorderRadiusScale = 'none' | 'sm' | 'md' | 'lg' | 'full' | number;
export type ShadowScale = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

// Extend the base props and add our custom ones
export interface ImageBlockStoryProps extends Omit<ImageBlockProps, 'onLoad' | 'onError'> {
  onLoad?: () => void;
  onError?: (error: Error) => void;
  borderRadius?: BorderRadiusScale;
  shadow?: ShadowScale;
  lightbox?: boolean;
}
