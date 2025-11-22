import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import SortingPage from './pages/SortingPage';
import DataStructuresPage from './pages/DataStructuresPage';
import AdvancedStructuresPage from './pages/AdvancedStructuresPage';

function App() {
  // Get the base URL from Vite environment variables
  // This handles the subpath deployment on GitHub Pages automatically
  // if the "base" property is set correctly in vite.config.ts
  const basename = import.meta.env.BASE_URL;

  return (
    <ThemeProvider>
      <Router basename={basename}>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sorting" element={<SortingPage />} />
            <Route path="/data-structures" element={<DataStructuresPage />} />
            <Route path="/advanced-structures" element={<AdvancedStructuresPage />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
