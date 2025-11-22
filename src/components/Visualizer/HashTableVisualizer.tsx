import { useEffect, useRef } from 'react';
import type { HashEntry } from '../../dataStructures/trees/hashTable';
import { useTheme } from '../../context/ThemeContext';
import { VisualizerContainer } from './VisualizerContainer';

interface HashTableVisualizerProps {
  table: (HashEntry | null)[];
  capacity: number;
  highlightedIndices?: number[];
  comparedIndices?: number[];
  activeIndices?: number[];
  title?: string;
  explanation?: React.ReactNode;
  children?: React.ReactNode;
}

export default function HashTableVisualizer({
  table,
  capacity,
  highlightedIndices = [],
  comparedIndices = [],
  activeIndices = [],
  title,
  explanation,
  children,
}: HashTableVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!canvasRef.current) {return;}

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) {return;}

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawHashTable(ctx, table, capacity, highlightedIndices, comparedIndices, activeIndices, theme);
  }, [table, capacity, highlightedIndices, comparedIndices, activeIndices, theme]);

  const legend = (
    <>
      <div className="flex items-center gap-1">
        <span className="w-2.5 h-2.5 rounded-full bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600" />
        <span className="text-gray-600 dark:text-gray-400">Empty</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="w-2.5 h-2.5 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600" />
        <span className="text-gray-600 dark:text-gray-400">Occupied</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border border-emerald-600" />
        <span className="text-gray-600 dark:text-gray-400">Active</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="w-2.5 h-2.5 rounded-full bg-amber-500 border border-amber-600" />
        <span className="text-gray-600 dark:text-gray-400">Compare</span>
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
        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
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
      minHeight="500px"
    >
      <div className="flex-1 flex flex-col items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-800/30 rounded-xl border border-gray-100 dark:border-gray-800 relative h-full">
        <canvas ref={canvasRef} width={800} height={500} className="max-w-full h-auto" />
      </div>
    </VisualizerContainer>
  );
}

/**
 * Draw hash table as array of buckets
 */
function drawHashTable(
  ctx: CanvasRenderingContext2D,
  table: (HashEntry | null)[],
  capacity: number,
  highlightedIndices: number[],
  comparedIndices: number[],
  activeIndices: number[],
  theme: 'light' | 'dark',
) {
  const CELL_WIDTH = 100;
  const CELL_HEIGHT = 60;
  const START_X = 50;
  const START_Y = 50;
  const COLS = 7; // Number of cells per row

  for (let i = 0; i < capacity; i++) {
    const row = Math.floor(i / COLS);
    const col = i % COLS;
    const x = START_X + col * (CELL_WIDTH + 10);
    const y = START_Y + row * (CELL_HEIGHT + 30);

    // Determine colors
    let fillColor = theme === 'dark' ? '#1F2937' : '#FFFFFF';
    let strokeColor = theme === 'dark' ? '#4B5563' : '#374151';
    let textColor = theme === 'dark' ? '#FFFFFF' : '#111827';

    if (highlightedIndices.includes(i)) {
      fillColor = theme === 'dark' ? '#7C3AED' : '#8B5CF6';
      strokeColor = theme === 'dark' ? '#8B5CF6' : '#7C3AED';
    } else if (comparedIndices.includes(i)) {
      fillColor = '#F59E0B';
      strokeColor = '#FBBF24';
    } else if (activeIndices.includes(i)) {
      fillColor = '#10B981';
      strokeColor = '#34D399';
    }

    const entry = table[i];
    const isEmpty = entry === null;

    if (isEmpty) {
      fillColor = theme === 'dark' ? '#111827' : '#F3F4F6'; // Darker for empty
      strokeColor = theme === 'dark' ? '#374151' : '#D1D5DB';
      textColor = theme === 'dark' ? '#6B7280' : '#9CA3AF';
    }

    // Draw cell
    ctx.fillStyle = fillColor;
    ctx.fillRect(x, y, CELL_WIDTH, CELL_HEIGHT);
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, CELL_WIDTH, CELL_HEIGHT);

    // Draw index
    ctx.fillStyle = theme === 'dark' ? '#9CA3AF' : '#6B7280';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`[${i}]`, x + CELL_WIDTH / 2, y - 5);

    // Draw content
    const isHighlighted =
      highlightedIndices.includes(i) ||
      comparedIndices.includes(i) ||
      activeIndices.includes(i);
    ctx.fillStyle = isHighlighted ? '#FFFFFF' : textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    if (isEmpty) {
      ctx.font = '14px sans-serif';
      ctx.fillText('null', x + CELL_WIDTH / 2, y + CELL_HEIGHT / 2);
    } else {
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText(`K: ${entry.key}`, x + CELL_WIDTH / 2, y + CELL_HEIGHT / 2 - 10);
      ctx.font = '12px sans-serif';
      ctx.fillText(`V: ${entry.value}`, x + CELL_WIDTH / 2, y + CELL_HEIGHT / 2 + 10);
    }
  }

  // Draw legend
  const legendY = START_Y + Math.ceil(capacity / COLS) * (CELL_HEIGHT + 30) + 20;

  ctx.font = '14px sans-serif';
  ctx.textAlign = 'left';

  // Empty
  ctx.fillStyle = theme === 'dark' ? '#111827' : '#F3F4F6';
  ctx.fillRect(START_X, legendY, 20, 20);
  ctx.strokeStyle = theme === 'dark' ? '#374151' : '#D1D5DB';
  ctx.strokeRect(START_X, legendY, 20, 20);
  ctx.fillStyle = theme === 'dark' ? '#9CA3AF' : '#6B7280';
  ctx.fillText('Empty', START_X + 30, legendY + 15);

  // Occupied
  ctx.fillStyle = theme === 'dark' ? '#1F2937' : '#FFFFFF';
  ctx.fillRect(START_X + 100, legendY, 20, 20);
  ctx.strokeStyle = theme === 'dark' ? '#4B5563' : '#374151';
  ctx.strokeRect(START_X + 100, legendY, 20, 20);
  ctx.fillStyle = theme === 'dark' ? '#9CA3AF' : '#6B7280';
  ctx.fillText('Occupied', START_X + 130, legendY + 15);

  // Active
  ctx.fillStyle = '#10B981';
  ctx.fillRect(START_X + 230, legendY, 20, 20);
  ctx.strokeStyle = '#34D399';
  ctx.strokeRect(START_X + 230, legendY, 20, 20);
  ctx.fillStyle = theme === 'dark' ? '#9CA3AF' : '#6B7280';
  ctx.fillText('Active', START_X + 260, legendY + 15);

  // Comparing
  ctx.fillStyle = '#F59E0B';
  ctx.fillRect(START_X + 340, legendY, 20, 20);
  ctx.strokeStyle = '#FBBF24';
  ctx.strokeRect(START_X + 340, legendY, 20, 20);
  ctx.fillStyle = theme === 'dark' ? '#9CA3AF' : '#6B7280';
  ctx.fillText('Comparing', START_X + 370, legendY + 15);
}
