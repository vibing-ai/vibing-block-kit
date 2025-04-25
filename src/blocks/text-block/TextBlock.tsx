import React from 'react';
import { Text } from '../../components/Text';
import { BlockProps } from '../../types';

export interface TextBlockProps extends BlockProps {
  content: string;
  variant?: 'paragraph' | 'heading' | 'subheading' | 'caption';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
}

type HTMLTag = 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div';

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
  } as const;

  return (
    <Text 
      as={variantMap[variant] as keyof JSX.IntrinsicElements}
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