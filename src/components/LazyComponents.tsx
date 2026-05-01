import { lazy } from 'react';

// Lazy load heavy components for better initial load time
export const LazyHero = lazy(() => import('../sections/Hero'));
export const LazyLocations = lazy(() => import('../sections/Locations'));
export const LazyPropertySearch = lazy(() => import('../sections/PropertySearch'));
