import React from 'react';
import { Card, Input, Button, Spinner, Avatar } from '@heroui/react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { BlockProps } from '../../types';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: Date;
}

export interface AIChatBlockProps extends BlockProps {
  messages: ChatMessage[];
  isLoading?: boolean;
  onSendMessage?: (message: string) => void;
  userAvatarSrc?: string;
  assistantAvatarSrc?: string;
}

export const AIChatBlock: React.FC<AIChatBlockProps> = ({
  id,
  messages,
  isLoading = false,
  onSendMessage,
  userAvatarSrc,
  assistantAvatarSrc,
  className,
  onChange,
  ...props
}) => {
  const [inputValue, setInputValue] = React.useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && onSendMessage) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  return (
    <Card 
      className={className}
      data-block-id={id}
      {...props}
    >
      <div className="flex flex-col gap-4 p-4 max-h-[600px] overflow-y-auto">
        {messages.map((message) => (
          <motion.div 
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'} gap-2 max-w-[80%]`}>
              <Avatar 
                src={message.role === 'user' ? userAvatarSrc : assistantAvatarSrc}
                name={message.role === 'user' ? 'You' : 'Assistant'}
                size="sm"
                className="mt-1"
              />
              <div 
                className={`p-3 rounded-lg ${
                  message.role === 'user' 
                    ? 'bg-primary text-primary-foreground rounded-tr-none' 
                    : 'bg-muted rounded-tl-none'
                }`}
              >
                {message.content}
              </div>
            </div>
          </motion.div>
        ))}
        
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="flex flex-row gap-2 max-w-[80%]">
              <Avatar 
                src={assistantAvatarSrc}
                name="Assistant"
                size="sm"
                className="mt-1"
              />
              <div className="p-3 rounded-lg bg-muted rounded-tl-none flex items-center">
                <Spinner size="sm" />
              </div>
            </div>
          </motion.div>
        )}
      </div>
      
      <div className="p-4 border-t">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button 
            type="submit" 
            disabled={isLoading || !inputValue.trim()}
            variant="solid"
          >
            <Icon icon="heroicons:paper-airplane" />
          </Button>
        </form>
      </div>
    </Card>
  );
}; 