import React, { useState } from 'react';
import { NotificationType } from './NotificationToast';

interface AlertBannerProps {
  type?: NotificationType;
  title?: string;
  message: string;
  isDismissible?: boolean;
  onDismiss?: () => void;
  actions?: Array<{
    label: string;
    onClick: () => void;
    primary?: boolean;
  }>;
  className?: string;
}

/**
 * Alert banner component for displaying important messages
 */
export const AlertBanner: React.FC<AlertBannerProps> = ({
  type = 'info',
  title,
  message,
  isDismissible = true,
  onDismiss,
  actions = [],
  className = '',
}) => {
  const [isDismissed, setIsDismissed] = useState(false);
  
  if (isDismissed) return null;
  
  const handleDismiss = () => {
    setIsDismissed(true);
    if (onDismiss) {
      onDismiss();
    }
  };
  
  const typeStyles = {
    info: 'bg-blue-50 border-blue-500 text-blue-800',
    success: 'bg-green-50 border-green-500 text-green-800',
    warning: 'bg-yellow-50 border-yellow-500 text-yellow-800',
    error: 'bg-red-50 border-red-500 text-red-800',
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
        w-full border-l-4 p-4
        ${typeStyles[type]}
        ${className}
      `}
    >
      <div className="flex">
        <div className="flex-shrink-0 mr-3">
          {typeIcons[type]}
        </div>
        <div className="flex-grow">
          {title && (
            <div className="font-medium">{title}</div>
          )}
          <div className="text-sm">{message}</div>
          
          {actions.length > 0 && (
            <div className="mt-3 flex space-x-3">
              {actions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.onClick}
                  className={`
                    px-3 py-1 text-sm font-medium rounded
                    ${action.primary 
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-white text-blue-600 border border-blue-600 hover:bg-blue-50'
                    }
                  `}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>
        
        {isDismissible && (
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 ml-2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}; 