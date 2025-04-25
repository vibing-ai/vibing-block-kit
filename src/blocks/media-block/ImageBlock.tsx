import React from 'react';
import { Box } from '@heroui/react';
import { Text } from '../../components/Text';
import { motion } from 'framer-motion';
import { BlockProps } from '../../types';

export interface ImageBlockProps extends BlockProps {
  src: string;
  alt?: string;
  caption?: string;
  width?: string | number;
  height?: string | number;
  rounded?: boolean;
  loading?: 'eager' | 'lazy';
}

export const ImageBlock: React.FC<ImageBlockProps> = ({
  id,
  src,
  alt,
  caption,
  width,
  height,
  rounded = false,
  loading = 'lazy',
  className,
  onChange,
  ...props
}) => {
  return (
    <Box 
      className={className}
      data-block-id={id}
      {...props}
    >
      <motion.figure
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ margin: 0 }}
      >
        <Box 
          as="img"
          src={src} 
          alt={alt || ''} 
          width={width || '100%'}
          height={height}
          borderRadius={rounded ? 'md' : undefined}
          loading={loading}
          style={{ maxWidth: '100%' }}
        />
        {caption && (
          <Text 
            as="figcaption"
            size="sm"
            color="foreground-muted"
            className="mt-2 text-center"
          >
            {caption}
          </Text>
        )}
      </motion.figure>
    </Box>
  );
}; 