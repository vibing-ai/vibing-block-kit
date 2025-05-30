import React from 'react';
import { Card } from '@heroui/react';
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
  captionSrc?: string;
  captionLang?: string;
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
  captionSrc,
  captionLang = 'en',
  className,
  onChange:
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
   _onChange,
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
      <div className="flex items-center gap-2 p-3">
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
        
        <div className="flex-1">
          <audio
            ref={audioRef}
            src={src}
            autoPlay={autoPlay}
            controls={controls}
            loop={loop}
            muted={muted}
            style={{ width: '100%' }}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            {captionSrc && (
              <track kind="captions" src={captionSrc} srcLang={captionLang} label={`${captionLang} captions`} />
            )}
            {!captionSrc && caption && (
              <track kind="captions" label="No captions available" />
            )}
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
      
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