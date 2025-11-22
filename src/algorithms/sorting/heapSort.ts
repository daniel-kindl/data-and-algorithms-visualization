import type { AnimationStep, AlgorithmInfo } from '../../types';

export const heapSortInfo: AlgorithmInfo = {
  name: 'Heap Sort',
  category: 'sorting',
  complexity: {
    time: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
    },
    space: 'O(1)',
  },
  description:
    'Heap Sort builds a max heap from the array, then repeatedly extracts the maximum element and rebuilds the heap until the array is sorted.',
};

export const heapSortCode = `function heapSort(arr: number[]): number[] {
  const n = arr.length;
  
  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  
  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  
  return arr;
}

function heapify(arr: number[], n: number, i: number): void {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  
  if (left < n && arr[left] > arr[largest]) largest = left;
  if (right < n && arr[right] > arr[largest]) largest = right;
  
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}`;

export function* heapSort(arr: number[]): Generator<AnimationStep> {
  const n = arr.length;

  function* heapify(arr: number[], heapSize: number, i: number): Generator<AnimationStep> {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    yield {
      type: 'active',
      indices: [i],
      description: `Heapifying at index ${i}`,
    };

    if (left < heapSize) {
      yield {
        type: 'compare',
        indices: [left, largest],
        description: `Comparing left child ${arr[left]} with ${arr[largest]}`,
      };

      if (arr[left] > arr[largest]) {
        largest = left;
      }
    }

    if (right < heapSize) {
      yield {
        type: 'compare',
        indices: [right, largest],
        description: `Comparing right child ${arr[right]} with ${arr[largest]}`,
      };

      if (arr[right] > arr[largest]) {
        largest = right;
      }
    }

    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];

      yield {
        type: 'swap',
        indices: [i, largest],
        description: `Swapping ${arr[i]} and ${arr[largest]}`,
      };

      yield* heapify(arr, heapSize, largest);
    }
  }

  // Build max heap
  yield {
    type: 'active',
    indices: Array.from({ length: n }, (_, i) => i),
    description: 'Building max heap',
  };

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    yield* heapify(arr, n, i);
  }

  // Extract elements from heap
  for (let i = n - 1; i > 0; i--) {
    yield {
      type: 'swap',
      indices: [0, i],
      description: `Moving max element ${arr[0]} to sorted position`,
    };

    [arr[0], arr[i]] = [arr[i], arr[0]];

    yield {
      type: 'sorted',
      indices: [i],
      description: `Element ${arr[i]} is now in its final position`,
    };

    yield* heapify(arr, i, 0);
  }

  yield {
    type: 'sorted',
    indices: [0],
    description: 'Sorting complete!',
  };
}
