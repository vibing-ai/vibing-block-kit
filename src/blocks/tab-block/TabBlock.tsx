import React, { useState, useRef, useEffect } from 'react';
import { TabBlockProps } from './TabBlock.types';
// If you want to use CSS modules, import like this:
import styles from './TabBlock.module.css';

export const TabBlock: React.FC<TabBlockProps> = ({
  tabs,
  defaultActiveKey,
  orientation = 'horizontal',
  responsiveBreakpoint = 768,
  className,
  style,
  // Destructure onChange to prevent it from being spread onto the div
  onChange,
  ...rest
}) => {
  const [activeKey, setActiveKey] = useState(
    defaultActiveKey || (tabs.length > 0 ? tabs[0].key : '')
  );

  const [isMobile, setIsMobile] = useState(false);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < responsiveBreakpoint);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [responsiveBreakpoint]);

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  // TODO: Add responsive, accessibility, keyboard, and animation logic
  // Keyboard navigation handler
  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    const enabledTabs = tabs.filter(tab => !tab.disabled);
    const enabledIndexes = tabs.map((tab, i) => (!tab.disabled ? i : -1)).filter(i => i !== -1);
    let nextIdx = idx;

    if (orientation === 'vertical') {
      if (e.key === 'ArrowUp') {
        const prev = enabledIndexes.indexOf(idx) - 1;
        nextIdx = enabledIndexes[prev < 0 ? enabledIndexes.length - 1 : prev];
      } else if (e.key === 'ArrowDown') {
        const next = enabledIndexes.indexOf(idx) + 1;
        nextIdx = enabledIndexes[next >= enabledIndexes.length ? 0 : next];
      }
    } else {
      if (e.key === 'ArrowLeft') {
        const prev = enabledIndexes.indexOf(idx) - 1;
        nextIdx = enabledIndexes[prev < 0 ? enabledIndexes.length - 1 : prev];
      } else if (e.key === 'ArrowRight') {
        const next = enabledIndexes.indexOf(idx) + 1;
        nextIdx = enabledIndexes[next >= enabledIndexes.length ? 0 : next];
      }
    }

    if (e.key === 'Home') {
      nextIdx = enabledIndexes[0];
    } else if (e.key === 'End') {
      nextIdx = enabledIndexes[enabledIndexes.length - 1];
    }

    if (nextIdx !== idx && tabRefs.current[nextIdx]) {
      tabRefs.current[nextIdx]?.focus();
    }

    if (
      (e.key === 'Enter' || e.key === ' ') &&
      !tabs[idx].disabled
    ) {
      setActiveKey(tabs[idx].key);
      if (onChange) onChange(tabs[idx].key, tabs[idx]);
    }
  };

  const handleTabChange = (key: string, tab: typeof tabs[0]) => {
    setFade(true);
    setTimeout(() => {
      setActiveKey(key);
      setFade(false);
      if (onChange) onChange(key, tab);
    }, 150); // Half the transition duration
  };

  // --- URL hash integration ---
  useEffect(() => {
    // Only set from hash if present and valid
    const hash = window.location.hash.replace('#', '');
    if (
      hash &&
      tabs.some(tab => tab.key === hash) &&
      hash !== activeKey
    ) {
      setActiveKey(hash);
    }
    // Listen for hash changes
    const onHashChange = () => {
      const newHash = window.location.hash.replace('#', '');
      if (newHash && tabs.some(tab => tab.key === newHash)) {
        setActiveKey(newHash);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
    // eslint-disable-next-line
  }, [tabs]);

  // When activeKey changes, update the hash
  useEffect(() => {
    if (activeKey && window.location.hash.replace('#', '') !== activeKey) {
      window.location.hash = activeKey;
    }
  }, [activeKey]);
  // --- end URL hash integration ---

  return (
    <div
      className={`vbk-tab-block vbk-tab-block--${orientation} ${isMobile ? 'vbk-tab-block--mobile' : ''} ${className || ''}`}
      style={style}
      {...rest}
    >
      {!isMobile ? (
        <>
          <div className="vbk-tab-block__tablist" role="tablist" aria-orientation={orientation}>
            {tabs.map((tab, idx) => (
              <button
                key={tab.key}
                ref={el => (tabRefs.current[idx] = el)}
                role="tab"
                aria-selected={activeKey === tab.key}
                aria-controls={`vbk-tabpanel-${tab.key}`}
                id={`vbk-tab-${tab.key}`}
                disabled={tab.disabled}
                tabIndex={activeKey === tab.key ? 0 : -1}
                className={`vbk-tab-block__tab${activeKey === tab.key ? ' vbk-tab-block__tab--active' : ''}`}
                onClick={() => {
                  setActiveKey(tab.key);
                  if (onChange) onChange(tab.key, tab);
                }}
                onKeyDown={e => handleKeyDown(e, idx)}
                type="button"
              >
                {tab.icon && <span className="vbk-tab-block__icon">{tab.icon}</span>}
                {tab.label}
              </button>
            ))}
          </div>
          <div className="vbk-tab-block__panels">
            {tabs.map(tab =>
              activeKey === tab.key ? (
                <div
                  key={tab.key}
                  role="tabpanel"
                  id={`vbk-tabpanel-${tab.key}`}
                  aria-labelledby={`vbk-tab-${tab.key}`}
                  className={`${styles['vbk-tab-block__panel']} ${fade ? styles['vbk-tab-block__panel--fade'] : ''}`}
                >
                  {tab.content}
                </div>
              ) : null
            )}
          </div>
        </>
      ) : (
        <div className="vbk-tab-block__accordion">
          {tabs.map((tab, idx) => (
            <div key={tab.key} className="vbk-tab-block__accordion-item">
              <button
                className={`vbk-tab-block__accordion-header${activeKey === tab.key ? ' vbk-tab-block__tab--active' : ''}`}
                onClick={() => {
                  setActiveKey(tab.key);
                  if (onChange) onChange(tab.key, tab);
                }}
                disabled={tab.disabled}
                aria-expanded={activeKey === tab.key}
                aria-controls={`vbk-tabpanel-${tab.key}`}
                id={`vbk-tab-${tab.key}`}
                type="button"
              >
                {tab.icon && <span className="vbk-tab-block__icon">{tab.icon}</span>}
                {tab.label}
              </button>
              {activeKey === tab.key && (
                <div
                  id={`vbk-tabpanel-${tab.key}`}
                  role="region"
                  aria-labelledby={`vbk-tab-${tab.key}`}
                  className="vbk-tab-block__panel"
                >
                  {tab.content}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};