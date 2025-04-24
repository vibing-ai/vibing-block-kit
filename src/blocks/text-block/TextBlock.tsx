import React from 'react';
import { Text } from '@heroui/react';
import { Text } from '../../components/Text';
import { BlockProps } from '../../types';

export interface TextBlockProps extends BlockProps {
  content: string;
  variant?: 'paragraph' | 'heading' | 'subheading' | 'caption';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
}

export const TextBlock: React.FC<TextBlockProps> = ({
  id,
  content,
  className,
  variant = 'paragraph',
  weight = 'normal',
  size = 'md',
  onChange,
  ...props
}) => {
  const variantMap = {
    paragraph: 'p',
    heading: 'h2',
    subheading: 'h3',
    caption: 'span'
  };

  return (
    <Text 
      as={variantMap[variant]}
      size={size}
      weight={weight}
      className={className}
      data-block-id={id}
      {...props}
    >
      {content}
    </Text>
  );
}; 