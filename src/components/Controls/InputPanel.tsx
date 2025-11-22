import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  generateRandomArray,
  generateSortedArray,
  generateReverseSortedArray,
  generateNearlySortedArray,
  parseNumberArray,
  validateNumberArray,
} from '../../utils/helpers';

interface InputPanelProps {
  onDataGenerated: (data: number[]) => void;
  minSize?: number;
  maxSize?: number;
  defaultSize?: number;
  title?: string;
}

const InputPanel = ({
  onDataGenerated,
  minSize = 5,
  maxSize = 50,
  defaultSize = 20,
  title = 'Input Data',
}: InputPanelProps) => {
  const [arraySize, setArraySize] = useState(defaultSize);
  const [customInput, setCustomInput] = useState('');
  const [error, setError] = useState('');

  const handleRandomArray = () => {
    const arr = generateRandomArray(arraySize);
    onDataGenerated(arr);
    setError('');
  };

  const handleSortedArray = () => {
    const arr = generateSortedArray(arraySize);
    onDataGenerated(arr);
    setError('');
  };

  const handleReverseSorted = () => {
    const arr = generateReverseSortedArray(arraySize);
    onDataGenerated(arr);
    setError('');
  };

  const handleNearlySorted = () => {
    const arr = generateNearlySortedArray(arraySize);
    onDataGenerated(arr);
    setError('');
  };

  const handleCustomInput = () => {
    const arr = parseNumberArray(customInput);

    if (arr.length === 0) {
      setError('Please enter valid numbers separated by commas');
      return;
    }

    if (!validateNumberArray(arr, minSize, maxSize)) {
      setError(`Array must have between ${minSize} and ${maxSize} elements`);
      return;
    }

    onDataGenerated(arr);
    setError('');
    setCustomInput('');
  };

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <svg
            className="w-6 h-6 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
            />
          </svg>
          {title}
        </h2>
      </div>

      <div className="space-y-4">
        {/* Array Size Slider */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3 border border-gray-100 dark:border-gray-800">
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <svg
                className="w-4 h-4 text-gray-500"
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
              Array Size
            </label>
            <span className="px-2 py-1 bg-white dark:bg-gray-700 rounded text-xs font-mono font-semibold text-blue-600 dark:text-blue-400 border border-gray-200 dark:border-gray-600">
              {arraySize}
            </span>
          </div>
          <input
            type="range"
            min={minSize}
            max={maxSize}
            value={arraySize}
            onChange={(e) => setArraySize(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600 hover:accent-blue-700 transition-all"
          />
          <div className="flex justify-between mt-1 text-xs text-gray-400">
            <span>{minSize}</span>
            <span>{maxSize}</span>
          </div>
        </div>

        {/* Prominent Random Data Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleRandomArray}
          className="w-full px-3 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
        >
          <svg
            className="w-5 h-5"
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

        {/* Preset Data Buttons */}
        <div>
          <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 block">
            Presets
          </label>
          <div className="grid grid-cols-3 gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSortedArray}
              className="px-3 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-lg transition-colors border border-gray-200 dark:border-gray-700 flex flex-col items-center gap-1"
            >
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                />
              </svg>
              Sorted
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReverseSorted}
              className="px-3 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-lg transition-colors border border-gray-200 dark:border-gray-700 flex flex-col items-center gap-1"
            >
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 4h13M3 8h9m-9 4h5m4 0l4-4m0 0l4 4m-4-4v12"
                  transform="scale(1, -1) translate(0, -24)"
                />
              </svg>
              Reverse
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNearlySorted}
              className="px-3 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-lg transition-colors border border-gray-200 dark:border-gray-700 flex flex-col items-center gap-1"
            >
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 8h16M4 16h16"
                />
              </svg>
              Nearly
            </motion.button>
          </div>
        </div>

        {/* Custom Input */}
        <div>
          <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 block">
            Custom Input
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="e.g., 5, 2, 8, 1, 9"
              className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCustomInput}
              className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded-xl transition-colors shadow-sm hover:shadow flex items-center gap-1"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Apply
            </motion.button>
          </div>
          {error && (
            <div className="flex items-center gap-1 mt-2 text-red-600 dark:text-red-400 text-xs">
              <svg
                className="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {error}
            </div>
          )}
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 ml-1">
            Enter numbers separated by commas ({minSize}-{maxSize} elements)
          </p>
        </div>
      </div>
    </div>
  );
};

export default InputPanel;
