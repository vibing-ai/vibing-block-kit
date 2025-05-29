import React, { useCallback, useEffect, useRef } from 'react';
import { BlockProps } from '@/types';
import { cn } from '@/lib/utils';

export interface PromptContainerFullLineBottomActionsProps extends Omit<BlockProps, 'id'> {
  /** Callback when message is submitted (click/send or keyboard shortcut) */
  onSubmit: (message: string) => void;
  /** Controlled value of the textarea */
  value?: string;
  /** Called when textarea value changes */
  onChange?: (value: string) => void;
  /** Custom action buttons (e.g. upload, mic, send) */
  actionButtons?: React.ReactNode;
  /** Placeholder text (default: "Type your message...") */
  placeholder?: string;
  /** Class for the main container */
  className?: string;
  /** Class for the textarea */
  textareaClassName?: string;
  /** Class for the actions container */
  actionsContainerClassName?: string;
  /** Disable input and send functionality */
  disabled?: boolean;
}

export const PromptContainerFullLineBottomActions: React.FC<PromptContainerFullLineBottomActionsProps> = ({
  onSubmit,
  value = '',
  onChange,
  actionButtons,
  placeholder = 'Type your message...',
  className,
  textareaClassName,
  actionsContainerClassName,
  disabled = false,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const liveRegionRef = useRef<HTMLDivElement>(null);

  // Auto-resize textarea based on content
  const adjustTextareaHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset height to auto to get the correct scrollHeight
    textarea.style.height = 'auto';
    // Set new height based on scrollHeight, with a max height of 200px
    textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
  }, []);

  // Adjust height when value changes
  useEffect(() => {
    adjustTextareaHeight();
  }, [value, adjustTextareaHeight]);

  // Handle keyboard shortcuts and submission
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter' && !disabled) {
        e.preventDefault();
        onSubmit(value);
        // Announce submission to screen readers
        if (liveRegionRef.current) {
          liveRegionRef.current.textContent = 'Message sent';
        }
      }
    },
    [onSubmit, value, disabled]
  );

  return (
    <div
      className={cn(
        'relative flex flex-col w-full border rounded-lg bg-background',
        className
      )}
      role="group"
      aria-label="Message input"
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          'w-full px-4 py-3 bg-transparent border-0 resize-none focus:outline-none focus:ring-0',
          'min-h-[60px] max-h-[200px]',
          disabled && 'opacity-50 cursor-not-allowed',
          textareaClassName
        )}
        aria-label="Message input"
      />
      <div
        className={cn(
          'flex items-center justify-end gap-2 px-4 py-2 border-t',
          actionsContainerClassName
        )}
      >
        {actionButtons}
      </div>
      {/* Live region for screen reader announcements */}
      <div
        ref={liveRegionRef}
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      />
    </div>
  );
}; 