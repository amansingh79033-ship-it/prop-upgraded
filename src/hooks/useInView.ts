import { useEffect, useRef, useState, useCallback } from 'react';

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useInView = (options: UseInViewOptions = {}) => {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options;
  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const hasTriggered = useRef(false);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      
      if (entry.isIntersecting) {
        setIsInView(true);
        if (triggerOnce) {
          hasTriggered.current = true;
        }
      } else if (!triggerOnce && !hasTriggered.current) {
        setIsInView(false);
      }
    },
    [triggerOnce]
  );

  useEffect(() => {
    const element = ref.current;
    if (!element || (triggerOnce && hasTriggered.current)) return;

    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, handleIntersection]);

  return { ref, isInView };
};

export default useInView;
