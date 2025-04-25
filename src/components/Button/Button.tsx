import React from 'react';
import { Button as HeroButton, ButtonProps as HeroButtonProps } from '@heroui/react';

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

// Map our variant to HeroUI variant
const variantMap: Record<string, string> = {
  'default': 'solid',
  'destructive': 'solid',
  'outline': 'bordered',
  'secondary': 'flat',
  'ghost': 'ghost',
  'link': 'light'
};

// Map our size to HeroUI size
const sizeMap: Record<string, string> = {
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
        variant={heroVariant as any}
        size={heroSize as any}
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