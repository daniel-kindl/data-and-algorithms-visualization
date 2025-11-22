import type { AnimationStep } from '../../types';

/**
 * Heap Insert (Min-Heap) - O(log n) time complexity
 * Adds element at end and bubbles up to maintain heap property
 */
export function* heapInsert(heap: number[], value: number): Generator<AnimationStep> {
  yield {
    type: 'highlight',
    indices: [],
    description: `Inserting ${value} into min-heap`,
  };

  // Add to end of heap
  heap.push(value);
  const insertIndex = heap.length - 1;

  yield {
    type: 'insert',
    indices: [insertIndex],
    description: `Added ${value} at index ${insertIndex}`,
  };

  // Bubble up
  let currentIndex = insertIndex;

  while (currentIndex > 0) {
    const parentIndex = Math.floor((currentIndex - 1) / 2);
    const parentValue = heap[parentIndex];

    yield {
      type: 'compare',
      indices: [currentIndex, parentIndex],
      description: `Comparing ${heap[currentIndex]} with parent ${parentValue}`,
    };

    if (heap[currentIndex] >= parentValue) {
      yield {
        type: 'sorted',
        indices: [currentIndex],
        description: `Min-heap property satisfied. Heap size: ${heap.length}`,
      };
      break;
    }

    // Swap with parent
    [heap[currentIndex], heap[parentIndex]] = [heap[parentIndex], heap[currentIndex]];

    yield {
      type: 'swap',
      indices: [currentIndex, parentIndex],
      description: `Swapped ${heap[parentIndex]} with parent ${heap[currentIndex]}`,
    };

    currentIndex = parentIndex;
  }

  if (currentIndex === 0) {
    yield {
      type: 'sorted',
      indices: [0],
      description: `${heap[0]} is now the root. Heap size: ${heap.length}`,
    };
  }
}

/**
 * Heap Extract Min - O(log n) time complexity
 * Removes and returns minimum element (root), then heapifies
 */
export function* heapExtractMin(heap: number[]): Generator<AnimationStep> {
  if (heap.length === 0) {
    yield {
      type: 'highlight',
      indices: [],
      description: 'Heap is empty',
    };
    return;
  }

  const minValue = heap[0];

  yield {
    type: 'search',
    indices: [0],
    description: `Extracting minimum: ${minValue}`,
  };

  if (heap.length === 1) {
    heap.pop();
    yield {
      type: 'delete',
      indices: [],
      description: `Removed ${minValue}. Heap is now empty`,
    };
    return;
  }

  // Move last element to root
  heap[0] = heap[heap.length - 1];
  heap.pop();

  yield {
    type: 'swap',
    indices: [0],
    description: `Moved ${heap[0]} to root, removed ${minValue}`,
  };

  // Heapify down
  let currentIndex = 0;

  while (true) {
    const leftChildIndex = 2 * currentIndex + 1;
    const rightChildIndex = 2 * currentIndex + 2;
    let smallestIndex = currentIndex;

    yield {
      type: 'active',
      indices: [currentIndex],
      description: `Checking children of ${heap[currentIndex]}`,
    };

    // Check left child
    if (leftChildIndex < heap.length) {
      yield {
        type: 'compare',
        indices: [currentIndex, leftChildIndex],
        description: `Left child: ${heap[leftChildIndex]}`,
      };

      if (heap[leftChildIndex] < heap[smallestIndex]) {
        smallestIndex = leftChildIndex;
      }
    }

    // Check right child
    if (rightChildIndex < heap.length) {
      yield {
        type: 'compare',
        indices: [smallestIndex, rightChildIndex],
        description: `Right child: ${heap[rightChildIndex]}`,
      };

      if (heap[rightChildIndex] < heap[smallestIndex]) {
        smallestIndex = rightChildIndex;
      }
    }

    // If current is smallest, we're done
    if (smallestIndex === currentIndex) {
      yield {
        type: 'sorted',
        indices: [currentIndex],
        description: `Min-heap property restored. Heap size: ${heap.length}`,
      };
      break;
    }

    // Swap with smallest child
    [heap[currentIndex], heap[smallestIndex]] = [heap[smallestIndex], heap[currentIndex]];

    yield {
      type: 'swap',
      indices: [currentIndex, smallestIndex],
      description: `Swapped ${heap[smallestIndex]} with ${heap[currentIndex]}`,
    };

    currentIndex = smallestIndex;
  }
}

/**
 * Heapify - Build a min-heap from an array - O(n) time complexity
 */
export function* heapify(heap: number[]): Generator<AnimationStep> {
  if (heap.length <= 1) {
    yield {
      type: 'sorted',
      indices: [],
      description: 'Array is already a valid heap',
    };
    return;
  }

  yield {
    type: 'highlight',
    indices: [],
    description: `Building min-heap from array of ${heap.length} elements`,
  };

  // Start from last non-leaf node
  const startIndex = Math.floor(heap.length / 2) - 1;

  for (let i = startIndex; i >= 0; i--) {
    yield {
      type: 'active',
      indices: [i],
      description: `Heapifying subtree rooted at index ${i} (value: ${heap[i]})`,
    };

    yield* heapifyDown(heap, i, heap.length);
  }

  yield {
    type: 'sorted',
    indices: Array.from({ length: heap.length }, (_, i) => i),
    description: `Min-heap built successfully. Root: ${heap[0]}`,
  };
}

