# Algorithm & Data Structure Visualizer

An interactive, modern web application for visualizing algorithms and data structures. Built with React 19, TypeScript, D3.js, and Tailwind CSS v4.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)
![React](https://img.shields.io/badge/React-19-blue)
![Vite](https://img.shields.io/badge/Vite-6.0+-purple)

## ✨ Features

### 🔄 Sorting Algorithms
Visualize how different sorting algorithms process data with step-by-step animations and complexity analysis.
- **Basic**: Bubble Sort, Selection Sort, Insertion Sort
- **Advanced**: Merge Sort, Quick Sort, Heap Sort
- **Features**: Adjustable speed, step controls, and comparison counters.

### 📦 Data Structures
Interactive visualizations for linear and non-linear data structures.
- **Linear**: Arrays, Linked Lists (Singly), Stacks, Queues
- **Trees**: Binary Trees, Binary Search Trees (BST), Heaps (Min/Max)
- **Hashing**: Hash Tables with collision resolution (Linear Probing)

### 🕸️ Graph Algorithms
Explore graph traversals and shortest path algorithms.
- **Algorithms**: BFS, DFS, Dijkstra's Algorithm
- **Features**: Weighted/Unweighted graphs, directed/undirected support.

### 🛠️ Application Features
- **Control Panel**: Play, pause, step forward/backward, and speed adjustment.
- **Code Panel**: Real-time code highlighting showing the algorithm's execution.
- **Complexity Analysis**: Big-O notation display for Time and Space complexity.
- **Dark/Light Mode**: Fully responsive UI with theme support.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/data-and-algorithms-visualization.git
   cd data-and-algorithms-visualization
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## 📜 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run unit tests (Vitest)
- `npm run lint` - Lint code with ESLint

## 📂 Project Structure

```
src/
├── algorithms/       # Sorting algorithm implementations
├── components/       # React components (Visualizers, Controls, Layout)
├── context/          # Global state (Theme, Animation)
├── dataStructures/   # Data structure classes (Trees, Graphs, Lists)
├── hooks/            # Custom hooks (useAnimationEngine)
├── pages/            # Main application pages
└── utils/            # Helper functions
docs/                 # Detailed documentation
```

## 📚 Documentation

For more detailed information, check the `docs/` directory:
- [**Project Structure**](docs/PROJECT_STRUCTURE.md)
- [**Code Style Guide**](docs/CODE_STYLE_GUIDE.md)
- [**Testing Guide**](docs/TESTING.md)
- [**SOLID Principles**](docs/SOLID_PRINCIPLES.md)

## 🌐 Deployment

- GitHub Actions already contains `ci.yml` (tests + build) and `deploy.yml` (Pages).
- Enable **GitHub Pages → GitHub Actions** in repository settings so `deploy.yml` can publish.
- When the workflow runs on GitHub Actions it auto-sets the Vite `base` to `/<repo-name>/` for project pages.
- Override with `VITE_BASE_PATH=/` (or your custom prefix) before `npm run build` if you deploy to a custom domain or user/organization pages.

## 🛠️ Tech Stack

- **Core**: React 19, TypeScript
- **Build**: Vite
- **Styling**: Tailwind CSS v4
- **Visualization**: D3.js, Framer Motion
- **Testing**: Vitest, React Testing Library

## 📄 License

This project is licensed under the MIT License.
