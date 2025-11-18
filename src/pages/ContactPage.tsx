import { useEffect } from 'react';
import ModernContact from '../components/ModernContact';
import ModernFooter from '../components/ModernFooter';
import { textColors } from '../lib/buttonStyles';

interface ContactPageProps {
  isDarkMode: boolean;
}

export default function ContactPage({ isDarkMode }: ContactPageProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={`min-h-screen pt-20 transition-colors duration-300 ${
      isDarkMode ? 'bg-black text-white' : 'bg-white text-black'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Text Content */}
          <div className="lg:sticky lg:top-32">
            <div className="max-w-xl">
              <h1 className={`text-4xl lg:text-6xl font-bold mb-8 leading-tight ${
                isDarkMode ? 'text-white' : 'text-black'
              }`} style={{ fontFamily: '"Cal Sans", sans-serif' }}>
                SHARE YOUR VISION
              </h1>
              
              <h2 className="text-3xl lg:text-5xl font-bold mb-12" style={{ fontFamily: '"Doto", sans-serif', color: textColors.accent(isDarkMode) }}>
                I'LL TAKE IT FROM THERE
              </h2>
              
              <div className={`w-24 h-1 mb-8 ${
                isDarkMode ? 'bg-white' : 'bg-black'
              }`}></div>
              
              <p className={`text-lg lg:text-xl leading-relaxed ${
                isDarkMode ? 'text-white/70' : 'text-black/70'
              }`} style={{ fontFamily: '"Satoshi", sans-serif' }}>
                Ready to transform your ideas into exceptional digital experiences? 
                Let's collaborate to create something remarkable together.
              </p>
            </div>
          </div>
          
          {/* Right Column - Contact Form */}
          <div>
            <ModernContact isDarkMode={isDarkMode} />
          </div>
        </div>
      </div>
      
      <ModernFooter isDarkMode={isDarkMode} />
    </div>
  );
}