import { useState, useEffect } from 'react';

export interface TokenCounterOptions {
  /**
   * Model to count tokens for
   */
  model?: string;
  
  /**
   * Custom token counting function
   */
  customCounter?: (text: string) => number;
  
  /**
   * Update interval in milliseconds
   */
  updateInterval?: number;
}

/**
 * Simple approximation of token count
 * Note: This is a very rough approximation and should be replaced with a proper tokenizer for production
 */
function approximateTokenCount(text: string): number {
  if (!text) return 0;
  
  // Rough approximation: ~4 characters per token for English text
  // This is a very crude estimate and will vary by model
  return Math.ceil(text.length / 4);
}

/**
 * Hook for counting tokens in text
 */
export function useTokenCounter(text: string, options: TokenCounterOptions = {}) {
  const [tokenCount, setTokenCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  const { model, customCounter, updateInterval = 500 } = options;
  
  useEffect(() => {
    // Debounce the token counting to avoid excessive calculations
    const timeoutId = setTimeout(() => {
      if (!text) {
        setTokenCount(0);
        return;
      }
      
      setIsLoading(true);
      
      try {
        // Use custom counter if provided, otherwise use approximation
        if (customCounter) {
          setTokenCount(customCounter(text));
        } else {
          // In a real implementation, you would use a proper tokenizer based on the model
          setTokenCount(approximateTokenCount(text));
        }
      } catch (error) {
        console.error('Error counting tokens:', error);
        // Fallback to approximation if the custom counter fails
        setTokenCount(approximateTokenCount(text));
      } finally {
        setIsLoading(false);
      }
    }, updateInterval);
    
    return () => clearTimeout(timeoutId);
  }, [text, model, customCounter, updateInterval]);
  
  return { tokenCount, isLoading };
} 