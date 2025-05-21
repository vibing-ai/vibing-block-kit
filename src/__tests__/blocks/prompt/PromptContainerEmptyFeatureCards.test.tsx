import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PromptContainerEmptyFeatureCards } from '../../../blocks/prompt/PromptContainerEmptyFeatureCards';
import { FiMessageSquare } from 'react-icons/fi';

describe('PromptContainerEmptyFeatureCards', () => {
  const mockFeatures = [
    {
      id: '1',
      icon: <FiMessageSquare />,
      title: 'Test Feature',
      description: 'Test Description',
      onClick: vi.fn(),
    },
  ];

  it('renders feature cards correctly', () => {
    render(<PromptContainerEmptyFeatureCards features={mockFeatures} />);
    
    expect(screen.getByText('Test Feature')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('calls onClick handler when card is clicked', () => {
    render(<PromptContainerEmptyFeatureCards features={mockFeatures} />);
    
    const card = screen.getByRole('listitem');
    fireEvent.click(card);
    
    expect(mockFeatures[0].onClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom className to container', () => {
    const customClass = 'custom-container';
    render(
      <PromptContainerEmptyFeatureCards
        features={mockFeatures}
        className={customClass}
      />
    );
    
    const container = screen.getByRole('list');
    expect(container).toHaveClass(customClass);
  });

  it('applies custom cardClassName to cards', () => {
    const customCardClass = 'custom-card';
    render(
      <PromptContainerEmptyFeatureCards
        features={mockFeatures}
        cardClassName={customCardClass}
      />
    );
    
    const card = screen.getByRole('listitem');
    expect(card).toHaveClass(customCardClass);
  });

  it('renders multiple cards correctly', () => {
    const multipleFeatures = [
      ...mockFeatures,
      {
        id: '2',
        icon: <FiMessageSquare />,
        title: 'Second Feature',
        description: 'Second Description',
        onClick: vi.fn(),
      },
    ];

    render(<PromptContainerEmptyFeatureCards features={multipleFeatures} />);
    
    expect(screen.getByText('Test Feature')).toBeInTheDocument();
    expect(screen.getByText('Second Feature')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });
}); 