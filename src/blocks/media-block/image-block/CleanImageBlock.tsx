import React, { useCallback, useEffect, useState } from 'react';
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
  ..._restProps
}) => {
  // State for tracking zoom state
  const [isZoomed, setIsZoomed] = useState(false);
  
  // Handle both string and array of sources
  const isResponsive = Array.isArray(srcProp) && srcProp.length > 0;
  const sources = isResponsive ? srcProp : [];
  const mainSrc = isResponsive ? sources[0]?.src || '' : (typeof srcProp === 'string' ? srcProp : '');
  
  // Toggle zoom state
  const toggleZoom = useCallback(() => {
    if (zoomable) {
      setIsZoomed(prev => !prev);
    }
  }, [zoomable]);
  
  // Handle keyboard events for accessibility
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleZoom();
    } else if (e.key === 'Escape' && isZoomed) {
      setIsZoomed(false);
    }
  }, [isZoomed, toggleZoom]);
  
  // Handle click on image
  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    toggleZoom();
  }, [toggleZoom]);

  // Close zoom when clicking outside
  const handleCloseZoom = useCallback(() => {
    setIsZoomed(false);
  }, []);

  // Handle image load
  const handleLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    if (onLoad) {
      onLoad(e);
    }
  }, [onLoad]);

  // Handle image error
  const handleError = useCallback((_e: React.SyntheticEvent<HTMLImageElement>) => {
    console.error('Failed to load image:', mainSrc);
    
    // Call the onError callback if provided
    if (onError) {
      const error = new Error(`Failed to load image: ${mainSrc}`);
      onError(error);
    }
  }, [mainSrc, onError]);

  // Render error state
  if (false) {
    return (
      <div 
        className={`relative flex items-center justify-center bg-gray-100 text-gray-400 rounded-md border border-gray-200 ${className || ''}`}
        style={{
          width,
          height,
          borderRadius: radiusMap[borderRadius as string] || borderRadius,
          boxShadow: shadowMap[shadow as string] || shadow,
        }}
      >
        <div className="flex flex-col items-center p-4 text-center">
          <svg
            className="w-12 h-12 mb-2 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M18 8l-8 8-4-4-6 6"
              className="text-red-300"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M6 18L18 6M6 6l12 12"
              className="text-red-400"
            />
          </svg>
          <p className="text-sm text-gray-500">Failed to load image</p>
          {alt && <p className="text-xs text-gray-400 mt-1">{alt}</p>}
        </div>
      </div>
    );
  }
  
  // Handle body scroll when zoomed
  useEffect(() => {
    if (!isZoomed) return;
    
    // Store the current scroll position and disable scrolling
    const scrollY = window.scrollY;
    const body = document.body;
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = '100%';
    body.style.overflow = 'hidden';
      
      return () => {
        // Re-enable scrolling and restore scroll position when unmounting or zooming out
        body.style.position = '';
        body.style.top = '';
        body.style.width = '';
        body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isZoomed]);

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
