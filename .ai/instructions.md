# AI Assistant Instructions

## Your Role

You are an expert AI programming assistant helping develop an educational data structures and algorithms visualization platform. Your primary goals are:

1. **Write high-quality, maintainable code** following established patterns
2. **Maintain consistency** with existing codebase
3. **Provide clear explanations** for technical decisions
4. **Test thoroughly** before marking work complete
5. **Document changes** when adding new features

## Critical Rules

### Tailwind CSS v4 (Breaking Changes)
- ❌ **NEVER use `@apply` directive** - Not supported in v4
- ✅ **Use utility classes directly** in JSX/TSX
- ✅ **Use `@theme` directive** for custom design tokens in index.css
- ⚠️ **Don't override Tailwind defaults** with custom CSS variables (breaks utilities like max-w-*)

### TypeScript Strict Mode
- ✅ **Explicit types** for all function parameters and returns
- ✅ **No unused variables** - Remove or prefix with underscore
- ✅ **Type imports** with `type` keyword: `import type { Props } from './types'`
- ✅ **Exact optional properties** - Be explicit about optional fields
- ❌ **Never use `any`** - Use `unknown` if type is uncertain

### Icons & Visual Consistency
- ✅ **Lucide React only** - No emoji, no other icon libraries
- ✅ **Monochrome colors** - `text-gray-900 dark:text-gray-100`
- ✅ **Consistent stroke** - `strokeWidth={1.5}` for all icons
- ✅ **Proper sizing** - Use `size` prop (typically 20-24px)
- ✅ **Dark mode support** - All icons must work in both themes

### Testing Requirements
- ✅ **Test new features** - Write tests for new functionality
- ✅ **Run tests before committing** - `npm test -- --run`
- ✅ **Use test utilities** - Import from `@test/utils/test-utils`
- ✅ **Maintain coverage** - Target >80% coverage
- ✅ **Test both themes** - Verify light and dark mode

## Code Modification Guidelines

### Before Making Changes
1. **Read existing code** - Understand current patterns
2. **Check for similar code** - Maintain consistency
3. **Review related tests** - Understand expected behavior
4. **Plan your approach** - Think through implications

### When Editing Files
1. **Use multi_replace_string_in_file** for multiple changes
2. **Include sufficient context** - 3-5 lines before/after
3. **Preserve formatting** - Match existing indentation/spacing
4. **Update imports** - Use path aliases (@components, @utils, etc.)
5. **Add comments** - Explain complex logic

### After Making Changes
1. **Verify TypeScript compilation** - No type errors
2. **Run tests** - `npm test -- --run`
3. **Check build** - `npm run build`
4. **Test in browser** - Verify functionality
5. **Review changes** - Ensure quality

## Component Development

### Creating New Components
```typescript
// 1. Define props interface
interface MyComponentProps {
  title: string;
  onAction: () => void;
  variant?: 'primary' | 'secondary';
}

// 2. Implement functional component
export function MyComponent({ 
  title, 
  onAction, 
  variant = 'primary' 
}: MyComponentProps) {
  // 3. Use Tailwind utility classes
  // 4. Support dark mode
  // 5. Use semantic HTML
  
  return (
    <div className="p-4 rounded-lg bg-white dark:bg-gray-800">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        {title}
      </h2>
      <button
        onClick={onAction}
        className={`mt-4 px-4 py-2 rounded-lg ${
          variant === 'primary'
            ? 'bg-blue-600 hover:bg-blue-700 text-white'
            : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
        }`}
      >
        Action
      </button>
    </div>
  );
}

// 6. Write tests
// src/components/__tests__/MyComponent.test.tsx
```

### Styling Components
```typescript
// ✅ DO: Use utility classes directly
<div className="flex items-center gap-4 p-6 rounded-lg bg-white dark:bg-gray-800">
  <PlayCircle 
    size={20} 
    strokeWidth={1.5}
    className="text-gray-900 dark:text-gray-100"
  />
  <span className="text-base text-gray-700 dark:text-gray-300">
    Play
  </span>
</div>

// ❌ DON'T: Use @apply (not supported in Tailwind v4)
// .my-component {
//   @apply flex items-center gap-4;
// }

// ❌ DON'T: Use custom CSS variables that override Tailwind
// :root {
//   --spacing-4: 20px; /* This breaks Tailwind's gap-4 utility */
// }
```

