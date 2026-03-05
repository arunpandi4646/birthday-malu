import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StarsBackground from './components/StarsBackground';
import HomePage from './pages/HomePage';
import MemoriesPage from './pages/MemoriesPage';
import SecretPage from './pages/SecretPage';
import FinalPage from './pages/FinalPage';
import './index.css';

export default function App() {
  return (
    <Router>
      <div className="relative min-h-screen overflow-x-hidden bg-[#06060f]">
        <StarsBackground />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/memories" element={<MemoriesPage />} />
          <Route path="/secret" element={<SecretPage />} />
          <Route path="/final" element={<FinalPage />} />
        </Routes>
      </div>
    </Router>
  );
}
