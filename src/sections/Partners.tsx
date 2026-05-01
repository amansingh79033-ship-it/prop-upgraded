import { motion } from 'framer-motion';
import { AnimatedSection } from '../components/AnimatedSection';

const partners = [
  { name: 'Embassy', logo: 'Embassy' },
  { name: 'Prestige', logo: 'Prestige' },
  { name: 'Brigade', logo: 'Brigade' },
  { name: 'Sobha', logo: 'Sobha' },
  { name: 'Godrej', logo: 'Godrej' },
  { name: 'Bhartiya', logo: 'Bhartiya' },
  { name: 'Puravankara', logo: 'Puravankara' },
  { name: 'L&T', logo: 'L&T' },
];

export const Partners: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-blueprint-blue/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-12">
          <span className="label-mono text-white/60 mb-3 block">
            Trusted By Leading Developers
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-white">
            Our Premium Partners
          </h2>
        </AnimatedSection>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 lg:gap-8">
          {partners.map((partner, index) => (
            <AnimatedSection key={partner.name} delay={index * 0.05}>
              <motion.div
                className="group flex flex-col items-center gap-3"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                {/* Logo Placeholder */}
                <div className="w-full aspect-square max-w-[100px] rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center group-hover:bg-white/20 group-hover:border-white/30 transition-all duration-300">
                  <span className="font-display text-lg font-bold text-white/80 group-hover:text-white">
                    {partner.logo}
                  </span>
                </div>
                {/* Name */}
                <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
                  {partner.name}
                </span>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Stats */}
        <AnimatedSection delay={0.3}>
          <div className="mt-16 pt-12 border-t border-white/10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: '50+', label: 'Partner Developers' },
                { value: '200+', label: 'Projects Listed' },
                { value: '15K+', label: 'Units Available' },
                { value: '₹500Cr+', label: 'Property Value' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-2xl sm:text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-white/50 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Partners;
