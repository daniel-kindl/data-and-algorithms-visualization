export interface AnimationStep {
  type:
    | 'compare'
    | 'swap'
    | 'sorted'
    | 'active'
    | 'visited'
    | 'path'
    | 'minimum'
    | 'insert'
    | 'delete'
    | 'search'
    | 'highlight'
    | 'update-distances';
  indices: number[];
  nodeIds?: string[];
  highlightedLines?: { from: string; to: string }[];
  auxiliaryData?: any;
  description: string;
}

export interface AlgorithmComplexity {
  time: {
    best: string;
    average: string;
    worst: string;
  };
  space: string;
}

export interface AlgorithmInfo {
  name: string;
  category: 'sorting' | 'searching' | 'graph' | 'tree' | 'dp' | 'data-structure';
  complexity: AlgorithmComplexity;
  description: string;
  timeComplexityDetails?: {
    best: string;
    average: string;
    worst: string;
  };
}

export type AnimationSpeed = number;

export interface VisualizationState {
  isPlaying: boolean;
  isPaused: boolean;
  currentStep: number;
  totalSteps: number;
  speed: AnimationSpeed;
}

// Data Structure Types
export interface DataStructureNode {
  id: string;
  value: number | string;
  next?: string | null;
  prev?: string | null;
}

export interface GraphNode {
  id: string;
  value: string | number;
  x: number;
  y: number;
}

export interface GraphEdge {
  source: string;
  target: string;
  weight?: number;
}

export interface ArrayOperation {
  type: 'insert' | 'delete' | 'search' | 'update';
  index?: number;
  value?: number;
  description: string;
}

export interface StackOperation {
  type: 'push' | 'pop' | 'peek';
  value?: number;
  description: string;
}

export interface QueueOperation {
  type: 'enqueue' | 'dequeue' | 'peek';
  value?: number;
  description: string;
}

export interface LinkedListOperation {
  type:
    | 'insertHead'
    | 'insertTail'
    | 'insertAt'
    | 'deleteHead'
    | 'deleteTail'
    | 'deleteAt'
    | 'search';
  value?: number;
  index?: number;
  description: string;
}

export type DataStructureType = 'array' | 'stack' | 'queue' | 'linkedList';

export interface DataStructureState {
  type: DataStructureType;
  data: number[];
  nodes?: Map<string, DataStructureNode>;
  head?: string | null;
  tail?: string | null;
  capacity?: number;
}
