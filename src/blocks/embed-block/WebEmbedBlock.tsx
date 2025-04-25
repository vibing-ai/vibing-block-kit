import React from 'react';
import { BlockProps } from '../../types';

export interface WebEmbedBlockProps extends BlockProps {
  url: string;
  title?: string;
  description?: string;
  thumbnailUrl?: string;
  width?: string | number;
  height?: string | number;
  // Add other props as needed
}

export const WebEmbedBlock: React.FC<WebEmbedBlockProps> = ({
  id,
  url,
  title,
  description,
  thumbnailUrl,
  width = '100%',
  height = 'auto',
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
      className={`block-kit-web-embed-block ${className || ''}`}
      data-block-id={id}
      style={{ width, height }}
      {...props}
    >
      <div className="embed-content">
        {thumbnailUrl && (
          <div className="embed-thumbnail">
            <img src={thumbnailUrl} alt={title || 'Embedded content'} />
          </div>
        )}
        <div className="embed-info">
          {title && <h3 className="embed-title">{title}</h3>}
          {description && <p className="embed-description">{description}</p>}
          <a href={url} target="_blank" rel="noopener noreferrer" className="embed-url">
            {url}
          </a>
        </div>
      </div>
    </div>
  );
}; 