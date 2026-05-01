import { motion } from 'framer-motion';
import { AnimatedSection } from '../components/AnimatedSection';
import { NotchNavbar, Footer } from '../sections';
import { Search, MessageCircle, Phone, Mail, BookOpen, HelpCircle, ChevronRight } from 'lucide-react';

const faqCategories = [
  {
    icon: Home,
    title: 'Buying a Property',
    count: 24,
    questions: ['How do I book a site visit?', 'What documents are needed for booking?', 'Can I get a home loan?']
  },
  {
    icon: MessageCircle,
    title: 'Account & Profile',
    count: 15,
    questions: ['How to create an account?', 'How to update my profile?', 'Forgot password recovery']
  },
  {
    icon: BookOpen,
    title: 'Legal & Documentation',
    count: 18,
    questions: ['What is RERA registration?', 'Property registration process', 'Stamp duty charges']
  },
  {
    icon: HelpCircle,
    title: 'General Queries',
    count: 32,
    questions: ['How does AI search work?', 'Are listings verified?', 'Contact customer support']
  },
];

const popularFAQs = [
  {
    question: 'How do I schedule a property site visit?',
    answer: 'You can schedule a site visit directly from any property listing page. Click on the "Book Site Visit" button, choose your preferred date and time, and our team will confirm your appointment within 2 hours.'
  },
  {
    question: 'What is the booking amount for properties?',
    answer: 'The booking amount typically ranges from ₹50,000 to ₹5,00,000 depending on the property value and builder policies. This amount is refundable as per terms and conditions.'
  },
  {
    question: 'Do you help with home loans?',
    answer: 'Yes! We have tie-ups with leading banks like HDFC, SBI, ICICI, and Axis Bank. Our relationship managers will guide you through the entire loan application process at no extra cost.'
  },
  {
    question: 'Are all property listings verified?',
    answer: 'Absolutely! Every listing on Propertyfie goes through a rigorous verification process including document checks, site visits by our team, and RERA compliance verification.'
  },
];

import { Home } from 'lucide-react';

export const HelpCenterPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-editorial-ivory">
      <NotchNavbar />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <img
          src="/images/amenities-park.jpg"
          alt="Help Center"
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
            Help Center
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-white/90 leading-relaxed mb-8"
          >
            Find answers to common questions and get support
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white p-4 rounded-2xl shadow-2xl max-w-2xl mx-auto"
          >
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for help articles, guides, FAQs..."
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
          {/* FAQ Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {faqCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <AnimatedSection key={category.title} delay={index * 0.1}>
                  <div className="p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all cursor-pointer group">
                    <div className="w-14 h-14 rounded-2xl bg-blueprint-blue/10 flex items-center justify-center mb-4 group-hover:bg-blueprint-blue/20 transition-colors">
                      <Icon className="w-7 h-7 text-blueprint-blue" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-text-primary mb-2">
                      {category.title}
                    </h3>
                    <p className="text-text-secondary text-sm mb-3">{category.count} articles</p>
                    <ul className="space-y-2">
                      {category.questions.slice(0, 2).map((q, idx) => (
                        <li key={idx} className="text-xs text-text-secondary flex items-center gap-1">
                          <ChevronRight className="w-3 h-3 text-blueprint-blue" />
                          {q}
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>

          {/* Popular FAQs */}
          <AnimatedSection className="mb-20">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-text-primary mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {popularFAQs.map((faq, index) => (
                <details
                  key={index}
                  className="group p-6 rounded-2xl bg-white shadow-md border border-gray-100 cursor-pointer"
                >
                  <summary className="flex items-center justify-between font-semibold text-text-primary list-none">
                    {faq.question}
                    <ChevronRight className="w-5 h-5 transform group-open:rotate-90 transition-transform text-blueprint-blue" />
                  </summary>
                  <p className="mt-4 text-text-secondary leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </AnimatedSection>

          {/* Contact Support */}
          <AnimatedSection>
            <div className="rounded-3xl bg-gradient-to-br from-blueprint-blue/10 to-purple-500/10 border border-blueprint-blue/20 p-8 lg:p-12">
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-text-primary text-center mb-8">
                Still Need Help?
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <a href="tel:+917970750727" className="p-6 rounded-2xl bg-white shadow-lg text-center hover:shadow-xl transition-all group">
                  <Phone className="w-8 h-8 text-blueprint-blue mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-display text-lg font-bold text-text-primary mb-1">Call Us</h3>
                  <p className="text-text-secondary text-sm">+91 7970750727</p>
                  <p className="text-xs text-gray-500 mt-1">Mon-Sat, 9AM-6PM</p>
                </a>
                <a href="mailto:support@propertyfie.com" className="p-6 rounded-2xl bg-white shadow-lg text-center hover:shadow-xl transition-all group">
                  <Mail className="w-8 h-8 text-blueprint-blue mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-display text-lg font-bold text-text-primary mb-1">Email Us</h3>
                  <p className="text-text-secondary text-sm">support@propertyfie.com</p>
                  <p className="text-xs text-gray-500 mt-1">24/7 Email Support</p>
                </a>
                <a href="#chat" className="p-6 rounded-2xl bg-white shadow-lg text-center hover:shadow-xl transition-all group">
                  <MessageCircle className="w-8 h-8 text-blueprint-blue mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-display text-lg font-bold text-text-primary mb-1">Live Chat</h3>
                  <p className="text-text-secondary text-sm">Chat with expert</p>
                  <p className="text-xs text-gray-500 mt-1">Average response: 2 min</p>
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </main>

      <Footer />
    </div>
  );
};
