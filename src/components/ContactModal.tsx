import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, X, Send, User, FileText } from 'lucide-react';
import type { PanInfo } from 'framer-motion';
import { useModalScrollLock, useModalKeyboardNavigation } from '../hooks/useModalScrollLock';

// Helper for pinch zoom
const calculatePinchScale = (currentScale: number, delta: number): number => {
  return Math.min(Math.max(currentScale + delta, 0.8), 1.2);
};

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [concern, setConcern] = useState('');
  const [step, setStep] = useState<'form' | 'redirecting'>('form');
  const [scale, setScale] = useState(1);

  // Lock body scroll and enable ESC to close
  useModalScrollLock(isOpen);
  useModalKeyboardNavigation(onClose);

  const handleDragEnd = (_: any, info: PanInfo) => {
    // Close modal only if dragged significantly with enough velocity
    const dragThreshold = 150;
    const minVelocity = 0.2;
    
    // Check both distance and velocity to prevent accidental closures
    const draggedFarEnough = Math.abs(info.offset.y) > dragThreshold;
    const hasEnoughVelocity = Math.abs(info.velocity.y) > minVelocity;
    
    // Only close if both conditions are met OR if dragged very far
    if ((draggedFarEnough && hasEnoughVelocity) || Math.abs(info.offset.y) > 300) {
      onClose();
    }
    // Otherwise, let the modal snap back to center (Framer Motion handles this automatically)
  };

  const handleWhatsAppRedirect = () => {
    if (!name.trim() || !concern.trim()) return;
    
    setStep('redirecting');
    
    // Format message for WhatsApp
    const message = `Hi, I'm ${name}. ${concern}`;
    const encodedMessage = encodeURIComponent(message);
    
    // Official number (replace with actual number)
    const phoneNumber = '919876543210'; // Format: 91XXXXXXXXXX
    
    // Redirect to WhatsApp
    setTimeout(() => {
      window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
      // Reset and close
      setTimeout(() => {
        setName('');
        setConcern('');
        setStep('form');
        onClose();
      }, 1000);
    }, 800);
  };

  const handleDirectCall = () => {
    // Direct call using tel: protocol
    window.location.href = 'tel:+919876543210';
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: scale, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            drag={true}
            dragConstraints={{ top: -50, bottom: 50, left: 0, right: 0 }}
            dragElastic={0.7}
            onDragEnd={handleDragEnd}
            onWheel={(e) => {
              // Zoom with mouse wheel (desktop)
              const delta = e.deltaY * 0.001;
              setScale(calculatePinchScale(scale, -delta));
            }}
            onTouchStart={(e) => {
              // Store initial pinch distance
              if (e.touches.length === 2) {
                const touch1 = e.touches[0];
                const touch2 = e.touches[1];
                const initialDistance = Math.hypot(
                  touch2.clientX - touch1.clientX,
                  touch2.clientY - touch1.clientY
                );
                (e.currentTarget as any)._initialPinchDistance = initialDistance;
                (e.currentTarget as any)._initialScale = scale;
              }
            }}
            onTouchMove={(e) => {
              // Handle pinch zoom
              if (e.touches.length === 2) {
                const touch1 = e.touches[0];
                const touch2 = e.touches[1];
                const currentDistance = Math.hypot(
                  touch2.clientX - touch1.clientX,
                  touch2.clientY - touch1.clientY
                );
                const initialDistance = (e.currentTarget as any)._initialPinchDistance || currentDistance;
                const initialScale = (e.currentTarget as any)._initialScale || 1;
                const scaleChange = currentDistance / initialDistance;
                setScale(Math.min(Math.max(initialScale * scaleChange, 0.8), 1.2));
              }
            }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50 px-4 cursor-grab active:cursor-grabbing"
            style={{ 
              touchAction: 'pan-y',
              transformOrigin: 'center center'
            }}
          >
            <div 
              className="bg-white rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh]"
              data-lenis-prevent
              data-modal="true"
            >
              {/* Header */}
              <div className="relative bg-gradient-to-r from-blue-600 to-blue-500 p-6">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
                
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Chat with Us</h3>
                    <p className="text-blue-100 text-sm">Get instant assistance on WhatsApp</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              {step === 'form' ? (
                <div className="p-6 space-y-4">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4 inline-block mr-1" />
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Concern Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FileText className="w-4 h-4 inline-block mr-1" />
                      Your Requirement
                    </label>
                    <textarea
                      value={concern}
                      onChange={(e) => setConcern(e.target.value)}
                      placeholder="I'm looking for a 3 BHK in Devanahalli..."
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Action Button */}
                  <motion.button
                    onClick={handleWhatsAppRedirect}
                    disabled={!name.trim() || !concern.trim()}
                    className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Continue on WhatsApp</span>
                    <Send className="w-5 h-5" />
                  </motion.button>

                  {/* Divider */}
                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-gray-500">or</span>
                    </div>
                  </div>

                  {/* Direct Call Button */}
                  <motion.button
                    onClick={handleDirectCall}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Phone className="w-5 h-5" />
                    <span>Call Now</span>
                  </motion.button>

                  {/* Trust Indicators */}
                  <div className="pt-4 text-center">
                    <p className="text-xs text-gray-500">
                      🔒 Your information is secure • Response within 24 hours
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      Redirecting to WhatsApp...
                    </h4>
                    <p className="text-gray-600">
                      Please wait while we connect you
                    </p>
                  </motion.div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
