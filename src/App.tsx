import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import SortingPage from './pages/SortingPage';
import DataStructuresPage from './pages/DataStructuresPage';
import AdvancedStructuresPage from './pages/AdvancedStructuresPage';

function App() {
  return (
    <ThemeProvider>
      <Router>
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
