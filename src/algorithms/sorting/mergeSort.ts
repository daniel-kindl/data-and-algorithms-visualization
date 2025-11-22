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
    'Merge Sort is a divide and conquer algorithm that divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves.',
  timeComplexityDetails: {
    best: 'The algorithm always divides the array into halves and merges them, regardless of the initial order.',
    average: 'Consistent performance. The recurrence relation T(n) = 2T(n/2) + O(n) always solves to O(n log n).',
    worst: 'Same as best and average cases. Merge Sort guarantees O(n log n) performance for any input.',
  },
};

export const mergeSortCode = {
  typescript: `function mergeSort(arr: number[]): number[] {
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
}`,
  python: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
        
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
            
    result.extend(left[i:])
    result.extend(right[j:])
    return result`,
  java: `public class MergeSort {
    public static void mergeSort(int[] arr, int n) {
        if (n < 2) return;
        
        int mid = n / 2;
        int[] left = new int[mid];
        int[] right = new int[n - mid];
        
        for (int i = 0; i < mid; i++) left[i] = arr[i];
        for (int i = mid; i < n; i++) right[i - mid] = arr[i];
        
        mergeSort(left, mid);
        mergeSort(right, n - mid);
        
        merge(arr, left, right, mid, n - mid);
    }
    
    public static void merge(int[] arr, int[] left, int[] right, int l, int r) {
        int i = 0, j = 0, k = 0;
        
        while (i < l && j < r) {
            if (left[i] <= right[j]) {
                arr[k++] = left[i++];
            } else {
                arr[k++] = right[j++];
            }
        }
        
        while (i < l) arr[k++] = left[i++];
        while (j < r) arr[k++] = right[j++];
    }
}`,
  csharp: `public class MergeSort {
    public static void Sort(int[] arr) {
        if (arr.Length < 2) return;
        
        int mid = arr.Length / 2;
        int[] left = new int[mid];
        int[] right = new int[arr.Length - mid];
        
        Array.Copy(arr, 0, left, 0, mid);
        Array.Copy(arr, mid, right, 0, arr.Length - mid);
        
        Sort(left);
        Sort(right);
        
        Merge(arr, left, right);
    }
    
    private static void Merge(int[] arr, int[] left, int[] right) {
        int i = 0, j = 0, k = 0;
        
        while (i < left.Length && j < right.Length) {
            if (left[i] <= right[j]) {
                arr[k++] = left[i++];
            } else {
                arr[k++] = right[j++];
            }
        }
        
        while (i < left.Length) arr[k++] = left[i++];
        while (j < right.Length) arr[k++] = right[j++];
    }
}`,
  cpp: `void merge(std::vector<int>& arr, int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;
    
    std::vector<int> L(n1), R(n2);
    
    for (int i = 0; i < n1; i++) L[i] = arr[left + i];
    for (int j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];
    
    int i = 0, j = 0, k = left;
    
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k++] = L[i++];
        } else {
            arr[k++] = R[j++];
        }
    }
    
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(std::vector<int>& arr, int left, int right) {
    if (left >= right) return;
    
    int mid = left + (right - left) / 2;
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
}`,
};

// Generator function for Merge Sort visualization.
// Merge Sort is a divide-and-conquer algorithm that recursively splits the array
// into halves until they are single elements, then merges them back in sorted order.
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

  // Recursively sort left and right halves
  yield* mergeSortHelper(arr, start, mid);
  yield* mergeSortHelper(arr, mid + 1, end);

  // Merge the sorted halves
  yield* merge(arr, start, mid, end);
}

function* merge(arr: number[], start: number, mid: number, end: number): Generator<AnimationStep> {
  // Create temporary arrays for the left and right portions
  const left = arr.slice(start, mid + 1);
  const right = arr.slice(mid + 1, end + 1);
  let i = 0;
  let j = 0;
  let k = start;

  // Compare elements from left and right arrays and place smaller one into original array
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

  // Copy remaining elements of left array, if any
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

  // Copy remaining elements of right array, if any
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
