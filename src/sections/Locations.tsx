import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedSection } from '../components/AnimatedSection';
import { 
  ArrowUpRight, 
  Building, 
  MapPin, 
  TrendingUp, 
  Bus, 
  School, 
  ShoppingBag,
  Trees,
  X
} from 'lucide-react';
import { useModalScrollLock, useModalKeyboardNavigation } from '../hooks/useModalScrollLock';

interface LocationData {
  id: number;
  name: string;
  properties: number;
  image: string;
  description: string;
  priceRange: string;
  avgPricePerSqft: string;
  roi: string;
  benefits: string[];
  connectivity: string[];
  nearbyPlaces: { type: string; name: string; distance: string }[];
  partnerProjects: { name: string; developer: string; status: 'Latest' | 'Upcoming' | 'Ready' }[];
  highlights: string[];
}

const locations: LocationData[] = [
  {
    id: 1,
    name: 'Devanahalli',
    properties: 342,
    image: '/images/neighborhood-lake.jpg',
    description: "North Bangalore\'s fastest-growing hub near KIA Airport",
    priceRange: '₹60 L - ₹3.5 Cr',
    avgPricePerSqft: '₹7,400 - ₹13,500/sqft',
    roi: '14.8%',
    benefits: [
      'Proximity to KIA Airport (12 mins)',
      'Emerging investment hotspot',
      'Large township developments',
      'Excellent social infrastructure',
      'High appreciation potential'
    ],
    connectivity: [
      'NH 44 - Direct highway access',
      'Airport Road - 5 mins',
      'Hebbal - 25 mins',
      'Manyata Tech Park - 20 mins',
      'Upcoming Metro Phase 3'
    ],
    nearbyPlaces: [
      { type: 'Airport', name: 'KIA International Airport', distance: '12 km' },
      { type: 'Tech Park', name: 'Aerospace SEZ', distance: '5 km' },
      { type: 'Education', name: 'CMR University', distance: '8 km' },
      { type: 'Healthcare', name: 'Columbia Asia Hospital', distance: '10 km' },
      { type: 'Retail', name: 'Elements Mall', distance: '12 km' }
    ],
    partnerProjects: [
      { name: 'Embassy Greenshore', developer: 'Embassy Group', status: 'Latest' },
      { name: 'Godrej Ananda', developer: 'Godrej Properties', status: 'Upcoming' },
      { name: 'Brigade Horizon', developer: 'Brigade Group', status: 'Ready' }
    ],
    highlights: [
      '288-acre Embassy Springs township',
      'Aerospace Park proximity',
      'Budget-friendly options available',
      '15% YoY appreciation'
    ]
  },
  {
    id: 2,
    name: 'Whitefield',
    properties: 189,
    image: '/images/amenities-park.jpg',
    description: 'IT hub with modern homes and excellent connectivity',
    priceRange: '₹85 L - ₹4.2 Cr',
    avgPricePerSqft: '₹8,200 - ₹14,500/sqft',
    roi: '12.4%',
    benefits: [
      'Major IT corridor',
      'Metro connectivity',
      'Premium social infrastructure',
      'International schools nearby',
      'Established residential area'
    ],
    connectivity: [
      'Whitefield Main Road',
      'ORR - Outer Ring Road',
      'ITPL - 5 mins',
      'KR Puram - 15 mins',
      'Blue Line Metro operational'
    ],
    nearbyPlaces: [
      { type: 'Tech Park', name: 'ITPL', distance: '3 km' },
      { type: 'Mall', name: 'Phoenix Marketcity', distance: '5 km' },
      { type: 'Education', name: 'Delhi Public School', distance: '4 km' },
      { type: 'Healthcare', name: 'Apollo Hospital', distance: '6 km' },
      { type: 'Railway', name: 'Whitefield Station', distance: '4 km' }
    ],
    partnerProjects: [
      { name: 'Assetz Bloom & Dell', developer: 'Assetz Property', status: 'Latest' },
      { name: 'Godrej Woodscapes', developer: 'Godrej Properties', status: 'Upcoming' }
    ],
    highlights: [
      'Sustainable living communities',
      'Carbon healing homes',
      'Solar power integration',
      '10% ROI potential'
    ]
  },
  {
    id: 3,
    name: 'Hennur Road',
    properties: 278,
    image: '/images/lifestyle-lake.jpg',
    description: 'Premium residential corridor with luxury developments',
    priceRange: '₹95 L - ₹3.8 Cr',
    avgPricePerSqft: '₹8,900 - ₹15,200/sqft',
    roi: '13.2%',
    benefits: [
      'Close to Manyata Tech Park',
      'Wide roads & planned layout',
      'Premium housing societies',
      'Green surroundings',
      'Strong rental demand'
    ],
    connectivity: [
      'Hennur Main Road',
      'Outer Ring Road - 10 mins',
      'Manyata Tech Park - 15 mins',
      'Hebbal - 20 mins',
      'Future Metro connectivity'
    ],
    nearbyPlaces: [
      { type: 'Tech Park', name: 'Manyata Tech Park', distance: '8 km' },
      { type: 'School', name: 'National Public School', distance: '3 km' },
      { type: 'Hospital', name: 'Manipal Hospital', distance: '12 km' },
      { type: 'Mall', name: 'Horizon Mall', distance: '6 km' },
      { type: 'Park', name: 'Hennur Lake', distance: '2 km' }
    ],
    partnerProjects: [
      { name: 'Purva Northern Lights', developer: 'Purvankara', status: 'Latest' },
      { name: 'Purva Codename Hennur', developer: 'Purvankara', status: 'Upcoming' }
    ],
    highlights: [
      'WorldHome Collection by Puravankara',
      'Meditation centers & sports arenas',
      'Infinity pools & sky decks',
      '13.2% average ROI'
    ]
  },
  {
    id: 4,
    name: 'Hebbal',
    properties: 156,
    image: '/images/spotlight-exterior.jpg',
    description: 'Upscale urban living with excellent city connect',
    priceRange: '₹1.2 Cr - ₹5.5 Cr',
    avgPricePerSqft: '₹10,500 - ₹18,000/sqft',
    roi: '11.8%',
    benefits: [
      'Central location',
      'Lake view properties',
      'Premium neighborhoods',
      'Quick airport access',
      'Established infrastructure'
    ],
    connectivity: [
      'Hebbal Flyover - ORR connector',
      'Bangalore Palace - 15 mins',
      'Airport - 35 mins',
      'MG Road - 20 mins',
      'Multiple bus routes'
    ],
    nearbyPlaces: [
      { type: 'Lake', name: 'Hebbal Lake', distance: '2 km' },
      { type: 'Mall', name: 'Mantri Square Mall', distance: '8 km' },
      { type: 'Hospital', name: 'Fortis Hospital', distance: '10 km' },
      { type: 'School', name: 'Vidyashilp Academy', distance: '6 km' },
      { type: 'Tech Park', name: 'RMZ Galleria', distance: '5 km' }
    ],
    partnerProjects: [
      { name: 'Lodha Mirabelle', developer: 'Lodha Group', status: 'Latest' },
      { name: 'Brigade Insignia', developer: 'Brigade Group', status: 'Ready' }
    ],
    highlights: [
      'Ultra-luxury apartments',
      'The Grand Club amenities',
      'Pet park & outdoor cinema',
      '9.4% steady appreciation'
    ]
  },
  {
    id: 5,
    name: 'Yelahanka',
    properties: 224,
    image: '/images/card-bhartiya-city.jpg',
    description: "North Bangalore's peaceful residential haven",
    priceRange: '₹55 L - ₹2.8 Cr',
    avgPricePerSqft: '₹6,800 - ₹12,000/sqft',
    roi: '13.5%',
    benefits: [
      'Near Devanahalli airport route',
      'Affordable housing options',
      'Good educational institutions',
      'Peaceful neighborhood',
      'Growing commercial hub'
    ],
    connectivity: [
      'NH 44 - Highway access',
      'Hebbal - 20 mins',
      'Airport - 30 mins',
      'Yelahanka Air Force Road',
      'Multiple bus terminals'
    ],
    nearbyPlaces: [
      { type: 'Education', name: 'Jain University', distance: '5 km' },
      { type: 'Mall', name: 'Gopalan Innovation Mall', distance: '8 km' },
      { type: 'Hospital', name: 'Vydehi Hospital', distance: '10 km' },
      { type: 'Park', name: 'Yelahanka Lake', distance: '3 km' },
      { type: 'Tech Park', name: 'Bagmane World City', distance: '12 km' }
    ],
    partnerProjects: [
      { name: 'Bhartiya City Nikoo Homes', developer: 'Bhartiya City', status: 'Latest' },
      { name: 'Prestige City', developer: 'Prestige Group', status: 'Upcoming' }
    ],
    highlights: [
      'Budget-friendly properties',
      'Fast-appreciating zone',
      'Educational hub',
      '12% YoY growth'
    ]
  },
  {
    id: 6,
    name: 'Sarjapur Road',
    properties: 312,
    image: '/images/card-brigade-valencia.jpg',
    description: "East Bangalore's emerging IT corridor",
    priceRange: '₹70 L - ₹3.2 Cr',
    avgPricePerSqft: '₹7,200 - ₹13,800/sqft',
    roi: '14.2%',
    benefits: [
      'Close to Electronic City',
      'Wipro & TCS proximity',
      'Affordable luxury homes',
      'Excellent social infrastructure',
      'High rental yields'
    ],
    connectivity: [
      'Sarjapur Main Road',
      'Outer Ring Road - 15 mins',
      'Electronic City - 20 mins',
      'Marathahalli - 15 mins',
      'Proposed Metro line'
    ],
    nearbyPlaces: [
      { type: 'Tech Park', name: 'Wipro Corporate Office', distance: '8 km' },
      { type: 'Mall', name: 'Forum Suvidya Mall', distance: '6 km' },
      { type: 'School', name: 'Inventure Academy', distance: '5 km' },
      { type: 'Hospital', name: 'Motherhood Hospital', distance: '7 km' },
      { type: 'Market', name: 'Sarjapur Market', distance: '2 km' }
    ],
    partnerProjects: [
      { name: 'Brigade Ecoworld', developer: 'Brigade Group', status: 'Ready' },
      { name: 'Prestige Shantiniketan', developer: 'Prestige Group', status: 'Latest' }
    ],
    highlights: [
      'IT professional favorite',
      'Eco-friendly townships',
      '15% appreciation potential',
      'High rental demand'
    ]
  },
  {
    id: 7,
    name: 'JP Nagar',
    properties: 198,
    image: '/images/card-godrej-ananda.jpg',
    description: "South Bangalore's premium residential locality",
    priceRange: '₹1.5 Cr - ₹6.5 Cr',
    avgPricePerSqft: '₹11,000 - ₹19,500/sqft',
    roi: '10.5%',
    benefits: [
      'Established upscale area',
      'Excellent connectivity',
      'Premium shopping & dining',
      'Top-rated schools',
      'Green & peaceful'
    ],
    connectivity: [
      'Bannerghatta Road',
      'Kanaka Pura Road',
      'Silk Board - 15 mins',
      'MG Road - 25 mins',
      'Metro connectivity'
    ],
    nearbyPlaces: [
      { type: 'Mall', name: 'Orion Mall', distance: '4 km' },
      { type: 'Hospital', name: 'Jayadeva Hospital', distance: '6 km' },
      { type: 'School', name: 'Sophia High School', distance: '3 km' },
      { type: 'Park', name: 'Thippasandra Lake', distance: '2 km' },
      { type: 'Market', name: 'JP Nagar Market', distance: '1 km' }
    ],
    partnerProjects: [
      { name: 'Godrej Eternity', developer: 'Godrej Properties', status: 'Latest' },
      { name: 'Tata La Vida', developer: 'Tata Housing', status: 'Ready' }
    ],
    highlights: [
      'Premium lifestyle destination',
      'Excellent social infrastructure',
      'Steady 10% appreciation',
      'High quality of life'
    ]
  },
  {
    id: 8,
    name: 'Indiranagar',
    properties: 145,
    image: '/images/card-prestige-finsbury.jpg',
    description: "Bangalore's most vibrant urban hub",
    priceRange: '₹2.5 Cr - ₹8.5 Cr',
    avgPricePerSqft: '₹14,000 - ₹22,000/sqft',
    roi: '9.8%',
    benefits: [
      'Heart of the city',
      'Best restaurants & pubs',
      'Metro connectivity',
      'Premium real estate',
      'Cosmopolitan culture'
    ],
    connectivity: [
      'HAL Old Airport Road',
      'Double Road Connector',
      'Metro Station - 5 mins',
      'MG Road - 10 mins',
      'Whitefield - 25 mins'
    ],
    nearbyPlaces: [
      { type: 'Mall', name: '100 Feet Road Shops', distance: '1 km' },
      { type: 'Restaurant', name: 'Toit Brewpub', distance: '2 km' },
      { type: 'Hospital', name: 'Manipal Hospital', distance: '8 km' },
      { type: 'Metro', name: 'Indiranagar Station', distance: '1 km' },
      { type: 'Park', name: 'Swami Vivekananda Park', distance: '2 km' }
    ],
    partnerProjects: [
      { name: 'Prestige Pine Forest', developer: 'Prestige Group', status: 'Ready' },
      { name: 'Sobha Ivory', developer: 'Sobha Limited', status: 'Latest' }
    ],
    highlights: [
      'Most sought-after location',
      'Vibrant nightlife',
      'Premium property values',
      '9% stable returns'
    ]
  },
  {
    id: 9,
    name: 'HSR Layout',
    properties: 167,
    image: '/images/card-sobha-neopolis.jpg',
    description: 'Planned residential paradise with modern amenities',
    priceRange: '₹1.8 Cr - ₹7.2 Cr',
    avgPricePerSqft: '₹12,500 - ₹20,000/sqft',
    roi: '10.2%',
    benefits: [
      'Well-planned sectors',
      'Wide tree-lined roads',
      'Excellent infrastructure',
      'Close to Silk Board',
      'Premium community'
    ],
    connectivity: [
      '27th Main Road',
      'Silk Board - 10 mins',
      'Koramangala - 15 mins',
      'Electronic City - 25 mins',
      'Metro proposed'
    ],
    nearbyPlaces: [
      { type: 'Mall', name: 'Central Mall', distance: '3 km' },
      { type: 'Restaurant', name: 'Nandi Social', distance: '2 km' },
      { type: 'Hospital', name: 'Medicover Hospital', distance: '5 km' },
      { type: 'School', name: 'Gear Innovative School', distance: '4 km' },
      { type: 'Park', name: 'HOSUR Road Lake', distance: '3 km' }
    ],
    partnerProjects: [
      { name: 'Sobha City', developer: 'Sobha Limited', status: 'Ready' },
      { name: 'Pristine Edge', developer: 'Pristine Estates', status: 'Latest' }
    ],
    highlights: [
      'Planned development',
      'Excellent quality of life',
      '11% appreciation rate',
      'IT professional hub'
    ]
  },
  {
    id: 10,
    name: 'Kanakpura Road',
    properties: 289,
    image: '/images/hero-interior.jpg',
    description: "South Bangalore's fastest-developing corridor",
    priceRange: '₹65 L - ₹4.5 Cr',
    avgPricePerSqft: '₹7,000 - ₹14,000/sqft',
    roi: '13.8%',
    benefits: [
      'Metro connectivity',
      'Large township projects',
      'Affordable luxury',
      'Excellent appreciation',
      'Green surroundings'
    ],
    connectivity: [
      'Kanakpura Main Road',
      'Nice Road Junction',
      'Silk Board - 20 mins',
      'Electronic City - 25 mins',
      'Metro Purple Line'
    ],
    nearbyPlaces: [
      { type: 'Mall', name: 'Lulu Mall', distance: '8 km' },
      { type: 'Hospital', name: 'Aster CMI Hospital', distance: '10 km' },
      { type: 'School', name: 'Canadian International School', distance: '6 km' },
      { type: 'Metro', name: 'Yelachenahalli Metro', distance: '5 km' },
      { type: 'Hill Station', name: 'Savandurga', distance: '25 km' }
    ],
    partnerProjects: [
      { name: 'Purva Windermere', developer: 'Purvankara', status: 'Latest' },
      { name: 'Vanahalli Township', developer: 'Brigade Group', status: 'Upcoming' }
    ],
    highlights: [
      'Metro-connected locality',
      'Township developments',
      '14% growth potential',
      'Nature-friendly living'
    ]
  },
  {
    id: 11,
    name: 'Electronic City',
    properties: 356,
    image: '/images/builder-construction.jpg',
    description: "India's Silicon Valley - Major IT/ITES hub",
    priceRange: '₹45 L - ₹2.5 Cr',
    avgPricePerSqft: '₹5,500 - ₹11,000/sqft',
    roi: '15.2%',
    benefits: [
      'Major IT/ITES hub',
      'Affordable housing',
      'Highest rental yields',
      'Excellent connectivity',
      'All amenities nearby'
    ],
    connectivity: [
      'Hosur Road',
      'Nice Road Junction',
      'Silk Board - 15 mins',
      'Airport - 45 mins',
      'Metro Yellow Line'
    ],
    nearbyPlaces: [
      { type: 'Tech Park', name: 'Electronic City Phase 1', distance: '2 km' },
      { type: 'Mall', name: 'Forum Fiza Mall', distance: '5 km' },
      { type: 'Hospital', name: 'Narayana Health City', distance: '8 km' },
      { type: 'School', name: 'Treamis Schools', distance: '6 km' },
      { type: 'Metro', name: 'Electronic City Metro', distance: '3 km' }
    ],
    partnerProjects: [
      { name: 'Disha Waterfront', developer: 'Disha Enterprises', status: 'Latest' },
      { name: 'Godrej Eternity', developer: 'Godrej Properties', status: 'Ready' }
    ],
    highlights: [
      'Highest ROI in Bangalore',
      'IT rental market leader',
      '16% annual appreciation',
      'Most affordable option'
    ]
  },
  {
    id: 12,
    name: 'RT Nagar',
    properties: 134,
    image: '/images/neighborhood-lake.jpg',
    description: "Central Bangalore's established residential area",
    priceRange: '₹1.1 Cr - ₹4.8 Cr',
    avgPricePerSqft: '₹9,500 - ₹16,500/sqft',
    roi: '11.2%',
    benefits: [
      'Central location',
      'Excellent connectivity',
      'Established neighborhood',
      'Good rental market',
      'All facilities nearby'
    ],
    connectivity: [
      'Bellary Road',
      'Hebbal - 10 mins',
      'MG Road - 15 mins',
      'Airport Road - 20 mins',
      'Metro connectivity'
    ],
    nearbyPlaces: [
      { type: 'Mall', name: 'Orion Eastgate Mall', distance: '4 km' },
      { type: 'Hospital', name: 'Columbia Asia Hospital', distance: '5 km' },
      { type: 'School', name: 'Army Public School', distance: '2 km' },
      { type: 'Market', name: 'RT Nagar Market', distance: '1 km' },
      { type: 'Tech Park', name: 'Kirloskar Business Park', distance: '6 km' }
    ],
    partnerProjects: [
      { name: 'Salarpuria Sattva', developer: 'Salarpuria Sattva', status: 'Ready' },
      { name: 'Maaxos Elite', developer: 'Maaxos Properties', status: 'Latest' }
    ],
    highlights: [
      'Prime central location',
      'Well-established area',
      '11% steady returns',
      'Excellent connectivity'
    ]
  },
];

