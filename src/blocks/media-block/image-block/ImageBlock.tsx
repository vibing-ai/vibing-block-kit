import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ImageBlockProps, ImageSource } from './types';

// Extend the standard image attributes with proper typing for fetchPriority
interface ImageElementProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fetchPriority?: 'high' | 'low' | 'auto';
}

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

/**
 * Generates a srcset string from an array of image sources
 * @param sources - Array of image sources with optional srcSet or width/height
 * @returns A valid srcset string or empty string if no valid sources
 */
const generateSrcSet = (sources: ImageSource[]): string => {
  if (!Array.isArray(sources) || sources.length === 0) {
    return '';
  }

  return sources
    .map((source): string | undefined => {
      if (!source?.src) {
        return undefined;
      }

      // If srcSet is provided, use it as is
      if (source.srcSet) {
        return source.srcSet.trim();
      }

      // Only append width descriptor if it's a positive number
      const width = Number(source.width);
      if (Number.isFinite(width) && width > 0) {
        return `${source.src.trim()} ${width}w`;
      }

      // For invalid or missing width, just return the src
      return source.src.trim();
    })
    .filter((src): src is string => Boolean(src))
    .join(', ');
};

/**
 * Generates a sizes attribute string from an array of image sources
 * @param sources - Array of image sources with optional media and sizes
 * @returns A valid sizes attribute string or empty string if no valid sources
 */
const generateSizes = (sources: ImageSource[]): string => {
  if (!Array.isArray(sources) || sources.length === 0) {
    return '';
  }

  return sources
    .map((source): string | undefined => {
      const media = source.media?.trim();
      const sizes = source.sizes?.trim();

      if (!media || !sizes) {
        return undefined;
      }

      return `(${media}) ${sizes}`;
    })
    .filter((size): size is string => Boolean(size))
    .join(', ');
};

/**
 * A responsive image component with support for modern image formats,
 * lazy loading, and various styling options.
 */
