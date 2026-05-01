import { useState, useEffect } from 'react';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

/**
 * ResponsiveImage Component
 * 
 * Automatically serves optimized WebP/AVIF images with fallbacks
 * Supports lazy loading and responsive breakpoints
 * 
 * Usage:
 * <ResponsiveImage 
 *   src="/images/hero-interior"
 *   alt="Hero"
 *   sizes="(max-width: 768px) 100vw, 50vw"
 * />
 */
export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  className = '',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
}) => {
  const [supportsWebP, setSupportsWebP] = useState(true);
  const [supportsAVIF, setSupportsAVIF] = useState(false);

  useEffect(() => {
    // Check browser support
    const canvas = document.createElement('canvas');
    
    // Check WebP support
    if (canvas.toDataURL('image/webp').indexOf('webp') === -1) {
      setSupportsWebP(false);
    }

    // Check AVIF support
    if (canvas.toDataURL('image/avif').indexOf('avif') !== -1) {
      setSupportsAVIF(true);
    }
  }, []);

  const getSrcSet = (format: string) => {
    const widths = [320, 640, 768, 1024, 1440, 1920];
    return widths
      .filter(w => w <= 1920) // Max width
      .map(w => `${src}-${w}w.${format} ${w}w`)
      .join(', ');
  };

  return (
    <picture>
      {/* AVIF version (best compression) */}
      {supportsAVIF && (
        <source
          srcSet={getSrcSet('avif')}
          type="image/avif"
        />
      )}
      
      {/* WebP version (good compression) */}
      {supportsWebP && (
        <source
          srcSet={getSrcSet('webp')}
          type="image/webp"
        />
      )}
      
      {/* JPEG fallback */}
      <img
        src={`${src}-1920w.jpg`}
        srcSet={getSrcSet('jpg')}
        sizes={sizes}
        alt={alt}
        className={className}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
      />
    </picture>
  );
};

/**
 * OptimizedImage Component (Simpler version)
 * For when you just need basic optimization
 */
export const OptimizedImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  className = '',
  priority = false
}) => {
  return (
    <img
      src={`${src}.avif`}
      alt={alt}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      onError={(e) => {
        // Fallback to WebP
        const target = e.target as HTMLImageElement;
        target.src = `${src}.webp`;
        target.onerror = () => {
          // Final fallback to JPEG
          target.src = `${src}.jpg`;
        };
      }}
    />
  );
};
