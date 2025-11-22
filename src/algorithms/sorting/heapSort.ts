import type { AnimationStep, AlgorithmInfo } from '../../types';

export const heapSortInfo: AlgorithmInfo = {
  name: 'Heap Sort',
  category: 'sorting',
  complexity: {
    time: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
    },
    space: 'O(1)',
  },
  description:
    'Heap Sort is a comparison-based sorting technique based on Binary Heap data structure. It is similar to selection sort where we first find the maximum element and place the maximum element at the end.',
  timeComplexityDetails: {
    best: 'Even if sorted, building the heap takes O(n) and extracting elements takes O(n log n).',
    average: 'Consistent performance. Heapify operations always take logarithmic time relative to the heap size.',
    worst: 'Same as best and average cases. The height of the heap is always log n, guaranteeing O(n log n).',
  },
};

export const heapSortCode = {
  typescript: `function heapSort(arr: number[]): number[] {
  const n = arr.length;
  
  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  
  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  
  return arr;
}

function heapify(arr: number[], n: number, i: number): void {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  
  if (left < n && arr[left] > arr[largest]) largest = left;
  if (right < n && arr[right] > arr[largest]) largest = right;
  
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}`,
  python: `def heap_sort(arr):
    n = len(arr)
    
    # Build max heap
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
        
    # Extract elements from heap one by one
    for i in range(n - 1, 0, -1):
        arr[i], arr[0] = arr[0], arr[i]
        heapify(arr, i, 0)
        
    return arr

def heapify(arr, n, i):
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2
    
    if left < n and arr[left] > arr[largest]:
        largest = left
        
    if right < n and arr[right] > arr[largest]:
        largest = right
        
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)`,
  java: `public class HeapSort {
    public static void heapSort(int[] arr) {
        int n = arr.length;
        
        // Build max heap
        for (int i = n / 2 - 1; i >= 0; i--)
            heapify(arr, n, i);
            
        // Extract elements from heap one by one
        for (int i = n - 1; i > 0; i--) {
            int temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;
            
            heapify(arr, i, 0);
        }
    }
    
    static void heapify(int[] arr, int n, int i) {
        int largest = i;
        int left = 2 * i + 1;
        int right = 2 * i + 2;
        
        if (left < n && arr[left] > arr[largest])
            largest = left;
            
        if (right < n && arr[right] > arr[largest])
            largest = right;
            
        if (largest != i) {
            int swap = arr[i];
            arr[i] = arr[largest];
            arr[largest] = swap;
            
            heapify(arr, n, largest);
        }
    }
}`,
  csharp: `public class HeapSort {
    public static void Sort(int[] arr) {
        int n = arr.Length;
        
        // Build max heap
        for (int i = n / 2 - 1; i >= 0; i--)
            Heapify(arr, n, i);
            
        // Extract elements from heap one by one
        for (int i = n - 1; i > 0; i--) {
            int temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;
            
            Heapify(arr, i, 0);
        }
    }
    
    static void Heapify(int[] arr, int n, int i) {
        int largest = i;
        int left = 2 * i + 1;
        int right = 2 * i + 2;
        
        if (left < n && arr[left] > arr[largest])
            largest = left;
            
        if (right < n && arr[right] > arr[largest])
            largest = right;
            
        if (largest != i) {
            int swap = arr[i];
            arr[i] = arr[largest];
            arr[largest] = swap;
            
            Heapify(arr, n, largest);
        }
    }
}`,
  cpp: `void heapify(std::vector<int>& arr, int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    
    if (left < n && arr[left] > arr[largest])
        largest = left;
        
    if (right < n && arr[right] > arr[largest])
        largest = right;
        
    if (largest != i) {
        std::swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}

void heapSort(std::vector<int>& arr) {
    int n = arr.size();
    
    // Build max heap
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);
        
    // Extract elements from heap one by one
    for (int i = n - 1; i > 0; i--) {
        std::swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}`
};

export function* heapSort(arr: number[]): Generator<AnimationStep> {
  const n = arr.length;

  function* heapify(arr: number[], heapSize: number, i: number): Generator<AnimationStep> {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    yield {
      type: 'active',
      indices: [i],
      description: `Heapifying at index ${i}`,
    };

    if (left < heapSize) {
      yield {
        type: 'compare',
        indices: [left, largest],
        description: `Comparing left child ${arr[left]} with ${arr[largest]}`,
      };

      if (arr[left] > arr[largest]) {
        largest = left;
      }
    }

    if (right < heapSize) {
      yield {
        type: 'compare',
        indices: [right, largest],
        description: `Comparing right child ${arr[right]} with ${arr[largest]}`,
      };

      if (arr[right] > arr[largest]) {
        largest = right;
      }
    }

    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];

      yield {
        type: 'swap',
        indices: [i, largest],
        description: `Swapping ${arr[i]} and ${arr[largest]}`,
      };

      yield* heapify(arr, heapSize, largest);
    }
  }

  // Build max heap
  yield {
    type: 'active',
    indices: Array.from({ length: n }, (_, i) => i),
    description: 'Building max heap',
  };

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    yield* heapify(arr, n, i);
  }

  // Extract elements from heap
  for (let i = n - 1; i > 0; i--) {
    yield {
      type: 'swap',
      indices: [0, i],
      description: `Moving max element ${arr[0]} to sorted position`,
    };

    [arr[0], arr[i]] = [arr[i], arr[0]];

    yield {
      type: 'sorted',
      indices: [i],
      description: `Element ${arr[i]} is now in its final position`,
    };

    yield* heapify(arr, i, 0);
  }

  yield {
    type: 'sorted',
    indices: [0],
    description: 'Sorting complete!',
  };
}
