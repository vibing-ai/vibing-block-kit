import React from 'react';
import { Button as HeroButton, ButtonProps as HeroButtonProps } from '@heroui/react';

export interface ButtonProps extends Omit<HeroButtonProps, 'asChild'> {
  children: React.ReactNode;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
  testId?: string;
}

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
    return (
      <HeroButton
        ref={ref}
        variant={variant}
        size={size}
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