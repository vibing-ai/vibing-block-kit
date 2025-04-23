"use client";

import { Button, ChatContainer } from "@block-kit/core";
import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      id: "1",
      role: "system" as const,
      content: "Hello! I'm the Block Kit assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;
    
    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      role: "user" as const,
      content: message,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    
    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant" as const,
        content: `I received your message: "${message}". This is a demo of the Block Kit components.`,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b bg-gradient-to-b pb-6 pt-8 backdrop-blur-2xl">
          Block Kit Demo
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black">
          <Button variant="primary">HeroUI Button</Button>
        </div>
      </div>

      <div className="w-full max-w-md">
        <ChatContainer 
          messages={messages}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          placeholder="Ask me something..."
        />
      </div>
    </main>
  );
} 