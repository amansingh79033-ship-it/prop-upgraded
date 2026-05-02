import { useState } from 'react';
import { motion } from 'framer-motion';
import { AnimatedSection } from '../components/AnimatedSection';
import { PromoBanner } from '../components/PromoBanner';
import { ContactModal } from '../components/ContactModal';
import { OptimizedImage } from '../components';
import { 
  Brain, 
  Shield, 
  Zap, 
  Clock, 
  MapPin, 
  TrendingUp,
  CheckCircle2,
  Phone,
  MessageCircle,
  Sparkles
} from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Matching',
    description: 'Our advanced algorithms analyze your preferences to find properties that perfectly match your lifestyle and budget.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Shield,
    title: 'Verified Listings',
    description: 'Every property is thoroughly verified by our team to ensure accuracy and protect you from fraudulent listings.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Zap,
    title: 'Instant Alerts',
    description: 'Get notified immediately when new properties matching your criteria hit the market. Never miss an opportunity.',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Our dedicated team is available around the clock to assist you with any questions or concerns.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: MapPin,
    title: 'Local Expertise',
    description: 'Benefit from our deep knowledge of Bangalore neighborhoods and market trends to make informed decisions.',
    color: 'from-red-500 to-rose-500',
  },
  {
    icon: TrendingUp,
    title: 'Investment Insights',
    description: 'Access detailed analytics and market forecasts to identify properties with the best appreciation potential.',
    color: 'from-indigo-500 to-purple-500',
  },
];

const benefits = [
  'Zero brokerage on select properties',
  'Free home valuation service',
  'Legal documentation assistance',
  'Home loan guidance',
  'Virtual property tours',
  'Price negotiation support',
];

export const Features: React.FC = () => {
  const [showContactModal, setShowContactModal] = useState(false);

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-12 lg:mb-16 px-4">
          <span className="label-mono text-blueprint-blue mb-4 block">
            Why Choose Us
          </span>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-text-primary mb-4">
            Smart Features for Smart Buyers
          </h2>
          <p className="text-text-secondary text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            We combine cutting-edge technology with personalized service 
            to make your property search seamless and successful.
          </p>
        </AnimatedSection>

        {/* Call to Action - Moved before Promo Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
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

        {/* Promo Banner - Reduced Size */}
        <div className="mb-16">
          <PromoBanner variant="features" size="small" />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <AnimatedSection key={feature.title} delay={index * 0.1}>
                <motion.div
                  className="p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 group"
                  whileHover={{ y: -4 }}
                >
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="font-display text-lg sm:text-xl font-semibold text-text-primary mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Benefits Section */}
        <AnimatedSection>
          <div className="rounded-3xl bg-blueprint-blue overflow-hidden shadow-2xl">
            <div className="flex flex-col lg:grid lg:grid-cols-2">
              {/* Content */}
              <div className="p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
                <span className="label-mono text-white/70 mb-4 block">
                  Additional Benefits
                </span>
                <h3 className="font-display text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-4 sm:mb-6">
                  Everything You Need, All in One Place
                </h3>
                <p className="text-white/70 mb-6 sm:mb-8 text-sm sm:text-base">
                  We go beyond just listing properties. Our comprehensive services 
                  ensure a smooth journey from search to settlement.
                </p>
                
                {/* Benefits List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={benefit}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-white/90 text-sm">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Image */}
              <div className="relative h-72 sm:h-80 lg:h-auto order-first lg:order-last">
                <OptimizedImage
                  src="/images/hero-interior.jpg"
                  alt="Modern interior"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blueprint-blue/80 via-transparent to-transparent lg:bg-gradient-to-l lg:from-blueprint-blue lg:via-blueprint-blue/40 lg:to-transparent" />
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
      {/* Contact Modal */}
      <ContactModal isOpen={showContactModal} onClose={() => setShowContactModal(false)} />
    </section>
  );
};

export default Features;
