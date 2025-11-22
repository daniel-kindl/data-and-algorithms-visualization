/**
 * Generates a delay in milliseconds based on animation speed
 */
export const getAnimationDelay = (speed: number): number => {
  const baseDelay = 1000; // 1 second
  return baseDelay / speed;
};

/**
 * Creates a promise-based delay
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Generates an array of random numbers
 */
export const generateRandomArray = (size: number, min = 5, max = 100): number[] => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1)) + min);
};

/**
 * Generates a sorted array
 */
export const generateSortedArray = (size: number, min = 5, max = 100): number[] => {
  const arr = generateRandomArray(size, min, max);
  return arr.sort((a, b) => a - b);
};

/**
 * Generates a reverse sorted array
 */
export const generateReverseSortedArray = (size: number, min = 5, max = 100): number[] => {
  const arr = generateRandomArray(size, min, max);
  return arr.sort((a, b) => b - a);
};

/**
 * Generates a nearly sorted array (90% sorted).
 * Useful for testing algorithms like Insertion Sort which perform well on nearly sorted data.
 * It starts with a sorted array and performs a few random swaps to introduce disorder.
 */
export const generateNearlySortedArray = (size: number, min = 5, max = 100): number[] => {
  const arr = generateSortedArray(size, min, max);
  const swaps = Math.floor(size * 0.1); // 10% swaps

  for (let i = 0; i < swaps; i++) {
    const idx1 = Math.floor(Math.random() * size);
    const idx2 = Math.floor(Math.random() * size);
    [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
  }

  return arr;
};

/**
 * Clamps a value between min and max
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

/**
 * Formats a number to a fixed decimal places
 */
export const formatNumber = (num: number, decimals = 2): string => {
  return num.toFixed(decimals);
};

/**
 * Parses a comma-separated string of numbers into an array.
 * Handles extra whitespace and filters out invalid inputs (empty strings, non-numbers).
 * Used for processing user input from the custom data field.
 */
export const parseNumberArray = (input: string): number[] => {
  return input
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s !== '')
    .map(Number)
    .filter((n) => !isNaN(n));
};

/**
 * Validates if an array of numbers is valid for visualization.
 * Checks for size constraints and ensures all elements are finite numbers.
 * This prevents the visualizer from crashing or rendering incorrectly with extreme values.
 */
export const validateNumberArray = (arr: number[], minSize = 2, maxSize = 100): boolean => {
  if (arr.length < minSize || arr.length > maxSize) {
    return false;
  }
  return arr.every((n) => typeof n === 'number' && !isNaN(n) && isFinite(n));
};

/**
 * Swaps two elements in an array
 */
export const swap = <T>(arr: T[], i: number, j: number): void => {
  [arr[i], arr[j]] = [arr[j], arr[i]];
};

/**
 * Checks if an array is sorted in ascending order
 */
export const isSorted = (arr: number[]): boolean => {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) {
      return false;
    }
  }
  return true;
};

/**
 * Checks if two arrays are equal
 */
export const arrayEqual = (arr1: number[], arr2: number[]): boolean => {
  if (arr1.length !== arr2.length) {
    return false;
  }
  return arr1.every((val, index) => val === arr2[index]);
};
