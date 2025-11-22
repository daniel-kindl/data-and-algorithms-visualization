import type { AnimationStep } from '../../types';

export interface TreeNode {
  id: string;
  value: number;
  left: string | null;
  right: string | null;
  x?: number;
  y?: number;
}

/**
 * Binary Tree Insert - O(n) time complexity
 * Inserts a node using level-order (BFS) to find first available position
 */
export function* binaryTreeInsert(
  nodes: Map<string, TreeNode>,
  root: string | null,
  value: number,
): Generator<AnimationStep & { newRoot?: string; newNodeId?: string }> {
  const newNodeId = `node-${Date.now()}-${Math.random()}`;

  yield {
    type: 'highlight',
    indices: [],
    description: `Creating new node with value ${value}`,
  };

  // If tree is empty, new node becomes root
  if (!root) {
    const newNode: TreeNode = { id: newNodeId, value, left: null, right: null };
    nodes.set(newNodeId, newNode);

    yield {
      type: 'insert',
      indices: [0],
      description: `${value} is now the root. Tree size: ${nodes.size}`,
      newRoot: newNodeId,
      newNodeId,
    };
    return;
  }

  // Level-order traversal to find insertion point
  const queue: string[] = [root];
  let position = 0;

  while (queue.length > 0) {
    const currentId = queue.shift();
    if (!currentId) {
      continue;
    }
    const current = nodes.get(currentId);
    if (!current) {
      continue;
    }

    yield {
      type: 'compare',
      indices: [position],
      nodeIds: [currentId],
      description: `Checking node ${current.value} for available child positions`,
    };

    // Check left child
    if (!current.left) {
      const newNode: TreeNode = { id: newNodeId, value, left: null, right: null };
      nodes.set(newNodeId, newNode);
      current.left = newNodeId;

      yield {
        type: 'insert',
        indices: [position * 2 + 1],
        nodeIds: [newNodeId],
        description: `Inserted ${value} as left child of ${current.value}. Tree size: ${nodes.size}`,
        newNodeId,
      };
      return;
    }

    // Check right child
    if (!current.right) {
      const newNode: TreeNode = { id: newNodeId, value, left: null, right: null };
      nodes.set(newNodeId, newNode);
      current.right = newNodeId;

      yield {
        type: 'insert',
        indices: [position * 2 + 2],
        nodeIds: [newNodeId],
        description: `Inserted ${value} as right child of ${current.value}. Tree size: ${nodes.size}`,
        newNodeId,
      };
      return;
    }

    // Add children to queue
    queue.push(current.left);
    queue.push(current.right);
    position++;
  }
}

/**
 * Binary Tree In-Order Traversal - O(n) time complexity
 * Left -> Root -> Right
 */
export function* binaryTreeInOrder(
  nodes: Map<string, TreeNode>,
  root: string | null,
): Generator<AnimationStep> {
  if (!root) {
    yield {
      type: 'highlight',
      indices: [],
      description: 'Tree is empty',
    };
    return;
  }

  yield {
    type: 'highlight',
    indices: [],
    description: 'Starting In-Order Traversal (Left -> Root -> Right)',
  };

  const result: number[] = [];
  const stack: { nodeId: string; visited: boolean }[] = [];
  let current: string | null = root;

  while (current || stack.length > 0) {
    while (current) {
      const node = nodes.get(current);
      if (!node) {break;}

      yield {
        type: 'compare',
        indices: [result.length],
        nodeIds: [node.id],
        description: `Traversing left from ${node.value}`,
      };

      stack.push({ nodeId: current, visited: false });
      current = node.left;
    }

    if (stack.length > 0) {
      const stackItem = stack.pop();
      if (!stackItem) {
        continue;
      }
      const { nodeId, visited } = stackItem;
      const node = nodes.get(nodeId);
      if (!node) {
        continue;
      }

      if (!visited) {
        result.push(node.value);

        yield {
          type: 'search',
          indices: [result.length - 1],
          nodeIds: [nodeId],
          description: `Visited: ${node.value} | Order: [${result.join(', ')}]`,
        };

        current = node.right;
      }
    }
  }

  yield {
    type: 'sorted',
    indices: Array.from({ length: result.length }, (_, i) => i),
    description: `In-Order Complete: [${result.join(', ')}]`,
  };
}

/**
 * Binary Tree Pre-Order Traversal - O(n) time complexity
 * Root -> Left -> Right
 */
export function* binaryTreePreOrder(
  nodes: Map<string, TreeNode>,
  root: string | null,
): Generator<AnimationStep> {
  if (!root) {
    yield {
      type: 'highlight',
      indices: [],
      description: 'Tree is empty',
    };
    return;
  }

  yield {
    type: 'highlight',
    indices: [],
    description: 'Starting Pre-Order Traversal (Root -> Left -> Right)',
  };

  const result: number[] = [];
  const stack: string[] = [root];

  while (stack.length > 0) {
    const currentId = stack.pop();
    if (!currentId) {
      continue;
    }
    const current = nodes.get(currentId);
    if (!current) {
      continue;
    }

    result.push(current.value);

    yield {
      type: 'search',
      indices: [result.length - 1],
      nodeIds: [currentId],
      description: `Visited: ${current.value} | Order: [${result.join(', ')}]`,
    };

    // Push right first so left is processed first
    if (current.right) {
      stack.push(current.right);
    }
    if (current.left) {
      stack.push(current.left);
    }
  }

  yield {
    type: 'sorted',
    indices: Array.from({ length: result.length }, (_, i) => i),
    description: `e-Order Complete: [${result.join(', ')}]`,
  };
}

