# SOLID Principles Guide

This document explains how SOLID principles are applied in this codebase.

## Overview

SOLID principles are design guidelines that help create maintainable, scalable, and testable code. While strict enforcement through linting can be restrictive for visualization/educational code, we document these principles for awareness during development and refactoring.

## Enforcement Strategy

- **Active Rules**: Interface segregation, dependency inversion (via `no-explicit-any`)
- **Documented Guidelines**: SRP metrics (file size, function complexity) tracked manually
- **Zero-Warning Policy**: Maintained by commenting out strict rules while keeping documentation

---

## 1. Single Responsibility Principle (SRP)

**Definition**: A class/module should have one, and only one, reason to change.

### Guidelines (Not Enforced)
- Max 800 lines per file
- Max 100 lines per function
- Cyclomatic complexity ≤ 15

### Current Status
Files exceeding guidelines:
- `DataStructuresPage.tsx`: 783 lines (visualization orchestration)
- `AdvancedStructuresPage.tsx`: 564 lines (tree/heap/hash operations)
- `SortingPage.tsx`: 287 lines (sorting visualization)

**Note**: These files handle complex visualization state and are acceptable for this educational context.

### Refactoring Suggestions

#### ❌ Before (Violates SRP)
```typescript
function UserDashboard() {
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);
  
  // Authentication logic
  useEffect(() => {
    fetch('/api/auth').then(/* ... */);
  }, []);
  
  // Data fetching
  useEffect(() => {
    fetch('/api/data').then(/* ... */);
  }, []);
  
  // Animation logic
  const [isAnimating, setIsAnimating] = useState(false);
  useEffect(() => {
    // Complex animation code
  }, []);
  
  return (
    <div>
      {/* Complex rendering */}
    </div>
  );
}
```

#### ✅ After (Follows SRP)
```typescript
// hooks/useAuth.ts
export function useAuth() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch('/api/auth').then(setUser);
  }, []);
  return user;
}

// hooks/useData.ts
export function useData(userId: string) {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`/api/data/${userId}`).then(setData);
  }, [userId]);
  return data;
}

// hooks/useAnimation.ts (already exists in this project!)
export function useAnimation() {
  // Animation logic isolated
}

// components/UserDashboard.tsx
function UserDashboard() {
  const user = useAuth();
  const data = useData(user?.id);
  const animation = useAnimation();
  
  return <DashboardView user={user} data={data} />;
}
```

---

## 2. Open/Closed Principle (OCP)

**Definition**: Software entities should be open for extension, closed for modification.

### Active Rules
- ✅ `@typescript-eslint/prefer-readonly`: 'warn'
- ✅ `prefer-const`: 'error' (already enabled)

### Implementation Examples

#### ✅ Good: Algorithm Strategy Pattern
```typescript
// types.ts
interface SortAlgorithm {
  name: string;
  timeComplexity: ComplexityInfo;
  generator: (data: number[]) => Generator<AnimationStep>;
  code: string;
}

// algorithms/sorting/index.ts
export const sortingAlgorithms: SortAlgorithm[] = [
  {
    name: 'Bubble Sort',
    timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    generator: bubbleSortGenerator,
    code: bubbleSortCode,
  },
  {
    name: 'Quick Sort',
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' },
    generator: quickSortGenerator,
    code: quickSortCode,
  },
  // Add new algorithms without modifying existing code
];
```

#### ✅ Good: Visualizer Components
```typescript
// Instead of one giant visualizer with if/else
interface VisualizerProps {
  data: number[];
  highlight?: number[];
}

// Separate components for each data structure
export const ArrayVisualizer: React.FC<VisualizerProps> = (props) => {/* ... */};
export const StackVisualizer: React.FC<VisualizerProps> = (props) => {/* ... */};
export const TreeVisualizer: React.FC<TreeVisualizerProps> = (props) => {/* ... */};
```

---

## 3. Liskov Substitution Principle (LSP)

**Definition**: Subtypes must be substitutable for their base types.

### Enforcement
- Naturally enforced by TypeScript's structural type system
- Strict mode ensures type safety

### Example

```typescript
// All implementations must satisfy the interface contract
interface DataStructureOperation {
  execute(data: number[], value: number, index?: number): Generator<AnimationStep>;
}

class ArrayInsert implements DataStructureOperation {
  execute(data: number[], value: number, index: number) {
    // Must return Generator<AnimationStep>
    return arrayInsertGenerator(data, value, index);
  }
}

class StackPush implements DataStructureOperation {
  execute(data: number[], value: number) {
    // Index is optional, can be omitted
    return stackPushGenerator(data, value);
  }
}

// Both can be used interchangeably
function animate(operation: DataStructureOperation, data: number[], value: number) {
  const generator = operation.execute(data, value);
  // Works with any implementation
}
```

