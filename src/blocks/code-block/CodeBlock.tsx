import React from 'react';
import { Card } from '@heroui/react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { BlockProps } from '../../types';

export interface CodeBlockProps extends BlockProps {
  /**
   * The code content
   */
  code: string;
  
  /**
   * The programming language
   */
  language?: string;
  
  /**
   * Whether to show line numbers
   */
  showLineNumbers?: boolean;
  
  /**
   * Maximum height of the code block
   */
  maxHeight?: string | number;
  
  /**
   * Whether the code is copyable
   */
  copyable?: boolean;
}

/**
 * CodeBlock component for displaying code snippets with syntax highlighting
 */
export const CodeBlock: React.FC<CodeBlockProps> = ({
  id,
  code,
  language = 'javascript',
  showLineNumbers = true,
  maxHeight = '400px',
  copyable = true,
  className,
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  onChange,
  ...props
}) => {
  const [copied, setCopied] = React.useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  // Format code with line numbers if needed
  const formatCodeWithLineNumbers = () => {
    if (!showLineNumbers) return code;
    
    return code.split('\n').map((line, index) => (
      <div key={index} className="code-line">
        <span className="line-number" style={{ 
          color: 'var(--hero-color-foreground-400)', 
          opacity: 0.5,
          marginRight: '1rem',
          userSelect: 'none',
          display: 'inline-block',
          width: '2rem',
          textAlign: 'right'
        }}>
          {index + 1}
        </span>
        <span>{line}</span>
      </div>
    ));
  };
  
  return (
    <Card
      className={className}
      data-block-id={id}
      data-language={language}
      {...props}
    >
      <div style={{ 
        position: 'relative',
        backgroundColor: 'var(--hero-color-code-background, var(--hero-color-background-800))'
      }}>
        {copyable && (
          <motion.button
            initial={{ opacity: 0.6 }}
            whileHover={{ opacity: 1 }}
            className="copy-button"
            onClick={handleCopy}
            style={{
              position: 'absolute',
              top: '0.5rem',
              right: '0.5rem',
              zIndex: 10,
              backgroundColor: 'var(--hero-color-background-200)',
              color: 'var(--hero-color-foreground)',
              border: 'none',
              borderRadius: 'var(--hero-border-radius)',
              padding: '0.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <Icon 
              icon={copied ? "heroicons:check" : "heroicons:clipboard"} 
              width={16} 
              height={16} 
            />
          </motion.button>
        )}
        
        <div style={{ padding: '1rem' }}>
          <div 
            className="language-badge"
            style={{
              display: 'inline-block',
              backgroundColor: 'var(--hero-color-background-100)',
              color: 'var(--hero-color-foreground-600)',
              padding: '0.25rem 0.5rem',
              borderRadius: 'var(--hero-border-radius)',
              fontSize: '0.75rem',
              marginBottom: '0.5rem'
            }}
          >
            {language}
          </div>
        </div>
        
        <div 
          style={{ 
            maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
            overflow: 'auto'
          }}
        >
          <pre style={{ 
            margin: 0, 
            padding: '0 1rem 1rem',
            fontFamily: 'var(--hero-font-mono, monospace)',
            fontSize: '0.875rem',
            lineHeight: 1.7,
            overflowX: 'auto',
            color: 'var(--hero-color-foreground)'
          }}>
            <code>
              {showLineNumbers ? formatCodeWithLineNumbers() : code}
            </code>
          </pre>
        </div>
      </div>
    </Card>
  );
}; 