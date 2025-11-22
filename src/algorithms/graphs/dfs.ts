import type { AnimationStep } from '../../types';
import type { Graph } from '../../dataStructures/graphs/graph';

export const dfsInfo = {
  name: 'Depth-First Search',
  category: 'graph',
  complexity: {
    time: {
      best: 'O(V + E)',
      average: 'O(V + E)',
      worst: 'O(V + E)',
    },
    space: 'O(V)',
  },
  timeComplexityDetails: {
    best: 'DFS must visit all nodes and edges in the connected component to complete the traversal.',
    average: 'The algorithm visits every vertex and edge in the connected component exactly once.',
    worst: 'In the worst case, DFS visits every vertex and traverses every edge in the graph.',
  },
  description:
    'Depth-First Search (DFS) explores a graph by going as deep as possible along each branch before backtracking.',
};

export function* dfs(
  graph: Graph,
  startNodeId: string
): Generator<AnimationStep> {
  if (!graph.nodes.has(startNodeId)) return;

  const visited = new Set<string>();
  const stack: string[] = [startNodeId];

  yield {
    type: 'highlight',
    indices: [],
    nodeIds: [startNodeId],
    description: `Starting DFS from node ${startNodeId}`,
  };

  while (stack.length > 0) {
    const currentNodeId = stack.pop()!;

    if (!visited.has(currentNodeId)) {
      visited.add(currentNodeId);

      yield {
        type: 'active',
        indices: [],
        nodeIds: [currentNodeId],
        description: `Visiting node ${currentNodeId}`,
      };

      const neighbors = graph.getNeighbors(currentNodeId);
      // Sort neighbors reverse for stack to process in natural order
      neighbors.sort((a, b) => b.localeCompare(a));

      for (const neighborId of neighbors) {
        if (!visited.has(neighborId)) {
          stack.push(neighborId);
          
          yield {
            type: 'compare',
            indices: [],
            nodeIds: [currentNodeId, neighborId],
            description: `Discovered neighbor ${neighborId}, adding to stack`,
          };
        }
      }
    }
  }

  yield {
    type: 'sorted',
    indices: [],
    nodeIds: Array.from(visited),
    description: `DFS traversal complete. Visited ${visited.size} nodes.`,
  };
}
