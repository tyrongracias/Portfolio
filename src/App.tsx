import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ModernNavbar from '@/components/ModernNavbarTest';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import CaseStudyPage from './pages/CaseStudyPage';
import ContactPage from './pages/ContactPage';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Initialize GSAP animations
    gsap.config({
      nullTargetWarn: false,
    });
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
      <Router>
        <ModernNavbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <Routes>
          <Route path="/" element={<HomePage isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
          <Route path="/contact" element={<ContactPage isDarkMode={isDarkMode} />} />
          <Route path="/profile/:id" element={<ProfilePage isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
          <Route path="/case-study/:projectId" element={<CaseStudyPage isDarkMode={isDarkMode} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
