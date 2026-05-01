import { useEffect } from 'react';

/**
 * useModalScrollLock Hook
 * 
 * Locks body scroll when modal is open and enables scroll inside modal
 * Handles both desktop and mobile scroll behavior
 * 
 * Usage:
 * ```tsx
 * export const MyModal = () => {
 *   useModalScrollLock();
 *   // ... rest of component
 * }
 * ```
 */
export const useModalScrollLock = () => {
  useEffect(() => {
    // Store original overflow value
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    
    // Lock body scroll
    document.body.style.overflow = 'hidden';
    
    // Prevent layout shift by compensating for scrollbar width
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, []);
};

/**
 * useModalKeyboardNavigation Hook
 * 
 * Adds ESC key handler to close modal
 * 
 * Usage:
 * ```tsx
 * export const MyModal = ({ onClose }) => {
 *   useModalKeyboardNavigation(onClose);
 *   // ... rest of component
 * }
 * ```
 */
export const useModalKeyboardNavigation = (onClose: () => void) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);
};
