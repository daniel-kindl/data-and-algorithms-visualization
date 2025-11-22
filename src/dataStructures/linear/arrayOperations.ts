import type { AnimationStep } from '../../types';

/**
 * Array Insert Operation - O(n) time complexity
 * Inserts a value at a specific index, shifting elements to the right
 */
export function* arrayInsert(
  arr: number[],
  index: number,
  value: number,
): Generator<AnimationStep> {
  if (index < 0 || index > arr.length) {
    yield {
      type: 'highlight',
      indices: [],
      description: `❌ Invalid index ${index}. Must be between 0 and ${arr.length}`,
    };
    return;
  }

  yield {
    type: 'highlight',
    indices: [index],
    description: `Inserting ${value} at index ${index}`,
  };

  // Shift elements to the right
  for (let i = arr.length - 1; i >= index; i--) {
    if (i >= 0) {
      yield {
        type: 'active',
        indices: [i, i + 1],
        description: `Shifting element ${arr[i]} from index ${i} to ${i + 1}`,
      };
    }
  }

  // Insert the new value
  arr.splice(index, 0, value);

  yield {
    type: 'insert',
    indices: [index],
    description: `✅ Inserted ${value} at index ${index}`,
  };

  yield {
    type: 'sorted',
    indices: Array.from({ length: arr.length }, (_, i) => i),
    description: `Array now has ${arr.length} elements`,
  };
}

/**
 * Array Delete Operation - O(n) time complexity
 * Deletes a value at a specific index, shifting elements to the left
 */
export function* arrayDelete(arr: number[], index: number): Generator<AnimationStep> {
  if (index < 0 || index >= arr.length) {
    yield {
      type: 'highlight',
      indices: [],
      description: `❌ Invalid index ${index}. Must be between 0 and ${arr.length - 1}`,
    };
    return;
  }

  const deletedValue = arr[index];

  yield {
    type: 'highlight',
    indices: [index],
    description: `Deleting element ${deletedValue} at index ${index}`,
  };

  // Shift elements to the left
  for (let i = index; i < arr.length - 1; i++) {
    yield {
      type: 'active',
      indices: [i, i + 1],
      description: `Shifting element ${arr[i + 1]} from index ${i + 1} to ${i}`,
    };
  }

  // Delete the element
  arr.splice(index, 1);

  yield {
    type: 'delete',
    indices: [],
    description: `✅ Deleted ${deletedValue} from index ${index}`,
  };

  yield {
    type: 'sorted',
    indices: Array.from({ length: arr.length }, (_, i) => i),
    description: `Array now has ${arr.length} elements`,
  };
}

/**
 * Array Search Operation - O(n) time complexity
 * Linear search for a value in the array
 */
export function* arraySearch(arr: number[], target: number): Generator<AnimationStep> {
  yield {
    type: 'highlight',
    indices: [],
    description: `Searching for ${target} in array`,
  };

  for (let i = 0; i < arr.length; i++) {
    yield {
      type: 'compare',
      indices: [i],
      description: `Checking index ${i}: ${arr[i]} ${arr[i] === target ? '==' : '!='} ${target}`,
    };

    if (arr[i] === target) {
      yield {
        type: 'search',
        indices: [i],
        description: `✅ Found ${target} at index ${i}`,
      };
      return;
    }
  }

  yield {
    type: 'highlight',
    indices: [],
    description: `❌ ${target} not found in array`,
  };
}

/**
 * Array Access Operation - O(1) time complexity
 * Accesses a value at a specific index
 */
export function* arrayAccess(arr: number[], index: number): Generator<AnimationStep> {
  if (index < 0 || index >= arr.length) {
    yield {
      type: 'highlight',
      indices: [],
      description: `❌ Invalid index ${index}. Must be between 0 and ${arr.length - 1}`,
    };
    return;
  }

  yield {
    type: 'highlight',
    indices: [index],
    description: `Accessing element at index ${index}...`,
  };

  yield {
    type: 'search',
    indices: [index],
    description: `✅ arr[${index}] = ${arr[index]} (Direct access in O(1) time)`,
  };
}

/**
 * Array Update Operation - O(1) time complexity
 * Updates a value at a specific index
 */
export function* arrayUpdate(
  arr: number[],
  index: number,
  newValue: number,
): Generator<AnimationStep> {
  if (index < 0 || index >= arr.length) {
    yield {
      type: 'highlight',
      indices: [],
      description: `❌ Invalid index ${index}. Must be between 0 and ${arr.length - 1}`,
    };
    return;
  }

  const oldValue = arr[index];

  yield {
    type: 'highlight',
    indices: [index],
    description: `Updating index ${index}: ${oldValue} → ${newValue}`,
  };

  arr[index] = newValue;

  yield {
    type: 'insert',
    indices: [index],
    description: `✅ Updated index ${index} to ${newValue}`,
  };
}

/**
 * Get complexity information for array operations
 */
export const arrayOperationsComplexity = {
  access: {
    time: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
    space: 'O(1)',
  },
  search: {
    time: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
    space: 'O(1)',
  },
  insert: {
    time: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
    space: 'O(1)',
  },
  delete: {
    time: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
    space: 'O(1)',
  },
};
