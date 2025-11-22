import type { AnimationStep } from '../../types';

export const mockAnimationSteps: AnimationStep[] = [
  {
    type: 'compare',
    indices: [0, 1],
    description: 'Comparing indices 0 and 1',
  },
  {
    type: 'swap',
    indices: [0, 1],
    description: 'Swapping indices 0 and 1',
  },
  {
    type: 'sorted',
    indices: [0],
    description: 'Index 0 is sorted',
  },
];

export const mockArray = [5, 2, 8, 1, 9, 3, 7, 4, 6];

export const mockSortedArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
