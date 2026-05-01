import { motion } from 'framer-motion';
import { AnimatedSection } from '../components/AnimatedSection';
import { NotchNavbar, Footer } from '../sections';
import { FileText, Search } from 'lucide-react';

const blogPosts = [
  {
    category: 'Market Insights',
    title: 'Bangalore Real Estate Trends 2025: What Buyers Need to Know',
    excerpt: 'Discover the top emerging neighborhoods, price trends, and investment opportunities shaping Bangalore property market this year.',
    author: 'Rajesh Kumar',
    date: 'January 20, 2025',
    readTime: '8 min read',
    image: '/images/hero-interior.jpg'
  },
  {
    category: 'Buying Guide',
    title: 'First-Time Home Buyer Complete Checklist',
    excerpt: 'Everything you need to know about buying your first home in India - from budgeting to registration.',
    author: 'Priya Sharma',
    date: 'January 18, 2025',
    readTime: '12 min read',
    image: '/images/lifestyle-lake.jpg'
  },
  {
    category: 'Investment',
    title: 'Why North Bangalore is the Next Big Investment Hub',
    excerpt: 'With the airport corridor developing rapidly, discover why Devanahalli and surrounding areas offer exceptional ROI.',
    author: 'Amit Patel',
    date: 'January 15, 2025',
    readTime: '6 min read',
    image: '/images/spotlight-exterior.jpg'
  },
  {
    category: 'Technology',
    title: 'How AI is Revolutionizing Property Search in India',
    excerpt: 'Learn how artificial intelligence is making property search faster, smarter, and more personalized.',
    author: 'Sneha Reddy',
    date: 'January 12, 2025',
    readTime: '7 min read',
    image: '/images/amenities-park.jpg'
  },
];

const categories = [
  { name: 'Market Insights', count: 24 },
  { name: 'Buying Guide', count: 18 },
  { name: 'Investment Tips', count: 15 },
  { name: 'Technology', count: 12 },
  { name: 'Legal & Finance', count: 10 },
  { name: 'Lifestyle', count: 8 },
];

export const BlogPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-editorial-ivory">
      <NotchNavbar />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <img
          src="/images/neighborhood-lake.jpg"
          alt="Propertyfie Blog"
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
            Our Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-white/90 leading-relaxed"
          >
            Expert insights, guides, and the latest real estate news
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Blog Posts */}
            <div className="lg:col-span-2 space-y-8">
              {blogPosts.map((post, index) => (
                <AnimatedSection key={post.title} delay={index * 0.1}>
                  <article className="flex flex-col sm:flex-row gap-6 p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all group cursor-pointer">
                    <div className="sm:w-48 h-48 shrink-0 rounded-xl overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1">
                      <span className="px-3 py-1 rounded-full bg-blueprint-blue/10 text-blueprint-blue text-xs font-semibold uppercase tracking-wider mb-3 inline-block">
                        {post.category}
                      </span>
                      <h2 className="font-display text-xl font-bold text-text-primary mb-2 group-hover:text-blueprint-blue transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-text-secondary mb-4 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center gap-4 text-sm text-text-secondary">
                        <span className="font-medium">{post.author}</span>
                        <span>•</span>
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </article>
                </AnimatedSection>
              ))}

              {/* Load More */}
              <AnimatedSection>
                <div className="text-center pt-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 rounded-xl bg-blueprint-blue text-white font-semibold hover:bg-blueprint-blue/90 transition-colors"
                  >
                    Load More Articles
                  </motion.button>
                </div>
              </AnimatedSection>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Search */}
              <AnimatedSection>
                <div className="p-6 rounded-2xl bg-white shadow-lg">
                  <h3 className="font-display text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
                    <Search className="w-5 h-5 text-blueprint-blue" />
                    Search Articles
                  </h3>
                  <input
                    type="text"
                    placeholder="Search topics..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blueprint-blue focus:ring-2 focus:ring-blueprint-blue/20 outline-none transition-all"
                  />
                </div>
              </AnimatedSection>

              {/* Categories */}
              <AnimatedSection delay={0.1}>
                <div className="p-6 rounded-2xl bg-white shadow-lg">
                  <h3 className="font-display text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blueprint-blue" />
                    Categories
                  </h3>
                  <ul className="space-y-3">
                    {categories.map((category) => (
                      <li key={category.name}>
                        <a href="#" className="flex items-center justify-between group">
                          <span className="text-text-secondary group-hover:text-blueprint-blue transition-colors">
                            {category.name}
                          </span>
                          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                            {category.count}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>

              {/* Newsletter */}
              <AnimatedSection delay={0.2}>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-blueprint-blue/10 to-purple-500/10 border border-blueprint-blue/20">
                  <h3 className="font-display text-lg font-bold text-text-primary mb-2">
                    Subscribe to Our Newsletter
                  </h3>
                  <p className="text-text-secondary text-sm mb-4">
                    Get the latest insights delivered to your inbox weekly.
                  </p>
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 mb-3 focus:border-blueprint-blue outline-none text-sm"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-2 rounded-lg bg-blueprint-blue text-white font-semibold text-sm hover:bg-blueprint-blue/90 transition-colors"
                  >
                    Subscribe
                  </motion.button>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
