import React from 'react';
import { BlockProps } from '../../types';

export interface AIModel {
  id: string;
  name: string;
  description?: string;
}

export interface AIControlBlockProps extends BlockProps {
  models?: AIModel[];
  selectedModel?: string;
  temperature?: number;
  maxTokens?: number;
  onModelChange?: (modelId: string) => void;
  onSettingsChange?: (settings: Record<string, any>) => void;
  // Add other props as needed
}

export const AIControlBlock: React.FC<AIControlBlockProps> = ({
  id,
  models = [],
  selectedModel = '',
  temperature = 0.7,
  maxTokens = 256,
  onModelChange,
  onSettingsChange,
  className,
  onChange,
  ...props
}) => {
  // Placeholder implementation
  return (
    <div 
      className={`block-kit-ai-control-block ${className || ''}`}
      data-block-id={id}
      {...props}
    >
      <div className="model-selection">
        <label htmlFor={`model-select-${id}`}>AI Model</label>
        <select
          id={`model-select-${id}`}
          value={selectedModel}
          onChange={(e) => {
            onModelChange?.(e.target.value);
            onChange?.(id, { selectedModel: e.target.value });
          }}
        >
          <option value="" disabled>Select a model</option>
          {models.map((model) => (
            <option key={model.id} value={model.id}>{model.name}</option>
          ))}
        </select>
      </div>
      
      <div className="model-settings">
        <div className="setting-item">
          <label htmlFor={`temperature-${id}`}>Temperature: {temperature}</label>
          <input
            id={`temperature-${id}`}
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={temperature}
            onChange={(e) => {
              const newTemp = parseFloat(e.target.value);
              onSettingsChange?.({ temperature: newTemp });
              onChange?.(id, { temperature: newTemp });
            }}
          />
        </div>
        
        <div className="setting-item">
          <label htmlFor={`max-tokens-${id}`}>Max Tokens: {maxTokens}</label>
          <input
            id={`max-tokens-${id}`}
            type="range"
            min="1"
            max="4096"
            step="1"
            value={maxTokens}
            onChange={(e) => {
              const newMaxTokens = parseInt(e.target.value);
              onSettingsChange?.({ maxTokens: newMaxTokens });
              onChange?.(id, { maxTokens: newMaxTokens });
            }}
          />
        </div>
      </div>
    </div>
  );
}; 