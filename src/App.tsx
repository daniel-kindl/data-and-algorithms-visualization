import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout/Layout';

// Using lazy loading for pages to improve initial load time by splitting code into chunks.
// This ensures users only download the code for the page they are currently viewing.
const Home = lazy(() => import('./pages/Home'));
const SortingPage = lazy(() => import('./pages/SortingPage'));
const DataStructuresPage = lazy(() => import('./pages/DataStructuresPage'));
const AdvancedStructuresPage = lazy(() => import('./pages/AdvancedStructuresPage'));
const GraphPage = lazy(() => import('./pages/GraphPage'));

function App() {
  // Get the base URL from Vite environment variables.
  // This is crucial for correct routing when deployed to subpaths (like GitHub Pages).
  // If the "base" property is set in vite.config.ts, import.meta.env.BASE_URL will reflect it.
  const basename = import.meta.env.BASE_URL;

  return (
    <ThemeProvider>
      <Router basename={basename}>
        <Layout>
          {/* Suspense is required when using lazy-loaded components.
              It shows a fallback UI (spinner) while the component code is being fetched. */}
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-[calc(100vh-64px)]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sorting" element={<SortingPage />} />
              <Route path="/data-structures" element={<DataStructuresPage />} />
              <Route path="/advanced-structures" element={<AdvancedStructuresPage />} />
              <Route path="/graphs" element={<GraphPage />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
