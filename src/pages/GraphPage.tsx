import { useState, useEffect, useCallback, useRef } from 'react';
import ControlPanel from '../components/Controls/ControlPanel';
import CodePanel from '../components/CodePanel/CodePanel';
import ComplexityDisplay from '../components/Visualizer/ComplexityDisplay';
import GraphVisualizer from '../components/Visualizer/GraphVisualizer';
import { Graph } from '../dataStructures/graphs/graph';
import { bfs, bfsInfo } from '../algorithms/graphs/bfs';
import { dfs, dfsInfo } from '../algorithms/graphs/dfs';
import { generateDijkstraSteps } from '../algorithms/graphs/dijkstra';
import type { AnimationStep, AnimationSpeed } from '../types';

const ALGORITHMS = {
  bfs: { name: 'Breadth-First Search', info: bfsInfo, run: bfs },
  dfs: { name: 'Depth-First Search', info: dfsInfo, run: dfs },
  dijkstra: {
    name: 'Dijkstra\'s Algorithm',
    info: {
      name: 'Dijkstra\'s Algorithm',
      category: 'graph',
      complexity: {
        time: { best: 'O(E log V)', average: 'O(E log V)', worst: 'O(E log V)' },
        space: 'O(V + E)',
      },
      timeComplexityDetails: {
        best: 'With a priority queue, we process each edge once. Heap operations take logarithmic time.',
        average: 'Typical performance on random graphs. E edges are processed, each taking O(log V) time.',
        worst: 'In a dense graph, we process all edges. Each edge relaxation involves a priority queue update taking O(log V).',
      },
      description: 'Finds the shortest path from a source node to all other nodes in a weighted graph.',
    },
    run: generateDijkstraSteps,
  },
};

const GRAPH_WIDTH = 800;
const GRAPH_HEIGHT = 400;

