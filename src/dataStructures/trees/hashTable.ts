import type { AnimationStep } from '../../types';

export interface HashEntry {
  key: number;
  value: number;
  index: number;
}

export interface HashTableState {
  table: (HashEntry | null)[];
  size: number;
  capacity: number;
  collisions: number;
}

/**
 * Simple hash function - Division method
 */
export function hashFunction(key: number, capacity: number): number {
  return Math.abs(key) % capacity;
}

/**
 * Hash Table Insert - O(1) average, O(n) worst with collisions
 * Uses linear probing for collision resolution
 */
export function* hashTableInsert(
  state: HashTableState,
  key: number,
  value: number,
): Generator<AnimationStep> {
  yield {
    type: 'highlight',
    indices: [],
    description: `Inserting key=${key}, value=${value}`,
  };

  // Check load factor
  const loadFactor = state.size / state.capacity;
  if (loadFactor >= 0.7) {
    yield {
      type: 'highlight',
      indices: [],
      description: `Load factor ${loadFactor.toFixed(2)} >= 0.7 (consider resizing)`,
    };
  }

  const hash = hashFunction(key, state.capacity);

  yield {
    type: 'active',
    indices: [hash],
    description: `Hash(${key}) = ${key} % ${state.capacity} = ${hash}`,
  };

  let index = hash;
  let probes = 0;
  const maxProbes = state.capacity;

  // Linear probing
  while (probes < maxProbes) {
    const entry = state.table[index];

    if (entry === null) {
      // Empty slot found
      state.table[index] = { key, value, index };
      state.size++;

      yield {
        type: 'insert',
        indices: [index],
        description: `Inserted at index ${index}${probes > 0 ? ` after ${probes} probes` : ''}. Size: ${state.size}/${state.capacity}`,
      };
      return;
    }

    if (entry.key === key) {
      // Update existing key
      const oldValue = entry.value;
      entry.value = value;

      yield {
        type: 'insert',
        indices: [index],
        description: `Updated key ${key}: ${oldValue} -> ${value}`,
      };
      return;
    }

    // Collision - probe next slot
    state.collisions++;
    probes++;

    yield {
      type: 'compare',
      indices: [index],
      description: `Collision at index ${index} (occupied by key ${entry.key}). Probing...`,
    };

    index = (index + 1) % state.capacity;

    yield {
      type: 'active',
      indices: [index],
      description: `Probe ${probes}: Checking index ${index}`,
    };
  }

  yield {
    type: 'highlight',
    indices: [],
    description: `Table is full (${state.size}/${state.capacity})`,
  };
}

/**
 * Hash Table Search - O(1) average, O(n) worst
 */
export function* hashTableSearch(state: HashTableState, key: number): Generator<AnimationStep> {
  yield {
    type: 'highlight',
    indices: [],
    description: `Searching for key ${key}`,
  };

  const hash = hashFunction(key, state.capacity);

  yield {
    type: 'active',
    indices: [hash],
    description: `Hash(${key}) = ${hash}`,
  };

  let index = hash;
  let probes = 0;
  const maxProbes = state.capacity;

  while (probes < maxProbes) {
    const entry = state.table[index];

    yield {
      type: 'compare',
      indices: [index],
      description: `Probe ${probes + 1}: Checking index ${index}`,
    };

    if (entry === null) {
      yield {
        type: 'highlight',
        indices: [index],
        description: `Key ${key} not found (empty slot at index ${index})`,
      };
      return;
    }

    if (entry.key === key) {
      yield {
        type: 'search',
        indices: [index],
        description: `Found key ${key} with value ${entry.value} at index ${index}`,
      };
      return;
    }

    probes++;
    index = (index + 1) % state.capacity;
  }

  yield {
    type: 'highlight',
    indices: [],
    description: `Key ${key} not found after ${probes} probes`,
  };
}

/**
 * Hash Table Delete - O(1) average, O(n) worst
 */
