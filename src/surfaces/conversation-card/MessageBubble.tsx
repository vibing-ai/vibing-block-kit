import React from 'react';
import { Avatar } from '@heroui/react';
import { BlockProps } from '../../types';
import { Message } from './ConversationCard';

// Create a Text component since Text is not exported by @heroui/react
const Text = ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...props}>{children}</div>
);

export interface MessageBubbleProps extends Omit<BlockProps, 'onChange'> {
  /**
   * Message data
   */
  message: Message;
  
  /**
   * Whether to show the avatar
   */
  showAvatar?: boolean;
  
  /**
   * Whether to show the timestamp
   */
  showTimestamp?: boolean;
  
  /**
   * Optional avatar URL for the user
   */
  userAvatarUrl?: string;
  
  /**
   * Optional avatar URL for the assistant
   */
  assistantAvatarUrl?: string;
  
  /**
   * Optional avatar component
   */
  avatarComponent?: React.ReactNode;
  
  /**
   * Optional actions to display with the message
   */
  actions?: React.ReactNode;
}

/**
 * MessageBubble component for displaying a single message in a conversation
 */
export const MessageBubble: React.FC<MessageBubbleProps> = ({
  id,
  message,
  showAvatar = true,
  showTimestamp = true,
  userAvatarUrl,
  assistantAvatarUrl,
  avatarComponent,
  actions,
  className,
  ...props
}) => {
  const { role, content, timestamp, status } = message;
  
  const renderAvatar = () => {
    if (avatarComponent) return avatarComponent;
    
    if (role === 'user') {
      return (
        <Avatar 
          src={userAvatarUrl}
          name="U"
          className="h-8 w-8"
        />
      );
    } else if (role === 'assistant') {
      return (
        <Avatar 
          src={assistantAvatarUrl}
          name="A"
          className="h-8 w-8"
        />
      );
    } else {
      return (
        <Avatar 
          name="S"
          className="h-8 w-8 bg-gray-500"
        />
      );
    }
  };
  
  const getStatusText = () => {
    switch (status) {
      case 'sending':
        return 'Sending...';
      case 'error':
        return 'Failed to send';
      case 'streaming':
        return 'Generating...';
      default:
        return '';
    }
  };
  
  return (
    <div 
      className={`block-kit-message-bubble ${className || ''}`}
      data-block-id={id}
      data-message-role={role}
      {...props}
    >
      <div 
        className={`flex ${role === 'user' ? 'flex-row-reverse' : 'flex-row'} gap-2 items-start`}
      >
        {showAvatar && renderAvatar()}
        
        <div className="flex flex-col">
          <div 
            className={`rounded-lg px-4 py-2 ${
              role === 'user' 
                ? 'bg-primary text-primary-foreground' 
                : role === 'system'
                  ? 'bg-muted text-muted-foreground'
                  : 'bg-card border'
            } ${status === 'streaming' ? 'animate-pulse' : ''}`}
          >
            <div className="whitespace-pre-wrap break-words">
              {content}
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-1 px-1">
            {showTimestamp && timestamp && (
              <Text className="text-xs opacity-70">
                {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            )}
            
            {status && status !== 'sent' && (
              <Text className="text-xs opacity-70 italic">
                {getStatusText()}
              </Text>
            )}
            
            {actions && (
              <div className="ml-auto">
                {actions}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 