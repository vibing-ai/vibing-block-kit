import React from 'react';
import { ContainerBlockProps } from '../../types';

export interface BlockGroupProps extends Omit<ContainerBlockProps, 'onChange'> {
  /**
   * Title of the group
   */
  title?: string;
  
  /**
   * Description of the group
   */
  description?: string;
  
  /**
   * Whether the group is collapsible
   */
  collapsible?: boolean;
  
  /**
   * Whether the group is initially collapsed
   */
  defaultCollapsed?: boolean;
  
  /**
   * Whether to add a border to the group
   */
  bordered?: boolean;
  
  /**
   * Whether to add a background to the group
   */
  background?: boolean | 'default' | 'muted' | 'subtle' | 'card';
  
  /**
   * Optional actions to display with the group
   */
  actions?: React.ReactNode;
  
  /**
   * Custom callback for when blocks in this group change
   */
  onChangeBlock?: (id: string, data: Record<string, unknown>) => void;
}

/**
 * BlockGroup component for grouping related blocks with an optional title and controls
 */
export const BlockGroup: React.FC<BlockGroupProps> = ({
  id,
  children,
  title,
  description,
  collapsible = false,
  defaultCollapsed = false,
  bordered = true,
  background = 'default',
  actions,
  className,
  ...props
}) => {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  
  // Background classes
  const backgroundClasses = {
    default: 'bg-background',
    muted: 'bg-muted',
    subtle: 'bg-accent/10',
    card: 'bg-card',
  };
  
  // Determine background class
  let backgroundClass = '';
  if (background === true) {
    backgroundClass = backgroundClasses.default;
  } else if (background !== false) {
    backgroundClass = backgroundClasses[background];
  }
  
  const toggleCollapse = () => {
    if (collapsible) {
      setIsCollapsed(!isCollapsed);
    }
  };
  
  return (
    <div 
      className={`
        block-group 
        ${bordered ? 'border rounded-lg' : ''} 
        ${backgroundClass} 
        overflow-hidden
        ${className || ''}
      `}
      data-block-id={id}
      {...props}
    >
      {(title || actions) && (
        <div className="flex justify-between items-center p-3 border-b">
          <div>
            {title && (
              <div 
                className={`font-medium ${collapsible ? 'cursor-pointer' : ''} flex items-center`}
                onClick={collapsible ? toggleCollapse : undefined}
                onKeyDown={collapsible ? (e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleCollapse();
                  }
                } : undefined}
                tabIndex={collapsible ? 0 : undefined}
                role={collapsible ? "button" : undefined}
                aria-expanded={collapsible ? !isCollapsed : undefined}
              >
                {collapsible && (
                  <span className="mr-1 text-xs">
                    {isCollapsed ? '▶' : '▼'}
                  </span>
                )}
                {title}
              </div>
            )}
            {description && (
              <p className="text-sm text-muted-foreground mt-1">
                {description}
              </p>
            )}
          </div>
          {actions && (
            <div className="flex items-center gap-2">
              {actions}
            </div>
          )}
        </div>
      )}
      
      <div className={`${isCollapsed ? 'hidden' : 'block'} p-3`}>
        {children}
      </div>
    </div>
  );
}; 