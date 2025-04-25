import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// Extend the expect functionality to include Jest DOM matchers
expect.extend({});

// Automatically clean up after each test
afterEach(() => {
  cleanup();
}); 