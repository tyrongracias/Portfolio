import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ModernHero from '../components/ModernHero';
import ModernWork from '../components/ModernWork';
import ModernFooter from '../components/ModernFooter';

gsap.registerPlugin(ScrollTrigger);

interface HomePageProps {
  isDarkMode: boolean;
  setIsDarkMode: (isDark: boolean) => void;
}

export default function HomePage({ isDarkMode, setIsDarkMode }: HomePageProps) {

  useEffect(() => {
    // Scroll animations
    gsap.utils.toArray('.animate-on-scroll').forEach((element: any) => {
      gsap.from(element, {
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        y: 30,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    });
  }, []);

  return (
    <div className="min-h-screen">
      <ModernHero isDarkMode={isDarkMode} />
      <ModernWork isDarkMode={isDarkMode} />
      
      {/* Let's Work Together CTA Section */}
      <section className={`h-screen flex items-center justify-center transition-colors duration-300 ${
        isDarkMode ? 'bg-black' : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-5xl lg:text-7xl font-bold mb-8 ${
              isDarkMode ? 'text-white' : 'text-black'
            }`} style={{ fontFamily: '"Cal Sans", sans-serif' }}>
              Let's Work Together
            </h2>
            <p className={`text-xl lg:text-2xl mb-12 leading-relaxed ${
              isDarkMode ? 'text-white/70' : 'text-black/70'
            }`} style={{ fontFamily: '"Satoshi", sans-serif' }}>
              Have a project in mind? I'd love to hear about it. Let's discuss how we can bring your vision to life.
            </p>
            
                        <Link
              to="/contact"
              className="inline-flex items-center justify-center px-10 py-5 text-xl h-[64px] font-medium rounded-lg transition-all duration-300 transform hover:scale-105"
              style={{ 
                fontFamily: '"Satoshi", sans-serif',
                borderRadius: '8px',
                backgroundColor: isDarkMode ? 'white' : 'black',
                color: isDarkMode ? 'black' : 'white',
                boxShadow: isDarkMode 
                  ? '0 25px 50px -12px rgba(255, 255, 255, 0.1)' 
                  : '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#00fcd2';
                e.currentTarget.style.color = 'black';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = isDarkMode ? 'white' : 'black';
                e.currentTarget.style.color = isDarkMode ? 'black' : 'white';
              }}
            >
              Start a Project
            </Link>
          </div>
        </div>
      </section>
      
      <ModernFooter isDarkMode={isDarkMode} />
    </div>
  );
}
