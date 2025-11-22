import { useState } from 'react';
import type { AlgorithmComplexity } from '../../types';

interface ComplexityDisplayProps {
  complexity: AlgorithmComplexity;
  timeComplexityDetails?: {
    best: string;
    average: string;
    worst: string;
  } | undefined;
  className?: string;
  title?: string;
}

const ComplexityDisplay = ({
  complexity,
  timeComplexityDetails,
  className = '',
  title = 'Complexity Analysis',
}: ComplexityDisplayProps) => {
  const [selectedComplexity, setSelectedComplexity] = useState<'best' | 'average' | 'worst'>('worst');

  // Generate SVG path for complexity curves.
  // This function creates a smooth curve representing the growth rate of different time complexities.
  // It maps the input size 'n' (x-axis) to the number of operations (y-axis).
  const generateCurvePath = (type: string, width: number, height: number) => {
    const points = 50;
    const maxN = 20;
    let path = '';

    for (let i = 0; i < points; i++) {
      const n = (i / points) * maxN;
      const x = (i / points) * width;
      let y = height;

      // Calculate y based on complexity formula
      // We scale the output to fit within the SVG height
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
    if (complexity.includes('n log n') || complexity.includes('E log V')) {return { stroke: '#f59e0b', name: 'O(n log n)' };} // orange
    if (complexity.includes('n²') || complexity.includes('n^2'))
      {return { stroke: '#ef4444', name: 'O(n²)' };} // red
    if (complexity.includes('n') || complexity.includes('V + E')) {return { stroke: '#8b5cf6', name: 'O(n)' };} // purple
    return { stroke: '#6b7280', name: complexity };
  };

  const currentComplexityValue = complexity.time[selectedComplexity];
  const currentComplexityInfo = getComplexityColor(currentComplexityValue);

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
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <div className="text-xs font-medium text-gray-600 dark:text-gray-400">
              Growth Rate Comparison
            </div>
            <div className="text-[10px] px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-gray-500">
              Lower is better
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 border border-gray-200 dark:border-gray-700 relative overflow-hidden shadow-inner flex-1 flex flex-col min-h-[250px]">
            <div className="flex-1 relative w-full">
              <svg viewBox="0 0 300 220" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={currentComplexityInfo.stroke} stopOpacity="0.2" />
                    <stop offset="100%" stopColor={currentComplexityInfo.stroke} stopOpacity="0" />
                  </linearGradient>
                </defs>

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
                
                {/* Dashed Grid */}
                {[1, 2, 3].map(i => (
                  <line
                    key={i}
                    x1="0"
                    y1={200 - i * 50}
                    x2="300"
                    y2={200 - i * 50}
                    stroke="currentColor"
                    strokeWidth="0.5"
                    strokeDasharray="4 4"
                    className="text-gray-200 dark:text-gray-700"
                  />
                ))}

                {/* Complexity curves */}
                <path
                  d={generateCurvePath('O(1)', 300, 200)}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="1.5"
                  opacity="0.3"
                />
                <path
                  d={generateCurvePath('O(log n)', 300, 200)}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="1.5"
                  opacity="0.3"
                />
                <path
                  d={generateCurvePath('O(n)', 300, 200)}
                  fill="none"
                  stroke="#8b5cf6"
                  strokeWidth="1.5"
                  opacity="0.3"
                />
                <path
                  d={generateCurvePath('O(n log n)', 300, 200)}
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="1.5"
                  opacity="0.3"
                />
                <path
                  d={generateCurvePath('O(n²)', 300, 200)}
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="1.5"
                  opacity="0.3"
                />

                {/* Highlight selected complexity */}
                <path
                  d={generateCurvePath(currentComplexityInfo.name, 300, 200) + " L 300,200 L 0,200 Z"}
                  fill="url(#chartGradient)"
                  stroke="none"
                />
                <path
                  d={generateCurvePath(currentComplexityInfo.name, 300, 200)}
                  fill="none"
                  stroke={currentComplexityInfo.stroke}
                  strokeWidth="3"
                  className="drop-shadow-md"
                  strokeLinecap="round"
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
                  x="290"
                  y="212"
                  textAnchor="end"
                  className="text-[10px] fill-current text-gray-500 dark:text-gray-400 font-medium"
                  fontSize="10"
                >
                  Elements (n)
                </text>
              </svg>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 pt-3 border-t border-gray-200 dark:border-gray-700 text-[10px] justify-center bg-gray-50 dark:bg-gray-800 z-10 relative">
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
                <span className="text-gray-600 dark:text-gray-400">O(n) / O(V+E)</span>
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
            <div className="mt-2 text-[9px] text-center text-gray-400 dark:text-gray-500 italic">
              For graphs: n ≈ V (vertices) + E (edges)
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
              <button
                onClick={() => setSelectedComplexity('best')}
                className={`flex flex-col items-center p-2 rounded-lg border transition-all duration-200 ${
                  selectedComplexity === 'best'
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-500 dark:border-green-500 ring-1 ring-green-500'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-700'
                }`}
              >
                <div className="mb-1 text-green-600 dark:text-green-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-[10px] font-medium text-gray-600 dark:text-gray-400 mb-0.5">
                  Best
                </span>
                <span className="text-sm font-bold text-green-600 dark:text-green-400 font-mono">
                  {complexity.time.best}
                </span>
              </button>

              {/* Average Case */}
              <button
                onClick={() => setSelectedComplexity('average')}
                className={`flex flex-col items-center p-2 rounded-lg border transition-all duration-200 ${
                  selectedComplexity === 'average'
                    ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500 dark:border-yellow-500 ring-1 ring-yellow-500'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-yellow-300 dark:hover:border-yellow-700'
                }`}
              >
                <div className="mb-1 text-yellow-600 dark:text-yellow-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </div>
                <span className="text-[10px] font-medium text-gray-600 dark:text-gray-400 mb-0.5">
                  Average
                </span>
                <span className="text-sm font-bold text-yellow-600 dark:text-yellow-400 font-mono">
                  {complexity.time.average}
                </span>
              </button>

              {/* Worst Case */}
              <button
                onClick={() => setSelectedComplexity('worst')}
                className={`flex flex-col items-center p-2 rounded-lg border transition-all duration-200 ${
                  selectedComplexity === 'worst'
                    ? 'bg-red-50 dark:bg-red-900/20 border-red-500 dark:border-red-500 ring-1 ring-red-500'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-700'
                }`}
              >
                <div className="mb-1 text-red-600 dark:text-red-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <span className="text-[10px] font-medium text-gray-600 dark:text-gray-400 mb-0.5">
                  Worst
                </span>
                <span className="text-sm font-bold text-red-600 dark:text-red-400 font-mono">
                  {complexity.time.worst}
                </span>
              </button>
            </div>
          </div>

          {/* Complexity Details */}
          {timeComplexityDetails && (
            <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
              <h4 className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Performance Analysis ({selectedComplexity})
              </h4>
              <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-800">
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  {timeComplexityDetails[selectedComplexity]}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplexityDisplay;
