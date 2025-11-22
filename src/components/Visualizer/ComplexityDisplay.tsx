import type { AlgorithmComplexity } from '../../types';

interface ComplexityDisplayProps {
  complexity: AlgorithmComplexity;
  operationsCount?: { comparisons: number; swaps: number; arrayAccesses: number };
  arraySize?: number;
  currentStep?: number;
  totalSteps?: number;
  elapsedTime?: number;
  isPlaying?: boolean;
  className?: string;
  title?: string;
}

const ComplexityDisplay = ({
  complexity,
  operationsCount = { comparisons: 0, swaps: 0, arrayAccesses: 0 },
  arraySize = 0,
  totalSteps = 0,
  className = '',
  title = 'Time Complexity',
}: ComplexityDisplayProps) => {
  // Generate SVG path for complexity curves
  const generateCurvePath = (type: string, width: number, height: number) => {
    const points = 50;
    const maxN = 20;
    let path = '';

    for (let i = 0; i < points; i++) {
      const n = (i / points) * maxN;
      const x = (i / points) * width;
      let y = height;

      switch (type) {
        case 'O(1)':
          y = height - height * 0.2;
          break;
        case 'O(log n)':
          y = height - (Math.log2(n + 1) / Math.log2(maxN + 1)) * height * 0.6;
          break;
        case 'O(n)':
          y = height - (n / maxN) * height * 0.7;
          break;
        case 'O(n log n)':
          y = height - ((n * Math.log2(n + 1)) / (maxN * Math.log2(maxN + 1))) * height * 0.85;
          break;
        case 'O(n²)':
          y = height - ((n * n) / (maxN * maxN)) * height * 0.95;
          break;
        default:
          y = height - (n / maxN) * height * 0.7;
      }

      path += `${i === 0 ? 'M' : 'L'} ${x},${y} `;
    }

    return path;
  };

  const getComplexityColor = (complexity: string) => {
    if (complexity.includes('1')) {return { stroke: '#10b981', name: 'O(1)' };} // green
    if (complexity.includes('log n')) {return { stroke: '#3b82f6', name: 'O(log n)' };} // blue
    if (complexity.includes('n log n')) {return { stroke: '#f59e0b', name: 'O(n log n)' };} // orange
    if (complexity.includes('n²') || complexity.includes('n^2'))
      {return { stroke: '#ef4444', name: 'O(n²)' };} // red
    if (complexity.includes('n')) {return { stroke: '#8b5cf6', name: 'O(n)' };} // purple
    return { stroke: '#6b7280', name: complexity };
  };

  const worstCase = getComplexityColor(complexity.time.worst);

  return (
    <div
      className={`bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <svg
            className="w-5 h-5 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          {title}
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Column: Chart */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <div className="text-xs font-medium text-gray-600 dark:text-gray-400">
              Growth Rate Comparison
            </div>
            <div className="text-[10px] px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-gray-500">
              Lower is better
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 border border-gray-200 dark:border-gray-700 relative overflow-hidden">
            <svg viewBox="0 0 300 200" className="w-full" style={{ maxHeight: '160px' }}>
              {/* Grid lines */}
              <line
                x1="0"
                y1="200"
                x2="300"
                y2="200"
                stroke="currentColor"
                strokeWidth="1"
                className="text-gray-300 dark:text-gray-600"
              />
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="200"
                stroke="currentColor"
                strokeWidth="1"
                className="text-gray-300 dark:text-gray-600"
              />

              {/* Complexity curves */}
              <path
                d={generateCurvePath('O(1)', 300, 200)}
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
                opacity="0.2"
              />
              <path
                d={generateCurvePath('O(log n)', 300, 200)}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2"
                opacity="0.2"
              />
              <path
                d={generateCurvePath('O(n)', 300, 200)}
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="2"
                opacity="0.2"
              />
              <path
                d={generateCurvePath('O(n log n)', 300, 200)}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2"
                opacity="0.2"
              />
              <path
                d={generateCurvePath('O(n²)', 300, 200)}
                fill="none"
                stroke="#ef4444"
                strokeWidth="2"
                opacity="0.2"
              />

              {/* Highlight current algorithm's worst case */}
              <path
                d={generateCurvePath(worstCase.name, 300, 200)}
                fill="none"
                stroke={worstCase.stroke}
                strokeWidth="4"
                className="drop-shadow-md"
              />

              {/* Labels */}
              <text
                x="10"
                y="20"
                className="text-[10px] fill-current text-gray-500 dark:text-gray-400 font-medium"
                fontSize="10"
              >
                Operations
              </text>
              <text
                x="250"
                y="190"
                className="text-[10px] fill-current text-gray-500 dark:text-gray-400 font-medium"
                fontSize="10"
              >
                Elements (n)
              </text>
            </svg>

            {/* Legend */}
            <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-[10px] justify-center">
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span className="text-gray-600 dark:text-gray-400">O(1)</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span className="text-gray-600 dark:text-gray-400">O(log n)</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                <span className="text-gray-600 dark:text-gray-400">O(n)</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                <span className="text-gray-600 dark:text-gray-400">O(n log n)</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                <span className="text-gray-600 dark:text-gray-400">O(n²)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Details */}
        <div className="space-y-4">
          {/* Time Complexity Cards */}
          <div>
            <h4 className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
              Time Complexity
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {/* Best Case */}
              <div className="flex flex-col items-center p-2 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-100 dark:border-green-800/30 transition hover:scale-105">
                <span className="text-[10px] font-medium text-green-600 dark:text-green-400 mb-0.5">
                  Best
                </span>
                <span className="text-sm font-bold text-green-700 dark:text-green-300 font-mono">
                  {complexity.time.best}
                </span>
              </div>
              {/* Average Case */}
              <div className="flex flex-col items-center p-2 bg-yellow-50 dark:bg-yellow-900/10 rounded-lg border border-yellow-100 dark:border-yellow-800/30 transition hover:scale-105">
                <span className="text-[10px] font-medium text-yellow-600 dark:text-yellow-400 mb-0.5">
                  Average
                </span>
                <span className="text-sm font-bold text-yellow-700 dark:text-yellow-300 font-mono">
                  {complexity.time.average}
                </span>
              </div>
              {/* Worst Case */}
              <div className="flex flex-col items-center p-2 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-100 dark:border-red-800/30 transition hover:scale-105">
                <span className="text-[10px] font-medium text-red-600 dark:text-red-400 mb-0.5">
                  Worst
                </span>
                <span className="text-sm font-bold text-red-700 dark:text-red-300 font-mono">
                  {complexity.time.worst}
                </span>
              </div>
            </div>
          </div>

          {/* Space Complexity */}
          <div>
            <h4 className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
              Space Complexity
            </h4>
            <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-100 dark:border-blue-800/30">
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-blue-500"
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
                <span className="text-xs text-blue-700 dark:text-blue-300 font-medium">
                  Memory Usage
                </span>
              </div>
              <span className="text-base font-bold text-blue-700 dark:text-blue-300 font-mono">
                {complexity.space}
              </span>
            </div>
          </div>

          {/* Live Stats */}
          {arraySize > 0 && totalSteps > 0 && (
            <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
              <h4 className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                Live Statistics
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                  <div className="text-[10px] text-gray-500 dark:text-gray-400 mb-0.5">Comparisons</div>
                  <div className="text-base font-mono font-semibold text-gray-900 dark:text-white">
                    {operationsCount.comparisons}
                  </div>
                </div>
                <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                  <div className="text-[10px] text-gray-500 dark:text-gray-400 mb-0.5">Swaps</div>
                  <div className="text-base font-mono font-semibold text-gray-900 dark:text-white">
                    {operationsCount.swaps}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplexityDisplay;
