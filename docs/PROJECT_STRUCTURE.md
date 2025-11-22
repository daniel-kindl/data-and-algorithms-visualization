# Project Structure

This document outlines the recommended structure for the Algorithm & Data Structure Visualizer project.

## Directory Structure

```
data-and-algorithms-visualization/
├── src/
│   ├── algorithms/              # Algorithm implementations
│   │   ├── sorting/
│   │   │   ├── __tests__/      # Unit tests for sorting algorithms
│   │   │   ├── bubbleSort.ts
│   │   │   ├── quickSort.ts
│   │   │   ├── mergeSort.ts
│   │   │   ├── insertionSort.ts
│   │   │   ├── selectionSort.ts
│   │   │   ├── heapSort.ts
│   │   │   └── index.ts        # Barrel export
│   │   └── searching/          # Future: searching algorithms
│   │       ├── __tests__/
│   │       ├── binarySearch.ts
│   │       ├── linearSearch.ts
│   │       └── index.ts
│   ├── dataStructures/         # Data structure implementations
│   │   ├── linear/
│   │   │   ├── __tests__/
│   │   │   ├── arrayOperations.ts
│   │   │   ├── linkedList.ts
│   │   │   ├── stack.ts
│   │   │   ├── queue.ts
│   │   │   └── index.ts
│   │   └── trees/
│   │       ├── __tests__/
│   │       ├── binaryTree.ts
│   │       ├── bst.ts
│   │       ├── heap.ts
│   │       ├── hashTable.ts
│   │       └── index.ts
│   ├── components/             # React components
│   │   ├── Layout/
│   │   │   ├── __tests__/
│   │   │   ├── Layout.tsx
│   │   │   ├── Navbar.tsx
│   │   │   └── index.ts
│   │   ├── Controls/
│   │   │   ├── __tests__/
│   │   │   ├── ControlPanel.tsx
│   │   │   ├── InputPanel.tsx
│   │   │   └── index.ts
│   │   ├── Visualizer/
│   │   │   ├── __tests__/
│   │   │   ├── ArrayVisualizer.tsx
│   │   │   ├── TreeVisualizer.tsx
│   │   │   ├── HeapVisualizer.tsx
│   │   │   ├── HashTableVisualizer.tsx
│   │   │   ├── ComplexityDisplay.tsx
│   │   │   └── index.ts
│   │   ├── DataStructures/
│   │   │   ├── __tests__/
│   │   │   ├── LinkedListVisualizer.tsx
│   │   │   ├── StackVisualizer.tsx
│   │   │   ├── QueueVisualizer.tsx
│   │   │   └── index.ts
│   │   └── CodePanel/
│   │       ├── __tests__/
│   │       ├── CodePanel.tsx
│   │       └── index.ts
│   ├── pages/                  # Route pages
│   │   ├── __tests__/
│   │   ├── Home.tsx
│   │   ├── SortingPage.tsx
│   │   ├── DataStructuresPage.tsx
│   │   ├── AdvancedStructuresPage.tsx
│   │   └── index.ts
│   ├── hooks/                  # Custom React hooks
│   │   ├── __tests__/
│   │   ├── useAnimationEngine.ts
│   │   ├── useLocalStorage.ts  # Future: persist state
│   │   └── index.ts
│   ├── context/                # React Context providers
│   │   ├── __tests__/
│   │   ├── ThemeContext.tsx
│   │   ├── AnimationContext.tsx
│   │   └── index.ts
│   ├── utils/                  # Utility functions
│   │   ├── __tests__/
│   │   ├── helpers.ts
│   │   ├── validators.ts       # Future: input validation
│   │   ├── formatters.ts       # Future: data formatting
│   │   └── index.ts
│   ├── types/                  # TypeScript type definitions
│   │   ├── index.ts
│   │   ├── algorithms.ts       # Future: algorithm-specific types
│   │   └── dataStructures.ts   # Future: data structure types
│   ├── test/                   # Test utilities and setup
│   │   ├── setup.ts            # Test environment setup
│   │   ├── mocks/
│   │   │   └── mockData.ts     # Mock data for tests
│   │   └── utils/
│   │       └── test-utils.tsx  # Custom render functions
│   ├── assets/                 # Static assets
│   │   └── react.svg
│   ├── App.tsx                 # Main App component
│   ├── main.tsx                # Application entry point
│   └── index.css               # Global styles
├── public/                     # Public assets
│   └── vite.svg
├── .vscode/                    # VS Code settings (optional)
│   ├── settings.json
│   └── extensions.json
├── dist/                       # Build output (gitignored)
├── node_modules/               # Dependencies (gitignored)
├── .gitignore
├── .editorconfig
├── .prettierrc
├── eslint.config.js            # ESLint configuration
├── postcss.config.js           # PostCSS configuration
├── tsconfig.json               # TypeScript base config
├── tsconfig.app.json           # TypeScript app config
├── tsconfig.node.json          # TypeScript node config
├── vite.config.ts              # Vite configuration
├── vitest.config.ts            # Vitest test configuration
├── package.json
├── package-lock.json
├── index.html
├── README.md
├── CODE_STYLE_GUIDE.md
├── SOLID_PRINCIPLES.md
└── PROJECT_STRUCTURE.md        # This file
```

