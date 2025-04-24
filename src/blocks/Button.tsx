import React from 'react';
import { Button as HeroButton } from '@heroui/react';

export interface ButtonProps extends React.ComponentProps<typeof HeroButton> {
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return <HeroButton ref={ref} {...props} />;
  }
);

Button.displayName = 'Button'; 