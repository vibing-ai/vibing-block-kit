import { BlockData, BlockType } from '../../types';

type BlockLike = {
  id: string;
  type: BlockType | string;
  [key: string]: unknown;
};

/**
 * Serializes a block to a plain object that can be stored/transmitted
 */
export function serializeBlock(block: BlockLike): BlockData {
  // If the block is already in a serialized format, return it
  if (typeof block === 'object' && 'id' in block && 'type' in block) {
    return block as BlockData;
  }
  
  // Extract the relevant information from the block
  const { id, type, ...data } = block;
  
  return {
    id,
    type: type as BlockType,
    ...data
  };
}

/**
 * Deserializes a block from a plain object
 */
export function deserializeBlock<T extends BlockData = BlockData>(serialized: Partial<BlockData>): T {
  // Ensure the serialized data has the required fields
  if (!serialized.id || !serialized.type) {
    throw new Error('Invalid block data: missing id or type');
  }
  
  // Return the deserialized block
  return serialized as T;
}

/**
 * Serializes multiple blocks
 */
export function serializeBlocks(blocks: BlockLike[]): BlockData[] {
  return blocks.map(block => serializeBlock(block));
}

/**
 * Deserializes multiple blocks
 */
export function deserializeBlocks<T extends BlockData = BlockData>(serialized: Partial<BlockData>[]): T[] {
  return serialized.map(data => deserializeBlock<T>(data));
} 