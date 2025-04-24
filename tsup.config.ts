import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: false,
  skipNodeModulesBundle: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  noExternal: ['@heroui/react', '@heroui/theme', '@heroui/system'],
  // Skip TypeScript errors during the restructuring phase
  ignoreWatch: true,
  onSuccess: 'echo Build completed successfully!'
}); 