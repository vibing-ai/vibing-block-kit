import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ImageBlockProps, ImageSource } from './types';

// Default radius values for different scales
const radiusMap: Record<string, string> = {
  none: '0',
  sm: '0.25rem',
  md: '0.5rem',
  lg: '1rem',
  full: '9999px',
};

// Default shadow values for different scales
const shadowMap: Record<string, string> = {
  none: 'none',
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
};

// Type predicate to check if a value is a non-empty string
const isNonEmptyString = (value: unknown): value is string => {
  return typeof value === 'string' && value.trim() !== '';
};

// Generate srcset string from sources
const generateSrcSet = (sources: ImageSource[]): string => {
  return sources
    .map((source) => {
      if (source.srcSet) {
        return source.srcSet;
      }
      const widthSuffix = source.width ? ` ${source.width}w` : '';
      return `${source.src}${widthSuffix}`;
    })
    .filter(isNonEmptyString)
    .join(', ');
};

// Generate sizes attribute
const generateSizes = (sources: ImageSource[]): string => {
  return sources
    .map((source) => {
      if (source.sizes) {
        return source.sizes;
      }
      return source.media ? `(max-width: ${source.media}) 100vw` : '100vw';
    })
    .filter(isNonEmptyString)
    .join(', ');
};

const CleanImageBlock: React.FC<ImageBlockProps> = ({
  id,
  src: srcProp,
  alt,
  width = '100%',
  height = 'auto',
  loading = 'lazy',
  decoding = 'async',
  fetchPriority = 'auto',
  caption,
  borderRadius = 'none',
  shadow = 'none',
  hasBorder = false,
  objectFit = 'cover',
  onLoad,
  onError,
  className = '',
  lqip,
  zoomable = false,
  srcSet: propSrcSet,
  sizes: propSizes,
  ...restProps
}) => {
  // State for tracking image loading status and zoom
  const [isLoaded, setIsLoaded] = useState(false);
  const [, setError] = useState<Error | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string>('');
  
  // Refs
  const buttonRef = useRef<HTMLButtonElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const lqipRef = useRef<HTMLImageElement>(null);
  
  // Handle both string and array of sources
  const isResponsive = Array.isArray(srcProp) && srcProp.length > 0;
  const sources = isResponsive ? srcProp : [];
  const mainSrc = isResponsive ? sources[0]?.src || '' : (typeof srcProp === 'string' ? srcProp : '');
  
  // Generate srcset and sizes for responsive images
  const generatedSrcSet = isResponsive ? generateSrcSet(sources) : propSrcSet;
  const generatedSizes = isResponsive ? (propSizes || generateSizes(sources)) : propSizes;

  // Set initial source (LQIP or main source)
  useEffect(() => {
    setCurrentSrc(lqip || mainSrc);
  }, [lqip, mainSrc]);
  
  // Handle image load
  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    // If we were using LQIP, switch to the actual image
    if (lqip && currentSrc === lqip) {
      setCurrentSrc(mainSrc);
      return; // Don't mark as loaded yet, wait for the actual image to load
    }
    
    setIsLoaded(true);
    setError(null);
    
    if (onLoad) {
      onLoad(e);
    }
  };
  
  // Handle image error
  const handleError = () => {
    const imgError = new Error(`Failed to load image: ${currentSrc}`);
    setError(imgError);
    
    if (onError) {
      onError(imgError);
    }
  };
  
  // Toggle zoom state
  const toggleZoom = () => {
    if (zoomable) {
      setIsZoomed(!isZoomed);
    }
  };
  
  // Handle keyboard events for accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (zoomable) {
        toggleZoom();
      }
    } else if (e.key === 'Escape' && isZoomed) {
      setIsZoomed(false);
    }
  };
  
  // Handle click on image
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (zoomable) {
      toggleZoom();
    }
  };
  
  // Close zoom when clicking outside
  const handleCloseZoom = () => {
    setIsZoomed(false);
  };

  // Container styles
  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    borderRadius: typeof borderRadius === 'number' 
      ? `${borderRadius}px` 
      : radiusMap[borderRadius] || '0',
    boxShadow: shadowMap[shadow] || 'none',
    border: hasBorder ? '1px solid #e2e8f0' : 'none',
    overflow: 'hidden',
    ...(zoomable ? { cursor: 'pointer' } : {}),
  };

  // Overlay styles for zoomed state
  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    cursor: 'zoom-out',
  };

  // Render the image content
  const renderImageContent = () => (
    <>
      {/* LQIP (Low Quality Image Placeholder) */}
      {lqip && (
        <img
          ref={lqipRef}
          src={lqip}
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'blur(20px)',
            opacity: isLoaded ? 0 : 1,
            transition: 'opacity 0.3s ease',
          }}
        />
      )}
      
      {/* Main image */}
      <img
        ref={imgRef}
        src={currentSrc}
        alt={alt}
        width={typeof width === 'number' ? width : undefined}
        height={typeof height === 'number' ? height : undefined}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
        srcSet={generatedSrcSet}
        sizes={generatedSizes}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          objectFit,
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
        {...restProps}
      />
    </>
  );

  // Render the appropriate container based on zoomable prop
  const renderContainer = () => {
    const commonProps = {
      id,
      className: `image-block ${className}`,
      style: {
        ...containerStyle,
        ...(zoomable ? {
          background: 'none',
          border: 'none',
          padding: 0,
          font: 'inherit',
          cursor: 'pointer',
          outline: 'inherit',
        } : {})
      },
      onClick: zoomable ? handleClick : undefined,
      onKeyDown: zoomable ? handleKeyDown : undefined,
      'aria-label': zoomable ? (isZoomed ? 'Zoom out' : 'Zoom in') : undefined,
    };

    return zoomable ? (
      <button {...commonProps} ref={buttonRef}>
        {renderImageContent()}
      </button>
    ) : (
      <div {...commonProps} ref={divRef}>
        {renderImageContent()}
      </div>
    );
  };

  return (
    <>
      {renderContainer()}
      
      {/* Zoom overlay */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={overlayStyle}
            onClick={handleCloseZoom}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            aria-label="Close zoom"
          >
            <div style={{ maxWidth: '90vw', maxHeight: '90vh' }}>
              <img
                src={currentSrc}
                alt={alt}
                style={{
                  maxWidth: '100%',
                  maxHeight: '90vh',
                  objectFit: 'contain',
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Caption */}
      {caption && (
        <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
          {caption}
        </div>
      )}
    </>
  );
};

export default CleanImageBlock;
