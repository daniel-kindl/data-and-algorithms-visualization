import type { AnimationStep } from '../../types';
import type { Graph } from '../../dataStructures/graphs/graph';

export const bfsInfo = {
  name: 'Breadth-First Search',
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
    best: 'In the best case, we still need to traverse the connected component. V is the number of vertices and E is the number of edges.',
    average: 'On average, BFS visits every vertex and edge in the connected component once. Time complexity is proportional to the size of the graph representation.',
    worst: 'In the worst case, we visit all vertices and edges. The algorithm processes each vertex once and checks all its adjacent edges.',
  },
  description:
    'Breadth-First Search (BFS) explores a graph layer by layer. It starts at a selected node (root) and explores all of its neighbor nodes at the present depth prior to moving on to the nodes at the next depth level.',
};

export function* bfs(
  graph: Graph,
  startNodeId: string
): Generator<AnimationStep> {
  if (!graph.nodes.has(startNodeId)) return;

  const visited = new Set<string>();
  const queue: string[] = [startNodeId];
  const parentMap = new Map<string, string>(); // To track path

  visited.add(startNodeId);

  yield {
    type: 'highlight',
    indices: [],
    nodeIds: [startNodeId],
    description: `Starting BFS from node ${startNodeId}`,
  };

  while (queue.length > 0) {
    const currentNodeId = queue.shift()!;
    
    yield {
      type: 'active',
      indices: [],
      nodeIds: [currentNodeId],
      description: `Visiting node ${currentNodeId}`,
    };

    const neighbors = graph.getNeighbors(currentNodeId);
    
    // Sort neighbors for consistent traversal order (optional but good for visualization).
    // This ensures the animation is deterministic and easier to follow.
    neighbors.sort();

    for (const neighborId of neighbors) {
      if (!visited.has(neighborId)) {
        visited.add(neighborId);
        parentMap.set(neighborId, currentNodeId);
        queue.push(neighborId);

        yield {
          type: 'visited',
          indices: [],
          nodeIds: [neighborId],
          description: `Discovered neighbor ${neighborId}, adding to queue`,
        };
        
        // Visualize the edge traversal
        yield {
          type: 'compare', // Using compare to highlight edge
          indices: [],
          nodeIds: [currentNodeId, neighborId],
          description: `Traversing edge ${currentNodeId} -> ${neighborId}`,
        };
      }
    }
    
    yield {
      type: 'visited',
      indices: [],
      nodeIds: [currentNodeId],
      description: `Finished processing node ${currentNodeId}`,
    };
  }

  yield {
    type: 'sorted',
    indices: [],
    nodeIds: Array.from(visited),
    description: `BFS traversal complete. Visited ${visited.size} nodes.`,
  };
}
