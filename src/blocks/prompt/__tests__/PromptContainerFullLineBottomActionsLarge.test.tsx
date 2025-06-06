import { render, screen, fireEvent } from '@testing-library/react';
import { PromptContainerFullLineBottomActionsLarge } from '../PromptContainerFullLineBottomActionsLarge';
import { describe, it, expect, vi } from 'vitest';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import '@testing-library/jest-dom';

describe('PromptContainerFullLineBottomActionsLarge', () => {
  const mockOnSubmit = vi.fn();
  const mockOnChange = vi.fn();

  const defaultProps = {
    onSubmit: mockOnSubmit,
    onChange: mockOnChange,
    placeholder: 'Test placeholder',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with default large size', () => {
    render(<PromptContainerFullLineBottomActionsLarge {...defaultProps} />);
    const textarea = screen.getByPlaceholderText('Test placeholder');
    expect(textarea).toHaveClass('text-lg');
  });

  it('renders with small size', () => {
    render(<PromptContainerFullLineBottomActionsLarge {...defaultProps} size="sm" />);
    const textarea = screen.getByPlaceholderText('Test placeholder');
    expect(textarea).toHaveClass('text-sm');
  });

  it('renders with medium size', () => {
    render(<PromptContainerFullLineBottomActionsLarge {...defaultProps} size="md" />);
    const textarea = screen.getByPlaceholderText('Test placeholder');
    expect(textarea).toHaveClass('text-base');
  });

  it('handles value changes', () => {
    render(<PromptContainerFullLineBottomActionsLarge {...defaultProps} />);
    const textarea = screen.getByPlaceholderText('Test placeholder');
    fireEvent.change(textarea, { target: { value: 'test message' } });
    expect(mockOnChange).toHaveBeenCalledWith('test message');
  });

  it('handles form submission', () => {
    render(<PromptContainerFullLineBottomActionsLarge {...defaultProps} value="test message" />);
    const textarea = screen.getByPlaceholderText('Test placeholder');
    fireEvent.keyDown(textarea, { key: 'Enter', ctrlKey: true });
    expect(mockOnSubmit).toHaveBeenCalledWith('test message');
  });

  it('renders with custom action buttons', () => {
    const actionButtons = (
      <Button variant="ghost" size="icon">
        <Send className="h-4 w-4" />
      </Button>
    );
    render(
      <PromptContainerFullLineBottomActionsLarge
        {...defaultProps}
        actionButtons={actionButtons}
      />
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('applies disabled state correctly', () => {
    render(<PromptContainerFullLineBottomActionsLarge {...defaultProps} disabled />);
    const textarea = screen.getByPlaceholderText('Test placeholder');
    expect(textarea).toBeDisabled();
    expect(textarea).toHaveClass('opacity-50');
  });

  it('applies custom classNames', () => {
    render(
      <PromptContainerFullLineBottomActionsLarge
        {...defaultProps}
        className="custom-container"
        textareaClassName="custom-textarea"
        actionsContainerClassName="custom-actions"
      />
    );
    const container = screen.getByRole('group');
    expect(container).toHaveClass('custom-container');
    expect(screen.getByPlaceholderText('Test placeholder')).toHaveClass('custom-textarea');
    expect(container.querySelector('.custom-actions')).toBeInTheDocument();
  });
}); 