import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { AnimationStep } from '../types';
import ControlPanel from '../components/Controls/ControlPanel';
import StackVisualizer from '../components/DataStructures/StackVisualizer';
import QueueVisualizer from '../components/DataStructures/QueueVisualizer';
import LinkedListVisualizer from '../components/DataStructures/LinkedListVisualizer';
import ArrayVisualizer from '../components/Visualizer/ArrayVisualizer';
import { generateRandomArray } from '../utils/helpers';

// Import data structure operations
import {
  arrayInsert,
  arrayDelete,
  arraySearch,
  arrayUpdate,
  arrayAccess,
} from '../dataStructures/linear/arrayOperations';
import {
  stackPush,
  stackPop,
  stackPeek,
  stackSearch,
  stackIsEmpty,
  stackSize,
} from '../dataStructures/linear/stack';
import {
  queueEnqueue,
  queueDequeue,
  queuePeek,
  queueSearch,
  queueRear,
  queueIsEmpty,
  queueSize,
} from '../dataStructures/linear/queue';
import {
  linkedListInsertHead,
  linkedListInsertTail,
  linkedListDeleteHead,
  linkedListDeleteTail,
  linkedListSearch,
  linkedListInsertAt,
  linkedListIsEmpty,
  linkedListSize,
} from '../dataStructures/linear/linkedList';

interface StructureInfo {
  description: string;
  characteristics: string[];
}

const structureInfo: Record<string, StructureInfo> = {
  array: {
    description: "An array is a collection of items stored at contiguous memory locations. It allows random access to elements using indices.",
    characteristics: [
      "Random access: O(1)",
      "Insertion/Deletion: O(n)",
      "Search: O(n) (unsorted)",
      "Fixed size (static arrays)"
    ]
  },
  stack: {
    description: "A Stack is a linear data structure that follows the LIFO (Last In First Out) principle. Elements are added and removed from the same end, called the 'top'.",
    characteristics: [
      "Push/Pop: O(1)",
      "Peek: O(1)",
      "LIFO (Last In First Out)",
      "Used in recursion, undo/redo"
    ]
  },
  queue: {
    description: "A Queue is a linear data structure that follows the FIFO (First In First Out) principle. Elements are added at the 'rear' and removed from the 'front'.",
    characteristics: [
      "Enqueue/Dequeue: O(1)",
      "Peek: O(1)",
      "FIFO (First In First Out)",
      "Used in scheduling, buffering"
    ]
  },
  linkedList: {
    description: "A Linked List is a linear data structure where elements are stored in nodes. Each node contains a data field and a reference (link) to the next node in the sequence.",
    characteristics: [
      "Dynamic size",
      "Insertion/Deletion: O(1) (if position known)",
      "Access/Search: O(n)",
      "No random access"
    ]
  }
};

