# Code Style Guide

This document outlines the code conventions enforced by ESLint, TypeScript, Prettier, and EditorConfig for this project.

## 🎯 Naming Conventions

### Variables
- **camelCase** for regular variables: `const userName = 'John';`
- **UPPER_CASE** for constants: `const MAX_SIZE = 100;`
- **PascalCase** for React components: `const UserProfile = () => {};`
- Prefix unused variables with underscore: `const _unused = 5;`

### Functions
- **camelCase** for regular functions: `function calculateTotal() {}`
- **PascalCase** for React components: `function UserCard() {}`
- Generator functions: `function* generateSteps() {}`

### Types & Interfaces
- **PascalCase** for all type definitions
- **NO "I" prefix** for interfaces ❌
  ```typescript
  // ❌ Bad
  interface IUser {}
  
  // ✅ Good
  interface User {}
  interface UserProps {}
  type AnimationStep = {};
  ```

### Classes & Enums
- **PascalCase** for class names: `class DataStructure {}`
- **UPPER_CASE** for enum members:
  ```typescript
  enum Color {
    PRIMARY_RED,
    SECONDARY_BLUE,
  }
  ```

## 📐 Code Formatting

### Indentation
- **2 spaces** (no tabs) for TypeScript/JavaScript/React
- **2 spaces** for JSON, CSS, HTML, YAML
- **Tabs** for Makefiles (required)

### Line Length
- **Maximum 100 characters** per line
- Exceptions: comments, strings, URLs

### Semicolons & Quotes
- **Always use semicolons**: `const x = 5;`
- **Single quotes** for strings: `'hello'`
- **Double quotes** for JSX attributes: `<div className="container">`

### Spacing
```typescript
// ✅ Good spacing
const arr = [1, 2, 3];
const obj = { name: 'John', age: 30 };
if (condition) {
  doSomething();
}

// Arrow functions
const add = (a, b) => a + b;

// Destructuring
const { name, age } = user;
```

### Trailing Commas
- **Always** in multiline structures:
```typescript
const obj = {
  name: 'John',
  age: 30,  // ← comma here
};

const arr = [
  1,
  2,
  3,  // ← comma here
];
```

## 🏗️ Class & Method Organization

### Member Order (enforced by ESLint)
```typescript
class Example {
  // 1. Index signatures
  [key: string]: any;

  // 2. Static fields
  public static staticPublic = 1;
  protected static staticProtected = 2;
  private static staticPrivate = 3;

  // 3. Instance fields
  public instancePublic = 4;
  protected instanceProtected = 5;
  private instancePrivate = 6;

  // 4. Constructor
  constructor() {}

  // 5. Static methods
  public static staticMethodPublic() {}
  protected static staticMethodProtected() {}
  private static staticMethodPrivate() {}

  // 6. Instance methods
  public instanceMethodPublic() {}
  protected instanceMethodProtected() {}
  private instanceMethodPrivate() {}
}
```

## 📦 Imports

### Type Imports
- **Always** use type-only imports for types:
```typescript
// ✅ Good
import type { User, Product } from './types';
import { fetchData } from './api';

// ❌ Bad
import { User, Product, fetchData } from './types';
```

### Import Order
```typescript
// 1. React imports
import { useState, useEffect } from 'react';

// 2. Third-party libraries
import { Link } from 'react-router-dom';

// 3. Type imports
import type { User } from './types';

// 4. Local imports
import { fetchData } from './utils';
```

## ⚛️ React Best Practices

### Component Definition
```typescript
// ✅ Functional components with proper types
interface UserCardProps {
  name: string;
  age: number;
}

export default function UserCard({ name, age }: UserCardProps) {
  return <div>{name}</div>;
}
```

### JSX
- **Self-closing tags** when no children:
  ```typescript
  // ✅ Good
  <Input />
  <br />
  
  // ❌ Bad
  <Input></Input>
  ```

