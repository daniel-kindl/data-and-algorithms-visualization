import React from 'react';

interface VisualizerContainerProps {
  title?: string | undefined;
  icon?: React.ReactNode | undefined;
  legend?: React.ReactNode | undefined;
  children: React.ReactNode;
  footer?: React.ReactNode | undefined;
  className?: string | undefined;
  minHeight?: string | undefined;
}

export function VisualizerContainer({
  title,
  icon,
  legend,
  children,
  footer,
  className = '',
  minHeight = '400px',
}: VisualizerContainerProps) {
  return (
    <div 
      className={`bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm h-full flex flex-col ${className}`} 
      style={{ minHeight }}
    >
      <div className="flex items-center justify-between mb-4">
        {title && (
          <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            {icon}
            {title}
          </h2>
        )}
        {legend && (
          <div className="flex gap-2 text-xs">
            {legend}
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col w-full relative">
        {children}
      </div>

      {footer && (
        <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-4">
          {footer}
        </div>
      )}
    </div>
  );
}