## Path Aliases

The project uses TypeScript path aliases for cleaner imports:

```typescript
import Component from '@components/Layout/Navbar';
import { bubbleSort } from '@algorithms/sorting';
import { useAnimationEngine } from '@hooks/useAnimationEngine';
import { generateRandomArray } from '@utils/helpers';
import type { AnimationStep } from '@types/index';
```

### Available Aliases:

- `@/*` → `./src/*`
- `@components/*` → `./src/components/*`
- `@pages/*` → `./src/pages/*`
- `@hooks/*` → `./src/hooks/*`
- `@utils/*` → `./src/utils/*`
- `@types/*` → `./src/types/*`
- `@algorithms/*` → `./src/algorithms/*`
- `@dataStructures/*` → `./src/dataStructures/*`
- `@context/*` → `./src/context/*`
- `@test/*` → `./src/test/*`

## Testing Structure

### Test File Naming Convention

- Unit tests: `*.test.ts` or `*.test.tsx`
- Integration tests: `*.integration.test.ts`
- E2E tests: `*.e2e.test.ts` (future)

### Test Location

Tests should be placed in `__tests__` directories adjacent to the code they test:

```
src/
├── algorithms/
│   └── sorting/
│       ├── __tests__/
│       │   ├── bubbleSort.test.ts
│       │   └── quickSort.test.ts
│       ├── bubbleSort.ts
│       └── quickSort.ts
```

### Running Tests

```bash
# Run tests in watch mode
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Component Organization

### Barrel Exports

Each major directory should have an `index.ts` file for clean exports:

```typescript
// src/components/Controls/index.ts
export { default as ControlPanel } from './ControlPanel';
export { default as InputPanel } from './InputPanel';
```

Usage:
```typescript
import { ControlPanel, InputPanel } from '@components/Controls';
```

### Component Structure

Each complex component should follow this pattern:

```
ComponentName/
├── __tests__/
│   └── ComponentName.test.tsx
├── ComponentName.tsx
├── ComponentName.module.css (if needed)
├── types.ts (component-specific types)
└── index.ts (barrel export)
```

## Code Organization Best Practices

### 1. Single Responsibility Principle
- Each file should have one primary purpose
- Components should do one thing well
- Functions should be small and focused

### 2. Dependency Direction
```
Pages → Components → Hooks → Utils/Types
     ↘ Context ↗
```

### 3. State Management
- Local state: `useState` in components
- Shared state: Context API (`ThemeContext`, `AnimationContext`)
- Future: Consider Zustand or Redux for complex state

### 4. Type Safety
- Export types from `@types` directory
- Use strict TypeScript settings
- Avoid `any` types

### 5. Naming Conventions
- Components: PascalCase (`ArrayVisualizer.tsx`)
- Utilities: camelCase (`generateRandomArray`)
- Constants: UPPER_SNAKE_CASE (`MAX_ARRAY_SIZE`)
- Types/Interfaces: PascalCase (`AnimationStep`, `TreeNode`)

## Future Enhancements

### Planned Additions:

1. **Performance Monitoring**
   ```
   src/utils/performance/
   ├── __tests__/
   ├── metrics.ts
   └── profiler.ts
   ```

2. **State Persistence**
   ```
   src/hooks/
   ├── useLocalStorage.ts
   └── useSessionStorage.ts
   ```

3. **Analytics**
   ```
   src/utils/analytics/
   ├── __tests__/
   └── tracker.ts
   ```

4. **Internationalization**
   ```
   src/i18n/
   ├── en.json
   └── index.ts
   ```

5. **E2E Tests**
   ```
   tests/
   └── e2e/
       ├── sorting.spec.ts
       └── navigation.spec.ts
   ```

## Build and Deployment

### Development
```bash
npm run dev          # Start dev server
```

### Production
```bash
npm run build        # Build for production
npm run preview      # Preview production build
```

### Quality Checks
```bash
npm run lint         # ESLint
npm run test         # Unit tests
npm run test:coverage # Test coverage
```

## Configuration Files

- **vite.config.ts**: Build tool configuration, path aliases
- **vitest.config.ts**: Test runner configuration
- **tsconfig.json**: TypeScript base configuration
- **tsconfig.app.json**: App-specific TypeScript settings
- **eslint.config.js**: Linting rules
- **.prettierrc**: Code formatting rules
- **postcss.config.js**: CSS processing
- **.editorconfig**: Editor settings

## Documentation

- `README.md`: Project overview and setup
- `CODE_STYLE_GUIDE.md`: Coding standards
- `SOLID_PRINCIPLES.md`: SOLID principles guide
- `PROJECT_STRUCTURE.md`: This file

## Git Workflow

### Branch Naming
- `feature/description`
- `bugfix/description`
- `refactor/description`
- `test/description`

### Commit Messages
Follow conventional commits:
- `feat:` New feature
- `fix:` Bug fix
- `refactor:` Code refactoring
- `test:` Adding tests
- `docs:` Documentation
- `style:` Formatting
- `chore:` Maintenance

## Notes

- Keep components small and focused
- Write tests for all business logic
- Use semantic HTML
- Follow accessibility guidelines (WCAG)
- Optimize for performance (lazy loading, memoization)
- Document complex algorithms and logic
