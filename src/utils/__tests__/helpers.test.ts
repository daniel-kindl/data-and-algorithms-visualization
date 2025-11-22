import { describe, it, expect } from 'vitest';
import { generateRandomArray, isSorted, arrayEqual, swap } from '../helpers';

describe('helpers utility functions', () => {
  describe('generateRandomArray', () => {
    it('should generate array with correct size', () => {
      const size = 10;
      const result = generateRandomArray(size);
      expect(result).toHaveLength(size);
    });

    it('should generate numbers within specified range', () => {
      const min = 1;
      const max = 100;
      const result = generateRandomArray(50, min, max);

      result.forEach((num) => {
        expect(num).toBeGreaterThanOrEqual(min);
        expect(num).toBeLessThanOrEqual(max);
      });
    });

    it('should generate different arrays on multiple calls', () => {
      const arr1 = generateRandomArray(10);
      const arr2 = generateRandomArray(10);

      // Arrays should be different (statistically very unlikely to be the same)
      expect(arr1).not.toEqual(arr2);
    });
  });

  describe('isSorted', () => {
    it('should return true for sorted array', () => {
      expect(isSorted([1, 2, 3, 4, 5])).toBe(true);
    });

    it('should return false for unsorted array', () => {
      expect(isSorted([5, 2, 8, 1, 9])).toBe(false);
    });

    it('should return true for empty array', () => {
      expect(isSorted([])).toBe(true);
    });

    it('should return true for single element array', () => {
      expect(isSorted([1])).toBe(true);
    });

    it('should return true for array with duplicate values', () => {
      expect(isSorted([1, 2, 2, 3, 3, 4])).toBe(true);
    });
  });

  describe('arrayEqual', () => {
    it('should return true for equal arrays', () => {
      expect(arrayEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    });

    it('should return false for arrays with different values', () => {
      expect(arrayEqual([1, 2, 3], [1, 2, 4])).toBe(false);
    });

    it('should return false for arrays with different lengths', () => {
      expect(arrayEqual([1, 2, 3], [1, 2])).toBe(false);
    });

    it('should return true for empty arrays', () => {
      expect(arrayEqual([], [])).toBe(true);
    });
  });

  describe('swap', () => {
    it('should swap two elements in array', () => {
      const arr = [1, 2, 3, 4, 5];
      swap(arr, 1, 3);
      expect(arr).toEqual([1, 4, 3, 2, 5]);
    });

    it('should handle swapping same index', () => {
      const arr = [1, 2, 3];
      swap(arr, 1, 1);
      expect(arr).toEqual([1, 2, 3]);
    });

    it('should swap first and last elements', () => {
      const arr = [1, 2, 3, 4, 5];
      swap(arr, 0, 4);
      expect(arr).toEqual([5, 2, 3, 4, 1]);
    });
  });
});
