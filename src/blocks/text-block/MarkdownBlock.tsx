import React from 'react';
import { BlockProps } from '../../types';

export interface MarkdownBlockProps extends BlockProps {
  content: string;
  // Add other props as needed
}

export const MarkdownBlock: React.FC<MarkdownBlockProps> = ({
  id,
  content,
  className,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  
  
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  onChange,
  ...props
}) => {
  // Placeholder implementation
  return (
    <div 
      className={`block-kit-markdown-block ${className || ''}`}
      data-block-id={id}
      {...props}
    >
      {/* Placeholder for markdown rendering */}
      <pre>{content}</pre>
    </div>
  );
}; 