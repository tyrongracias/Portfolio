import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft, Calendar, Users, Award, Target, CheckCircle, ArrowRight, Code, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { textColors } from '../lib/buttonStyles';

interface CaseStudyPageProps {
  isDarkMode: boolean;
}

interface CaseStudyData {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tech: string[];
  stars: number;
  link: string;
  github: string;
  featured: boolean;
  
  // Case study specific data following UX methodology
  duration: string;
  team: string;
  role: string;
  client?: string;
  
  // Project Overview
  overview: {
    challenge: string;
    solution: string;
    impact: string[];
    myRole: string[];
  };
  
  // Research & Discovery
  research: {
    userResearch: string;
    competitiveAnalysis: string;
    keyInsights: string[];
    userPersonas?: Array<{
      name: string;
      description: string;
      painPoints: string[];
    }>;
  };
  
  // Design Process
  designProcess: {
    ideation: string;
    wireframing: string;
    prototyping: string;
    testing: string;
  };
  
  // Visual Design
  visualDesign: {
    designSystem: string;
    colorPalette: string[];
    typography: string;
    iconography: string;
  };
  
  // Development & Implementation
  implementation: {
    architecture: string;
    keyFeatures: Array<{
      title: string;
      description: string;
      techDetails: string;
    }>;
    challenges: string[];
    solutions: string[];
  };
  
  // Results & Learnings
  outcomes: {
    metrics: Array<{
      label: string;
      value: string;
      description: string;
    }>;
    userFeedback: string[];
    lessons: string[];
    nextSteps: string[];
  };
  
  gallery: string[];
  testimonial?: {
    text: string;
    author: string;
    position: string;
  };
}

