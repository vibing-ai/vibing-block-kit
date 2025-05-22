import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { BlockProps } from '../../types';
import styles from './EnhancedCodeBlock.module.css';

export interface EnhancedCodeBlockProps 
  extends Omit<BlockProps, 'onChange' | 'children' | 'style'>, 
          Omit<React.HTMLAttributes<HTMLDivElement>, 'id'>
{
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
}

/**
 * EnhancedCodeBlock component that mimics Grok's code editor appearance
 */
export const EnhancedCodeBlock: React.FC<EnhancedCodeBlockProps> = ({
  id,
  code,
  language = 'javascript',
  showLineNumbers = true,
  className,
  ...rest
}) => {
  const [currentLanguage, setCurrentLanguage] = useState(language);
  const [showPreview, setShowPreview] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Languages dropdown options
  const languages = [
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'c', label: 'C' },
    { value: 'cpp', label: 'C++' },
    { value: 'csharp', label: 'C#' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
    { value: 'php', label: 'PHP' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'swift', label: 'Swift' },
    { value: 'kotlin', label: 'Kotlin' },
    { value: 'sql', label: 'SQL' },
    { value: 'json', label: 'JSON' },
    { value: 'xml', label: 'XML' },
    { value: 'markdown', label: 'Markdown' },
    { value: 'yaml', label: 'YAML' },
    { value: 'bash', label: 'Bash' },
    { value: 'powershell', label: 'PowerShell' },
  ];

  // Copy code to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };

  // Toggle collapse state
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Toggle preview state
  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  // Simulated edit action
  const handleEdit = () => {
    console.log('Edit mode activated');
    // In a real implementation, this would enable editing of the code
  };

  // Format code with line numbers if needed
  const formatCodeWithLineNumbers = () => {
    if (!showLineNumbers) return code;
    
    return code.split('\n').map((line, index) => (
      <div key={index} className={styles.codeLine}>
        <span className={styles.lineNumber}>
          {index + 1}
        </span>
        <span>{line}</span>
      </div>
    ));
  };
  
  return (
    <div 
      className={`${styles.codeBlock} ${className || ''}`}
      data-block-id={id}
      data-language={currentLanguage}
      {...rest}
    >
      {/* Header toolbar */}
      <div className={styles.toolbar}>
        {/* Language selector */}
        <div className={styles.languageSelector}>
          <select
            value={currentLanguage}
            onChange={(e) => setCurrentLanguage(e.target.value)}
            className={styles.languageSelect}
            aria-label="Select programming language"
          >
            {languages.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
          <Icon icon="heroicons:chevron-down" width={14} height={14} className={styles.languageIcon} />
        </div>
        
        {/* Action buttons */}
        <div className={styles.actionButtons}>
          <button
            onClick={togglePreview}
            className={styles.actionButton}
          >
            <Icon icon="heroicons:eye" width={15} height={15} className={styles.actionIcon} />
            <span>Preview</span>
          </button>
          
          <button
            onClick={toggleCollapse}
            className={styles.actionButton}
          >
            <Icon 
              icon={isCollapsed ? "heroicons:chevron-down" : "heroicons:chevron-up"}
              width={15} 
              height={15} 
              className={styles.collapseIcon}
            />
            <span>Collapse</span>
          </button>
          
          <button
            onClick={handleCopy}
            className={styles.actionButton}
          >
            <Icon icon="heroicons:clipboard" width={15} height={15} className={styles.actionIcon} />
            <span>Copy</span>
          </button>
          
          <button
            onClick={handleEdit}
            className={styles.actionButton}
          >
            <Icon icon="heroicons:pencil" width={15} height={15} className={styles.actionIcon} />
            <span>Edit</span>
          </button>
        </div>
      </div>
      
      {/* Code content */}
      {!isCollapsed && (
        <div className={styles.codeContainer}>
          <pre className={styles.preBlock}>
            <code>
              {showLineNumbers ? formatCodeWithLineNumbers() : code}
            </code>
          </pre>
        </div>
      )}
    </div>
  );
}; 