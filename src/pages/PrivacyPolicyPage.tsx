import { motion } from 'framer-motion';
import { AnimatedSection } from '../components/AnimatedSection';
import { NotchNavbar, Footer } from '../sections';
import { Shield, Eye, Lock, FileText, Mail } from 'lucide-react';

const sections = [
  {
    icon: FileText,
    title: '1. Information We Collect',
    content: `We collect information that you provide directly to us when you:
• Create an account or profile
• Search for properties
• Contact property owners or agents
• Subscribe to our newsletter
• Use our AI property search feature
• Communicate with our customer support

The information we collect may include:
• Personal details (name, email, phone number)
• Property preferences and search criteria
• Location data (with your permission)
• Communication preferences
• Transaction history`
  },
  {
    icon: Eye,
    title: '2. How We Use Your Information',
    content: `We use the collected information to:
• Provide, maintain, and improve our services
• Match you with suitable properties using AI
• Send you property recommendations and updates
• Respond to your inquiries and provide support
• Analyze usage patterns and trends
• Protect against fraudulent activities
• Comply with legal obligations

We process your data based on:
• Your consent
• Contract performance
• Legitimate business interests
• Legal requirements`
  },
  {
    icon: Lock,
    title: '3. Data Security',
    content: `We implement appropriate technical and organizational measures to protect your personal information:
• Encryption of data in transit and at rest
• Regular security audits and assessments
• Access controls and authentication
• Secure servers and infrastructure
• Employee training on data protection
• Incident response procedures

While we strive to protect your data, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.`
  },
  {
    icon: Shield,
    title: '4. Your Rights',
    content: `You have the following rights regarding your personal data:
• Right to access your data
• Right to rectification of inaccurate data
• Right to erasure ('right to be forgotten')
• Right to restrict processing
• Right to data portability
• Right to object to processing
• Right to withdraw consent at any time
• Right to lodge a complaint with supervisory authority

To exercise these rights, contact us at privacy@propertyfie.com`
  },
  {
    icon: Mail,
    title: '5. Third-Party Services',
    content: `We may share your information with:
• Property developers and builders (for property matching)
• Service providers (hosting, analytics, payment processing)
• Legal authorities (when required by law)
• Business partners (with your explicit consent)

All third parties are bound by confidentiality obligations and must comply with data protection regulations.`
  },
  {
    icon: FileText,
    title: '6. Cookies & Tracking',
    content: `We use cookies and similar tracking technologies to:
• Remember your preferences
• Understand how you use our website
• Improve user experience
• Deliver targeted advertisements

You can control cookie settings through your browser. Disabling cookies may affect website functionality.`
  },
  {
    icon: Shield,
    title: '7. Data Retention',
    content: `We retain your personal information only for as long as necessary:
• Active accounts: Duration of account existence
• Inactive accounts: Up to 3 years after last activity
• Transaction data: As required by law (typically 7 years)
• Marketing data: Until you unsubscribe

After the retention period, data is securely deleted or anonymized.`
  },
  {
    icon: Mail,
    title: '8. Contact Us',
    content: `For any questions about this Privacy Policy or our data practices:

Email: privacy@propertyfie.com
Address: Data Protection Officer
         Propertyfie AI
         WeWork Hebbal, Bangalore
         Karnataka 560024, India

We respond to all privacy-related inquiries within 30 days.`
  },
];

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-editorial-ivory">
      <NotchNavbar />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <img
          src="/images/hero-interior.jpg"
          alt="Privacy Policy"
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
            Privacy Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-white/90 leading-relaxed"
          >
            Last updated: January 2025
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <AnimatedSection key={section.title} delay={index * 0.1}>
                  <div className="p-8 rounded-3xl bg-white shadow-lg">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-blueprint-blue/10 flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6 text-blueprint-blue" />
                      </div>
                      <h2 className="font-display text-2xl font-bold text-text-primary">
                        {section.title}
                      </h2>
                    </div>
                    <div className="prose prose-blue max-w-none">
                      {section.content.split('\n').map((paragraph, idx) => (
                        <p key={idx} className={`text-text-secondary ${paragraph.startsWith('•') ? 'ml-4' : ''}`}>
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>

          {/* Update Notice */}
          <AnimatedSection delay={0.4} className="mt-12">
            <div className="p-6 rounded-2xl bg-blueprint-blue/10 border border-blueprint-blue/20">
              <h3 className="font-display text-lg font-bold text-text-primary mb-2">
                Updates to This Policy
              </h3>
              <p className="text-text-secondary text-sm">
                We may update this policy periodically. We'll notify you of significant changes via email or website notice. 
                Continued use of our services after changes constitutes acceptance of the new terms.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </main>

      <Footer />
    </div>
  );
};
