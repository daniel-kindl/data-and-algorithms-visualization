import { useState, useEffect, useRef, useCallback } from 'react';
import ArrayVisualizer from '../components/Visualizer/ArrayVisualizer';
import ControlPanel from '../components/Controls/ControlPanel';
import InputPanel from '../components/Controls/InputPanel';
import CodePanel from '../components/CodePanel/CodePanel';
import ComplexityDisplay from '../components/Visualizer/ComplexityDisplay';
import { sortingAlgorithms } from '../algorithms/sorting';
import { generateRandomArray } from '../utils/helpers';
import type { AnimationSpeed, AnimationStep } from '../types';

const SortingPage = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(sortingAlgorithms[0]);
  const [data, setData] = useState<number[]>([]);
  const [displayData, setDisplayData] = useState<number[]>([]);
  const [barStates, setBarStates] = useState<
    Record<number, 'compare' | 'swap' | 'sorted' | 'active' | 'minimum'>
  >({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const [speed, setSpeed] = useState<AnimationSpeed>(1);
  const [currentDescription, setCurrentDescription] = useState('');
  const [operationsCount, setOperationsCount] = useState({
    comparisons: 0,
    swaps: 0,
    arrayAccesses: 0,
  });
  const [elapsedTime, setElapsedTime] = useState(0);
  const startTimeRef = useRef<number>(0);

  const stepsRef = useRef<AnimationStep[]>([]);
  const arrayStatesRef = useRef<number[][]>([]);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Initialize with random data
  useEffect(() => {
    const initialData = generateRandomArray(20);
    setData(initialData);
  }, []);

  // Generate animation steps when data or algorithm changes
  useEffect(() => {
    setIsPlaying(false);
    if (data.length === 0) {
      stepsRef.current = [];
      arrayStatesRef.current = [];
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Clearing state when data is empty
      setTotalSteps(0);
      setDisplayData([]);
      setBarStates({});
      return;
    }

    const steps: AnimationStep[] = [];
    const arrayStates: number[][] = [];
    const workingArray = [...data];

    arrayStates.push([...workingArray]);

    const generator = selectedAlgorithm.generator(workingArray);

    for (const step of generator) {
      steps.push(step);
      arrayStates.push([...workingArray]);
    }

    stepsRef.current = steps;
    arrayStatesRef.current = arrayStates;
    setTotalSteps(steps.length);
    setDisplayData([...data]);
    setBarStates({});
    setCurrentStep(0);
    setCurrentDescription('');
    setOperationsCount({ comparisons: 0, swaps: 0, arrayAccesses: 0 });
    setElapsedTime(0);
    startTimeRef.current = 0;
  }, [data, selectedAlgorithm]);

  // Execute a single animation step
  const executeStep = useCallback(
    (stepIndex: number) => {
      if (stepIndex >= stepsRef.current.length) {
        return;
      }

      const step = stepsRef.current[stepIndex];
      const newData = arrayStatesRef.current[stepIndex + 1] || displayData;
      const newStates: Record<number, 'compare' | 'swap' | 'sorted' | 'active' | 'minimum'> = {};

      // Update bar states based on step type (filter to valid types for sorting)
      const validTypes = ['compare', 'swap', 'sorted', 'active', 'minimum'] as const;
      step.indices.forEach((idx) => {
        if (validTypes.includes(step.type as (typeof validTypes)[number])) {
          newStates[idx] = step.type as 'compare' | 'swap' | 'sorted' | 'active' | 'minimum';
        }
      });

      setDisplayData([...newData]);
      setBarStates(newStates);
      setCurrentDescription(step.description);

      // Update operations counter
      setOperationsCount((prev) => ({
        comparisons: prev.comparisons + (step.type === 'compare' ? 1 : 0),
        swaps: prev.swaps + (step.type === 'swap' ? 1 : 0),
        arrayAccesses: prev.arrayAccesses + step.indices.length,
      }));
    },
    [displayData],
  );

  // Execute animation steps
  useEffect(() => {
    if (!isPlaying || currentStep >= stepsRef.current.length) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (currentStep >= stepsRef.current.length && stepsRef.current.length > 0) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- Necessary to stop animation when complete
        setIsPlaying(false);
      }
      return;
    }

    // Start timer on first step
    if (currentStep === 0 && startTimeRef.current === 0) {
      startTimeRef.current = Date.now();
    }

    // Update elapsed time
    if (startTimeRef.current > 0) {
      setElapsedTime(Date.now() - startTimeRef.current);
    }

    const delay = 1000 / speed;
    timeoutRef.current = setTimeout(() => {
      executeStep(currentStep);
      setCurrentStep((prev) => prev + 1);
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isPlaying, currentStep, speed, executeStep]);

  const handlePlay = () => {
    if (currentStep >= stepsRef.current.length) {
      handleReset();
    }
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setDisplayData([...data]);
    setBarStates({});
    setCurrentDescription('');
    setOperationsCount({ comparisons: 0, swaps: 0, arrayAccesses: 0 });
    setElapsedTime(0);
    startTimeRef.current = 0;
  };

  const handleStepForward = () => {
    if (currentStep < stepsRef.current.length) {
      executeStep(currentStep);
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleStepBackward = () => {
    if (currentStep > 0) {
      const newStep = currentStep - 1;
      setCurrentStep(newStep);

      // Reset to initial state
      setDisplayData([...data]);
      setBarStates({});
      setOperationsCount({ comparisons: 0, swaps: 0, arrayAccesses: 0 });

      // Replay all steps up to newStep
      const validTypes = ['compare', 'swap', 'sorted', 'active', 'minimum'] as const;
      for (let i = 0; i < newStep; i++) {
        const step = stepsRef.current[i];
        const stepData = arrayStatesRef.current[i + 1] || data;
        setDisplayData([...stepData]);

        const newStates: Record<number, 'compare' | 'swap' | 'sorted' | 'active' | 'minimum'> = {};
        step.indices.forEach((idx) => {
          if (validTypes.includes(step.type as (typeof validTypes)[number])) {
            newStates[idx] = step.type as 'compare' | 'swap' | 'sorted' | 'active' | 'minimum';
          }
        });
        setBarStates(newStates);

        setOperationsCount((prev) => ({
          comparisons: prev.comparisons + (step.type === 'compare' ? 1 : 0),
          swaps: prev.swaps + (step.type === 'swap' ? 1 : 0),
          arrayAccesses: prev.arrayAccesses + step.indices.length,
        }));
      }

      // Show current step description
      if (newStep > 0) {
        setCurrentDescription(stepsRef.current[newStep - 1].description);
      } else {
        setCurrentDescription('');
      }
    }
  };

  const handleDataGenerated = (newData: number[]) => {
    setData(newData);
    setIsPlaying(false);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Sorting Algorithms</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Visualize how different sorting algorithms work step by step
        </p>
      </div>

      {/* Algorithm Selector and Input Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm flex flex-col">
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
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
              Select Algorithm
            </h2>
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {sortingAlgorithms.map((algo) => (
              <button
                key={algo.id}
                onClick={() => setSelectedAlgorithm(algo)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all shadow-sm ${
                  selectedAlgorithm.id === algo.id
                    ? 'bg-blue-600 text-white shadow-blue-200 dark:shadow-none ring-2 ring-blue-600 ring-offset-2 ring-offset-white dark:ring-offset-gray-900'
                    : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                }`}
              >
                {algo.name}
              </button>
            ))}
          </div>

          <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
              {selectedAlgorithm.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              {selectedAlgorithm.info.description}
            </p>
            
            <div className="grid grid-cols-1 gap-3 text-xs">
              <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
                <span className="font-semibold block mb-1 text-gray-500 dark:text-gray-400">Time Complexity (Average)</span>
                <div className="font-mono font-medium text-gray-900 dark:text-gray-200">
                  {selectedAlgorithm.info.complexity.time.average}
                </div>
              </div>
            </div>
          </div>
        </div>

        <InputPanel onDataGenerated={handleDataGenerated} title="Input Data" />
      </div>

      <div className="space-y-4">
        <ArrayVisualizer
          data={displayData}
          states={barStates}
          description={currentDescription || 'Generate data and select an algorithm to begin'}
          title="Visualization"
          explanation={
            <div className="space-y-2">
              <p>{selectedAlgorithm.info.description}</p>
            </div>
          }
        >
          <ControlPanel
            isPlaying={isPlaying}
            currentStep={currentStep}
            totalSteps={totalSteps}
            speed={speed}
            onPlayPause={handlePlayPause}
            onReset={handleReset}
            onStepForward={handleStepForward}
            onStepBackward={handleStepBackward}
            onSpeedChange={setSpeed}
            variant="minimal"
          />
        </ArrayVisualizer>

        <ComplexityDisplay
          complexity={selectedAlgorithm.info.complexity}
          timeComplexityDetails={selectedAlgorithm.info.timeComplexityDetails}
          title="Complexity Analysis"
        />

        <CodePanel
          code={selectedAlgorithm.code}
          language="typescript"
          title={`Implementation: ${selectedAlgorithm.name}`}
        />
      </div>
    </div>
  );
};

export default SortingPage;
