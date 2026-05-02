import { properties } from '../data/properties';

export const preloadCriticalImages = () => {
  // Preload first 3 property images + Hero images
  const criticalImages = [
    '/images/hero-interior.jpg',
    '/images/spotlight-exterior.jpg',
    ...properties.slice(0, 3).map(p => p.image)
  ];

  criticalImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });
};
