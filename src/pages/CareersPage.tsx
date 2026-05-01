import { motion } from 'framer-motion';
import { AnimatedSection } from '../components/AnimatedSection';
import { NotchNavbar, Footer } from '../sections';
import { TrendingUp, Heart, Users, Coffee, Zap, Globe } from 'lucide-react';

const benefits = [
  { icon: Heart, title: 'Health Insurance', desc: 'Comprehensive coverage for you and your family' },
  { icon: TrendingUp, title: 'Growth Budget', desc: 'Annual learning & development allowance' },
  { icon: Users, title: 'Team Retreats', desc: 'Quarterly offsites with the entire team' },
  { icon: Coffee, title: 'Unlimited PTO', desc: 'Take time off when you need it' },
  { icon: Zap, title: 'Latest Tech', desc: 'MacBook Pro + all the tools you need' },
  { icon: Globe, title: 'Remote Flexibility', desc: 'Work from anywhere, anytime' },
];

const jobs = [
  {
    title: 'Senior React Developer',
    department: 'Engineering',
    location: 'Bangalore (Hybrid)',
    type: 'Full-time',
    description: 'Build scalable web applications using React, TypeScript, and modern frontend technologies.',
    requirements: ['5+ years React experience', 'TypeScript expertise', 'Performance optimization skills']
  },
  {
    title: 'Product Designer',
    department: 'Design',
    location: 'Bangalore (Hybrid)',
    type: 'Full-time',
    description: 'Create beautiful, intuitive user experiences for our property search platform.',
    requirements: ['3+ years product design', 'Figma mastery', 'User research experience']
  },
  {
    title: 'Real Estate Analyst',
    department: 'Research',
    location: 'Bangalore (On-site)',
    type: 'Full-time',
    description: 'Analyze market trends, property valuations, and investment opportunities.',
    requirements: ['MBA in Real Estate', 'Data analysis skills', 'Market research expertise']
  },
];

export const CareersPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-editorial-ivory">
      <NotchNavbar />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <img
          src="/images/lifestyle-lake.jpg"
          alt="Careers at Propertyfie"
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
            Join Our Team
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-white/90 leading-relaxed"
          >
            Help us revolutionize India's real estate industry with AI-powered solutions
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Culture Section */}
          <AnimatedSection className="mb-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-display text-3xl lg:text-4xl font-bold text-text-primary mb-6">
                  Our Culture
                </h2>
                <p className="text-text-secondary text-lg leading-relaxed mb-6">
                  We're a team of passionate individuals who believe in the power of technology 
                  to transform traditional industries. We move fast, learn constantly, and 
                  celebrate both individual growth and team success.
                </p>
                <p className="text-text-secondary text-lg leading-relaxed">
                  At Propertyfie, you'll work on challenging problems, collaborate with brilliant 
                  minds, and see your impact on thousands of customers every day.
                </p>
              </div>
              <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/images/builder-construction.jpg"
                  alt="Our Culture"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </AnimatedSection>

          {/* Benefits Grid */}
          <div className="mb-20">
            <AnimatedSection>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-text-primary text-center mb-12">
                Benefits & Perks
              </h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <AnimatedSection key={benefit.title} delay={index * 0.1}>
                    <div className="p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow">
                      <div className="w-12 h-12 rounded-xl bg-blueprint-blue/10 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-blueprint-blue" />
                      </div>
                      <h3 className="font-display text-xl font-bold text-text-primary mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-text-secondary">{benefit.desc}</p>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>

          {/* Open Positions */}
          <div>
            <AnimatedSection>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-text-primary text-center mb-12">
                Open Positions
              </h2>
            </AnimatedSection>
            <div className="space-y-6">
              {jobs.map((job, index) => (
                <AnimatedSection key={job.title} delay={index * 0.1}>
                  <div className="p-8 rounded-2xl bg-white shadow-lg border border-gray-100">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="font-display text-2xl font-bold text-text-primary mb-2">
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap gap-3">
                          <span className="px-3 py-1 rounded-full bg-blueprint-blue/10 text-blueprint-blue text-sm font-medium">
                            {job.department}
                          </span>
                          <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-600 text-sm font-medium">
                            {job.location}
                          </span>
                          <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 text-sm font-medium">
                            {job.type}
                          </span>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 rounded-xl bg-blueprint-blue text-white font-semibold hover:bg-blueprint-blue/90 transition-colors"
                      >
                        Apply Now
                      </motion.button>
                    </div>
                    <p className="text-text-secondary mb-4">{job.description}</p>
                    <div>
                      <h4 className="font-semibold text-text-primary mb-2">Requirements:</h4>
                      <ul className="space-y-1">
                        {job.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-text-secondary">
                            <div className="w-1.5 h-1.5 rounded-full bg-blueprint-blue mt-1 shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
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
