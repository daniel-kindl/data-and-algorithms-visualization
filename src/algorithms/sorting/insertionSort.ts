import type { AnimationStep, AlgorithmInfo } from '../../types';

export const insertionSortInfo: AlgorithmInfo = {
  name: 'Insertion Sort',
  category: 'sorting',
  complexity: {
    time: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
    },
    space: 'O(1)',
  },
  description:
    'Insertion Sort builds the final sorted array one item at a time. It iterates through an input array and removes one element per iteration, finds the place the element belongs in the array, and then places it there.',
  timeComplexityDetails: {
    best: 'Occurs when the array is already sorted. The inner while loop condition fails immediately for every element.',
    average: 'On average, each element needs to be compared with half of the sorted sub-array.',
    worst: 'Occurs when the array is sorted in reverse order. Each new element must be compared with all elements in the sorted sub-array.',
  },
};

export const insertionSortCode = {
  typescript: `function insertionSort(arr: number[]): number[] {
  const n = arr.length;
  
  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;
    
    // Move elements greater than key one position ahead
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    
    // Insert key at correct position
    arr[j + 1] = key;
  }
  
  return arr;
}`,
  python: `def insertion_sort(arr):
    n = len(arr)
    
    for i in range(1, n):
        key = arr[i]
        j = i - 1
        
        # Move elements greater than key one position ahead
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
            
        # Insert key at correct position
        arr[j + 1] = key
        
    return arr`,
  java: `public class InsertionSort {
    public static void insertionSort(int[] arr) {
        int n = arr.length;
        
        for (int i = 1; i < n; i++) {
            int key = arr[i];
            int j = i - 1;
            
            // Move elements greater than key one position ahead
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            
            // Insert key at correct position
            arr[j + 1] = key;
        }
    }
}`,
  csharp: `public class InsertionSort {
    public static void Sort(int[] arr) {
        int n = arr.Length;
        
        for (int i = 1; i < n; i++) {
            int key = arr[i];
            int j = i - 1;
            
            // Move elements greater than key one position ahead
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            
            // Insert key at correct position
            arr[j + 1] = key;
        }
    }
}`,
  cpp: `void insertionSort(std::vector<int>& arr) {
    int n = arr.size();
    
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        
        // Move elements greater than key one position ahead
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        
        // Insert key at correct position
        arr[j + 1] = key;
    }
}`
};

export function* insertionSort(arr: number[]): Generator<AnimationStep> {
  const n = arr.length;

  yield {
    type: 'sorted',
    indices: [0],
    description: 'First element is considered sorted',
  };

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;

    yield {
      type: 'active',
      indices: [i],
      description: `Selecting ${key} to insert into sorted portion`,
    };

    while (j >= 0 && arr[j] > key) {
      yield {
        type: 'compare',
        indices: [j, j + 1],
        description: `${arr[j]} > ${key}, shifting ${arr[j]} right`,
      };

      arr[j + 1] = arr[j];

      yield {
        type: 'swap',
        indices: [j + 1],
        description: `Shifted ${arr[j + 1]} to position ${j + 1}`,
      };

      j--;
    }

    arr[j + 1] = key;

    yield {
      type: 'active',
      indices: [j + 1],
      description: `Placed ${key} at position ${j + 1}`,
    };

    // Mark the sorted portion up to current position
    yield {
      type: 'sorted',
      indices: Array.from({ length: i + 1 }, (_, idx) => idx),
      description: `First ${i + 1} elements are now sorted`,
    };
  }

  yield {
    type: 'sorted',
    indices: Array.from({ length: n }, (_, i) => i),
    description: 'Sorting complete!',
  };
}
