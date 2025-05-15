import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { EnhancedCodeBlock } from '../EnhancedCodeBlock';

describe('EnhancedCodeBlock', () => {
  const mockCode = `function example() {
  return "Hello world!";
}`;

  beforeEach(() => {
    // Mock clipboard API
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn(),
      },
    });
  });

  it('renders the component with provided code', () => {
    render(
      <EnhancedCodeBlock
        id="test-code-block"
        code={mockCode}
        language="javascript"
      />
    );
    
    // Check if code content is rendered
    expect(screen.getByText(/function example/)).toBeInTheDocument();
    expect(screen.getByText(/return "Hello world!";/)).toBeInTheDocument();
  });

  it('displays the correct language in the selector', () => {
    render(
      <EnhancedCodeBlock
        id="test-code-block"
        code={mockCode}
        language="javascript"
      />
    );
    
    const languageSelect = screen.getByLabelText('Select programming language');
    expect(languageSelect).toHaveValue('javascript');
  });

  it('allows changing the language', () => {
    render(
      <EnhancedCodeBlock
        id="test-code-block"
        code={mockCode}
        language="javascript"
      />
    );
    
    const languageSelect = screen.getByLabelText('Select programming language');
    fireEvent.change(languageSelect, { target: { value: 'typescript' } });
    
    expect(languageSelect).toHaveValue('typescript');
  });

  it('collapses and expands the code content', () => {
    render(
      <EnhancedCodeBlock
        id="test-code-block"
        code={mockCode}
        language="javascript"
      />
    );
    
    // Initially, code should be visible
    expect(screen.getByText(/function example/)).toBeVisible();
    
    // Click collapse button
    const collapseButton = screen.getByText('Collapse').closest('button');
    expect(collapseButton).toBeInTheDocument(); // Ensure button is found
    if (collapseButton) fireEvent.click(collapseButton);
    
    // Code should not be visible
    expect(screen.queryByText(/function example/)).not.toBeInTheDocument();
    
    // Click expand button again
    expect(collapseButton).toBeInTheDocument(); // Ensure button is found
    if (collapseButton) fireEvent.click(collapseButton);
    
    // Code should be visible again
    expect(screen.getByText(/function example/)).toBeVisible();
  });

  it('copies code to clipboard when copy button is clicked', () => {
    render(
      <EnhancedCodeBlock
        id="test-code-block"
        code={mockCode}
        language="javascript"
      />
    );
    
    const copyButton = screen.getByText('Copy').closest('button');
    expect(copyButton).toBeInTheDocument(); // Ensure button is found
    if (copyButton) fireEvent.click(copyButton);
    
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockCode);
  });

  it('renders line numbers when showLineNumbers is true', () => {
    render(
      <EnhancedCodeBlock
        id="test-code-block"
        code={mockCode}
        language="javascript"
        showLineNumbers={true}
      />
    );
    
    // Instead of querying by class name, check if code is rendered properly with line numbers
    // by checking for content that would only be present in the formatted code
    expect(screen.getByText('1')).toBeInTheDocument();
    // Additional verification - code content is still visible
    expect(screen.getByText(/function example/)).toBeInTheDocument();
  });

  it('does not render line numbers when showLineNumbers is false', () => {
    render(
      <EnhancedCodeBlock
        id="test-code-block"
        code={mockCode}
        language="javascript"
        showLineNumbers={false}
      />
    );
    
    // When showLineNumbers is false, the raw code is rendered without line numbers
    // So we shouldn't find line number elements
    expect(screen.queryByText('1')).not.toBeInTheDocument();
    // Code content should still be visible
    expect(screen.getByText(/function example/)).toBeInTheDocument();
  });
}); 