import { VisualizerContainer } from './VisualizerContainer';

interface ArrayVisualizerProps {
  data: number[];
  states?: Record<number, 'compare' | 'swap' | 'sorted' | 'active' | 'minimum'>;
  highlightIndices?: number[];
  highlightType?:
    | 'compare'
    | 'swap'
    | 'sorted'
    | 'active'
    | 'insert'
    | 'delete'
    | 'search'
    | 'highlight'
    | 'minimum';
  description?: string;
  explanation?: React.ReactNode;
  title?: string;
  children?: React.ReactNode;
}

const ArrayVisualizer = ({
  data,
  states = {},
  highlightIndices = [],
  highlightType = 'active',
  description,
  explanation,
  title,
  children,
}: ArrayVisualizerProps) => {
  const maxValue = Math.max(...data, 1);

  const getStateForIndex = (
    index: number,
  ): 'default' | 'compare' | 'swap' | 'sorted' | 'active' | 'minimum' => {
    if (states[index]) {
      return states[index];
    }
    if (highlightIndices.includes(index)) {
      if (highlightType === 'insert') {
        return 'sorted';
      }
      if (highlightType === 'delete') {
        return 'swap';
      }
      if (highlightType === 'search') {
        return 'active';
      }
      if (highlightType === 'minimum') {
        return 'minimum';
      }
      if (highlightType === 'compare') {
        return 'compare';
      }
      return 'active';
    }
    return 'default';
  };

  const legend = (
    <>
      <div className="flex items-center gap-1">
        <span className="w-2.5 h-2.5 rounded-full bg-blue-500 dark:bg-blue-600 border border-blue-600 dark:border-blue-400"></span>
        <span className="text-gray-600 dark:text-gray-400">Default</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 border border-yellow-600"></span>
        <span className="text-gray-600 dark:text-gray-400">Compare</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500 border border-red-600"></span>
        <span className="text-gray-600 dark:text-gray-400">Swap</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="w-2.5 h-2.5 rounded-full bg-green-500 border border-green-600"></span>
        <span className="text-gray-600 dark:text-gray-400">Sorted</span>
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
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
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
      <div className="flex-1 flex flex-col w-full">
        {!data || data.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50 dark:bg-gray-800/30 min-h-[200px]">
            <svg
              className="w-12 h-12 mb-3 opacity-50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
              />
            </svg>
            <p className="text-base font-medium">No Data to Visualize</p>
            <p className="text-xs mt-1">Generate data using the controls above</p>
          </div>
        ) : (
          <div className="flex items-end justify-center gap-0.5 p-2 bg-gray-50 dark:bg-gray-800/30 rounded-xl border border-gray-100 dark:border-gray-800 relative overflow-hidden h-64">
            {data.map((value, idx) => {
              const state = getStateForIndex(idx);
              const height = Math.max((value / maxValue) * 100, 5); // Min height 5%

              let colorClass = 'bg-blue-500 dark:bg-blue-600 border-blue-600 dark:border-blue-400'; // Default
              if (state === 'compare') {
                colorClass = 'bg-yellow-500 border-yellow-600';
              }
              if (state === 'swap') {
                colorClass = 'bg-red-500 border-red-600';
              }
              if (state === 'sorted') {
                colorClass = 'bg-green-500 border-green-600';
              }
              if (state === 'active') {
                colorClass = 'bg-purple-500 border-purple-600';
              }
              if (state === 'minimum') {
                colorClass = 'bg-pink-500 border-pink-600';
              }

              return (
                <div
                  key={idx}
                  className={`flex-1 rounded-t-sm transition-all duration-200 ease-in-out relative group border-t border-x ${colorClass}`}
                  style={{ height: `${height}%` }}
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-[10px] px-1.5 py-0.5 rounded pointer-events-none z-10 whitespace-nowrap">
                    Val: {value} | Idx: {idx}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg">
          <p className="text-center text-sm text-blue-800 dark:text-blue-200 font-medium min-h-[1.25rem]">
            {description}
          </p>
        </div>
      </div>
    </VisualizerContainer>
  );
};

export default ArrayVisualizer;