- **No unnecessary boolean values**:
  ```typescript
  // ✅ Good
  <Input disabled />
  
  // ❌ Bad
  <Input disabled={true} />
  ```

### Hooks
- Follow Rules of Hooks (enforced)
- Exhaustive dependencies in `useEffect`
- Hooks at top level only

## 🔒 TypeScript Strict Rules

### No `any` Type
```typescript
// ❌ Avoid
const data: any = fetchData();

// ✅ Prefer explicit types
const data: User[] = fetchData();

// ✅ Or unknown for truly unknown types
const data: unknown = fetchData();
```

### Nullish Coalescing
```typescript
// ✅ Prefer ?? over ||
const value = userInput ?? 'default';

// ✅ Optional chaining
const name = user?.profile?.name;
```

### Array Types
```typescript
// ✅ Use array syntax
const numbers: number[] = [1, 2, 3];

// ❌ Avoid generic syntax
const numbers: Array<number> = [1, 2, 3];
```

### No Non-null Assertions
```typescript
// ⚠️ Avoid when possible
const value = data!.value;

// ✅ Prefer safe access
const value = data?.value;
```

## 🚫 Forbidden Patterns

### Console Logs
```typescript
// ❌ Avoid console.log in production
console.log('debug');

// ✅ Allowed for errors/warnings
console.error('Error occurred');
console.warn('Deprecated');
```

### var Keyword
```typescript
// ❌ Never use var
var count = 0;

// ✅ Use const/let
const count = 0;
let mutableCount = 0;
```

### Loose Equality
```typescript
// ❌ Avoid == and !=
if (value == null) {}

// ✅ Use === and !==
if (value === null) {}

// ✅ Exception: checking null/undefined
if (value == null) {}  // checks both null and undefined
```

### Multiple Empty Lines
```typescript
// ❌ Bad


const value = 5;


// ✅ Good
const value = 5;

const another = 10;
```

## 📝 TypeScript Compiler Strictness

Enabled strict checks:
- ✅ `strict` - All strict type checking
- ✅ `noImplicitReturns` - All code paths must return
- ✅ `noImplicitOverride` - Explicit override keyword
- ✅ `noPropertyAccessFromIndexSignature` - Use bracket notation
- ✅ `exactOptionalPropertyTypes` - Strict optional props
- ✅ `forceConsistentCasingInFileNames` - Case-sensitive imports

## 🛠️ Editor Setup

### VS Code Settings
Add to `.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ]
}
```

### Required Extensions
- ESLint (`dbaeumer.vscode-eslint`)
- Prettier (`esbenp.prettier-vscode`)
- EditorConfig (`editorconfig.editorconfig`)

## 🧪 Running Linters

```bash
# Lint all files
npm run lint

# Format with Prettier
npx prettier --write "src/**/*.{ts,tsx}"

# Type check
npm run build
```

## 📚 Examples

### Good Component Example
```typescript
import { useState } from 'react';
import type { AnimationStep } from '../types';

interface VisualizerProps {
  data: number[];
  speed: number;
}

export default function Visualizer({ data, speed }: VisualizerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  return (
    <div className="visualizer">
      <button onClick={handlePlay} disabled={isPlaying}>
        Play
      </button>
      <button onClick={handlePause} disabled={!isPlaying}>
        Pause
      </button>
    </div>
  );
}
```

### Good Data Structure Example
```typescript
import type { AnimationStep } from '../types';

interface TreeNode {
  id: string;
  value: number;
  left: string | null;
  right: string | null;
}

export function* binaryTreeInsert(
  nodes: Map<string, TreeNode>,
  root: string | null,
  value: number
): Generator<AnimationStep> {
  const newNodeId = `node-${Date.now()}`;
  
  yield {
    type: 'highlight',
    indices: [],
    description: `Inserting ${value}`,
  };

  if (!root) {
    const newNode: TreeNode = {
      id: newNodeId,
      value,
      left: null,
      right: null,
    };
    nodes.set(newNodeId, newNode);
    
    yield {
      type: 'insert',
      indices: [0],
      description: `✅ ${value} is now the root`,
    };
    return;
  }

  // ... rest of implementation
}
```

