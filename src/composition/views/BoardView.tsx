import React, { useState } from 'react';

interface BoardItem {
  id: string;
  content: React.ReactNode;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

interface BoardViewProps {
  items: BoardItem[];
  onItemMove?: (id: string, position: { x: number; y: number }) => void;
  onItemResize?: (id: string, size: { width: number; height: number }) => void;
  onItemAdd?: (position: { x: number; y: number }) => void;
  onItemDelete?: (id: string) => void;
  gridSize?: number;
  snapToGrid?: boolean;
  readOnly?: boolean;
  className?: string;
}

/**
 * BoardView component for displaying blocks in a flexible canvas layout
 */
export const BoardView: React.FC<BoardViewProps> = ({
  items,
  onItemMove,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  
  
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  onItemResize,
  onItemAdd,
  onItemDelete,
  gridSize = 20,
  snapToGrid = true,
  readOnly = false,
  className = '',
}) => {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  
  const handleMouseDown = (e: React.MouseEvent, id: string) => {
    if (readOnly) return;
    
    const item = items.find(item => item.id === id);
    if (!item) return;
    
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    
    setDraggedItem(id);
    setIsDragging(true);
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !draggedItem || readOnly) return;
    
    const boardRect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    
    let newX = e.clientX - boardRect.left - dragOffset.x;
    let newY = e.clientY - boardRect.top - dragOffset.y;
    
    if (snapToGrid) {
      newX = Math.round(newX / gridSize) * gridSize;
      newY = Math.round(newY / gridSize) * gridSize;
    }
    
    if (onItemMove) {
      onItemMove(draggedItem, { x: newX, y: newY });
    }
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggedItem(null);
  };
  
  const handleBoardClick = (e: React.MouseEvent) => {
    if (readOnly || !onItemAdd || isDragging) return;
    
    const boardRect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    let x = e.clientX - boardRect.left;
    let y = e.clientY - boardRect.top;
    
    if (snapToGrid) {
      x = Math.round(x / gridSize) * gridSize;
      y = Math.round(y / gridSize) * gridSize;
    }
    
    onItemAdd({ x, y });
  };
  
  return (
    <div 
      className={`relative bg-gray-50 border border-gray-200 overflow-hidden ${className}`}
      style={{ minHeight: '600px' }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={handleBoardClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleBoardClick(e as unknown as React.MouseEvent);
        }
      }}
      tabIndex={readOnly ? undefined : 0}
      role={readOnly ? undefined : "button"}
      aria-label="Board canvas"
    >
      {/* Grid lines */}
      {snapToGrid && (
        <div className="absolute inset-0">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, #00000010 1px, transparent 1px)',
            backgroundSize: `${gridSize}px ${gridSize}px`,
          }} />
        </div>
      )}
      
      {/* Items */}
      {items.map((item) => (
        <div
          key={item.id}
          className={`absolute bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden ${
            draggedItem === item.id ? 'z-10 opacity-75' : ''
          }`}
          style={{
            left: `${item.position.x}px`,
            top: `${item.position.y}px`,
            width: `${item.size.width}px`,
            height: `${item.size.height}px`,
          }}
          onMouseDown={(e) => handleMouseDown(e, item.id)}
          onKeyDown={readOnly ? undefined : (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleMouseDown(e as unknown as React.MouseEvent, item.id);
            }
          }}
          tabIndex={readOnly ? undefined : 0}
          role={readOnly ? undefined : "button"}
          aria-label={`Draggable item ${item.id}`}
        >
          <div className="p-2 h-full">
            {item.content}
          </div>
          
          {!readOnly && (
            <button
              className="absolute top-1 right-1 opacity-0 hover:opacity-100 text-gray-400 hover:text-gray-600"
              onClick={() => onItemDelete && onItemDelete(item.id)}
            >
              ✕
            </button>
          )}
        </div>
      ))}
    </div>
  );
}; 