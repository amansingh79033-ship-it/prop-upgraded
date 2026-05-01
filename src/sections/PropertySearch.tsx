import { useState } from 'react';
import { motion } from 'framer-motion';
import { AnimatedSection } from '../components/AnimatedSection';
import { MapPin, Bed, Bath, Square, Heart, ArrowRight } from 'lucide-react';

import { properties, Property } from '../data/properties';
import { PropertyDetailsModal } from '../components/PropertyDetailsModal';

export const PropertySearch: React.FC = () => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  return (
    <section id="properties" className="py-20 lg:py-32 bg-editorial-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-12 lg:mb-16">
          <span className="label-mono text-blueprint-blue mb-4 block">
            Featured Properties
          </span>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-text-primary mb-3 px-4">
            Discover Your Perfect Home
          </h2>
          <p className="text-text-secondary text-base sm:text-lg max-w-2xl mx-auto px-4 leading-relaxed">
            Browse through our curated selection of premium properties 
            handpicked for their exceptional value and location.
          </p>
        </AnimatedSection>

        {/* Property Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {properties.map((property, index) => (
            <AnimatedSection key={property.id} delay={index * 0.1}>
              <motion.div
                className="property-card group cursor-pointer h-full flex flex-col"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedProperty(property)}
              >
                {/* Image */}
                <div className="property-card-image relative shrink-0">
                  <img
                    src={property.image}
                    alt={property.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  {/* Tag */}
                  <span className="absolute top-3 left-3 sm:top-4 sm:left-4 px-2.5 py-1 sm:px-3 sm:py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] sm:text-xs font-semibold text-text-primary whitespace-normal max-w-[70%]">
                    {property.tag}
                  </span>
                  {/* Favorite Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(property.id);
                    }}
                    className={`absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full transition-all ${
                      favorites.includes(property.id)
                        ? 'bg-coral-accent text-white'
                        : 'bg-white/90 backdrop-blur-sm text-gray-600 hover:text-coral-accent'
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        favorites.includes(property.id) ? 'fill-current' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-2 gap-2">
                    <h3 className="font-display text-base sm:text-lg font-semibold text-text-primary group-hover:text-blueprint-blue transition-colors line-clamp-2 flex-1">
                      {property.title}
                    </h3>
                    <span className="text-coral-accent font-bold text-sm sm:text-base whitespace-nowrap shrink-0">
                      {property.price}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-text-secondary text-xs sm:text-sm mb-3 sm:mb-4">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                    <span className="line-clamp-1">{property.location}</span>
                  </div>

                  {/* Features */}
                  <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-text-secondary pt-3 sm:pt-4 border-t border-gray-100 mt-auto">
                    <div className="flex items-center gap-1 min-w-0">
                      <Bed className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                      <span className="truncate">{property.beds} Beds</span>
                    </div>
                    <div className="flex items-center gap-1 min-w-0">
                      <Bath className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                      <span className="truncate">{property.baths} Baths</span>
                    </div>
                    <div className="flex items-center gap-1 min-w-0">
                      <Square className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                      <span className="truncate">{property.sqft.toLocaleString()} sqft</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* View All Button */}
        <AnimatedSection delay={0.4} className="text-center mt-12">
          <motion.button
            className="btn-coral inline-flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View All Properties
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </AnimatedSection>
      </div>
      {/* In-Depth Details Modal */}
      {selectedProperty && (
        <PropertyDetailsModal 
          property={selectedProperty} 
          onClose={() => setSelectedProperty(null)} 
        />
      )}
    </section>
  );
};

export default PropertySearch;
