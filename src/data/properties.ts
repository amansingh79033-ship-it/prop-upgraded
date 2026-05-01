export interface Property {
  id: number;
  title: string;
  developer: string;
  location: string;
  price: string;
  priceValue: number; // For strict budget filtering (in Cr)
  pricePerSqft: string;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  tag: string;
  rera: string;
  roi: string;
  isUndervalued?: boolean;
  
  // Deep details
  description: string;
  amenities: string[];
  possession: string;
  status: 'Ready to Move' | 'Under Construction' | 'Newly Launched';
  nearbyPlaces: { name: string; distance: string }[];
  floorPlanImages: string[];
  videoTour?: string;
  gallery: string[];
  
  // Additional Details
  totalArea?: string;
  totalTowers?: number;
  totalUnits?: number;
  unitConfig?: string;
  balconies?: number;
  parkingType?: string;
  furnishingType?: string;
  propertyAge?: string;
  expectedPossession?: string;
  constructionStatus?: string;
  landTitle?: string;
  loanAvailability?: boolean;
  preReraApproval?: boolean;
  fireSafety?: boolean;
  earthquakeResistant?: boolean;
  rainwaterHarvesting?: boolean;
  powerBackup?: string;
  securityFeatures?: string[];
  interiorFeatures?: string[];
  outdoorFeatures?: string[];
  sustainabilityFeatures?: string[];
}

