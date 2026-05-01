import { useState } from 'react';
import { motion } from 'framer-motion';
import { AnimatedSection } from '../components/AnimatedSection';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Clock,
  CheckCircle2 
} from 'lucide-react';

const contactInfo = [
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 7970750727',
    href: 'tel:+917970750727',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'info@propertyfie.com',
    href: 'mailto:info@propertyfie.com',
  },
  {
    icon: MapPin,
    label: 'Address',
    value: 'WeWork, Hebbal, Bangalore',
    href: '#',
  },
  {
    icon: Clock,
    label: 'Working Hours',
    value: 'Mon - Sat: 9AM - 7PM',
    href: '#',
  },
];

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // WhatsApp Configuration - Replace with your actual WhatsApp number
  const WHATSAPP_NUMBER = '917970750727'; // Format: Country code + Number (no + or spaces)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create WhatsApp message
    const whatsappMessage = `
*New Property Inquiry* 🏠

*Name:* ${formData.name}
*Phone:* ${formData.phone || 'Not provided'}
*Email:* ${formData.email}
*Message:* ${formData.message}

---
Sent via Propertyfie.com
    `.trim();

    // Encode message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Small delay to show loading state
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Reset form after successful submission
    setIsSubmitting(false);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="py-20 lg:py-32 bg-editorial-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-12 lg:mb-16 px-4">
          <span className="label-mono text-blueprint-blue mb-4 block">
            Get in Touch
          </span>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-text-primary mb-4">
            Let&apos;s Start Your Journey
          </h2>
          <p className="text-text-secondary text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Have questions? We&apos;re here to help. Reach out to our team 
            and we&apos;ll get back to you within 24 hours.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <AnimatedSection>
            <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg">
              <h3 className="font-display text-xl sm:text-2xl font-semibold text-text-primary mb-4 sm:mb-6">
                Send us a Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blueprint-blue focus:ring-2 focus:ring-blueprint-blue/20 outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blueprint-blue focus:ring-2 focus:ring-blueprint-blue/20 outline-none transition-all"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blueprint-blue focus:ring-2 focus:ring-blueprint-blue/20 outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blueprint-blue focus:ring-2 focus:ring-blueprint-blue/20 outline-none transition-all resize-none"
                    placeholder="Tell us about your property requirements..."
                  />
                </div>
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                    isSubmitting
                      ? 'bg-green-500 text-white'
                      : 'bg-blueprint-blue text-white hover:bg-blue-700'
                  }`}
                  whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
                >
                  {isSubmitting ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Opening WhatsApp...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </AnimatedSection>

          {/* Contact Info */}
          <AnimatedSection delay={0.2}>
            <div className="space-y-8">
              <div>
                <h3 className="font-display text-2xl font-semibold text-text-primary mb-6">
                  Contact Information
                </h3>
                <p className="text-text-secondary mb-8">
                  Our team is ready to assist you with any inquiries about 
                  properties, services, or partnership opportunities.
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <motion.a
                      key={info.label}
                      href={info.href}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 p-4 rounded-xl bg-white hover:shadow-md transition-shadow group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-blueprint-blue/10 flex items-center justify-center group-hover:bg-blueprint-blue group-hover:text-white transition-colors text-blueprint-blue">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm text-text-secondary">{info.label}</div>
                        <div className="font-medium text-text-primary">{info.value}</div>
                      </div>
                    </motion.a>
                  );
                })}
              </div>

              {/* Map Placeholder */}
              <div className="rounded-2xl overflow-hidden h-64 bg-gray-200 relative">
                <img
                  src="/images/builder-construction.jpg"
                  alt="Office location"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <div className="text-white">
                    <div className="font-semibold">Visit Our Office</div>
                    <div className="text-sm text-white/80">WeWork, Hebbal, Bangalore</div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Contact;
