import React from 'react';
import type { DataStructureNode } from '../../types';
import { VisualizerContainer } from '../Visualizer/VisualizerContainer';

interface LinkedListVisualizerProps {
  nodes: Map<string, DataStructureNode>;
  head: string | null;
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
  title?: string;
  explanation?: React.ReactNode;
  children?: React.ReactNode;
}

const LinkedListVisualizer: React.FC<LinkedListVisualizerProps> = ({
  nodes,
  head,
  highlightIndices = [],
  highlightType = 'active',
  title,
  explanation,
  children,
}) => {
  // Determine the color of a node based on its state.
  // This provides visual feedback for operations like insertion, deletion, and traversal.
  const getNodeColor = (index: number) => {
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
    return 'bg-indigo-600 dark:bg-indigo-700 border-indigo-800';
  };

  // Convert linked list to array for visualization.
  // Since React renders lists, we need to traverse the linked list structure
  // and create a linear array of nodes to map over in the JSX.
  const listArray: { node: DataStructureNode; position: number }[] = [];
  let current = head;
  let position = 0;

  while (current) {
    const node = nodes.get(current);
    if (!node) {break;}
    listArray.push({ node, position });
    current = node.next || null;
    position++;
  }

  const legend = (
    <>
      <div className="flex items-center gap-1">
        <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
        <span className="text-gray-600 dark:text-gray-400">Normal</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
        <span className="text-gray-600 dark:text-gray-400">Insert</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
        <span className="text-gray-600 dark:text-gray-400">Delete</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
        <span className="text-gray-600 dark:text-gray-400">Search</span>
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
        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
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
        {/* List Info */}
        <div className="flex gap-4 text-xs">
          <div className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <span className="font-semibold">Size:</span> {nodes.size}
          </div>
          {head && (
            <div className="px-2 py-1 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <span className="font-semibold">Head:</span> {nodes.get(head)?.value}
            </div>
          )}
          {listArray.length > 0 && (
            <div className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <span className="font-semibold">Tail:</span>{' '}
              {listArray[listArray.length - 1].node.value}
            </div>
          )}
        </div>

        {/* Linked List Visualization - Horizontal with Arrows */}
        <div className="w-full max-w-full overflow-x-auto p-4 bg-gray-100 dark:bg-gray-800 rounded-xl border-2 border-gray-300 dark:border-gray-700">
          {listArray.length === 0 ? (
            <div className="flex items-center justify-center h-20 text-gray-400 dark:text-gray-500 text-sm">
              Linked list is empty
            </div>
          ) : (
            <div className="flex items-center gap-1 min-w-max pt-6">
              {listArray.map(({ node, position }, idx) => (
                <React.Fragment key={node.id}>
                  {/* Node */}
                  <div className="flex flex-col items-center gap-1 relative">
                    {/* HEAD label */}
                    {idx === 0 && (
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold text-green-600 dark:text-green-400 flex flex-col items-center z-10">
                        <span>HEAD</span>
                        <div className="w-0.5 h-3 bg-green-500" />
                      </div>
                    )}

                    {/* TAIL label */}
                    {idx === listArray.length - 1 && (
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold text-orange-600 dark:text-orange-400 flex flex-col items-center z-10">
                        <span>TAIL</span>
                        <div className="w-0.5 h-3 bg-orange-500" />
                      </div>
                    )}

                    {/* Node Box */}
                    <div
                      className={`
                        ${getNodeColor(position)}
                        text-white font-bold rounded-lg
                        transition-all duration-300 ease-in-out
                        flex flex-col items-center justify-center
                        border-2
                        shadow-md
                        p-2
                      `}
                      style={{
                        width: '60px',
                        minHeight: '60px',
                      }}
                    >
                      <div className="text-lg">{node.value}</div>
                      <div className="text-[10px] opacity-75 mt-0.5">{node.next ? '->' : 'null'}</div>
                    </div>

                    {/* Position label */}
                    <span className="text-[10px] text-gray-500 dark:text-gray-400">[{position}]</span>
                  </div>

                  {/* Arrow to next node */}
                  {idx < listArray.length - 1 && (
                    <div className="flex items-center px-1 -mb-4">
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <div className="w-6 h-0.5 bg-gray-600 dark:bg-gray-400" />
                        <div className="w-0 h-0 border-t-3 border-b-3 border-l-6 border-transparent border-l-gray-600 dark:border-l-gray-400" />
                      </div>
                    </div>
                  )}

                  {/* Null pointer at end */}
                  {idx === listArray.length - 1 && (
                    <div className="flex items-center px-1 -mb-4">
                      <div className="flex items-center text-gray-400 dark:text-gray-500">
                        <div className="w-6 h-0.5 bg-gray-400 dark:bg-gray-500" />
                        <div className="text-[10px] font-mono">NULL</div>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </div>
    </VisualizerContainer>
  );
};

export default LinkedListVisualizer;
