import { motion } from 'framer-motion';
import { 
  Facebook, 
  Instagram,
  Linkedin, 
  ArrowUpRight,
  Heart,
  X,
  Building2,
  Home,
  Tag,
  HelpCircle,
  FileText,
  Shield,
  Users,
  Mic
} from 'lucide-react';
import { useState } from 'react';
import { PropertyDetailsModal } from '../components';

// Blog Modal Content Component with expandable articles
const BlogModalContent: React.FC = () => {
  const [expandedPost, setExpandedPost] = useState<number | null>(null);

  const blogPosts = [
    {
      id: 0,
      title: 'What to Check When Investing in Bangalore Real Estate?',
      tag: 'Investment Guide',
      excerpt: 'Essential checklist including RERA approval, land titles, bank approvals, and buyer rights.',
      content: `
        <p class="mb-4">Investing in Bangalore real estate requires careful due diligence. Here's your comprehensive checklist:</p>
        <h5 class="font-bold text-white mt-6 mb-3">1. RERA Approval</h5>
        <p class="mb-3">Always verify the project is registered under Karnataka RERA. Check the registration number on the official RERA website.</p>
        <ul class="list-disc list-inside space-y-2 mb-4">
          <li>Verify RERA registration number</li>
          <li>Check project approval status</li>
          <li>Review builder's track record</li>
          <li>Ensure all clearances are in place</li>
        </ul>
        <h5 class="font-bold text-white mt-6 mb-3">2. Land Title Verification</h5>
        <p class="mb-3">Ensure clear title deeds and no legal disputes. Get an advocate's opinion on title reports.</p>
        <h5 class="font-bold text-white mt-6 mb-3">3. Bank Approvals</h5>
        <p class="mb-3">Check if leading banks are willing to finance the project. This indicates the builder's credibility.</p>
        <h5 class="font-bold text-white mt-6 mb-3">4. Infrastructure Development</h5>
        <p class="mb-3">Research upcoming infrastructure projects in the area - metro lines, road widening, IT parks, etc.</p>
      `,
    },
    {
      id: 1,
      title: 'Your Property Selection Journey: Start to End',
      tag: 'Buyer Guide',
      excerpt: 'Complete guide from initial search to final registration with expert tips at every step.',
      content: `
        <p class="mb-4">Finding your dream property is a journey. Let us guide you through every step:</p>
        <h5 class="font-bold text-white mt-6 mb-3">Step 1: Define Your Requirements</h5>
        <p class="mb-3">List your must-haves: budget, location, size, amenities, proximity to work/schools.</p>
        <h5 class="font-bold text-white mt-6 mb-3">Step 2: Research & Shortlist</h5>
        <p class="mb-3">Use Propertyfie's AI-powered search to find properties matching your criteria. Compare prices, amenities, and locations.</p>
        <h5 class="font-bold text-white mt-6 mb-3">Step 3: Site Visits</h5>
        <p class="mb-3">Visit shortlisted properties. Check construction quality, surroundings, and speak to existing residents if possible.</p>
        <h5 class="font-bold text-white mt-6 mb-3">Step 4: Documentation & Registration</h5>
        <p class="mb-3">Our legal team helps with sale agreement, registration, and all paperwork for a hassle-free experience.</p>
      `,
    },
    {
      id: 2,
      title: 'How Propertyfie is Changing Real Estate with Tech',
      tag: 'PropTech',
      excerpt: 'Discover our AI-powered matching, regulatory intelligence, and virtual tour technology.',
      content: `
        <p class="mb-4">Technology is at the heart of Propertyfie's revolution in real estate:</p>
        <h5 class="font-bold text-white mt-6 mb-3">AI-Powered Property Matching</h5>
        <p class="mb-3">Our proprietary algorithm learns your preferences and shows you properties you'll actually love, saving hours of browsing.</p>
        <h5 class="font-bold text-white mt-6 mb-3">Regulatory Intelligence</h5>
        <p class="mb-3">Real-time RERA updates, price trend analysis, and legal verification - all automated.</p>
        <h5 class="font-bold text-white mt-6 mb-3">Virtual Tours & 3D Walkthroughs</h5>
        <p class="mb-3">Experience properties from your couch with our immersive 3D tours and video walkthroughs.</p>
        <h5 class="font-bold text-white mt-6 mb-3">Transparent Pricing</h5>
        <p class="mb-3">AI-driven valuations based on thousands of data points ensure you always get the fairest price.</p>
      `,
    },
  ];

  return (
    <div className="space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar pr-2">
      {blogPosts.map((post) => (
        <div
          key={post.id}
          onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
          className={`border border-white/20 rounded-lg p-4 transition-all cursor-pointer ${
            expandedPost === post.id 
              ? 'bg-white/10 border-purple-400/50' 
              : 'hover:border-purple-400/30 hover:bg-white/5'
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <span className="inline-block px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded mb-2 font-medium">
                {post.tag}
              </span>
              <h4 className="font-bold text-white text-base mb-2">{post.title}</h4>
              {expandedPost !== post.id && (
                <p className="text-sm text-white/80">{post.excerpt}</p>
              )}
              {expandedPost === post.id && (
                <div 
                  className="text-sm text-white/90 leading-relaxed mt-3 space-y-2"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              )}
            </div>
            <ArrowUpRight 
              className={`w-5 h-5 transition-all shrink-0 ${
                expandedPost === post.id 
                  ? 'text-purple-400 rotate-45' 
                  : 'text-white/40 group-hover:text-white/70'
              }`} 
            />
          </div>
          
          {/* Author Attribution - Only show when expanded */}
          {expandedPost === post.id && (
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AK</span>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Aman Kumar Singh</p>
                  <p className="text-white/60 text-xs">Director, Q-Re-Us-Minds Pvt Ltd</p>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
      
      {/* Read More CTA */}
      <div className="text-center pt-4 mt-4 border-t border-white/10">
        <a 
          href="#all-blogs" 
          className="inline-flex items-center gap-2 text-purple-300 hover:text-purple-200 text-sm font-medium transition-colors"
        >
          View All Articles
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

const footerLinks = {
  company: [
    { label: 'About Us', href: '#about', modal: 'about' },
    { label: 'Careers', href: '#careers', modal: 'careers' },
    { label: 'Press', href: '#press', modal: 'press' },
    { label: 'Blog', href: '#blog', modal: 'blog' },
    { label: 'Our Vision', href: '#vision' },
  ],
  properties: [
    { label: 'Buy', href: '#buy', modal: 'buy' },
    { label: 'Sell', href: '#sell', modal: 'sell' },
    { label: 'Valuation', href: '#valuation', modal: 'valuation' },
  ],
  support: [
    { label: 'Help Center', href: '#help', modal: 'help' },
    { label: 'Contact Us', href: '#contact-us', modal: 'contact' },
    { label: 'Privacy Policy', href: '#privacy', modal: 'privacy' },
    { label: 'Terms of Service', href: '#terms', modal: 'terms' },
  ],
};

const socialLinks = [
  { icon: Facebook, href: 'https://www.facebook.com/propertyfie', label: 'Facebook', hoverColor: 'hover:bg-blue-600' },
  { icon: X, href: 'https://twitter.com/propertyfie', label: 'X', hoverColor: 'hover:bg-black' },
  { icon: Instagram, href: 'https://www.instagram.com/propertyfie.in/', label: 'Instagram', hoverColor: 'hover:bg-[#E1306C]' },
  { icon: Linkedin, href: 'https://www.linkedin.com/company/propertyfie', label: 'LinkedIn', hoverColor: 'hover:bg-blue-700' },
];

export const Footer: React.FC = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const handleLinkClick = (e: React.MouseEvent, modalId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveModal(modalId);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  // Modal content configuration
  const modalContent: Record<string, { title: string; icon: any; content: React.ReactNode }> = {
    about: {
      title: 'About Propertyfie',
      icon: Building2,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Propertyfie is Bangalore's premier AI-powered real estate platform, revolutionizing property discovery since 2024.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Our Mission</h4>
              <p className="text-sm text-blue-700">Make property search simple, transparent, and enjoyable for everyone.</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Our Vision</h4>
              <p className="text-sm text-green-700">Become India's most trusted real estate brand by 2030.</p>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-semibold mb-3">Specialties</h4>
            <div className="flex flex-wrap gap-2">
              {['AI Matching', 'Regulatory Intelligence', 'Virtual Tours', 'End-to-End Support', 'Transparent Pricing', 'Legal Assistance'].map((tag) => (
                <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    blog: {
      title: 'Latest from Our Blog',
      icon: FileText,
      content: (
        <BlogModalContent />
      ),
    },
    help: {
      title: 'Help Center',
      icon: HelpCircle,
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
            <h3 className="font-semibold text-blue-900 mb-4 flex items-center gap-2">
              <Mic className="w-5 h-5" />
              Quick Response Team
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012 0C5.373 0 0 5.373 0 12c0 2.536.79 4.888 2.149 6.838L.5 24l5.29-1.392A11.992 11.992 0 0012 24c6.627 0 12-5.373 12-12 0-3.189-1.258-6.182-3.507-8.423z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">WhatsApp Us</p>
                  <p className="text-xs text-gray-600">Response time: {'<'}5 minutes</p>
                </div>
                <a href="https://wa.me/917970750727" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors">
                  Chat Now
                </a>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Email Us</p>
                  <p className="text-xs text-gray-600">Response time: {'<'}30 minutes</p>
                </div>
                <a href="mailto:info@propertyfie.com" className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
                  Send Email
                </a>
              </div>
            </div>
            <div className="mt-6 p-4 bg-white/60 rounded-lg border border-blue-100">
              <p className="text-sm text-gray-700 mb-2"><strong>Aman Kumar Sing</strong><br/><span className="text-xs text-gray-500">Head of Operations & Escalations</span></p>
              <p className="text-xs text-gray-600 italic">"I personally ensure every concern is addressed within minutes. Your trust is our foundation, and I'm here to maintain it 24/7."</p>
            </div>
          </div>
        </div>
      ),
    },
    buy: {
      title: 'Buy Properties',
      icon: Home,
      content: <div className="text-center py-8"><p className="text-gray-600">Browse our curated collection of premium properties in Bangalore.</p></div>,
    },
    sell: {
      title: 'Sell Your Property',
      icon: Tag,
      content: <div className="text-center py-8"><p className="text-gray-600">List your property with us and reach thousands of potential buyers.</p></div>,
    },
    valuation: {
      title: 'Property Valuation',
      icon: Building2,
      content: <div className="text-center py-8"><p className="text-gray-600">Get instant AI-powered valuation for your property based on real-time market data.</p></div>,
    },
    contact: {
      title: 'Contact Us',
      icon: HelpCircle,
      content: <div className="text-center py-8"><p className="text-gray-600">Reach out to us for any queries or assistance.</p></div>,
    },
    privacy: {
      title: 'Privacy Policy',
      icon: Shield,
      content: <div className="text-center py-8"><p className="text-gray-600">Your privacy is our priority. Learn how we protect your data.</p></div>,
    },
    terms: {
      title: 'Terms of Service',
      icon: FileText,
      content: <div className="text-center py-8"><p className="text-gray-600">Review our terms and conditions for using our services.</p></div>,
    },
    careers: {
      title: 'Careers',
      icon: Users,
      content: <div className="text-center py-8"><p className="text-gray-600">Join our team and help revolutionize the real estate industry.</p></div>,
    },
    press: {
      title: 'Press & Media',
      icon: FileText,
      content: <div className="text-center py-8"><p className="text-gray-600">Latest news and media coverage about Propertyfie.</p></div>,
    },
  };

  return (
    <footer className="bg-text-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-8 lg:mb-0">
            <a href="#home" className="inline-block mb-4">
              <span className="font-display text-2xl font-bold">Propertyfie</span>
            </a>
            <p className="text-white/60 text-sm mb-6 max-w-xs">
              AI-powered real estate platform helping you find your perfect 
              property in Bangalore.
            </p>

            <div className="text-white/60 text-xs space-y-2 mb-6">
              <p>📍 WeWork, Hebbal, Bangalore</p>
              <p>📧 info@propertyfie.com</p>
              <p>📞 +91 7970750727</p>
            </div>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-all ${social.hoverColor}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => link.modal ? handleLinkClick(e, link.modal) : null}
                    className="text-white/60 hover:text-white transition-colors text-sm inline-flex items-center gap-1 group cursor-pointer"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Properties Links */}
          <div>
            <h4 className="font-semibold mb-4">Properties</h4>
            <ul className="space-y-3">
              {footerLinks.properties.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => link.modal ? handleLinkClick(e, link.modal) : null}
                    className="text-white/60 hover:text-white transition-colors text-sm inline-flex items-center gap-1 group cursor-pointer"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => link.modal ? handleLinkClick(e, link.modal) : null}
                    className="text-white/60 hover:text-white transition-colors text-sm inline-flex items-center gap-1 group cursor-pointer"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-2 lg:col-span-1">
            <h4 className="font-semibold mb-4">Stay Updated</h4>
            <p className="text-white/60 text-sm mb-4">
              Subscribe to get the latest property updates.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 text-sm"
              />
              <motion.button
                type="submit"
                className="px-4 py-2 rounded-lg bg-coral-accent text-white font-medium text-sm hover:bg-coral-accent/90 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Q-Re-Us-Minds Pvt Ltd. All rights reserved.
          </p>
          <p className="text-white/40 text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-coral-accent fill-current" /> with pride in Saharsa, Bihar 🙏
          </p>
        </div>

        {/* Footer Modals */}
        {activeModal && modalContent[activeModal] && (
          <PropertyDetailsModal
            onClose={closeModal}
            property={{
              id: 0,
              title: modalContent[activeModal].title,
              developer: 'Propertyfie',
              location: 'Bangalore',
              price: '₹0',
              priceValue: 0,
              pricePerSqft: '₹0/sqft',
              beds: 0,
              baths: 0,
              sqft: 0,
              image: '',
              tag: '',
              rera: '',
              roi: '0%',
              description: '',
              amenities: [],
              possession: '',
              status: 'Ready to Move',
              nearbyPlaces: [],
              floorPlanImages: [],
              gallery: [],
            }}
            content={modalContent[activeModal].content}
          />
        )}
      </div>
    </footer>
  );
};

export default Footer;
