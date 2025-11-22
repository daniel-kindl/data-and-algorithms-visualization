import type { AnimationStep, AlgorithmInfo } from '../../types';

export const quickSortInfo: AlgorithmInfo = {
  name: 'Quick Sort',
  category: 'sorting',
  complexity: {
    time: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)',
    },
    space: 'O(log n)',
  },
  description:
    'Quick Sort is a divide-and-conquer algorithm that picks a pivot element and partitions the array around it, then recursively sorts the subarrays.',
};

export const quickSortCode = `function quickSort(arr: number[], low: number, high: number): void {
  if (low < high) {
    const pivotIndex = partition(arr, low, high);
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
}

function partition(arr: number[], low: number, high: number): number {
  const pivot = arr[high];
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`;

export function* quickSort(arr: number[]): Generator<AnimationStep> {
  yield* quickSortHelper(arr, 0, arr.length - 1);

  yield {
    type: 'sorted',
    indices: Array.from({ length: arr.length }, (_, i) => i),
    description: 'Sorting complete!',
  };
}

function* quickSortHelper(arr: number[], low: number, high: number): Generator<AnimationStep> {
  if (low < high) {
    const pivotIndex = yield* partition(arr, low, high);
    yield* quickSortHelper(arr, low, pivotIndex - 1);
    yield* quickSortHelper(arr, pivotIndex + 1, high);
  }
}

function* partition(arr: number[], low: number, high: number): Generator<AnimationStep, number> {
  const pivot = arr[high];
  let i = low - 1;

  yield {
    type: 'active',
    indices: [high],
    description: `Pivot selected: ${pivot}`,
  };

  for (let j = low; j < high; j++) {
    yield {
      type: 'compare',
      indices: [j, high],
      description: `Comparing ${arr[j]} with pivot ${pivot}`,
    };

    if (arr[j] < pivot) {
      i++;
      if (i !== j) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        yield {
          type: 'swap',
          indices: [i, j],
          description: `Swapping ${arr[i]} and ${arr[j]}`,
        };
      }
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  yield {
    type: 'swap',
    indices: [i + 1, high],
    description: `Placing pivot ${arr[i + 1]} at correct position`,
  };

  yield {
    type: 'sorted',
    indices: [i + 1],
    description: `Pivot ${arr[i + 1]} is now in its final position`,
  };

  return i + 1;
}
