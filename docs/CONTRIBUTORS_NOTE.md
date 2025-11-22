# Contributors Note

Welcome to the Data & Algorithms Visualization project! This note provides quick guidance for contributors.

## 📚 Getting Started

For comprehensive contribution guidelines, please refer to our main [CONTRIBUTING.md](../CONTRIBUTING.md) in the root directory. It covers:

- Setting up your development environment
- Branch naming conventions
- Commit message guidelines
- Pull request process
- Testing requirements
- Code style guidelines

## 🎨 Previewing the Demo

There are two ways to preview the visualization application:

### Method 1: Development Server (Recommended)

The development server provides hot-reload and the best development experience:

```bash
# Install dependencies (first time only)
npm install

# Start the development server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

### Method 2: Static HTML Preview

You can also open the `index.html` file directly in your browser for a quick preview:

```bash
# Build the project first
npm run build

# Then open the built index.html in dist/
# Or for development preview, just open:
open index.html  # macOS
start index.html # Windows
xdg-open index.html # Linux
```

**Note**: Opening `index.html` directly without a server may have limitations with certain features (e.g., routing, API calls). The development server is always recommended.

## 📖 Documentation

This `docs/` directory contains detailed project documentation:

- **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)**: Overview of the codebase organization
- **[CODE_STYLE_GUIDE.md](CODE_STYLE_GUIDE.md)**: Coding standards and best practices
- **[TESTING.md](TESTING.md)**: Guide to writing and running tests
- **[SOLID_PRINCIPLES.md](SOLID_PRINCIPLES.md)**: Software design principles used in this project

## 🧪 Running Tests

Before submitting your changes, always run the test suite:

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests with UI
npm run test:ui
```

## 🔍 Code Quality

Ensure your code meets quality standards:

```bash
# Lint your code
npm run lint

# Type check (included in build)
npm run build
```

## 🤝 Need Help?

- Read the [CONTRIBUTING.md](../CONTRIBUTING.md) guide
- Check existing [documentation](.)
- Open an [issue](https://github.com/daniel-kindl/data-and-algorithms-visualization/issues) for questions
- Review the [Code of Conduct](../CODE_OF_CONDUCT.md)

## 📝 Quick Checklist

Before submitting a pull request:

- [ ] Code follows project style guidelines
- [ ] All tests pass (`npm test`)
- [ ] Build succeeds (`npm run build`)
- [ ] Linter passes (`npm run lint`)
- [ ] Documentation updated (if needed)
- [ ] Commit messages follow conventional commits format
- [ ] PR template filled out completely

---

Happy coding! 🚀
