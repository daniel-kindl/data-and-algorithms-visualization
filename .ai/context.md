# AI Context & Instructions

## Project Overview

**Project Name:** Data & Algorithms Visualization  
**Type:** Educational web application  
**Framework:** React 19 + TypeScript + Vite  
**Styling:** Tailwind CSS v4  
**Testing:** Vitest + React Testing Library  

This is an interactive educational platform for visualizing data structures and algorithms. The application provides step-by-step animations and explanations to help users understand complex concepts.

## Tech Stack

### Core
- **React 19.0.0** - UI library
- **TypeScript 5.9.3** - Type-safe development (strict mode enabled)
- **Vite 7.2.4** - Build tool and dev server

### Styling
- **Tailwind CSS v4.1.17** - Utility-first CSS framework
  - ⚠️ **Important:** No `@apply` directive support in v4 (breaking change)
  - Use `@theme` directive for custom design tokens
  - All styling must use utility classes directly
- **PostCSS** - CSS processing

### Testing
- **Vitest 4.0.13** - Unit test runner
- **React Testing Library** - Component testing
- **jsdom** - DOM implementation for tests
- **Coverage:** v8 provider with html/text/json reporters

### Code Quality
- **ESLint 9.39.1** - Flat config with 40+ rules
- **Prettier** - Code formatting
- **EditorConfig** - Editor consistency

### Visualization
- **D3.js 7.9.0** - Data visualization
- **PrismJS 1.29.0** - Syntax highlighting
- **Lucide React** - Icon library

## Project Structure

```
data-and-algorithms-visualization/
├── .ai/                          # AI context and instructions
├── config/                       # Configuration files
│   ├── eslint.config.js         # ESLint flat config
│   ├── postcss.config.js        # PostCSS configuration
│   ├── .prettierrc              # Prettier configuration
│   └── .editorconfig            # Editor configuration
├── docs/                         # Documentation
│   ├── README.md                # Documentation index
│   ├── CODE_STYLE_GUIDE.md      # Coding standards
│   ├── SOLID_PRINCIPLES.md      # Architecture principles
│   ├── PROJECT_STRUCTURE.md     # Structure documentation
│   ├── TESTING.md               # Testing guide
│   ├── SETUP_SUMMARY.md         # Setup instructions
│   ├── REORGANIZATION.md        # Restructuring history
│   └── PHASE*.md                # Development phases
├── public/                       # Static assets
├── src/
│   ├── algorithms/              # Algorithm implementations
│   │   ├── sorting/             # Sorting algorithms
│   │   │   ├── bubbleSort.ts
│   │   │   └── __tests__/
│   │   └── pathfinding/         # Pathfinding algorithms
│   ├── components/              # Reusable components
│   │   ├── Algorithm/           # Algorithm-specific
│   │   ├── Common/              # Shared components
│   │   └── DataStructure/       # Data structure components
│   ├── context/                 # React Context providers
│   │   └── ThemeContext.tsx     # Dark/light theme
│   ├── dataStructures/          # Data structure implementations
│   ├── hooks/                   # Custom React hooks
│   ├── pages/                   # Route components
│   │   ├── Home.tsx
│   │   ├── AlgorithmsPage.tsx
│   │   ├── DataStructuresPage.tsx
│   │   └── AdvancedStructuresPage.tsx
│   ├── test/                    # Test utilities
│   │   ├── setup.ts             # Global test setup
│   │   ├── mocks/               # Test mocks
│   │   └── utils/               # Test utilities
│   ├── types/                   # TypeScript types
│   ├── utils/                   # Utility functions
│   │   ├── helpers.ts
│   │   └── __tests__/
│   ├── App.tsx                  # Root component
│   ├── index.css               # Global styles
│   └── main.tsx                # Entry point
├── package.json                 # Dependencies and scripts
├── tsconfig.json               # TypeScript base config
├── tsconfig.app.json           # TypeScript app config
├── tsconfig.node.json          # TypeScript Node config
├── vite.config.ts              # Vite configuration
├── vitest.config.ts            # Vitest configuration
└── index.html                  # HTML entry point
```

## Path Aliases

The project uses TypeScript path aliases for clean imports:

```typescript
// Instead of: import { Button } from '../../components/Common/Button'
// Use: import { Button } from '@components/Common/Button'

@components   → src/components
@utils        → src/utils
@algorithms   → src/algorithms
@dataStructures → src/dataStructures
@pages        → src/pages
@hooks        → src/hooks
@context      → src/context
@types        → src/types
@test         → src/test
```

Configured in:
- `tsconfig.app.json` - TypeScript resolution
- `vite.config.ts` - Vite bundling
- `vitest.config.ts` - Test resolution

## Code Style Guidelines

### React Components
- **Functional components** with TypeScript
- **Named exports** for components
- **Props interfaces** with descriptive names ending in `Props`
- **Hooks at top** of component (before any conditions/loops)
- **Event handlers** prefixed with `handle` (e.g., `handleClick`)

```typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg ${
        variant === 'primary' 
          ? 'bg-blue-600 text-white' 
          : 'bg-gray-200 text-gray-900'
      }`}
    >
      {label}
    </button>
  );
}
```

### TypeScript
- **Strict mode enabled** (`strict: true`)
- **Explicit types** for function parameters and return values
- **Interfaces** over types for object shapes
- **Type imports** using `type` keyword: `import type { ... }`
- **No `any`** - use `unknown` if type is truly unknown

### Styling (Tailwind CSS v4)
- **Utility classes only** - No `@apply` directive (not supported in v4)
- **Responsive design** - Mobile-first approach
- **Dark mode** - All components must support dark theme
- **Custom tokens** - Define in `@theme` directive in `index.css`
- **Consistent spacing** - Use Tailwind's default scale

```css
/* ❌ Don't use @apply (v4 incompatibility) */
.button {
  @apply px-4 py-2 rounded-lg;
}

