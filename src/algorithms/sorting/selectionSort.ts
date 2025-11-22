import type { AnimationStep, AlgorithmInfo } from '../../types';

export const selectionSortInfo: AlgorithmInfo = {
  name: 'Selection Sort',
  category: 'sorting',
  complexity: {
    time: {
      best: 'O(n²)',
      average: 'O(n²)',
      worst: 'O(n²)',
    },
    space: 'O(1)',
  },
  description:
    'Selection Sort divides the array into a sorted and unsorted region. It repeatedly selects the smallest element from the unsorted region and moves it to the end of the sorted region.',
};

export const selectionSortCode = `function selectionSort(arr: number[]): number[] {
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    
    // Find the minimum element in unsorted array
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    
    // Swap the minimum with the first element
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  
  return arr;
}`;

export function* selectionSort(arr: number[]): Generator<AnimationStep> {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;

    yield {
      type: 'minimum',
      indices: [i],
      description: `Starting position ${i}, current minimum: ${arr[minIndex]}`,
    };

    for (let j = i + 1; j < n; j++) {
      yield {
        type: 'compare',
        indices: [minIndex, j],
        description: `Comparing current minimum ${arr[minIndex]} with ${arr[j]}`,
      };

      if (arr[j] < arr[minIndex]) {
        minIndex = j;
        yield {
          type: 'minimum',
          indices: [minIndex],
          description: `New minimum found: ${arr[minIndex]} at index ${minIndex}`,
        };
      }
    }

    if (minIndex !== i) {
      yield {
        type: 'swap',
        indices: [i, minIndex],
        description: `Swapping ${arr[i]} with minimum ${arr[minIndex]}`,
      };

      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }

    yield {
      type: 'sorted',
      indices: [i],
      description: `Element ${arr[i]} is now in its correct position`,
    };
  }

  yield {
    type: 'sorted',
    indices: [n - 1],
    description: 'Sorting complete!',
  };
}
