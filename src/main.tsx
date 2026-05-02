import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { preloadCriticalImages } from './utils/preloadImages';

// Preload critical assets immediately
preloadCriticalImages();

// Performance optimizations for faster FCP & LCP
const root = ReactDOM.createRoot(document.getElementById('root')!);

// Immediate render with concurrent features
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Defer non-critical work until after page load
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  // Register SW after critical resources loaded
  window.addEventListener('load', () => {
    requestIdleCallback(() => {
      navigator.serviceWorker.register('/sw.js')
        .catch(() => {});
    });
  });
}

// Preconnect to important origins early
if ('connection' in navigator) {
  const preloadLinks = [
    { href: 'https://fonts.googleapis.com', rel: 'preconnect' },
    { href: 'https://fonts.gstatic.com', rel: 'preconnect', crossorigin: '' }
  ];
  
  preloadLinks.forEach(link => {
    const linkElement = document.createElement('link');
    linkElement.rel = link.rel;
    linkElement.href = link.href;
    if (link.crossorigin) linkElement.crossOrigin = link.crossorigin;
    document.head.appendChild(linkElement);
  });
}

// Performance: Monitor and optimize image loading globally
if (import.meta.env.DEV) {
  // Track image loading performance in development
  const imageObserver = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeName === 'IMG') {
          const img = node as HTMLImageElement;
          const startTime = performance.now();
          
          img.addEventListener('load', () => {
            const loadTime = performance.now() - startTime;
            console.log(`🖼️ Image loaded: ${img.src.substring(0, 50)}... (${Math.round(loadTime)}ms)`);
          });
          
          img.addEventListener('error', () => {
            console.warn(`❌ Failed to load image: ${img.src}`);
          });
        }
      });
    });
  });
  
  imageObserver.observe(document.body, { childList: true, subtree: true });
}

// Global image loading optimization
document.addEventListener('DOMContentLoaded', () => {
  // Add smooth loading class to all images
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.classList.add('smooth-loading');
  });
});
