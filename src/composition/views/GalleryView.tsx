import React, { useState } from 'react';

interface GalleryItem {
  id: string;
  content: React.ReactNode;
  title?: string;
  description?: string;
  thumbnail?: string;
}

interface GalleryViewProps {
  items: GalleryItem[];
  onItemClick?: (id: string) => void;
  onItemEdit?: (id: string) => void;
  onItemDelete?: (id: string) => void;
  onItemAdd?: () => void;
  columns?: number;
  gap?: number;
  layout?: 'grid' | 'masonry' | 'carousel';
  readOnly?: boolean;
  className?: string;
}

/**
 * GalleryView component for displaying blocks in a grid or carousel layout
 */
export const GalleryView: React.FC<GalleryViewProps> = ({
  items,
  onItemClick,
  onItemEdit,
  onItemDelete,
  onItemAdd,
  columns = 3,
  gap = 4,
  layout = 'grid',
  readOnly = false,
  className = '',
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  const handlePrevious = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
  };
  
  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
  };
  
  if (layout === 'carousel') {
    return (
      <div className={`relative ${className}`}>
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-300"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {items.map((item) => (
              <div 
                key={item.id} 
                className="w-full flex-shrink-0"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div 
                  className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden"
                  onClick={() => {
                    if (onItemClick) onItemClick(item.id);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      if (onItemClick) onItemClick(item.id);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`View ${item.title || `item ${item.id}`}`}
                >
                  <div className="p-4">
                    {item.title && (
                      <h3 className="font-medium text-gray-800 mb-2">{item.title}</h3>
                    )}
                    <div>{item.content}</div>
                    {item.description && (
                      <p className="mt-2 text-sm text-gray-600">{item.description}</p>
                    )}
                  </div>
                  
                  {!readOnly && hoveredItem === item.id && (
                    <div className="flex justify-end p-3 bg-gray-50 border-t border-gray-200">
                      <button
                        className="text-xs text-blue-600 hover:text-blue-800 mr-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onItemEdit) onItemEdit(item.id);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="text-xs text-red-600 hover:text-red-800"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onItemDelete) onItemDelete(item.id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {items.length > 1 && (
          <>
            <button
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md text-gray-600 hover:text-gray-900"
              onClick={handlePrevious}
            >
              ←
            </button>
            <button
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md text-gray-600 hover:text-gray-900"
              onClick={handleNext}
            >
              →
            </button>
          </>
        )}
        
        {/* Indicators */}
        {items.length > 1 && (
          <div className="flex justify-center mt-4 space-x-2">
            {items.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === activeIndex ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
  
  return (
    <div className={className}>
      <div 
        className="grid gap-4"
        style={{ 
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          gap: `${gap * 0.25}rem`,
        }}
      >
        {items.map((item) => (
          <div 
            key={item.id}
            className="relative group"
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div 
              className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden h-full"
              onClick={() => {
                if (onItemClick) onItemClick(item.id);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  if (onItemClick) onItemClick(item.id);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`View ${item.title || `item ${item.id}`}`}
            >
              {item.thumbnail && (
                <div 
                  className="h-40 bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.thumbnail})` }}
                />
              )}
              
              <div className="p-4">
                {item.title && (
                  <h3 className="font-medium text-gray-800 mb-2">{item.title}</h3>
                )}
                <div>{item.content}</div>
                {item.description && (
                  <p className="mt-2 text-sm text-gray-600">{item.description}</p>
                )}
              </div>
            </div>
            
            {!readOnly && hoveredItem === item.id && (
              <div className="absolute top-2 right-2 flex space-x-1">
                <button
                  className="p-1 bg-white rounded-full shadow-sm text-blue-600 hover:text-blue-800"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onItemEdit) onItemEdit(item.id);
                  }}
                >
                  ✏️
                </button>
                <button
                  className="p-1 bg-white rounded-full shadow-sm text-red-600 hover:text-red-800"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onItemDelete) onItemDelete(item.id);
                  }}
                >
                  🗑️
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {!readOnly && onItemAdd && (
        <div className="mt-4 text-center">
          <button
            className="px-4 py-2 text-gray-500 border border-gray-300 rounded-md hover:bg-gray-50"
            onClick={() => {
              if (onItemAdd) onItemAdd();
            }}
          >
            + Add Item
          </button>
        </div>
      )}
    </div>
  );
}; 