import { useEffect, useRef } from 'react';
import type { TreeNode } from '../../dataStructures/trees/binaryTree';
import { useTheme } from '../../context/ThemeContext';
import { VisualizerContainer } from './VisualizerContainer';

interface TreeVisualizerProps {
  nodes: Map<string, TreeNode>;
  root: string | null;
  highlightedNodes?: string[];
  comparedNodes?: string[];
  activeNodes?: string[];
  title?: string;
  explanation?: React.ReactNode;
  children?: React.ReactNode;
}

export default function TreeVisualizer({
  nodes,
  root,
  highlightedNodes = [],
  comparedNodes = [],
  activeNodes = [],
  title,
  explanation,
  children,
}: TreeVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!canvasRef.current) {return;}

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) {return;}

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!root || nodes.size === 0) {
      ctx.fillStyle = theme === 'dark' ? '#6B7280' : '#9CA3AF';
      ctx.font = '16px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Tree is empty', canvas.width / 2, canvas.height / 2);
      return;
    }

    // Calculate positions for all nodes
    const positions = calculateNodePositions(nodes, root);

    // Draw edges first (so they appear behind nodes)
    drawEdges(ctx, nodes, positions, theme);

    // Draw nodes
    drawNodes(ctx, nodes, positions, highlightedNodes, comparedNodes, activeNodes, theme);
  }, [nodes, root, highlightedNodes, comparedNodes, activeNodes, theme]);

  const legend = (
    <>
      <div className="flex items-center gap-1">
        <span className="w-2.5 h-2.5 rounded-full bg-gray-700 dark:bg-gray-600 border border-gray-600 dark:border-gray-500" />
        <span className="text-gray-600 dark:text-gray-400">Normal</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border border-emerald-600" />
        <span className="text-gray-600 dark:text-gray-400">Active</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="w-2.5 h-2.5 rounded-full bg-amber-500 border border-amber-600" />
        <span className="text-gray-600 dark:text-gray-400">Compare</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="w-2.5 h-2.5 rounded-full bg-purple-600 border border-purple-700" />
        <span className="text-gray-600 dark:text-gray-400">Highlight</span>
      </div>
    </>
  );

  const icon = (
    <svg
      className="w-5 h-5 text-indigo-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
      />
    </svg>
  );

  return (
    <VisualizerContainer
      title={title}
      icon={icon}
      legend={legend}
      explanation={explanation}
      footer={children}
    >
      <div className="flex-1 flex flex-col items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-800/30 rounded-xl border border-gray-100 dark:border-gray-800 relative h-full">
        <canvas ref={canvasRef} width={800} height={400} className="max-w-full h-auto" />
      </div>
    </VisualizerContainer>
  );
}

/**
 * Calculate x,y positions for all nodes using level-order traversal
 */
function calculateNodePositions(
  nodes: Map<string, TreeNode>,
  root: string | null,
): Map<string, { x: number; y: number }> {
  const positions = new Map<string, { x: number; y: number }>();

  if (!root) {return positions;}

  const WIDTH = 800;
  const NODE_RADIUS = 25;
  const LEVEL_HEIGHT = 80;

  // BFS to assign levels
  const queue: { id: string; level: number; position: number; span: number }[] = [];
  queue.push({ id: root, level: 0, position: 0, span: WIDTH });

  while (queue.length > 0) {
    const queueItem = queue.shift();
    if (!queueItem) {
      continue;
    }
    const { id, level, position, span } = queueItem;
    const node = nodes.get(id);
    if (!node) {
      continue;
    }

    // Calculate x position
    const x = position + span / 2;
    const y = NODE_RADIUS + level * LEVEL_HEIGHT + 20;

    positions.set(id, { x, y });

    // Add children to queue
    const childSpan = span / 2;

    if (node.left) {
      queue.push({
        id: node.left,
        level: level + 1,
        position: position,
        span: childSpan,
      });
    }

    if (node.right) {
      queue.push({
        id: node.right,
        level: level + 1,
        position: position + childSpan,
        span: childSpan,
      });
    }
  }

  return positions;
}

/**
 * Draw edges between parent and child nodes
 */
function drawEdges(
  ctx: CanvasRenderingContext2D,
  nodes: Map<string, TreeNode>,
  positions: Map<string, { x: number; y: number }>,
  theme: 'light' | 'dark',
) {
  ctx.strokeStyle = theme === 'dark' ? '#4B5563' : '#9CA3AF'; // Gray-600 : Gray-400
  ctx.lineWidth = 2;

  nodes.forEach((node, nodeId) => {
    const parentPos = positions.get(nodeId);
    if (!parentPos) {return;}

    // Draw line to left child
    if (node.left) {
      const leftPos = positions.get(node.left);
      if (leftPos) {
        ctx.beginPath();
        ctx.moveTo(parentPos.x, parentPos.y);
        ctx.lineTo(leftPos.x, leftPos.y);
        ctx.stroke();
      }
    }

    // Draw line to right child
    if (node.right) {
      const rightPos = positions.get(node.right);
      if (rightPos) {
        ctx.beginPath();
        ctx.moveTo(parentPos.x, parentPos.y);
        ctx.lineTo(rightPos.x, rightPos.y);
        ctx.stroke();
      }
    }
  });
}

/**
 * Draw nodes with different colors based on state
 */
function drawNodes(
  ctx: CanvasRenderingContext2D,
  nodes: Map<string, TreeNode>,
  positions: Map<string, { x: number; y: number }>,
  highlightedNodes: string[],
  comparedNodes: string[],
  activeNodes: string[],
  theme: 'light' | 'dark',
) {
  const NODE_RADIUS = 25;

  nodes.forEach((node, nodeId) => {
    const pos = positions.get(nodeId);
    if (!pos) {return;}

    // Determine node color
    let fillColor = theme === 'dark' ? '#1F2937' : '#FFFFFF'; // Gray-800 : White
    let strokeColor = theme === 'dark' ? '#4B5563' : '#374151'; // Gray-600 : Gray-700
    const textColor = theme === 'dark' ? '#FFFFFF' : '#111827'; // White : Gray-900

    if (highlightedNodes.includes(nodeId)) {
      fillColor = theme === 'dark' ? '#7C3AED' : '#8B5CF6'; // Purple
      strokeColor = theme === 'dark' ? '#8B5CF6' : '#7C3AED';
    } else if (comparedNodes.includes(nodeId)) {
      fillColor = '#F59E0B'; // Amber
      strokeColor = '#FBBF24';
    } else if (activeNodes.includes(nodeId)) {
      fillColor = '#10B981'; // Emerald
      strokeColor = '#34D399';
    }

    // Draw circle
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, NODE_RADIUS, 0, 2 * Math.PI);
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw value
    const isHighlighted =
      highlightedNodes.includes(nodeId) ||
      comparedNodes.includes(nodeId) ||
      activeNodes.includes(nodeId);
    ctx.fillStyle = isHighlighted ? '#FFFFFF' : textColor;
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(node.value.toString(), pos.x, pos.y);
  });
}
