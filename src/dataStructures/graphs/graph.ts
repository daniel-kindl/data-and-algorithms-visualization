import type { GraphNode, GraphEdge } from '../../types';

export class Graph {
  nodes: Map<string, GraphNode>;
  adjacencyList: Map<string, GraphEdge[]>;
  isDirected: boolean;
  isWeighted: boolean;

  constructor(isDirected: boolean = false, isWeighted: boolean = false) {
    this.nodes = new Map();
    this.adjacencyList = new Map();
    this.isDirected = isDirected;
    this.isWeighted = isWeighted;
  }

  addNode(id: string, value: string | number, x: number, y: number): void {
    if (this.nodes.has(id)) {return;}

    this.nodes.set(id, { id, value, x, y });
    this.adjacencyList.set(id, []);
  }

  removeNode(id: string): void {
    if (!this.nodes.has(id)) {return;}

    this.nodes.delete(id);
    this.adjacencyList.delete(id);

    // Remove edges pointing to this node
    this.adjacencyList.forEach((edges, nodeId) => {
      this.adjacencyList.set(
        nodeId,
        edges.filter((edge) => edge.target !== id),
      );
    });
  }

  addEdge(source: string, target: string, weight: number = 1): void {
    if (!this.nodes.has(source) || !this.nodes.has(target)) {return;}

    const sourceEdges = this.adjacencyList.get(source) || [];

    // Check if edge already exists
    if (sourceEdges.some(e => e.target === target)) {return;}

    sourceEdges.push({ source, target, weight });
    this.adjacencyList.set(source, sourceEdges);

    if (!this.isDirected) {
      const targetEdges = this.adjacencyList.get(target) || [];
      targetEdges.push({ source: target, target: source, weight });
      this.adjacencyList.set(target, targetEdges);
    }
  }

  removeEdge(source: string, target: string): void {
    const sourceEdges = this.adjacencyList.get(source);
    if (sourceEdges) {
      this.adjacencyList.set(
        source,
        sourceEdges.filter((edge) => edge.target !== target),
      );
    }

    if (!this.isDirected) {
      const targetEdges = this.adjacencyList.get(target);
      if (targetEdges) {
        this.adjacencyList.set(
          target,
          targetEdges.filter((edge) => edge.target !== source),
        );
      }
    }
  }

  getNeighbors(id: string): string[] {
    const edges = this.adjacencyList.get(id);
    return edges ? edges.map((edge) => edge.target) : [];
  }

  getEdges(id: string): GraphEdge[] {
    return this.adjacencyList.get(id) || [];
  }

  clear(): void {
    this.nodes.clear();
    this.adjacencyList.clear();
  }
}
