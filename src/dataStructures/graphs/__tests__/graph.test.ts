import { describe, it, expect, beforeEach } from 'vitest';
import { Graph } from '../graph';

describe('Graph Data Structure', () => {
  let graph: Graph;

  beforeEach(() => {
    graph = new Graph();
  });

  it('should add nodes correctly', () => {
    graph.addNode('A', 'A', 0, 0);
    graph.addNode('B', 'B', 10, 10);
    expect(graph.nodes.has('A')).toBe(true);
    expect(graph.nodes.has('B')).toBe(true);
  });

  it('should add edges correctly (undirected by default)', () => {
    graph.addNode('A', 'A', 0, 0);
    graph.addNode('B', 'B', 10, 10);
    graph.addEdge('A', 'B');

    const neighborsA = graph.getNeighbors('A');
    const neighborsB = graph.getNeighbors('B');

    expect(neighborsA).toContain('B');
    expect(neighborsB).toContain('A');
  });

  it('should add directed edges correctly', () => {
    const directedGraph = new Graph(true); // isDirected = true
    directedGraph.addNode('A', 'A', 0, 0);
    directedGraph.addNode('B', 'B', 10, 10);
    directedGraph.addEdge('A', 'B');

    const neighborsA = directedGraph.getNeighbors('A');
    const neighborsB = directedGraph.getNeighbors('B');

    expect(neighborsA).toContain('B');
    expect(neighborsB).not.toContain('A');
  });

  it('should handle weighted edges', () => {
    graph.addNode('A', 'A', 0, 0);
    graph.addNode('B', 'B', 10, 10);
    graph.addEdge('A', 'B', 5);

    const edgesA = graph.getEdges('A');
    expect(edgesA[0].weight).toBe(5);
  });

  it('should clear the graph', () => {
    graph.addNode('A', 'A', 0, 0);
    graph.addEdge('A', 'B');
    graph.clear();
    expect(graph.nodes.size).toBe(0);
  });
});