## Algorithm Implementation

### Structure
```typescript
// 1. Define types
export interface AlgorithmStep {
  array: number[];
  comparing?: [number, number];
  swapping?: [number, number];
  sorted?: number[];
  description: string;
}

export interface AlgorithmResult {
  steps: AlgorithmStep[];
  comparisons: number;
  swaps: number;
  timeComplexity: string;
}

// 2. Implement algorithm
export function bubbleSort(input: number[]): AlgorithmResult {
  const array = [...input]; // Don't mutate input
  const steps: AlgorithmStep[] = [];
  let comparisons = 0;
  let swaps = 0;
  
  // Algorithm logic with step recording
  
  return {
    steps,
    comparisons,
    swaps,
    timeComplexity: 'O(n²)'
  };
}

// 3. Write comprehensive tests
// - Test with various inputs (empty, single, sorted, reverse, duplicates)
// - Verify step count
// - Check comparison/swap counts
// - Validate output correctness
```

## Testing Guidelines

### Test Structure
```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@test/utils/test-utils';
import { MyComponent } from '../MyComponent';

describe('MyComponent', () => {
  // Group related tests
  describe('rendering', () => {
    it('displays the title', () => {
      render(<MyComponent title="Test" onAction={() => {}} />);
      expect(screen.getByText('Test')).toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('calls onAction when button clicked', async () => {
      const handleAction = vi.fn();
      const { user } = render(
        <MyComponent title="Test" onAction={handleAction} />
      );
      
      await user.click(screen.getByRole('button'));
      expect(handleAction).toHaveBeenCalledOnce();
    });
  });

  describe('dark mode', () => {
    it('applies dark mode classes', () => {
      // Test with ThemeProvider in dark mode
    });
  });
});
```

### Common Test Patterns
```typescript
// Component rendering with providers
import { render } from '@test/utils/test-utils';

// Mock functions
const mockHandler = vi.fn();

// User interactions
const { user } = render(<Component />);
await user.click(screen.getByRole('button'));

// Async operations
await waitFor(() => {
  expect(screen.getByText('Loaded')).toBeInTheDocument();
});

// Query methods
screen.getByRole('button')        // Throws if not found
screen.queryByRole('button')      // Returns null if not found
screen.findByRole('button')       // Async, waits for element
```

## Common Patterns

### State Management
```typescript
// Local state with useState
const [count, setCount] = useState(0);

// Context for global state
const { theme, toggleTheme } = useTheme();

// Derived state
const isEven = count % 2 === 0;
```

### Event Handlers
```typescript
// Named handlers with 'handle' prefix
const handleClick = () => {
  console.log('clicked');
};

const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  setValue(e.target.value);
};

// Pass to elements
<button onClick={handleClick}>Click</button>
<input onChange={handleChange} />
```

### Conditional Rendering
```typescript
// Ternary for two options
{isLoading ? <Spinner /> : <Content />}

// Logical AND for single option
{error && <ErrorMessage error={error} />}

// Early return for complex conditions
if (isLoading) {
  return <Spinner />;
}

if (error) {
  return <ErrorMessage error={error} />;
}

return <Content />;
```

### List Rendering
```typescript
// Always provide key
{items.map((item) => (
  <Item key={item.id} {...item} />
))}

// Use index only if items have no stable ID
{items.map((item, index) => (
  <Item key={index} {...item} />
))}
```

## File Organization

### Import Order
```typescript
// 1. External dependencies
import { useState, useEffect } from 'react';
import { PlayCircle, PauseCircle } from 'lucide-react';

// 2. Internal path alias imports
import { Button } from '@components/Common/Button';
import { useAlgorithm } from '@hooks/useAlgorithm';
import type { AlgorithmStep } from '@types/algorithm';

// 3. Relative imports
import { helper } from './utils';
import type { LocalType } from './types';

// 4. Styles (if any)
import './Component.css';
```

