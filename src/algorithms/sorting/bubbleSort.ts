import type { AnimationStep, AlgorithmInfo } from '../../types';

export const bubbleSortInfo: AlgorithmInfo = {
  name: 'Bubble Sort',
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
    'Bubble Sort repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.',
  timeComplexityDetails: {
    best: 'Occurs when the array is already sorted. The algorithm only needs one pass to confirm no swaps are needed.',
    average: 'Occurs when elements are in random order. Requires nested loops to bubble elements to their correct positions.',
    worst: 'Occurs when the array is sorted in reverse order. Every element must be swapped to move to its correct position.',
  },
};

export const bubbleSortCode = {
  typescript: `function bubbleSort(arr: number[]): number[] {
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    
    for (let j = 0; j < n - i - 1; j++) {
      // Compare adjacent elements
      if (arr[j] > arr[j + 1]) {
        // Swap if in wrong order
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    
    // If no swaps, array is sorted
    if (!swapped) break;
  }
  
  return arr;
}`,
  python: `def bubble_sort(arr):
    n = len(arr)
    
    for i in range(n - 1):
        swapped = False
        
        for j in range(n - i - 1):
            # Compare adjacent elements
            if arr[j] > arr[j + 1]:
                # Swap if in wrong order
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        
        # If no swaps, array is sorted
        if not swapped:
            break
            
    return arr`,
  java: `public class BubbleSort {
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        
        for (int i = 0; i < n - 1; i++) {
            boolean swapped = false;
            
            for (int j = 0; j < n - i - 1; j++) {
                // Compare adjacent elements
                if (arr[j] > arr[j + 1]) {
                    // Swap if in wrong order
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            
            // If no swaps, array is sorted
            if (!swapped) break;
        }
    }
}`,
  csharp: `public class BubbleSort {
    public static void Sort(int[] arr) {
        int n = arr.Length;
        
        for (int i = 0; i < n - 1; i++) {
            bool swapped = false;
            
            for (int j = 0; j < n - i - 1; j++) {
                // Compare adjacent elements
                if (arr[j] > arr[j + 1]) {
                    // Swap if in wrong order
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            
            // If no swaps, array is sorted
            if (!swapped) break;
        }
    }
}`,
  cpp: `void bubbleSort(std::vector<int>& arr) {
    int n = arr.size();
    
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        
        for (int j = 0; j < n - i - 1; j++) {
            // Compare adjacent elements
            if (arr[j] > arr[j + 1]) {
                // Swap if in wrong order
                std::swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        
        // If no swaps, array is sorted
        if (!swapped) break;
    }
}`
};

// Generator function that yields AnimationSteps.
// This allows the animation engine to pause execution at each yield,
// render the state, and wait for the next tick.
export function* bubbleSort(arr: number[]): Generator<AnimationStep> {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;

    for (let j = 0; j < n - i - 1; j++) {
      // Yield a 'compare' step to highlight elements being compared.
      yield {
        type: 'compare',
        indices: [j, j + 1],
        description: `Comparing ${arr[j]} and ${arr[j + 1]}`,
      };

      if (arr[j] > arr[j + 1]) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;

        // Yield a 'swap' step to visualize the swap.
        yield {
          type: 'swap',
          indices: [j, j + 1],
          description: `Swapping ${arr[j + 1]} and ${arr[j]}`,
        };
      }
    }

    // Mark the last element of this pass as sorted.
    // In Bubble Sort, the largest element "bubbles up" to the end in each pass.
    yield {
      type: 'sorted',
      indices: [n - i - 1],
      description: `Element ${arr[n - i - 1]} is now in its correct position`,
    };

    // Optimization: If no swaps occurred in this pass, the array is already sorted.
    if (!swapped) {
      // Mark all remaining elements as sorted
      for (let k = 0; k < n - i - 1; k++) {
        yield {
          type: 'sorted',
          indices: [k],
          description: 'No swaps made - array is sorted',
        };
      }
      break;
    }
  }

  // Mark the first element as sorted (it's the only one left).
  yield {
    type: 'sorted',
    indices: [0],
    description: 'Sorting complete!',
  };
}