const DataStructuresPage = () => {
  const [selectedStructure, setSelectedStructure] = useState('array');
  const [selectedOperation, setSelectedOperation] = useState('insert');
  const [displayData, setDisplayData] = useState([5, 3, 8, 1, 9, 2]);
  const [inputValue, setInputValue] = useState(10);
  const [inputIndex, setInputIndex] = useState(0);

  // Linked list state
  const [nodes, setNodes] = useState(new Map());
  const [head, setHead] = useState(null);

  // Initialize Linked List with default data
  useEffect(() => {
    const initialValues = [5, 3, 8, 1, 9, 2];
    const newNodes = new Map();
    let newHead = null;
    let prevNodeId: string | null = null;

    initialValues.forEach((value, index) => {
      const nodeId = `node-${index}`;
      const newNode = {
        id: nodeId,
        value: value,
        next: null,
      };

      newNodes.set(nodeId, newNode);

      if (index === 0) {
        newHead = nodeId;
      } else if (prevNodeId) {
        const prevNode = newNodes.get(prevNodeId);
        if (prevNode) {
          prevNode.next = nodeId;
        }
      }
      prevNodeId = nodeId;
    });

    setNodes(newNodes);
    setHead(newHead);
  }, []);

  // Animation state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [currentDescription, setCurrentDescription] = useState('');
  const [highlightIndices, setHighlightIndices] = useState<number[]>([]);
  const [highlightType, setHighlightType] = useState<
    'insert' | 'delete' | 'search' | 'compare' | 'swap' | 'sorted' | 'active' | 'highlight' | 'minimum'
  >('active');

  const stepsRef = useRef<AnimationStep[]>([]);
  const arrayStatesRef = useRef<number[][]>([]);
  const animationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const visualizerRef = useRef<HTMLDivElement>(null);

  // Get available operations based on selected structure
  const getOperations = () => {
    switch (selectedStructure) {
      case 'array':
        return ['access', 'insert', 'delete', 'search', 'update'];
      case 'stack':
        return ['push', 'pop', 'peek', 'isEmpty', 'size', 'search'];
      case 'queue':
        return ['enqueue', 'dequeue', 'peek', 'rear', 'isEmpty', 'size', 'search'];
      case 'linkedList':
        return [
          'insertHead',
          'insertTail',
          'insertAt',
          'deleteHead',
          'deleteTail',
          'isEmpty',
          'size',
          'search',
        ];
      default:
        return [];
    }
  };

  // Helper to filter step types to valid visualizer types
  const toValidHighlightType = (type: string): 'insert' | 'delete' | 'search' | 'compare' | 'swap' | 'sorted' | 'active' | 'highlight' | 'minimum' => {
    const validTypes = [
      'compare',
      'swap',
      'sorted',
      'active',
      'insert',
      'delete',
      'highlight',
      'search',
      'minimum',
    ];
    return validTypes.includes(type) ? (type as any) : 'active';
  };

  // Reset operation and data when structure changes
  useEffect(() => {
    const operations = getOperations();
    if (operations.length > 0) {
      setSelectedOperation(operations[0]);
    }

    // Reset animation state
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentStep(0);
    setTotalSteps(0);
    setCurrentDescription('');
    setHighlightIndices([]);
    stepsRef.current = [];
    arrayStatesRef.current = [];

    // Generate fresh random data
    const randomData = generateRandomArray(6, 1, 99);

    if (selectedStructure === 'linkedList') {
      const newNodes = new Map();
      let newHead = null;
      let prevNodeId: string | null = null;

      randomData.forEach((value, index) => {
        const nodeId = `node-${Date.now()}-${index}`;
        const newNode = {
          id: nodeId,
          value: value,
          next: null,
        };

        newNodes.set(nodeId, newNode);

        if (index === 0) {
          newHead = nodeId;
        } else if (prevNodeId) {
          const prevNode = newNodes.get(prevNodeId);
          if (prevNode) {
            prevNode.next = nodeId;
          }
        }
        prevNodeId = nodeId;
      });

      setNodes(newNodes);
      setHead(newHead);
    } else {
      setDisplayData(randomData);
    }
  }, [selectedStructure]);

  const executeOperation = useCallback(() => {
    const workingArray = [...displayData];
    const steps = [];
    const arrayStates = [workingArray.slice()];

    let generator = null;

    // Execute based on structure and operation
    if (selectedStructure === 'array') {
      switch (selectedOperation) {
        case 'access':
          generator = arrayAccess(workingArray, inputIndex);
          break;
        case 'insert':
          generator = arrayInsert(workingArray, inputIndex, inputValue);
          break;
        case 'delete':
          generator = arrayDelete(workingArray, inputIndex);
          break;
        case 'search':
          generator = arraySearch(workingArray, inputValue);
          break;
        case 'update':
          generator = arrayUpdate(workingArray, inputIndex, inputValue);
          break;
      }
    } else if (selectedStructure === 'stack') {
      switch (selectedOperation) {
        case 'push':
          generator = stackPush(workingArray, inputValue);
          break;
        case 'pop':
          generator = stackPop(workingArray);
          break;
        case 'peek':
          generator = stackPeek(workingArray);
          break;
        case 'isEmpty':
          generator = stackIsEmpty(workingArray);
          break;
        case 'size':
          generator = stackSize(workingArray);
          break;
        case 'search':
          generator = stackSearch(workingArray, inputValue);
          break;
      }
    } else if (selectedStructure === 'queue') {
      switch (selectedOperation) {
        case 'enqueue':
          generator = queueEnqueue(workingArray, inputValue);
          break;
        case 'dequeue':
          generator = queueDequeue(workingArray);
          break;
        case 'peek':
          generator = queuePeek(workingArray);
          break;
        case 'rear':
          generator = queueRear(workingArray);
          break;
        case 'isEmpty':
          generator = queueIsEmpty(workingArray);
          break;
        case 'size':
          generator = queueSize(workingArray);
          break;
        case 'search':
          generator = queueSearch(workingArray, inputValue);
          break;
      }
    } else if (selectedStructure === 'linkedList') {
      const workingNodes = new Map(nodes);

      switch (selectedOperation) {
        case 'insertHead':
          generator = linkedListInsertHead(
            workingNodes,
            head,
            inputValue,
          );
          break;
        case 'insertTail':
          generator = linkedListInsertTail(
            workingNodes,
            head,
            inputValue,
          );
          break;
        case 'insertAt':
          generator = linkedListInsertAt(
            workingNodes,
            head,
            inputValue,
            inputIndex,
          );
          break;
        case 'deleteHead':
          generator = linkedListDeleteHead(workingNodes, head);
          break;
        case 'deleteTail':
          generator = linkedListDeleteTail(workingNodes, head);
          break;
        case 'isEmpty':
          generator = linkedListIsEmpty(workingNodes, head);
          break;
        case 'size':
          generator = linkedListSize(workingNodes, head);
          break;
        case 'search':
          generator = linkedListSearch(workingNodes, head, inputValue);
          break;
      }

      if (generator) {
        let newHead = head;
        for (const step of generator) {
          steps.push(step);
          if ('newHead' in step && step.newHead !== undefined) {
            newHead = step.newHead as any;
          }
        }
        setNodes(workingNodes);
        setHead(newHead);
      }
    }

    // Process generator for non-linked-list structures
    if (generator && selectedStructure !== 'linkedList') {
      for (const step of generator) {
        steps.push(step);
        arrayStates.push(workingArray.slice());
      }
    }

    stepsRef.current = steps;
    arrayStatesRef.current = arrayStates;
    setTotalSteps(steps.length);

    if (steps.length > 0) {
      setIsPlaying(true);
      setCurrentStep(0);
      setTimeout(() => {
        visualizerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [selectedStructure, selectedOperation, displayData, inputValue, inputIndex, nodes, head]);

  const playAnimation = useCallback(() => {
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }

    if (currentStep >= stepsRef.current.length) {
      setIsPlaying(false);
      setIsPaused(false);

      // Update final state
      if (selectedStructure !== 'linkedList' && arrayStatesRef.current.length > 0) {
        setDisplayData(arrayStatesRef.current[arrayStatesRef.current.length - 1]);
      }
      return;
    }

    const step = stepsRef.current[currentStep];
    setCurrentDescription(step.description);
    setHighlightIndices(step.indices);
    setHighlightType(toValidHighlightType(step.type));

    // Update display data
    if (selectedStructure !== 'linkedList') {
      const newData = arrayStatesRef.current[currentStep + 1] || displayData;
      setDisplayData(newData);
    }

    const delay = 1000 / animationSpeed;
    animationTimeoutRef.current = setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
    }, delay);
  }, [currentStep, animationSpeed, displayData, selectedStructure]);

  useEffect(() => {
    if (isPlaying && !isPaused) {
      playAnimation();
    }

    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, [isPlaying, isPaused, currentStep, playAnimation]);

  const handleReset = () => {
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentStep(0);
    setCurrentDescription('');
    setHighlightIndices([]);

    if (selectedStructure !== 'linkedList' && arrayStatesRef.current.length > 0) {
      setDisplayData(arrayStatesRef.current[0]);
    }
  };

  const handlePlayPause = () => {
    if (!isPlaying && stepsRef.current.length === 0) {
      executeOperation();
    } else {
      setIsPaused(!isPaused);
      if (isPaused) {
        setIsPlaying(true);
      }
    }
  };

  const handleStepForward = () => {
    if (currentStep < stepsRef.current.length) {
      const step = stepsRef.current[currentStep];
      setCurrentDescription(step.description);
      setHighlightIndices(step.indices);
      setHighlightType(toValidHighlightType(step.type));

      // Update display data
      if (selectedStructure !== 'linkedList') {
        const newData = arrayStatesRef.current[currentStep + 1] || displayData;
        setDisplayData(newData);
      }

      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleStepBackward = () => {
    if (currentStep > 0) {
      const newStep = currentStep - 1;
      setCurrentStep(newStep);

      // Reset to initial state
      if (selectedStructure !== 'linkedList' && arrayStatesRef.current.length > 0) {
        const initialData = arrayStatesRef.current[0];
        setDisplayData([...initialData]);
      }
      setHighlightIndices([]);

      // Replay all steps up to newStep
      for (let i = 0; i < newStep; i++) {
        const step = stepsRef.current[i];

        if (selectedStructure !== 'linkedList') {
          const stepData = arrayStatesRef.current[i + 1];
          if (stepData) {
            setDisplayData([...stepData]);
          }
        }

        setHighlightIndices(step.indices);
        setHighlightType(toValidHighlightType(step.type));
      }

      // Show current step description
      if (newStep > 0) {
        const prevStep = stepsRef.current[newStep - 1];
        setCurrentDescription(prevStep.description);
        setHighlightIndices(prevStep.indices);
        setHighlightType(toValidHighlightType(prevStep.type));
      } else {
        setCurrentDescription('');
        setHighlightIndices([]);
      }
    }
  };

  const handleRandomize = () => {
    // Reset animation state
    handleReset();

    // Generate random data based on structure type
    const size = Math.floor(Math.random() * 6) + 5; // 5-10 elements
    const randomData = generateRandomArray(size, 1, 99);

    setDisplayData(randomData);

    // Clear linked list state
    if (selectedStructure === 'linkedList') {
      const newNodes = new Map();
      let newHead = null;
      let prevNodeId: string | null = null;

      randomData.forEach((value, index) => {
        const nodeId = `node-${Date.now()}-${index}`;
        const newNode = {
          id: nodeId,
          value: value,
          next: null,
        };

        newNodes.set(nodeId, newNode);

        if (index === 0) {
          newHead = nodeId;
        } else if (prevNodeId) {
          const prevNode = newNodes.get(prevNodeId);
          if (prevNode) {
            prevNode.next = nodeId;
          }
        }
        prevNodeId = nodeId;
      });

      setNodes(newNodes);
      setHead(newHead);
    }

    // Clear steps
    stepsRef.current = [];
    arrayStatesRef.current = [];
    setTotalSteps(0);
    setHighlightIndices([]);
    setCurrentDescription('');
  };

  const getDisplayText = () => {
    if (selectedStructure === 'linkedList') {
      const values = Array.from(nodes.values()).map((n) => n.value);
      return values.length > 0 ? values.join(' -> ') : 'Empty';
    }
    return `[${displayData.join(', ')}]`;
  };

  const renderVisualizer = () => {
    const controls = totalSteps > 0 ? (
      <ControlPanel
        isPlaying={isPlaying}
        currentStep={currentStep}
        totalSteps={totalSteps}
        speed={animationSpeed}
        onPlayPause={handlePlayPause}
        onReset={handleReset}
        onSpeedChange={setAnimationSpeed}
        onStepForward={handleStepForward}
        onStepBackward={handleStepBackward}
        variant="minimal"
      />
    ) : null;

    const descriptionElement = currentDescription ? (
      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg">
        <p className="text-center text-blue-800 dark:text-blue-200 font-medium min-h-[1.5rem]">
          {currentDescription}
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
                <div className="w-1 h-1 rounded-full bg-blue-500"></div>
                {char}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );

    switch (selectedStructure) {
      case 'array':
        return (
          <ArrayVisualizer
            data={displayData}
            highlightIndices={highlightIndices}
            highlightType={highlightType}
            title="Visualization"
            description={currentDescription}
            explanation={explanationElement}
          >
            {controls}
          </ArrayVisualizer>
        );
      case 'stack':
        return (
          <StackVisualizer
            data={displayData}
            highlightIndices={highlightIndices}
            highlightType={highlightType as any}
            title="Visualization"
            explanation={explanationElement}
          >
            {descriptionElement}
            {controls}
          </StackVisualizer>
        );
      case 'queue':
        return (
          <QueueVisualizer
            data={displayData}
            highlightIndices={highlightIndices}
            highlightType={highlightType as any}
            title="Visualization"
            explanation={explanationElement}
          >
            {descriptionElement}
            {controls}
          </QueueVisualizer>
        );
      case 'linkedList':
        return (
          <LinkedListVisualizer
            nodes={nodes}
            head={head}
            highlightIndices={highlightIndices}
            highlightType={highlightType as any}
            title="Visualization"
            explanation={explanationElement}
          >
            {descriptionElement}
            {controls}
          </LinkedListVisualizer>
        );
      default:
        return null;
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
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold">Data Structures</h1>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Select a data structure, choose an operation, enter values, and click "Execute" to see the
          visualization
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
              Select Data Structure
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {['array', 'stack', 'queue', 'linkedList'].map((structure) => {
              const icons: Record<string, React.ReactNode> = {
                array: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                ),
                stack: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                ),
                queue: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 5l7 7-7 7M5 5l7 7-7 7"
                  />
                ),
                linkedList: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                ),
              };
              return (
                <button
                  key={structure}
                  onClick={() => setSelectedStructure(structure)}
                  className={`
                    px-3 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 text-sm
                    ${
                      selectedStructure === structure
                        ? 'bg-blue-600 text-white shadow-blue-200 dark:shadow-none ring-2 ring-blue-600 ring-offset-2 ring-offset-white dark:ring-offset-gray-900'
                        : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                    }
                  `}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    {icons[structure]}
                  </svg>
                  <span>
                    {structure === 'linkedList'
                      ? 'Linked List'
                      : structure.charAt(0).toUpperCase() + structure.slice(1)}
                  </span>
                </button>
              );
            })}
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

        {/* Operation & Input Panel */}
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
                  d="M10.325 4.317c.426-1.756 2.924-1.756 2.924 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
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
                {getOperations().map((operation) => (
                  <button
                    key={operation}
                    onClick={() => setSelectedOperation(operation)}
                    className={`
                      px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all
                      ${
                        selectedOperation === operation
                          ? 'bg-purple-600 text-white shadow-md'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                      }
                    `}
                  >
                    {operation.charAt(0).toUpperCase() + operation.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Values */}
            <div className="space-y-3">
              {/* Only show Value input for operations that need it */}
              {![
                'pop',
                'peek',
                'isEmpty',
                'size',
                'dequeue',
                'rear',
                'deleteHead',
                'deleteTail',
              ].includes(selectedOperation) && (
                <div>
                  <label className="block text-xs font-medium mb-1.5 text-gray-700 dark:text-gray-300">
                    Value
                  </label>
                  <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-sm"
                    placeholder="Enter value"
                  />
                </div>
              )}

              {((selectedStructure === 'array' &&
                ['access', 'insert', 'delete', 'update'].includes(selectedOperation)) ||
                (selectedStructure === 'linkedList' && selectedOperation === 'insertAt')) && (
                <div>
                  <label className="block text-xs font-medium mb-1.5 text-gray-700 dark:text-gray-300">
                    Index Position
                  </label>
                  <input
                    type="number"
                    value={inputIndex}
                    onChange={(e) => setInputIndex(Number(e.target.value))}
                    min={0}
                    max={displayData.length}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-sm"
                    placeholder="Enter index"
                  />
                </div>
              )}
            </div>

            {/* Current Data & Execute */}
            <div className="space-y-3">
              <div className="p-2.5 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/50">
                <div className="text-[10px] font-medium text-blue-700 dark:text-blue-300 mb-1 uppercase tracking-wider">
                  Current Data
                </div>
                <div className="font-mono text-xs break-all text-blue-900 dark:text-blue-100">
                  {getDisplayText()}
                </div>
                <div className="text-[10px] text-blue-600 dark:text-blue-400 mt-1">
                  Size: {selectedStructure === 'linkedList' ? nodes.size : displayData.length}
                </div>
              </div>

              <button
                onClick={executeOperation}
                disabled={isPlaying}
                className={`w-full px-3 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-sm ${
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
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
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
                    Execute {selectedOperation}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4" ref={visualizerRef}>
        {renderVisualizer()}
      </div>
    </div>
  );
};

export default DataStructuresPage;
