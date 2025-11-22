import type { AnimationStep, AlgorithmInfo } from '../../types';

export const mergeSortInfo: AlgorithmInfo = {
  name: 'Merge Sort',
  category: 'sorting',
  complexity: {
    time: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
    },
    space: 'O(n)',
  },
  description:
    'Merge Sort is a divide-and-conquer algorithm that divides the array into two halves, recursively sorts them, and then merges the two sorted halves.',
};

export const mergeSortCode = `function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
}

function merge(left: number[], right: number[]): number[] {
  const result: number[] = [];
  let i = 0, j = 0;
  
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  
  return result.concat(left.slice(i)).concat(right.slice(j));
}`;

export function* mergeSort(arr: number[]): Generator<AnimationStep> {
  yield* mergeSortHelper(arr, 0, arr.length - 1);

  yield {
    type: 'sorted',
    indices: Array.from({ length: arr.length }, (_, i) => i),
    description: 'Sorting complete!',
  };
}

function* mergeSortHelper(arr: number[], start: number, end: number): Generator<AnimationStep> {
  if (end - start <= 0) {return;}

  const mid = Math.floor((start + end) / 2);

  yield* mergeSortHelper(arr, start, mid);
  yield* mergeSortHelper(arr, mid + 1, end);
  yield* merge(arr, start, mid, end);
}

function* merge(arr: number[], start: number, mid: number, end: number): Generator<AnimationStep> {
  const left = arr.slice(start, mid + 1);
  const right = arr.slice(mid + 1, end + 1);
  let i = 0;
  let j = 0;
  let k = start;

  while (i < left.length && j < right.length) {
    yield {
      type: 'compare',
      indices: [k],
      description: `Merging: comparing ${left[i]} and ${right[j]}`,
    };

    if (left[i] <= right[j]) {
      arr[k] = left[i];
      i++;
    } else {
      arr[k] = right[j];
      j++;
    }

    yield {
      type: 'swap',
      indices: [k],
      description: `Placed ${arr[k]} at position ${k}`,
    };
    k++;
  }

  while (i < left.length) {
    arr[k] = left[i];
    yield {
      type: 'swap',
      indices: [k],
      description: `Placed ${arr[k]} at position ${k}`,
    };
    i++;
    k++;
  }

  while (j < right.length) {
    arr[k] = right[j];
    yield {
      type: 'swap',
      indices: [k],
      description: `Placed ${arr[k]} at position ${k}`,
    };
    j++;
    k++;
  }

  // Mark merged section as sorted
  for (let idx = start; idx <= end; idx++) {
    yield {
      type: 'sorted',
      indices: [idx],
      description: `Section from ${start} to ${end} merged`,
    };
  }
}
