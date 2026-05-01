import { motion } from 'framer-motion';
import { AnimatedSection } from '../components/AnimatedSection';
import { NotchNavbar, Footer } from '../sections';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Us',
    details: ['WeWork Hebbal', 'Bangalore, Karnataka 560024', 'India']
  },
  {
    icon: Phone,
    title: 'Call Us',
    details: ['+91 7970750727', 'Mon-Sat 9AM-6PM IST']
  },
  {
    icon: Mail,
    title: 'Email Us',
    details: ['info@propertyfie.com', 'support@propertyfie.com']
  },
  {
    icon: Clock,
    title: 'Working Hours',
    details: ['Monday - Saturday: 9AM - 6PM', 'Sunday: By appointment']
  },
];

const teamContacts = [
  { name: 'Rajesh Kumar', role: 'Sales Director', email: 'rajesh@propertyfie.com', phone: '+91 98765 43210' },
  { name: 'Priya Sharma', role: 'Customer Success', email: 'priya@propertyfie.com', phone: '+91 98765 43211' },
  { name: 'Amit Patel', role: 'Technical Support', email: 'amit@propertyfie.com', phone: '+91 98765 43212' },
];

export const ContactUsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-editorial-ivory">
      <NotchNavbar />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <img
          src="/images/spotlight-exterior.jpg"
          alt="Contact Us"
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
            Get In Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-white/90 leading-relaxed"
          >
            We're here to help you find your dream property
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <AnimatedSection key={info.title} delay={index * 0.1}>
                  <div className="p-6 rounded-2xl bg-white shadow-lg text-center">
                    <div className="w-14 h-14 rounded-2xl bg-blueprint-blue/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-7 h-7 text-blueprint-blue" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-text-primary mb-3">
                      {info.title}
                    </h3>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-text-secondary text-sm mb-1">
                        {detail}
                      </p>
                    ))}
                  </div>
                </AnimatedSection>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <AnimatedSection>
              <div className="p-8 rounded-3xl bg-white shadow-xl">
                <h2 className="font-display text-3xl font-bold text-text-primary mb-6">
                  Send us a Message
                </h2>
                <form className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blueprint-blue focus:ring-2 focus:ring-blueprint-blue/20 outline-none transition-all"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blueprint-blue focus:ring-2 focus:ring-blueprint-blue/20 outline-none transition-all"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blueprint-blue focus:ring-2 focus:ring-blueprint-blue/20 outline-none transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blueprint-blue focus:ring-2 focus:ring-blueprint-blue/20 outline-none transition-all"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Subject *
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blueprint-blue focus:ring-2 focus:ring-blueprint-blue/20 outline-none transition-all"
                    >
                      <option value="">Select a subject</option>
                      <option value="buying">Buying a Property</option>
                      <option value="selling">Selling a Property</option>
                      <option value="renting">Renting a Property</option>
                      <option value="support">Technical Support</option>
                      <option value="other">Other Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blueprint-blue focus:ring-2 focus:ring-blueprint-blue/20 outline-none transition-all resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 rounded-xl bg-blueprint-blue text-white font-semibold hover:bg-blueprint-blue/90 transition-colors"
                  >
                    Send Message
                  </motion.button>
                </form>
              </div>
            </AnimatedSection>

            {/* Team Contacts */}
            <div className="space-y-8">
              <AnimatedSection>
                <h2 className="font-display text-3xl font-bold text-text-primary mb-6">
                  Our Team
                </h2>
                <div className="space-y-4">
                  {teamContacts.map((member, index) => (
                    <div key={index} className="p-6 rounded-2xl bg-white shadow-md border border-gray-100">
                      <h3 className="font-display text-xl font-bold text-text-primary mb-1">
                        {member.name}
                      </h3>
                      <p className="text-blueprint-blue text-sm font-medium mb-3">{member.role}</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-text-secondary text-sm">
                          <Mail className="w-4 h-4" />
                          <a href={`mailto:${member.email}`} className="hover:text-blueprint-blue transition-colors">
                            {member.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-text-secondary text-sm">
                          <Phone className="w-4 h-4" />
                          <a href={`tel:${member.phone}`} className="hover:text-blueprint-blue transition-colors">
                            {member.phone}
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-blueprint-blue/10 to-purple-500/10 border border-blueprint-blue/20">
                  <h3 className="font-display text-xl font-bold text-text-primary mb-3">
                    Need Immediate Assistance?
                  </h3>
                  <p className="text-text-secondary mb-4">
                    Call our 24/7 helpline for urgent queries
                  </p>
                  <a
                    href="tel:+917970750727"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blueprint-blue text-white font-semibold hover:bg-blueprint-blue/90 transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    +91 7970750727
                  </a>
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
