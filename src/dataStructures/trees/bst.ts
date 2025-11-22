import type { AnimationStep } from '../../types';
import type { TreeNode } from './binaryTree';

/**
 * BST Insert - O(log n) average, O(n) worst time complexity
 * Maintains BST property: left < root < right
 */
export function* bstInsert(
  nodes: Map<string, TreeNode>,
  root: string | null,
  value: number,
): Generator<AnimationStep & { newRoot?: string; newNodeId?: string }> {
  const newNodeId = `node-${Date.now()}-${Math.random()}`;

  yield {
    type: 'highlight',
    indices: [],
    description: `Inserting ${value} into BST`,
  };

  // If tree is empty
  if (!root) {
    const newNode: TreeNode = { id: newNodeId, value, left: null, right: null };
    nodes.set(newNodeId, newNode);

    yield {
      type: 'insert',
      indices: [0],
      description: `✅ ${value} is now the root. Tree size: ${nodes.size}`,
      newRoot: newNodeId,
      newNodeId,
    };
    return;
  }

  // Find insertion position
  let current: string | null = root;
  let parent: string | null = null;
  let isLeftChild = false;

  while (current) {
    const currentNode = nodes.get(current);
    if (!currentNode) {break;}

    yield {
      type: 'compare',
      indices: [0],
      nodeIds: [current],
      description: `Comparing ${value} with ${currentNode.value}`,
    };

    parent = current;

    if (value === currentNode.value) {
      yield {
        type: 'highlight',
        indices: [0],
        nodeIds: [current],
        description: `❌ ${value} already exists in BST (no duplicates allowed)`,
      };
      return;
    }

    if (value < currentNode.value) {
      isLeftChild = true;
      current = currentNode.left;

      yield {
        type: 'active',
        indices: [0],
        nodeIds: [currentNode.id],
        description: `${value} < ${currentNode.value}, going left`,
      };
    } else {
      isLeftChild = false;
      current = currentNode.right;

      yield {
        type: 'active',
        indices: [0],
        nodeIds: [currentNode.id],
        description: `${value} > ${currentNode.value}, going right`,
      };
    }
  }

  // Insert new node
  const newNode: TreeNode = { id: newNodeId, value, left: null, right: null };
  nodes.set(newNodeId, newNode);

  if (parent) {
    const parentNode = nodes.get(parent);
    if (parentNode) {
      if (isLeftChild) {
        parentNode.left = newNodeId;
      } else {
        parentNode.right = newNodeId;
      }
    }
  }

  yield {
    type: 'insert',
    indices: [0],
    nodeIds: [newNodeId],
    description: `✅ Inserted ${value} as ${isLeftChild ? 'left' : 'right'} child. Tree size: ${nodes.size}`,
    newNodeId,
  };
}

/**
 * BST Search - O(log n) average, O(n) worst time complexity
 */
export function* bstSearch(
  nodes: Map<string, TreeNode>,
  root: string | null,
  target: number,
): Generator<AnimationStep> {
  if (!root) {
    yield {
      type: 'highlight',
      indices: [],
      description: '❌ Tree is empty',
    };
    return;
  }

  yield {
    type: 'highlight',
    indices: [],
    description: `Searching for ${target} in BST`,
  };

  let current: string | null = root;
  let steps = 0;

  while (current) {
    const currentNode = nodes.get(current);
    if (!currentNode) {break;}

    steps++;

    yield {
      type: 'compare',
      indices: [0],
      nodeIds: [current],
      description: `Step ${steps}: Checking ${currentNode.value} ${currentNode.value === target ? '==' : currentNode.value > target ? '>' : '<'} ${target}`,
    };

    if (currentNode.value === target) {
      yield {
        type: 'search',
        indices: [0],
        nodeIds: [current],
        description: `✅ Found ${target} in ${steps} steps`,
      };
      return;
    }

    if (target < currentNode.value) {
      current = currentNode.left;
      if (current) {
        yield {
          type: 'active',
          indices: [0],
          nodeIds: [currentNode.id],
          description: `${target} < ${currentNode.value}, searching left subtree`,
        };
      }
    } else {
      current = currentNode.right;
      if (current) {
        yield {
          type: 'active',
          indices: [0],
          nodeIds: [currentNode.id],
          description: `${target} > ${currentNode.value}, searching right subtree`,
        };
      }
    }
  }

  yield {
    type: 'highlight',
    indices: [],
    description: `❌ ${target} not found after ${steps} steps`,
  };
}

