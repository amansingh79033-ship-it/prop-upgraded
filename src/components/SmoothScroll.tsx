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
        // Prevent smooth scroll on elements with data-lenis-prevent
        if (node.hasAttribute('data-lenis-prevent')) {
          return true;
        }
        // Prevent on interactive elements
        if (node.tagName === 'BUTTON' || node.tagName === 'INPUT' || node.tagName === 'TEXTAREA') {
          return false;
        }
        // Allow scroll on modals and overlays
        if (node.closest('[data-modal]') || node.closest('[data-overlay]')) {
          return true;
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
        e.preventDefault();
        const href = anchor.getAttribute('href');
        if (href && href !== '#') {
          const element = document.querySelector(href);
          if (element) {
            lenis.scrollTo(element as HTMLElement, {
              offset: -80, // Account for navbar
              duration: 1.2,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
          }
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
