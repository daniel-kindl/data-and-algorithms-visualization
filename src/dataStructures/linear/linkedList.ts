import type { AnimationStep, DataStructureNode } from '../../types';

/**
 * Linked List Insert at Head - O(1) time complexity
 * Inserts a new node at the beginning of the list
 */
export function* linkedListInsertHead(
  nodes: Map<string, DataStructureNode>,
  head: string | null,
  value: number,
): Generator<AnimationStep & { newHead?: string }> {
  const newNodeId = `node-${Date.now()}-${Math.random()}`;

  yield {
    type: 'highlight',
    indices: [],
    description: `Creating new node with value ${value}`,
  };

  // Create new node
  const newNode: DataStructureNode = {
    id: newNodeId,
    value,
    next: head,
  };

  nodes.set(newNodeId, newNode);

  yield {
    type: 'insert',
    indices: [0],
    description: `Inserting ${value} at head`,
    newHead: newNodeId,
  };

  if (head) {
    yield {
      type: 'active',
      indices: [0],
      description: `New head points to previous head. List size: ${nodes.size}`,
      newHead: newNodeId,
    };
  } else {
    yield {
      type: 'active',
      indices: [0],
      description: `${value} is now the head (first node). List size: ${nodes.size}`,
      newHead: newNodeId,
    };
  }
}

/**
 * Linked List Insert at Tail - O(n) time complexity
 * Inserts a new node at the end of the list
 */
export function* linkedListInsertTail(
  nodes: Map<string, DataStructureNode>,
  head: string | null,
  value: number,
): Generator<AnimationStep & { newHead?: string; newTail?: string }> {
  const newNodeId = `node-${Date.now()}-${Math.random()}`;

  yield {
    type: 'highlight',
    indices: [],
    description: `Creating new node with value ${value}`,
  };

  // Create new node
  const newNode: DataStructureNode = {
    id: newNodeId,
    value,
    next: null,
  };

  nodes.set(newNodeId, newNode);

  // If list is empty, new node becomes head
  if (!head) {
    yield {
      type: 'insert',
      indices: [0],
      description: `${value} is now the head (first node). List size: ${nodes.size}`,
      newHead: newNodeId,
      newTail: newNodeId,
    };
    return;
  }

  // Traverse to find tail
  let current = head;
  let position = 0;

  while (current) {
    const currentNode = nodes.get(current);
    if (!currentNode) {break;}

    yield {
      type: 'compare',
      indices: [position],
      description: `Traversing: at node ${currentNode.value} (position ${position})`,
    };

    if (!currentNode.next) {
      // Found the tail
      currentNode.next = newNodeId;

      yield {
        type: 'insert',
        indices: [position + 1],
        description: `Inserted ${value} at tail (position ${position + 1}). List size: ${nodes.size}`,
        newTail: newNodeId,
      };
      break;
    }

    current = currentNode.next;
    position++;
  }
}

/**
 * Linked List Delete Head - O(1) time complexity
 * Removes the first node from the list
 */
export function* linkedListDeleteHead(
  nodes: Map<string, DataStructureNode>,
  head: string | null,
): Generator<AnimationStep & { newHead?: string | null }> {
  if (!head) {
    yield {
      type: 'highlight',
      indices: [],
      description: 'Cannot delete. List is empty',
    };
    return;
  }

  const headNode = nodes.get(head);
  if (!headNode) {return;}

  yield {
    type: 'highlight',
    indices: [0],
    description: `Deleting head node with value ${headNode.value}`,
  };

  const newHead = headNode.next;

  yield {
    type: 'delete',
    indices: [0],
    description: `Removing node ${headNode.value}`,
  };

  nodes.delete(head);

  if (newHead) {
    const newHeadNode = nodes.get(newHead);
    yield {
      type: 'active',
      indices: [0],
      description: `Deleted ${headNode.value}. New head: ${newHeadNode?.value}. List size: ${nodes.size}`,
      newHead,
    };
  } else {
    yield {
      type: 'highlight',
      indices: [],
      description: `Deleted ${headNode.value}. List is now empty`,
      newHead: null,
    };
  }
}

/**
 * Linked List Delete Tail - O(n) time complexity
 * Removes the last node from the list
 */
export function* linkedListDeleteTail(
  nodes: Map<string, DataStructureNode>,
  head: string | null,
): Generator<AnimationStep & { newHead?: string | null }> {
  if (!head) {
    yield {
      type: 'highlight',
      indices: [],
      description: 'Cannot delete. List is empty',
    };
    return;
  }

  const headNode = nodes.get(head);
  if (!headNode) {return;}

  // If only one node, delete head
  if (!headNode.next) {
    yield {
      type: 'highlight',
      indices: [0],
      description: `Deleting tail (only node) with value ${headNode.value}`,
    };

    yield {
      type: 'delete',
      indices: [0],
      description: `Removing node ${headNode.value}`,
    };

    nodes.delete(head);

    yield {
      type: 'highlight',
      indices: [],
      description: `Deleted ${headNode.value}. List is now empty`,
      newHead: null,
    };
    return;
  }

  // Traverse to find second-to-last node
  let current: string | null = head;
  let prev: string | null = null;
  let position = 0;

  while (current) {
    const currentNode = nodes.get(current);
    if (!currentNode) {break;}

    yield {
      type: 'compare',
      indices: [position],
      description: `Traversing: at node ${currentNode.value} (position ${position})`,
    };

    if (!currentNode.next) {
      // Found the tail
      yield {
        type: 'highlight',
        indices: [position],
        description: `Found tail node with value ${currentNode.value}`,
      };

      yield {
        type: 'delete',
        indices: [position],
        description: `Removing tail node ${currentNode.value}`,
      };

      // Remove tail
      if (prev) {
        const prevNode = nodes.get(prev);
        if (prevNode) {
          prevNode.next = null;
        }
      }

      nodes.delete(current);

      yield {
        type: 'active',
        indices: [position - 1],
        description: `Deleted ${currentNode.value}. List size: ${nodes.size}`,
      };
      break;
    }

    prev = current;
    current = currentNode.next || null;
    position++;
  }
}

