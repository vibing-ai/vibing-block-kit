import React, { useState, useRef, useEffect } from 'react';
import { ImageBlockProps, ImageSource } from './types';
import { motion, AnimatePresence } from 'framer-motion';

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
 * A responsive image component with support for modern image formats,
 * lazy loading, and various styling options.
 */
const ImageBlock: React.FC<ImageBlockProps> = (props) => {
  const {
    id,
    src: srcProp,
    alt,
    width = '100%',
    height = 'auto',
    loading = 'lazy',
    caption,
    borderRadius = 'none',
    shadow = 'none',
    hasBorder = false,
    objectFit = 'cover',
    onLoad,
    onError,
    className = '',
    lqip, // Low Quality Image Placeholder
    zoomable = false,
    ...restProps
  } = props;

  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isInView, setIsInView] = useState(loading === 'eager');
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver>();

  // Handle both string and array of sources
  const sources = React.useMemo(() => 
    Array.isArray(srcProp) ? srcProp : [{ src: srcProp }],
    [srcProp]
  );
  
  // Get the default source URL
  const defaultSource = sources[0]?.src || '';

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
        rootMargin: '200px', // Start loading when within 200px of viewport
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

  const handleLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = event.target as HTMLImageElement;
    
    // Only mark as loaded when the image is actually loaded
    if (img.complete) {
      setIsLoaded(true);
      onLoad?.(event);
    } else {
      // If the image is not yet complete, wait for the load event
      img.onload = (e) => {
        setIsLoaded(true);
        onLoad?.(e as unknown as React.SyntheticEvent<HTMLImageElement, Event>);
      };
    }
  };

  const handleError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const error = new Error(`Failed to load image: ${defaultSource}`);
    setError(error);
    // Call the onError handler if provided
    onError?.(error);
    
    // Call the error handler from restProps if it exists
    if ('onError' in restProps && typeof restProps.onError === 'function') {
      restProps.onError(event);
    }
  };
  
  // Get the source URL for the image
  const getImageSrc = (source: string | ImageSource) => 
    typeof source === 'string' ? source : source?.src || '';

  // Calculate styles
  const containerStyle: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#f9fafb',
    borderRadius: typeof borderRadius === 'number' 
      ? `${borderRadius}px` 
      : radiusMap[borderRadius] || '0',
    boxShadow: shadowMap[shadow as keyof typeof shadowMap] || 'none',
    border: hasBorder ? '1px solid #e5e7eb' : 'none',
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
    opacity: isLoaded ? 1 : 0,
    transition: 'opacity 0.3s ease-in-out',
  };

  const captionStyle: React.CSSProperties = {
    padding: '0.75rem',
    textAlign: 'center',
    fontSize: '0.875rem',
    color: '#4b5563',
    backgroundColor: '#f9fafb',
    borderTop: '1px solid #e5e7eb',
  };

  const placeholderStyle: React.CSSProperties = {
    ...containerStyle,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: lqip ? 'transparent' : '#f3f4f6',
    color: '#6b7280',
    fontSize: '0.875rem',
    position: 'relative',
    overflow: 'hidden',
  };

  const lqipStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    filter: 'blur(20px)',
    transform: 'scale(1.1)',
    opacity: isLoaded ? 0 : 1,
    transition: 'opacity 0.3s ease-out',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    ...(lqip ? { backgroundImage: `url(${lqip})` } : {}),
  };

  // Render error state
  if (error) {
    return (
      <div id={id} style={placeholderStyle} className={className}>
        <span>Failed to load image</span>
        <div style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}>
          {error.message}
        </div>
      </div>
    );
  }

  // Render loading placeholder
  if (!isInView) {
    return (
      <div 
        ref={imgRef}
        id={id} 
        style={placeholderStyle} 
        className={className}
      >
        <div style={lqipStyle} />
        <span>Loading image...</span>
      </div>
    );
  }

  const imageContent = (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {lqip && <div style={lqipStyle} />}
      {sources.length > 1 ? (
        <picture>
          {sources.map((source, index) => (
              <source
                key={index}
                srcSet={typeof source !== 'string' ? source.srcSet : undefined}
                media={typeof source !== 'string' ? source.media : undefined}
                type={typeof source !== 'string' ? source.type : undefined}
                sizes={typeof source !== 'string' ? source.sizes : undefined}
              />
          ))}
          <img
            ref={imgRef}
            src={getImageSrc(sources[0])}
            alt={alt}
            loading={loading}
            style={{
              ...imageStyle,
              width: '100%',
              height: '100%',
              objectFit: objectFit,
            }}
            onLoad={handleLoad}
            onError={handleError}
            {...restProps}
          />
        </picture>
      ) : (
        <img
          ref={imgRef}
          src={getImageSrc(sources[0])}
          alt={alt}
          loading={loading}
          style={{
            ...imageStyle,
            width: '100%',
            height: '100%',
            objectFit: objectFit,
          }}
          onLoad={handleLoad}
          onError={handleError}
          {...restProps}
        />
      )}
    </div>
  );

  const handleClick = () => {
    if (zoomable) {
      setIsZoomed(true);
    }
  };

  const handleCloseZoom = () => {
    setIsZoomed(false);
  };

  return (
    <>
      <figure 
        id={id} 
        style={{ 
          margin: 0, 
          cursor: zoomable ? 'zoom-in' : 'default',
          position: 'relative',
        }} 
        className={className}
        onClick={handleClick}
      >
        <div style={containerStyle}>
          {imageContent}
          {!isLoaded && !error && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(243, 244, 246, 0.8)',
            }}>
              <span>Loading...</span>
            </div>
          )}
        </div>
        {caption && <figcaption style={captionStyle}>{caption}</figcaption>}
      </figure>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'zoom-out',
              padding: '2rem',
            }}
            onClick={handleCloseZoom}
          >
            <div style={{ maxWidth: '90vw', maxHeight: '90vh' }}>
              <img
                src={getImageSrc(sources[0])}
                alt={alt}
                style={{
                  maxWidth: '100%',
                  maxHeight: '90vh',
                  objectFit: 'contain',
                }}
              />
              {caption && (
                <div style={{
                  color: 'white',
                  textAlign: 'center',
                  marginTop: '1rem',
                  padding: '0.5rem',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  borderRadius: '4px',
                }}>
                  {caption}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ImageBlock;
