import { describe, it, expect } from 'vitest';
import { bubbleSort } from '../bubbleSort';

describe('bubbleSort', () => {
  it('should sort an unsorted array', () => {
    const arr = [5, 2, 8, 1, 9];
    Array.from(bubbleSort(arr));

    // The sorted array is in the mutated array
    expect(arr).toEqual([1, 2, 5, 8, 9]);
  });

  it('should handle already sorted array', () => {
    const arr = [1, 2, 3, 4, 5];
    const steps = Array.from(bubbleSort(arr));

    // Should still generate steps but array remains sorted
    expect(steps.length).toBeGreaterThan(0);
    expect(arr).toEqual([1, 2, 3, 4, 5]);
  });

  it('should handle single element array', () => {
    const arr = [1];
    Array.from(bubbleSort(arr));

    expect(arr).toEqual([1]);
  });

  it('should handle empty array', () => {
    const arr: number[] = [];
    const steps = Array.from(bubbleSort(arr));

    expect(steps.length).toBeGreaterThan(0);
  });

  it('should generate animation steps', () => {
    const arr = [3, 1, 2];
    const steps = Array.from(bubbleSort(arr));

    // Should have compare, swap, and sorted steps
    const stepTypes = steps.map(s => s.type);
    expect(stepTypes).toContain('compare');
    expect(stepTypes).toContain('sorted');
  });

  it('should handle array with duplicates', () => {
    const arr = [3, 1, 2, 1, 3];
    Array.from(bubbleSort(arr));

    expect(arr).toEqual([1, 1, 2, 3, 3]);
  });
});
