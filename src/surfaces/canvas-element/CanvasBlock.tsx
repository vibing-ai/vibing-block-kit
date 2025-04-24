import React from 'react';
import { BlockProps } from '../../types';

export interface CanvasBlockProps extends BlockProps {
  x: number;
  y: number;
  width?: number;
  height?: number;
  isSelected?: boolean;
  isEditing?: boolean;
  onSelect?: () => void;
  onMove?: (x: number, y: number) => void;
  onResize?: (width: number, height: number) => void;
  // Add other props as needed
}

export const CanvasBlock: React.FC<CanvasBlockProps> = ({
  id,
  x,
  y,
  width = 200,
  height = 100,
  isSelected = false,
  isEditing = false,
  onSelect,
  onMove,
  onResize,
  className,
  onChange,
  ...props
}) => {
  // Placeholder implementation
  return (
    <div 
      className={`block-kit-canvas-block ${isSelected ? 'is-selected' : ''} ${isEditing ? 'is-editing' : ''} ${className || ''}`}
      data-block-id={id}
      style={{
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
        height: `${height}px`,
        border: isSelected ? '2px solid blue' : '1px solid #ccc',
        background: 'white',
      }}
      onClick={onSelect}
      {...props}
    >
      <div className="block-content">
        Canvas Block #{id} at ({x}, {y})
      </div>
      
      {isSelected && (
        <div className="resize-handle" 
          style={{ 
            position: 'absolute', 
            right: '2px', 
            bottom: '2px', 
            width: '10px', 
            height: '10px', 
            background: 'blue',
            cursor: 'nwse-resize' 
          }} 
        />
      )}
    </div>
  );
}; 