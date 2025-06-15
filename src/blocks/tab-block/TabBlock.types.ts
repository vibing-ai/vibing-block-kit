import { ReactNode } from 'react';
import { BlockProps } from '../../types';

export type TabLayout = 'horizontal' | 'vertical';
export type TabMobileMode = 'accordion' | 'tabs';

export interface TabItem {
  id: string;
  label: string;
  icon?: ReactNode | string; // Puede ser un icono React o un nombre de icono
  content: ReactNode;
  disabled?: boolean;
}

export interface TabBlockOnChangeData {
  activeKey: string;
}

export interface TabBlockProps extends BlockProps {
  tabs: TabItem[];
  defaultTab?: string; // Nuevo: id del tab por defecto
  layout?: TabLayout; // Nuevo: horizontal o vertical
  mobileMode?: TabMobileMode; // Nuevo: accordion o tabs
  responsiveBreakpoint?: number;
  style?: React.CSSProperties;
  onChange?: (id: string, data: TabBlockOnChangeData) => void;
  syncWithUrl?: boolean; // Nuevo: sincronizar con hash de URL
}