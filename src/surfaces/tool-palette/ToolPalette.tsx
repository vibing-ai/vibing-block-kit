import React, { useState } from 'react';

export interface Tool {
  id: string;
  label: string;
  icon: React.ReactNode;
  action?: () => void;
  isActive?: boolean;
  disabled?: boolean;
  group?: string;
}

interface ToolPaletteProps {
  tools: Tool[];
  orientation?: 'horizontal' | 'vertical';
  onToolSelect?: (tool: Tool) => void;
  showLabels?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Tool palette component for displaying a collection of tools
 */
export const ToolPalette: React.FC<ToolPaletteProps> = ({
  tools,
  orientation = 'horizontal',
  onToolSelect,
  showLabels = false,
  size = 'md',
  className = '',
}) => {
  const [activeToolId, setActiveToolId] = useState<string | null>(
    tools.find(tool => tool.isActive)?.id || null
  );
  
  // Group tools
  const groupedTools: Record<string, Tool[]> = {};
  tools.forEach(tool => {
    const group = tool.group || 'default';
    if (!groupedTools[group]) {
      groupedTools[group] = [];
    }
    groupedTools[group].push(tool);
  });
  
  const handleToolClick = (tool: Tool) => {
    if (tool.disabled) return;
    
    setActiveToolId(tool.id);
    
    if (onToolSelect) {
      onToolSelect(tool);
    }
    
    if (tool.action) {
      tool.action();
    }
  };
  
  const sizeClasses = {
    sm: 'p-1 text-sm',
    md: 'p-2 text-base',
    lg: 'p-3 text-lg',
  };
  
  return (
    <div 
      className={`
        flex ${orientation === 'vertical' ? 'flex-col' : 'flex-row'} 
        bg-white rounded-md shadow-sm border 
        ${className}
      `}
    >
      {Object.entries(groupedTools).map(([group, groupTools], groupIndex) => (
        <React.Fragment key={group}>
          {groupIndex > 0 && (
            <div 
              className={`
                ${orientation === 'vertical' ? 'border-t my-1' : 'border-l mx-1'} 
                border-gray-200
              `}
            />
          )}
          <div className={`flex ${orientation === 'vertical' ? 'flex-col' : 'flex-row'}`}>
            {groupTools.map(tool => (
              <button
                key={tool.id}
                className={`
                  flex ${orientation === 'vertical' ? 'flex-row' : 'flex-col'} 
                  items-center justify-center
                  ${sizeClasses[size]}
                  ${tool.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}
                  ${tool.id === activeToolId ? 'bg-gray-100' : ''}
                  transition-colors
                `}
                onClick={() => handleToolClick(tool)}
                disabled={tool.disabled}
                title={tool.label}
              >
                <div>{tool.icon}</div>
                {showLabels && (
                  <div 
                    className={`
                      ${orientation === 'vertical' ? 'ml-2' : 'mt-1'} 
                      text-xs
                    `}
                  >
                    {tool.label}
                  </div>
                )}
              </button>
            ))}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}; 