export const Locations: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const [rotationIndex, setRotationIndex] = useState(0);

  // Lock body scroll when modal is open and enable ESC to close
  useModalScrollLock();
  useModalKeyboardNavigation(() => setSelectedLocation(null));

  // Auto-rotate locations every 5 seconds - synchronized flip for 4 cards at a time
  useEffect(() => {
    const interval = setInterval(() => {
      setRotationIndex((prev) => (prev + 1) % Math.ceil(locations.length / 4));
    }, 5000); // 5 seconds per flip (3 flips = 12 locations total)

    return () => clearInterval(interval);
  }, []);

  // Get visible locations (4 cards at a time)
  const getVisibleLocations = () => {
    const startIdx = rotationIndex * 4;
    return locations.slice(startIdx, startIdx + 4);
  };

  return (
    <section id="locations" className="py-20 lg:py-32 bg-blueprint-blue blueprint-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-12 lg:mb-16 px-4">
          <span className="label-mono text-white/70 mb-4 block">
            Popular Locations
          </span>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4">
            Explore Prime Neighborhoods
          </h2>
          <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Discover properties in Bangalore&apos;s most sought-after locations, 
            each offering unique lifestyle benefits.
          </p>
        </AnimatedSection>

        {/* Locations Grid with Auto-Rotation - 4 cards at a time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="wait">
            {getVisibleLocations().map((location, index) => (
              <motion.div
                key={`${rotationIndex}-${location.id}`}
                initial={{ opacity: 0, rotateY: -90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: 90 }}
                transition={{ 
                  duration: 0.6,
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                  delay: index * 0.1
                }}
                whileHover={{ scale: 1.05, y: -8 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedLocation(location);
                }}
                className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer"
                style={{ perspective: 1000 }}
              >
                {/* Background Image */}
                <img
                  src={location.image}
                  alt={location.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                {/* Content */}
                <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-1">
                        {location.name}
                      </h3>
                      <p className="text-white/70 text-xs sm:text-sm mb-2 line-clamp-2">
                        {location.description}
                      </p>
                      <div className="flex items-center gap-1.5 text-white/90">
                        <Building className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                        <span className="text-xs sm:text-sm font-medium">
                          {location.properties} Projects
                        </span>
                      </div>
                    </div>
                    <motion.div
                      className="p-1.5 sm:p-2 rounded-full bg-white/20 backdrop-blur-sm shrink-0"
                      whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.3)' }}
                    >
                      <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </motion.div>
                  </div>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-white/0 group-hover:border-white/20 transition-colors duration-300" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Stats Bar */}
        <AnimatedSection delay={0.4}>
          <div className="mt-16 p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: '50+', label: 'Neighborhoods' },
                { value: '10K+', label: 'Properties' },
                { value: '500+', label: 'Happy Families' },
                { value: '99%', label: 'Satisfaction' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-3xl sm:text-4xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-white/60 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Location Details Modal */}
      <AnimatePresence>
        {selectedLocation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6"
            style={{ pointerEvents: 'auto' }}
            onClick={() => setSelectedLocation(null)}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              style={{ pointerEvents: 'auto' }}
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-editorial-ivory rounded-3xl shadow-2xl"
              style={{ pointerEvents: 'auto' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedLocation(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all"
              >
                <X className="w-6 h-6 text-gray-900" />
              </button>

              {/* Hero Image */}
              <div className="relative h-64 sm:h-80">
                <img
                  src={selectedLocation.image}
                  alt={selectedLocation.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h2 className="text-3xl sm:text-4xl font-black text-white mb-2">
                    {selectedLocation.name}
                  </h2>
                  <p className="text-white/90 text-sm sm:text-base">
                    {selectedLocation.description}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8 space-y-8">
                {/* Pricing Overview */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                    <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">Price Range</p>
                    <p className="text-gray-900 text-sm font-black">{selectedLocation.priceRange}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
                    <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">Avg Price/sqft</p>
                    <p className="text-gray-900 text-sm font-black">{selectedLocation.avgPricePerSqft}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
                    <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">Avg ROI</p>
                    <p className="text-green-600 text-sm font-black">{selectedLocation.roi}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20">
                    <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">Total Projects</p>
                    <p className="text-gray-900 text-sm font-black">{selectedLocation.properties}</p>
                  </div>
                </div>

                {/* Two Column Layout */}
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    {/* Benefits */}
                    <div>
                      <h3 className="font-display text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-purple-600" />
                        Location Benefits
                      </h3>
                      <ul className="space-y-2">
                        {selectedLocation.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-700 text-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Connectivity */}
                    <div>
                      <h3 className="font-display text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Bus className="w-5 h-5 text-blue-600" />
                        Connectivity
                      </h3>
                      <ul className="space-y-2">
                        {selectedLocation.connectivity.map((conn, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-700 text-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                            {conn}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    {/* Nearby Places */}
                    <div>
                      <h3 className="font-display text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-green-600" />
                        Nearby Places
                      </h3>
                      <div className="space-y-3">
                        {selectedLocation.nearbyPlaces.map((place, idx) => {
                          const IconComponent = place.type === 'Airport' ? Bus :
                                               place.type === 'Tech Park' ? Building :
                                               place.type === 'Education' || place.type === 'School' ? School :
                                               place.type === 'Retail' || place.type === 'Mall' ? ShoppingBag : Trees;
                          return (
                            <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white border border-gray-200">
                              <div className="flex items-center gap-3">
                                <IconComponent className="w-4 h-4 text-gray-600" />
                                <div>
                                  <p className="text-gray-900 text-sm font-medium">{place.name}</p>
                                  <p className="text-gray-500 text-xs">{place.type}</p>
                                </div>
                              </div>
                              <span className="text-gray-900 text-sm font-bold">{place.distance}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Partner Projects */}
                <div>
                  <h3 className="font-display text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Building className="w-5 h-5 text-orange-600" />
                    Our Partner Projects
                  </h3>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedLocation.partnerProjects.map((project, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-white border border-gray-200 hover:border-orange-500 transition-all">
                        <div className="flex items-center justify-between mb-2">
                          <span className={`px-2 py-1 rounded text-[9px] font-bold uppercase ${
                            project.status === 'Latest' ? 'bg-green-100 text-green-700' :
                            project.status === 'Upcoming' ? 'bg-blue-100 text-blue-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {project.status}
                          </span>
                        </div>
                        <h4 className="text-gray-900 font-bold text-sm mb-1">{project.name}</h4>
                        <p className="text-gray-500 text-xs">{project.developer}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                  <h3 className="font-display text-lg font-bold text-gray-900 mb-3">Key Highlights</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {selectedLocation.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-purple-500 shrink-0" />
                        <span className="text-gray-700 text-sm">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Locations;
