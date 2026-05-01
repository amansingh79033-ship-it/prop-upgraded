import { motion } from 'framer-motion';
import { AnimatedSection } from '../components/AnimatedSection';
import { NotchNavbar, Footer } from '../sections';
import { Shield, FileText, CheckCircle, AlertCircle } from 'lucide-react';

const sections = [
  {
    icon: FileText,
    title: '1. Acceptance of Terms',
    content: `By accessing and using Propertyfie AI's services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this service.

These terms may be modified at any time without prior notice. Your continued use of the platform after changes constitutes acceptance of the new terms.`
  },
  {
    icon: Shield,
    title: '2. User Responsibilities',
    content: `As a user of Propertyfie, you agree to:
• Provide accurate and complete information when creating an account
• Maintain the security of your account credentials
• Use the platform only for lawful purposes related to real estate
• Not attempt to gain unauthorized access to our systems
• Not interfere with the proper working of the platform
• Comply with all applicable laws and regulations`
  },
  {
    icon: CheckCircle,
    title: '3. Property Listings Accuracy',
    content: `While we strive for accuracy, Propertyfie does not guarantee the complete accuracy of property information displayed on the platform. Users should:
• Verify all property details independently before making decisions
• Conduct physical site visits
• Review all legal documents with qualified professionals
• Confirm pricing, availability, and specifications with builders`
  },
  {
    icon: AlertCircle,
    title: '4. Disclaimer of Warranties',
    content: `THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
• Merchantability or fitness for a particular purpose
• Accuracy or completeness of property information
• Availability of properties or specific units
• Builder delivery timelines or project completion dates`
  },
  {
    icon: Shield,
    title: '5. Limitation of Liability',
    content: `IN NO EVENT SHALL PROPERTYFIE AI BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION:
• Loss of profits, data, or business opportunities
• Personal injury or property damage
• Errors in property information or listings
• Unauthorized access to your personal information

Our total liability shall not exceed the amount paid by you, if any, for using the service.`
  },
  {
    icon: FileText,
    title: '6. Indemnification',
    content: `You agree to defend, indemnify and hold harmless Propertyfie AI and its officers, directors, employees, and agents from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses or fees arising from:
• Your violation of these Terms
• Your use of the Service
• Your misrepresentation or inaccuracy in provided information
• Your violation of any rights of another party`
  },
  {
    icon: Shield,
    title: '7. Governing Law',
    content: `These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of courts in Bangalore, Karnataka.

The United Nations Convention on Contracts for the International Sale of Goods does not apply to these terms.`
  },
  {
    icon: AlertCircle,
    title: '8. Changes to Service',
    content: `Propertyfie reserves the right to:
• Modify or discontinue any part of the service temporarily or permanently
• Change pricing, features, or availability at any time
• Remove or modify property listings without notice
• Terminate or suspend user accounts for violations

We will provide reasonable notice of significant changes where feasible.`
  },
];

export const TermsOfServicePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-editorial-ivory">
      <NotchNavbar />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <img
          src="/images/lifestyle-lake.jpg"
          alt="Terms of Service"
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
            Terms of Service
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

          {/* Contact Notice */}
          <AnimatedSection delay={0.4} className="mt-12">
            <div className="p-6 rounded-2xl bg-blueprint-blue/10 border border-blueprint-blue/20">
              <h3 className="font-display text-lg font-bold text-text-primary mb-2">
                Questions About These Terms?
              </h3>
              <p className="text-text-secondary text-sm mb-3">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-1 text-sm">
                <p className="text-text-secondary">Email: legal@propertyfie.com</p>
                <p className="text-text-secondary">Address: WeWork Hebbal, Bangalore, Karnataka 560024</p>
              </div>
            </div>
          </AnimatedSection>

          {/* Acceptance Notice */}
          <AnimatedSection delay={0.5}>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
              <h3 className="font-display text-xl font-bold text-text-primary mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                By Using Our Services
              </h3>
              <p className="text-text-secondary">
                You acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </main>

      <Footer />
    </div>
  );
};
