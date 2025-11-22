import React, { useRef } from 'react';
import type { Graph } from '../../dataStructures/graphs/graph';
import { VisualizerContainer } from './VisualizerContainer';
import { useTheme } from '../../context/ThemeContext';

interface GraphVisualizerProps {
  graph: Graph;
  activeNodes?: string[];
  visitedNodes?: string[];
  pathNodes?: string[];
  comparedNodes?: string[]; // For edges being traversed
  distances?: Record<string, number>;
  title?: string;
  explanation?: React.ReactNode;
  children?: React.ReactNode;
  viewBoxWidth?: number;
  viewBoxHeight?: number;
}

export default function GraphVisualizer({
  graph,
  activeNodes = [],
  visitedNodes = [],
  pathNodes = [],
  comparedNodes = [],
  distances,
  title,
  explanation,
  children,
  viewBoxWidth = 1000,
  viewBoxHeight = 600,
}: GraphVisualizerProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const { theme } = useTheme();

  const getNodeColor = (nodeId: string) => {
    if (activeNodes.includes(nodeId)) {return theme === 'dark' ? '#10B981' : '#34D399';} // Emerald
    if (pathNodes.includes(nodeId)) {return theme === 'dark' ? '#06B6D4' : '#22D3EE';} // Cyan
    if (visitedNodes.includes(nodeId)) {return theme === 'dark' ? '#7C3AED' : '#8B5CF6';} // Purple
    if (comparedNodes.includes(nodeId)) {return theme === 'dark' ? '#F59E0B' : '#FBBF24';} // Amber
    return theme === 'dark' ? '#1F2937' : '#FFFFFF'; // Default
  };

  const getNodeStroke = (nodeId: string) => {
    if (activeNodes.includes(nodeId)) {return '#059669';}
    if (pathNodes.includes(nodeId)) {return '#0891B2';}
    if (visitedNodes.includes(nodeId)) {return '#7C3AED';}
    if (comparedNodes.includes(nodeId)) {return '#D97706';}
    return theme === 'dark' ? '#4B5563' : '#374151';
  };

  // Helper to determine edge color based on traversal state.
  // If both source and target are visited/path nodes, the edge is considered traversed.
  const getEdgeColor = (source: string, target: string) => {
    const isTraversed =
      (visitedNodes.includes(source) && visitedNodes.includes(target)) ||
      (pathNodes.includes(source) && pathNodes.includes(target));

    if (isTraversed) {return theme === 'dark' ? '#6B7280' : '#9CA3AF';} // Gray
    return theme === 'dark' ? '#374151' : '#E5E7EB'; // Light gray
  };

  const legend = (
    <>
      <div className="flex items-center gap-1">
        <span className="w-2.5 h-2.5 rounded-full bg-white border border-gray-600" />
        <span className="text-gray-600 dark:text-gray-400">Unvisited</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border border-emerald-600" />
        <span className="text-gray-600 dark:text-gray-400">Active</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="w-2.5 h-2.5 rounded-full bg-purple-400 border border-purple-600" />
        <span className="text-gray-600 dark:text-gray-400">Visited</span>
      </div>
    </>
  );

  const icon = (
    <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  );

  return (
    <VisualizerContainer
      title={title}
      icon={icon}
      legend={legend}
      explanation={explanation}
      footer={children}
      minHeight="300px"
    >
      <div className="flex-1 w-full h-[40vh] min-h-[300px] bg-gray-50 dark:bg-gray-800/30 rounded-xl border border-gray-100 dark:border-gray-800 relative overflow-hidden">
        {/* SVG uses a dynamic viewBox to scale the graph content to fit the container.
            preserveAspectRatio ensures the graph doesn't get distorted. */}
        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0"
        >
          {/* Edges */}
          {Array.from(graph.adjacencyList.entries()).map(([sourceId, edges]) =>
            edges.map((edge, idx) => {
              const sourceNode = graph.nodes.get(sourceId);
              const targetNode = graph.nodes.get(edge.target);
              if (!sourceNode || !targetNode) {return null;}

              // Avoid drawing duplicate edges for undirected graphs
              if (!graph.isDirected && sourceId > edge.target) {return null;}

              const midX = (sourceNode.x + targetNode.x) / 2;
              const midY = (sourceNode.y + targetNode.y) / 2;

              return (
                <g key={`${sourceId}-${edge.target}-${idx}`}>
                  <line
                    x1={sourceNode.x}
                    y1={sourceNode.y}
                    x2={targetNode.x}
                    y2={targetNode.y}
                    stroke={getEdgeColor(sourceId, edge.target)}
                    strokeWidth={3}
                  />
                  {edge.weight !== undefined && (
                    <g>
                      <rect
                        x={midX - 10}
                        y={midY - 10}
                        width={20}
                        height={20}
                        fill={theme === 'dark' ? '#1F2937' : '#FFFFFF'}
                        rx={4}
                      />
                      <text
                        x={midX}
                        y={midY}
                        dy="4"
                        textAnchor="middle"
                        fill={theme === 'dark' ? '#9CA3AF' : '#4B5563'}
                        className="text-xs font-bold"
                      >
                        {edge.weight}
                      </text>
                    </g>
                  )}
                </g>
              );
            }),
          )}

          {/* Nodes */}
          {Array.from(graph.nodes.values()).map((node) => (
            <g key={node.id} transform={`translate(${node.x},${node.y})`}>
              <circle
                r={24}
                fill={getNodeColor(node.id)}
                stroke={getNodeStroke(node.id)}
                strokeWidth={3}
                className="transition-colors duration-300 shadow-lg"
              />
              <text
                dy=".3em"
                textAnchor="middle"
                fill={theme === 'dark' && !activeNodes.includes(node.id) ? 'white' : 'black'}
                className="text-sm font-bold pointer-events-none select-none"
              >
                {node.value}
              </text>
              {distances && distances[node.id] !== undefined && (
                <g transform="translate(0, -32)">
                  <rect
                    x="-16"
                    y="-12"
                    width="32"
                    height="16"
                    rx="4"
                    fill={theme === 'dark' ? '#374151' : '#E5E7EB'}
                    opacity="0.9"
                  />
                  <text
                    dy="0"
                    textAnchor="middle"
                    fill={theme === 'dark' ? '#E5E7EB' : '#1F2937'}
                    className="text-[10px] font-bold"
                  >
                    {distances[node.id] === Infinity ? '∞' : distances[node.id]}
                  </text>
                </g>
              )}
            </g>
          ))}
        </svg>
      </div>
    </VisualizerContainer>
  );
}
