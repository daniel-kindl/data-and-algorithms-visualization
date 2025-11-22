import type { AnimationStep, AlgorithmInfo } from '../../types';

export interface SortingAlgorithm {
  id: string;
  name: string;
  generator: (arr: number[]) => Generator<AnimationStep>;
  info: AlgorithmInfo;
  code: Record<string, string>;
}

import * as bubbleSort from './bubbleSort';
import * as selectionSort from './selectionSort';
import * as insertionSort from './insertionSort';
import * as mergeSort from './mergeSort';
import * as quickSort from './quickSort';
import * as heapSort from './heapSort';

export const sortingAlgorithms: SortingAlgorithm[] = [
  {
    id: 'bubble',
    name: 'Bubble Sort',
    generator: bubbleSort.bubbleSort,
    info: bubbleSort.bubbleSortInfo,
    code: bubbleSort.bubbleSortCode,
  },
  {
    id: 'selection',
    name: 'Selection Sort',
    generator: selectionSort.selectionSort,
    info: selectionSort.selectionSortInfo,
    code: selectionSort.selectionSortCode,
  },
  {
    id: 'insertion',
    name: 'Insertion Sort',
    generator: insertionSort.insertionSort,
    info: insertionSort.insertionSortInfo,
    code: insertionSort.insertionSortCode,
  },
  {
    id: 'merge',
    name: 'Merge Sort',
    generator: mergeSort.mergeSort,
    info: mergeSort.mergeSortInfo,
    code: mergeSort.mergeSortCode,
  },
  {
    id: 'quick',
    name: 'Quick Sort',
    generator: quickSort.quickSort,
    info: quickSort.quickSortInfo,
    code: quickSort.quickSortCode,
  },
  {
    id: 'heap',
    name: 'Heap Sort',
    generator: heapSort.heapSort,
    info: heapSort.heapSortInfo,
    code: heapSort.heapSortCode,
  },
];
