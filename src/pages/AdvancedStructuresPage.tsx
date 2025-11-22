import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import type { AnimationStep, AnimationSpeed } from '../types';
import ControlPanel from '../components/Controls/ControlPanel';
import TreeVisualizer from '../components/Visualizer/TreeVisualizer';
import HeapVisualizer from '../components/Visualizer/HeapVisualizer';
import HashTableVisualizer from '../components/Visualizer/HashTableVisualizer';
import {
  binaryTreeInsert,
  binaryTreeSearch,
  binaryTreeInOrder,
  binaryTreePreOrder,
  binaryTreePostOrder,
  binaryTreeLevelOrder,
  type TreeNode,
} from '../dataStructures/trees/binaryTree';
// Import BST operations
import {
  bstInsert,
  bstSearch,
  bstFindMin,
  bstFindMax,
  bstValidate,
} from '../dataStructures/trees/bst';

// Import heap operations
import {
  heapInsert,
  heapExtractMin,
  heapify,
  heapPeek,
  heapSize,
  heapIsEmpty,
  heapSort,
} from '../dataStructures/trees/heap';

import {
  hashTableInsert,
  hashTableSearch,
  hashTableDelete,
  hashTableGetKeys,
  hashTableLoadFactor,
  hashTableClear,
  hashTableCollisionStats,
  type HashTableState,
} from '../dataStructures/trees/hashTable';

import { generateRandomArray } from '../utils/helpers';

type StructureType = 'binaryTree' | 'bst' | 'heap' | 'hashTable';

const structureInfo = {
  binaryTree: {
    description: 'A Binary Tree is a hierarchical data structure where each node has at most two children, referred to as the left child and the right child.',
    characteristics: [
      'Hierarchical structure',
      'Max 2 children per node',
      'Used in expression parsers',
      'Basis for BST and Heaps',
    ],
  },
  bst: {
    description: 'A Binary Search Tree (BST) is a binary tree where the left child contains only nodes with values less than the parent, and the right child only nodes with values greater than the parent.',
    characteristics: [
      'Ordered structure',
      'Search: O(log n) average',
      'Insert/Delete: O(log n)',
      'In-order traversal yields sorted list',
    ],
  },
  heap: {
    description: 'A Heap is a specialized tree-based data structure that satisfies the heap property. In a Min Heap, the parent is always smaller than its children.',
    characteristics: [
      'Complete Binary Tree',
      'Min/Max access: O(1)',
      'Insert/Extract: O(log n)',
      'Used in Priority Queues',
    ],
  },
  hashTable: {
    description: 'A Hash Table implements an associative array abstract data type, a structure that can map keys to values using a hash function.',
    characteristics: [
      'Key-Value pairs',
      'Average Access: O(1)',
      'Handles collisions',
      'Dynamic resizing',
    ],
  },
};

