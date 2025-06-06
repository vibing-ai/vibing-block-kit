import React from 'react';
import { PromptContainerFullLineBottomActions, PromptContainerFullLineBottomActionsProps } from './PromptContainerFullLineBottomActions';
import { cn } from '@/lib/utils';

export interface PromptContainerFullLineBottomActionsLargeProps extends PromptContainerFullLineBottomActionsProps {
  /** Size variant of the component */
  size?: 'sm' | 'md' | 'lg';
}

export const PromptContainerFullLineBottomActionsLarge: React.FC<PromptContainerFullLineBottomActionsLargeProps> = ({
  size = 'lg',
  className,
  textareaClassName,
  actionsContainerClassName,
  ...props
}) => {
  // Size-specific styles
  const sizeStyles = {
    sm: {
      container: 'text-sm',
      textarea: 'px-3 py-2 min-h-[48px]',
      actions: 'px-3 py-1.5 gap-1.5',
    },
    md: {
      container: 'text-base',
      textarea: 'px-4 py-3 min-h-[60px]',
      actions: 'px-4 py-2 gap-2',
    },
    lg: {
      container: 'text-lg',
      textarea: 'px-6 py-4 min-h-[72px]',
      actions: 'px-6 py-3 gap-3',
    },
  };

  const currentSize = sizeStyles[size];

  return (
    <PromptContainerFullLineBottomActions
      className={cn(currentSize.container, className)}
      textareaClassName={cn(currentSize.textarea, textareaClassName)}
      actionsContainerClassName={cn(currentSize.actions, actionsContainerClassName)}
      {...props}
    />
  );
}; 