export default function GraphPage() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<keyof typeof ALGORITHMS>('bfs');
  const [graph, setGraph] = useState<Graph>(() => {
    // Initialize with empty graph, will be populated by generateRandomGraph
    return new Graph();
  });

  // Animation State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const [speed, setSpeed] = useState<AnimationSpeed>(1);
  const [description, setDescription] = useState<string>('Ready to start');

  // Visual State
  const [activeNodes, setActiveNodes] = useState<string[]>([]);
  const [visitedNodes, setVisitedNodes] = useState<string[]>([]);
  const [pathNodes, setPathNodes] = useState<string[]>([]);
  const [comparedNodes, setComparedNodes] = useState<string[]>([]);
  const [distances, setDistances] = useState<Record<string, number>>({});

  const stepsRef = useRef<AnimationStep[]>([]);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetVisuals = () => {
    setActiveNodes([]);
    setVisitedNodes([]);
    setPathNodes([]);
    setComparedNodes([]);
    setDistances({});
  };

  const handleReset = useCallback(() => {
    setIsPlaying(false);
    setCurrentStep(0);
    resetVisuals();
    setDescription('Ready to start');
    if (timeoutRef.current) {clearTimeout(timeoutRef.current);}
  }, []);

  // Initialize graph
  const generateRandomGraph = useCallback(() => {
    const isWeighted = selectedAlgorithm === 'dijkstra';
    const newGraph = new Graph(false, isWeighted); // Undirected
    const width = GRAPH_WIDTH;
    const height = GRAPH_HEIGHT;
    const nodeCount = 16; // 4x4 Grid

    // Grid Layout
    const cols = 4;
    const rows = 4;

    // Calculate spacing to use full width/height with margins
    const marginX = 40;
    const marginY = 40;
    const availableWidth = width - (2 * marginX);
    const availableHeight = height - (2 * marginY);
    const stepX = availableWidth / (cols - 1);
    const stepY = availableHeight / (rows - 1);

    for (let i = 0; i < nodeCount; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = marginX + (col * stepX);
      const y = marginY + (row * stepY);

      newGraph.addNode(i.toString(), i.toString(), x, y);
    }

    // Add edges (Grid-like connections + some randomness)
    const nodes = Array.from(newGraph.nodes.keys());
    for (let i = 0; i < nodes.length; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const isWeighted = selectedAlgorithm === 'dijkstra';

      // Connect to right neighbor
      if (col < cols - 1) {
        const rightNodeIndex = i + 1;
        const weight = isWeighted ? Math.floor(Math.random() * 10) + 1 : undefined;
        newGraph.addEdge(nodes[i], nodes[rightNodeIndex], weight);
      }

      // Connect to bottom neighbor
      if (row < rows - 1) {
        const bottomNodeIndex = i + cols;
        const weight = isWeighted ? Math.floor(Math.random() * 10) + 1 : undefined;
        newGraph.addEdge(nodes[i], nodes[bottomNodeIndex], weight);
      }

      // Add random diagonal or long-distance connections (less frequent)
      if (Math.random() > 0.85) { // Reduced frequency for cleaner look
        const targetIndex = Math.floor(Math.random() * nodes.length);
        if (targetIndex !== i) {
           const weight = isWeighted ? Math.floor(Math.random() * 10) + 1 : undefined;
           newGraph.addEdge(nodes[i], nodes[targetIndex], weight);
        }
      }
    }

    setGraph(newGraph);
    handleReset();
  }, [selectedAlgorithm, handleReset]);

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      generateRandomGraph();
    }
  }, [generateRandomGraph]);

  // Generate steps when graph or algorithm changes
  useEffect(() => {
    if (graph.nodes.size === 0 || isInitialMount.current) {return;}

    const generator = ALGORITHMS[selectedAlgorithm].run(graph, '0');
    const steps: AnimationStep[] = [];
    for (const step of generator) {
      steps.push(step);
    }
    stepsRef.current = steps;
    setTotalSteps(steps.length);
    handleReset();
  }, [graph, selectedAlgorithm, handleReset]);

  const applyStep = (step: AnimationStep) => {
    setDescription(step.description);

    if (step.auxiliaryData && 'distances' in step.auxiliaryData) {
      const distances = step.auxiliaryData['distances'] as Record<string, number>;
      setDistances(distances);
    }

    if (step.nodeIds) {
      if (step.type === 'active') {
        setActiveNodes(step.nodeIds);
      } else if (step.type === 'visited') {
        setVisitedNodes((prev) => [...new Set([...prev, ...(step.nodeIds ?? [])])]);
        setActiveNodes([]);
      } else if (step.type === 'compare') {
        setComparedNodes(step.nodeIds);
      } else if (step.type === 'sorted') {
        setVisitedNodes((prev) => [...new Set([...prev, ...(step.nodeIds ?? [])])]);
        setActiveNodes([]);
        setComparedNodes([]);
      } else if (step.type === 'highlight') {
        setActiveNodes(step.nodeIds);
      } else if (step.type === 'update-distances') {
        setActiveNodes(step.nodeIds);
      } else if (step.type === 'path') {
        setPathNodes(step.nodeIds);
      }
    }
  };

  const handleStepForward = () => {
    if (currentStep < totalSteps) {
      applyStep(stepsRef.current[currentStep]);
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleStepBackward = () => {
    if (currentStep > 0) {
      const newStep = currentStep - 1;
      setCurrentStep(newStep);

      // Replay from beginning to restore state
      resetVisuals();
      for (let i = 0; i < newStep; i++) {
        applyStep(stepsRef.current[i]);
      }
    }
  };

  const handlePlayPause = () => {
    if (currentStep >= totalSteps) {
      handleReset();
    }
    setIsPlaying(!isPlaying);
  };

  // Animation Loop
  useEffect(() => {
    if (!isPlaying || currentStep >= totalSteps) {
      setIsPlaying(false);
      return;
    }

    const delay = 1000 / speed;
    timeoutRef.current = setTimeout(() => {
      applyStep(stepsRef.current[currentStep]);
      setCurrentStep((prev) => prev + 1);
    }, delay);

    return () => {
      if (timeoutRef.current) {clearTimeout(timeoutRef.current);}
    };
  }, [isPlaying, currentStep, totalSteps, speed]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Graph Algorithms</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Visualize graph traversal algorithms like BFS and DFS
        </p>
      </div>

      {/* Top Grid: Algorithm Selector & Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left: Algorithm Selector & Info */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              Select Algorithm
            </h2>
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {(Object.keys(ALGORITHMS) as (keyof typeof ALGORITHMS)[]).map((algo) => (
              <button
                key={algo}
                onClick={() => {
                  setSelectedAlgorithm(algo);
                  handleReset();
                }}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all shadow-sm ${
                  selectedAlgorithm === algo
                    ? 'bg-blue-600 text-white shadow-blue-200 dark:shadow-none ring-2 ring-blue-600 ring-offset-2 ring-offset-white dark:ring-offset-gray-900'
                    : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                }`}
              >
                {ALGORITHMS[algo].name}
              </button>
            ))}
          </div>

          <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
              {ALGORITHMS[selectedAlgorithm].name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              {ALGORITHMS[selectedAlgorithm].info.description}
            </p>

            <div className="grid grid-cols-1 gap-3 text-xs">
              <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
                <span className="font-semibold block mb-1 text-gray-500 dark:text-gray-400">Time Complexity (Average)</span>
                <div className="font-mono font-medium text-gray-900 dark:text-gray-200">
                  {ALGORITHMS[selectedAlgorithm].info.complexity.time.average}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Graph Controls */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5" />
                    </svg>
                    Graph Controls
                </h2>
            </div>
            <div className="space-y-4">
                <button
                    onClick={generateRandomGraph}
                    className="w-full px-3 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Generate New Random Graph
                </button>

                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3 border border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-2 mb-2">
                        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Info</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                        Graph generation creates a random set of nodes and edges.
                        {' '}Weighted graphs are used for Dijkstra's algorithm.
                    </p>
                </div>
            </div>
        </div>
      </div>

      {/* Main Content Stack */}
      <div className="space-y-4">
        <GraphVisualizer
            graph={graph}
            activeNodes={activeNodes}
            visitedNodes={visitedNodes}
            pathNodes={pathNodes}
            comparedNodes={comparedNodes}
            distances={distances}
            title={ALGORITHMS[selectedAlgorithm].name}
            viewBoxWidth={GRAPH_WIDTH}
            viewBoxHeight={GRAPH_HEIGHT}
            explanation={
                <div className="space-y-2">
                    <p>{description}</p>
                </div>
            }
        >
            <ControlPanel
                isPlaying={isPlaying}
                currentStep={currentStep}
                totalSteps={totalSteps}
                speed={speed}
                onPlayPause={handlePlayPause}
                onStepForward={handleStepForward}
                onStepBackward={handleStepBackward}
                onSpeedChange={setSpeed}
                onReset={handleReset}
                variant="minimal"
            />
        </GraphVisualizer>

        <ComplexityDisplay
            complexity={ALGORITHMS[selectedAlgorithm].info.complexity}
            timeComplexityDetails={ALGORITHMS[selectedAlgorithm].info.timeComplexityDetails}
            title="Complexity Analysis"
        />

        <CodePanel
            code={
            selectedAlgorithm === 'bfs'
                ? `function bfs(graph, start) {
  const queue = [start];
  const visited = new Set([start]);

  while (queue.length > 0) {
    const node = queue.shift();
    process(node);

    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}`
                : selectedAlgorithm === 'dfs'
                ? `function dfs(graph, start) {
  const stack = [start];
  const visited = new Set();

  while (stack.length > 0) {
    const node = stack.pop();
    
    if (!visited.has(node)) {
      visited.add(node);
      process(node);

      for (const neighbor of graph[node]) {
        if (!visited.has(neighbor)) {
          stack.push(neighbor);
        }
      }
    }
  }
}`
                : `function dijkstra(graph, start) {
  const distances = {};
  const pq = new PriorityQueue();
  
  // Initialize
  for (let node in graph) {
    distances[node] = Infinity;
  }
  distances[start] = 0;
  pq.enqueue(start, 0);

  while (!pq.isEmpty()) {
    const { node, dist } = pq.dequeue();
    
    if (dist > distances[node]) continue;

    for (let neighbor in graph[node]) {
      const weight = graph[node][neighbor];
      const newDist = dist + weight;
      
      if (newDist < distances[neighbor]) {
        distances[neighbor] = newDist;
        pq.enqueue(neighbor, newDist);
      }
    }
  }
  return distances;
}`
            }
            language="javascript"
            title={`${ALGORITHMS[selectedAlgorithm].name} Implementation`}
        />
      </div>
    </div>
  );
}