---

## 🏗️ SOLID Principles

This codebase enforces SOLID principles through ESLint rules and TypeScript configuration.

### Single Responsibility Principle (SRP)
- **Each module/class should have one reason to change**
- Enforced by:
  - `max-lines`: 500 lines per file (warn)
  - `max-lines-per-function`: 50 lines per function (warn)
  - `complexity`: Cyclomatic complexity ≤ 10 (warn)

**Example:**
```typescript
// ❌ Bad - Component does too much
function UserDashboard() {
  // Fetches data
  // Handles authentication
  // Renders UI
  // Manages animation
  // ... 500+ lines
}

// ✅ Good - Separated concerns
function UserDashboard() {
  const user = useAuth();
  const data = useUserData(user.id);
  return <DashboardView user={user} data={data} />;
}
```

### Open/Closed Principle (OCP)
- **Open for extension, closed for modification**
- Enforced by:
  - `@typescript-eslint/prefer-readonly`: Prefer readonly properties
  - `prefer-const`: Use const for values that don't change

**Example:**
```typescript
// ❌ Bad - Must modify class to add new algorithm
class Sorter {
  sort(data: number[], algorithm: string) {
    if (algorithm === 'bubble') { /* ... */ }
    else if (algorithm === 'quick') { /* ... */ }
  }
}

// ✅ Good - Extend through configuration
interface SortAlgorithm {
  name: string;
  generator: (data: number[]) => Generator<AnimationStep>;
}

const algorithms: SortAlgorithm[] = [
  { name: 'Bubble Sort', generator: bubbleSortGenerator },
  { name: 'Quick Sort', generator: quickSortGenerator },
];
```

### Liskov Substitution Principle (LSP)
- **Subtypes must be substitutable for base types**
- Enforced by TypeScript's structural typing and strict mode

**Example:**
```typescript
// ✅ Good - All implementations satisfy the interface
interface Visualizer {
  render(data: number[]): void;
}

class ArrayVisualizer implements Visualizer {
  render(data: number[]) { /* ... */ }
}

class TreeVisualizer implements Visualizer {
  render(data: number[]) { /* ... */ }
}
```

### Interface Segregation Principle (ISP)
- **Clients shouldn't depend on interfaces they don't use**
- Enforced by:
  - `@typescript-eslint/no-empty-interface`: No empty interfaces

**Example:**
```typescript
// ❌ Bad - Large interface with unused properties
interface AllProps {
  data: number[];
  highlight?: number[];
  tree?: TreeNode;
  graph?: GraphNode;
  // ... many unused props
}

// ✅ Good - Specific interfaces
interface ArrayVisualizerProps {
  data: number[];
  highlight?: number[];
}

interface TreeVisualizerProps {
  tree: TreeNode;
  highlight?: string[];
}
```

### Dependency Inversion Principle (DIP)
- **Depend on abstractions, not concretions**
- Enforced by:
  - `@typescript-eslint/no-explicit-any`: Avoid `any` type
  - `@typescript-eslint/explicit-function-return-type`: Explicit return types (warn)

**Example:**
```typescript
// ❌ Bad - Depends on concrete implementation
function animate(bubbleSort: BubbleSortClass) {
  bubbleSort.sort();
}

// ✅ Good - Depends on abstraction
function animate(algorithm: SortAlgorithm) {
  const generator = algorithm.generator(data);
  for (const step of generator) {
    // ... animate step
  }
}
```

---

**Enforced by:**
- `.editorconfig` - Basic formatting
- `.prettierrc` - Code formatting
- `eslint.config.js` - Code quality & style
- `tsconfig.app.json` - TypeScript strictness
