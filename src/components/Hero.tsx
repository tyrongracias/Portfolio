import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-headline', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      gsap.from('.hero-subtitle', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out',
      });

      gsap.from('.hero-cta', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.6,
        ease: 'power3.out',
      });

      gsap.from('.hero-avatar', {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.9,
        ease: 'back.out(1.7)',
      });

      // Floating animation for avatars
      gsap.to('.hero-avatar', {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
          each: 0.2,
          from: 'random',
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-muted pt-20"
    >
      {/* Geometric particles background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="hero-headline text-4xl sm:text-6xl lg:text-h1 font-semibold text-foreground mb-6 leading-tight">
          Join the Creator Economy
        </h1>
        <p className="hero-subtitle text-large sm:text-h4 text-muted-foreground max-w-2xl mx-auto mb-12">
          Build your community, monetize your content, and own your audience forever with blockchain-powered creator tokens.
        </p>
        <div className="hero-cta">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary-hover rounded-button h-14 px-8 text-body font-normal"
            onClick={() => navigate('/profile/1')}
          >
            Create Your Channel
          </Button>
        </div>

        {/* Floating avatars */}
        <div className="mt-20 flex justify-center items-center gap-4 flex-wrap">
          <div className="hero-avatar w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-primary to-secondary-accent shadow-lg"></div>
          <div className="hero-avatar w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-success to-info shadow-lg"></div>
          <div className="hero-avatar w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-warning to-error shadow-lg"></div>
          <div className="hero-avatar w-14 h-14 sm:w-18 sm:h-18 rounded-full bg-gradient-to-br from-info to-primary shadow-lg"></div>
          <div className="hero-avatar w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-secondary-accent to-success shadow-lg"></div>
        </div>
      </div>
    </section>
  );
}
