import React from 'react';
import { VisualizerContainer } from '../Visualizer/VisualizerContainer';

interface QueueVisualizerProps {
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

const QueueVisualizer: React.FC<QueueVisualizerProps> = ({
  data,
  highlightIndices = [],
  highlightType = 'active',
  capacity,
  title,
  explanation,
  children,
}) => {
  const maxValue = Math.max(...data, 100);

  const getBoxColor = (index: number) => {
    if (highlightIndices.includes(index)) {
      switch (highlightType) {
        case 'insert':
          return 'bg-green-500 dark:bg-green-600 border-green-700';
        case 'delete':
          return 'bg-red-500 dark:bg-red-600 border-red-700';
        case 'search':
          return 'bg-blue-500 dark:bg-blue-600 border-blue-700';
        case 'compare':
          return 'bg-yellow-500 dark:bg-yellow-600 border-yellow-700';
        case 'active':
          return 'bg-purple-500 dark:bg-purple-600 border-purple-700';
        default:
          return 'bg-blue-500 dark:bg-blue-600 border-blue-700';
      }
    }
    return 'bg-teal-600 dark:bg-teal-700 border-teal-800';
  };

  const legend = (
    <>
      <div className="flex items-center gap-1">
        <span className="w-2.5 h-2.5 rounded-full bg-teal-600"></span>
        <span className="text-gray-600 dark:text-gray-400">Normal</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
        <span className="text-gray-600 dark:text-gray-400">Enqueue</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
        <span className="text-gray-600 dark:text-gray-400">Dequeue</span>
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
        d="M13 5l7 7-7 7M5 5l7 7-7 7"
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
      <div className="flex flex-col items-center space-y-4 flex-1">
        {/* Queue Info */}
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
            <>
              <div className="px-2 py-1 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <span className="font-semibold">Front:</span> {data[0]}
              </div>
              <div className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <span className="font-semibold">Rear:</span> {data[data.length - 1]}
              </div>
            </>
          )}
        </div>

        {/* Queue Visualization - Horizontal Flow from Left to Right */}
        <div className="relative flex flex-col items-center gap-3 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl border-2 border-gray-300 dark:border-gray-700 min-w-[400px]">
          {/* FRONT and REAR labels */}
          {data.length > 0 && (
            <>
              <div className="absolute -top-6 left-4 text-xs font-bold text-green-600 dark:text-green-400 flex flex-col items-center">
                <span>FRONT</span>
                <div className="w-0.5 h-3 bg-green-500" />
              </div>
              <div className="absolute -top-6 right-4 text-xs font-bold text-orange-600 dark:text-orange-400 flex flex-col items-center">
                <span>REAR</span>
                <div className="w-0.5 h-3 bg-orange-500" />
              </div>
            </>
          )}

          {/* Dequeue direction arrow */}
          {data.length > 0 && (
            <div className="absolute -left-16 top-1/2 -translate-y-1/2 flex items-center gap-1 text-red-600 dark:text-red-400">
              <span className="text-[10px] font-semibold">Dequeue</span>
              <div className="flex items-center">
                <div className="w-8 h-0.5 bg-red-500" />
                <div className="w-0 h-0 border-t-3 border-b-3 border-l-6 border-transparent border-l-red-500" />
              </div>
            </div>
          )}

          {/* Enqueue direction arrow */}
          {data.length > 0 && (
            <div className="absolute -right-16 top-1/2 -translate-y-1/2 flex items-center gap-1 text-green-600 dark:text-green-400">
              <div className="flex items-center">
                <div className="w-0 h-0 border-t-3 border-b-3 border-r-6 border-transparent border-r-green-500" />
                <div className="w-8 h-0.5 bg-green-500" />
              </div>
              <span className="text-[10px] font-semibold">Enqueue</span>
            </div>
          )}

          {/* Queue Elements */}
          {data.length === 0 ? (
            <div className="flex items-center justify-center h-16 text-gray-400 dark:text-gray-500 text-sm">
              Queue is empty
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              {data.map((value, index) => {
                const height = (value / maxValue) * 40 + 30;
                return (
                  <div key={index} className="flex flex-col items-center gap-1">
                    {/* Queue Box */}
                    <div
                      className={`
                        ${getBoxColor(index)}
                        text-white font-bold rounded-lg
                        transition-all duration-300 ease-in-out
                        flex items-center justify-center
                        border-2
                        shadow-md
                      `}
                      style={{
                        width: '50px',
                        height: `${height}px`,
                        minHeight: '40px',
                      }}
                    >
                      <span className="text-sm">{value}</span>
                    </div>

                    {/* Index label */}
                    <span className="text-[10px] text-gray-500 dark:text-gray-400">[{index}]</span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Empty slots indicator */}
          {capacity && data.length < capacity && (
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-gray-400 dark:text-gray-500">
              {capacity - data.length} empty slots available
            </div>
          )}
        </div>
      </div>
    </VisualizerContainer>
  );
};

export default QueueVisualizer;
