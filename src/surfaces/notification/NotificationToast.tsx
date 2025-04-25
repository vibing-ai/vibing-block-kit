import React, { useState, useEffect } from 'react';

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

interface NotificationToastProps {
  id: string;
  type?: NotificationType;
  title?: string;
  message: string;
  duration?: number;
  onClose?: () => void;
  action?: {
    label: string;
    onClick: () => void;
  };
}

/**
 * Toast notification component
 */
export const NotificationToast: React.FC<NotificationToastProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  
  
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  id,
  type = 'info',
  title,
  message,
  duration = 5000,
  onClose,
  action,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) {
          onClose();
        }
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);
  
  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  };
  
  if (!isVisible) return null;
  
  const typeStyles = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    error: 'bg-red-50 border-red-200 text-red-800',
  };
  
  const typeIcons = {
    info: '🔵',
    success: '✅',
    warning: '⚠️',
    error: '❌',
  };
  
  return (
    <div 
      className={`
        max-w-md w-full rounded-lg shadow-lg border-l-4 
        ${typeStyles[type]}
        transition-opacity duration-300
      `}
    >
      <div className="p-4 flex">
        <div className="flex-shrink-0 mr-3">
          {typeIcons[type]}
        </div>
        <div className="flex-grow">
          {title && (
            <div className="font-medium">{title}</div>
          )}
          <div className="text-sm">{message}</div>
          
          {action && (
            <button 
              onClick={action.onClick}
              className="mt-2 text-sm font-medium underline"
            >
              {action.label}
            </button>
          )}
        </div>
        <button
          onClick={handleClose}
          className="flex-shrink-0 ml-2 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>
    </div>
  );
}; 