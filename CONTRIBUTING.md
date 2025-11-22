# Contributing to Data & Algorithms Visualization

Thank you for your interest in contributing to this project! We welcome contributions from everyone.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Branch Naming](#branch-naming)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)
- [Code Style](#code-style)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to daniel.kindl@gmail.com.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include as many details as possible using our bug report template.

**To report a bug:**
1. Go to the [Issues](https://github.com/daniel-kindl/data-and-algorithms-visualization/issues) page
2. Click "New Issue"
3. Select the "Bug Report" template
4. Fill in all required sections

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, use the feature request template and provide:

- A clear and descriptive title
- A detailed description of the proposed feature
- Explain why this enhancement would be useful
- List any alternative solutions you've considered

### Pull Requests

We actively welcome your pull requests! See the [Pull Request Process](#pull-request-process) section below.

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm (comes with Node.js)
- Git

### Setting Up Your Development Environment

1. **Fork the repository** on GitHub

2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/data-and-algorithms-visualization.git
   cd data-and-algorithms-visualization
   ```

3. **Add the upstream repository** as a remote:
   ```bash
   git remote add upstream https://github.com/daniel-kindl/data-and-algorithms-visualization.git
   ```

4. **Install dependencies**:
   ```bash
   npm install
   ```

5. **Start the development server**:
   ```bash
   npm run dev
   ```
   
   The application will be available at [http://localhost:5173](http://localhost:5173)

## Development Workflow

1. **Create a branch** for your work (see [Branch Naming](#branch-naming))
2. **Make your changes** with clear, focused commits
3. **Test your changes** thoroughly (see [Testing](#testing))
4. **Lint your code**: `npm run lint`
5. **Build the project**: `npm run build`
6. **Push your branch** to your fork
7. **Open a Pull Request** against the main repository

### Keeping Your Fork Up to Date

```bash
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

## Branch Naming

Use descriptive branch names that follow this pattern:

- `feature/description` - for new features (e.g., `feature/add-radix-sort`)
- `fix/description` - for bug fixes (e.g., `fix/heap-sort-animation`)
- `docs/description` - for documentation (e.g., `docs/update-readme`)
- `refactor/description` - for code refactoring (e.g., `refactor/sorting-algorithms`)
- `test/description` - for adding tests (e.g., `test/stack-operations`)

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code changes that neither fix a bug nor add a feature
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Changes to build process or auxiliary tools

### Examples

```
feat(sorting): add radix sort algorithm

Implement radix sort with step-by-step visualization.
Includes unit tests and documentation.

Closes #123
```

```
fix(graph): correct Dijkstra's algorithm animation

Fix issue where visited nodes weren't highlighted correctly
during algorithm execution.

Fixes #456
```

## Pull Request Process

1. **Update documentation** if you've made changes to the API or user-facing features
2. **Add or update tests** to cover your changes
3. **Ensure all tests pass**: `npm test`
4. **Ensure the build succeeds**: `npm run build`
5. **Lint your code**: `npm run lint`
6. **Fill out the pull request template** completely
7. **Link related issues** in the PR description (e.g., "Closes #123")
8. **Request review** from maintainers
9. **Address review feedback** promptly
10. **Squash commits** if requested before merging

### PR Checklist

Before submitting your PR, verify:

- [ ] Code follows the project's style guidelines
- [ ] Self-review of code completed
- [ ] Comments added for complex logic
- [ ] Documentation updated (if applicable)
- [ ] No new warnings generated
- [ ] Tests added/updated and all pass
- [ ] Build succeeds without errors
- [ ] Related issues linked

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

### Writing Tests

- Place tests in `__tests__` directories next to the code they test
- Use descriptive test names that explain what is being tested
- Follow the existing test patterns in the codebase
- Aim for high test coverage on new code
- Test both happy paths and edge cases

### Test Structure

```typescript
import { describe, it, expect } from 'vitest';

describe('ComponentName', () => {
  it('should do something specific', () => {
    // Arrange
    const input = 'test';
    
    // Act
    const result = someFunction(input);
    
    // Assert
    expect(result).toBe('expected');
  });
});
```

## Code Style

### General Guidelines

- Use TypeScript for all new code
- Follow the existing code structure and patterns
- Keep functions small and focused (Single Responsibility Principle)
- Write self-documenting code with clear variable and function names
- Add comments only when the code cannot be made self-explanatory

### TypeScript

- Define interfaces for all props and complex types
- Avoid using `any` - use proper types or `unknown`
- Use strict type checking

### React Components

- Use functional components with hooks
- Keep components focused and composable
- Extract complex logic into custom hooks
- Use proper TypeScript types for props

### Algorithm Implementations

- **Must be generator functions** (`function*`)
- Yield `AnimationStep` objects for visualization
- Include comprehensive comments explaining the algorithm
- Provide time and space complexity information

### Formatting

The project uses ESLint for linting. Run `npm run lint` before committing.

## Questions?

If you have questions, feel free to:

- Open a [Discussion](https://github.com/daniel-kindl/data-and-algorithms-visualization/discussions) (if enabled)
- Open an [Issue](https://github.com/daniel-kindl/data-and-algorithms-visualization/issues)
- Contact the maintainer at daniel.kindl@gmail.com

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Data & Algorithms Visualization! 🎉
