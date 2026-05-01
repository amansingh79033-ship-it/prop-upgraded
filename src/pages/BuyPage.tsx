import { motion } from 'framer-motion';
import { AnimatedSection } from '../components/AnimatedSection';
import { NotchNavbar, Footer } from '../sections';
import { Search, Home, TrendingUp, Shield, FileText } from 'lucide-react';

const featuredProperties = [
  {
    title: '2 BHK Apartment in Devanahalli',
    location: 'Embassy Greenshore, Devanahalli',
    price: '₹85 Lakh',
    area: '1,200 sqft',
    status: 'Ready to Move',
    image: '/images/card-bhartiya-city.jpg'
  },
  {
    title: '3 BHK Villa in Whitefield',
    location: 'Assetz Bloom & Dell, Whitefield',
    price: '₹1.8 Cr',
    area: '2,100 sqft',
    status: 'Under Construction',
    image: '/images/card-sobha-neopolis.jpg'
  },
  {
    title: '4 BHK Penthouse in Hebbal',
    location: 'Lodha Mirabelle, Hebbal',
    price: '₹4.5 Cr',
    area: '3,500 sqft',
    status: 'Ready to Move',
    image: '/images/card-brigade-insignia.jpg'
  },
];

const benefits = [
  { icon: Home, title: 'Verified Listings', desc: 'All properties are verified for authenticity and legal clarity' },
  { icon: TrendingUp, title: 'Best Prices', desc: 'Direct from builders with no hidden charges' },
  { icon: Shield, title: 'Legal Assistance', desc: 'Complete documentation and legal support included' },
  { icon: FileText, title: 'Home Loans', desc: 'Easy financing options with leading banks' },
];

export const BuyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-editorial-ivory">
      <NotchNavbar />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <img
          src="/images/hero-interior.jpg"
          alt="Buy Properties"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blueprint-blue/90 to-blueprint-blue/70" />
        <div className="relative z-10 px-4 max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Buy Your Dream Home
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-white/90 leading-relaxed mb-8"
          >
            Discover thousands of verified properties across Bangalore
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white p-4 rounded-2xl shadow-2xl max-w-3xl mx-auto"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by location, builder, or project..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blueprint-blue focus:ring-2 focus:ring-blueprint-blue/20 outline-none transition-all"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-xl bg-blueprint-blue text-white font-semibold hover:bg-blueprint-blue/90 transition-colors"
              >
                Search
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <AnimatedSection key={benefit.title} delay={index * 0.1}>
                  <div className="p-6 rounded-2xl bg-white shadow-lg text-center">
                    <div className="w-14 h-14 rounded-2xl bg-blueprint-blue/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-7 h-7 text-blueprint-blue" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-text-primary mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-text-secondary text-sm">{benefit.desc}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>

          {/* Featured Properties */}
          <AnimatedSection className="mb-20">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-text-primary mb-8">
              Featured Properties
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.map((property, index) => (
                <div key={index} className="rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all group cursor-pointer">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-green-500 text-white text-xs font-semibold">
                      {property.status}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold text-text-primary mb-2">
                      {property.title}
                    </h3>
                    <p className="text-text-secondary text-sm mb-4">{property.location}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-blueprint-blue font-black text-lg">{property.price}</span>
                      <span className="text-text-secondary text-sm">{property.area}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Buying Process */}
          <AnimatedSection>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-text-primary text-center mb-12">
              Simple Buying Process
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: '01', title: 'Search', desc: 'Browse thousands of verified listings' },
                { step: '02', title: 'Visit', desc: 'Schedule site visits at your convenience' },
                { step: '03', title: 'Book', desc: 'Reserve your unit with minimal token amount' },
                { step: '04', title: 'Close', desc: 'Complete documentation and get possession' },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-5xl font-black text-blueprint-blue/20 mb-4">{item.step}</div>
                  <h3 className="font-display text-xl font-bold text-text-primary mb-2">{item.title}</h3>
                  <p className="text-text-secondary">{item.desc}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </main>

      <Footer />
    </div>
  );
};
