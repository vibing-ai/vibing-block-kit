import React, { useState } from 'react';

interface TimelineItem {
  id: string;
  title: string;
  content: React.ReactNode;
  date: Date;
  icon?: React.ReactNode;
  color?: string;
}

interface TimelineViewProps {
  items: TimelineItem[];
  onItemClick?: (id: string) => void;
  onItemEdit?: (id: string) => void;
  onItemDelete?: (id: string) => void;
  onItemAdd?: (date: Date) => void;
  sortDirection?: 'asc' | 'desc';
  layout?: 'vertical' | 'horizontal';
  readOnly?: boolean;
  className?: string;
}

/**
 * TimelineView component for displaying blocks in a chronological sequence
 */
export const TimelineView: React.FC<TimelineViewProps> = ({
  items,
  onItemClick,
  onItemEdit,
  onItemDelete,
  onItemAdd,
  sortDirection = 'desc',
  layout = 'vertical',
  readOnly = false,
  className = '',
}) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  // Sort items by date
  const sortedItems = [...items].sort((a, b) => {
    return sortDirection === 'asc'
      ? a.date.getTime() - b.date.getTime()
      : b.date.getTime() - a.date.getTime();
  });
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  if (layout === 'horizontal') {
    return (
      <div className={`w-full overflow-x-auto ${className}`}>
        <div className="flex items-stretch min-w-max p-4">
          {sortedItems.map((item, index) => (
            <div 
              key={item.id}
              className="flex flex-col items-center mx-4 relative"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {/* Date */}
              <div className="text-sm font-medium text-gray-500 mb-2">
                {formatDate(item.date)}
              </div>
              
              {/* Line */}
              <div className="w-full h-0.5 bg-gray-200 absolute top-8" style={{
                left: index === 0 ? '50%' : '0',
                right: index === sortedItems.length - 1 ? '50%' : '0',
              }} />
              
              {/* Icon */}
              <div 
                className="w-6 h-6 rounded-full z-10 flex items-center justify-center"
                style={{ backgroundColor: item.color || '#4299e1' }}
              >
                {item.icon || '•'}
              </div>
              
              {/* Content */}
              <div 
                className="mt-4 bg-white border border-gray-200 rounded-md shadow-sm p-4 w-60"
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
                aria-label={`View ${item.title}`}
              >
                <h3 className="font-medium text-gray-800 mb-2">{item.title}</h3>
                <div className="text-sm text-gray-600">{item.content}</div>
                
                {/* Actions */}
                {!readOnly && hoveredItem === item.id && (
                  <div className="flex justify-end mt-3 pt-2 border-t border-gray-100">
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
    );
  }
  
  return (
    <div className={`relative ${className}`}>
      <div className="border-l-2 border-gray-200 ml-6 py-6">
        {sortedItems.map((item) => (
          <div 
            key={item.id}
            className="mb-8 flex"
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {/* Icon */}
            <div 
              className="absolute w-6 h-6 rounded-full flex items-center justify-center -ml-3"
              style={{ backgroundColor: item.color || '#4299e1' }}
            >
              {item.icon || '•'}
            </div>
            
            {/* Content */}
            <div className="ml-8">
              <div className="text-sm font-medium text-gray-500 mb-1">
                {formatDate(item.date)}
              </div>
              
              <div 
                className="bg-white border border-gray-200 rounded-md shadow-sm p-4"
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
                aria-label={`View ${item.title}`}
              >
                <h3 className="font-medium text-gray-800 mb-2">{item.title}</h3>
                <div className="text-sm text-gray-600">{item.content}</div>
                
                {/* Actions */}
                {!readOnly && hoveredItem === item.id && (
                  <div className="flex justify-end mt-3 pt-2 border-t border-gray-100">
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
          </div>
        ))}
      </div>
      
      {!readOnly && (
        <div className="mt-4 text-center">
          <button
            className="px-4 py-2 text-gray-500 border border-gray-300 rounded-md hover:bg-gray-50"
            onClick={() => {
              if (onItemAdd) onItemAdd(new Date());
            }}
          >
            + Add Event
          </button>
        </div>
      )}
    </div>
  );
}; 