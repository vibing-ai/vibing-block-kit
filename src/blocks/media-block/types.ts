export type BorderRadiusScale = 'none' | 'sm' | 'md' | 'lg' | 'full' | number;
export type ShadowScale = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface ImageBlockBaseProps {
  /** The source URL of the image */
  src: string;
  /** Alternative text for the image (required for accessibility) */
  alt: string;
  /** Optional caption displayed below the image */
  caption?: string;
  /** Width of the image in pixels */
  width?: string | number;
  /** Height of the image in pixels */
  height?: string | number;
  /** Loading behavior of the image */
  loading?: 'eager' | 'lazy';
  /** Border radius size */
  borderRadius?: BorderRadiusScale;
  /** Shadow size */
  shadow?: ShadowScale;
  /** Whether to show a border around the image */
  hasBorder?: boolean;
  /** How the image should be resized to fit its container */
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  /** Enable lightbox functionality on click */
  lightbox?: boolean;
  /** Callback when image loads successfully */
  onLoad?: () => void;
  /** Callback when image fails to load */
  onError?: (error: Error) => void;
}
