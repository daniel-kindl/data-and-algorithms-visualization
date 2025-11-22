import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const MotionLink = motion(Link);

const Home = () => {
  return (
    <div className="space-y-8">
      <section className="text-center space-y-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          Algorithm & Data Structure Visualizer
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          Interactive visualizations to help you understand algorithms and data structures through
          step-by-step animations and code explanations.
        </motion.p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <MotionLink
          to="/sorting"
          whileHover={{ scale: 1.03, y: -5 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="group p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-colors shadow-sm hover:shadow-lg"
        >
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-gray-900 dark:text-gray-100"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Sorting Algorithms
              </h2>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Visualize popular sorting algorithms like Bubble Sort, Quick Sort, Merge Sort, and
              more with step-by-step animations.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">
                Bubble Sort
              </span>
              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">
                Quick Sort
              </span>
              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">
                Merge Sort
              </span>
              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">
                +3 more
              </span>
            </div>
          </div>
        </MotionLink>

        <MotionLink
          to="/data-structures"
          whileHover={{ scale: 1.03, y: -5 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="group p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-purple-500 dark:hover:border-purple-500 transition-colors shadow-sm hover:shadow-lg"
        >
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-gray-900 dark:text-gray-100"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M3 12h18M3 18h18" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                Data Structures
              </h2>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Explore fundamental linear data structures including arrays, stacks, queues, and
              linked lists.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">Arrays</span>
              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">
                Linked List
              </span>
              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">
                Stack & Queue
              </span>
            </div>
          </div>
        </MotionLink>

        <MotionLink
          to="/advanced-structures"
          whileHover={{ scale: 1.03, y: -5 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="group p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors shadow-sm hover:shadow-lg"
        >
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-gray-900 dark:text-gray-100"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Advanced Structures
              </h2>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Master complex data structures like binary trees, BST, heaps, and hash tables.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">
                Binary Tree
              </span>
              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">BST</span>
              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">Heap</span>
              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">
                Hash Table
              </span>
            </div>
          </div>
        </MotionLink>
      </section>

      <section className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="space-y-2"
          >
            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-gray-900 dark:text-gray-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 3l14 9-14 9V3z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">Step-by-Step Control</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Play, pause, and step through algorithms at your own pace with speed controls.
            </p>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="space-y-2"
          >
            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-gray-900 dark:text-gray-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-3 3 3 3m8-6l3 3-3 3" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">Code Visualization</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              See the actual code with syntax highlighting and line-by-line execution tracking.
            </p>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="space-y-2"
          >
            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-gray-900 dark:text-gray-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13h4v8H3v-8zm7-6h4v14h-4V7zm7-4h4v18h-4V3z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">Complexity Analysis</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Understand time and space complexity with Big O notation for each algorithm.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
