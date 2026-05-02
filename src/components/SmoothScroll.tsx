import { useEffect } from 'react';
import Lenis from 'lenis';

interface SmoothScrollProps {
  children: React.ReactNode;
}

export const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  useEffect(() => {
    // Initialize Lenis smooth scroll with optimized settings
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
      prevent: (node: HTMLElement) => {
        // Prevent smooth scroll on elements with data-lenis-prevent or within modals
        if (
          node.closest('[data-lenis-prevent]') || 
          node.closest('[data-modal]') || 
          node.closest('[data-overlay]') ||
          node.closest('.custom-scrollbar')
        ) {
          return true;
        }
        
        // Prevent on interactive elements
        if (node.tagName === 'BUTTON' || node.tagName === 'INPUT' || node.tagName === 'TEXTAREA') {
          return false;
        }
        
        return false;
      },
    });

    // RAF loop for smooth scroll
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Handle anchor links with smooth scroll
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href !== '#') {
          const element = document.querySelector(href);
          if (element) {
            e.preventDefault();
            lenis.scrollTo(element as HTMLElement, {
              offset: -80, // Account for navbar
              duration: 1.2,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
          }
          // If element doesn't exist, let the default hash change happen for routing
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // Cleanup
    return () => {
      lenis.destroy();
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
