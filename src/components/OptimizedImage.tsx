import { useState, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
}

/**
 * OptimizedImage Component with smooth loading
 * Features:
 * - Lazy loading with native browser support
 * - Smooth fade-in animation on load
 * - Placeholder background while loading
 * - Priority loading for above-the-fold images
 * - Prevents layout shift with aspect ratio
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  priority = false,
  width,
  height,
  sizes
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Preload priority images
  useEffect(() => {
    if (priority) {
      const img = new Image();
      img.src = src;
      img.onload = () => setIsLoaded(true);
      img.onerror = () => {
        setError(true);
        setIsLoaded(true);
      };
    }
  }, [priority, src]);

  if (error) {
    // Fallback placeholder
    return (
      <div 
        className={`${className} bg-gray-800 flex items-center justify-center`}
        style={{ 
          aspectRatio: width && height ? `${width}/${height}` : '16/9',
          minHeight: '200px'
        }}
      >
        <span className="text-white/50 text-sm">Failed to load image</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`${className} ${isLoaded ? 'loaded' : ''}`}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      width={width}
      height={height}
      sizes={sizes}
      onLoad={() => setIsLoaded(true)}
      onError={() => {
        setError(true);
        setIsLoaded(true);
      }}
      style={{
        opacity: priority || isLoaded ? 1 : 0,
        transition: 'opacity 0.4s ease-out'
      }}
    />
  );
};

/**
 * ResponsiveImage Component with srcset support
 * Automatically selects best image size based on viewport
 */
export const ResponsiveImage: React.FC<OptimizedImageProps & { srcSet?: string }> = ({
  src,
  alt,
  className = '',
  priority = false,
  srcSet,
  sizes = '(max-width: 768px) 100vw, 50vw'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      className={`${className} ${isLoaded ? 'loaded' : ''}`}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      onLoad={() => setIsLoaded(true)}
      style={{
        opacity: priority || isLoaded ? 1 : 0,
        transition: 'opacity 0.4s ease-out'
      }}
    />
  );
};

/**
 * ImageWithPlaceholder - Advanced component with blur-up effect
 */
export const ImageWithPlaceholder: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  priority = false
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ aspectRatio: '16/9' }}>
      {/* Placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse" />
      )}
      
      {/* Actual Image */}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setError(true);
          setIsLoaded(true);
        }}
      />
      
      {/* Error State */}
      {error && (
        <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
          <span className="text-white/50 text-sm">Failed to load</span>
        </div>
      )}
    </div>
  );
};
