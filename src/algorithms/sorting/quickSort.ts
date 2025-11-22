import type { AnimationStep, AlgorithmInfo } from '../../types';

export const quickSortInfo: AlgorithmInfo = {
  name: 'Quick Sort',
  category: 'sorting',
  complexity: {
    time: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)',
    },
    space: 'O(log n)',
  },
  description:
    'Quick Sort is a divide and conquer algorithm. It picks an element as pivot and partitions the given array around the picked pivot.',
  timeComplexityDetails: {
    best: 'Occurs when the pivot always divides the array into two nearly equal halves.',
    average: 'On average, the pivot divides the array reasonably well, leading to logarithmic recursion depth.',
    worst: 'Occurs when the pivot is always the smallest or largest element (e.g., sorted array with first/last element pivot), creating unbalanced partitions.',
  },
};

export const quickSortCode = {
  typescript: `function quickSort(arr: number[], low: number, high: number): void {
  if (low < high) {
    const pivotIndex = partition(arr, low, high);
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
}

function partition(arr: number[], low: number, high: number): number {
  const pivot = arr[high];
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`,
  python: `def quick_sort(arr, low, high):
    if low < high:
        pivot_index = partition(arr, low, high)
        quick_sort(arr, low, pivot_index - 1)
        quick_sort(arr, pivot_index + 1, high)

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    
    for j in range(low, high):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
            
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1`,
  java: `public class QuickSort {
    public static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pivotIndex = partition(arr, low, high);
            quickSort(arr, low, pivotIndex - 1);
            quickSort(arr, pivotIndex + 1, high);
        }
    }
    
    private static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = low - 1;
        
        for (int j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        
        return i + 1;
    }
}`,
  csharp: `public class QuickSort {
    public static void Sort(int[] arr, int low, int high) {
        if (low < high) {
            int pivotIndex = Partition(arr, low, high);
            Sort(arr, low, pivotIndex - 1);
            Sort(arr, pivotIndex + 1, high);
        }
    }
    
    private static int Partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = low - 1;
        
        for (int j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        
        return i + 1;
    }
}`,
  cpp: `int partition(std::vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            std::swap(arr[i], arr[j]);
        }
    }
    
    std::swap(arr[i + 1], arr[high]);
    return i + 1;
}

void quickSort(std::vector<int>& arr, int low, int high) {
    if (low < high) {
        int pivotIndex = partition(arr, low, high);
        quickSort(arr, low, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, high);
    }
}`
};

export function* quickSort(arr: number[]): Generator<AnimationStep> {
  yield* quickSortHelper(arr, 0, arr.length - 1);

  yield {
    type: 'sorted',
    indices: Array.from({ length: arr.length }, (_, i) => i),
    description: 'Sorting complete!',
  };
}

function* quickSortHelper(arr: number[], low: number, high: number): Generator<AnimationStep> {
  if (low < high) {
    const pivotIndex = yield* partition(arr, low, high);
    yield* quickSortHelper(arr, low, pivotIndex - 1);
    yield* quickSortHelper(arr, pivotIndex + 1, high);
  }
}

function* partition(arr: number[], low: number, high: number): Generator<AnimationStep, number> {
  const pivot = arr[high];
  let i = low - 1;

  yield {
    type: 'active',
    indices: [high],
    description: `Pivot selected: ${pivot}`,
  };

  for (let j = low; j < high; j++) {
    yield {
      type: 'compare',
      indices: [j, high],
      description: `Comparing ${arr[j]} with pivot ${pivot}`,
    };

    if (arr[j] < pivot) {
      i++;
      if (i !== j) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        yield {
          type: 'swap',
          indices: [i, j],
          description: `Swapping ${arr[i]} and ${arr[j]}`,
        };
      }
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  yield {
    type: 'swap',
    indices: [i + 1, high],
    description: `Placing pivot ${arr[i + 1]} at correct position`,
  };

  yield {
    type: 'sorted',
    indices: [i + 1],
    description: `Pivot ${arr[i + 1]} is now in its final position`,
  };

  return i + 1;
}
