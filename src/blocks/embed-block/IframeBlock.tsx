import React from 'react';
import { BlockProps } from '../../types';

export interface IframeBlockProps extends BlockProps {
  src: string;
  title?: string;
  width?: string | number;
  height?: string | number;
  allowFullscreen?: boolean;
  // Add other props as needed
}

export const IframeBlock: React.FC<IframeBlockProps> = ({
  id,
  src,
  title,
  width = '100%',
  height = 400,
  allowFullscreen = true,
  className,
  onChange,
  ...props
}) => {
  // Placeholder implementation
  return (
    <div 
      className={`block-kit-iframe-block ${className || ''}`}
      data-block-id={id}
      {...props}
    >
      <iframe
        src={src}
        title={title || 'Embedded content'}
        width={width}
        height={height}
        allowFullScreen={allowFullscreen}
        style={{ border: 'none' }}
      />
    </div>
  );
}; 