import React from 'react';
import { Box, Card } from '@heroui/react';
import { Text } from '../../components/Text';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { BlockProps } from '../../types';

export interface AudioBlockProps extends BlockProps {
  src: string;
  caption?: string;
  autoPlay?: boolean;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  displayPlayIcon?: boolean;
}

export const AudioBlock: React.FC<AudioBlockProps> = ({
  id,
  src,
  caption,
  autoPlay = false,
  controls = true,
  loop = false,
  muted = false,
  displayPlayIcon = true,
  className,
  onChange,
  ...props
}) => {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  return (
    <Card 
      className={className}
      data-block-id={id}
      {...props}
    >
      <Box display="flex" alignItems="center" gap="2" p="3">
        {displayPlayIcon && (
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={togglePlay}
            style={{ cursor: 'pointer' }}
          >
            <Icon 
              icon={isPlaying ? "heroicons:pause-circle" : "heroicons:play-circle"} 
              width={40} 
              height={40} 
              color="var(--hero-color-primary)"
            />
          </motion.div>
        )}
        
        <Box flex="1">
          <Box 
            as="audio"
            ref={audioRef}
            src={src}
            autoPlay={autoPlay}
            controls={controls}
            loop={loop}
            muted={muted}
            width="100%"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        </Box>
      </Box>
      
      {caption && (
        <Text 
          as="figcaption"
          size="sm"
          color="foreground-muted"
          className="px-3 pb-3 text-center"
        >
          {caption}
        </Text>
      )}
    </Card>
  );
}; 