---

## 4. Interface Segregation Principle (ISP)

**Definition**: Clients shouldn't be forced to depend on interfaces they don't use.

### Active Rules
- ✅ `@typescript-eslint/no-empty-interface`: 'error'

### Implementation Examples

#### ❌ Bad: Fat Interface
```typescript
interface DataStructureVisualizerProps {
  // Array/Stack/Queue props
  data: number[];
  highlightIndices?: number[];
  
  // Tree-only props
  nodes?: Map<string, TreeNode>;
  root?: string | null;
  
  // Graph-only props
  edges?: Edge[];
  vertices?: Vertex[];
  
  // Heap-only props
  heapType?: 'min' | 'max';
}

// Array visualizer forced to have unused tree/graph props
<ArrayVisualizer data={data} nodes={undefined} edges={undefined} />
```

#### ✅ Good: Segregated Interfaces
```typescript
// src/components/Visualizer/ArrayVisualizer.tsx
interface ArrayVisualizerProps {
  data: number[];
  highlightIndices?: number[];
  highlightType?: 'compare' | 'swap' | 'sorted' | 'active';
}

// src/components/Visualizer/TreeVisualizer.tsx
interface TreeVisualizerProps {
  nodes: Map<string, TreeNode>;
  root: string | null;
  highlightedNodes?: string[];
  width?: number;
  height?: number;
}

// Each component only receives props it needs
<ArrayVisualizer data={data} highlightIndices={[0, 1]} />
<TreeVisualizer nodes={nodes} root={root} />
```

---

## 5. Dependency Inversion Principle (DIP)

**Definition**: High-level modules shouldn't depend on low-level modules. Both should depend on abstractions.

### Active Rules
- ✅ `@typescript-eslint/no-explicit-any`: 'error'

### Implementation Examples

#### ❌ Bad: Depends on Concrete Implementation
```typescript
import BubbleSortClass from './BubbleSortClass';

function SortingPage() {
  const algorithm = new BubbleSortClass();
  
  function runSort() {
    algorithm.sort(data); // Tightly coupled to BubbleSortClass
  }
}
```

#### ✅ Good: Depends on Abstraction
```typescript
// types.ts (abstraction)
export interface SortAlgorithm {
  name: string;
  generator: (data: number[]) => Generator<AnimationStep>;
}

// SortingPage.tsx (high-level module)
function SortingPage() {
  const [algorithm, setAlgorithm] = useState<SortAlgorithm>(sortingAlgorithms[0]);
  
  function runSort() {
    const generator = algorithm.generator(data); // Works with any algorithm
    for (const step of generator) {
      animateStep(step);
    }
  }
}

// algorithms/sorting/bubbleSort.ts (low-level module)
export const bubbleSort: SortAlgorithm = {
  name: 'Bubble Sort',
  generator: bubbleSortGenerator,
};
```

#### ✅ Good: Dependency Injection via Props
```typescript
interface AnimationControlsProps {
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  // Depends on callbacks, not specific implementations
}

function AnimationControls({ onPlay, onPause, onReset }: AnimationControlsProps) {
  return (
    <>
      <button onClick={onPlay}>Play</button>
      <button onClick={onPause}>Pause</button>
      <button onClick={onReset}>Reset</button>
    </>
  );
}
```

---

## Tools & Commands

### Enable SOLID Warnings (For Refactoring)

Uncomment these lines in `eslint.config.js`:

```javascript
// Single Responsibility Principle
'max-lines': ['warn', { max: 800, skipBlankLines: true, skipComments: true }],
'max-lines-per-function': ['warn', { max: 100, skipBlankLines: true, skipComments: true }],
'complexity': ['warn', 15],
```

Then run:
```bash
npx eslint src
```

### Check Complexity of Specific File
```bash
npx eslint src/pages/DataStructuresPage.tsx
```

### TypeScript Strict Mode
Already enabled in `tsconfig.app.json`:
- `strict: true`
- `noImplicitAny: true`
- `strictNullChecks: true`
- `noImplicitReturns: true`

---

## Summary

| Principle | Enforcement | Status |
|-----------|-------------|--------|
| **Single Responsibility** | Documented (not enforced) | Guidelines in place |
| **Open/Closed** | `prefer-readonly`, `prefer-const` | ✅ Active |
| **Liskov Substitution** | TypeScript strict mode | ✅ Active |
| **Interface Segregation** | `no-empty-interface` | ✅ Active |
| **Dependency Inversion** | `no-explicit-any` | ✅ Active |

**Philosophy**: We document SOLID principles and enforce where practical, but allow flexibility for educational/visualization code that benefits from co-location of related concerns.
