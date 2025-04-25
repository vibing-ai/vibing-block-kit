import React, { ReactNode } from 'react';

export interface ScrollAreaProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  maxHeight?: string | number;
  orientation?: 'vertical' | 'horizontal' | 'both';
}

/**
 * ScrollArea component that provides a scrollable container
 * This is a custom implementation to replace the missing ScrollArea from @heroui/react
 */
export const ScrollArea: React.FC<ScrollAreaProps> = ({
  children,
  className = '',
  style = {},
  maxHeight = '300px',
  orientation = 'vertical',
}) => {
  const getOverflowStyle = () => {
    switch (orientation) {
      case 'horizontal':
        return 'overflow-x-auto overflow-y-hidden';
      case 'both':
        return 'overflow-auto';
      case 'vertical':
      default:
        return 'overflow-y-auto overflow-x-hidden';
    }
  };

  return (
    <div 
      className={`block-kit-scroll-area ${getOverflowStyle()} ${className}`}
      style={{
        maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
        ...style
      }}
    >
      {children}
    </div>
  );
}; 