/**
 * BST Find Minimum - O(log n) average, O(n) worst
 */
export function* bstFindMin(
  nodes: Map<string, TreeNode>,
  root: string | null,
): Generator<AnimationStep> {
  if (!root) {
    yield {
      type: 'highlight',
      indices: [],
      description: '❌ Tree is empty',
    };
    return;
  }

  yield {
    type: 'highlight',
    indices: [],
    description: 'Finding minimum value (leftmost node)',
  };

  let current: string | null = root;

  while (current) {
    const currentNode = nodes.get(current);
    if (!currentNode) {break;}

    yield {
      type: 'compare',
      indices: [0],
      nodeIds: [current],
      description: `Current: ${currentNode.value}`,
    };

    if (!currentNode.left) {
      yield {
        type: 'search',
        indices: [0],
        nodeIds: [current],
        description: `✅ Minimum value: ${currentNode.value}`,
      };
      return;
    }

    current = currentNode.left;

    yield {
      type: 'active',
      indices: [0],
      nodeIds: [currentNode.id],
      description: 'Going left to find smaller value',
    };
  }
}

/**
 * BST Find Maximum - O(log n) average, O(n) worst
 */
export function* bstFindMax(
  nodes: Map<string, TreeNode>,
  root: string | null,
): Generator<AnimationStep> {
  if (!root) {
    yield {
      type: 'highlight',
      indices: [],
      description: '❌ Tree is empty',
    };
    return;
  }

  yield {
    type: 'highlight',
    indices: [],
    description: 'Finding maximum value (rightmost node)',
  };

  let current: string | null = root;

  while (current) {
    const currentNode = nodes.get(current);
    if (!currentNode) {break;}

    yield {
      type: 'compare',
      indices: [0],
      nodeIds: [current],
      description: `Current: ${currentNode.value}`,
    };

    if (!currentNode.right) {
      yield {
        type: 'search',
        indices: [0],
        nodeIds: [current],
        description: `✅ Maximum value: ${currentNode.value}`,
      };
      return;
    }

    current = currentNode.right;

    yield {
      type: 'active',
      indices: [0],
      nodeIds: [currentNode.id],
      description: 'Going right to find larger value',
    };
  }
}

/**
 * BST Validate - Check if tree is a valid BST
 */
export function* bstValidate(
  nodes: Map<string, TreeNode>,
  root: string | null,
): Generator<AnimationStep> {
  if (!root) {
    yield {
      type: 'highlight',
      indices: [],
      description: '✅ Empty tree is a valid BST',
    };
    return;
  }

  yield {
    type: 'highlight',
    indices: [],
    description: 'Validating BST property',
  };

  function* validate(
    nodeId: string | null,
    min: number,
    max: number,
  ): Generator<AnimationStep & { valid?: boolean }> {
    if (!nodeId) {return;}

    const node = nodes.get(nodeId);
    if (!node) {return;}

    yield {
      type: 'compare',
      indices: [0],
      nodeIds: [nodeId],
      description: `Checking ${node.value}: must be > ${min === -Infinity ? '-∞' : min} and < ${max === Infinity ? '∞' : max}`,
    };

    if (node.value <= min || node.value >= max) {
      yield {
        type: 'highlight',
        indices: [0],
        nodeIds: [nodeId],
        description: `❌ Invalid: ${node.value} violates BST property`,
        valid: false,
      };
      return;
    }

    yield* validate(node.left, min, node.value);
    yield* validate(node.right, node.value, max);
  }

  yield* validate(root, -Infinity, Infinity);

  yield {
    type: 'sorted',
    indices: [0],
    description: '✅ Valid BST',
  };
}

export const bstComplexity = {
  insert: {
    time: { best: 'O(log n)', average: 'O(log n)', worst: 'O(n)' },
    space: 'O(1)',
    description: 'Balanced tree: O(log n), Skewed tree: O(n)',
  },
  search: {
    time: { best: 'O(1)', average: 'O(log n)', worst: 'O(n)' },
    space: 'O(1)',
    description: 'Binary search through tree structure',
  },
  findMin: {
    time: { best: 'O(1)', average: 'O(log n)', worst: 'O(n)' },
    space: 'O(1)',
    description: 'Follow left pointers to leftmost node',
  },
  findMax: {
    time: { best: 'O(1)', average: 'O(log n)', worst: 'O(n)' },
    space: 'O(1)',
    description: 'Follow right pointers to rightmost node',
  },
};
