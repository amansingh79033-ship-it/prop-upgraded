import { motion } from 'framer-motion';
import { AnimatedSection } from '../components/AnimatedSection';
import { NotchNavbar, Footer } from '../sections';
import { Users, Target, Award, Globe } from 'lucide-react';

const features = [
  { icon: Target, title: 'Our Mission', description: 'To revolutionize property search with AI-driven insights and personalized matching.' },
  { icon: Award, title: 'Our Vision', description: 'Becoming India\'s most trusted AI-powered real estate platform by 2030.' },
  { icon: Users, title: 'Our Team', description: 'A diverse group of real estate experts, data scientists, and technology innovators.' },
  { icon: Globe, title: 'Our Reach', description: 'Serving 50+ neighborhoods across Bangalore with plans for national expansion.' },
];

const stats = [
  { value: '10K+', label: 'Properties Listed' },
  { value: '5K+', label: 'Happy Families' },
  { value: '98%', label: 'Customer Satisfaction' },
  { value: '₹500Cr+', label: 'Transactions Facilitated' },
];

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-editorial-ivory">
      <NotchNavbar />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <img
          src="/images/hero-interior.jpg"
          alt="About Propertyfie"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blueprint-blue/90 to-blueprint-blue/70" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            About Propertyfie
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-white/90 leading-relaxed"
          >
            Transforming property search with artificial intelligence and deep market insights
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Story Section */}
          <AnimatedSection className="mb-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-display text-3xl lg:text-4xl font-bold text-text-primary mb-6">
                  Our Story
                </h2>
                <p className="text-text-secondary text-lg leading-relaxed mb-6">
                  Propertyfie was born from a simple idea: finding the perfect property should be 
                  intelligent, transparent, and stress-free. In 2024, we launched Bangalore's first 
                  AI-powered real estate platform that combines cutting-edge technology with deep 
                  market expertise.
                </p>
                <p className="text-text-secondary text-lg leading-relaxed">
                  Today, we've helped over 5,000 families find their dream homes while ensuring 
                  maximum returns for property developers through our data-driven approach and 
                  Propsync.xyz market integration.
                </p>
              </div>
              <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/images/builder-construction.jpg"
                  alt="Our Story"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </AnimatedSection>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <AnimatedSection key={feature.title} delay={index * 0.1}>
                  <div className="text-center p-6">
                    <div className="w-16 h-16 rounded-2xl bg-blueprint-blue/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-blueprint-blue" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-text-primary mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-text-secondary">{feature.description}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>

          {/* Stats Section */}
          <AnimatedSection>
            <div className="rounded-3xl bg-blueprint-blue p-8 lg:p-12">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
                      {stat.value}
                    </div>
                    <div className="text-white/70 text-sm lg:text-base">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Values Section */}
          <div className="mt-20">
            <AnimatedSection>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-text-primary text-center mb-12">
                Our Core Values
              </h2>
            </AnimatedSection>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'Transparency', desc: 'Honest pricing, verified listings, clear communication' },
                { title: 'Innovation', desc: 'AI-driven insights, continuous improvement, cutting-edge tech' },
                { title: 'Customer First', desc: 'Your success is our success, 24/7 support, personalized service' },
              ].map((value, index) => (
                <AnimatedSection key={value.title} delay={index * 0.1}>
                  <div className="p-6 rounded-2xl bg-white shadow-lg">
                    <h3 className="font-display text-xl font-bold text-text-primary mb-3">
                      {value.title}
                    </h3>
                    <p className="text-text-secondary">{value.desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
