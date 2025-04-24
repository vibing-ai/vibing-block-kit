import React from 'react';

interface DocumentViewProps {
  blocks: React.ReactNode[];
  title?: string;
  readOnly?: boolean;
  onBlockAdd?: (index: number, blockType: string) => void;
  onBlockDelete?: (index: number) => void;
  onBlockMove?: (fromIndex: number, toIndex: number) => void;
  className?: string;
}

/**
 * DocumentView component for displaying blocks in a vertical document layout
 */
export const DocumentView: React.FC<DocumentViewProps> = ({
  blocks,
  title = 'Untitled Document',
  readOnly = false,
  onBlockAdd,
  onBlockDelete,
  onBlockMove,
  className = '',
}) => {
  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>
      
      <div className="space-y-4">
        {blocks.map((block, index) => (
          <div 
            key={index}
            className="relative group"
          >
            {!readOnly && (
              <div className="absolute -left-10 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  className="p-1 text-gray-400 hover:text-gray-600"
                  onClick={() => onBlockAdd && onBlockAdd(index, 'text')}
                  title="Add block"
                >
                  +
                </button>
              </div>
            )}
            
            <div className="border border-transparent group-hover:border-gray-200 rounded-md p-2">
              {block}
            </div>
            
            {!readOnly && (
              <div className="absolute -right-10 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col">
                <button
                  className="p-1 text-gray-400 hover:text-gray-600"
                  onClick={() => onBlockDelete && onBlockDelete(index)}
                  title="Delete block"
                >
                  🗑️
                </button>
                
                {index > 0 && (
                  <button
                    className="p-1 text-gray-400 hover:text-gray-600"
                    onClick={() => onBlockMove && onBlockMove(index, index - 1)}
                    title="Move up"
                  >
                    ↑
                  </button>
                )}
                
                {index < blocks.length - 1 && (
                  <button
                    className="p-1 text-gray-400 hover:text-gray-600"
                    onClick={() => onBlockMove && onBlockMove(index, index + 1)}
                    title="Move down"
                  >
                    ↓
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {!readOnly && (
        <div className="mt-4 text-center">
          <button
            className="px-4 py-2 text-gray-500 border border-gray-300 rounded-md hover:bg-gray-50"
            onClick={() => onBlockAdd && onBlockAdd(blocks.length, 'text')}
          >
            + Add Block
          </button>
        </div>
      )}
    </div>
  );
}; 