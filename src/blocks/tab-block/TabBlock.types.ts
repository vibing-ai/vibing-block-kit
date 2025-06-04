import { ReactNode } from 'react';
import { BlockProps } from '../../types'; // Adjust path if needed

export type TabOrientation = 'horizontal' | 'vertical';

export interface TabBlockTab {
  label: string;
  key: string;
  icon?: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export interface TabBlockProps extends BlockProps {
  tabs: TabBlockTab[];
  defaultActiveKey?: string;
  orientation?: TabOrientation;
  responsiveBreakpoint?: number; // px, for switching to accordion
  className?: string;
  style?: React.CSSProperties;
}