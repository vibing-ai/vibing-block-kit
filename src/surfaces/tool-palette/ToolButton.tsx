import React from 'react';
import { Tool } from './ToolPalette';

interface ToolButtonProps {
  tool: Tool;
  onClick?: (tool: Tool) => void;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  isActive?: boolean;
}

/**
 * Individual tool button component
 */
export const ToolButton: React.FC<ToolButtonProps> = ({
  tool,
  onClick,
  showLabel = false,
  size = 'md',
  className = '',
  isActive = false,
}) => {
  const {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
   id, label, icon, disabled, action } = tool;
  
  const handleClick = () => {
    if (disabled) return;
    
    if (onClick) {
      onClick(tool);
    }
    
    if (action) {
      action();
    }
  };
  
  const sizeClasses = {
    sm: 'p-1 text-sm',
    md: 'p-2 text-base',
    lg: 'p-3 text-lg',
  };
  
  return (
    <button
      className={`
        flex flex-col items-center justify-center
        ${sizeClasses[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}
        ${isActive ? 'bg-gray-100' : ''}
        rounded-md border border-gray-200
        transition-colors
        ${className}
      `}
      onClick={handleClick}
      disabled={disabled}
      title={label}
    >
      <div>{icon}</div>
      {showLabel && (
        <div className="mt-1 text-xs">
          {label}
        </div>
      )}
    </button>
  );
}; 