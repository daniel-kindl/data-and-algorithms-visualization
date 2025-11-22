import type { AnimationStep } from '../../types';

/**
 * Queue Enqueue Operation - O(1) time complexity
 * Adds an element to the rear of the queue
 */
export function* queueEnqueue(
  queue: number[],
  value: number,
  capacity?: number,
): Generator<AnimationStep> {
  if (capacity && queue.length >= capacity) {
    yield {
      type: 'highlight',
      indices: [],
      description: `❌ Queue is full! Cannot enqueue ${value} (capacity: ${capacity})`,
    };
    return;
  }

  yield {
    type: 'highlight',
    indices: [],
    description: `Enqueuing ${value} at the rear of the queue`,
  };

  queue.push(value);
  const rearIndex = queue.length - 1;

  yield {
    type: 'insert',
    indices: [rearIndex],
    description: `✅ Enqueued ${value}. Queue size: ${queue.length}`,
  };

  if (queue.length === 1) {
    yield {
      type: 'active',
      indices: [0],
      description: `Front and rear both point to ${value}`,
    };
  } else {
    yield {
      type: 'active',
      indices: [0, rearIndex],
      description: `Front: ${queue[0]}, Rear: ${queue[rearIndex]}`,
    };
  }
}

/**
 * Queue Dequeue Operation - O(1) time complexity (with shift optimization)
 * Removes and returns the element from the front of the queue
 */
export function* queueDequeue(queue: number[]): Generator<AnimationStep> {
  if (queue.length === 0) {
    yield {
      type: 'highlight',
      indices: [],
      description: '❌ Queue is empty! Cannot dequeue',
    };
    return;
  }

  const dequeuedValue = queue[0];

  yield {
    type: 'highlight',
    indices: [0],
    description: `Dequeuing ${dequeuedValue} from the front`,
  };

  yield {
    type: 'delete',
    indices: [0],
    description: `Removing front element ${dequeuedValue}`,
  };

  // Shift all elements to the left
  for (let i = 0; i < queue.length - 1; i++) {
    yield {
      type: 'active',
      indices: [i, i + 1],
      description: `Shifting ${queue[i + 1]} from position ${i + 1} to ${i}`,
    };
  }

  queue.shift();

  if (queue.length > 0) {
    yield {
      type: 'active',
      indices: [0],
      description: `✅ Dequeued ${dequeuedValue}. New front: ${queue[0]}. Queue size: ${queue.length}`,
    };
  } else {
    yield {
      type: 'highlight',
      indices: [],
      description: `✅ Dequeued ${dequeuedValue}. Queue is now empty`,
    };
  }
}

/**
 * Queue Peek/Front Operation - O(1) time complexity
 * Returns the front element without removing it
 */
export function* queuePeek(queue: number[]): Generator<AnimationStep> {
  if (queue.length === 0) {
    yield {
      type: 'highlight',
      indices: [],
      description: '❌ Cannot peek. Queue is empty',
    };
    return;
  }

  const frontValue = queue[0];

  yield {
    type: 'highlight',
    indices: [0],
    description: 'Peeking at front of queue',
  };

  yield {
    type: 'search',
    indices: [0],
    description: `✅ Front element is ${frontValue}. Queue size: ${queue.length}`,
  };
}

/**
 * Queue Search Operation - O(n) time complexity
 * Searches for a value in the queue (from front to rear)
 */
export function* queueSearch(queue: number[], target: number): Generator<AnimationStep> {
  if (queue.length === 0) {
    yield {
      type: 'highlight',
      indices: [],
      description: '❌ Queue is empty',
    };
    return;
  }

  yield {
    type: 'highlight',
    indices: [],
    description: `Searching for ${target} in queue (front to rear)`,
  };

  // Search from front to rear
  for (let i = 0; i < queue.length; i++) {
    yield {
      type: 'compare',
      indices: [i],
      description: `Checking position ${i + 1}: ${queue[i]} ${queue[i] === target ? '==' : '!='} ${target}`,
    };

    if (queue[i] === target) {
      yield {
        type: 'search',
        indices: [i],
        description: `✅ Found ${target} at position ${i + 1} from front`,
      };
      return;
    }
  }

  yield {
    type: 'highlight',
    indices: [],
    description: `❌ ${target} not found in queue`,
  };
}

/**
 * Queue Rear Operation - O(1) time complexity
 * Returns the rear element without removing it
 */
export function* queueRear(queue: number[]): Generator<AnimationStep> {
  if (queue.length === 0) {
    yield {
      type: 'highlight',
      indices: [],
      description: '❌ Cannot get rear. Queue is empty',
    };
    return;
  }

  const rearIndex = queue.length - 1;
  const rearValue = queue[rearIndex];

  yield {
    type: 'highlight',
    indices: [rearIndex],
    description: 'Getting rear element',
  };

  yield {
    type: 'search',
    indices: [rearIndex],
    description: `✅ Rear element is ${rearValue}. Queue size: ${queue.length}`,
  };
}

/**
 * Queue isEmpty Operation - O(1) time complexity
 * Checks if the queue is empty
 */
export function* queueIsEmpty(queue: number[]): Generator<AnimationStep> {
  yield {
    type: 'highlight',
    indices: [],
    description: 'Checking if queue is empty...',
  };

  const isEmpty = queue.length === 0;

  yield {
    type: isEmpty ? 'highlight' : 'search',
    indices: isEmpty ? [] : [0, queue.length - 1],
    description: `✅ Queue is ${isEmpty ? 'EMPTY' : 'NOT EMPTY'} (size: ${queue.length})`,
  };
}

/**
 * Queue Size Operation - O(1) time complexity
 * Returns the current size of the queue
 */
export function* queueSize(queue: number[]): Generator<AnimationStep> {
  yield {
    type: 'highlight',
    indices: queue.length > 0 ? Array.from({ length: queue.length }, (_, i) => i) : [],
    description: 'Counting queue elements...',
  };

  yield {
    type: 'search',
    indices: queue.length > 0 ? Array.from({ length: queue.length }, (_, i) => i) : [],
    description: `✅ Queue size: ${queue.length} element${queue.length !== 1 ? 's' : ''}`,
  };
}

/**
 * Get complexity information for queue operations
 */
export const queueComplexity = {
  enqueue: {
    time: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
    space: 'O(1)',
  },
  dequeue: {
    time: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
    space: 'O(1)',
    note: 'O(n) with array shift, O(1) with circular buffer or linked list',
  },
  peek: {
    time: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
    space: 'O(1)',
  },
  search: {
    time: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
    space: 'O(1)',
  },
  rear: {
    time: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
    space: 'O(1)',
  },
  isEmpty: {
    time: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
    space: 'O(1)',
  },
  size: {
    time: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
    space: 'O(1)',
  },
};
