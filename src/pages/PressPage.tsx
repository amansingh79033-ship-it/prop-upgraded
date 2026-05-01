import { motion } from 'framer-motion';
import { AnimatedSection } from '../components/AnimatedSection';
import { NotchNavbar, Footer } from '../sections';
import { Newspaper, Mic, FileText, Download } from 'lucide-react';

const pressReleases = [
  {
    date: 'January 15, 2025',
    title: 'Propertyfie AI Raises $5M Series A to Expand Across India',
    summary: 'Funding led by Accel Partners will fuel expansion into Mumbai, Delhi, and Pune markets.',
    category: 'Funding'
  },
  {
    date: 'December 10, 2024',
    title: 'Propertyfie Launches AI-Powered Property Matching Engine',
    summary: 'New Sambanova-powered engine delivers 95% accuracy in matching buyers with their ideal properties.',
    category: 'Product Launch'
  },
  {
    date: 'November 5, 2024',
    title: 'Propertyfie Crosses 10,000 Property Listings Milestone',
    summary: 'Platform achieves major milestone just 12 months after launch in Bangalore market.',
    category: 'Company News'
  },
];

const mediaCoverage = [
  { source: 'Economic Times', title: 'How AI is Transforming Real Estate in India', date: 'Jan 2025', link: '#' },
  { source: 'YourStory', title: 'PropTech Startup Propertyfie Disrupts Traditional Real Estate', date: 'Dec 2024', link: '#' },
  { source: 'Inc42', title: 'Inside Propertyfie\'s Plan to Become India\'s Zillow', date: 'Nov 2024', link: '#' },
  { source: 'TechCrunch', title: 'Bangalore\'s Propertyfie Uses AI to Simplify Home Buying', date: 'Oct 2024', link: '#' },
];

export const PressPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-editorial-ivory">
      <NotchNavbar />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <img
          src="/images/builder-construction.jpg"
          alt="Press & Media"
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
            Press & Media
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-white/90 leading-relaxed"
          >
            Latest news, updates, and media coverage about Propertyfie
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Press Releases */}
          <AnimatedSection className="mb-20">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-text-primary mb-8 flex items-center gap-3">
              <Newspaper className="w-8 h-8 text-blueprint-blue" />
              Press Releases
            </h2>
            <div className="space-y-6">
              {pressReleases.map((release, index) => (
                <div key={index} className="p-8 rounded-2xl bg-white shadow-lg border border-gray-100">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <span className="px-3 py-1 rounded-full bg-blueprint-blue/10 text-blueprint-blue text-xs font-semibold uppercase tracking-wider mb-2 inline-block">
                        {release.category}
                      </span>
                      <h3 className="font-display text-2xl font-bold text-text-primary mb-2">
                        {release.title}
                      </h3>
                      <p className="text-text-secondary">{release.summary}</p>
                    </div>
                    <span className="text-text-secondary text-sm whitespace-nowrap">
                      {release.date}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-5 py-2 rounded-xl bg-blueprint-blue text-white font-medium text-sm hover:bg-blueprint-blue/90 transition-colors"
                    >
                      Read More
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-5 py-2 rounded-xl border border-gray-300 text-gray-700 font-medium text-sm hover:bg-gray-50 transition-colors flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download PDF
                    </motion.button>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Media Coverage */}
          <AnimatedSection className="mb-20">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-text-primary mb-8 flex items-center gap-3">
              <Mic className="w-8 h-8 text-blueprint-blue" />
              In The News
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {mediaCoverage.map((article, index) => (
                <a
                  key={index}
                  href={article.link}
                  className="p-6 rounded-2xl bg-white shadow-md border border-gray-100 hover:shadow-xl hover:border-blueprint-blue/30 transition-all group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="font-display text-lg font-bold text-text-primary group-hover:text-blueprint-blue transition-colors">
                      {article.source}
                    </span>
                    <span className="text-text-secondary text-sm">{article.date}</span>
                  </div>
                  <p className="text-text-secondary mb-4">{article.title}</p>
                  <span className="inline-flex items-center gap-2 text-blueprint-blue font-medium text-sm">
                    Read Article
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </a>
              ))}
            </div>
          </AnimatedSection>

          {/* Media Kit */}
          <AnimatedSection>
            <div className="p-8 rounded-3xl bg-gradient-to-br from-blueprint-blue/10 to-purple-500/10 border border-blueprint-blue/20">
              <h2 className="font-display text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                <FileText className="w-6 h-6 text-blueprint-blue" />
                Media Resources
              </h2>
              <p className="text-text-secondary mb-6">
                Download our brand assets, logos, and high-resolution images for press coverage.
              </p>
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blueprint-blue text-white font-semibold hover:bg-blueprint-blue/90 transition-colors"
              >
                <Download className="w-5 h-5" />
                Download Media Kit
              </motion.a>
            </div>
          </AnimatedSection>
        </div>
      </main>

      <Footer />
    </div>
  );
};