/**
 * Heapify Down - Helper function
 */
function* heapifyDown(heap: number[], index: number, heapSize: number): Generator<AnimationStep> {
  let currentIndex = index;

  while (true) {
    const leftChildIndex = 2 * currentIndex + 1;
    const rightChildIndex = 2 * currentIndex + 2;
    let smallestIndex = currentIndex;

    if (leftChildIndex < heapSize && heap[leftChildIndex] < heap[smallestIndex]) {
      smallestIndex = leftChildIndex;
    }

    if (rightChildIndex < heapSize && heap[rightChildIndex] < heap[smallestIndex]) {
      smallestIndex = rightChildIndex;
    }

    if (smallestIndex === currentIndex) {
      break;
    }

    yield {
      type: 'compare',
      indices: [currentIndex, smallestIndex],
      description: `Swapping ${heap[currentIndex]} with ${heap[smallestIndex]}`,
    };

    [heap[currentIndex], heap[smallestIndex]] = [heap[smallestIndex], heap[currentIndex]];

    yield {
      type: 'swap',
      indices: [currentIndex, smallestIndex],
      description: 'Swapped to maintain heap property',
    };

    currentIndex = smallestIndex;
  }
}

/**
 * Heap Peek - O(1) time complexity
 */
export function* heapPeek(heap: number[]): Generator<AnimationStep> {
  if (heap.length === 0) {
    yield {
      type: 'highlight',
      indices: [],
      description: 'Heap is empty',
    };
    return;
  }

  yield {
    type: 'search',
    indices: [0],
    description: `Minimum value: ${heap[0]}`,
  };
}

/**
 * Heap Size - O(1) time complexity
 */
export function* heapSize(heap: number[]): Generator<AnimationStep> {
  yield {
    type: 'highlight',
    indices: heap.length > 0 ? Array.from({ length: heap.length }, (_, i) => i) : [],
    description: `Heap size: ${heap.length}`,
  };
}

/**
 * Heap IsEmpty - O(1) time complexity
 */
export function* heapIsEmpty(heap: number[]): Generator<AnimationStep> {
  yield {
    type: 'highlight',
    indices: [],
    description: heap.length === 0 ? 'Heap is empty' : `Heap has ${heap.length} elements`,
  };
}

/**
 * Heap Sort - O(n log n) time complexity
 * Sorts array in ascending order using heap
 */
export function* heapSort(heap: number[]): Generator<AnimationStep> {
  if (heap.length <= 1) {
    yield {
      type: 'sorted',
      indices: [],
      description: 'Array is already sorted',
    };
    return;
  }

  yield {
    type: 'highlight',
    indices: [],
    description: `Starting heap sort on ${heap.length} elements`,
  };

  // Build max-heap (for ascending sort)
  yield {
    type: 'active',
    indices: [],
    description: 'Step 1: Building max-heap',
  };

  for (let i = Math.floor(heap.length / 2) - 1; i >= 0; i--) {
    yield* heapifyDownMax(heap, i, heap.length);
  }

  // Extract elements one by one
  for (let i = heap.length - 1; i > 0; i--) {
    yield {
      type: 'compare',
      indices: [0, i],
      description: `Swapping root ${heap[0]} with ${heap[i]}`,
    };

    [heap[0], heap[i]] = [heap[i], heap[0]];

    yield {
      type: 'swap',
      indices: [0, i],
      description: `${heap[i]} is now in sorted position`,
    };

    yield* heapifyDownMax(heap, 0, i);
  }

  yield {
    type: 'sorted',
    indices: Array.from({ length: heap.length }, (_, i) => i),
    description: 'Array sorted successfully',
  };
}

/**
 * Heapify Down Max - Helper for max-heap (used in heap sort)
 */
function* heapifyDownMax(
  heap: number[],
  index: number,
  heapSize: number,
): Generator<AnimationStep> {
  let currentIndex = index;

  while (true) {
    const leftChildIndex = 2 * currentIndex + 1;
    const rightChildIndex = 2 * currentIndex + 2;
    let largestIndex = currentIndex;

    if (leftChildIndex < heapSize && heap[leftChildIndex] > heap[largestIndex]) {
      largestIndex = leftChildIndex;
    }

    if (rightChildIndex < heapSize && heap[rightChildIndex] > heap[largestIndex]) {
      largestIndex = rightChildIndex;
    }

    if (largestIndex === currentIndex) {
      break;
    }

    [heap[currentIndex], heap[largestIndex]] = [heap[largestIndex], heap[currentIndex]];

    yield {
      type: 'swap',
      indices: [currentIndex, largestIndex],
      description: `Heapifying: swapped ${heap[largestIndex]} with ${heap[currentIndex]}`,
    };

    currentIndex = largestIndex;
  }
}

export const heapComplexity = {
  insert: {
    time: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' },
    space: 'O(1)',
    description: 'Bubble up to maintain heap property',
  },
  extractMin: {
    time: { best: 'O(log n)', average: 'O(log n)', worst: 'O(log n)' },
    space: 'O(1)',
    description: 'Remove root and heapify down',
  },
  heapify: {
    time: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
    space: 'O(1)',
    description: 'Build heap from array in linear time',
  },
  peek: {
    time: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
    space: 'O(1)',
    description: 'Return root element',
  },
  heapSort: {
    time: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    space: 'O(1)',
    description: 'In-place sorting using heap',
  },
};
