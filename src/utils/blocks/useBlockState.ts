import { useState, useCallback } from 'react';

/**
 * Hook for managing block state with change tracking
 */
export function useBlockState<T>(
  initialState: T, 
  onChange?: (data: T) => void
) {
  const [state, setState] = useState<T>(initialState);
  
  const updateState = useCallback((newState: Partial<T>) => {
    setState(prev => {
      const updated = { ...prev, ...newState };
      onChange?.(updated);
      return updated;
    });
  }, [onChange]);
  
  return [state, updateState] as const;
}

/**
 * Hook for managing multiple block states
 */
export function useBlocksState<T extends { id: string }>(
  initialBlocks: T[],
  onChange?: (blocks: T[]) => void
) {
  const [blocks, setBlocks] = useState<T[]>(initialBlocks);
  
  const updateBlock = useCallback((id: string, data: Partial<Omit<T, 'id'>>) => {
    setBlocks(prev => {
      const updated = prev.map(block => 
        block.id === id ? { ...block, ...data } as T : block
      );
      onChange?.(updated);
      return updated;
    });
  }, [onChange]);
  
  const addBlock = useCallback((block: T) => {
    setBlocks(prev => {
      const updated = [...prev, block];
      onChange?.(updated);
      return updated;
    });
  }, [onChange]);
  
  const removeBlock = useCallback((id: string) => {
    setBlocks(prev => {
      const updated = prev.filter(block => block.id !== id);
      onChange?.(updated);
      return updated;
    });
  }, [onChange]);
  
  const moveBlock = useCallback((fromIndex: number, toIndex: number) => {
    setBlocks(prev => {
      const updated = [...prev];
      const [movedBlock] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, movedBlock);
      onChange?.(updated);
      return updated;
    });
  }, [onChange]);
  
  return {
    blocks,
    updateBlock,
    addBlock,
    removeBlock,
    moveBlock,
    setBlocks: useCallback((newBlocks: T[]) => {
      setBlocks(newBlocks);
      onChange?.(newBlocks);
    }, [onChange])
  };
} 