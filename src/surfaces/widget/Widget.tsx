import React, { useState } from 'react';

interface WidgetProps {
  title?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  onCollapse?: (isCollapsed: boolean) => void;
  onClose?: () => void;
  onRefresh?: () => void;
  className?: string;
  width?: number | string;
  height?: number | string;
  minWidth?: number;
  minHeight?: number;
}

/**
 * Widget component for displaying blocks in a dashboard-like interface
 */
export const Widget: React.FC<WidgetProps> = ({
  title,
  icon,
  children,
  collapsible = true,
  defaultCollapsed = false,
  onCollapse,
  onClose,
  onRefresh,
  className = '',
  width = '100%',
  height = 'auto',
  minWidth = 200,
  minHeight = 100,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  
  const handleToggleCollapse = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    
    if (onCollapse) {
      onCollapse(newCollapsedState);
    }
  };
  
  return (
    <div 
      className={`
        bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden
        ${className}
      `}
      style={{ 
        width, 
        height: isCollapsed ? 'auto' : height,
        minWidth,
        minHeight: isCollapsed ? 'auto' : minHeight,
      }}
    >
      <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center">
          {icon && <div className="mr-2">{icon}</div>}
          {title && <h3 className="font-medium text-gray-800">{title}</h3>}
        </div>
        
        <div className="flex items-center space-x-2">
          {onRefresh && (
            <button 
              onClick={onRefresh}
              className="text-gray-400 hover:text-gray-600"
              title="Refresh"
            >
              🔄
            </button>
          )}
          
          {collapsible && (
            <button 
              onClick={handleToggleCollapse}
              className="text-gray-400 hover:text-gray-600"
              title={isCollapsed ? 'Expand' : 'Collapse'}
            >
              {isCollapsed ? '▼' : '▲'}
            </button>
          )}
          
          {onClose && (
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
              title="Close"
            >
              ✕
            </button>
          )}
        </div>
      </div>
      
      {!isCollapsed && (
        <div className="p-4">
          {children}
        </div>
      )}
    </div>
  );
}; 