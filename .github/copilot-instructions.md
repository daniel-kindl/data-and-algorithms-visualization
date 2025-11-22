# Copilot Instructions for Data & Algorithms Visualization

## 🏗 Project Architecture
- **Core Pattern**: Algorithms are implemented as **generator functions** (`function*`) that yield `AnimationStep` objects.
- **Visualization Flow**: 
  1. Algorithm generator yields a step (e.g., `{ type: 'swap', indices: [0, 1] }`).
  2. `AnimationContext` or custom hooks consume these steps.
  3. Visualizer components (e.g., `ArrayVisualizer`) render the state based on the current step.
- **State Management**: React Context (`AnimationContext`, `ThemeContext`) for global state; local state for component-specific UI.
- **Directory Structure**:
  - `src/algorithms/`: Pure algorithm logic (generators).
  - `src/dataStructures/`: Data structure implementations.
  - `src/components/Visualizer/`: Components that render the visualizations.
  - `src/components/Controls/`: Playback controls.

## 🛠 Tech Stack & Conventions
- **Framework**: React 19 + TypeScript 5.9 + Vite.
- **Styling**: CSS Modules or Tailwind CSS (check `index.css`).
- **Testing**: Vitest. Tests are co-located in `__tests__` directories (e.g., `src/algorithms/sorting/__tests__/`).
- **Path Aliases**: Use `@/` aliases extensively (e.g., `@components`, `@algorithms`, `@types`). See `tsconfig.app.json`.
- **Exports**: Use "Barrel" exports (`index.ts`) for all major directories.

## 📝 Coding Standards
- **Algorithms**: Must be generators. Do not implement "run-to-completion" algorithms for visualization.
- **Types**: 
  - Define interfaces in `src/types/` or co-located `types.ts`.
  - Use `AnimationStep` for all algorithm yields.
- **Components**:
  - Functional components with typed props (`interface Props`).
  - Use `React.FC` is optional; prefer direct function declaration.
- **Naming**:
  - Components: `PascalCase` (e.g., `SortingPage.tsx`).
  - Hooks: `camelCase` (e.g., `useAnimationEngine.ts`).
  - Algorithms: `camelCase` (e.g., `bubbleSort.ts`).

## 🚀 Workflows
- **New Algorithm**:
  1. Create `src/algorithms/<category>/<name>.ts`.
  2. Implement generator function yielding `AnimationStep`.
  3. Add tests in `__tests__`.
  4. Export from `src/algorithms/<category>/index.ts`.
- **Testing**: Run `npm test` (Vitest).
- **Linting**: Run `npm run lint`.

## ⚠️ Critical Rules
- **Generators**: Algorithms **MUST** yield steps to be visualizable.
- **Immutability**: When yielding state changes, ensure you aren't mutating the previous state reference if the visualizer depends on history.
- **Context**: Do not put high-frequency animation state in global context if it causes full app re-renders; use local state or refs where appropriate.