export function* hashTableDelete(state: HashTableState, key: number): Generator<AnimationStep> {
  yield {
    type: 'highlight',
    indices: [],
    description: `Deleting key ${key}`,
  };

  const hash = hashFunction(key, state.capacity);

  yield {
    type: 'active',
    indices: [hash],
    description: `Hash(${key}) = ${hash}`,
  };

  let index = hash;
  let probes = 0;
  const maxProbes = state.capacity;

  while (probes < maxProbes) {
    const entry = state.table[index];

    yield {
      type: 'compare',
      indices: [index],
      description: `Checking index ${index}`,
    };

    if (entry === null) {
      yield {
        type: 'highlight',
        indices: [index],
        description: `Key ${key} not found`,
      };
      return;
    }

    if (entry.key === key) {
      state.table[index] = null;
      state.size--;

      yield {
        type: 'delete',
        indices: [index],
        description: `Deleted key ${key} (value: ${entry.value}). Size: ${state.size}/${state.capacity}`,
      };
      return;
    }

    probes++;
    index = (index + 1) % state.capacity;
  }

  yield {
    type: 'highlight',
    indices: [],
    description: `Key ${key} not found`,
  };
}

/**
 * Hash Table Get Keys - O(n) time complexity
 */
export function* hashTableGetKeys(state: HashTableState): Generator<AnimationStep> {
  yield {
    type: 'highlight',
    indices: [],
    description: 'Retrieving all keys',
  };

  const keys: number[] = [];

  for (let i = 0; i < state.capacity; i++) {
    const entry = state.table[i];

    if (entry !== null) {
      keys.push(entry.key);

      yield {
        type: 'active',
        indices: [i],
        description: `Found key ${entry.key} at index ${i}`,
      };
    }
  }

  yield {
    type: 'sorted',
    indices: keys.map((k) => {
      for (let i = 0; i < state.table.length; i++) {
        if (state.table[i]?.key === k) {return i;}
      }
      return 0;
    }),
    description: `Keys: [${keys.join(', ')}] (${keys.length} total)`,
  };
}

/**
 * Hash Table Get Load Factor - O(1)
 */
export function* hashTableLoadFactor(state: HashTableState): Generator<AnimationStep> {
  const loadFactor = state.size / state.capacity;

  yield {
    type: 'highlight',
    indices: [],
    description: `Load Factor: ${loadFactor.toFixed(2)} (${state.size}/${state.capacity})`,
  };

  if (loadFactor < 0.5) {
    yield {
      type: 'sorted',
      indices: [],
      description: 'Good load factor (< 0.5)',
    };
  } else if (loadFactor < 0.7) {
    yield {
      type: 'active',
      indices: [],
      description: 'Moderate load factor (0.5-0.7)',
    };
  } else {
    yield {
      type: 'highlight',
      indices: [],
      description: 'High load factor (>= 0.7) - consider resizing',
    };
  }
}

/**
 * Hash Table Clear - O(1)
 */
export function* hashTableClear(state: HashTableState): Generator<AnimationStep> {
  yield {
    type: 'highlight',
    indices: [],
    description: `Clearing hash table (${state.size} entries)`,
  };

  state.table = Array(state.capacity).fill(null);
  const oldSize = state.size;
  state.size = 0;
  state.collisions = 0;

  yield {
    type: 'delete',
    indices: [],
    description: `Cleared ${oldSize} entries. Table reset.`,
  };
}

/**
 * Hash Table Collision Stats - O(1)
 */
export function* hashTableCollisionStats(state: HashTableState): Generator<AnimationStep> {
  const avgProbes = state.size > 0 ? (state.collisions / state.size).toFixed(2) : '0.00';

  yield {
    type: 'highlight',
    indices: [],
    description: 'Collision Statistics:',
  };

  yield {
    type: 'active',
    indices: [],
    description: `Total collisions: ${state.collisions}`,
  };

  yield {
    type: 'active',
    indices: [],
    description: `Average probes per insert: ${avgProbes}`,
  };

  yield {
    type: 'sorted',
    indices: [],
    description: `Load factor: ${(state.size / state.capacity).toFixed(2)}`,
  };
}

export const hashTableComplexity = {
  insert: {
    time: { best: 'O(1)', average: 'O(1)', worst: 'O(n)' },
    space: 'O(1)',
    description: 'Constant time average, linear worst case with clustering',
  },
  search: {
    time: { best: 'O(1)', average: 'O(1)', worst: 'O(n)' },
    space: 'O(1)',
    description: 'Hash lookup with linear probing for collisions',
  },
  delete: {
    time: { best: 'O(1)', average: 'O(1)', worst: 'O(n)' },
    space: 'O(1)',
    description: 'Find and remove entry',
  },
  getKeys: {
    time: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
    space: 'O(n)',
    description: 'Iterate through entire table',
  },
};
