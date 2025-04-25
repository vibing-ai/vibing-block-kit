import React, { useState, useRef, useEffect } from 'react';
import { Card, Avatar, Button, Textarea } from '@heroui/react';
// Create a Text component since it's not exported by @heroui/react
const Text = ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...props}>{children}</div>
);
import { Icon } from '@iconify/react';
import { BlockProps } from '../../types';

export interface Message {
  /**
   * Unique identifier for the message
   */
  id: string;
  
  /**
   * Role of the message sender
   */
  role: 'user' | 'assistant' | 'system';
  
  /**
   * Content of the message
   */
  content: string;
  
  /**
   * Optional timestamp for the message
   */
  timestamp?: Date;
  
  /**
   * Optional metadata for the message
   */
  metadata?: Record<string, unknown>;
  
  /**
   * Optional status of the message
   */
  status?: 'sending' | 'sent' | 'error' | 'streaming';
}

export interface ConversationCardProps extends BlockProps {
  /**
   * Array of messages in the conversation
   */
  messages: Message[];
  
  /**
   * Title of the conversation
   */
  title?: string;
  
  /**
   * Callback fired when a new message is sent
   */
  onSendMessage?: (content: string) => void;
  
  /**
   * Whether the assistant is currently generating a response
   */
  isGenerating?: boolean;
  
  /**
   * Callback fired when the generation is stopped
   */
  onStopGeneration?: () => void;
  
  /**
   * Optional avatar URL for the user
   */
  userAvatarUrl?: string;
  
  /**
   * Optional avatar URL for the assistant
   */
  assistantAvatarUrl?: string;
  
  /**
   * Optional placeholder text for the message input
   */
  inputPlaceholder?: string;
}

/**
 * ConversationCard component for displaying a chat interface
 */
export const ConversationCard: React.FC<ConversationCardProps> = ({
  id,
  messages,
  title = 'Conversation',
  onSendMessage,
  isGenerating = false,
  onStopGeneration,
  userAvatarUrl,
  assistantAvatarUrl,
  inputPlaceholder = 'Type your message...',
  className,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  
  
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  onChange,
  ...props
}) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSend = () => {
    if (!newMessage.trim() || !onSendMessage) return;
    
    onSendMessage(newMessage.trim());
    setNewMessage('');
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  const renderAvatar = (role: 'user' | 'assistant' | 'system') => {
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
  
  return (
    <Card 
      className={`block-kit-conversation-card ${className || ''}`}
      data-block-id={id}
      {...props}
    >
      <div className="flex justify-between items-center py-3 px-4 border-b">
        <Text className="font-medium">{title}</Text>
        {isGenerating && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onStopGeneration}
            className="text-destructive" 
          >
            <Icon icon="heroicons:stop" className="w-4 h-4 mr-1" />
            Stop generating
          </Button>
        )}
      </div>
      
      <div className="p-0 flex flex-col h-full">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`flex ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'} gap-2 items-start max-w-[80%]`}
              >
                {renderAvatar(message.role)}
                <div 
                  className={`rounded-lg px-4 py-2 ${
                    message.role === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : message.role === 'system'
                        ? 'bg-muted text-muted-foreground'
                        : 'bg-card border'
                  } ${message.status === 'streaming' ? 'animate-pulse' : ''}`}
                >
                  <div className="whitespace-pre-wrap break-words">
                    {message.content}
                  </div>
                  {message.timestamp && (
                    <div className="text-xs opacity-70 mt-1 text-right">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="border-t p-4">
          <div className="flex gap-2">
            <Textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={inputPlaceholder}
              className="flex-1 min-h-10 resize-none"
              onKeyDown={handleKeyDown}
              disabled={isGenerating}
              rows={Math.min(4, Math.max(1, newMessage.split('\n').length))}
            />
            <Button
              onClick={handleSend}
              disabled={!newMessage.trim() || isGenerating}
              className="self-end"
              size="md"
            >
              <Icon icon="heroicons:paper-airplane" className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}; 