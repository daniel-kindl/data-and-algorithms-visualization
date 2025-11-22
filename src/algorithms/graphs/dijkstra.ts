import type { Graph } from '../../dataStructures/graphs/graph';
import type { AnimationStep } from '../../types';

export function* generateDijkstraSteps(
  graph: Graph,
  startNodeId: string,
  endNodeId: string | null = null
): Generator<AnimationStep> {
  const distances = new Map<string, number>();
  const previous = new Map<string, string | null>();
  const unvisited = new Set<string>();
  const visited = new Set<string>();

  // Initialize distances
  graph.nodes.forEach((node) => {
    distances.set(node.id, Infinity);
    previous.set(node.id, null);
    unvisited.add(node.id);
  });

  distances.set(startNodeId, 0);

  yield {
    type: 'update-distances',
    description: `Initialize distances: ${startNodeId} = 0, others = Infinity`,
    indices: [],
    nodeIds: [startNodeId],
    auxiliaryData: { distances: Object.fromEntries(distances) }
  };

  while (unvisited.size > 0) {
    // Find node with smallest distance in unvisited set
    let closestNodeId: string | null = null;
    let minDistance = Infinity;

    for (const nodeId of unvisited) {
      const dist = distances.get(nodeId)!;
      if (dist < minDistance) {
        minDistance = dist;
        closestNodeId = nodeId;
      }
    }

    // If no reachable nodes left, break
    if (closestNodeId === null || minDistance === Infinity) {
      break;
    }

    // If we reached the target node, we can stop (optional optimization)
    if (endNodeId && closestNodeId === endNodeId) {
      visited.add(closestNodeId);
      unvisited.delete(closestNodeId);
      yield {
        type: 'visited',
        description: `Reached target node ${closestNodeId} with distance ${minDistance}`,
        indices: [],
        nodeIds: [closestNodeId],
        auxiliaryData: { distances: Object.fromEntries(distances) }
      };
      break;
    }

    unvisited.delete(closestNodeId);
    visited.add(closestNodeId);

    yield {
      type: 'visited',
      description: `Visiting node ${closestNodeId} (distance: ${minDistance})`,
      indices: [],
      nodeIds: [closestNodeId],
      auxiliaryData: { distances: Object.fromEntries(distances) }
    };

    const neighbors = graph.getEdges(closestNodeId);

    for (const edge of neighbors) {
      if (visited.has(edge.target)) continue;

      const weight = edge.weight ?? 1;
      const alt = distances.get(closestNodeId)! + weight;
      
      yield {
        type: 'compare',
        description: `Checking neighbor ${edge.target}: new dist ${alt} vs old dist ${distances.get(edge.target)}`,
        indices: [],
        nodeIds: [closestNodeId, edge.target],
        highlightedLines: [{ from: closestNodeId, to: edge.target }],
        auxiliaryData: { distances: Object.fromEntries(distances) }
      };

      if (alt < distances.get(edge.target)!) {
        distances.set(edge.target, alt);
        previous.set(edge.target, closestNodeId);

        yield {
          type: 'update-distances',
          description: `Updating distance for ${edge.target} to ${alt}`,
          indices: [],
          nodeIds: [edge.target],
          auxiliaryData: { distances: Object.fromEntries(distances) }
        };
      }
    }
  }

  // Reconstruct path if endNodeId is provided
  if (endNodeId && distances.get(endNodeId)! !== Infinity) {
    const path: string[] = [];
    let current: string | null = endNodeId;
    while (current !== null) {
      path.unshift(current);
      current = previous.get(current) || null;
    }

    // Highlight the path
    for (let i = 0; i < path.length - 1; i++) {
       yield {
        type: 'path',
        description: `Path found: ${path.join(' -> ')}`,
        indices: [],
        nodeIds: path,
        highlightedLines: path.slice(0, -1).map((node, idx) => ({ from: node, to: path[idx + 1] })),
        auxiliaryData: { distances: Object.fromEntries(distances) }
      };
    }
  } else {
      yield {
        type: 'sorted',
        description: 'Dijkstra algorithm completed',
        indices: [],
        nodeIds: Array.from(visited),
        auxiliaryData: { distances: Object.fromEntries(distances) }
      };
  }
}
