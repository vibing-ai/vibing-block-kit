import React from 'react';
import { BlockProps } from '../../types';

export interface FeatureCardItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
}

export interface PromptContainerEmptyFeatureCardsProps extends BlockProps {
  features: FeatureCardItem[];
  className?: string;
  cardClassName?: string;
}

export const PromptContainerEmptyFeatureCards: React.FC<PromptContainerEmptyFeatureCardsProps> = ({
  features,
  className = '',
  cardClassName = '',
}) => {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}
      role="list"
    >
      {features.map((feature) => (
        <button
          key={feature.id}
          onClick={feature.onClick}
          className={`
            flex flex-col items-start p-4 rounded-lg
            bg-white dark:bg-gray-800
            border border-gray-200 dark:border-gray-700
            hover:border-blue-500 dark:hover:border-blue-400
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            ${cardClassName}
          `}
         
        >
          <div className="mb-3 text-blue-500 dark:text-blue-400">
            {feature.icon}
          </div>
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
            {feature.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {feature.description}
          </p>
        </button>
      ))}
    </div>
  );
}; 