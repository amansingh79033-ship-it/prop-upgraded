import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchBar, ContactModal, OptimizedImage } from '../components';
import { Sparkles, Loader2, ArrowRight, Phone, MessageCircle, LineChart, MapPin, TrendingUp } from 'lucide-react';
import { useAIPropertySearch } from '../hooks/useAIPropertySearch';
import { PropertyDetailsModal } from '../components/PropertyDetailsModal';
import { properties, type Property } from '../data/properties';

export const Hero: React.FC = () => {
  const { searchProperties, loading, results, explanation } = useAIPropertySearch();
  const [isSearched, setIsSearched] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [rotationIndex, setRotationIndex] = useState(0);
  const [showContactModal, setShowContactModal] = useState(false);

  // Rotation effect: 3 seconds
  useEffect(() => {
    if (isSearched) return;
    const interval = setInterval(() => {
      setRotationIndex((prev) => (prev + 1) % properties.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isSearched]);

  const featuredProperty = properties[rotationIndex];

  const handleSearch = async (query: string) => {
    setIsSearched(true);
    await searchProperties(query);
  };


  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden blueprint-grid"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[#030308]" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-coral-accent/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-20 sm:py-28 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[600px] lg:min-h-[700px]">
          <div className="text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex flex-wrap items-center gap-3 mb-8 sm:mb-12"
            >
              <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 border border-blue-400/30 rounded-full bg-blue-500/10 backdrop-blur-sm">
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-blue-400 animate-pulse shadow-[0_0_10px_rgba(96,165,250,0.5)]" />
                <span className="text-[9px] sm:text-[10px] font-bold tracking-widest uppercase text-blue-100">
                  Propsync Powered
                </span>
              </div>

              {/* Brand Tagline */}
              <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 border border-purple-400/30 rounded-full bg-purple-500/10 backdrop-blur-sm">
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-purple-400" />
                <span className="text-[9px] sm:text-[10px] font-bold tracking-widest uppercase text-purple-200 whitespace-nowrap">
                  A Q-Re-Us-Minds Dev
                </span>
              </div>

              {/* Propsync Live Toggle */}
              <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 border border-orange-400/30 rounded-full bg-orange-500/5 backdrop-blur-sm group cursor-pointer hover:bg-orange-500/10 transition-all">
                <LineChart className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-orange-400" />
                <span className="text-[9px] sm:text-[10px] font-bold tracking-widest uppercase text-orange-200 whitespace-nowrap">Live Market Feed</span>
                <div className="w-6 sm:w-8 h-3 sm:h-4 rounded-full bg-white/10 relative shrink-0">
                   <div className="absolute top-0.5 sm:top-1 left-0.5 sm:left-1 w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-orange-400 animate-pulse" />
                </div>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[65px] xl:text-[85px] font-bold text-white mb-6 sm:mb-8 leading-[0.9] tracking-tighter uppercase"
            >
              Find Your
              <br />
              Perfect Home
            </motion.h1>

            {/* Subheadline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg lg:text-xl text-white/80 max-w-2xl mb-8 sm:mb-10 lg:mb-12 font-medium leading-relaxed px-1"
            >
              Direct access to Bengaluru's top projects—verified, compared, and explained.{' '}
              <span className="text-[#ff4d2e]">No more advocates required!</span>
            </motion.div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mb-8"
            >
              <div className="w-full max-w-2xl mx-auto px-4">
                <SearchBar
                  onSearch={handleSearch}
                />
              </div>
            </motion.div>

            {/* Call to Action - Similar to Why Choose Us */}
            {!isSearched && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mb-8"
              >
                <div className="flex items-center justify-center gap-3">
                  {/* Phone Button - Direct Call */}
                  <motion.a
                    href="tel:+917970750727"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative w-12 h-12 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center shadow-lg transition-all group"
                  >
                    <Phone className="w-5 h-5 text-white" />
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
                      Call Now
                    </span>
                  </motion.a>

                  {/* WhatsApp Button - Opens Modal */}
                  <motion.button
                    onClick={() => setShowContactModal(true)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative w-12 h-12 bg-green-600 hover:bg-green-500 rounded-full flex items-center justify-center shadow-lg transition-all group"
                  >
                    <MessageCircle className="w-5 h-5 text-white" />
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-green-600 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
                      Chat on WhatsApp
                    </span>
                  </motion.button>
                </div>
                <p className="text-center text-gray-600 text-xs sm:text-sm mt-3">
                  Yes with a human! Available 24/7
                </p>
                
                {/* Brand Tagline */}
                <div className="flex justify-center mt-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 border border-purple-400/30 rounded-full bg-purple-500/10 backdrop-blur-sm">
                    <Sparkles className="w-3 h-3 text-purple-400" />
                    <span className="text-[10px] font-bold tracking-widest uppercase text-purple-600 whitespace-nowrap">
                      A Q-Re-Us-Minds Dev
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Search Results */}
            <AnimatePresence mode="wait">
              {isSearched && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full mt-8"
                >
                  {loading ? (
                    <div className="flex flex-col items-center justify-center py-12 space-y-4">
                      <Loader2 className="w-10 h-10 text-white animate-spin" />
                      <p className="text-white/70 font-medium animate-pulse">
                        AI is analyzing properties for you...
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      {explanation && (
                        <motion.div 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-start gap-3 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-left"
                        >
                          <div className="p-2 rounded-lg bg-purple-500/20 shrink-0">
                            <Sparkles className="w-5 h-5 text-purple-300" />
                          </div>
                          <p className="text-white/90 text-sm sm:text-base leading-relaxed line-clamp-2">
                            {explanation}
                          </p>
                        </motion.div>
                      )}
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {results.map((property) => (
                          <motion.div
                            key={property.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden group hover:border-white/30 transition-all duration-300 cursor-pointer"
                            onClick={() => setSelectedProperty(property)}
                          >
                            <div className="relative h-40 sm:h-48 overflow-hidden">
                              <OptimizedImage 
                                src={property.image} 
                                alt={property.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                            </div>
                            <div className="p-4 text-left space-y-3">
                              <div className="flex justify-between items-start">
                                <h3 className="text-white font-bold text-lg truncate pr-2">{property.title}</h3>
                                <span className="text-green-400 font-bold whitespace-nowrap">{property.price}</span>
                              </div>
                              
                              <div className="flex items-center gap-1 text-white/60 text-xs">
                                <MapPin className="w-3 h-3 shrink-0" />
                                <span className="truncate">{property.location}</span>
                              </div>
                              
                              {/* Relevance Reasons - Tooltips */}
                              <div className="flex flex-wrap gap-1.5 pt-2">
                                {property.relevanceReasons.slice(0, 2).map((reason, idx) => (
                                  <div 
                                    key={idx}
                                    className="group/reason relative"
                                  >
                                    <div className="px-2 py-1 bg-purple-500/20 border border-purple-400/30 rounded-md text-[9px] text-purple-200 flex items-center gap-1 cursor-help">
                                      <span>{reason.icon}</span>
                                      <span className="font-medium">{reason.text.split(' ').slice(0, 2).join(' ')}</span>
                                    </div>
                                    {/* Tooltip */}
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-black/95 backdrop-blur-sm border border-white/10 rounded-lg text-xs text-white whitespace-nowrap opacity-0 invisible group-hover/reason:opacity-100 group-hover/reason:visible transition-all z-50 pointer-events-none shadow-xl">
                                      {reason.text}
                                      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 bg-black/95 rotate-45 border-r border-b border-white/10" />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Featured Property Card (on the right) */}
          {!isSearched && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden lg:flex h-full items-center justify-end"
            >
              <AnimatePresence mode="wait">
                <motion.div 
                  key={featuredProperty.id}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.1, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-editorial-ivory rounded-3xl overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] w-full max-w-[440px] ring-1 ring-white/10 cursor-pointer hover:shadow-2xl transition-shadow"
                  onClick={() => setSelectedProperty(featuredProperty)}
                >
                  <div className="relative h-[240px] shrink-0">
                    <OptimizedImage 
                      src={featuredProperty.image}
                      alt={featuredProperty.title}
                      className="w-full h-full object-cover"
                      priority={true}
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-orange-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-sm whitespace-nowrap">
                      {featuredProperty.tag}
                    </div>
                    {featuredProperty.isUndervalued && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-green-500/90 backdrop-blur-md text-white text-[10px] font-bold flex items-center gap-1.5 rounded-sm whitespace-nowrap">
                        <TrendingUp className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{featuredProperty.roi} UNDERVALUED</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4 gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-gray-900 mb-0.5 truncate">{featuredProperty.title}</h3>
                        <p className="text-gray-500 text-xs font-medium truncate">{featuredProperty.location}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-xl font-black text-blue-600 mb-0.5 whitespace-nowrap">{featuredProperty.price}</div>
                        <p className="text-gray-400 text-[10px] font-bold whitespace-nowrap">Priority Developer</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 mb-6 text-gray-400 text-xs font-semibold flex-wrap">
                      <span className="text-gray-900 whitespace-nowrap">{featuredProperty.beds} BHK</span>
                      <span className="w-1 h-1 rounded-full bg-gray-300 shrink-0" />
                      <span className="whitespace-nowrap">{featuredProperty.sqft.toLocaleString()} sqft</span>
                      <span className="w-1 h-1 rounded-full bg-gray-300 shrink-0" />
                      <span className="text-blue-500 bg-blue-50 px-2 py-0.5 rounded text-[9px] font-bold uppercase whitespace-nowrap max-w-[150px] truncate">
                        {featuredProperty.developer}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs font-bold text-gray-400 group">
                      <span className="truncate">Explore Project Details</span>
                      <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#030308] to-transparent" />
      
      {/* In-Depth Details Modal */}
      {selectedProperty && (
        <PropertyDetailsModal 
          property={selectedProperty} 
          onClose={() => setSelectedProperty(null)} 
        />
      )}
      {/* Contact Modal */}
      <ContactModal isOpen={showContactModal} onClose={() => setShowContactModal(false)} />
    </section>
  );
};

export default Hero;
