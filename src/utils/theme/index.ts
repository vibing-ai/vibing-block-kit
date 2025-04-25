// Export legacy theme utilities (all deprecated)
// These are kept for backward compatibility only
export * from './blockTheme';
export * from './useBlockTheme';
export * from './heroTheme';

/**
 * RECOMMENDED APPROACH:
 * 
 * // For theme access:
 * import { useTheme } from '@vibing-ai/block-kit';
 *
 * // For theme creation:
 * import { createTheme } from '@heroui/react';
 *
 * // For theme provider:
 * import { BlockKitProvider } from '@vibing-ai/block-kit';
 */ 