import { useState, useEffect, useRef, useCallback } from 'react';

export interface AIStreamOptions {
  /**
   * Model ID to use for generation
   */
  modelId?: string;
  
  /**
   * Temperature for generation
   */
  temperature?: number;
  
  /**
   * Maximum tokens to generate
   */
  maxTokens?: number;
  
  /**
   * Frequency penalty
   */
  frequencyPenalty?: number;
  
  /**
   * Presence penalty
   */
  presencePenalty?: number;
  
  /**
   * Top p value
   */
  topP?: number;
  
  /**
   * Function to fetch completions (override default implementation)
   */
  fetchCompletions?: (prompt: string, options: AIStreamOptions) => AsyncGenerator<string, void, unknown>;
  
  /**
   * Whether to use a mock/simulated response
   */
  useMockResponse?: boolean;
  
  /**
   * Callback when an error occurs
   */
  onError?: (error: Error) => void;
}

/**
 * Custom hook for streaming AI completions
 */
export function useAIStream(prompt: string, options: AIStreamOptions = {}) {
  const [text, setText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const abortControllerRef = useRef<AbortController | null>(null);
  
  const stop = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsLoading(false);
    }
  }, []);
  
  // Mock generator function for simulated responses
  const mockStreamGenerator = useCallback(async function* (mockPrompt: string): AsyncGenerator<string, void, unknown> {
    // Simulated response based on prompt
    const words = `This is a simulated AI response to demonstrate streaming text. Your prompt was: "${mockPrompt}". In a real implementation, this would connect to an actual AI service API.`.split(' ');
    
    for (const word of words) {
      // Add a small delay to simulate streaming
      await new Promise(resolve => setTimeout(resolve, 100));
      yield word + ' ';
    }
  }, []);
  
  // Wrap defaultFetchCompletions in useCallback to avoid recreation on each render
  const defaultFetchCompletions = useCallback(async function* (streamPrompt: string, streamOptions: AIStreamOptions): AsyncGenerator<string, void, unknown> {
    if (streamOptions.useMockResponse) {
      yield* mockStreamGenerator(streamPrompt);
      return;
    }
    
    // This would be replaced with an actual API call in a real implementation
    throw new Error('No fetchCompletions implementation provided. Either provide an implementation or set useMockResponse to true.');
  }, [mockStreamGenerator]);
  
  useEffect(() => {
    if (!prompt) return;
    
    const fetchStream = async () => {
      setText('');
      setIsComplete(false);
      setIsLoading(true);
      setError(null);
      
      try {
        // Create a new AbortController for this request
        abortControllerRef.current = new AbortController();
        
        // Use the provided fetch implementation or the default one
        const fetchFn = options.fetchCompletions || defaultFetchCompletions;
        
        let accumulated = '';
        
        // Use the generator to stream the response
        for await (const chunk of fetchFn(prompt, {
          ...options,
          useMockResponse: options.useMockResponse ?? true, // Default to mock response
        })) {
          // Check if the request was aborted
          if (abortControllerRef.current?.signal.aborted) {
            break;
          }
          
          accumulated += chunk;
          setText(accumulated);
        }
        
        setIsComplete(true);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
          options.onError?.(err);
        } else {
          const unknownError = new Error('Unknown error occurred during streaming');
          setError(unknownError);
          options.onError?.(unknownError);
        }
      } finally {
        setIsLoading(false);
        abortControllerRef.current = null;
      }
    };
    
    fetchStream();
    
    return () => {
      // Cleanup: abort any ongoing request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
    };
  }, [prompt, options, defaultFetchCompletions]);
  
  return { text, isComplete, isLoading, error, stop };
} 