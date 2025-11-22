import { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { VisualizerContainer } from './VisualizerContainer';

interface HeapVisualizerProps {
  data: number[];
  highlightedIndices?: number[];
  comparedIndices?: number[];
  activeIndices?: number[];
  title?: string;
  explanation?: React.ReactNode;
  children?: React.ReactNode;
}

export default function HeapVisualizer({
  data,
  highlightedIndices = [],
  comparedIndices = [],
  activeIndices = [],
  title,
  explanation,
  children,
}: HeapVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!canvasRef.current) {return;}

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) {return;}

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (data.length === 0) {
      ctx.fillStyle = theme === 'dark' ? '#6B7280' : '#9CA3AF';
      ctx.font = '16px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Heap is empty', canvas.width / 2, canvas.height / 2);
      return;
    }

    // Draw heap as complete binary tree
    drawHeapTree(ctx, data, highlightedIndices, comparedIndices, activeIndices, theme);
  }, [data, highlightedIndices, comparedIndices, activeIndices, theme]);

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
        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
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
 * Draw heap as a complete binary tree
 */
function drawHeapTree(
  ctx: CanvasRenderingContext2D,
  data: number[],
  highlightedIndices: number[],
  comparedIndices: number[],
  activeIndices: number[],
  theme: 'light' | 'dark',
) {
  const WIDTH = 800;
  const NODE_RADIUS = 25;
  const LEVEL_HEIGHT = 80;

  // Calculate positions for heap elements (treating as complete binary tree)
  const positions: { x: number; y: number }[] = [];

  for (let i = 0; i < data.length; i++) {
    // Find level (0-indexed)
    const level = Math.floor(Math.log2(i + 1));

    // Position within level
    const positionInLevel = i - (Math.pow(2, level) - 1);
    const nodesInLevel = Math.pow(2, level);

    // Calculate span for this level
    const levelSpan = WIDTH / nodesInLevel;
    const x = levelSpan * positionInLevel + levelSpan / 2;
    const y = NODE_RADIUS + level * LEVEL_HEIGHT + 20;

    positions.push({ x, y });
  }

  // Draw edges first
  ctx.strokeStyle = theme === 'dark' ? '#4B5563' : '#9CA3AF';
  ctx.lineWidth = 2;

  for (let i = 0; i < data.length; i++) {
    const leftChild = 2 * i + 1;
    const rightChild = 2 * i + 2;

    // Draw line to left child
    if (leftChild < data.length) {
      ctx.beginPath();
      ctx.moveTo(positions[i].x, positions[i].y);
      ctx.lineTo(positions[leftChild].x, positions[leftChild].y);
      ctx.stroke();
    }

    // Draw line to right child
    if (rightChild < data.length) {
      ctx.beginPath();
      ctx.moveTo(positions[i].x, positions[i].y);
      ctx.lineTo(positions[rightChild].x, positions[rightChild].y);
      ctx.stroke();
    }
  }

  // Draw nodes
  for (let i = 0; i < data.length; i++) {
    const pos = positions[i];

    // Determine color
    let fillColor = theme === 'dark' ? '#1F2937' : '#FFFFFF';
    let strokeColor = theme === 'dark' ? '#4B5563' : '#374151';
    const textColor = theme === 'dark' ? '#FFFFFF' : '#111827';

    if (highlightedIndices.includes(i)) {
      fillColor = theme === 'dark' ? '#7C3AED' : '#8B5CF6'; // Purple
      strokeColor = theme === 'dark' ? '#8B5CF6' : '#7C3AED';
    } else if (comparedIndices.includes(i)) {
      fillColor = '#F59E0B'; // Amber
      strokeColor = '#FBBF24';
    } else if (activeIndices.includes(i)) {
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
      highlightedIndices.includes(i) ||
      comparedIndices.includes(i) ||
      activeIndices.includes(i);
    ctx.fillStyle = isHighlighted ? '#FFFFFF' : textColor;
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(data[i].toString(), pos.x, pos.y);

    // Draw index below node (for root)
    if (i === 0) {
      ctx.fillStyle = theme === 'dark' ? '#9CA3AF' : '#6B7280';
      ctx.font = '12px sans-serif';
      ctx.fillText('ROOT', pos.x, pos.y + NODE_RADIUS + 15);
    }
  }
}
