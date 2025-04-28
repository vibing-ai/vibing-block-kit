import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import { Card } from '@heroui/react';
import { BlockProps } from '../../types';

export interface TabItem {
  id: string;
  label: string;
  icon?: string;
  content: React.ReactNode;
}

export interface TabBlockProps extends BlockProps {
  defaultTab?: string;
  layout?: 'horizontal' | 'vertical';
  mobileMode?: 'tabs' | 'accordion';
  tabs: TabItem[];
  onChange?: (tabId: string) => void;
  syncWithUrl?: boolean;
}

export const TabBlock: React.FC<TabBlockProps> = ({
  id,
  defaultTab,
  layout = 'horizontal',
  mobileMode = 'accordion',
  tabs,
  onChange,
  syncWithUrl = false,
  className,
  ...props
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);
  const [isMobile, setIsMobile] = useState(false);

  // Add ref for managing focus
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle URL sync
  useEffect(() => {
    if (syncWithUrl) {
      const hash = window.location.hash.slice(1);
      if (hash && tabs.some(tab => tab.id === hash)) {
        setActiveTab(hash);
      }
    }
  }, [syncWithUrl, tabs]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (syncWithUrl) {
      window.history.pushState(null, '', `#${tabId}`);
    }
    onChange?.(tabId);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const tabCount = tabs.length;
    let nextIndex: number;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        nextIndex = (index + 1) % tabCount;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        nextIndex = (index - 1 + tabCount) % tabCount;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = tabCount - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    tabRefs.current[nextIndex]?.focus();
    handleTabChange(tabs[nextIndex].id);
  };

  const renderTabs = () => (
    <div
      role="tablist"
      className={`flex ${layout === 'vertical' ? 'flex-col' : 'flex-row'} 
        ${layout === 'horizontal' ? 'border-b border-gray-200' : 'border-r border-gray-200'}`}
      aria-orientation={layout}
    >
      {tabs.map((tab, index) => (
        <button
          type="button"
          key={tab.id}
          ref={el => (tabRefs.current[index] = el)}
          role="tab"
          aria-selected={activeTab === tab.id}
          aria-controls={`${id}-${tab.id}-panel`}
          id={`${id}-${tab.id}-tab`}
          tabIndex={activeTab === tab.id ? 0 : -1}
          onKeyDown={e => handleKeyDown(e, index)}
          className={`flex items-center px-4 py-2 ${
            activeTab === tab.id
              ? 'text-primary-600 border-primary-500'
              : 'text-gray-500 hover:text-gray-700'
          } ${
            layout === 'horizontal'
              ? activeTab === tab.id
                ? 'border-b-2'
                : 'border-b-2 border-transparent'
              : activeTab === tab.id
              ? 'border-r-2'
              : 'border-r-2 border-transparent'
          }`}
          onClick={() => handleTabChange(tab.id)}
        >
          {tab.icon && <Icon icon={tab.icon} className="mr-2" />}
          {tab.label}
        </button>
      ))}
    </div>
  );

  const renderContent = () => (
    <div className="mt-4">
      {tabs.map(tab => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`${id}-${tab.id}-panel`}
          aria-labelledby={`${id}-${tab.id}-tab`}
          hidden={activeTab !== tab.id}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );

  const renderAccordion = () => (
    <div className="space-y-2">
      {tabs.map(tab => (
        <div key={tab.id} className="border rounded">
          <button
            className="w-full px-4 py-2 text-left flex items-center justify-between"
            onClick={() => handleTabChange(tab.id)}
          >
            <span className="flex items-center">
              {tab.icon && <Icon icon={tab.icon} className="mr-2" />}
              {tab.label}
            </span>
            <Icon icon={activeTab === tab.id ? 'chevron-up' : 'chevron-down'} className="ml-2" />
          </button>
          {activeTab === tab.id && <div className="p-4 border-t">{tab.content}</div>}
        </div>
      ))}
    </div>
  );

  return (
    <Card className={className} data-block-id={id} {...props}>
      {isMobile && mobileMode === 'accordion' ? (
        renderAccordion()
      ) : (
        <div className={`flex ${layout === 'vertical' ? 'flex-row' : 'flex-col'}`}>
          {renderTabs()}
          {renderContent()}
        </div>
      )}
    </Card>
  );
};

