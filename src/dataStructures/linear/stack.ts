import type { AnimationStep } from '../../types';

/**
 * Stack Push Operation - O(1) time complexity
 * Adds an element to the top of the stack
 */
export function* stackPush(
  stack: number[],
  value: number,
  capacity?: number,
): Generator<AnimationStep> {
  if (capacity && stack.length >= capacity) {
    yield {
      type: 'highlight',
      indices: [],
      description: `❌ Stack Overflow! Cannot push ${value}. Stack is full (capacity: ${capacity})`,
    };
    return;
  }

  yield {
    type: 'highlight',
    indices: [],
    description: `Pushing ${value} onto the stack`,
  };

  stack.push(value);
  const topIndex = stack.length - 1;

  yield {
    type: 'insert',
    indices: [topIndex],
    description: `✅ Pushed ${value}. Stack size: ${stack.length}`,
  };

  yield {
    type: 'active',
    indices: [topIndex],
    description: `Top of stack is now ${value}`,
  };
}

/**
 * Stack Pop Operation - O(1) time complexity
 * Removes and returns the element from the top of the stack
 */
export function* stackPop(stack: number[]): Generator<AnimationStep> {
  if (stack.length === 0) {
    yield {
      type: 'highlight',
      indices: [],
      description: '❌ Stack Underflow! Cannot pop from empty stack',
    };
    return;
  }

  const topIndex = stack.length - 1;
  const poppedValue = stack[topIndex];

  yield {
    type: 'highlight',
    indices: [topIndex],
    description: `Popping ${poppedValue} from the stack`,
  };

  yield {
    type: 'delete',
    indices: [topIndex],
    description: `Removing top element ${poppedValue}`,
  };

  stack.pop();

  if (stack.length > 0) {
    yield {
      type: 'active',
      indices: [stack.length - 1],
      description: `✅ Popped ${poppedValue}. New top: ${stack[stack.length - 1]}. Stack size: ${stack.length}`,
    };
  } else {
    yield {
      type: 'highlight',
      indices: [],
      description: `✅ Popped ${poppedValue}. Stack is now empty`,
    };
  }
}

/**
 * Stack Peek Operation - O(1) time complexity
 * Returns the top element without removing it
 */
export function* stackPeek(stack: number[]): Generator<AnimationStep> {
  if (stack.length === 0) {
    yield {
      type: 'highlight',
      indices: [],
      description: '❌ Cannot peek. Stack is empty',
    };
    return;
  }

  const topIndex = stack.length - 1;
  const topValue = stack[topIndex];

  yield {
    type: 'highlight',
    indices: [topIndex],
    description: 'Peeking at top of stack',
  };

  yield {
    type: 'search',
    indices: [topIndex],
    description: `✅ Top element is ${topValue}. Stack size: ${stack.length}`,
  };
}

/**
 * Stack Search Operation - O(n) time complexity
 * Searches for a value in the stack (from top to bottom)
 */
export function* stackSearch(stack: number[], target: number): Generator<AnimationStep> {
  if (stack.length === 0) {
    yield {
      type: 'highlight',
      indices: [],
      description: '❌ Stack is empty',
    };
    return;
  }

  yield {
    type: 'highlight',
    indices: [],
    description: `Searching for ${target} in stack (top to bottom)`,
  };

  // Search from top to bottom
  for (let i = stack.length - 1; i >= 0; i--) {
    yield {
      type: 'compare',
      indices: [i],
      description: `Checking position ${stack.length - i}: ${stack[i]} ${stack[i] === target ? '==' : '!='} ${target}`,
    };

    if (stack[i] === target) {
      yield {
        type: 'search',
        indices: [i],
        description: `✅ Found ${target} at position ${stack.length - i} from top`,
      };
      return;
    }
  }

  yield {
    type: 'highlight',
    indices: [],
    description: `❌ ${target} not found in stack`,
  };
}

/**
 * Stack isEmpty Operation - O(1) time complexity
 * Checks if the stack is empty
 */
export function* stackIsEmpty(stack: number[]): Generator<AnimationStep> {
  yield {
    type: 'highlight',
    indices: [],
    description: 'Checking if stack is empty...',
  };

  const isEmpty = stack.length === 0;

  yield {
    type: isEmpty ? 'highlight' : 'search',
    indices: isEmpty ? [] : [stack.length - 1],
    description: `✅ Stack is ${isEmpty ? 'EMPTY' : 'NOT EMPTY'} (size: ${stack.length})`,
  };
}

/**
 * Stack Size Operation - O(1) time complexity
 * Returns the current size of the stack
 */
export function* stackSize(stack: number[]): Generator<AnimationStep> {
  yield {
    type: 'highlight',
    indices: stack.length > 0 ? Array.from({ length: stack.length }, (_, i) => i) : [],
    description: 'Counting stack elements...',
  };

  yield {
    type: 'search',
    indices: stack.length > 0 ? Array.from({ length: stack.length }, (_, i) => i) : [],
    description: `✅ Stack size: ${stack.length} element${stack.length !== 1 ? 's' : ''}`,
  };
}

/**
 * Get complexity information for stack operations
 */
export const stackComplexity = {
  push: {
    time: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
    space: 'O(1)',
  },
  pop: {
    time: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
    space: 'O(1)',
  },
  peek: {
    time: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
    space: 'O(1)',
  },
  search: {
    time: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
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