const EnhancedImageBlock: React.FC<ImageBlockProps> = ({
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
  srcSet,
  sizes = '100vw',
  ...restProps
}) => {
  // State for tracking image loading status and zoom
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isInView, setIsInView] = useState(loading === 'eager');
  const [currentSrc, setCurrentSrc] = useState<string>('');
  
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver>();
  
  // Handle both string and array of sources
  const isResponsive = Array.isArray(srcProp) && srcProp.length > 0;
  const sources = isResponsive ? srcProp : [];
  const mainSrc = isResponsive 
    ? sources[0]?.src ?? '' 
    : (typeof srcProp === 'string' ? srcProp : '');
  
  // Generate srcset and sizes for responsive images
  const generatedSrcSet = isResponsive ? generateSrcSet(sources) : srcSet;
  const generatedSizes = isResponsive ? (sizes || generateSizes(sources)) : sizes;

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
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (zoomable) {
        toggleZoom();
      }
    } else if (event.key === 'Escape' && isZoomed) {
      setIsZoomed(false);
    }
  };
  
  // Handle zoom state and body overflow
  useEffect(() => {
    // Store the original overflow value to restore it later
    const originalOverflow = document.body.style.overflow;
    
    const handleClickOutside = (e: MouseEvent) => {
      if (isZoomed && containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsZoomed(false);
      }
    };
    
    // Add event listeners when zoomed
    if (isZoomed) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }
    
    // Cleanup function that runs on unmount or when dependencies change
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      
      // Always reset overflow to its original value on cleanup
      document.body.style.overflow = originalOverflow || 'unset';
      
      // If still zoomed in when unmounting, ensure we reset the overflow
      if (isZoomed) {
        document.body.style.overflow = 'unset';
      }
    };
  }, [isZoomed]);
  
  // Set up intersection observer for lazy loading
  useEffect(() => {
    if (loading !== 'lazy' || !imgRef.current || isInView) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '200px',
        threshold: 0.01,
      }
    );
    
    observer.observe(imgRef.current);
    observerRef.current = observer;
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loading, isInView]);
  
  // Load the actual image after component mounts if using LQIP
  useEffect(() => {
    if (lqip && currentSrc === lqip) {
      const img = new window.Image();
      let isMounted = true;
      
      img.src = mainSrc;
      img.onload = () => {
        if (isMounted) {
          setCurrentSrc(mainSrc);
        }
      };
      img.onerror = () => {
        if (isMounted) {
          const error = new Error(`Failed to load image: ${mainSrc}`);
          setError(error);
          if (onError) onError(error);
        }
      };
      
      return () => {
        isMounted = false;
        // Clean up the image object
        img.onload = null;
        img.onerror = null;
      };
    }
  }, [lqip, mainSrc, currentSrc, onError]);
  
  // Container styles
  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    borderRadius: typeof borderRadius === 'number' 
      ? `${borderRadius}px` 
      : radiusMap[borderRadius] || '0',
    boxShadow: shadowMap[shadow as string] || 'none',
    border: hasBorder ? '1px solid #e2e8f0' : 'none',
    overflow: 'hidden',
    backgroundColor: '#f8fafc',
    ...(zoomable ? { cursor: 'zoom-in' } : {}),
  };
  
  // Image styles
  const imageStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit,
    objectPosition: 'center',
    opacity: isLoaded ? 1 : 0,
    transition: 'opacity 0.3s ease-in-out',
  };
  
  // Placeholder styles (shown while loading)
  const placeholderStyle: React.CSSProperties = {
    ...containerStyle,
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f5f9',
    color: '#64748b',
    fontSize: '0.875rem',
    opacity: isLoaded ? 0 : 1,
    transition: 'opacity 0.3s ease-in-out',
  };
  
  // LQIP styles (if provided)
  const lqipStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'blur(20px)',
    opacity: isLoaded ? 0 : 1,
    transition: 'opacity 0.3s ease-in-out',
  };
  
  // Overlay for zoomed image
  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    zIndex: 999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'zoom-out',
  };
  
  // Handle click on image
  const handleClick = () => {
    if (zoomable) {
      setIsZoomed(true);
    }
  };
  
  // Handle closing the zoomed view
  const handleCloseZoom = () => {
    setIsZoomed(false);
  };

  return (
    <>
      <figure 
        id={id} 
        className={`image-block ${className}`} 
        style={containerStyle}
        ref={containerRef}
      >
        {/* LQIP (Low Quality Image Placeholder) */}
        {lqip && (
          <img
            src={lqip}
            alt=""
            aria-hidden="true"
            style={lqipStyle}
            className="image-lqip"
          />
        )}
        
        {/* Main image */}
        {zoomable ? (
          <button
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label={isZoomed ? 'Zoom out' : 'Zoom in'}
          >
            <img
              ref={imgRef}
              src={currentSrc}
              alt={alt}
              width={typeof width === 'number' ? width : undefined}
              height={typeof height === 'number' ? height : undefined}
              loading={loading}
              decoding={decoding}
              // Using properly typed image props
              {...{ fetchPriority } as ImageElementProps}
              style={{
                ...imageStyle,
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit
              }}
              className={`image-main ${isLoaded ? 'is-loaded' : ''}`}
              onLoad={handleLoad}
              onError={handleError}
              {...(generatedSrcSet ? { srcSet: generatedSrcSet } : {})}
              {...(generatedSizes ? { sizes: generatedSizes } : {})}
              {...restProps}
            />
          </button>
        ) : (
          <img
            ref={imgRef}
            src={currentSrc}
            alt={alt}
            width={typeof width === 'number' ? width : undefined}
            height={typeof height === 'number' ? height : undefined}
            loading={loading}
            decoding={decoding}
            // Using properly typed image props
            {...{ fetchPriority } as ImageElementProps}
            style={{
              ...imageStyle,
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit
            }}
            className={`image-main ${isLoaded ? 'is-loaded' : ''}`}
            onLoad={handleLoad}
            onError={handleError}
            {...(generatedSrcSet ? { srcSet: generatedSrcSet } : {})}
            {...(generatedSizes ? { sizes: generatedSizes } : {})}
            {...restProps}
          />
        )}
        
        {/* Loading placeholder */}
        {!isLoaded && !lqip && (
          <div style={placeholderStyle} className="image-placeholder">
            Loading...
          </div>
        )}
        
        {/* Error state */}
        {error && (
          <div className="image-error" style={placeholderStyle}>
            Error loading image
          </div>
        )}
        
        {/* Caption */}
        {caption && (
          <figcaption className="image-caption">
            {caption}
          </figcaption>
        )}
      </figure>
      
      {/* Zoomed image overlay */}
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
            aria-label="Close zoomed image"
          >
            <motion.img
              src={currentSrc}
              alt={alt}
              style={{
                maxWidth: '90vw',
                maxHeight: '90vh',
                objectFit: 'contain',
              }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EnhancedImageBlock;
