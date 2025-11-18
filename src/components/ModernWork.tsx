import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, Star, Code, Smartphone, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { textColors } from '../lib/buttonStyles';

gsap.registerPlugin(ScrollTrigger);

interface ModernWorkProps {
  isDarkMode: boolean;
}

export default function ModernWork({ isDarkMode }: ModernWorkProps) {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      category: 'Web Apps',
      description: 'Modern e-commerce solution with advanced analytics and seamless user experience. Built with scalable architecture and modern payment integration.',
      longDescription: 'A comprehensive e-commerce platform featuring advanced analytics, inventory management, and seamless checkout experience. Integrated with Stripe for secure payments and MongoDB for scalable data storage.',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      stars: 4.9,
      link: 'https://example.com',
      github: 'https://github.com/example',
      featured: true
    },
    {
      id: 2,
      title: 'Mobile Banking App',
      category: 'Mobile',
      description: 'Secure and intuitive mobile banking application with biometric authentication and real-time transaction monitoring.',
      longDescription: 'A cutting-edge mobile banking solution featuring biometric authentication, real-time notifications, and comprehensive financial management tools. Built with React Native for cross-platform compatibility.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
      tech: ['React Native', 'Firebase', 'TypeScript'],
      stars: 4.8,
      link: 'https://example.com',
      github: 'https://github.com/example',
      featured: false
    },
    {
      id: 3,
      title: 'SaaS Dashboard',
      category: 'UI/UX',
      description: 'Comprehensive analytics dashboard with real-time data visualization and advanced reporting capabilities.',
      longDescription: 'An enterprise-grade SaaS dashboard providing real-time analytics, customizable reports, and interactive data visualizations. Features include user management, API integrations, and scalable cloud infrastructure.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      tech: ['Next.js', 'D3.js', 'PostgreSQL', 'AWS'],
      stars: 5.0,
      link: 'https://example.com',
      github: 'https://github.com/example',
      featured: true
    }
  ];

  // Show all projects in the new layout
  const filteredProjects = projects;

  useEffect(() => {
    if (!sectionRef.current) return;

    // Simple fade-in animations without floating/parallax
    const headerElement = sectionRef.current.querySelector('.section-header');
    if (headerElement) {
      gsap.fromTo(headerElement,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: headerElement,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }

    // Project cards entrance animation
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(card, 
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            },
            delay: index * 0.2
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        const triggerElement = trigger.trigger as Element;
        if (trigger.trigger === sectionRef.current || 
            cardsRef.current.includes(triggerElement as HTMLDivElement) ||
            (sectionRef.current && triggerElement && sectionRef.current.contains(triggerElement))) {
          trigger.kill();
        }
      });
    };
  }, [filteredProjects]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Mobile':
        return Smartphone;
      case 'Web Apps':
        return Globe;
      case 'UI/UX':
        return Code;
      default:
        return Code;
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="work" 
      className={`py-24 relative transition-colors duration-300 overflow-hidden ${isDarkMode ? 'bg-black' : 'bg-white'}`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="section-header text-center mb-16">
          <div className={`inline-flex items-center space-x-2 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-purple-400 border border-purple-400/20 mb-6 ${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`}>
            <Code className="w-4 h-4" />
            <span>Featured Work</span>
          </div>
          <h2 className={`text-3xl lg:text-5xl font-normal mb-6 ${isDarkMode ? 'text-white' : 'text-black'}`} style={{ fontFamily: '"Cal Sans", sans-serif' }}>
            Selected
            <span className="font-black" style={{ fontFamily: '"Doto", sans-serif', fontSize: '54px', color: textColors.accent(isDarkMode) }}> Projects</span>
          </h2>
          <p className={`text-xl max-w-2xl mx-auto ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
            A collection of projects that showcase my expertise in modern web development, 
            mobile applications, and user experience design.
          </p>
        </div>

        {/* Projects - One per viewport with alternating layout */}
        <div className="space-y-32">
          {filteredProjects.map((project, index) => {
            const isEven = index % 2 === 0;
            const CategoryIcon = getCategoryIcon(project.category);
            
            return (
              <div 
                key={project.id}
                ref={(el) => (cardsRef.current[index] = el)}
                className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-16 min-h-screen lg:min-h-[60vh] ${
                  !isEven ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Content Side */}
                <div className="flex-1 space-y-6">
                  {/* Category Badge */}
                  <div className={`inline-flex items-center space-x-2 backdrop-blur-sm rounded-full px-4 py-2 text-sm border ${
                    isDarkMode 
                      ? 'bg-white/10 border-white/20 text-white/80' 
                      : 'bg-black/10 border-black/20 text-black/80'
                  }`}>
                    <CategoryIcon className="w-4 h-4" />
                    <span>{project.category}</span>
                    {project.featured && (
                      <span className="px-2 py-1 rounded-full text-xs text-black font-medium ml-2" style={{ backgroundColor: '#00fcd2' }}>
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Project Title */}
                  <h3 className={`text-4xl lg:text-5xl font-normal ${isDarkMode ? 'text-white' : 'text-black'}`} style={{ fontFamily: '"Cal Sans", sans-serif' }}>
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className={`text-lg lg:text-xl leading-relaxed max-w-2xl ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
                    {project.longDescription || project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-3">
                    {project.tech.map((tech) => (
                      <span 
                        key={tech}
                        className={`px-4 py-2 rounded-lg border transition-colors ${
                          isDarkMode 
                            ? 'bg-white/10 text-white/80 border-white/10' 
                            : 'bg-black/10 text-black/80 border-black/10'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1 text-yellow-400">
                      <Star className="w-5 h-5 fill-current" />
                      <span className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>{project.stars}</span>
                    </div>
                    <span className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>User Rating</span>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Button 
                      variant="outline"
                        className="group text-lg px-8 h-[54px] rounded-lg font-medium transition-all duration-300 border-0"
                      style={{ 
                        borderRadius: '8px',
                        backgroundColor: isDarkMode ? 'white' : 'black',
                        color: isDarkMode ? 'black' : 'white'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#00fcd2';
                        e.currentTarget.style.color = 'black';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = isDarkMode ? 'white' : 'black';
                        e.currentTarget.style.color = isDarkMode ? 'black' : 'white';
                      }}
                      onClick={() => navigate(`/case-study/${project.id}`)}
                    >
                      <span style={{ fontFamily: '"Satoshi", sans-serif' }}>View Project</span>
                      <ExternalLink className="w-5 h-5 ml-3 group-hover:scale-110 transition-transform" />
                    </Button>
                  </div>
                </div>

                {/* Image Side */}
                <div className="flex-1 w-full">
                  <div className="relative group">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-[400px] lg:h-[500px] object-cover rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Floating Elements */}
                    <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full blur-2xl opacity-60" style={{ backgroundColor: '#00fcd2' }}></div>
                    <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500/30 rounded-full blur-2xl opacity-60"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>


      </div>
    </section>
  );
}