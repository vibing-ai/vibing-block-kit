import React from 'react';
import { BlockProps } from '../../types';

export interface AICompletionBlockProps extends BlockProps {
  prompt?: string;
  response?: string;
  isLoading?: boolean;
  onGenerate?: (prompt: string) => void;
  // Add other props as needed
}

export const AICompletionBlock: React.FC<AICompletionBlockProps> = ({
  id,
  prompt = '',
  response = '',
  isLoading = false,
  onGenerate,
  className,
  onChange,
  ...props
}) => {
  // Placeholder implementation
  return (
    <div 
      className={`block-kit-ai-completion-block ${className || ''}`}
      data-block-id={id}
      {...props}
    >
      <div className="prompt-section">
        <label htmlFor={`prompt-${id}`}>Prompt</label>
        <textarea
          id={`prompt-${id}`}
          defaultValue={prompt}
          placeholder="Enter your prompt here..."
          className="prompt-input"
          rows={3}
          disabled={isLoading}
          onChange={(e) => onChange?.(id, { prompt: e.target.value })}
        />
        <button 
          className="generate-button"
          disabled={isLoading}
          onClick={() => {
            const promptElement = document.getElementById(`prompt-${id}`) as HTMLTextAreaElement;
            if (promptElement && promptElement.value.trim()) {
              onGenerate?.(promptElement.value);
            }
          }}
        >
          {isLoading ? 'Generating...' : 'Generate'}
        </button>
      </div>
      
      <div className="response-section">
        <label htmlFor={`response-${id}`}>Response</label>
        <div 
          id={`response-${id}`} 
          className={`response-content ${isLoading ? 'is-loading' : ''}`}
        >
          {isLoading ? (
            <div className="loading-indicator">Generating response...</div>
          ) : response ? (
            response
          ) : (
            <div className="empty-response">Response will appear here</div>
          )}
        </div>
      </div>
    </div>
  );
}; 