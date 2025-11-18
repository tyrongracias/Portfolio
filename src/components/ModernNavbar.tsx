import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ModernNavbarProps {
  isDarkMode: boolean;
  setIsDarkMode: (isDark: boolean) => void;
}

export default function ModernNavbar({ isDarkMode, setIsDarkMode }: ModernNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || isMobileMenuOpen
          ? isDarkMode 
            ? 'bg-black/90 backdrop-blur-xl border-b border-white/10'
            : 'bg-white/90 backdrop-blur-xl border-b border-black/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button 
            onClick={() => {
              if (window.location.pathname === '/') {
                document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
              } else {
                window.location.href = '/#hero';
              }
            }}
            className="relative group cursor-pointer"
          >
            <div 
              className="text-base lg:text-[26px] font-bold transition-all duration-300"
              style={{ fontFamily: '"Doto", sans-serif', color: '#00fcd2' }}
            >
              TYRON GRACIAS
            </div>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300" style={{ backgroundColor: '#00fcd2' }}></div>
          </button>

          {/* LinkedIn Link and Theme Toggle */}
          <div className="hidden md:flex items-center space-x-6">
            <a 
              href="https://linkedin.com/in/tyron-gracias-a99aa6149" 
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-all duration-300 relative group text-base lg:text-[26px] ${
                (isScrolled || isMobileMenuOpen) 
                  ? isDarkMode 
                    ? 'text-white hover:text-white' 
                    : 'text-black hover:text-black'
                  : 'text-white hover:text-white'
              }`}
              style={{ fontFamily: '"Doto", sans-serif' }}
            >
              LINKEDIN/TYRONGRACIAS
              <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full bg-white"></span>
            </a>
            
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`transition-colors p-2 ${
                (isScrolled || isMobileMenuOpen) 
                  ? isDarkMode 
                    ? 'text-white hover:text-white' 
                    : 'text-black hover:text-black'
                  : 'text-white hover:text-white'
              }`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className={`lg:hidden ${
              isDarkMode 
                ? 'text-white/80 hover:text-white hover:bg-white/10' 
                : 'text-black/80 hover:text-black hover:bg-black/10'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={`lg:hidden absolute top-full left-0 right-0 backdrop-blur-xl border-b ${
            isDarkMode 
              ? 'bg-black/90 border-white/10' 
              : 'bg-white/90 border-black/10'
          }`}>
            <div className="px-6 py-8 space-y-6">
              <div className="flex flex-col space-y-4">
                <a 
                  href="https://linkedin.com/in/tyron-gracias-a99aa6149" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`transition-all duration-300 relative group text-base ${
                    isDarkMode 
                      ? 'text-white hover:text-white' 
                      : 'text-black hover:text-black'
                  }`}
                  style={{ fontFamily: '"Doto", sans-serif' }}
                >
                  LINKEDIN/TYRONGRACIAS
                  <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                    isDarkMode ? 'bg-white' : 'bg-black'
                  }`}></span>
                </a>
                
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`flex items-center space-x-2 transition-colors text-base ${
                    isDarkMode 
                      ? 'text-white hover:text-white' 
                      : 'text-black hover:text-black'
                  }`}
                  aria-label="Toggle theme"
                >
                  {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  <span style={{ fontFamily: '"Doto", sans-serif' }}>
                    {isDarkMode ? 'LIGHT MODE' : 'DARK MODE'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

interface ModernNavbarProps {
  isDarkMode: boolean;
  setIsDarkMode: (isDark: boolean) => void;
}

export default function ModernNavbar({ isDarkMode, setIsDarkMode }: ModernNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || isMobileMenuOpen
          ? isDarkMode 
            ? 'bg-black/90 backdrop-blur-xl border-b border-white/10'
            : 'bg-white/90 backdrop-blur-xl border-b border-black/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button 
            onClick={() => {
              if (window.location.pathname === '/') {
                document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
              } else {
                window.location.href = '/#hero';
              }
            }}
            className="relative group cursor-pointer"
          >
            <div 
              className="text-base lg:text-[26px] font-bold transition-all duration-300"
              style={{ fontFamily: '"Doto", sans-serif', color: '#00fcd2' }}
            >
              TYRON GRACIAS
            </div>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300" style={{ backgroundColor: '#00fcd2' }}></div>
          </button>

          {/* LinkedIn Link and Theme Toggle */}
          <div className="hidden md:flex items-center space-x-6">
            <a 
              href="https://linkedin.com/in/tyron-gracias-a99aa6149" 
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-all duration-300 relative group text-base lg:text-[26px] ${
                (isScrolled || isMobileMenuOpen) 
                  ? isDarkMode 
                    ? 'text-white hover:text-white' 
                    : 'text-black hover:text-black'
                  : 'text-white hover:text-white'
              }`}
              style={{ fontFamily: '"Doto", sans-serif' }}
            >
              LINKEDIN/TYRONGRACIAS
              <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full bg-white"></span>
            </a>
            
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`transition-colors p-2 ${
                (isScrolled || isMobileMenuOpen) 
                  ? isDarkMode 
                    ? 'text-white hover:text-white' 
                    : 'text-black hover:text-black'
                  : 'text-white hover:text-white'
              }`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className={`lg:hidden ${
              isDarkMode 
                ? 'text-white/80 hover:text-white hover:bg-white/10' 
                : 'text-black/80 hover:text-black hover:bg-black/10'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={`lg:hidden absolute top-full left-0 right-0 backdrop-blur-xl border-b ${
            isDarkMode 
              ? 'bg-black/90 border-white/10' 
              : 'bg-white/90 border-black/10'
          }`}>
            <div className="px-6 py-8 space-y-6">
              <div className="flex flex-col space-y-4">
                <a 
                  href="https://linkedin.com/in/tyron-gracias-a99aa6149" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`transition-all duration-300 relative group text-base ${
                    isDarkMode 
                      ? 'text-white hover:text-white' 
                      : 'text-black hover:text-black'
                  }`}
                  style={{ fontFamily: '"Doto", sans-serif' }}
                >
                  LINKEDIN/TYRONGRACIAS
                  <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                    isDarkMode ? 'bg-white' : 'bg-black'
                  }`}></span>
                </a>
                
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`flex items-center space-x-2 transition-colors text-base ${
                    isDarkMode 
                      ? 'text-white hover:text-white' 
                      : 'text-black hover:text-black'
                  }`}
                  aria-label="Toggle theme"
                >
                  {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  <span style={{ fontFamily: '"Doto", sans-serif' }}>
                    {isDarkMode ? 'LIGHT MODE' : 'DARK MODE'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
                    <button 
            onClick={() => {
              if (window.location.pathname === '/') {
                document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
              } else {
                window.location.href = '/#hero';
              }
            }}
            className="relative group cursor-pointer"
          >
            <div 
              className="text-sm font-bold text-white hover:text-lime-400 transition-all duration-300"
              style={{ fontFamily: '"Doto", sans-serif' }}
            >
              TYRON GRACIAS
            </div>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-lime-400 group-hover:w-full transition-all duration-300"></div>
          </Link>

          {/* LinkedIn Link and Theme Toggle */}
          <div className="hidden md:flex items-center space-x-6">
            <a 
              href="https://linkedin.com/in/tyrongracias" 
                  className={`transition-all duration-300 relative group ${
                    isDarkMode 
                      ? 'text-white hover:text-white' 
                      : 'text-white hover:text-white'
                  }`}
                (isScrolled || isMobileMenuOpen) 
                  ? isDarkMode 
                    ? 'text-white hover:text-white' 
                    : 'text-black hover:text-black'
                  : 'text-white hover:text-white'
              }`}
              style={{ fontFamily: '"Doto", sans-serif' }}
            >
              LINKEDIN/TYRONGRACIAS
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>  style={{ fontFamily: '"Doto", sans-serif' }}
                >
                  LINKEDIN/TYRONGRACIAS
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                </a>            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`transition-colors p-2 ${
                (isScrolled || isMobileMenuOpen) 
                  ? isDarkMode 
                    ? 'text-white hover:text-white' 
                    : 'text-black hover:text-black'
                  : 'text-white hover:text-white'
              }`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Menu Toggle */
          <Button
            variant="ghost"
            size="icon"
            className={`lg:hidden hover:bg-white/10 ${
              (isScrolled || isMobileMenuOpen) 
                ? isDarkMode 
                  ? 'text-white hover:text-white' 
                  : 'text-black hover:text-black'
                : 'text-white hover:text-white'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-xl border-b border-white/10">
            <div className="px-6 py-8 space-y-6">
              <div className="flex flex-col space-y-4">
                <a 
                  href="https://linkedin.com/in/tyrongracias" 
                  className={`transition-all duration-300 relative group text-sm ${\n                    isDarkMode \n                      ? 'text-white hover:text-white' \n                      : 'text-black hover:text-black'\n                  }`}
                  style={{ fontFamily: '"Doto", sans-serif' }}
                >
                  LINKEDIN/TYRONGRACIAS
                  <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${\n                    isDarkMode ? 'bg-white' : 'bg-black'\n                  }`}></span>
                </a>
                
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`flex items-center space-x-2 transition-colors text-sm ${
                    isDarkMode 
                      ? 'text-white hover:text-white' 
                      : 'text-black hover:text-black'
                  }`}
                  aria-label="Toggle theme"
                >
                  {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}