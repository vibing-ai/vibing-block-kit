"use client";

import { Button, BlockContainer, TextBlock, Surface, BlockKitProvider } from "@vibing-ai/block-kit";
import { useState } from "react";

// Define message type to accommodate all role types
type Message = {
  id: string;
  role: "system" | "user" | "assistant";
  content: string;
  timestamp: Date;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "system",
      content: "Hello! I'm the Block Kit assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: message,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    
    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `I received your message: "${message}". This is a demo of the Block Kit components.`,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <BlockKitProvider>
      <Surface className="min-h-screen">
        <BlockContainer id="main-container" className="p-6">
          <TextBlock
            id="title"
            heading="Block Kit Demo"
            content="Example chat interface with Block Kit components"
          />
          
          {messages.map((msg) => (
            <BlockContainer 
              key={msg.id}
              id={`message-${msg.id}`}
              className={`my-2 p-3 rounded-lg ${
                msg.role === "user" ? "bg-primary text-primary-foreground ml-12" : 
                msg.role === "assistant" ? "bg-card border mr-12" : "bg-muted"
              }`}
            >
              <TextBlock 
                id={`text-${msg.id}`}
                content={msg.content}
              />
            </BlockContainer>
          ))}
          
          <BlockContainer id="input-container" className="mt-4 flex gap-2">
            <input
              type="text"
              className="flex-1 p-2 border rounded-md"
              placeholder={isLoading ? "Thinking..." : "Ask me something..."}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage(e.currentTarget.value);
                  e.currentTarget.value = '';
                }
              }}
              disabled={isLoading}
            />
            <Button 
              onClick={() => {
                const input = document.querySelector('input');
                if (input) {
                  handleSendMessage(input.value);
                  input.value = '';
                }
              }}
              disabled={isLoading}
            >
              Send
            </Button>
          </BlockContainer>
        </BlockContainer>
      </Surface>
    </BlockKitProvider>
  );
} 