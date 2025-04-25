import React from 'react';
import { BlockProps } from '../../types';
import { Text } from '../../components/Text';

export interface TextBlockProps extends BlockProps {
  text: string;
  type?: 'paragraph' | 'heading1' | 'heading2' | 'heading3' | 'heading4' | 'heading5' | 'heading6';
  className?: string;
}

// Map text block type to HTML element
const typeToElement = {
  paragraph: 'p',
  heading1: 'h1',
  heading2: 'h2',
  heading3: 'h3',
  heading4: 'h4',
  heading5: 'h5',
  heading6: 'h6'
} as const;

export const TextBlock: React.FC<TextBlockProps> = ({
  id,
  text,
  type = 'paragraph',
  className,
  onChange, // Destructure but don't use to avoid passing to DOM
  ...props
}) => {
  // Get the appropriate HTML element
  const element = typeToElement[type];

  return (
    <Text 
      as={element}
      className={className}
      data-block-id={id}
      {...props}
    >
      {text}
    </Text>
  );
}; 