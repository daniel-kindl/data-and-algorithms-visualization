# AI Context Directory

This directory contains comprehensive context and instructions for AI assistants working on this project.

## Files

### 📋 context.md
Complete project context including:
- Project overview and tech stack
- Project structure and organization
- Path aliases configuration
- Code style guidelines
- Testing guidelines
- Development workflow
- Current status and progress
- Development phases

**Use this file to:** Understand the project, its architecture, and established patterns.

### 📝 instructions.md
Detailed instructions for AI assistants including:
- Critical rules and constraints
- Code modification guidelines
- Component development patterns
- Algorithm implementation structure
- Testing patterns and examples
- Common patterns and best practices
- Error handling approaches
- Documentation standards

**Use this file to:** Follow correct procedures when making changes.

## Quick Reference

### Tech Stack
- **Framework:** React 19 + TypeScript 5.9 + Vite 7.2
- **Styling:** Tailwind CSS v4 (⚠️ No `@apply` support)
- **Testing:** Vitest + React Testing Library
- **Icons:** Lucide React (monochrome, strokeWidth 1.5)

### Key Rules
1. ❌ Never use `@apply` directive (Tailwind v4 incompatibility)
2. ✅ Use utility classes directly in JSX
3. ✅ TypeScript strict mode compliance
4. ✅ Monochrome icons with consistent styling
5. ✅ Dark mode support required
6. ✅ Test new functionality
7. ✅ Use path aliases (@components, @utils, etc.)

### Project Structure
```
├── .ai/           # AI context (this directory)
├── config/        # Configuration files
├── docs/          # Documentation
├── src/
│   ├── algorithms/      # Algorithm implementations
│   ├── components/      # React components
│   ├── dataStructures/  # Data structure implementations
│   ├── pages/           # Route components
│   └── test/            # Test utilities
```

### Common Commands
```bash
npm run dev              # Start dev server
npm test                 # Run tests (watch mode)
npm test -- --run        # Run tests once
npm run build           # Production build
npm run lint            # Run ESLint
npm run test:coverage   # Generate coverage report
```

### Path Aliases
```typescript
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

## Usage Guidelines

### For New AI Sessions
1. Read `context.md` first to understand the project
2. Review `instructions.md` for coding guidelines
3. Check current status in `context.md`
4. Follow established patterns

### For Specific Tasks

**Adding a component:**
- Review component patterns in `instructions.md`
- Check existing components for consistency
- Follow Tailwind v4 guidelines (no @apply)
- Add tests in `__tests__/` directory

**Implementing an algorithm:**
- Review algorithm structure in `instructions.md`
- Use existing algorithms as reference
- Document time/space complexity
- Write comprehensive tests

**Fixing bugs:**
- Run tests to reproduce issue
- Check TypeScript for type errors
- Verify in both light and dark modes
- Ensure fix doesn't break tests

**Refactoring:**
- Understand current implementation first
- Maintain backward compatibility
- Update tests if behavior changes
- Verify build succeeds

## Maintenance

This directory should be updated when:
- Tech stack changes (version updates, new tools)
- Project structure changes significantly
- New patterns or conventions are established
- Critical rules or constraints are added
- Development phases progress

Keep these files in sync with the actual project state for accurate AI assistance.

---

**Last Updated:** November 22, 2025
