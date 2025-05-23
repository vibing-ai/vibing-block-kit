import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import ImageBlock from './image-block/ImageBlock';

// Mock IntersectionObserver
let mockObserve: () => void;
let mockUnobserve: () => void;
let mockDisconnect: () => void;

// Mock Image class
class MockImage {
  onload: (() => void) | null = null;
  onerror: (() => void) | null = null;
  src = '';
  width = 800;
  height = 600;
  naturalWidth = 800;
  naturalHeight = 600;
  complete = false;
  
  constructor() {
    // Store a reference to 'this' to avoid TypeScript issues
    const self = this;
    
    // Schedule the onload callback to be called after a small delay
    // to simulate image loading
    setTimeout(() => {
      // Set complete to true before calling onload
      self.complete = true;
      if (self.onload) {
        self.onload();
      }
    }, 10);
  }
  
  decode() {
    return Promise.resolve();
  }
}

describe('ImageBlock', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();
    
    // Reset the document body
    document.body.innerHTML = '';
    
    // Mock the Image constructor
    global.Image = MockImage as any;
    
    // Mock the IntersectionObserver to immediately trigger the callback
    mockObserve = vi.fn();
    mockUnobserve = vi.fn();
    mockDisconnect = vi.fn();
    
    global.IntersectionObserver = vi.fn().mockImplementation((callback) => {
      // Immediately trigger the callback with isIntersecting: true
      setTimeout(() => {
        callback([{ isIntersecting: true } as IntersectionObserverEntry]);
      }, 0);
      
      return {
        observe: mockObserve,
        unobserve: mockUnobserve,
        disconnect: mockDisconnect,
      };
    });
  });
  
  afterEach(() => {
    vi.restoreAllMocks();
    // Clean up any timers
    vi.useRealTimers();
  });
  it('renders image with correct attributes', async () => {
    const testAlt = 'Test Image';
    const testSrc = 'https://picsum.photos/800/450';
    
    // Create a mock for the Image constructor
    let mockOnLoad: () => void = () => {};
    
    global.Image = class MockImage {
      onload = () => {};
      onerror: (() => void) | null = null;
      src = '';
      width = 800;
      height = 600;
      naturalWidth = 800;
      naturalHeight = 600;
      complete = false;
      
      constructor() {
        // Store the onload callback
        Object.defineProperty(this, 'onload', {
          get: () => mockOnLoad,
          set: (fn) => {
            mockOnLoad = fn;
          }
        });
        
        // Simulate image loading after a short delay
        setTimeout(() => {
          this.complete = true;
          this.onload();
        }, 10);
      }
      
      decode() {
        return Promise.resolve();
      }
    } as any;
    
    render(
      <ImageBlock
        id="test-image"
        src={testSrc}
        alt={testAlt}
        width={800}
        height={450}
        loading="eager"
      />
    );
    
    // The image should be in the document with the correct attributes
    const image = await screen.findByRole('img', { name: testAlt });
    expect(image).toHaveAttribute('src', testSrc);
    expect(image).toHaveAttribute('alt', testAlt);
    
    // Check that the image has the expected styles applied
    expect(image).toHaveStyle('width: 100%');
    expect(image).toHaveStyle('height: 100%');
    expect(image).toHaveStyle('object-fit: cover');
  });

  it('applies custom styles', async () => {
    const testAlt = 'Styled Image';
    
    // Create a mock for the Image constructor
    let mockOnLoad: () => void = () => {};
    
    global.Image = class MockImage {
      onload = () => {};
      onerror: (() => void) | null = null;
      src = '';
      width = 400;
      height = 300;
      naturalWidth = 400;
      naturalHeight = 300;
      complete = false;
      
      constructor() {
        // Store the onload callback
        Object.defineProperty(this, 'onload', {
          get: () => mockOnLoad,
          set: (fn) => {
            mockOnLoad = fn;
          }
        });
        
        // Simulate image loading after a short delay
        setTimeout(() => {
          this.complete = true;
          this.onload();
        }, 10);
      }
      
      decode() {
        return Promise.resolve();
      }
    } as any;
    
    render(
      <ImageBlock
        id="test-image-styled"
        src="https://picsum.photos/800/450"
        alt={testAlt}
        width={400}
        height={300}
        borderRadius="lg"
        shadow="md"
        hasBorder
        loading="eager"
      />
    );
    
    // Wait for the image to load
    const image = await screen.findByRole('img', { name: testAlt });
    
    // Get the container that has the styles we want to check
    const figure = image.closest('figure');
    
    // Check if the container has the expected styles
    if (figure) {
      const container = figure.firstChild as HTMLElement;
      const styles = window.getComputedStyle(container);
      
      // Check for border radius
      expect(styles.borderRadius).toBe('1rem');
      
      // Check for border
      expect(styles.border).toContain('1px solid');
      
      // Check for box shadow - we'll just verify the shadow is present
      expect(styles.boxShadow).not.toBe('none');
    } else {
      throw new Error('Container with styles not found');
    }
  });
});
