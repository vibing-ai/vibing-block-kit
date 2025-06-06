import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PromptContainerFullLineBottomActions } from '../blocks/prompt/PromptContainerFullLineBottomActions';
import { Button } from '../components/ui/button';
import { Paperclip, Mic, Send } from 'lucide-react';

describe('PromptContainerFullLineBottomActions', () => {
  const defaultActionButtons = (
    <>
      <Button variant="ghost" size="icon" aria-label="Attach file">
        <Paperclip className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" aria-label="Use microphone">
        <Mic className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" aria-label="Send message">
        <Send className="h-4 w-4" />
      </Button>
    </>
  );

  it('renders with default props', () => {
    const onSubmit = vi.fn();
    render(
      <PromptContainerFullLineBottomActions
        onSubmit={onSubmit}
        actionButtons={defaultActionButtons}
      />
    );

    expect(screen.getByPlaceholderText('Type your message...')).toBeInTheDocument();
    expect(screen.getByRole('group')).toHaveAttribute('aria-label', 'Message input');
  });

  it('handles value changes', () => {
    const onChange = vi.fn();
    render(
      <PromptContainerFullLineBottomActions
        onSubmit={vi.fn()}
        onChange={onChange}
        actionButtons={defaultActionButtons}
      />
    );

    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'New message' } });
    expect(onChange).toHaveBeenCalledWith('New message');
  });

  it('submits on Ctrl+Enter', () => {
    const onSubmit = vi.fn();
    render(
      <PromptContainerFullLineBottomActions
        onSubmit={onSubmit}
        value="Test message"
        actionButtons={defaultActionButtons}
      />
    );

    const textarea = screen.getByRole('textbox');
    fireEvent.keyDown(textarea, { key: 'Enter', ctrlKey: true });
    expect(onSubmit).toHaveBeenCalledWith('Test message');
  });

  it('submits on Cmd+Enter', () => {
    const onSubmit = vi.fn();
    render(
      <PromptContainerFullLineBottomActions
        onSubmit={onSubmit}
        value="Test message"
        actionButtons={defaultActionButtons}
      />
    );

    const textarea = screen.getByRole('textbox');
    fireEvent.keyDown(textarea, { key: 'Enter', metaKey: true });
    expect(onSubmit).toHaveBeenCalledWith('Test message');
  });

  it('does not submit when disabled', () => {
    const onSubmit = vi.fn();
    render(
      <PromptContainerFullLineBottomActions
        onSubmit={onSubmit}
        value="Test message"
        disabled
        actionButtons={defaultActionButtons}
      />
    );

    const textarea = screen.getByRole('textbox');
    fireEvent.keyDown(textarea, { key: 'Enter', ctrlKey: true });
    expect(onSubmit).not.toHaveBeenCalled();
    expect(textarea).toBeDisabled();
  });

  it('renders custom action buttons', () => {
    const customButtons = (
      <Button variant="ghost" size="icon" aria-label="Custom button">
        <Paperclip className="h-4 w-4" />
      </Button>
    );

    render(
      <PromptContainerFullLineBottomActions
        onSubmit={vi.fn()}
        actionButtons={customButtons}
      />
    );

    expect(screen.getByLabelText('Custom button')).toBeInTheDocument();
  });
}); 