# Algorithm & Data Structure Visualizer

An interactive web application for visualizing algorithms and data structures, built with React, TypeScript, D3.js, and Tailwind CSS.

## 🚀 Features

- **Step-by-step visualizations** of sorting algorithms, data structures, and graph algorithms
- **Interactive controls** - Play, pause, step forward/backward, and adjust speed
- **Code panel** with syntax highlighting showing algorithm implementation
- **Dark/Light mode** for comfortable viewing
- **Complexity analysis** displaying Big O notation
- **Responsive design** that works on all devices

## 🛠️ Tech Stack

- **Frontend**: React 18+ with TypeScript
- **Visualization**: D3.js
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Routing**: React Router
- **Code Highlighting**: Prism.js

## 📦 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
.
├── src/
│   ├── algorithms/        # Algorithm implementations
│   │   └── sorting/       # Sorting algorithms with tests
│   ├── dataStructures/    # Data structure implementations
│   │   ├── linear/        # Arrays, stacks, queues, linked lists
│   │   └── trees/         # Trees, heaps, BST, hash tables
│   ├── components/        # React components
│   │   ├── Layout/        # Navigation and layout
│   │   ├── Controls/      # Playback controls
│   │   ├── CodePanel/     # Code display
│   │   └── Visualizer/    # Visualization components
│   ├── pages/             # Route pages
│   ├── hooks/             # Custom React hooks
│   ├── context/           # React Context providers
│   ├── utils/             # Helper functions
│   ├── types/             # TypeScript definitions
│   └── test/              # Test utilities and mocks
├── config/                # Configuration files
│   ├── eslint.config.js   # ESLint rules
│   ├── postcss.config.js  # PostCSS config
│   ├── .prettierrc        # Prettier formatting
│   └── .editorconfig      # Editor settings
├── docs/                  # Documentation
│   ├── CODE_STYLE_GUIDE.md
│   ├── SOLID_PRINCIPLES.md
│   ├── TESTING.md
│   └── PROJECT_STRUCTURE.md
└── dist/                  # Build output (gitignored)
```

For detailed structure, see [docs/PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md).

## ✅ Development Progress

### Phase 1: Setup & Foundation - ✓ Complete
- [x] Vite + React + TypeScript project initialized
- [x] Tailwind CSS configured with dark/light mode support
- [x] Project structure and folder organization
- [x] React Router setup with navigation
- [x] Base layout components (Navbar, Layout)
- [x] Theme context and toggle functionality
- [x] ESLint + Prettier configuration
- [x] EditorConfig for consistent code style

### Phase 2: Core Infrastructure - ✓ Complete
- [x] Animation context with state management
- [x] Animation engine hook with timing control
- [x] Control panel with play/pause/step/speed controls
- [x] Code display panel with Prism.js syntax highlighting
- [x] Complexity display component (time/space)
- [x] Input panel with custom/random data generation
- [x] Utility functions (array generators, helpers)
- [x] Array visualizer component with color-coded states

### Phase 3: Sorting Algorithms - ✅ **COMPLETE** (Nov 22, 2025)
- [x] Bubble Sort - O(n²) with step-by-step animations
- [x] Selection Sort - O(n²) with orange minimum highlight
- [x] Insertion Sort - O(n²) with progressive sorted display
- [x] Merge Sort - O(n log n) divide and conquer
- [x] Quick Sort - O(n log n) average, pivot-based
- [x] Heap Sort - O(n log n) heap-based sorting
- [x] Algorithm selector component
- [x] Live animation with all controls working
- [x] Real-time array state visualization
- [x] Step descriptions for each operation
- [x] **Fixed critical animation bug** - arrays now sort correctly
- [x] **Visual complexity graph** with growth rate comparison
- [x] **Enhanced UI/UX** - equal-width panels, prominent random button
- [x] **Live operation counters** - comparisons and swaps tracked
- [x] **Code panel improvements** - fixed scrolling, moved to bottom

### Phase 4: Basic Data Structures - ✅ **COMPLETE** (Nov 22, 2025)
- [x] **Array Operations** - Access (O(1)), Insert, Delete, Search, Update
- [x] **Stack (LIFO)** - Push, Pop, Peek, isEmpty, size, Search with vertical visualization
- [x] **Queue (FIFO)** - Enqueue, Dequeue, Peek, Rear, isEmpty, size, Search with horizontal flow
- [x] **Linked List (Singly)** - Insert Head/Tail/At, Delete Head/Tail, isEmpty, size, Search with pointer arrows
- [x] Structure selector with iOS-style icons
- [x] Dynamic operation selector based on selected structure
- [x] **Randomize button** - Generate 5-10 random values
- [x] Smart input visibility - Show only fields needed for each operation
- [x] Custom visualizers for each structure type
- [x] **Current data display** - Structure-specific formatting in header
- [x] Interactive controls (value input, index input when needed)
- [x] Step-by-step operation animations
- [x] Error handling (overflow, underflow, bounds checking)
- [x] Complexity information for all operations
- [x] Live size and capacity tracking
- [x] Visual indicators (TOP, FRONT/REAR, HEAD/TAIL → NULL)

### Phase 5: Advanced Data Structures - ✅ **COMPLETE** (Jan 2025)
- [x] **Binary Tree** - Level-order Insert, InOrder/PreOrder/PostOrder/LevelOrder Traversals, Search
- [x] **Binary Search Tree (BST)** - Insert, Search, FindMin, FindMax, Validate BST
- [x] **Min-Heap** - Insert, ExtractMin, Heapify, Peek, Size, isEmpty, HeapSort
- [x] **Hash Table** - Insert, Search, Delete, GetKeys, LoadFactor, Clear, CollisionStats (Linear Probing)
- [x] **Tree Visualizer** - Canvas-based hierarchical rendering with proper positioning
- [x] **Heap Visualizer** - Complete binary tree representation
- [x] **Hash Table Visualizer** - Grid layout with collision visualization
- [x] **Advanced Structures Page** - Unified interface for all 4 structures
- [x] Structure selector (🌳 Binary Tree, 🔍 BST, 📊 Heap, #️⃣ Hash Table)
- [x] Smart input fields (value for trees/heap, key+value for hash table)
- [x] Stats display (tree size, heap min, hash load factor & collisions)
- [x] Navigation integration with "Advanced" menu item
- [x] Home page card for advanced structures
- [x] 25 operations total across all structures
- [x] Full animation support with step-by-step playback

### Phase 6: Graph Algorithms - ✅ **COMPLETE** (Jan 2025)
- [x] **Graph Data Structure** - Adjacency list implementation
- [x] **BFS (Breadth-First Search)** - Level-order traversal
- [x] **DFS (Depth-First Search)** - Depth-first traversal
- [x] **Dijkstra's Algorithm** - Shortest path in weighted graphs
- [x] **Graph Visualizer** - SVG-based node/edge rendering
- [x] **Graph Page** - Unified interface for graph algorithms
- [x] **Navigation Integration** - New "Graphs" menu item
- [x] Weighted/Unweighted graph support
- [x] Distance and path visualization

## 🎨 Color Coding System

- **Compare**: Yellow/Amber - Elements being compared
- **Swap**: Red/Orange - Elements being swapped
- **Active**: Blue - Currently active element
- **Sorted**: Green - Sorted/completed elements
- **Visited**: Purple - Visited nodes (graphs)
- **Path**: Cyan - Path visualization (graphs)

## 📚 Planned Features

### Sorting Algorithms (Phase 3)
- Bubble Sort, Selection Sort, Insertion Sort
- Merge Sort, Quick Sort, Heap Sort

### Data Structures (Phase 4)
- Arrays, Linked Lists (Singly, Doubly)
- Stack, Queue, Hash Table
- Binary Tree, BST, AVL Tree, Heap, Trie

### Graph Algorithms (Phase 6)
- BFS, DFS
- Dijkstra's Algorithm
- Kruskal's & Prim's MST
- Topological Sort

### Dynamic Programming (Phase 8)
- Fibonacci, Knapsack Problem
- Longest Common Subsequence

## 🔧 Development Tools

The project uses:
- **Vitest** for fast unit testing with React Testing Library
- **EditorConfig** for consistent formatting across editors
- **ESLint** for code linting with TypeScript support
- **Prettier** for automatic code formatting
- **TypeScript** with strict mode for type safety
- **Tailwind CSS v4** for modern utility-first styling

## 📖 Documentation

- **[CODE_STYLE_GUIDE.md](docs/CODE_STYLE_GUIDE.md)** - Coding standards and conventions
- **[SOLID_PRINCIPLES.md](docs/SOLID_PRINCIPLES.md)** - SOLID principles application
- **[TESTING.md](docs/TESTING.md)** - Testing guide and best practices
- **[PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md)** - Complete project structure

## 📄 License

MIT
