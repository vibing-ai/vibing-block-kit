import React from "react";

// Mock implementation of AssistantUI Chat component
type Message = {
  id: string;
  content: string;
  role: "user" | "assistant" | "system";
  timestamp?: Date;
};

type ChatProps = {
  messages: Message[];
  onSendMessage?: (message: string) => void;
  isLoading?: boolean;
  className?: string;
  placeholder?: string;
};

// This simulates what would be imported from @assistant-ui/react
const AssistantUIChatComponent = ({
  messages,
  onSendMessage,
  isLoading = false,
  className = "",
  placeholder = "Type a message...",
}: ChatProps) => {
  return (
    <div className={`assistant-ui-chat ${className}`}>
      <div className="messages-container">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.role}`}>
            {message.content}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input 
          type="text" 
          placeholder={placeholder}
          onKeyDown={(e) => {
            if (e.key === "Enter" && onSendMessage) {
              onSendMessage(e.currentTarget.value);
              e.currentTarget.value = "";
            }
          }}
          disabled={isLoading}
        />
        {isLoading && <div className="loading-indicator">...</div>}
      </div>
    </div>
  );
};

// Our wrapper component
const ChatContainer = (props: ChatProps) => {
  return <AssistantUIChatComponent {...props} />;
};

export default ChatContainer; 