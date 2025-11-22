import { describe, it, expect } from 'vitest';
import { mergeSort } from '../mergeSort';

describe('mergeSort', () => {
  it('should sort an unsorted array', () => {
    const arr = [5, 2, 8, 1, 9];
    Array.from(mergeSort(arr));
    expect(arr).toEqual([1, 2, 5, 8, 9]);
  });

  it('should handle already sorted array', () => {
    const arr = [1, 2, 3, 4, 5];
    const steps = Array.from(mergeSort(arr));
    expect(steps.length).toBeGreaterThan(0);
    expect(arr).toEqual([1, 2, 3, 4, 5]);
  });

  it('should handle reverse sorted array', () => {
    const arr = [5, 4, 3, 2, 1];
    Array.from(mergeSort(arr));
    expect(arr).toEqual([1, 2, 3, 4, 5]);
  });

  it('should handle single element array', () => {
    const arr = [1];
    Array.from(mergeSort(arr));
    expect(arr).toEqual([1]);
  });

  it('should handle empty array', () => {
    const arr: number[] = [];
    const steps = Array.from(mergeSort(arr));
    expect(steps.length).toBeGreaterThan(0);
  });

  it('should generate animation steps', () => {
    const arr = [3, 1, 2];
    const steps = Array.from(mergeSort(arr));

    const stepTypes = steps.map(s => s.type);
    expect(stepTypes).toContain('compare');
    expect(stepTypes).toContain('sorted');
  });

  it('should handle array with duplicates', () => {
    const arr = [3, 1, 2, 1, 3];
    Array.from(mergeSort(arr));
    expect(arr).toEqual([1, 1, 2, 3, 3]);
  });
});