### Export Patterns
```typescript
// Named exports (preferred)
export function Component() {}
export const constant = 'value';
export type { Props };

// Group exports at bottom
export { Component, constant };
export type { Props, State };

// Avoid default exports for components
// (makes refactoring harder)
```

## Error Handling

### Component Error Boundaries
```typescript
// Wrap risky components
<ErrorBoundary fallback={<ErrorFallback />}>
  <RiskyComponent />
</ErrorBoundary>
```

### Async Error Handling
```typescript
try {
  const data = await fetchData();
  setData(data);
} catch (error) {
  console.error('Failed to fetch:', error);
  setError(error instanceof Error ? error.message : 'Unknown error');
}
```

### Type Guards
```typescript
function isValidArray(value: unknown): value is number[] {
  return Array.isArray(value) && value.every(v => typeof v === 'number');
}

if (isValidArray(input)) {
  // TypeScript knows input is number[]
  input.sort();
}
```

## Performance Considerations

### Memoization
```typescript
// Expensive calculations
const sortedData = useMemo(() => {
  return data.slice().sort((a, b) => a - b);
}, [data]);

// Stable callbacks
const handleSort = useCallback(() => {
  setSorted(true);
}, []);
```

### Avoid Unnecessary Re-renders
```typescript
// Extract static parts
const StaticHeader = memo(({ title }: { title: string }) => (
  <h1>{title}</h1>
));

// Use in parent
<StaticHeader title="Algorithms" />
```

## Documentation

### Code Comments
```typescript
// ✅ DO: Explain why, not what
// Skip the first element because it's already in correct position
for (let i = 1; i < array.length; i++) {

// ✅ DO: Document complex logic
/**
 * Performs a binary search on a sorted array.
 * Returns the index of the target element, or -1 if not found.
 * 
 * Time complexity: O(log n)
 * Space complexity: O(1)
 */
export function binarySearch(array: number[], target: number): number {

// ❌ DON'T: State the obvious
// Increment i by 1
i++;
```

### JSDoc for Public APIs
```typescript
/**
 * Visualizes a sorting algorithm step-by-step.
 * 
 * @param algorithm - The sorting algorithm to visualize
 * @param data - The array of numbers to sort
 * @param speed - Animation speed in milliseconds (default: 100)
 * @returns An object containing the sorted array and statistics
 * 
 * @example
 * ```typescript
 * const result = visualizeSort('bubble', [3, 1, 2], 50);
 * console.log(result.sorted); // [1, 2, 3]
 * ```
 */
export function visualizeSort(
  algorithm: string,
  data: number[],
  speed = 100
): SortResult {
```

## Debugging

### Console Logging
```typescript
// Development only
if (import.meta.env.DEV) {
  console.log('Debug info:', data);
}

// Use structured logging
console.group('Algorithm Step');
console.log('Array:', array);
console.log('Comparing:', comparing);
console.groupEnd();
```

### React DevTools
- Use component names for easier debugging
- Add displayName to memoized components
- Use meaningful state variable names

## Communication with User

### Progress Updates
- Confirm understanding before starting
- Report completion clearly
- Mention any issues encountered
- Suggest next steps if appropriate

### Code Changes
- Explain significant changes briefly
- Highlight breaking changes
- Note any required manual steps
- Point out potential issues

### Problem Resolution
- State the problem clearly
- Explain your solution approach
- Verify the fix works
- Suggest prevention strategies

## Workflow Checklist

Before finishing any task:
- [ ] TypeScript compiles without errors
- [ ] All tests pass (`npm test -- --run`)
- [ ] Build succeeds (`npm run build`)
- [ ] Code follows style guidelines
- [ ] Dark mode works
- [ ] Icons are consistent
- [ ] Path aliases used
- [ ] No console errors
- [ ] Changes are documented (if needed)

---

**Remember:** Quality over speed. Take time to do it right the first time.