/**
 * Binary Tree Post-Order Traversal - O(n) time complexity
 * Left -> Right -> Root
 */
export function* binaryTreePostOrder(
  nodes: Map<string, TreeNode>,
  root: string | null,
): Generator<AnimationStep> {
  if (!root) {
    yield {
      type: 'highlight',
      indices: [],
      description: 'Tree is empty',
    };
    return;
  }

  yield {
    type: 'highlight',
    indices: [],
    description: 'Starting Post-Order Traversal (Left -> Right -> Root)',
  };

  const result: number[] = [];
  const stack: { nodeId: string; visited: boolean }[] = [{ nodeId: root, visited: false }];

  while (stack.length > 0) {
    const stackItem = stack.pop();
    if (!stackItem) {
      continue;
    }
    const { nodeId, visited } = stackItem;
    const node = nodes.get(nodeId);
    if (!node) {
      continue;
    }

    if (visited) {
      result.push(node.value);

      yield {
        type: 'search',
        indices: [result.length - 1],
        nodeIds: [nodeId],
        description: `Visited: ${node.value} | Order: [${result.join(', ')}]`,
      };
    } else {
      stack.push({ nodeId, visited: true });

      if (node.right) {
        stack.push({ nodeId: node.right, visited: false });
      }
      if (node.left) {
        stack.push({ nodeId: node.left, visited: false });
      }
    }
  }

  yield {
    type: 'sorted',
    indices: Array.from({ length: result.length }, (_, i) => i),
    description: `Post-Order Complete: [${result.join(', ')}]`,
  };
}

/**
 * Binary Tree Level-Order Traversal (BFS) - O(n) time complexity
 */
export function* binaryTreeLevelOrder(
  nodes: Map<string, TreeNode>,
  root: string | null,
): Generator<AnimationStep> {
  if (!root) {
    yield {
      type: 'highlight',
      indices: [],
      description: 'Tree is empty',
    };
    return;
  }

  yield {
    type: 'highlight',
    indices: [],
    description: 'Starting Level-Order Traversal (BFS)',
  };

  const result: number[] = [];
  const queue: string[] = [root];

  while (queue.length > 0) {
    const currentId = queue.shift();
    if (!currentId) {
      continue;
    }
    const current = nodes.get(currentId);
    if (!current) {
      continue;
    }

    result.push(current.value);

    yield {
      type: 'search',
      indices: [result.length - 1],
      nodeIds: [currentId],
      description: `Visited: ${current.value} | Order: [${result.join(', ')}]`,
    };

    if (current.left) {queue.push(current.left);}
    if (current.right) {queue.push(current.right);}
  }

  yield {
    type: 'sorted',
    indices: Array.from({ length: result.length }, (_, i) => i),
    description: `Level-Order Complete: [${result.join(', ')}]`,
  };
}

/**
 * Binary Tree Search - O(n) time complexity
 */
export function* binaryTreeSearch(
  nodes: Map<string, TreeNode>,
  root: string | null,
  target: number,
): Generator<AnimationStep> {
  if (!root) {
    yield {
      type: 'highlight',
      indices: [],
      description: 'Tree is empty',
    };
    return;
  }

  yield {
    type: 'highlight',
    indices: [],
    description: `Searching for ${target} in binary tree`,
  };

  const queue: string[] = [root];
  let position = 0;

  while (queue.length > 0) {
    const currentId = queue.shift();
    if (!currentId) {
      continue;
    }
    const current = nodes.get(currentId);
    if (!current) {
      continue;
    }

    yield {
      type: 'compare',
      indices: [position],
      nodeIds: [currentId],
      description: `Checking node: ${current.value} ${current.value === target ? '==' : '!='} ${target}`,
    };

    if (current.value === target) {
      yield {
        type: 'search',
        indices: [position],
        nodeIds: [currentId],
        description: `Found ${target} in tree`,
      };
      return;
    }

    if (current.left) {queue.push(current.left);}
    if (current.right) {queue.push(current.right);}
    position++;
  }

  yield {
    type: 'highlight',
    indices: [],
    description: `${target} not found in tree`,
  };
}

export const binaryTreeComplexity = {
  insert: {
    time: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
    space: 'O(1)',
    description: 'Level-order insertion to find first available position',
  },
  search: {
    time: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
    space: 'O(1)',
    description: 'Must check all nodes in worst case',
  },
  traversal: {
    time: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
    space: 'O(h)',
    description: 'Visit each node once, space for recursion stack (height)',
  },
};
