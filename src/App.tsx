import { useState, useEffect, Suspense, lazy } from 'react';
import { SmoothScroll } from './components/SmoothScroll';
import { ScrollToTop } from './components/ScrollToTop';
import {
  NotchNavbar,
  Hero,
  Partners,
  PropertySearch,
  Locations,
  Features,
  Contact,
  Footer,
} from './sections';

// Lazy load heavy sections
const Propsync = lazy(() => import('./sections/Propsync'));

// Lazy load ALL pages for better code splitting
const AboutPage = lazy(() => import('./pages/AboutPage').then(module => ({ default: module.AboutPage })));
const CareersPage = lazy(() => import('./pages/CareersPage').then(module => ({ default: module.CareersPage })));
const PressPage = lazy(() => import('./pages/PressPage').then(module => ({ default: module.PressPage })));
const BlogPage = lazy(() => import('./pages/BlogPage').then(module => ({ default: module.BlogPage })));
const BuyPage = lazy(() => import('./pages/BuyPage').then(module => ({ default: module.BuyPage })));
const RentPage = lazy(() => import('./pages/RentPage').then(module => ({ default: module.RentPage })));
const SellPage = lazy(() => import('./pages/SellPage').then(module => ({ default: module.SellPage })));
const ValuationPage = lazy(() => import('./pages/ValuationPage').then(module => ({ default: module.ValuationPage })));
const HelpCenterPage = lazy(() => import('./pages/HelpCenterPage').then(module => ({ default: module.HelpCenterPage })));
const ContactUsPage = lazy(() => import('./pages/ContactUsPage').then(module => ({ default: module.ContactUsPage })));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage').then(module => ({ default: module.PrivacyPolicyPage })));
const TermsOfServicePage = lazy(() => import('./pages/TermsOfServicePage').then(module => ({ default: module.TermsOfServicePage })));

// Loading fallback component - simplified for faster render
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-editorial-ivory">
    <div className="w-16 h-16 border-4 border-blueprint-blue border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    return typeof window !== 'undefined' ? window.location.hash.slice(1) || 'home' : 'home';
  });

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(window.location.hash.slice(1) || 'home');
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <AboutPage />;
      case 'careers':
        return <CareersPage />;
      case 'press':
        return <PressPage />;
      case 'blog':
        return <BlogPage />;
      case 'buy':
        return <BuyPage />;
      case 'rent':
        return <RentPage />;
      case 'sell':
        return <SellPage />;
      case 'valuation':
        return <ValuationPage />;
      case 'help':
        return <HelpCenterPage />;
      case 'contact-us':
        return <ContactUsPage />;
      case 'privacy':
        return <PrivacyPolicyPage />;
      case 'terms':
        return <TermsOfServicePage />;
      default:
        return (
          <>
            <NotchNavbar />
            <main>
              <Hero />
              <Suspense fallback={
                <div className="py-20 flex items-center justify-center">
                  <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              }>
                <Propsync />
              </Suspense>
              <Partners />
              <PropertySearch />
              <Locations />
              <Features />
              <Contact />
            </main>
            <Footer />
          </>
        );
    }
  };

  return (
    <SmoothScroll>
      <div className="relative">
        <Suspense fallback={<LoadingFallback />}>
          {renderPage()}
          <ScrollToTop />
        </Suspense>
      </div>
    </SmoothScroll>
  );
}

export default App;
