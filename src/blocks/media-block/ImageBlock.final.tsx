import React from 'react';

type BorderRadiusScale = 'none' | 'sm' | 'md' | 'lg' | 'full' | number;
type ShadowScale = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface ImageBlockProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  id: string;
  caption?: string;
  lazy?: boolean;
  borderRadius?: BorderRadiusScale;
  shadow?: ShadowScale;
  hasBorder?: boolean;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  onImageError?: (error: Error) => void;
}

const radiusMap: Record<string, string> = {
  none: '0',
  sm: '0.25rem',
  md: '0.5rem',
  lg: '1rem',
  full: '9999px',
};

const shadowMap: Record<string, string> = {
  none: 'none',
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
};

export const ImageBlock: React.FC<ImageBlockProps> = ({
  id,
  src,
  alt,
  srcSet,
  sizes,
  width = '100%',
  height = 'auto',
  loading: loadingProp = 'lazy',
  lazy,
  caption,
  borderRadius = 'md',
  shadow = 'none',
  hasBorder = false,
  objectFit = 'cover',
  onImageError,
  onLoad,
  onError,
  ...props
}) => {
  const loading = lazy !== undefined ? (lazy ? 'lazy' : 'eager') : loadingProp;

  const containerStyle: React.CSSProperties = {
    maxWidth: '100%',
    borderRadius: typeof borderRadius === 'number' 
      ? `${borderRadius}px` 
      : radiusMap[borderRadius] || '0',
    boxShadow: shadowMap[shadow] || 'none',
    border: hasBorder ? '1px solid #e5e7eb' : 'none',
    overflow: 'hidden',
    backgroundColor: '#f9fafb',
    display: 'inline-block',
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  const imageStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'block',
    objectFit,
    maxWidth: '100%',
    verticalAlign: 'middle',
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error('Failed to load image:', e);
    onImageError?.(new Error('Failed to load image'));  
  };

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    onLoad?.(e);
  };

  return (
    <div id={id} style={containerStyle} {...props}>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <img
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          width={typeof width === 'number' ? width : undefined}
          height={typeof height === 'number' ? height : undefined}
          loading={loading}
          style={imageStyle}
          onError={handleImageError}
          onLoad={handleLoad}
          {...props}
        />
      </div>
      {caption && (
        <div style={{
          padding: '0.5rem',
          textAlign: 'center',
          fontSize: '0.875rem',
          color: '#4b5563',
          backgroundColor: '#f3f4f6',
          borderTop: '1px solid #e5e7eb'
        }}>
          {caption}
        </div>
      )}
    </div>
  );
};

export default ImageBlock;