export const properties: Property[] = [
  {
    id: 1,
    title: 'Embassy Greenshore',
    developer: 'Embassy Group',
    location: 'Devenahalli, North Bangalore',
    price: '₹1.21 Cr - ₹3.13 Cr',
    priceValue: 1.21,
    pricePerSqft: '₹10,500/sqft',
    beds: 3,
    baths: 3,
    sqft: 2100,
    image: '/images/card-sobha-neopolis.jpg',
    tag: 'Premium Luxury',
    rera: 'PRM/KA/RERA/1250/303/PR/201125/008265',
    roi: '12.4%',
    isUndervalued: true,
    description: 'Embassy Greenshore is a premier residential enclave within the 288-acre Embassy Springs township. It offers large luxury apartments with 85% open spaces and world-class amenities. The project features meticulously designed homes with premium finishes, smart home automation, and breathtaking views of the surrounding greens and water bodies.',
    amenities: ['Olympic Size Pool', 'Clubhouse', 'Tennis Courts', 'Organic Farm', 'Yoga Deck', 'Children Play Area', 'Jogging Track', 'Multipurpose Hall'],
    possession: 'Dec 2028',
    status: 'Under Construction',
    nearbyPlaces: [{ name: 'KIA Airport', distance: '12 mins' }, { name: 'Hebbal', distance: '25 mins' }, { name: 'Manyata Tech Park', distance: '20 mins' }],
    floorPlanImages: ['/images/card-bhartiya-city.jpg', '/images/card-brigade-insignia.jpg'],
    gallery: ['/images/hero-interior.jpg', '/images/lifestyle-lake.jpg', '/images/spotlight-exterior.jpg'],
    videoTour: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Sample video tour
    totalArea: '288 Acres',
    totalTowers: 12,
    totalUnits: 1450,
    unitConfig: '3 & 4 BHK',
    balconies: 2,
    parkingType: '2 Covered Parking',
    furnishingType: 'Semi-Furnished',
    expectedPossession: 'December 2028',
    constructionStatus: '45% Complete',
    landTitle: 'Clear Title',
    loanAvailability: true,
    preReraApproval: true,
    fireSafety: true,
    earthquakeResistant: true,
    rainwaterHarvesting: true,
    powerBackup: '100% Power Backup for Common Areas & Lights',
    securityFeatures: ['24/7 Security', 'CCTV Surveillance', 'Video Door Phones', 'Access Control'],
    interiorFeatures: ['Modular Kitchen', 'Premium Tiles', 'Teak Wood Doors', 'Aluminum Windows'],
    outdoorFeatures: ['Landscaped Gardens', 'Outdoor Fitness Zone', 'Cycling Track', 'Pet Park'],
    sustainabilityFeatures: ['Solar Street Lights', 'Sewage Treatment Plant', 'Water Conservation', 'Waste Management']
  },
  {
    id: 2,
    title: 'Embassy Edge',
    developer: 'Embassy Group',
    location: 'Devanahalli, North Bangalore',
    price: '₹60 L - ₹1.5 Cr',
    priceValue: 0.6,
    pricePerSqft: '₹7,400/sqft',
    beds: 2,
    baths: 2,
    sqft: 1100,
    image: '/images/card-prestige-finsbury.jpg',
    tag: 'High ROI',
    rera: 'PRM/KA/RERA/1250/303/PR/180526/001825',
    roi: '14.8%',
    isUndervalued: true,
    description: 'Alexa-enabled smart homes for the modern generation. Part of the Embassy Springs ecosystem.',
    amenities: ['Smart Home Tech', 'Gym', 'Co-working'],
    possession: 'Ready to Move',
    status: 'Ready to Move',
    nearbyPlaces: [{ name: 'Doddajala Metro', distance: '5 mins' }],
    floorPlanImages: ['/images/card-bhartiya-city.jpg'],
    gallery: ['/images/amenities-park.jpg', '/images/neighborhood-lake.jpg'],
    videoTour: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    id: 3,
    title: 'Purva Northern Lights',
    developer: 'Purvankara',
    location: 'Hennur Road, North Bangalore',
    price: '₹95 L - ₹1.8 Cr',
    priceValue: 0.95,
    pricePerSqft: '₹8,200/sqft',
    beds: 2,
    baths: 2,
    sqft: 1250,
    image: '/images/card-bhartiya-city.jpg',
    tag: 'Premium Living',
    rera: 'PRM/KA/RERA/1251/309/PR/190220/002434',
    roi: '11.5%',
    isUndervalued: true,
    description: 'Purva Northern Lights features the WorldHome Collection by Puravankara, offering luxury homes with world-class amenities.',
    amenities: ['WorldHome Club', 'Meditation Center', 'Sports Arena'],
    possession: '2026',
    status: 'Under Construction',
    nearbyPlaces: [{ name: 'Manyata Tech Park', distance: '15 mins' }],
    floorPlanImages: ['/images/card-brigade-insignia.jpg'],
    gallery: ['/images/lifestyle-lake.jpg', '/images/spotlight-exterior.jpg'],
    videoTour: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    id: 4,
    title: 'Purva Codename Hennur',
    developer: 'Purvankara',
    location: 'Hennur, North Bangalore',
    price: '₹1.1 Cr - ₹2.4 Cr',
    priceValue: 1.1,
    pricePerSqft: '₹9,100/sqft',
    beds: 3,
    baths: 3,
    sqft: 1680,
    image: '/images/card-brigade-valencia.jpg',
    tag: 'Newly Launched',
    rera: 'PRM/KA/RERA/1251/309/PR/230124/005658',
    roi: '13.2%',
    description: 'A new milestone in luxury living at Hennur. Spacious balconies and nature-inspired architecture.',
    amenities: ['Infinity Pool', 'Nature Trails', 'Sky Deck'],
    possession: '2028',
    status: 'Newly Launched',
    nearbyPlaces: [{ name: 'Elements Mall', distance: '10 mins' }],
    floorPlanImages: ['/images/card-sobha-neopolis.jpg'],
    gallery: ['/images/hero-interior.jpg', '/images/builder-construction.jpg'],
    videoTour: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    id: 5,
    title: 'Godrej Ananda',
    developer: 'Godrej Properties',
    location: 'Aerospace Park, Devanahalli',
    price: '₹2.1 Cr',
    priceValue: 2.1,
    pricePerSqft: '₹8,900/sqft',
    beds: 3,
    baths: 3,
    sqft: 2360,
    image: '/images/card-godrej-ananda.jpg',
    tag: 'High ROI',
    rera: 'PRM/KA/RERA/1251/446/PR/210524/003909',
    roi: '15.1%',
    isUndervalued: true,
    description: 'Located in the burgeoning Aerospace Park, Ananda offers premium apartments with high appreciation potential.',
    amenities: ['Urban Forest', 'Clubhouse', 'Cricket Pitch'],
    possession: '2025',
    status: 'Under Construction',
    nearbyPlaces: [{ name: 'Aerospace SEZ', distance: '2 mins' }],
    floorPlanImages: ['/images/card-prestige-finsbury.jpg'],
    gallery: ['/images/amenities-park.jpg', '/images/lifestyle-lake.jpg', '/images/neighborhood-lake.jpg'],
    videoTour: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    id: 6,
    title: 'Godrej Woodscapes',
    developer: 'Godrej Properties',
    location: 'Budigere Cross, Bangalore',
    price: '₹1.4 Cr - ₹2.8 Cr',
    priceValue: 1.4,
    pricePerSqft: '₹9,500/sqft',
    beds: 3,
    baths: 3,
    sqft: 1850,
    image: '/images/card-sobha-neopolis.jpg',
    tag: 'Luxury Forest',
    rera: 'PRM/KA/RERA/1251/446/PR/110524/006843',
    roi: '12.8%',
    description: 'Live in a world of greens with Godrej Woodscapes. Designed for those who seek tranquility plus luxury.',
    amenities: ['Forest Walks', 'Floating Deck', 'Organic Farm'],
    possession: '2029',
    status: 'Newly Launched',
    nearbyPlaces: [{ name: 'Whitefield', distance: '15 mins' }],
    floorPlanImages: [],
    gallery: []
  },
  {
    id: 7,
    title: 'Assetz Bloom & Dell',
    developer: 'Assetz Property',
    location: 'Whitefield, Bangalore',
    price: '₹1.9 Cr - ₹3.5 Cr',
    priceValue: 1.9,
    pricePerSqft: '₹12,200/sqft',
    beds: 3,
    baths: 3,
    sqft: 2000,
    image: '/images/card-prestige-finsbury.jpg',
    tag: 'Sustainable Luxury',
    rera: 'PRM/KA/RERA/1251/446/PR/220324/004782',
    roi: '10.9%',
    description: 'Carbon healing homes by Assetz. A sustainable haven with recycled water and solar power integrations.',
    amenities: ['Bio-swales', 'Solar Park', 'Organic Garden'],
    possession: '2026',
    status: 'Under Construction',
    nearbyPlaces: [{ name: 'ITPL', distance: '10 mins' }],
    floorPlanImages: [],
    gallery: []
  },
  {
    id: 8,
    title: 'Assetz Marq 3',
    developer: 'Assetz Property',
    location: 'Sathnur Road, Bangalore',
    price: '₹1.1 Cr - ₹1.8 Cr',
    priceValue: 1.1,
    pricePerSqft: '₹8,400/sqft',
    beds: 3,
    baths: 3,
    sqft: 1640,
    image: '/images/card-bhartiya-city.jpg',
    tag: 'Township Living',
    rera: 'PRM/KA/RERA/1251/446/PR/181215/002234',
    roi: '11.2%',
    description: 'Award-winning township in North Bangalore. All amenities are operational and the school is already functional.',
    amenities: ['The Great Marq School', 'Central Park', 'Badminton Court'],
    possession: 'Ready to Move',
    status: 'Ready to Move',
    nearbyPlaces: [{ name: 'Bagalur Cross', distance: '5 mins' }],
    floorPlanImages: [],
    gallery: []
  },
  {
    id: 9,
    title: 'Brigade Horizon',
    developer: 'Brigade Group',
    location: 'Mysore Road, Bangalore',
    price: '₹85 L - ₹1.4 Cr',
    priceValue: 0.85,
    pricePerSqft: '₹7,200/sqft',
    beds: 2,
    baths: 2,
    sqft: 1150,
    image: '/images/card-brigade-valencia.jpg',
    tag: 'Smart Investment',
    rera: 'PRM/KA/RERA/1251/310/PR/220119/004654',
    roi: '14.2%',
    isUndervalued: true,
    description: 'A massive 60-acre integrated development with smart 2 and 3 BHK apartments.',
    amenities: ['Amphitheater', 'Library', 'Bowling Alley'],
    possession: '2027',
    status: 'Newly Launched',
    nearbyPlaces: [{ name: 'Upcoming Metro', distance: '2 mins' }],
    floorPlanImages: [],
    gallery: []
  },
  {
    id: 10,
    title: 'Lodha Mirabelle',
    developer: 'Lodha Group',
    location: 'Thanisandra, Bangalore',
    price: '₹2.2 Cr - ₹4.5 Cr',
    priceValue: 2.2,
    pricePerSqft: '₹13,500/sqft',
    beds: 3,
    baths: 3,
    sqft: 2200,
    image: '/images/card-brigade-insignia.jpg',
    tag: 'Ultra Luxury',
    rera: 'PRM/KA/RERA/1251/309/PR/230524/005958',
    roi: '9.4%',
    description: 'World-class luxury by Lodha. Sprawling landscapes and ultra-premium finishes in the heart of North Bangalore.',
    amenities: ['The Grand Club', 'Pet Park', 'Outdoor Cinema'],
    possession: '2028',
    status: 'Newly Launched',
    nearbyPlaces: [{ name: 'Hebbal Flyover', distance: '10 mins' }],
    floorPlanImages: [],
    gallery: []
  }
];
