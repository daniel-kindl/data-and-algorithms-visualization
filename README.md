# Data & Algorithms Visualization

> An interactive web application for visualizing algorithms and data structures with step-by-step animations.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![Build Status](https://github.com/daniel-kindl/data-and-algorithms-visualization/workflows/CI/badge.svg)](https://github.com/daniel-kindl/data-and-algorithms-visualization/actions)

## 🎯 Overview

This project provides an interactive platform for learning and understanding algorithms and data structures through visual animations. Built with modern web technologies, it offers real-time code highlighting, complexity analysis, and customizable playback controls.

**🚀 [Live Demo](https://daniel-kindl.github.io/data-and-algorithms-visualization/)** | **📚 [Documentation](docs/)**

## ✨ Features

- **Sorting Algorithms**: Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort, Heap Sort
- **Data Structures**: Arrays, Linked Lists, Stacks, Queues, Binary Trees, BST, Heaps, Hash Tables
- **Graph Algorithms**: BFS, DFS, Dijkstra's Algorithm
- **Interactive Controls**: Play, pause, step-by-step navigation, speed adjustment
- **Code Highlighting**: Real-time visualization of algorithm execution
- **Complexity Analysis**: Big-O notation for time and space complexity
- **Theme Support**: Dark and light mode with responsive design

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/daniel-kindl/data-and-algorithms-visualization.git
cd data-and-algorithms-visualization

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) to view the application.

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production (TypeScript + Vite) |
| `npm run preview` | Preview production build locally |
| `npm test` | Run unit tests with Vitest |
| `npm run test:ui` | Run tests with Vitest UI |
| `npm run test:coverage` | Generate test coverage report |
| `npm run lint` | Lint code with ESLint |

## 📂 Project Structure

```
data-and-algorithms-visualization/
├── src/
│   ├── algorithms/        # Algorithm implementations (generators)
│   ├── components/        # React components
│   ├── context/           # React Context (Theme, Animation)
│   ├── dataStructures/    # Data structure classes
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Application pages
│   └── utils/             # Helper utilities
├── docs/                  # Project documentation
├── public/                # Static assets
└── index.html             # Entry HTML file
```

## 📚 Documentation

Explore detailed documentation in the [`docs/`](docs/) directory:

- [Project Structure](docs/PROJECT_STRUCTURE.md)
- [Code Style Guide](docs/CODE_STYLE_GUIDE.md)
- [Testing Guide](docs/TESTING.md)
- [SOLID Principles](docs/SOLID_PRINCIPLES.md)
- [Contributors Note](docs/CONTRIBUTORS_NOTE.md)

## 🧪 Testing & Type Checking

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Type checking (included in build)
npm run build
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details on how to:

- Report bugs or request features
- Submit pull requests
- Follow our code standards

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

## 🛠️ Tech Stack

- **Framework**: React 19 with TypeScript 5.9
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS v4
- **Visualization**: D3.js, Framer Motion
- **Testing**: Vitest, React Testing Library
- **Routing**: React Router v7

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Copyright (c) 2025 daniel-kindl

## 🌟 Support

If you find this project helpful, please give it a ⭐️ on [GitHub](https://github.com/daniel-kindl/data-and-algorithms-visualization)!

---

**Questions?** Open an [issue](https://github.com/daniel-kindl/data-and-algorithms-visualization/issues) or check the [documentation](docs/).
