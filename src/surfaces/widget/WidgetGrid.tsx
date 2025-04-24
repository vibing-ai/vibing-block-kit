import React, { useState, useEffect } from 'react';

interface WidgetGridProps {
  children: React.ReactNode;
  columns?: number;
  gap?: number;
  breakpoints?: Record<string, number>;
  className?: string;
}

/**
 * Grid layout for organizing widgets in a responsive dashboard
 */
export const WidgetGrid: React.FC<WidgetGridProps> = ({
  children,
  columns = 12,
  gap = 4,
  breakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  },
  className = '',
}) => {
  const [currentColumns, setCurrentColumns] = useState(columns);
  
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      
      if (width < breakpoints.sm) {
        setCurrentColumns(1);
      } else if (width < breakpoints.md) {
        setCurrentColumns(2);
      } else if (width < breakpoints.lg) {
        setCurrentColumns(3);
      } else if (width < breakpoints.xl) {
        setCurrentColumns(4);
      } else {
        setCurrentColumns(columns);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [breakpoints, columns]);
  
  return (
    <div 
      className={`grid ${className}`}
      style={{
        gridTemplateColumns: `repeat(${currentColumns}, minmax(0, 1fr))`,
        gap: `${gap * 0.25}rem`,
      }}
    >
      {children}
    </div>
  );
};

export interface WidgetGridItemProps {
  children: React.ReactNode;
  colSpan?: number | { [key: string]: number };
  rowSpan?: number;
  className?: string;
}

/**
 * Individual item within the widget grid
 */
export const WidgetGridItem: React.FC<WidgetGridItemProps> = ({
  children,
  colSpan = 1,
  rowSpan = 1,
  className = '',
}) => {
  const getResponsiveClasses = () => {
    if (typeof colSpan === 'number') {
      return `col-span-${colSpan}`;
    }
    
    const classes = [];
    
    if (colSpan.xs) {
      classes.push(`col-span-${colSpan.xs}`);
    }
    if (colSpan.sm) {
      classes.push(`sm:col-span-${colSpan.sm}`);
    }
    if (colSpan.md) {
      classes.push(`md:col-span-${colSpan.md}`);
    }
    if (colSpan.lg) {
      classes.push(`lg:col-span-${colSpan.lg}`);
    }
    if (colSpan.xl) {
      classes.push(`xl:col-span-${colSpan.xl}`);
    }
    
    return classes.join(' ');
  };
  
  return (
    <div 
      className={`
        ${getResponsiveClasses()}
        row-span-${rowSpan}
        ${className}
      `}
    >
      {children}
    </div>
  );
}; 