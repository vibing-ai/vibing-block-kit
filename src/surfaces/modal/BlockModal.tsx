import React from 'react';

interface BlockModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  title?: string;
  children?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  position?: 'center' | 'top' | 'right' | 'bottom' | 'left';
}

/**
 * Modal component for displaying block content in an overlay
 */
export const BlockModal: React.FC<BlockModalProps> = ({
  isOpen = false,
  onClose,
  title = '',
  children,
  size = 'md',
  position = 'center',
}) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div 
        className={`bg-white rounded-lg shadow-lg overflow-hidden ${
          size === 'sm' ? 'max-w-sm' :
          size === 'md' ? 'max-w-md' :
          size === 'lg' ? 'max-w-lg' :
          size === 'xl' ? 'max-w-xl' :
          'w-full h-full'
        }`}
      >
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">{title}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              ✕
            </button>
          </div>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
}; 