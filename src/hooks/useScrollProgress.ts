import { useState, useEffect, useRef, useCallback } from 'react';

export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const lastScrollRef = useRef(0);

  const updateProgress = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = docHeight > 0 ? scrollTop / docHeight : 0;
    
    // Only update state if progress changed significantly
    if (Math.abs(scrollProgress - lastScrollRef.current) > 0.001) {
      lastScrollRef.current = scrollProgress;
      setProgress(scrollProgress);
    }
    
    rafRef.current = null;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(updateProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateProgress]);

  return progress;
};

export default useScrollProgress;
