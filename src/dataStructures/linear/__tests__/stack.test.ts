import { describe, it, expect } from 'vitest';
import {
  stackPush,
  stackPop,
  stackPeek,
  stackSearch,
  stackIsEmpty,
  stackSize,
} from '../stack';

describe('Stack Operations', () => {
  describe('stackPush', () => {
    it('should push element to stack', () => {
      const stack: number[] = [];
      Array.from(stackPush(stack, 1));
      expect(stack).toEqual([1]);

      Array.from(stackPush(stack, 2));
      expect(stack).toEqual([1, 2]);
    });

    it('should handle capacity limit', () => {
      const stack: number[] = [1, 2];
      const capacity = 2;
      const steps = Array.from(stackPush(stack, 3, capacity));

      expect(stack).toEqual([1, 2]); // Should not change
      expect(steps[0].description).toContain('Stack Overflow');
    });
  });

  describe('stackPop', () => {
    it('should pop element from stack', () => {
      const stack = [1, 2];
      Array.from(stackPop(stack));
      expect(stack).toEqual([1]);

      Array.from(stackPop(stack));
      expect(stack).toEqual([]);
    });

    it('should handle empty stack', () => {
      const stack: number[] = [];
      const steps = Array.from(stackPop(stack));

      expect(steps[0].description).toContain('Stack Underflow');
    });
  });

  describe('stackPeek', () => {
    it('should peek top element', () => {
      const stack = [1, 2];
      const steps = Array.from(stackPeek(stack));

      expect(steps.some(s => s.description.includes('Top element is 2'))).toBe(true);
      expect(stack).toEqual([1, 2]); // Should not modify stack
    });

    it('should handle empty stack', () => {
      const stack: number[] = [];
      const steps = Array.from(stackPeek(stack));

      expect(steps[0].description).toContain('Stack is empty');
    });
  });

  describe('stackSearch', () => {
    it('should find element in stack', () => {
      const stack = [1, 2, 3];
      const steps = Array.from(stackSearch(stack, 2));

      expect(steps.some(s => s.type === 'search')).toBe(true);
    });

    it('should not find missing element', () => {
      const stack = [1, 2, 3];
      const steps = Array.from(stackSearch(stack, 4));

      expect(steps.some(s => s.description.includes('not found'))).toBe(true);
    });

    it('should handle empty stack', () => {
      const stack: number[] = [];
      const steps = Array.from(stackSearch(stack, 1));

      expect(steps[0].description).toContain('Stack is empty');
    });
  });

  describe('stackIsEmpty', () => {
    it('should correctly identify empty stack', () => {
      const stack: number[] = [];
      const steps = Array.from(stackIsEmpty(stack));

      expect(steps.some(s => s.description.includes('Stack is EMPTY'))).toBe(true);
    });

    it('should correctly identify non-empty stack', () => {
      const stack = [1];
      const steps = Array.from(stackIsEmpty(stack));

      expect(steps.some(s => s.description.includes('Stack is NOT EMPTY'))).toBe(true);
    });
  });

  describe('stackSize', () => {
    it('should return correct size', () => {
      const stack = [1, 2, 3];
      const steps = Array.from(stackSize(stack));

      expect(steps.some(s => s.description.includes('Stack size: 3'))).toBe(true);
    });
  });
});
