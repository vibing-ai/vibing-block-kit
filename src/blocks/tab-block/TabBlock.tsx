import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { TabBlockProps } from './TabBlock.types';
import styles from './TabBlock.module.css';

export const TabBlock: React.FC<TabBlockProps> = ({
  tabs,
  defaultTab,
  layout = 'horizontal',
  mobileMode = 'accordion',
  responsiveBreakpoint = 768,
  className,
  style,
  onChange,
  syncWithUrl = false,
  ...rest
}) => {
  const [activeId, setActiveId] = useState(
    defaultTab || (tabs.length > 0 ? tabs[0].id : '')
  );
  const [isMobile, setIsMobile] = useState(false);
  const [fade, setFade] = useState(false);

  // Responsive: detect mobile/accordion mode
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < responsiveBreakpoint);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [responsiveBreakpoint]);

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Keyboard navigation
  const handleKeyDown = (e: KeyboardEvent, idx: number) => {
    const enabledIndexes = tabs
      .map((tab, i) => (!tab.disabled ? i : -1))
      .filter(i => i !== -1);

    const currentEnabledIdx = enabledIndexes.indexOf(idx);
    let nextEnabledIdx = currentEnabledIdx;

    // Solo aplica navegación vertical si NO es móvil y layout es vertical
    if (!isMobile && layout === 'vertical') {
      if (e.key === 'ArrowUp') {
        nextEnabledIdx = (currentEnabledIdx - 1 + enabledIndexes.length) % enabledIndexes.length;
        e.preventDefault();
      } else if (e.key === 'ArrowDown') {
        nextEnabledIdx = (currentEnabledIdx + 1) % enabledIndexes.length;
        e.preventDefault();
      }
    } else {
      if (e.key === 'ArrowLeft') {
        nextEnabledIdx = (currentEnabledIdx - 1 + enabledIndexes.length) % enabledIndexes.length;
        e.preventDefault();
      } else if (e.key === 'ArrowRight') {
        nextEnabledIdx = (currentEnabledIdx + 1) % enabledIndexes.length;
        e.preventDefault();
      }
    }

    if (
      nextEnabledIdx !== currentEnabledIdx &&
      tabRefs.current[enabledIndexes[nextEnabledIdx]]
    ) {
      tabRefs.current[enabledIndexes[nextEnabledIdx]]?.focus();
    }

    if (
      (e.key === 'Enter' || e.key === ' ') &&
      !tabs[idx].disabled
    ) {
      handleTabChange(tabs[idx].id);
      e.preventDefault();
    }
  };

  // Cambia el tab activo y notifica al padre
  const handleTabChange = (id: string) => {
    setFade(true);
    setTimeout(() => {
      setActiveId(id);
      setFade(false);
      if (onChange && rest.id) {
        onChange(rest.id, { activeKey: id });
      }
    }, 150);
  };

  // Deep linking: sincroniza con hash de URL
  useEffect(() => {
    if (!syncWithUrl) return;
    const hash = window.location.hash.replace('#', '');
    if (
      hash &&
      tabs.some(tab => tab.id === hash) &&
      hash !== activeId
    ) {
      setActiveId(hash);
    }
    const onHashChange = () => {
      const newHash = window.location.hash.replace('#', '');
      if (newHash && tabs.some(tab => tab.id === newHash)) {
        setActiveId(newHash);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [tabs, syncWithUrl]);

  useEffect(() => {
    if (syncWithUrl && activeId && window.location.hash.replace('#', '') !== activeId) {
      window.location.hash = activeId;
    }
  }, [activeId, syncWithUrl]);

  return (
    <div
      className={[
        styles['vbk-tab-block'],
        styles[`vbk-tab-block--${layout}`],
        isMobile ? styles['vbk-tab-block--mobile'] : '',
        className,
      ].filter(Boolean).join(' ')}
      style={style}
      {...rest}
    >
      {isMobile && mobileMode === 'accordion' ? (
        <div className={styles['vbk-tab-block__accordion']}>
          {tabs.map((tab, idx) => (
            <div key={tab.id} className={styles['vbk-tab-block__accordion-item']}>
              <button
                className={[
                  styles['vbk-tab-block__accordion-header'],
                  activeId === tab.id ? styles['vbk-tab-block__tab--active'] : '',
                ].join(' ')}
                onClick={() => {
                  if (!tab.disabled) {
                    console.log('Tab clicked:', rest.id, { activeKey: tab.id });
                    handleTabChange(tab.id);
                  }
                }}
                disabled={tab.disabled}
                aria-disabled={tab.disabled || undefined}
                aria-expanded={activeId === tab.id}
                aria-controls={`vbk-tabpanel-${tab.id}`}
                id={`vbk-tab-${tab.id}`}
                type="button"
                aria-label={tab.label}
              >
                {tab.icon && (
                  <span className={styles['vbk-tab-block__icon']} aria-hidden="true">
                    {tab.icon}
                  </span>
                )}
                {tab.label}
              </button>
              {activeId === tab.id && (
                <div
                  id={`vbk-tabpanel-${tab.id}`}
                  role="region"
                  aria-labelledby={`vbk-tab-${tab.id}`}
                  className={styles['vbk-tab-block__panel']}
                >
                  {tab.content}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <>
          <div
            className={styles['vbk-tab-block__tablist']}
            role="tablist"
            aria-orientation={layout}
          >
            {tabs.map((tab, idx) => (
              <button
                key={tab.id}
                ref={el => (tabRefs.current[idx] = el)}
                role="tab"
                aria-selected={activeId === tab.id}
                aria-controls={`vbk-tabpanel-${tab.id}`}
                id={`vbk-tab-${tab.id}`}
                aria-disabled={tab.disabled || undefined}
                disabled={tab.disabled}
                tabIndex={
                  tab.disabled
                    ? -1
                    : activeId === tab.id
                    ? 0
                    : -1
                }
                className={
                  `${styles['vbk-tab-block__tab']}${activeId === tab.id ? ` ${styles['vbk-tab-block__tab--active']}` : ''}`
                }
                onClick={() => {
                  if (!tab.disabled) {
                    console.log('Tab clicked:', rest.id, { activeKey: tab.id });
                    handleTabChange(tab.id);
                  }
                }}
                onKeyDown={e => handleKeyDown(e, idx)}
                type="button"
                aria-label={tab.label}
              >
                {tab.icon && (
                  <span className={styles['vbk-tab-block__icon']} aria-hidden="true">
                    {tab.icon}
                  </span>
                )}
                {tab.label}
              </button>
            ))}
          </div>
          <div className={styles['vbk-tab-block__panels']}>
            {tabs.map(tab =>
              activeId === tab.id ? (
                <div
                  key={tab.id}
                  role="tabpanel"
                  id={`vbk-tabpanel-${tab.id}`}
                  aria-labelledby={`vbk-tab-${tab.id}`}
                  tabIndex={0}
                  className={[
                    styles['vbk-tab-block__panel'],
                    fade ? styles['vbk-tab-block__panel--fade'] : '',
                  ].join(' ')}
                >
                  {tab.content}
                </div>
              ) : null
            )}
          </div>
        </>
      )}
    </div>
  );
};