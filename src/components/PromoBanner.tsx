import { motion } from 'framer-motion';
import { Gift, Smartphone, Sparkles, Trophy } from 'lucide-react';

interface PromoBannerProps {
  variant?: 'hero' | 'features';
  size?: 'small' | 'medium' | 'large';
}

export const PromoBanner: React.FC<PromoBannerProps> = ({ variant = 'hero', size = 'medium' }) => {
  if (variant === 'hero') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative mb-6 sm:mb-8"
      >
        {/* Animated Border Glow - Orange Theme */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 rounded-xl blur opacity-30 animate-pulse" />
        
        {/* Main Banner - Orange Theme */}
        <div className="relative bg-gradient-to-r from-orange-500/20 via-orange-600/20 to-red-500/20 backdrop-blur-sm border border-orange-500/50 rounded-xl p-2 sm:p-3 overflow-hidden">
          {/* Floating Icons - Light Green */}
          <motion.div
            className="absolute top-1 right-2 sm:top-2 sm:right-3"
            animate={{ rotate: [0, 10, -10, 0], y: [0, -3, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-400" />
          </motion.div>
          
          <motion.div
            className="absolute bottom-1 left-2 sm:bottom-2 sm:left-3"
            animate={{ rotate: [0, -10, 10, 0], y: [0, 3, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <Gift className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-500" />
          </motion.div>

          {/* Content */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 relative z-10">
            {/* iPhone Icon - Light Green */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.5, type: 'spring' }}
              className="p-1.5 sm:p-2 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg shadow-md shrink-0"
            >
              <Smartphone className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white" />
            </motion.div>

            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-xs sm:text-sm text-white leading-tight">
                First property with Propertyfie?{' '}
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-full font-bold text-[10px] sm:text-xs shadow-sm">
                  <Trophy className="w-3 h-3" />
                  iPhone 17 on us!
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-white/90 leading-tight mt-0.5">
                Your color, your call. Also valid!
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Features variant - Updated with platform colors and size variants
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`relative ${size === 'small' ? 'py-8 sm:py-12' : 'py-12 sm:py-16'} px-4 sm:px-6 lg:px-8`}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50 rounded-3xl" />
      
      {/* Decorative Elements - Platform Colors */}
      <motion.div
        className="absolute top-0 right-0 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-64 h-64 bg-green-200/30 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className={`${size === 'small' ? 'grid sm:grid-cols-2 gap-6' : 'grid lg:grid-cols-2 gap-8'} items-center`}>
          {/* Left: Text Content */}
          <div className={`${size === 'small' ? 'text-center sm:text-left' : 'text-center lg:text-left'}`}>
            {/* iPhone Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: 'spring', bounce: 0.5 }}
              className={`inline-flex items-center justify-center ${size === 'small' ? 'w-16 h-16 mb-3' : 'w-24 h-24 sm:w-24 sm:h-24 mb-4 sm:mb-6'} bg-gradient-to-br from-blue-500 to-green-500 rounded-3xl shadow-2xl`}
            >
              <Smartphone className={`${size === 'small' ? 'w-8 h-8' : 'w-12 h-12 sm:w-12 sm:h-12'} text-white`} />
            </motion.div>

            <h3 className={`font-display ${size === 'small' ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl lg:text-3xl'} font-bold text-gray-900 mb-3 sm:mb-4 uppercase tracking-tight`}>
              First Property with Propertyfie?
            </h3>
            
            <div className="space-y-2 sm:space-y-3">
              <p className={`${size === 'small' ? 'text-sm sm:text-base' : 'text-base sm:text-lg'} text-gray-800 font-medium leading-relaxed`}>
                Brand new{' '}
                <span className={`inline-flex items-center gap-2 ${size === 'small' ? 'px-2 py-0.5' : 'px-3 py-1'} bg-gradient-to-r from-blue-500 to-green-500 text-white ${size === 'small' ? 'rounded-lg' : 'rounded-full'} font-bold shadow-md`}>
                  <Trophy className="w-3 h-3 sm:w-4 h-4" />
                  iPhone 17
                </span>{' '}
                on us, your color, your call.
              </p>
              
              {size !== 'small' && (
                <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base">
                  <span className="text-gray-700 font-medium">Okay!</span>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-md font-semibold text-xs sm:text-sm">
                    Desert Titanium?
                  </span>
                  <span className="text-gray-600">or</span>
                  <span className="px-2 py-1 bg-gray-200 text-gray-800 rounded-md font-semibold text-xs sm:text-sm">
                    Midnight Black
                  </span>
                  <span className="text-gray-700">though?</span>
                  <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 rounded-md font-bold text-xs sm:text-sm animate-pulse">
                    Also, valid.
                  </span>
                </div>
              )}
              
              <p className={`${size === 'small' ? 'text-xs sm:text-sm' : 'text-sm sm:text-base'} text-gray-600 italic mt-2 sm:mt-3 leading-relaxed`}>
                Thank you for letting us be part of your family's next big chapter! 🎉
              </p>
            </div>
          </div>

          {/* Right: Visual Element - Hidden on small size */}
          {size !== 'small' && (
            <div className="relative hidden lg:block">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="aspect-square max-w-md mx-auto"
              >
                {/* Decorative Circles - Platform Colors */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-4 border-dashed border-blue-300 rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-8 border-2 border-dashed border-green-300 rounded-full"
                />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-16 border border-dashed border-blue-200 rounded-full"
                />
                
                {/* Center Badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4, type: 'spring' }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center shadow-2xl">
                    <Trophy className="w-16 h-16 text-white" />
                  </div>
                </motion.div>

                {/* Floating Stars */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      top: `${20 + Math.random() * 60}%`,
                      left: `${20 + Math.random() * 60}%`,
                    }}
                    animate={{ 
                      scale: [0, 1, 0],
                      rotate: Math.random() * 360
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                      repeatDelay: 3
                    }}
                  >
                    <Sparkles className="w-4 h-4 text-yellow-500" />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PromoBanner;
