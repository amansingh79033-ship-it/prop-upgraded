import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { AnimatedSection } from '../components/AnimatedSection';
import { NotchNavbar, Footer } from '../sections';
import { OptimizedImage } from '../components';
import { 
  ShieldCheck, 
  TrendingUp, 
  Target, 
  Gem, 
  ChevronRight,
  Sparkles,
  Heart,
  Eye,
  Award,
  X
} from 'lucide-react';

const visionPoints = [
  {
    icon: ShieldCheck,
    title: '100% Client-Centric',
    description: 'We are NOT developer-sponsored. Our loyalty lies solely with you, the investor. We negotiate for YOUR benefit, ensuring absolute transparency and maximum value.',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    icon: Gem,
    title: 'Institutional Grade Management',
    description: 'End-to-end management that treats your investment like an institution. From legal due diligence to tenant lifecycle management, we handle everything.',
    color: 'from-purple-500 to-pink-600',
  },
  {
    icon: TrendingUp,
    title: 'Alpha Generation',
    description: 'Our AI doesn\'t just find properties; it finds "Alpha". We identify undervalued assets with high appreciation potential using proprietary data analytics.',
    color: 'from-emerald-500 to-teal-600',
  }
];

export const VisionPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

  return (
    <div ref={containerRef} className="min-h-screen bg-white selection:bg-blueprint-blue selection:text-white">
      <NotchNavbar />
      
      {/* Immersive Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#030308]">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
              rotate: [0, 90, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1/4 -left-1/4 w-[100%] h-[100%] bg-gradient-to-br from-blueprint-blue/30 via-transparent to-transparent rounded-full blur-[120px]"
          />
          <motion.div 
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.1, 0.3, 0.1],
              rotate: [0, -90, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-1/4 -right-1/4 w-[100%] h-[100%] bg-gradient-to-tl from-coral-accent/20 via-transparent to-transparent rounded-full blur-[120px]"
          />
        </div>

        <motion.div 
          style={{ opacity, scale }}
          className="relative z-10 text-center px-4 max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-8"
          >
            <Sparkles className="w-4 h-4 text-blueprint-blue" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/70">Our Vision 2030</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold text-white mb-8 tracking-tight leading-[0.9]"
          >
            Redefining <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blueprint-blue via-purple-400 to-coral-accent animate-gradient">
              Independence.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl sm:text-2xl text-white/50 max-w-2xl mx-auto leading-relaxed font-light"
          >
            A 100% client-first investment firm. No developers' sponsorship. 
            No biased listings. Just pure, end-to-end property excellence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 flex flex-wrap justify-center gap-4"
          >
            <a href="#founder" className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform">
              Meet the Founder
            </a>
            <a href="#philosophy" className="px-8 py-4 bg-white/5 text-white font-bold rounded-full border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
              Our Philosophy
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent" />
          <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Scroll to Explore</span>
        </motion.div>
      </section>

      {/* Founder Section */}
      <section id="founder" className="py-24 lg:py-40 bg-editorial-ivory overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <AnimatedSection>
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-br from-blueprint-blue/20 to-purple-500/20 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
                  <OptimizedImage
                    src="/images/founder.png"
                    alt="Aman Kumar Singh"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <p className="text-white/70 font-mono text-xs tracking-widest uppercase mb-1">Founder & Director</p>
                    <h3 className="text-white font-display text-3xl font-bold">Aman Kumar Singh</h3>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blueprint-blue/10 border border-blueprint-blue/20">
                  <Award className="w-4 h-4 text-blueprint-blue" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-blueprint-blue">The Visionary</span>
                </div>
                <h2 className="font-display text-4xl lg:text-5xl font-bold text-text-primary leading-tight">
                  "Real estate is about trust, not transactions."
                </h2>
                <div className="space-y-6 text-text-secondary text-lg leading-relaxed">
                  <p>
                    When I founded Propertyfie, the market was flooded with "Developer-First" agents. 
                    These firms are paid by developers to sell specific projects, often leading to 
                    biased advice that doesn't serve the client's best interest.
                  </p>
                  <p className="font-semibold text-text-primary italic border-l-4 border-blueprint-blue pl-6 py-2 bg-blueprint-blue/5 rounded-r-xl">
                    "My vision was simple: Create a firm that stands 100% on the client's side. 
                    An end-to-end investment and management house that manages your wealth, 
                    not just your keys."
                  </p>
                  <p>
                    We don't accept developer sponsorship. Our fees are transparent, and our 
                    loyalty is unshakeable. We treat every crore invested as if it were our own, 
                    leveraging AI to ensure absolute precision in asset selection.
                  </p>
                </div>
                <div className="pt-8 flex items-center gap-6">
                  <div className="flex flex-col">
                    <span className="text-text-primary font-bold">Aman Kumar Singh</span>
                    <span className="text-text-secondary text-sm">Director, Q-Re-Us-Minds Dev</span>
                  </div>
                  <div className="w-12 h-[1px] bg-text-secondary/20" />
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg cursor-pointer"
                  >
                    <Heart className="w-5 h-5 text-coral-accent fill-coral-accent" />
                  </motion.div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* The Independence Model */}
      <section id="philosophy" className="py-24 lg:py-40 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-20">
            <h2 className="font-display text-4xl lg:text-6xl font-bold text-text-primary mb-6">
              The Independence Model
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
              Why being 100% client-presenting changes everything for your investment.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Traditional Model */}
            <AnimatedSection delay={0.1} className="relative p-8 lg:p-12 rounded-[2.5rem] bg-gray-50 border border-gray-100 overflow-hidden group">
              <div className="absolute top-0 right-0 p-8">
                <Target className="w-12 h-12 text-gray-300" />
              </div>
              <h3 className="font-display text-2xl font-bold text-gray-400 mb-8 uppercase tracking-widest">Traditional Firms</h3>
              <ul className="space-y-6">
                {[
                  'Paid by Developers to push specific projects',
                  'Bias towards "Sales Targets" over ROI',
                  'Inconsistent due diligence for faster closings',
                  'Limited post-sale management support',
                  'Opaque fee structures and commissions'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-gray-500">
                    <X className="w-5 h-5 text-red-400 shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>

            {/* Propertyfie Model */}
            <AnimatedSection delay={0.2} className="relative p-8 lg:p-12 rounded-[2.5rem] bg-blueprint-blue text-white overflow-hidden group shadow-2xl">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" 
              />
              <div className="absolute top-0 right-0 p-8">
                <Gem className="w-12 h-12 text-white/30" />
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-8 uppercase tracking-widest">The Propertyfie Way</h3>
              <ul className="space-y-6">
                {[
                  '100% Independence - Zero developer funding',
                  'Fiduciary duty to the client first',
                  'Deep AI-driven data verification on all projects',
                  'Lifetime asset management and rent tracking',
                  'Transparent success-based model'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <ShieldCheck className="w-5 h-5 text-green-400 shrink-0 mt-1" />
                    <span className="font-medium text-white/90">{item}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Vision Grid */}
      <section className="py-24 lg:py-40 bg-[#0a0a16] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {visionPoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <AnimatedSection key={point.title} delay={index * 0.2}>
                  <motion.div 
                    whileHover={{ y: -10 }}
                    className="h-full p-8 lg:p-10 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-sm relative group overflow-hidden"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${point.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${point.color} flex items-center justify-center mb-8 shadow-xl`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-display text-2xl font-bold mb-4">{point.title}</h3>
                    <p className="text-white/60 leading-relaxed text-lg">{point.description}</p>
                    
                    <motion.div 
                      className="mt-8 flex items-center gap-2 text-white/40 group-hover:text-white transition-colors"
                    >
                      <span className="text-xs font-bold uppercase tracking-widest">Learn More</span>
                      <ChevronRight className="w-4 h-4" />
                    </motion.div>
                  </motion.div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 lg:py-40 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <AnimatedSection>
            <div className="w-20 h-20 bg-blueprint-blue/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <Eye className="w-10 h-10 text-blueprint-blue" />
            </div>
            <h2 className="font-display text-4xl lg:text-6xl font-bold text-text-primary mb-8">
              Ready to invest with absolute clarity?
            </h2>
            <p className="text-text-secondary text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
              Experience the difference of a firm that works exclusively for you. 
              Let's build your property portfolio, together.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-10 py-5 bg-blueprint-blue text-white font-bold rounded-full hover:scale-105 transition-all shadow-xl shadow-blueprint-blue/30">
                Schedule a Consultation
              </button>
              <button className="px-10 py-5 bg-white text-text-primary font-bold rounded-full border border-gray-200 hover:bg-gray-50 transition-all">
                Download Perspective
              </button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default VisionPage;
