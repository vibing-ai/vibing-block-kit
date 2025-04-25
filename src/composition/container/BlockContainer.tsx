import React from 'react';
import { ContainerBlockProps } from '../../types';

export interface BlockContainerProps extends Omit<ContainerBlockProps, 'onChange'> {
  /**
   * Layout direction for the container
   */
  layout?: 'vertical' | 'horizontal' | 'grid';
  
  /**
   * Spacing between items
   */
  spacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  
  /**
   * Grid columns (only applies when layout is 'grid')
   */
  columns?: 1 | 2 | 3 | 4 | 6 | 12;
  
  /**
   * Whether the container should take up the full height of its parent
   */
  fullHeight?: boolean;
  
  /**
   * Whether to add a border to the container
   */
  bordered?: boolean;
  
  /**
   * Whether to add padding to the container
   */
  padding?: boolean | 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  
  /**
   * Whether to add a background color to the container
   */
  background?: boolean | 'default' | 'muted' | 'subtle' | 'card';
  
  /**
   * Optional callback when a block is dropped into the container
   */
  onDrop?: (e: React.DragEvent) => void;
  
  /**
   * Custom callback for when the block changes
   */
  onChangeBlock?: (id: string, data: Record<string, unknown>) => void;
}

/**
 * BlockContainer component for containing and arranging blocks
 */
export const BlockContainer: React.FC<BlockContainerProps> = ({
  id,
  children,
  layout = 'vertical',
  spacing = 'md',
  columns = 3,
  fullHeight = false,
  bordered = false,
  padding = 'md',
  background = false,
  onDrop,
  className = '',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  
  
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  onChangeBlock,
  ...props
}) => {
  // Mapping for layout styles
  const getFlexDirection = () => {
    switch(layout) {
      case 'vertical': return 'column';
      case 'horizontal': return 'row';
      default: return undefined;
    }
  };
  
  // Mapping for spacing values (HeroUI uses rem values)
  const spacingMap = {
    none: '0',
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  };
  
  // Mapping for padding values
  const paddingMap = {
    none: '0',
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  };
  
  // Calculate padding value
  let paddingValue = undefined;
  if (padding === true) {
    paddingValue = paddingMap.md;
  } else if (padding !== false) {
    paddingValue = paddingMap[padding];
  }
  
  // Determine if we should use grid or flex layout
  const isGrid = layout === 'grid';
  
  const handleDragOver = (e: React.DragEvent) => {
    if (onDrop) {
      e.preventDefault();
    }
  };
  
  // Background helper
  const getBackgroundColor = () => {
    if (background === false) return undefined;
    if (background === true) return 'var(--hero-color-background)';
    
    switch(background) {
      case 'default': return 'var(--hero-color-background)';
      case 'muted': return 'var(--hero-color-muted)';
      case 'subtle': return 'var(--hero-color-accent-100)';
      case 'card': return 'var(--hero-color-card)';
      default: return undefined;
    }
  };
  
  return (
    <div
      className={className}
      style={{
        display: isGrid ? 'grid' : 'flex',
        flexDirection: !isGrid ? getFlexDirection() as React.CSSProperties['flexDirection'] : undefined,
        flexWrap: layout === 'horizontal' ? 'wrap' : undefined,
        gridTemplateColumns: isGrid ? `repeat(${columns}, 1fr)` : undefined,
        gap: spacingMap[spacing],
        padding: paddingValue,
        height: fullHeight ? '100%' : undefined,
        borderWidth: bordered ? '1px' : undefined,
        borderStyle: bordered ? 'solid' : undefined,
        borderColor: bordered ? 'var(--hero-color-border)' : undefined,
        borderRadius: bordered ? 'var(--hero-border-radius)' : undefined,
        backgroundColor: getBackgroundColor()
      }}
      data-container-id={id}
      onDragOver={handleDragOver}
      onDrop={onDrop}
      {...props}
    >
      {children}
    </div>
  );
}; 