export default function CaseStudyPage({ isDarkMode }: CaseStudyPageProps) {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<CaseStudyData | null>(null);

  // Case study data for each project
  const caseStudyData: Record<string, CaseStudyData> = {
    '1': {
      id: 1,
      title: 'E-Commerce Platform',
      category: 'Web Apps',
      description: 'Modern e-commerce solution with advanced analytics and seamless user experience.',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=800&fit=crop',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      stars: 4.9,
      link: 'https://example.com',
      github: 'https://github.com/example',
      featured: true,
      
      duration: '4 months',
      team: '5 developers',
      role: 'Full-Stack Lead Developer',
      client: 'RetailTech Solutions',
      
      overview: {
        challenge: 'RetailTech Solutions needed a modern, scalable e-commerce platform that could handle high traffic volumes while providing an intuitive experience for both customers and administrators. Their existing system was outdated and couldn\'t support their growing business needs.',
        solution: 'I designed and developed a comprehensive e-commerce platform with microservices architecture, real-time analytics, and seamless payment integration that scales with business growth.',
        impact: [
          '300% increase in conversion rates',
          '50% reduction in page load times',
          '99.9% uptime achieved',
          '$2M+ in processed transactions'
        ],
        myRole: [
          'Full-stack development and architecture',
          'Team leadership and code review',
          'Client communication and requirements gathering',
          'Performance optimization and deployment'
        ]
      },
      
      research: {
        userResearch: 'Conducted user interviews with 25 existing customers and analyzed user behavior data from their legacy system. Key findings showed that 68% of users abandoned purchases due to slow checkout processes.',
        competitiveAnalysis: 'Analyzed 10 leading e-commerce platforms including Shopify, WooCommerce, and Magento to identify best practices and opportunities for differentiation.',
        keyInsights: [
          'Users expect sub-2-second page load times',
          'Mobile-first design is crucial (70% mobile traffic)',
          'One-click checkout significantly improves conversion',
          'Real-time inventory updates prevent overselling'
        ],
        userPersonas: [
          {
            name: 'Sarah - Busy Parent',
            description: 'Working mother who shops online during breaks',
            painPoints: ['Limited time', 'Needs quick checkout', 'Mobile-heavy usage']
          },
          {
            name: 'Mike - Tech Enthusiast',
            description: 'Early adopter who values detailed product information',
            painPoints: ['Wants comprehensive specs', 'Compares prices', 'Expects fast loading']
          }
        ]
      },
      
      designProcess: {
        ideation: 'Started with user journey mapping and sketching key user flows. Focused on reducing friction points identified in research, particularly around product discovery and checkout processes.',
        wireframing: 'Created low-fidelity wireframes for all major pages, testing information architecture with stakeholders. Iterated on layouts based on usability feedback.',
        prototyping: 'Built interactive prototypes using Figma for user testing. Tested with 15 users to validate design decisions and identify remaining pain points.',
        testing: 'Conducted A/B tests on key conversion flows, resulting in 23% improvement in add-to-cart rates and 31% improvement in checkout completion.'
      },
      
      visualDesign: {
        designSystem: 'Developed a comprehensive design system with reusable components, ensuring consistency across all touchpoints and enabling rapid development.',
        colorPalette: ['#00fcd2', '#1a1a1a', '#f8f9fa', '#6c757d', '#28a745'],
        typography: 'Selected modern, accessible fonts optimized for readability across devices. Established clear hierarchy for product information and navigation.',
        iconography: 'Custom icon set designed for e-commerce context, focusing on clarity and universal recognition across cultural backgrounds.'
      },
      
      implementation: {
        architecture: 'Built using microservices architecture with React frontend, Node.js backend services, MongoDB for data storage, and Redis for caching. Deployed on AWS with auto-scaling capabilities.',
        keyFeatures: [
          {
            title: 'Real-time Analytics Dashboard',
            description: 'Live sales tracking and customer behavior insights',
            techDetails: 'Built with D3.js and WebSocket connections for real-time data updates'
          },
          {
            title: 'Smart Inventory Management',
            description: 'Automated stock tracking with predictive alerts',
            techDetails: 'MongoDB change streams with custom algorithms for demand prediction'
          },
          {
            title: 'Secure Payment Processing',
            description: 'Multi-gateway payment system with fraud detection',
            techDetails: 'Stripe and PayPal integration with PCI DSS compliance'
          }
        ],
        challenges: [
          'Implementing real-time inventory synchronization across multiple warehouses',
          'Optimizing database queries for product catalog with 100K+ items',
          'Ensuring payment security compliance across international markets'
        ],
        solutions: [
          'Implemented event-driven architecture with message queues',
          'Used database indexing and caching strategies',
          'Built comprehensive security audit system with regular penetration testing'
        ]
      },
      
      outcomes: {
        metrics: [
          {
            label: 'Conversion Rate',
            value: '+300%',
            description: 'Increase in completed purchases vs. old platform'
          },
          {
            label: 'Page Load Time',
            value: '1.2s',
            description: 'Average load time, 50% faster than before'
          },
          {
            label: 'Uptime',
            value: '99.9%',
            description: 'System availability since launch'
          },
          {
            label: 'Revenue',
            value: '$2M+',
            description: 'Total transactions processed in first year'
          }
        ],
        userFeedback: [
          '"The new checkout process is so much faster!" - Customer Survey',
          '"Finally, an admin panel that makes sense." - Store Manager',
          '"Mobile shopping actually works now." - User Review'
        ],
        lessons: [
          'Performance optimization should be considered from day one, not as an afterthought',
          'Regular user testing throughout development catches issues early',
          'Scalable architecture pays dividends as the business grows'
        ],
        nextSteps: [
          'Implement AI-powered product recommendations',
          'Add augmented reality product visualization',
          'Expand international payment gateway support'
        ]
      },
      
      gallery: [
        'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop'
      ],
      testimonial: {
        text: "Tyron delivered exactly what we needed. The platform has transformed our business and exceeded all our expectations. Our conversion rates have tripled since launch.",
        author: "Sarah Johnson",
        position: "CTO, RetailTech Solutions"
      }
    },
    '2': {
      id: 2,
      title: 'Mobile Banking App',
      category: 'Mobile',
      description: 'Secure and intuitive mobile banking application with biometric authentication.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=800&fit=crop',
      tech: ['React Native', 'Firebase', 'TypeScript'],
      stars: 4.8,
      link: 'https://example.com',
      github: 'https://github.com/example',
      featured: false,
      
      duration: '6 months',
      team: '4 developers',
      role: 'Mobile Lead Developer',
      client: 'SecureBank Inc.',
      
      overview: {
        challenge: 'SecureBank needed to modernize their mobile banking experience to compete with fintech startups while maintaining enterprise-grade security and regulatory compliance.',
        solution: 'Developed a React Native banking app with biometric authentication, real-time notifications, and intuitive financial management tools that exceed industry security standards.',
        impact: ['85% user adoption rate', '40% reduction in support calls', 'Zero security breaches', '4.8/5 app store rating'],
        myRole: ['Mobile architecture and development', 'Security implementation and testing', 'Cross-platform optimization', 'Team mentorship and code review']
      },
      
      research: {
        userResearch: 'Conducted interviews with 30 existing bank customers and analyzed mobile usage patterns. 78% wanted faster access to account information without compromising security.',
        competitiveAnalysis: 'Studied leading fintech apps like Revolut, Monzo, and traditional banking apps to identify gaps in user experience and security features.',
        keyInsights: ['Biometric auth is expected by 90% of users', 'Offline access is crucial for trust', 'Real-time notifications drive engagement', 'Simple navigation reduces support calls'],
        userPersonas: [
          {
            name: 'Alex - Young Professional',
            description: 'Tech-savvy millennial who uses mobile for all banking',
            painPoints: ['Wants instant notifications', 'Expects modern UI', 'Values security but needs convenience']
          }
        ]
      },
      
      designProcess: {
        ideation: 'Mapped user journeys for common banking tasks, focusing on reducing steps while maintaining security checkpoints.',
        wireframing: 'Created mobile-first wireframes with accessibility in mind, tested with visually impaired users.',
        prototyping: 'Built interactive prototypes with biometric simulation for user testing across different devices.',
        testing: 'Conducted security penetration testing alongside usability testing with 20+ participants.'
      },
      
      visualDesign: {
        designSystem: 'Created comprehensive mobile design system with focus on accessibility and financial data clarity.',
        colorPalette: ['#00fcd2', '#2ECC71', '#E74C3C', '#F39C12', '#34495E'],
        typography: 'Selected banking-appropriate fonts with high legibility for financial data and multilingual support.',
        iconography: 'Custom financial iconography designed for universal recognition and accessibility compliance.'
      },
      
      implementation: {
        architecture: 'React Native with Firebase backend, implementing OAuth 2.0 and biometric authentication with encrypted local storage.',
        keyFeatures: [
          {
            title: 'Biometric Authentication',
            description: 'Secure fingerprint and face ID integration',
            techDetails: 'React Native Biometrics with hardware security module integration'
          },
          {
            title: 'Offline Banking',
            description: 'Access account info without internet connection',
            techDetails: 'Encrypted SQLite with secure data synchronization'
          },
          {
            title: 'Real-time Notifications',
            description: 'Instant transaction and security alerts',
            techDetails: 'Firebase Cloud Messaging with custom notification handling'
          }
        ],
        challenges: ['Cross-platform biometric consistency', 'Banking regulation compliance', 'Offline data security'],
        solutions: ['Platform-specific biometric adapters', 'Regular security audits and compliance checks', 'Advanced encryption for offline data']
      },
      
      outcomes: {
        metrics: [
          { label: 'User Adoption', value: '85%', description: 'of existing customers switched to mobile app' },
          { label: 'Support Calls', value: '-40%', description: 'reduction in customer service requests' },
          { label: 'Security', value: '0', description: 'security breaches since launch' },
          { label: 'Rating', value: '4.8/5', description: 'average app store rating' }
        ],
        userFeedback: ['"Finally, banking that actually works on mobile!"', '"The biometric login is so convenient and secure."', '"Best banking app I\'ve ever used."'],
        lessons: ['Security and usability can coexist with proper design', 'Offline functionality is crucial for user trust', 'Regular security audits prevent issues'],
        nextSteps: ['Add AI-powered spending insights', 'Implement voice banking features', 'Expand cryptocurrency support']
      },
      
      gallery: [
        'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop'
      ],
      testimonial: {
        text: "The app has revolutionized how our customers interact with our services. User engagement has never been higher, and the security features give us complete confidence.",
        author: "Michael Chen",
        position: "Product Manager, SecureBank Inc."
      }
    },
    '3': {
      id: 3,
      title: 'SaaS Dashboard',
      category: 'UI/UX',
      description: 'Comprehensive analytics dashboard with real-time data visualization.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
      tech: ['Next.js', 'D3.js', 'PostgreSQL', 'AWS'],
      stars: 5.0,
      link: 'https://example.com',
      github: 'https://github.com/example',
      featured: true,
      
      duration: '5 months',
      team: '6 developers',
      role: 'Frontend Architect',
      client: 'DataViz Pro',
      
      overview: {
        challenge: 'DataViz Pro\'s enterprise clients were struggling with data silos and complex reporting tools that required technical expertise, leading to delayed decision-making and reduced productivity.',
        solution: 'Created an intuitive SaaS dashboard that aggregates data from multiple sources and transforms complex datasets into actionable insights through interactive visualizations.',
        impact: ['200% increase in user engagement', '60% faster report generation', '95% client satisfaction', '$500K ARR in year one'],
        myRole: ['Frontend architecture and development', 'Data visualization design and implementation', 'Performance optimization', 'Team leadership and mentoring']
      },
      
      research: {
        userResearch: 'Interviewed 40 enterprise users across different industries to understand data analysis workflows and pain points with existing tools.',
        competitiveAnalysis: 'Analyzed Tableau, Power BI, and Looker to identify opportunities for improved user experience and unique value propositions.',
        keyInsights: ['Users spend 70% of time on data preparation vs analysis', 'Real-time updates are critical for operational decisions', 'Collaboration features drive platform adoption', 'Mobile access is increasingly important'],
        userPersonas: [
          {
            name: 'Sarah - Data Analyst',
            description: 'Creates reports and dashboards for executive team',
            painPoints: ['Complex tools require training', 'Data silos create manual work', 'Slow report generation']
          },
          {
            name: 'David - Executive',
            description: 'Needs quick access to key metrics and insights',
            painPoints: ['Wants real-time data', 'Needs mobile access', 'Requires intuitive interface']
          }
        ]
      },
      
      designProcess: {
        ideation: 'Sketched data visualization concepts focusing on clarity and interactivity. Explored progressive disclosure to handle data complexity.',
        wireframing: 'Created low-fidelity wireframes for dashboard layouts, testing information hierarchy with target users.',
        prototyping: 'Built interactive prototypes with real data to test visualization effectiveness and user workflows.',
        testing: 'Conducted usability testing with 25 enterprise users, iterating on dashboard layouts and interaction patterns.'
      },
      
      visualDesign: {
        designSystem: 'Developed comprehensive design system optimized for data visualization with consistent color coding and typography scales.',
        colorPalette: ['#00fcd2', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'],
        typography: 'Selected fonts optimized for data readability at various scales, with clear hierarchy for metrics and labels.',
        iconography: 'Created data-focused icon set with emphasis on chart types, data sources, and analytical functions.'
      },
      
      implementation: {
        architecture: 'Next.js frontend with D3.js for visualizations, PostgreSQL for data storage, Redis for caching, deployed on AWS with auto-scaling.',
        keyFeatures: [
          {
            title: 'Real-time Data Processing',
            description: 'Live updates from multiple data sources',
            techDetails: 'WebSocket connections with efficient data streaming and caching layers'
          },
          {
            title: 'Interactive Visualizations',
            description: 'Customizable charts with drill-down capabilities',
            techDetails: 'D3.js with custom interaction handlers and smooth animations'
          },
          {
            title: 'Collaborative Features',
            description: 'Share dashboards and add comments on insights',
            techDetails: 'Real-time collaboration with operational transformation algorithms'
          }
        ],
        challenges: ['Processing large datasets without performance impact', 'Creating intuitive data visualization interfaces', 'Ensuring scalability for enterprise workloads'],
        solutions: ['Implemented data virtualization and progressive loading', 'Extensive user testing and iterative design improvements', 'Built microservices architecture with horizontal scaling']
      },
      
      outcomes: {
        metrics: [
          { label: 'User Engagement', value: '+200%', description: 'increase in daily active users' },
          { label: 'Report Speed', value: '60%', description: 'faster report generation time' },
          { label: 'Satisfaction', value: '95%', description: 'client satisfaction score' },
          { label: 'Revenue', value: '$500K', description: 'ARR achieved in first year' }
        ],
        userFeedback: ['"Finally, a dashboard that makes sense to non-technical users."', '"The real-time updates have transformed our decision-making process."', '"Best data visualization tool we\'ve used."'],
        lessons: ['Performance optimization must be built-in from the start', 'User testing with real data reveals hidden usability issues', 'Collaborative features drive platform adoption significantly'],
        nextSteps: ['Add AI-powered insights and anomaly detection', 'Implement natural language querying', 'Expand mobile capabilities']
      },
      
      gallery: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop'
      ],
      testimonial: {
        text: "This dashboard has become the cornerstone of our data strategy. The insights we've gained are invaluable, and the user experience is unlike anything we've seen before.",
        author: "Emma Rodriguez",
        position: "Chief Data Officer, DataViz Pro"
      }
    }
  };

  useEffect(() => {
    if (projectId && caseStudyData[projectId]) {
      setProject(caseStudyData[projectId]);
    }
  }, [projectId]);

  if (!project) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        isDarkMode ? 'bg-black' : 'bg-white'
      }`}>
        <div className={`text-xl ${
          isDarkMode ? 'text-white' : 'text-black'
        }`}>Project not found</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 pt-20 ${
      isDarkMode 
        ? 'bg-black text-white' 
        : 'bg-white text-black'
    }`}>
      {/* Navigation - Removed since navbar is now in App.tsx */}
      {/* Back to Portfolio Button - keeping as page-specific navigation */}
      <div className="fixed top-20 left-6 z-40">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className={`transition-colors ${
            isDarkMode 
              ? 'text-white/80 hover:text-white hover:bg-white/10' 
              : 'text-black/80 hover:text-black hover:bg-black/10'
          }`}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Portfolio
        </Button>
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className={`inline-flex items-center space-x-2 backdrop-blur-sm rounded-full px-4 py-2 text-sm mb-6 ${
                isDarkMode 
                  ? 'bg-white/10 text-white/80 border-white/10' 
                  : 'bg-black/10 text-black/80 border-black/10'
              } border`}>
                <span>{project.category}</span>
                {project.featured && (
                  <span className="px-2 py-1 rounded-full text-xs text-black font-medium ml-2" style={{ backgroundColor: '#00fcd2' }}>
                    Featured
                  </span>
                )}
              </div>
              
              <h1 className={`text-4xl lg:text-6xl font-normal mb-6 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`} style={{ fontFamily: '"Cal Sans", sans-serif' }}>
                {project.title}
              </h1>
              
              <p className={`text-xl lg:text-2xl mb-8 leading-relaxed ${
                isDarkMode ? 'text-white/70' : 'text-black/70'
              }`}>
                {project.overview.solution}
              </p>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <Calendar className="w-5 h-5 mb-2" style={{ color: '#00fcd2' }} />
                  <div className={`text-sm ${
                    isDarkMode ? 'text-white/60' : 'text-black/60'
                  }`}>Duration</div>
                  <div className={`font-medium ${
                    isDarkMode ? 'text-white' : 'text-black'
                  }`}>{project.duration}</div>
                </div>
                <div>
                  <Users className="w-5 h-5 mb-2" style={{ color: '#00fcd2' }} />
                  <div className={`text-sm ${
                    isDarkMode ? 'text-white/60' : 'text-black/60'
                  }`}>Team Size</div>
                  <div className={`font-medium ${
                    isDarkMode ? 'text-white' : 'text-black'
                  }`}>{project.team}</div>
                </div>
                <div>
                  <Award className="w-5 h-5 mb-2" style={{ color: '#00fcd2' }} />
                  <div className={`text-sm ${
                    isDarkMode ? 'text-white/60' : 'text-black/60'
                  }`}>My Role</div>
                  <div className={`font-medium ${
                    isDarkMode ? 'text-white' : 'text-black'
                  }`}>{project.role}</div>
                </div>
                <div>
                  <Target className="w-5 h-5 mb-2" style={{ color: '#00fcd2' }} />
                  <div className={`text-sm ${
                    isDarkMode ? 'text-white/60' : 'text-black/60'
                  }`}>Rating</div>
                  <div className={`font-medium ${
                    isDarkMode ? 'text-white' : 'text-black'
                  }`}>{project.stars}/5.0</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full blur-2xl opacity-60" style={{ backgroundColor: '#00fcd2' }}></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500/30 rounded-full blur-2xl opacity-60"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-3xl lg:text-4xl font-normal mb-12 text-center ${
            isDarkMode ? 'text-white' : 'text-black'
          }`} style={{ fontFamily: '"Cal Sans", sans-serif' }}>
            Project Overview
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-16 mb-16">
            <div>
              <h3 className="text-2xl font-semibold mb-6" style={{ fontFamily: '"Satoshi", sans-serif', color: textColors.accent(isDarkMode) }}>The Challenge</h3>
              <p className={`text-lg leading-relaxed ${
                isDarkMode ? 'text-white/80' : 'text-black/80'
              }`}>
                {project.overview.challenge}
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-6" style={{ fontFamily: '"Satoshi", sans-serif', color: textColors.accent(isDarkMode) }}>My Role</h3>
              <ul className="space-y-3">
                {project.overview.myRole.map((role, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className={`text-lg ${
                      isDarkMode ? 'text-white/80' : 'text-black/80'
                    }`}>{role}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {project.overview.impact.map((impact, index) => (
              <div key={index} className={`backdrop-blur-sm rounded-xl p-6 border text-center ${
                isDarkMode 
                  ? 'bg-white/10 border-white/10' 
                  : 'bg-black/10 border-black/10'
              }`}>
                <div className="text-2xl font-bold mb-2" style={{ color: textColors.accent(isDarkMode) }}>{impact.split(' ')[0]}</div>
                <div className={isDarkMode ? 'text-white/80' : 'text-black/80'}>{impact.split(' ').slice(1).join(' ')}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research & Discovery */}
      <section className={`py-20 px-6 lg:px-8 ${
        isDarkMode ? 'bg-white/5' : 'bg-black/5'
      }`}>
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-3xl lg:text-4xl font-normal mb-12 text-center ${
            isDarkMode ? 'text-white' : 'text-black'
          }`} style={{ fontFamily: '"Cal Sans", sans-serif' }}>
            Research & Discovery
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-16 mb-16">
            <div>
              <h3 className="text-2xl font-semibold mb-6" style={{ fontFamily: '"Satoshi", sans-serif', color: textColors.accent(isDarkMode) }}>User Research</h3>
              <p className={`text-lg leading-relaxed mb-8 ${
                isDarkMode ? 'text-white/80' : 'text-black/80'
              }`}>
                {project.research.userResearch}
              </p>
              
              <h3 className="text-2xl font-semibold mb-6" style={{ fontFamily: '"Satoshi", sans-serif', color: textColors.accent(isDarkMode) }}>Competitive Analysis</h3>
              <p className={`text-lg leading-relaxed ${
                isDarkMode ? 'text-white/80' : 'text-black/80'
              }`}>
                {project.research.competitiveAnalysis}
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-6" style={{ fontFamily: '"Satoshi", sans-serif', color: textColors.accent(isDarkMode) }}>Key Insights</h3>
              <ul className="space-y-4">
                {project.research.keyInsights.map((insight, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Target className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-1" />
                    <span className={`text-lg ${
                      isDarkMode ? 'text-white/80' : 'text-black/80'
                    }`}>{insight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {project.research.userPersonas && (
            <div>
              <h3 className="text-2xl font-semibold mb-8 text-center" style={{ fontFamily: '"Satoshi", sans-serif', color: textColors.accent(isDarkMode) }}>User Personas</h3>
              <div className="grid md:grid-cols-2 gap-8">
                {project.research.userPersonas.map((persona, index) => (
                  <div key={index} className={`backdrop-blur-sm rounded-2xl p-6 border ${
                    isDarkMode 
                      ? 'bg-white/10 border-white/10' 
                      : 'bg-black/10 border-black/10'
                  }`}>
                    <h4 className={`text-xl font-semibold mb-3 ${
                      isDarkMode ? 'text-white' : 'text-black'
                    }`} style={{ fontFamily: '"Satoshi", sans-serif' }}>{persona.name}</h4>
                    <p className={`mb-4 ${
                      isDarkMode ? 'text-white/80' : 'text-black/80'
                    }`}>{persona.description}</p>
                    <div>
                      <h5 className="font-medium mb-2 text-red-500" style={{ fontFamily: '"Satoshi", sans-serif' }}>Pain Points:</h5>
                      <ul className="space-y-1">
                        {persona.painPoints.map((point, idx) => (
                          <li key={idx} className={`text-sm font-medium ${
                            isDarkMode ? 'text-white/80' : 'text-black/80'
                          }`} style={{ fontFamily: '"Satoshi", sans-serif' }}>• {point}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Design Process */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-3xl lg:text-4xl font-normal mb-12 text-center ${
            isDarkMode ? 'text-white' : 'text-black'
          }`} style={{ fontFamily: '"Cal Sans", sans-serif' }}>
            Design Process
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4" style={{ fontFamily: '"Satoshi", sans-serif', color: textColors.accent(isDarkMode) }}>Ideation</h3>
                <p className={`text-lg leading-relaxed ${
                  isDarkMode ? 'text-white/80' : 'text-black/80'
                }`}>{project.designProcess.ideation}</p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4" style={{ fontFamily: '"Satoshi", sans-serif', color: textColors.accent(isDarkMode) }}>Wireframing</h3>
                <p className={`text-lg leading-relaxed ${
                  isDarkMode ? 'text-white/80' : 'text-black/80'
                }`}>{project.designProcess.wireframing}</p>
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4" style={{ fontFamily: '"Satoshi", sans-serif', color: textColors.accent(isDarkMode) }}>Prototyping</h3>
                <p className={`text-lg leading-relaxed ${
                  isDarkMode ? 'text-white/80' : 'text-black/80'
                }`}>{project.designProcess.prototyping}</p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4" style={{ fontFamily: '"Satoshi", sans-serif', color: textColors.accent(isDarkMode) }}>Testing</h3>
                <p className={`text-lg leading-relaxed ${
                  isDarkMode ? 'text-white/80' : 'text-black/80'
                }`}>{project.designProcess.testing}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation */}
      <section className={`py-20 px-6 lg:px-8 ${
        isDarkMode ? 'bg-white/5' : 'bg-black/5'
      }`}>
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-3xl lg:text-4xl font-bold mb-12 text-center ${
            isDarkMode ? 'text-white' : 'text-black'
          }`} style={{ fontFamily: '"Satoshi", sans-serif' }}>
            Development & Implementation
          </h2>
          
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-6" style={{ fontFamily: '"Satoshi", sans-serif', color: textColors.accent(isDarkMode) }}>Technical Architecture</h3>
            <p className={`text-lg leading-relaxed max-w-4xl mx-auto text-center ${
              isDarkMode ? 'text-white/80' : 'text-black/80'
            }`} style={{ fontFamily: '"Satoshi", sans-serif' }}>
              {project.implementation.architecture}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {project.implementation.keyFeatures.map((feature, index) => (
              <div key={index} className={`backdrop-blur-sm rounded-2xl p-6 border ${
                isDarkMode 
                  ? 'bg-white/10 border-white/10' 
                  : 'bg-black/10 border-black/10'
              }`}>
                <Code className="w-8 h-8 mb-4" style={{ color: '#00fcd2' }} />
                <h3 className={`text-xl font-semibold mb-3 ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`} style={{ fontFamily: '"Satoshi", sans-serif' }}>{feature.title}</h3>
                <p className={`mb-4 ${
                  isDarkMode ? 'text-white/70' : 'text-black/70'
                }`} style={{ fontFamily: '"Satoshi", sans-serif' }}>{feature.description}</p>
                <p className={`text-sm italic ${
                  isDarkMode ? 'text-white/60' : 'text-black/60'
                }`} style={{ fontFamily: '"Satoshi", sans-serif' }}>{feature.techDetails}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-red-500" style={{ fontFamily: '"Satoshi", sans-serif' }}>Challenges</h3>
              <ul className="space-y-4">
                {project.implementation.challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                    <span className={`text-lg font-medium ${
                      isDarkMode ? 'text-white' : 'text-black'
                    }`} style={{ fontFamily: '"Satoshi", sans-serif' }}>{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-green-500" style={{ fontFamily: '"Satoshi", sans-serif' }}>Solutions</h3>
              <ul className="space-y-4">
                {project.implementation.solutions.map((solution, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                    <span className={`text-lg font-medium ${
                      isDarkMode ? 'text-white' : 'text-black'
                    }`} style={{ fontFamily: '"Satoshi", sans-serif' }}>{solution}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Results & Learnings */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-3xl lg:text-4xl font-bold mb-12 text-center ${
            isDarkMode ? 'text-white' : 'text-black'
          }`} style={{ fontFamily: '"Satoshi", sans-serif' }}>
            Results & Learnings
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {project.outcomes.metrics.map((metric, index) => (
              <div key={index} className={`backdrop-blur-sm rounded-2xl p-6 border text-center ${
                isDarkMode 
                  ? 'bg-white/10 border-white/10' 
                  : 'bg-black/10 border-black/10'
              }`}>
                <div className="text-3xl font-bold mb-2" style={{ fontFamily: '"Satoshi", sans-serif', color: textColors.accent(isDarkMode) }}>{metric.value}</div>
                <div className={`text-lg font-semibold mb-2 ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`} style={{ fontFamily: '"Satoshi", sans-serif' }}>{metric.label}</div>
                <div className={`text-sm ${
                  isDarkMode ? 'text-white/70' : 'text-black/70'
                }`} style={{ fontFamily: '"Satoshi", sans-serif' }}>{metric.description}</div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-16 mb-16">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-green-400" style={{ fontFamily: '"Satoshi", sans-serif' }}>User Feedback</h3>
              <div className="space-y-4">
                {project.outcomes.userFeedback.map((feedback, index) => (
                  <div key={index} className={`rounded-xl p-4 border-l-4 border-green-400 ${
                    isDarkMode ? 'bg-white/5' : 'bg-black/5'
                  }`}>
                    <p className={`italic ${
                      isDarkMode ? 'text-white/80' : 'text-black/80'
                    }`} style={{ fontFamily: '"Satoshi", sans-serif' }}>{feedback}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-purple-400" style={{ fontFamily: '"Satoshi", sans-serif' }}>Key Learnings</h3>
              <ul className="space-y-4">
                {project.outcomes.lessons.map((lesson, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Award className="w-5 h-5 text-purple-400 flex-shrink-0 mt-1" />
                    <span className={`text-lg ${
                      isDarkMode ? 'text-white/80' : 'text-black/80'
                    }`} style={{ fontFamily: '"Satoshi", sans-serif' }}>{lesson}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {project.testimonial && (
            <div className={`backdrop-blur-sm rounded-2xl p-8 border text-center ${
              isDarkMode 
                ? 'bg-white/10 border-white/10' 
                : 'bg-black/10 border-black/10'
            }`}>
              <blockquote className={`text-xl lg:text-2xl mb-6 italic leading-relaxed ${
                isDarkMode ? 'text-white/90' : 'text-black/90'
              }`} style={{ fontFamily: '"Satoshi", sans-serif' }}>
                "{project.testimonial.text}"
              </blockquote>
              <div>
                <div className={`font-semibold ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`} style={{ fontFamily: '"Satoshi", sans-serif' }}>{project.testimonial.author}</div>
                <div className={isDarkMode ? 'text-white/60' : 'text-black/60'} style={{ fontFamily: '"Satoshi", sans-serif' }}>{project.testimonial.position}</div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Tech Stack */}
      <section className={`py-20 px-6 lg:px-8 ${
        isDarkMode ? 'bg-white/5' : 'bg-black/5'
      }`}>
        <div className="max-w-7xl mx-auto text-center">
          <h2 className={`text-3xl lg:text-4xl font-normal mb-12 ${
            isDarkMode ? 'text-white' : 'text-black'
          }`} style={{ fontFamily: '"Cal Sans", sans-serif' }}>
            Technologies Used
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4">
            {project.tech.map((tech) => (
              <span 
                key={tech}
                className={`px-6 py-3 backdrop-blur-sm rounded-lg border text-lg ${
                  isDarkMode 
                    ? 'bg-white/10 border-white/10 text-white' 
                    : 'bg-black/10 border-black/10 text-black'
                }`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-normal mb-12 text-center" style={{ fontFamily: '"Cal Sans", sans-serif' }}>
            Project Gallery
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.gallery.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${project.title} screenshot ${index + 1}`}
                className="w-full h-64 object-cover rounded-xl"
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className={`text-3xl lg:text-4xl font-bold mb-6 ${
            isDarkMode ? 'text-white' : 'text-black'
          }`} style={{ fontFamily: '"Satoshi", sans-serif' }}>
            Interested in Similar Work?
          </h2>
          <p className={`text-xl mb-8 ${
            isDarkMode ? 'text-white/70' : 'text-black/70'
          }`} style={{ fontFamily: '"Satoshi", sans-serif' }}>
            Let's discuss how I can help bring your project to life
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="inline-flex items-center justify-center px-8 text-lg h-[54px] rounded-lg border-0 shadow-xl group text-black"
              style={{ backgroundColor: '#00fcd2' }}
              onClick={() => navigate('/#contact')}
            >
              <span>Get In Touch</span>
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button
              size="lg"
              className="text-lg px-8 h-[54px] rounded-lg font-medium transition-all duration-300 border-0"
              style={{
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
              onClick={() => navigate('/')}
            >
              <span style={{ fontFamily: '"Satoshi", sans-serif' }}>View More Projects</span>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}