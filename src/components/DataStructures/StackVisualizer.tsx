import React from 'react';
import { VisualizerContainer } from '../Visualizer/VisualizerContainer';

interface StackVisualizerProps {
  data: number[];
  highlightIndices?: number[];
  highlightType?:
    | 'compare'
    | 'swap'
    | 'sorted'
    | 'active'
    | 'insert'
    | 'delete'
    | 'search'
    | 'highlight';
  capacity?: number;
  title?: string;
  explanation?: React.ReactNode;
  children?: React.ReactNode;
}

const StackVisualizer: React.FC<StackVisualizerProps> = ({
  data,
  highlightIndices = [],
  highlightType = 'active',
  capacity,
  title,
  explanation,
  children,
}) => {
  const maxValue = Math.max(...data, 100);

  // Determine the color of a stack element based on its state.
  // Different colors represent different operations (push, pop, peek).
  const getBarColor = (index: number) => {
    if (highlightIndices.includes(index)) {
      switch (highlightType) {
        case 'insert':
          return 'bg-green-500 dark:bg-green-600';
        case 'delete':
          return 'bg-red-500 dark:bg-red-600';
        case 'search':
          return 'bg-blue-500 dark:bg-blue-600';
        case 'compare':
          return 'bg-yellow-500 dark:bg-yellow-600';
        case 'active':
          return 'bg-purple-500 dark:bg-purple-600';
        default:
          return 'bg-blue-500 dark:bg-blue-600';
      }
    }
    return 'bg-gray-700 dark:bg-gray-600';
  };

  const legend = (
    <>
      <div className="flex items-center gap-1">
        <span className="w-2.5 h-2.5 rounded-full bg-gray-700 dark:bg-gray-600"></span>
        <span className="text-gray-600 dark:text-gray-400">Normal</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
        <span className="text-gray-600 dark:text-gray-400">Push</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
        <span className="text-gray-600 dark:text-gray-400">Pop</span>
      </div>
    </>
  );

  const icon = (
    <svg
      className="w-5 h-5 text-indigo-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
      />
    </svg>
  );

  return (
    <VisualizerContainer
      title={title}
      icon={icon}
      legend={legend}
      footer={children}
      explanation={explanation}
      minHeight="300px"
    >
      <div className="flex flex-col items-center space-y-3 flex-1">
        {/* Stack Info */}
        <div className="flex gap-4 text-xs">
          <div className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <span className="font-semibold">Size:</span> {data.length}
          </div>
          {capacity && (
            <div className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <span className="font-semibold">Capacity:</span> {capacity}
            </div>
          )}
          {data.length > 0 && (
            <div className="px-2 py-1 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <span className="font-semibold">Top:</span> {data[data.length - 1]}
            </div>
          )}
        </div>

        {/* Stack Visualization - Vertical Growth from Bottom */}
        <div className="relative flex flex-col-reverse items-center gap-1.5 min-h-[300px] p-3 bg-gray-100 dark:bg-gray-800 rounded-xl border-2 border-gray-300 dark:border-gray-700">
          {/* Empty slots indicator */}
          {capacity && data.length < capacity && (
            <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] text-gray-400 dark:text-gray-500">
              {capacity - data.length} empty slots
            </div>
          )}

          {/* TOP label */}
          {data.length > 0 && (
            <div className="absolute -right-12 top-0 flex items-center gap-1">
              <div className="w-6 h-0.5 bg-blue-500" />
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400">TOP</span>
            </div>
          )}

          {/* Stack Elements */}
          {data.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-500 text-sm">
              Stack is empty
            </div>
          ) : (
            data.map((value, index) => {
              const width = (value / maxValue) * 150 + 40;
              return (
                <div key={index} className="flex items-center gap-2">
                  {/* Stack Element */}
                  <div
                    className={`
                      ${getBarColor(index)}
                      text-white font-bold rounded-lg
                      transition-all duration-300 ease-in-out
                      flex items-center justify-center
                      border-2 border-gray-800 dark:border-gray-300
                      shadow-md
                    `}
                    style={{
                      width: `${width}px`,
                      height: '40px',
                    }}
                  >
                    <span className="text-sm">{value}</span>
                  </div>

                  {/* Index label */}
                  <span className="text-[10px] text-gray-500 dark:text-gray-400 w-6">[{index}]</span>
                </div>
              );
            })
          )}

          {/* BOTTOM label */}
          {data.length > 0 && (
            <div className="absolute -right-16 bottom-0 flex items-center gap-1">
              <div className="w-8 h-0.5 bg-gray-500" />
              <span className="text-xs font-bold text-gray-600 dark:text-gray-400">BOTTOM</span>
            </div>
          )}

          {/* Base line */}
          <div className="w-full h-1 bg-gray-800 dark:bg-gray-300 rounded mt-1" />
        </div>
      </div>
    </VisualizerContainer>
  );
};

export default StackVisualizer;
