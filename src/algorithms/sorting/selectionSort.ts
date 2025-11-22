import type { AnimationStep, AlgorithmInfo } from '../../types';

export const selectionSortInfo: AlgorithmInfo = {
  name: 'Selection Sort',
  category: 'sorting',
  complexity: {
    time: {
      best: 'O(n²)',
      average: 'O(n²)',
      worst: 'O(n²)',
    },
    space: 'O(1)',
  },
  description:
    'Selection Sort divides the input list into two parts: a sorted sublist of items which is built up from left to right at the front (left) of the list and a sublist of the remaining unsorted items that occupy the rest of the list.',
  timeComplexityDetails: {
    best: 'Even if the array is sorted, the algorithm must scan the remaining unsorted portion to find the minimum element.',
    average: 'Requires scanning the unsorted portion for every position, resulting in quadratic time regardless of data distribution.',
    worst: 'Same as best and average cases; the algorithm always performs the same number of comparisons.',
  },
};

export const selectionSortCode = {
  typescript: `function selectionSort(arr: number[]): number[] {
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    
    // Find the minimum element in unsorted array
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    
    // Swap the minimum with the first element
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  
  return arr;
}`,
  python: `def selection_sort(arr):
    n = len(arr)
    
    for i in range(n - 1):
        min_index = i
        
        # Find the minimum element in unsorted array
        for j in range(i + 1, n):
            if arr[j] < arr[min_index]:
                min_index = j
                
        # Swap the minimum with the first element
        if min_index != i:
            arr[i], arr[min_index] = arr[min_index], arr[i]
            
    return arr`,
  java: `public class SelectionSort {
    public static void selectionSort(int[] arr) {
        int n = arr.length;
        
        for (int i = 0; i < n - 1; i++) {
            int minIndex = i;
            
            // Find the minimum element in unsorted array
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
            }
            
            // Swap the minimum with the first element
            if (minIndex != i) {
                int temp = arr[i];
                arr[i] = arr[minIndex];
                arr[minIndex] = temp;
            }
        }
    }
}`,
  csharp: `public class SelectionSort {
    public static void Sort(int[] arr) {
        int n = arr.Length;
        
        for (int i = 0; i < n - 1; i++) {
            int minIndex = i;
            
            // Find the minimum element in unsorted array
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
            }
            
            // Swap the minimum with the first element
            if (minIndex != i) {
                int temp = arr[i];
                arr[i] = arr[minIndex];
                arr[minIndex] = temp;
            }
        }
    }
}`,
  cpp: `void selectionSort(std::vector<int>& arr) {
    int n = arr.size();
    
    for (int i = 0; i < n - 1; i++) {
        int minIndex = i;
        
        // Find the minimum element in unsorted array
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        
        // Swap the minimum with the first element
        if (minIndex != i) {
            std::swap(arr[i], arr[minIndex]);
        }
    }
}`,
};

// Generator function for Selection Sort visualization.
// Selection Sort works by repeatedly finding the minimum element from the unsorted part
// and putting it at the beginning.
export function* selectionSort(arr: number[]): Generator<AnimationStep> {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;

    yield {
      type: 'minimum',
      indices: [i],
      description: `Starting position ${i}, current minimum: ${arr[minIndex]}`,
    };

    // Find the minimum element in the unsorted sub-array
    for (let j = i + 1; j < n; j++) {
      yield {
        type: 'compare',
        indices: [minIndex, j],
        description: `Comparing current minimum ${arr[minIndex]} with ${arr[j]}`,
      };

      if (arr[j] < arr[minIndex]) {
        minIndex = j;
        yield {
          type: 'minimum',
          indices: [minIndex],
          description: `New minimum found: ${arr[minIndex]} at index ${minIndex}`,
        };
      }
    }

    // Swap the found minimum element with the first element of the unsorted sub-array
    if (minIndex !== i) {
      yield {
        type: 'swap',
        indices: [i, minIndex],
        description: `Swapping ${arr[i]} with minimum ${arr[minIndex]}`,
      };

      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }

    yield {
      type: 'sorted',
      indices: [i],
      description: `Element ${arr[i]} is now in its correct position`,
    };
  }

  yield {
    type: 'sorted',
    indices: [n - 1],
    description: 'Sorting complete!',
  };
}
