import React from 'react';

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * The HTML element to render
   */
  as?: keyof JSX.IntrinsicElements;
  
  /**
   * Font size
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  
  /**
   * Text weight
   */
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  
  /**
   * Text color
   */
  color?: string;
  
  /**
   * Margin padding (shorthand for padding)
   */
  p?: string;
  
  /**
   * Padding X (left and right)
   */
  px?: string;
  
  /**
   * Padding Y (top and bottom)
   */
  py?: string;
  
  /**
   * Border bottom
   */
  borderBottom?: string;
  
  /**
   * Border color
   */
  borderColor?: string;
  
  /**
   * Text alignment
   */
  textAlign?: 'left' | 'center' | 'right';
  
  /**
   * Children
   */
  children: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({
  as: Component = 'p',
  size = 'md',
  weight = 'normal',
  color,
  p,
  px,
  py,
  borderBottom,
  borderColor,
  textAlign,
  className = '',
  children,
  ...props
}) => {
  // Map size to tailwind classes
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
  };
  
  // Map weight to tailwind classes
  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };
  
  // Build class string
  const classes = [
    sizeClasses[size],
    weightClasses[weight],
    color ? `text-${color}` : '',
    p ? `p-${p}` : '',
    px ? `px-${px}` : '',
    py ? `py-${py}` : '',
    borderBottom ? `border-b-${borderBottom}` : '',
    borderColor ? `border-${borderColor}` : '',
    textAlign ? `text-${textAlign}` : '',
    className,
  ].filter(Boolean).join(' ');
  
  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};

export default Text; 