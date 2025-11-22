# Testing Guide

## Overview

This project uses **Vitest** as the test runner and **React Testing Library** for component testing.

## Running Tests

```bash
# Run tests in watch mode (recommended for development)
npm test

# Run tests once
npm test -- --run

# Run tests with UI
npm run test:ui

# Run tests with coverage report
npm run test:coverage
```

## Test Structure

### Unit Tests

Located in `__tests__` directories next to the code being tested:

```
src/algorithms/sorting/
├── __tests__/
│   ├── bubbleSort.test.ts
│   └── quickSort.test.ts
├── bubbleSort.ts
└── quickSort.ts
```

### Example Unit Test

```typescript
import { describe, it, expect } from 'vitest';
import { generateRandomArray } from '../helpers';

describe('generateRandomArray', () => {
  it('should generate array with correct size', () => {
    const size = 10;
    const result = generateRandomArray(size);
    expect(result).toHaveLength(size);
  });

  it('should generate numbers within range', () => {
    const result = generateRandomArray(50, 1, 100);
    result.forEach((num) => {
      expect(num).toBeGreaterThanOrEqual(1);
      expect(num).toBeLessThanOrEqual(100);
    });
  });
});
```

### Component Tests

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@test/utils/test-utils';
import { Navbar } from '@components/Layout';

describe('Navbar', () => {
  it('should render logo', () => {
    render(<Navbar />);
    expect(screen.getByText('Algo Visualizer')).toBeInTheDocument();
  });

  it('should render navigation links', () => {
    render(<Navbar />);
    expect(screen.getByText('Sorting')).toBeInTheDocument();
    expect(screen.getByText('Data Structures')).toBeInTheDocument();
  });
});
```

## Testing Utilities

### Custom Render

Use the custom `render` function that includes providers:

```typescript
import { render, screen } from '@test/utils/test-utils';

// Automatically wraps with ThemeProvider and BrowserRouter
render(<YourComponent />);
```

### Mock Data

Use mock data from `@test/mocks/mockData`:

```typescript
import { mockArray, mockAnimationSteps } from '@test/mocks/mockData';
```

## Best Practices

### 1. Test Naming

```typescript
describe('ComponentName or functionName', () => {
  it('should describe expected behavior', () => {
    // test implementation
  });
});
```

### 2. Arrange-Act-Assert Pattern

```typescript
it('should sort array', () => {
  // Arrange
  const input = [5, 2, 8, 1, 9];
  
  // Act
  const result = bubbleSort(input);
  
  // Assert
  expect(result).toEqual([1, 2, 5, 8, 9]);
});
```

### 3. What to Test

#### ✅ Do Test:
- Public APIs and functions
- User interactions
- Component rendering
- Edge cases and error handling
- Business logic

#### ❌ Don't Test:
- Implementation details
- Third-party libraries
- Styles (unless critical to functionality)

### 4. Component Testing

```typescript
import { render, screen, fireEvent } from '@test/utils/test-utils';

it('should handle button click', async () => {
  const handleClick = vi.fn();
  render(<Button onClick={handleClick}>Click me</Button>);
  
  const button = screen.getByRole('button', { name: /click me/i });
  await fireEvent.click(button);
  
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### 5. Async Testing

```typescript
import { waitFor } from '@testing-library/react';

it('should load data', async () => {
  render(<DataComponent />);
  
  await waitFor(() => {
    expect(screen.getByText('Loaded')).toBeInTheDocument();
  });
});
```

## Coverage Goals

- **Statements**: > 80%
- **Branches**: > 75%
- **Functions**: > 80%
- **Lines**: > 80%

### View Coverage Report

```bash
npm run test:coverage
open coverage/index.html  # macOS
start coverage/index.html # Windows
```

## Testing Algorithms

### Sort Algorithms

```typescript
describe('bubbleSort', () => {
  it('should sort unsorted array', () => {
    const steps = Array.from(bubbleSort([5, 2, 8, 1, 9]));
    const lastStep = steps[steps.length - 1];
    expect(lastStep.array).toEqual([1, 2, 5, 8, 9]);
  });

  it('should handle edge cases', () => {
    expect(Array.from(bubbleSort([]))).toBeDefined();
    expect(Array.from(bubbleSort([1]))).toBeDefined();
  });
});
```

## Testing Data Structures

```typescript
describe('Stack', () => {
  it('should push and pop elements', () => {
    const stack = new Stack();
    stack.push(1);
    stack.push(2);
    
    expect(stack.pop()).toBe(2);
    expect(stack.pop()).toBe(1);
  });

  it('should throw on empty pop', () => {
    const stack = new Stack();
    expect(() => stack.pop()).toThrow();
  });
});
```

## Debugging Tests

### VS Code Debugger

Add to `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Tests",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["test", "--", "--run"],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

### Console Output

```typescript
import { screen } from '@testing-library/react';

// Debug entire component tree
screen.debug();

// Debug specific element
screen.debug(screen.getByRole('button'));
```

## Common Testing Patterns

### Testing Custom Hooks

```typescript
import { renderHook, act } from '@testing-library/react';
import { useAnimationEngine } from '../useAnimationEngine';

it('should manage animation state', () => {
  const { result } = renderHook(() => useAnimationEngine());
  
  act(() => {
    result.current.start();
  });
  
  expect(result.current.isPlaying).toBe(true);
});
```

### Mocking Functions

```typescript
import { vi } from 'vitest';

const mockCallback = vi.fn();

it('should call callback', () => {
  component.onClick(mockCallback);
  expect(mockCallback).toHaveBeenCalled();
});
```

### Testing Context

```typescript
import { render } from '@test/utils/test-utils';
import { useTheme } from '@context/ThemeContext';

function TestComponent() {
  const { theme } = useTheme();
  return <div>{theme}</div>;
}

it('should provide theme context', () => {
  const { getByText } = render(<TestComponent />);
  expect(getByText(/light|dark/)).toBeInTheDocument();
});
```

## CI/CD Integration

Tests run automatically in CI pipeline:

```yaml
# .github/workflows/test.yml
- name: Run tests
  run: npm test -- --run
  
- name: Generate coverage
  run: npm run test:coverage
```

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
