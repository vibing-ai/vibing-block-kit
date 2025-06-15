import { BlockProps } from '../../types';
import React from 'react';
import { Button, Textarea } from '@heroui/react';
import { Icon } from '@iconify/react';
import { Paperclip, Mic } from 'lucide-react';

export interface PromptContainerFullLineBottomActionsBlockProps extends BlockProps {
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

export const PromptContainerFullLineBottomActionsBlock: React.FC<
  PromptContainerFullLineBottomActionsBlockProps
> = ({
  onSubmit,
  value = '',
  onChange,
  actionButtons,
  placeholder = 'Enter a prompt here',
  className,
  textareaClassName,
  actionsContainerClassName,
  disabled = false,
}) => {
  return (
    <div
      className="w-full relative border rounded-md bg-white"
      data-block-id="prompt-container-full-line-bottom-actions"
    >
      <Textarea
        value={value}
        onChange={e => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="w-full p-3 pr-20 resize-none border rounded-md"
        disabled={disabled}
        aria-label="Prompt input"
        rows={1}
      />
      <Button
        type="button"
        aria-label="Microphone"
        className="absolute top-2 right-2 flex items-center justify-center text-gray-500"
      >
        <Mic />
      </Button>

      <Button
        type="button"
        aria-label="Attach file"
        className="absolute bottom-2 left-2 flex items-center justify-center text-gray-500"
      >
        <Paperclip />
      </Button>

      <Button
        type="button"
        aria-label="Send message"
        className="absolute bottom-2 w-12 h-12 right-2 mr-1 flex items-center justify-center rounded-full bg-gray-200"
      >
        <Icon icon="heroicons:arrow-up" width={16} height={16} className="text-gray-800" />
      </Button>
    </div>
  );
};