/* ✅ Use utility classes directly */
<button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700">
```

### Icons
- **Lucide React** for all icons
- **Monochrome design** - black/white only
- **Consistent stroke width** - `strokeWidth={1.5}`
- **Size consistency** - Use size prop (e.g., `size={20}`)
- **Theme-aware colors** - `text-gray-900 dark:text-gray-100`

```typescript
import { PlayCircle } from 'lucide-react';

<PlayCircle 
  size={20} 
  strokeWidth={1.5}
  className="text-gray-900 dark:text-gray-100"
/>
```

## Testing Guidelines

### Unit Tests
- **File location**: `__tests__/` directory next to source file
- **Naming**: `*.test.ts` or `*.test.tsx`
- **Coverage target**: >80%
- **Run tests**: `npm test`
- **Watch mode**: `npm test` (interactive)
- **Coverage**: `npm run test:coverage`

### Test Structure
```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@test/utils/test-utils';
import { Button } from '../Button';

describe('Button', () => {
  it('renders with label', () => {
    render(<Button label="Click me" onClick={() => {}} />);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    const { user } = render(<Button label="Click" onClick={handleClick} />);
    
    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledOnce();
  });
});
```

### Test Utilities
- Use `@test/utils/test-utils` for custom render with providers
- Use `@test/mocks/mockData` for test data
- All tests run in jsdom environment
- Global test setup in `src/test/setup.ts`

## Development Workflow

### Scripts
```bash
npm run dev              # Start dev server (http://localhost:5173)
npm run build           # Build for production
npm run preview         # Preview production build
npm run lint            # Run ESLint
npm test                # Run tests in watch mode
npm test -- --run       # Run tests once
npm run test:ui         # Open Vitest UI
npm run test:coverage   # Generate coverage report
```

### Adding New Features

1. **Create feature branch** (if using git)
2. **Implement feature** following code style guidelines
3. **Write tests** for new functionality
4. **Run linter** - `npm run lint`
5. **Run tests** - `npm test -- --run`
6. **Verify build** - `npm run build`
7. **Update documentation** if needed

### Adding New Algorithm

1. Create implementation in `src/algorithms/<category>/<algorithm>.ts`
2. Export types and main function
3. Create tests in `src/algorithms/<category>/__tests__/<algorithm>.test.ts`
4. Add visualization component in `src/components/Algorithm/`
5. Update relevant page to include new algorithm
6. Document algorithm in code comments

### Adding New Component

1. Create component in `src/components/<category>/<Component>.tsx`
2. Define props interface
3. Implement with TypeScript and Tailwind
4. Support dark mode
5. Create tests in `__tests__/` directory
6. Export from component directory

## Important Notes

### Tailwind CSS v4 Changes
- **No `@apply` directive** - This is a breaking change from v3
- **Use `@theme` for tokens** - Define custom design tokens in index.css
- **Utility classes everywhere** - Apply classes directly in JSX
- **PostCSS required** - Must have postcss.config.js

### TypeScript Configuration
- **Strict mode** - All strict checks enabled
- **Exact optional properties** - Optional properties must be explicitly marked
- **Verbatim module syntax** - Import/export syntax preserved
- **Path aliases** - Use @ prefixes for clean imports

### Theme Support
- **All components must support dark mode**
- Use ThemeContext for theme state
- Use Tailwind dark mode classes: `dark:`
- Test both themes

### File Organization
- **Colocate tests** with source files
- **Group by feature** not by file type
- **Shallow directory structure** - max 3-4 levels
- **Clear naming** - descriptive, not abbreviated

## Resources

### Documentation
- See `docs/README.md` for all documentation
- `docs/CODE_STYLE_GUIDE.md` - Detailed style guide
- `docs/TESTING.md` - Comprehensive testing guide
- `docs/PROJECT_STRUCTURE.md` - Architecture details

### External Resources
- [React 19 Docs](https://react.dev/)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [Vitest Docs](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)

## Current Status

### Completed
✅ Tailwind CSS v4 implementation  
✅ Icon unification (minimalistic black/white)  
✅ Test infrastructure setup (Vitest + RTL)  
✅ Project structure reorganization  
✅ Path aliases configuration  
✅ 21 unit tests passing  
✅ TypeScript strict mode compliance  
✅ Documentation centralized in /docs  
✅ Configuration centralized in /config  

### Test Coverage
- **Total tests:** 21 passing
- **Test files:** 2 (helpers.test.ts, bubbleSort.test.ts)
- **Target coverage:** >80%

### Build Status
- **Last build:** Successful (88 modules, 1.81s)
- **Bundle size:** 358.65 kB JS, 42.91 kB CSS
- **Dev server:** Port 5173

## Development Phases

Current implementation follows structured development phases:

- **Phase 1:** Project setup and basic structure ✅
- **Phase 2:** Sorting algorithm visualizations ✅
- **Phase 3:** Basic data structures ✅
- **Phase 4:** Advanced features (code view, comparisons) ✅
- **Phase 5:** Advanced data structures ✅
- **Phase 6:** Graph algorithms (Next)
- **Phase 7:** Dynamic programming visualizations
- **Phase 8:** Polish and optimization

See `docs/PHASE*.md` for detailed phase documentation.

---

**Last Updated:** November 22, 2025  
**Maintained by:** AI Development Assistant
