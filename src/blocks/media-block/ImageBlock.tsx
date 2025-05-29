import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageBlockBaseProps } from './types';

// Extend the base props with additional features
export interface ImageBlockProps extends Omit<ImageBlockBaseProps, 'onLoad' | 'onError'> {
  /** Unique identifier for the component */
  id?: string;
  /** Enable zoom/lightbox functionality */
  zoomable?: boolean;
  /** @deprecated Use zoomable instead */
  lightbox?: boolean;
  /** Low Quality Image Placeholder (LQIP) for blur-up effect */
  lqip?: string;
  /** Custom class name for the container */
  className?: string;
  /** Callback when image is clicked */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  /** Custom styles for the container */
  style?: React.CSSProperties;
  /** Custom srcSet attribute */
  srcSet?: string;
  /** Custom sizes attribute for responsive images */
  sizes?: string;
  /** Apply rounded corners */
  rounded?: boolean;
  /** Image decoding hint */
  decoding?: 'sync' | 'async' | 'auto';
  /** Fetch priority hint */
  fetchPriority?: 'high' | 'low' | 'auto';
  /** Callback when image loads */
  onLoad?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
  /** Callback when image fails to load */
  onError?: (error: Error) => void;
}

export const ImageBlock: React.FC<ImageBlockProps> = ({
  id,
  src: srcProp,
  alt = 'Random image from picsum.photos',
  caption,
  width = '100%',
  height = 'auto',
  rounded = true,
  loading = 'lazy',
  zoomable = true,
  className = '',
  style,
  onLoad,
  onError,
  onClick,
  ...props
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string>('');
  const imgRef = useRef<HTMLImageElement>(null);
  
  // Generate a stable random ID using useRef to persist across renders
  const randomIdRef = useRef(Math.floor(Math.random() * 1000));
  // Use provided src or generate a random picsum.photos URL with the stable randomId
  const src = srcProp || `https://picsum.photos/id/${randomIdRef.current}/800/600`;
  
  // Handle LQIP (Low Quality Image Placeholder) and initial src
  useEffect(() => {
    if (props.lqip) {
      setCurrentSrc(props.lqip);
    } else if (src) {
      setCurrentSrc(src);
    }
    // Reset loaded state when src changes
    setIsLoaded(false);
  }, [src, props.lqip]);
  
  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setIsLoaded(true);
    // Only switch to full quality source if we're using LQIP
    if (props.lqip && currentSrc === props.lqip) {
      setCurrentSrc(src);
    }
    if (onLoad) {
      onLoad(e);
    }
  };
  
  const handleImageError = () => {
    if (onError) {
      onError(new Error('Failed to load image'));
    }
  };
  
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!isZoomable) {
      if (onClick) onClick(e);
      return;
    }
    setIsZoomed(prev => !prev);
    if (onClick) onClick(e);
  };

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isZoomed) {
        setIsZoomed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isZoomed]);
  
  const zoomedImageStyle: React.CSSProperties = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxHeight: '90vh',
    maxWidth: '90vw',
    cursor: 'zoom-out',
    borderRadius: rounded ? '0.5rem' : 0,
    zIndex: 10000,
  };
  
  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 9999,
    cursor: 'zoom-out',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    overflow: 'auto',
  };

  // Extract specific props to avoid passing them to the root div
  const { 
    lightbox, 
    decoding = 'async',
    fetchPriority = 'auto',
    objectFit = 'cover',
    ...validProps 
  } = props;
  
  // Get the zoomable value, defaulting to true if lightbox is true for backward compatibility
  const isZoomable = zoomable ?? lightbox ?? true;
  
  // Warn about deprecated lightbox prop
  useEffect(() => {
    if (lightbox !== undefined) {
      console.warn('The "lightbox" prop is deprecated and will be removed in a future version. Please use "zoomable" instead.');
    }
  }, [lightbox]);

  return (
    <div 
      className={`relative ${className}`}
      data-block-id={id}
      {...validProps}
    >
      <motion.figure
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`m-0 p-0 relative ${className || ''}`}
        style={{
          position: 'relative',
          width: '100%',
          height: height || 'auto',
          ...style
        }}
      >
        {/* LQIP (Low Quality Image Placeholder) */}
        {props.lqip && (
          <img
            src={props.lqip}
            alt=""
            className={`absolute inset-0 w-full h-full ${rounded ? 'rounded-lg' : ''} ${
              isLoaded ? 'opacity-0' : 'opacity-100'
            }`}
            style={{
              filter: 'blur(20px)',
              transform: 'scale(1.1)',
              objectFit: 'cover',
              transition: 'opacity 0.3s ease-in-out',
            }}
            aria-hidden="true"
          />
        )}
        
        {/* Main image */}
        <div 
          className={`relative cursor-${isZoomable ? 'zoom-in' : 'pointer'} ${className}`}
          onClick={handleClick}
          onKeyDown={isZoomable ? (e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              // Create a synthetic mouse event to handle the click
              const syntheticEvent = {
                ...e,
                stopPropagation: () => e.stopPropagation(),
                nativeEvent: e.nativeEvent,
                currentTarget: e.currentTarget,
                target: e.currentTarget,
                preventDefault: () => e.preventDefault(),
                isDefaultPrevented: () => false,
                isPropagationStopped: () => false,
              } as unknown as React.MouseEvent<HTMLDivElement>;
              handleClick(syntheticEvent);
            }
          } : undefined}
          role={isZoomable ? 'button' : undefined}
          tabIndex={isZoomable ? 0 : undefined}
          aria-label={isZoomable ? 'Toggle zoom' : undefined}
        >
          <img
            ref={imgRef}
            src={currentSrc}
            alt={alt}
            width={width}
            height={height}
            loading={loading}
            className={`block w-full h-auto transition-all duration-300 ${
              rounded ? 'rounded-lg' : ''
            } ${isZoomable ? 'hover:opacity-90 cursor-zoom-in' : 'cursor-default'} ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              maxWidth: '100%',
              objectFit: objectFit,
              aspectRatio: 'auto',
              transition: 'opacity 0.3s ease-in-out',
              pointerEvents: 'none' // Allow click to pass through to parent
            }}
            onLoad={handleImageLoad}
            onError={handleImageError}
            srcSet={props.srcSet}
            sizes={props.sizes}
            decoding={decoding}
            // Using a type assertion to bypass TypeScript's type checking for this attribute
            {...{ fetchpriority: fetchPriority } as React.ImgHTMLAttributes<HTMLImageElement>}
          />
        </div>
        {caption && (
          <figcaption className="mt-2 text-sm text-gray-500 text-center">
            {caption}
          </figcaption>
        )}
        
        {/* Loading indicator */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-gray-200 h-4 w-4"></div>
            </div>
          </div>
        )}
      </motion.figure>
      
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            key="zoom-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={overlayStyle}
            onClick={() => setIsZoomed(false)}
            onKeyDown={(e) => e.key === 'Escape' && setIsZoomed(false)}
            aria-label="Close zoomed image"
            role="button"
            tabIndex={0}
            className="fixed inset-0 w-screen h-screen"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={zoomedImageStyle}
              className="z-50"
              onClick={(e) => {
                e.stopPropagation();
                setIsZoomed(false);
              }}
            >
              <img
                src={currentSrc}
                alt={alt}
                style={{
                  maxWidth: '90vw',
                  maxHeight: '90vh',
                  objectFit: 'contain',
                }}
                loading="eager"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageBlock;
