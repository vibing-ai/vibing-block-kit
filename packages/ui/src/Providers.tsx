"use client";
import React from "react";

// Mock components since we don't have the actual packages
const HeroUIProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

const AssistantUIProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

// This simulates the real implementation that would use the actual packages
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <AssistantUIProvider>{children}</AssistantUIProvider>
    </HeroUIProvider>
  );
} 