export default function AdvancedStructuresPage() {
  const [selectedStructure, setSelectedStructure] = useState<StructureType>('binaryTree');
  const [selectedOperation, setSelectedOperation] = useState('insert');

  // Tree state (for binary tree and BST)
  const [treeNodes, setTreeNodes] = useState<Map<string, TreeNode>>(new Map());
  const [treeRoot, setTreeRoot] = useState<string | null>(null);

  // Heap state
  const [heapData, setHeapData] = useState<number[]>([]);

  // Hash table state
  const [hashTableState, setHashTableState] = useState<HashTableState>({
    table: Array(11).fill(null),
    size: 0,
    capacity: 11,
    collisions: 0,
  });

  // Animation state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<AnimationStep[]>([]);
  const [description, setDescription] = useState('');
  const [highlightedIndices, setHighlightedIndices] = useState<number[]>([]);
  const [comparedIndices, setComparedIndices] = useState<number[]>([]);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);

  // Tree node highlighting
  const [highlightedNodes, setHighlightedNodes] = useState<string[]>([]);
  const [comparedNodes, setComparedNodes] = useState<string[]>([]);
  const [activeNodes, setActiveNodes] = useState<string[]>([]);

  // Input values
  const [inputValue, setInputValue] = useState('');
  const [inputKey, setInputKey] = useState('');

  // Speed control
  const [speed, setSpeed] = useState<AnimationSpeed>(1);
  const animationTimeoutRef = useRef<number | null>(null);
  const visualizerRef = useRef<HTMLDivElement>(null);

  // Initialize with default data
  // useEffect(() => { ... }) removed as it is redundant with the effect below

  // Reset states when structure changes - using key prop on component instead
  // to avoid setState in effect antipattern

  // Update default operation and reset data when structure changes
  useEffect(() => {

    setSelectedOperation('insert');

    // Reset animation state
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentStep(0);
    setSteps([]);
    setDescription('Select an operation and click Execute to visualize.');
    setHighlightedIndices([]);
    setComparedIndices([]);
    setActiveIndices([]);
    setHighlightedNodes([]);
    setComparedNodes([]);
    setActiveNodes([]);

    // Initialize with random data
    const randomData = generateRandomArray(7, 1, 99);

    if (selectedStructure === 'heap') {
      setHeapData(randomData);
    } else if (selectedStructure === 'binaryTree' || selectedStructure === 'bst') {
      const newTreeNodes = new Map<string, TreeNode>();
      let newTreeRoot: string | null = null;

      for (const value of randomData) {
        const generator = bstInsert(newTreeNodes, newTreeRoot, value);
        let result: IteratorResult<AnimationStep & { newRoot?: string; newNodeId?: string }>;

        while (!(result = generator.next()).done) {
          if (result.value.newRoot) {
            newTreeRoot = result.value.newRoot;
          }
        }
      }
      setTreeNodes(newTreeNodes);
      setTreeRoot(newTreeRoot);
    } else if (selectedStructure === 'hashTable') {
      const initialHashTableState: HashTableState = {
        table: Array(11).fill(null),
        size: 0,
        capacity: 11,
        collisions: 0,
      };
      // Use a smaller set for hash table to avoid too many collisions initially
      const hashKeys = randomData.slice(0, 5);

      for (const key of hashKeys) {
        const generator = hashTableInsert(initialHashTableState, key, key * 10);

        for (const _ of generator) {
          // consume
        }
      }
      setHashTableState(initialHashTableState);
    }
  }, [selectedStructure]);

  const generateRandomSize = useCallback(() => Math.floor(Math.random() * 6) + 5, []);

  const handleRandomize = () => {
    handleReset();
    const randomData = generateRandomArray(generateRandomSize(), 1, 99);

    if (selectedStructure === 'heap') {
      setHeapData(randomData);
      setSteps([]);
      setCurrentStep(0);
      setDescription('Randomized heap data');
    } else if (selectedStructure === 'binaryTree' || selectedStructure === 'bst') {
      // Clear tree and insert random values
      const newTreeNodes = new Map<string, TreeNode>();
      let newTreeRoot: string | null = null;

      for (const value of randomData) {
        const generator = bstInsert(newTreeNodes, newTreeRoot, value);
        let result: IteratorResult<AnimationStep & { newRoot?: string; newNodeId?: string }>;

        while (!(result = generator.next()).done) {
          if (result.value.newRoot) {
            newTreeRoot = result.value.newRoot;
          }
        }
      }

      setTreeNodes(newTreeNodes);
      setTreeRoot(newTreeRoot);
      setSteps([]);
      setCurrentStep(0);
      setDescription(`Generated ${randomData.length} random values`);
    } else if (selectedStructure === 'hashTable') {
      // Clear and insert random key-value pairs
      const newState: HashTableState = {
        table: Array(11).fill(null),
        size: 0,
        capacity: 11,
        collisions: 0,
      };

      for (const value of randomData) {
        const generator = hashTableInsert(newState, value, value * 10);

        for (const _ of generator) {
          // consume
        }
      }

      setHashTableState(newState);
      setSteps([]);
      setCurrentStep(0);
      setDescription('Generated random hash table data');
    }
  };

  const handleOperation = async () => {
    if (isPlaying) {return;}

    const value = parseInt(inputValue);
    const key = parseInt(inputKey);

    let generator: Generator<AnimationStep> | null = null;
    let newRoot = treeRoot;
    const newNodes = new Map(treeNodes);

    try {
      if (selectedStructure === 'binaryTree') {
        if (selectedOperation === 'insert' && !isNaN(value)) {
          const result = binaryTreeInsert(newNodes, newRoot, value);
          const collectedSteps: AnimationStep[] = [];

          for (const step of result) {
            if ('newRoot' in step && step.newRoot) {
              newRoot = step.newRoot;
            }
            collectedSteps.push(step);
          }

          setTreeRoot(newRoot);
          setTreeNodes(newNodes);
          setSteps(collectedSteps);
        } else if (selectedOperation === 'search' && !isNaN(value)) {
          generator = binaryTreeSearch(newNodes, newRoot, value);
        } else if (selectedOperation === 'inOrder') {
          generator = binaryTreeInOrder(newNodes, newRoot);
        } else if (selectedOperation === 'preOrder') {
          generator = binaryTreePreOrder(newNodes, newRoot);
        } else if (selectedOperation === 'postOrder') {
          generator = binaryTreePostOrder(newNodes, newRoot);
        } else if (selectedOperation === 'levelOrder') {
          generator = binaryTreeLevelOrder(newNodes, newRoot);
        }
      } else if (selectedStructure === 'bst') {
        if (selectedOperation === 'insert' && !isNaN(value)) {
          const result = bstInsert(newNodes, newRoot, value);
          const collectedSteps: AnimationStep[] = [];

          for (const step of result) {
            if ('newRoot' in step && step.newRoot) {
              newRoot = step.newRoot;
            }
            collectedSteps.push(step);
          }

          setTreeRoot(newRoot);
          setTreeNodes(newNodes);
          setSteps(collectedSteps);
        } else if (selectedOperation === 'search' && !isNaN(value)) {
          generator = bstSearch(newNodes, newRoot, value);
        } else if (selectedOperation === 'findMin') {
          generator = bstFindMin(newNodes, newRoot);
        } else if (selectedOperation === 'findMax') {
          generator = bstFindMax(newNodes, newRoot);
        } else if (selectedOperation === 'validate') {
          generator = bstValidate(newNodes, newRoot);
        }
      } else if (selectedStructure === 'heap') {
        const newHeap = [...heapData];

        if (selectedOperation === 'insert' && !isNaN(value)) {
          generator = heapInsert(newHeap, value);
        } else if (selectedOperation === 'extractMin') {
          generator = heapExtractMin(newHeap);
        } else if (selectedOperation === 'heapify') {
          generator = heapify(newHeap);
        } else if (selectedOperation === 'peek') {
          generator = heapPeek(newHeap);
        } else if (selectedOperation === 'size') {
          generator = heapSize(newHeap);
        } else if (selectedOperation === 'isEmpty') {
          generator = heapIsEmpty(newHeap);
        } else if (selectedOperation === 'heapSort') {
          generator = heapSort(newHeap);
        }

        // Collect steps and update heap
        if (generator) {
          const collectedSteps: AnimationStep[] = [];
          for (const step of generator) {
            collectedSteps.push(step);
          }
          setHeapData(newHeap);
          setSteps(collectedSteps);
          generator = null;
        }
      } else if (selectedStructure === 'hashTable') {
        const newHashState = {
          table: [...hashTableState.table],
          size: hashTableState.size,
          capacity: hashTableState.capacity,
          collisions: hashTableState.collisions,
        };

        if (selectedOperation === 'insert' && !isNaN(key) && !isNaN(value)) {
          generator = hashTableInsert(newHashState, key, value);
        } else if (selectedOperation === 'search' && !isNaN(key)) {
          generator = hashTableSearch(newHashState, key);
        } else if (selectedOperation === 'delete' && !isNaN(key)) {
          generator = hashTableDelete(newHashState, key);
        } else if (selectedOperation === 'getKeys') {
          generator = hashTableGetKeys(newHashState);
        } else if (selectedOperation === 'loadFactor') {
          generator = hashTableLoadFactor(newHashState);
        } else if (selectedOperation === 'clear') {
          generator = hashTableClear(newHashState);
        } else if (selectedOperation === 'stats') {
          generator = hashTableCollisionStats(newHashState);
        }

        if (generator) {
          const collectedSteps: AnimationStep[] = [];
          for (const step of generator) {
            collectedSteps.push(step);
          }
          setHashTableState(newHashState);
          setSteps(collectedSteps);
          generator = null;
        }
      }

      // If generator wasn't handled above, collect steps
      if (generator) {
        const collectedSteps: AnimationStep[] = [];
        for (const step of generator) {
          collectedSteps.push(step);
        }
        setSteps(collectedSteps);
      }

      if (steps.length > 0 || generator) {
        setCurrentStep(0);
        setIsPlaying(true);
        setIsPaused(false);
        // Use setTimeout to allow render cycle to complete and layout to update
        setTimeout(() => {
          visualizerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } catch (error) {
      console.error('Operation error:', error);
      setDescription('Error performing operation');
    }
  };

  const updateVisualizationState = useCallback((stepIndex: number) => {
    if (stepIndex >= steps.length) {return;}

    const step = steps[stepIndex];
    setDescription(step.description);

    // Update visualization state based on structure
    if (selectedStructure === 'heap' || selectedStructure === 'hashTable') {
      setHighlightedIndices(
        step.type === 'highlight' || step.type === 'sorted' ? step.indices : [],
      );
      setComparedIndices(step.type === 'compare' ? step.indices : []);
      setActiveIndices(step.type === 'active' ? step.indices : []);
    } else {
      // For trees, use nodeIds
      setHighlightedNodes(
        step.type === 'highlight' || step.type === 'sorted' || step.type === 'search' || step.type === 'insert'
          ? (step.nodeIds || [])
          : [],
      );
      setComparedNodes(step.type === 'compare' ? (step.nodeIds || []) : []);
      setActiveNodes(step.type === 'active' ? (step.nodeIds || []) : []);
    }
  }, [steps, selectedStructure]);

  // Animation effect
  useEffect(() => {
    if (!isPlaying || isPaused || currentStep >= steps.length) {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
      if (currentStep >= steps.length && steps.length > 0) {
        setIsPlaying(false);
      }
      return;
    }

    updateVisualizationState(currentStep);

    const delay = 1000 / speed;
    animationTimeoutRef.current = setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
    }, delay);

    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, [isPlaying, isPaused, currentStep, steps, speed, selectedStructure, updateVisualizationState]);

  const handleReset = () => {
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentStep(0);
    setDescription('');
    setHighlightedIndices([]);
    setComparedIndices([]);
    setActiveIndices([]);
    setHighlightedNodes([]);
    setComparedNodes([]);
    setActiveNodes([]);
  };

  const handlePlayPause = () => {
    if (!isPlaying && steps.length === 0) {
      handleOperation();
    } else {
      setIsPaused(!isPaused);
      if (isPaused) {
        setIsPlaying(true);
      }
    }
  };

  const handleStepForward = () => {
    if (currentStep < steps.length) {
      updateVisualizationState(currentStep);
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleStepBackward = () => {
    if (currentStep > 0) {
      const newStep = currentStep - 1;
      setCurrentStep(newStep);
      updateVisualizationState(newStep);
    }
  };

  const getOperations = () => {
    if (selectedStructure === 'binaryTree') {
      return [
        { value: 'insert', label: 'Insert' },
        { value: 'search', label: 'Search' },
        { value: 'inOrder', label: 'In-Order Traversal' },
        { value: 'preOrder', label: 'Pre-Order Traversal' },
        { value: 'postOrder', label: 'Post-Order Traversal' },
        { value: 'levelOrder', label: 'Level-Order Traversal' },
      ];
    } else if (selectedStructure === 'bst') {
      return [
        { value: 'insert', label: 'Insert' },
        { value: 'search', label: 'Search' },
        { value: 'findMin', label: 'Find Minimum' },
        { value: 'findMax', label: 'Find Maximum' },
        { value: 'validate', label: 'Validate BST' },
      ];
    } else if (selectedStructure === 'heap') {
      return [
        { value: 'insert', label: 'Insert' },
        { value: 'extractMin', label: 'Extract Min' },
        { value: 'heapify', label: 'Heapify' },
        { value: 'peek', label: 'Peek' },
        { value: 'size', label: 'Size' },
        { value: 'isEmpty', label: 'Is Empty' },
        { value: 'heapSort', label: 'Heap Sort' },
      ];
    } else {
      return [
        { value: 'insert', label: 'Insert' },
        { value: 'search', label: 'Search' },
        { value: 'delete', label: 'Delete' },
        { value: 'getKeys', label: 'Get Keys' },
        { value: 'loadFactor', label: 'Load Factor' },
        { value: 'clear', label: 'Clear' },
        { value: 'stats', label: 'Collision Stats' },
      ];
    }
  };

  const needsValue = () => {
    if (selectedStructure === 'hashTable') {
      return selectedOperation === 'insert';
    }
    return ['insert', 'search'].includes(selectedOperation);
  };

  const needsKey = () => {
    return (
      selectedStructure === 'hashTable' &&
      ['insert', 'search', 'delete'].includes(selectedOperation)
    );
  };

  const renderVisualizer = () => {
    const controls = steps.length > 0 ? (
      <ControlPanel
        isPlaying={isPlaying}
        currentStep={currentStep}
        totalSteps={steps.length}
        speed={speed}
        onPlayPause={handlePlayPause}
        onReset={handleReset}
        onStepForward={handleStepForward}
        onStepBackward={handleStepBackward}
        onSpeedChange={setSpeed}
        variant="minimal"
      />
    ) : null;

    const descriptionElement = description ? (
      <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800 rounded-lg">
        <p className="text-center text-purple-800 dark:text-purple-200 font-medium min-h-[1.5rem]">
          {description}
        </p>
      </div>
    ) : null;

    const explanationElement = (
      <div className="space-y-2">
        <p>{structureInfo[selectedStructure].description}</p>
        <div className="mt-2">
          <span className="font-semibold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">Key Characteristics</span>
          <ul className="mt-1 grid grid-cols-2 gap-2">
            {structureInfo[selectedStructure].characteristics.map((char, idx) => (
              <li key={idx} className="text-xs flex items-center gap-1.5 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded border border-gray-100 dark:border-gray-700">
                <div className="w-1 h-1 rounded-full bg-purple-500" />
                {char}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );

    if (selectedStructure === 'binaryTree' || selectedStructure === 'bst') {
      return (
        <TreeVisualizer
          nodes={treeNodes}
          root={treeRoot}
          highlightedNodes={highlightedNodes}
          comparedNodes={comparedNodes}
          activeNodes={activeNodes}
          title="Visualization"
          explanation={explanationElement}
        >
          {descriptionElement}
          {controls}
        </TreeVisualizer>
      );
    } else if (selectedStructure === 'heap') {
      return (
        <HeapVisualizer
          data={heapData}
          highlightedIndices={highlightedIndices}
          comparedIndices={comparedIndices}
          activeIndices={activeIndices}
          title="Visualization"
          explanation={explanationElement}
        >
          {descriptionElement}
          {controls}
        </HeapVisualizer>
      );
    } else {
      return (
        <HashTableVisualizer
          table={hashTableState.table}
          capacity={hashTableState.capacity}
          highlightedIndices={highlightedIndices}
          comparedIndices={comparedIndices}
          activeIndices={activeIndices}
          title="Visualization"
          explanation={explanationElement}
        >
          {descriptionElement}
          {controls}
        </HashTableVisualizer>
      );
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold">Advanced Data Structures</h1>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Visualize complex data structures like Trees, Heaps, and Hash Tables
        </p>
      </div>

      {/* Main content in grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Structure Selector */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <svg
                className="w-5 h-5 text-purple-600"
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
              Select Structure
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {[
              { value: 'binaryTree', label: 'Binary Tree' },
              { value: 'bst', label: 'BST' },
              { value: 'heap', label: 'Heap' },
              { value: 'hashTable', label: 'Hash Table' },
            ].map((structure) => (
              <button
                key={structure.value}
                onClick={() => setSelectedStructure(structure.value as StructureType)}
                className={`
                  px-3 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 text-sm
                  ${
                    selectedStructure === structure.value
                      ? 'bg-purple-600 text-white shadow-purple-200 dark:shadow-none ring-2 ring-purple-600 ring-offset-2 ring-offset-white dark:ring-offset-gray-900'
                      : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                  }
                `}
              >
                {structure.label}
              </button>
            ))}
          </div>

          {/* Randomize Button */}
          <div className="mt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleRandomize}
              className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-lg transition-all flex items-center justify-center gap-2 text-sm"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Generate Random Data
            </motion.button>
          </div>
        </div>

        {/* Configure Operation */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <svg
                className="w-5 h-5 text-purple-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5"
                />
              </svg>
              Configure Operation
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Operation Selector */}
            <div className="md:col-span-2">
              <label className="block text-xs font-medium mb-2 text-gray-700 dark:text-gray-300">
                Choose Operation
              </label>
              <div className="flex flex-wrap gap-2">
                {getOperations().map((op) => (
                  <button
                    key={op.value}
                    onClick={() => setSelectedOperation(op.value)}
                    className={`
                      px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all
                      ${
                        selectedOperation === op.value
                          ? 'bg-purple-600 text-white shadow-md'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                      }
                    `}
                  >
                    {op.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Inputs */}
            <div className="space-y-3">
              {/* Key input (hash table only) */}
              {needsKey() && (
                <div>
                  <label className="block text-xs font-medium mb-1.5 text-gray-700 dark:text-gray-300">
                    Key
                  </label>
                  <input
                    type="number"
                    value={inputKey}
                    onChange={(e) => setInputKey(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-sm"
                    placeholder="Enter key"
                  />
                </div>
              )}

              {/* Value input */}
              {needsValue() && (
                <div>
                  <label className="block text-xs font-medium mb-1.5 text-gray-700 dark:text-gray-300">
                    Value
                  </label>
                  <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-sm"
                    placeholder="Enter value"
                  />
                </div>
              )}
            </div>

            {/* Status & Execute */}
            <div className="space-y-3">
              <div className="p-2.5 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-800/50">
                <div className="text-[10px] font-medium text-purple-700 dark:text-purple-300 mb-1 uppercase tracking-wider">
                  Status
                </div>
                <div className="font-mono text-xs break-all text-purple-900 dark:text-purple-100">
                  {selectedStructure === 'heap'
                    ? `Size: ${heapData.length}`
                    : selectedStructure === 'hashTable'
                      ? `Size: ${hashTableState.size}`
                      : `Nodes: ${treeNodes.size}`}
                </div>
              </div>

              <button
                onClick={handleOperation}
                disabled={isPlaying}
                className={`w-full px-3 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-sm ${
                  isPlaying ? 'animate-pulse' : ''
                }`}
              >
                {isPlaying ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                       />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                       />
                    </svg>
                    Running...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Execute
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Visualizer */}
      <div className="space-y-4" ref={visualizerRef}>
        {renderVisualizer()}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {selectedStructure === 'heap' && (
          <>
            <div className="bg-white dark:bg-gray-900 rounded-xl p-3 border border-gray-200 dark:border-gray-800 shadow-sm">
              <p className="text-gray-600 dark:text-gray-400 text-xs">Heap Size</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{heapData.length}</p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-xl p-3 border border-gray-200 dark:border-gray-800 shadow-sm">
              <p className="text-gray-600 dark:text-gray-400 text-xs">Min Value</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{heapData.length > 0 ? heapData[0] : '-'}</p>
            </div>
          </>
        )}
        {selectedStructure === 'hashTable' && (
          <>
            <div className="bg-white dark:bg-gray-900 rounded-xl p-3 border border-gray-200 dark:border-gray-800 shadow-sm">
              <p className="text-gray-600 dark:text-gray-400 text-xs">Size / Capacity</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {hashTableState.size} / {hashTableState.capacity}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-xl p-3 border border-gray-200 dark:border-gray-800 shadow-sm">
              <p className="text-gray-600 dark:text-gray-400 text-xs">Load Factor</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {(hashTableState.size / hashTableState.capacity).toFixed(2)}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-xl p-3 border border-gray-200 dark:border-gray-800 shadow-sm">
              <p className="text-gray-600 dark:text-gray-400 text-xs">Collisions</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{hashTableState.collisions}</p>
            </div>
          </>
        )}
        {(selectedStructure === 'binaryTree' || selectedStructure === 'bst') && (
          <div className="bg-white dark:bg-gray-900 rounded-xl p-3 border border-gray-200 dark:border-gray-800 shadow-sm">
            <p className="text-gray-600 dark:text-gray-400 text-xs">Tree Size</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">{treeNodes.size}</p>
          </div>
        )}
      </div>
    </div>
  );
}
