import React from 'react';

interface VisualizerContainerProps {
  title?: string | undefined;
  icon?: React.ReactNode | undefined;
  legend?: React.ReactNode | undefined;
  children: React.ReactNode;
  footer?: React.ReactNode | undefined;
  explanation?: React.ReactNode | undefined;
  className?: string | undefined;
  minHeight?: string | undefined;
}

export function VisualizerContainer({
  title,
  icon,
  legend,
  children,
  footer,
  explanation,
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

      <div className="flex-1 flex flex-col lg:flex-row gap-6 w-full relative">
        {/* Main Visualization Area */}
        <div className="flex-1 flex flex-col min-h-[300px]">
          {children}
        </div>

        {/* Explanation Sidebar */}
        {explanation && (
          <div className="lg:w-80 flex-shrink-0 flex flex-col">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-100 dark:border-gray-800 h-full">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                How it works
              </h3>
              <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed space-y-2">
                {explanation}
              </div>
            </div>
          </div>
        )}
      </div>

      {footer && (
        <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-4">
          {footer}
        </div>
      )}
    </div>
  );
}
