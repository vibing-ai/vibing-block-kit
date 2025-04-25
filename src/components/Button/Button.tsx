import React from 'react';
import { Button as HeroButton } from '@heroui/react';

// We'll create our own button props that don't extend HeroButtonProps to avoid conflicts
export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
  testId?: string;
  className?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  'aria-label'?: string;
}

// Define HeroUI variant and size types to avoid using any
type HeroVariant = 'solid' | 'bordered' | 'flat' | 'ghost' | 'light';
type HeroSize = 'sm' | 'md' | 'lg';

// Map our variant to HeroUI variant
const variantMap: Record<string, HeroVariant> = {
  'default': 'solid',
  'destructive': 'solid',
  'outline': 'bordered',
  'secondary': 'flat',
  'ghost': 'ghost',
  'link': 'light'
};

// Map our size to HeroUI size
const sizeMap: Record<string, HeroSize> = {
  'default': 'md',
  'sm': 'sm',
  'lg': 'lg',
  'icon': 'sm'
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    children, 
    variant = 'default', 
    size = 'default', 
    iconLeft, 
    iconRight, 
    fullWidth = false,
    testId,
    className,
    ...props 
  }, ref) => {
    // Convert our variant/size to HeroUI's expected values
    const heroVariant = variantMap[variant] || 'solid';
    const heroSize = sizeMap[size] || 'md';
    
    return (
      <HeroButton
        ref={ref}
        variant={heroVariant}
        size={heroSize}
        className={`${fullWidth ? 'w-full' : ''} ${className || ''}`}
        data-testid={testId}
        {...props}
      >
        {iconLeft && <span className="mr-2">{iconLeft}</span>}
        {children}
        {iconRight && <span className="ml-2">{iconRight}</span>}
      </HeroButton>
    );
  }
);

Button.displayName = 'Button';

export default Button; 