/**
 * Linked List Search - O(n) time complexity
 * Searches for a value in the list
 */
export function* linkedListSearch(
  nodes: Map<string, DataStructureNode>,
  head: string | null,
  target: number,
): Generator<AnimationStep> {
  if (!head) {
    yield {
      type: 'highlight',
      indices: [],
      description: 'List is empty',
    };
    return;
  }

  yield {
    type: 'highlight',
    indices: [],
    description: `Searching for ${target} in linked list`,
  };

  let current: string | null = head;
  let position = 0;

  while (current) {
    const currentNode = nodes.get(current);
    if (!currentNode) {break;}

    yield {
      type: 'compare',
      indices: [position],
      description: `Checking position ${position}: ${currentNode.value} ${currentNode.value === target ? '==' : '!='} ${target}`,
    };

    if (currentNode.value === target) {
      yield {
        type: 'search',
        indices: [position],
        description: `Found ${target} at position ${position}`,
      };
      return;
    }

    current = currentNode.next || null;
    position++;
  }

  yield {
    type: 'highlight',
    indices: [],
    description: `${target} not found in list`,
  };
}

/**
 * Linked List Insert at Position - O(n) time complexity
 * Inserts a new node at a specific position
 */
export function* linkedListInsertAt(
  nodes: Map<string, DataStructureNode>,
  head: string | null,
  value: number,
  position: number,
): Generator<AnimationStep & { newHead?: string }> {
  if (position < 0) {
    yield {
      type: 'highlight',
      indices: [],
      description: `Invalid position ${position}`,
    };
    return;
  }

  // Insert at head
  if (position === 0) {
    yield* linkedListInsertHead(nodes, head, value);
    return;
  }

  if (!head) {
    yield {
      type: 'highlight',
      indices: [],
      description: `Cannot insert at position ${position}. List is empty`,
    };
    return;
  }

  const newNodeId = `node-${Date.now()}-${Math.random()}`;

  yield {
    type: 'highlight',
    indices: [],
    description: `Creating new node with value ${value}`,
  };

  // Traverse to position - 1
  let current: string | null = head;
  let currentPos = 0;

  while (current && currentPos < position - 1) {
    const currentNode = nodes.get(current);
    if (!currentNode || !currentNode.next) {
      yield {
        type: 'highlight',
        indices: [],
        description: `Position ${position} is out of bounds`,
      };
      return;
    }

    yield {
      type: 'compare',
      indices: [currentPos],
      description: `Traversing: at position ${currentPos}`,
    };

    current = currentNode.next || null;
    currentPos++;
  }

  if (!current) {return;}

  const prevNode = nodes.get(current);
  if (!prevNode) {
    return;
  }

  // Create and insert new node
  const newNode: DataStructureNode = {
    id: newNodeId,
    value,
    next: prevNode.next ?? null,
  };

  nodes.set(newNodeId, newNode);
  prevNode.next = newNodeId;

  yield {
    type: 'insert',
    indices: [position],
    description: `Inserted ${value} at position ${position}. List size: ${nodes.size}`,
  };
}

/**
 * Linked List isEmpty Operation - O(1) time complexity
 * Checks if the list is empty
 */
export function* linkedListIsEmpty(
  nodes: Map<string, DataStructureNode>,
  head: string | null,
): Generator<AnimationStep> {
  yield {
    type: 'highlight',
    indices: [],
    description: 'Checking if list is empty...',
  };

  const isEmpty = !head || nodes.size === 0;

  yield {
    type: isEmpty ? 'highlight' : 'search',
    indices: isEmpty ? [] : [0],
    description: `List is ${isEmpty ? 'EMPTY' : 'NOT EMPTY'} (size: ${nodes.size})`,
  };
}

/**
 * Linked List Size Operation - O(1) time complexity
 * Returns the current size of the list
 */
export function* linkedListSize(
  nodes: Map<string, DataStructureNode>,
  head: string | null,
): Generator<AnimationStep> {
  if (!head) {
    yield {
      type: 'highlight',
      indices: [],
      description: 'List size: 0 (empty)',
    };
    return;
  }

  // Highlight all nodes
  const indices: number[] = [];
  let current: string | null = head;
  let position = 0;

  while (current) {
    indices.push(position);
    const currentNode = nodes.get(current);
    if (!currentNode) {break;}
    current = currentNode.next || null;
    position++;
  }

  yield {
    type: 'highlight',
    indices,
    description: 'Counting list elements...',
  };

  yield {
    type: 'search',
    indices,
    description: `List size: ${nodes.size} element${nodes.size !== 1 ? 's' : ''}`,
  };
}

/**
 * Get complexity information for linked list operations
 */
export const linkedListComplexity = {
  insertHead: {
    time: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
    space: 'O(1)',
  },
  insertTail: {
    time: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
    space: 'O(1)',
    note: 'O(1) with tail pointer',
  },
  deleteHead: {
    time: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
    space: 'O(1)',
  },
  deleteTail: {
    time: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
    space: 'O(1)',
    note: 'O(1) with doubly linked list',
  },
  search: {
    time: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
    space: 'O(1)',
  },
  insertAt: {
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
    note: 'Assuming size is tracked; O(n) if traversing',
  },
};
