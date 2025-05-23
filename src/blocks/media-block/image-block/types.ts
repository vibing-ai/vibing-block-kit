import { BlockProps } from '../../../types';

export type ImageSource = {
  /** URL of the image */
  src: string;
  /** Image sources for different viewport sizes */
  srcSet?: string;
  /** Media query for the source */
  media?: string;
  /** MIME type of the image */
  type?: string;
  /** Image sizes attribute for responsive images */
  sizes?: string;
};

export type BorderRadiusScale = 'none' | 'sm' | 'md' | 'lg' | 'full' | number;
export type ShadowScale = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface ImageBlockProps extends Omit<BlockProps, 'onChange'> {
  /**
   * Single image source or array of sources for responsive images
   */
  src: string | ImageSource[];
  
  /**
   * Required alt text for accessibility
   */
  alt: string;
  
  /**
   * Image width (can be number or string with units)
   */
  width?: number | string;
  
  /**
   * Image height (can be number or string with units)
   */
  height?: number | string;
  
  /**
   * Loading behavior ('lazy' or 'eager')
   * @default 'lazy'
   */
  loading?: 'lazy' | 'eager';
  
  /**
   * Optional caption displayed below the image
   */
  caption?: string;
  
  /**
   * Border radius scale or custom value
   * @default 'none'
   */
  borderRadius?: BorderRadiusScale;
  
  /**
   * Low Quality Image Placeholder (LQIP) for blur-up effect
   * A base64-encoded thumbnail or small version of the image
   */
  lqip?: string;
  
  /**
   * Enable click-to-zoom functionality
   * @default false
   */
  zoomable?: boolean;
  
  /**
   * Shadow scale
   * @default 'none'
   */
  shadow?: ShadowScale;
  
  /**
   * Show border around the image
   * @default false
   */
  hasBorder?: boolean;
  
  /**
   * How the image should be resized to fit its container
   * @default 'cover'
   */
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  
  /**
   * Callback when image loads successfully
   */
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  
  /**
   * Callback when image fails to load
   */
  onError?: (error: Error) => void;
  
  /**
   * Custom class name for additional styling
   */
  className?: string;
}
