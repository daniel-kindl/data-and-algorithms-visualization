# Configuration Files

This directory contains all project configuration files.

## Files

### Linting & Formatting
- **eslint.config.js** - ESLint configuration for code linting
- **.prettierrc** - Prettier configuration for code formatting
- **.editorconfig** - Editor settings for consistent coding style

### Build & CSS
- **postcss.config.js** - PostCSS configuration for CSS processing

## Usage

### ESLint
Configuration is automatically picked up by the `npm run lint` command.

### Prettier
```bash
npx prettier --write .
```

### PostCSS
Automatically used by Vite during build process.

## Note

Root-level TypeScript and Vite configs remain at project root as they need to be there for tooling to find them:
- `tsconfig.json`
- `tsconfig.app.json`
- `tsconfig.node.json`
- `vite.config.ts`
- `vitest.config.ts`
