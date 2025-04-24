import React from 'react';
import { Box, Text } from '@heroui/react';
import { Text } from '../../components/Text';
import { motion } from 'framer-motion';
import { BlockProps } from '../../types';

export interface VideoBlockProps extends BlockProps {
  src: string;
  poster?: string;
  caption?: string;
  autoPlay?: boolean;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  width?: string | number;
  height?: string | number;
  rounded?: boolean;
}

export const VideoBlock: React.FC<VideoBlockProps> = ({
  id,
  src,
  poster,
  caption,
  autoPlay = false,
  controls = true,
  loop = false,
  muted = false,
  width = '100%',
  height,
  rounded = false,
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
          as="video"
          src={src}
          poster={poster}
          autoPlay={autoPlay}
          controls={controls}
          loop={loop}
          muted={muted}
          width={width}
          height={height}
          borderRadius={rounded ? 'md' : undefined}
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