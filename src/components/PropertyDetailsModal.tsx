import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import { 
  Phone,Mail, Mic,
  CheckCircle2, Building2, MapPin, 
  Calendar, Info, Star, ShieldCheck, Play, Image as ImageIcon,
  Layers, Navigation, ArrowLeft, TrendingUp
} from 'lucide-react';
import type { Property } from '../data/properties';
import { useModalScrollLock, useModalKeyboardNavigation } from '../hooks/useModalScrollLock';

interface PropertyDetailsModalProps {
  property: Property | null;
  onClose: () => void;
  content?: React.ReactNode;
}

type Tab = 'overview' | 'amenities' | 'location' | 'gallery';

export const PropertyDetailsModal: React.FC<PropertyDetailsModalProps> = ({ property, onClose, content }) => {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [formVisible, setFormVisible] = useState(false);
  const [showPropsync, setShowPropsync] = useState(false);
  const [showMoreAmenities, setShowMoreAmenities] = useState(false);
  const [scale, setScale] = useState(1);
  
  // Lock body scroll when modal is open and enable ESC to close
  useModalScrollLock(!!property);
  useModalKeyboardNavigation(onClose);

  const handleDragEnd = (_: any, info: PanInfo) => {
    const dragThreshold = 100;
    if (Math.abs(info.offset.y) > dragThreshold) {
      onClose();
    }
  };
  
  // EOI Form State
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [isRecording, setIsRecording] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (property) {
      setForm(prev => ({
        ...prev,
        message: `I am interested in ${property.title}. Please provide more details.`,
      }));
    }
  }, [property]);

  const startRecording = async () => {
    try {
      const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognitionAPI) {
        const recognition = new SpeechRecognitionAPI();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-IN';
        recognition.onresult = (event: any) => {
          let transcript = '';
          for (let i = 0; i < event.results.length; i++) { transcript += event.results[i][0].transcript; }
          setVoiceTranscript(transcript);
        };
        recognition.start();
        recognitionRef.current = recognition;
        setIsRecording(true);
      }
    } catch (e) { console.error('Mic error', e); }
  };

  const stopRecording = () => {
    recognitionRef.current?.stop();
    setIsRecording(false);
    if (voiceTranscript) setForm(prev => ({ ...prev, message: voiceTranscript }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    await new Promise(r => setTimeout(r, 1500));
    setFormState('success');
  };

  if (!property) return null;

  const TabButton = ({ id, label, icon: Icon }: { id: Tab; label: string; icon: any }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
        activeTab === id ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5'
      }`}
    >
      <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      {label}
    </button>
  );

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-[9999] flex items-center justify-end" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} data-overlay="true">
        <motion.div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
        
        <motion.div 
          className="relative w-full max-w-7xl h-full bg-[#030308] border-l border-white/10 shadow-2xl flex flex-col lg:flex-row overflow-hidden"
          initial={{ x: '100%', scale: 1 }} 
          animate={{ x: 0, scale: scale }} 
          exit={{ x: '100%', scale: 1 }} 
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          drag={true}
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={0.5}
          onDragEnd={handleDragEnd}
          onWheel={(e) => {
            const delta = e.deltaY * 0.001;
            setScale(Math.min(Math.max(scale - delta, 0.8), 1.2));
          }}
          style={{ touchAction: 'pan-y', transformOrigin: 'center center' }}
          data-modal="true"
          data-lenis-prevent
        >
          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {/* Gallery/Hero - Styled like Hero section property card */}
            <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden m-6 mt-8 group">
              <div className="relative h-[280px] sm:h-[350px] md:h-[400px] lg:h-[450px] overflow-hidden">
                <img 
                  src={property.image} 
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030308]/80 via-transparent to-transparent" />
              </div>
              
              <button 
                onClick={onClose}
                className="absolute top-4 left-4 sm:top-6 sm:left-6 p-2.5 sm:p-3 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-white hover:bg-white/10 transition-all z-10"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2 z-10">
                <span className="px-2.5 py-1 sm:px-3 sm:py-1 bg-purple-600 text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-lg">
                  {property.status}
                </span>
                <span className="hidden sm:inline-block px-2.5 py-1 bg-white/10 backdrop-blur-md border border-white/10 text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider rounded-lg">
                  {property.tag}
                </span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10">
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                  <span className="text-purple-300 text-sm sm:text-base font-semibold truncate">{property.developer}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tighter uppercase mb-3 sm:mb-4 line-clamp-2">{property.title}</h1>
                <div className="flex flex-wrap items-center gap-3 sm:gap-6">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-white/80">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
                    <span className="text-xs sm:text-sm font-medium truncate max-w-[200px] sm:max-w-none">{property.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 text-white/80 font-mono text-[10px] sm:text-xs">
                    <ShieldCheck className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                    <span className="truncate max-w-[120px] sm:max-w-none">RERA: {property.rera}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Tabs - Only for Property Modals (not footer modals) */}
            {!content && (
              <div className="px-4 sm:px-6 lg:px-10 py-4 border-b border-white/10 sticky top-0 bg-[#030308]/95 backdrop-blur-md z-10">
                <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar">
                  <TabButton id="overview" label="Overview" icon={Info} />
                  <TabButton id="amenities" label="Amenities" icon={Layers} />
                  <TabButton id="location" label="Location" icon={Navigation} />
                  <TabButton id="gallery" label="Gallery" icon={ImageIcon} />
                </div>
              </div>
            )}

            <div className="px-4 sm:px-6 lg:px-10 py-6">
              {/* Custom Content for Footer Modals */}
              {content ? (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-gray-800">
                  {content}
                </motion.div>
              ) : (
              <AnimatePresence mode="wait">
                {activeTab === 'overview' && (
                  <motion.div key="ov" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-10">
                    {/* Pricing Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                        <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">Pricing From</p>
                        <p className="text-white text-lg lg:text-xl font-black truncate">{property.price}</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                        <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">Price /sqft</p>
                        <p className="text-white text-lg lg:text-xl font-bold truncate">{property.pricePerSqft}</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                        <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">Possession</p>
                        <p className="text-white text-lg lg:text-xl font-bold truncate">{property.possession}</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                        <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">Avg ROI</p>
                        <p className="text-green-400 text-lg lg:text-xl font-black truncate">{property.roi}</p>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-4">
                      <h3 className="text-white text-lg lg:text-xl font-bold">About the Property</h3>
                      <p className="text-gray-400 leading-relaxed text-sm lg:text-base">{property.description}</p>
                    </div>

                    {/* Project Details Grid */}
                    {(property.totalArea || property.totalTowers || property.totalUnits || property.unitConfig) && (
                      <div className="space-y-4">
                        <h3 className="text-white text-lg lg:text-xl font-bold">Project Details</h3>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                          {property.totalArea && (
                            <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">Total Area</p>
                              <p className="text-white text-lg font-bold">{property.totalArea}</p>
                            </div>
                          )}
                          {property.totalTowers && (
                            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
                              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">Total Towers</p>
                              <p className="text-white text-lg font-bold">{property.totalTowers}</p>
                            </div>
                          )}
                          {property.totalUnits && (
                            <div className="p-4 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
                              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">Total Units</p>
                              <p className="text-white text-lg font-bold">{property.totalUnits}</p>
                            </div>
                          )}
                          {property.unitConfig && (
                            <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20">
                              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">Configuration</p>
                              <p className="text-white text-lg font-bold">{property.unitConfig}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Key Highlights & Market Data */}
                    <div className="grid lg:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-white font-bold flex items-center gap-2 text-base lg:text-lg">
                          <Star className="w-4 h-4 text-purple-400" />
                          Key Highlights
                        </h3>
                        <ul className="space-y-3">
                          {property.amenities.slice(0, showMoreAmenities ? property.amenities.length : 6).map(a => (
                            <li key={a} className="flex items-center gap-3 text-sm text-gray-400">
                              <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                              {a}
                            </li>
                          ))}
                        </ul>
                        {property.amenities.length > 6 && (
                          <button 
                            onClick={() => setShowMoreAmenities(!showMoreAmenities)}
                            className="text-purple-400 text-sm font-medium hover:text-purple-300 transition-colors"
                          >
                            {showMoreAmenities ? 'Show Less' : `+${property.amenities.length - 6} More`}
                          </button>
                        )}
                      </div>
                      
                      {/* Market Data Card */}
                      <div className="p-6 rounded-3xl bg-purple-500/10 border border-purple-500/20">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                            <span className="text-blue-300 text-xs font-bold uppercase">Propsync.xyz Active</span>
                          </div>
                          <button 
                            onClick={() => setShowPropsync(!showPropsync)}
                            className={`w-12 h-6 rounded-full transition-all relative ${showPropsync ? 'bg-blue-600' : 'bg-white/10'}`}
                          >
                            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${showPropsync ? 'left-7' : 'left-1'}`} />
                          </button>
                        </div>
                        <h4 className="text-white font-bold text-sm mb-2">Market Data Integration</h4>
                        <p className="text-gray-400 text-xs leading-relaxed">Toggle to see live secondary market pricing and neighborhood demand analytics from Propsync.xyz</p>
                        
                        {showPropsync && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="pt-4 mt-4 border-t border-white/10 space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-white/60 text-[10px]">Registry Price Avg</span>
                              <span className="text-blue-400 font-mono text-xs">₹9,450/sqft</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-white/60 text-[10px]">Supply Score</span>
                              <span className="text-orange-400 font-mono text-xs">Low (Ideal)</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-white/60 text-[10px]">Demand Trend</span>
                              <span className="text-green-400 font-mono text-xs">+18% This Month</span>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* Additional Property Features */}
                    {(property.securityFeatures || property.interiorFeatures || property.outdoorFeatures) && (
                      <div className="space-y-6">
                        <h3 className="text-white text-lg lg:text-xl font-bold">Additional Features</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                          {property.securityFeatures && (
                            <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                              <h4 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-green-400" />
                                Security
                              </h4>
                              <ul className="space-y-2">
                                {property.securityFeatures.map(f => (
                                  <li key={f} className="text-gray-400 text-sm flex items-center gap-2">
                                    <CheckCircle2 className="w-3 h-3 text-green-400" />
                                    {f}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {property.interiorFeatures && (
                            <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                              <h4 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
                                <Building2 className="w-4 h-4 text-blue-400" />
                                Interiors
                              </h4>
                              <ul className="space-y-2">
                                {property.interiorFeatures.map(f => (
                                  <li key={f} className="text-gray-400 text-sm flex items-center gap-2">
                                    <CheckCircle2 className="w-3 h-3 text-blue-400" />
                                    {f}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {property.outdoorFeatures && (
                            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 md:col-span-2">
                              <h4 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-orange-400" />
                                Outdoor Amenities
                              </h4>
                              <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2">
                                {property.outdoorFeatures.map(f => (
                                  <li key={f} className="text-gray-400 text-sm flex items-center gap-2 list-none">
                                    <CheckCircle2 className="w-3 h-3 text-orange-400" />
                                    {f}
                                  </li>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'amenities' && (
                  <motion.div key="am" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                      {property.amenities.map(a => (
                        <div key={a} className="p-5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3 text-white font-medium text-sm hover:bg-white/10 transition-all">
                          <Layers className="w-4 h-4 text-purple-400 shrink-0" />
                          <span className="truncate">{a}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Sustainability Features */}
                    {property.sustainabilityFeatures && (
                      <div className="space-y-4">
                        <h3 className="text-white font-bold text-lg">Sustainability Features</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {property.sustainabilityFeatures.map(f => (
                            <div key={f} className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center gap-3">
                              <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                              <span className="text-white text-sm">{f}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'location' && (
                  <motion.div key="loc" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                    <div className="rounded-3xl overflow-hidden h-64 bg-white/5 relative border border-white/10 flex items-center justify-center">
                      <p className="text-white/20 text-sm font-bold uppercase tracking-widest">Map View (Simulated)</p>
                      <Navigation className="absolute bottom-6 right-6 w-10 h-10 text-purple-500/20" />
                    </div>
                    
                    {/* Nearby Places */}
                    <div className="space-y-4">
                      <h3 className="text-white font-bold text-lg">Nearby Places</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {property.nearbyPlaces.map(p => (
                          <div key={p.name} className="flex justify-between items-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                            <span className="text-gray-400 text-sm truncate pr-4">{p.name}</span>
                            <span className="text-white font-bold text-xs whitespace-nowrap">{p.distance}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Location Highlights */}
                    <div className="p-6 rounded-2xl bg-blueprint-blue/10 border border-blueprint-blue/20">
                      <h3 className="text-white font-bold text-lg mb-4">Location Advantages</h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center shrink-0">
                            <MapPin className="w-5 h-5 text-purple-400" />
                          </div>
                          <div>
                            <h4 className="text-white font-semibold text-sm">Prime Location</h4>
                            <p className="text-gray-400 text-xs mt-1">Heart of North Bangalore</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center shrink-0">
                            <TrendingUp className="w-5 h-5 text-green-400" />
                          </div>
                          <div>
                            <h4 className="text-white font-semibold text-sm">High Growth</h4>
                            <p className="text-gray-400 text-xs mt-1">15% appreciation YoY</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'gallery' && (
                  <motion.div key="gal" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 relative aspect-video rounded-3xl overflow-hidden border border-white/10">
                      <img src={property.image} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-xl border border-white/20 flex items-center justify-center cursor-pointer hover:scale-110 transition-all">
                          <Play className="w-6 h-6 text-white fill-white" />
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4 bg-black/60 px-3 py-1 rounded text-[10px] text-white">Project Tour Video</div>
                    </div>
                    {property.gallery.map((_, i) => (
                      <div key={i} className="aspect-square rounded-3xl overflow-hidden border border-white/10">
                        <img src={property.image} className="w-full h-full object-cover brightness-75 hover:brightness-100 transition-all" />
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
              )}
            </div>
          </div>

          {/* Sidebar / Actions */}
          <div className="w-full md:w-[360px] border-l border-white/10 bg-white/5 flex flex-col p-6 lg:p-8 shrink-0 overflow-y-auto max-h-[40vh] md:max-h-full">
            <h2 className="text-white font-bold text-lg lg:text-xl mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-400" />
              Take Action
            </h2>
            
            <div className="space-y-4 mb-8">
              <button 
                onClick={() => setFormVisible(true)}
                className="w-full py-3 lg:py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-purple-500/20 hover:scale-[1.02] transition-all whitespace-normal"
              >
                Enquire Now
              </button>
              
              <button className="w-full py-3 lg:py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-bold text-sm hover:bg-white/10 transition-all flex items-center justify-center gap-2 whitespace-normal">
                <Navigation className="w-4 h-4 shrink-0" />
                Book Virtual Visit
              </button>

              <div className="pt-6 mt-6 border-t border-white/10">
                <p className="text-gray-500 text-[10px] font-bold uppercase mb-4 tracking-widest">Connect Directly</p>
                <div className="grid grid-cols-2 gap-3">
                  <a href="tel:+917970750727" className="p-3 rounded-xl bg-white/5 flex flex-col items-center gap-2 hover:bg-white/10 transition-all">
                    <Phone className="w-4 h-4 text-green-400" />
                    <span className="text-[10px] text-white font-bold text-center">Call Team</span>
                  </a>
                  <a href="mailto:info@propertyfie.com" className="p-3 rounded-xl bg-white/5 flex flex-col items-center gap-2 hover:bg-white/10 transition-all">
                    <Mail className="w-4 h-4 text-blue-400" />
                    <span className="text-[10px] text-white font-bold text-center">Email Us</span>
                  </a>
                </div>
              </div>
            </div>

            {/* In-Modal EOI mini-form */}
            <AnimatePresence>
              {formVisible && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-4">
                  {formState === 'success' ? (
                    <div className="text-center py-6">
                      <CheckCircle2 className="w-10 h-10 text-green-400 mx-auto mb-2" />
                      <p className="text-white font-bold text-sm">Interest Received!</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-3">
                      <input 
                        type="text" placeholder="Full Name" 
                        value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                        className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white text-xs outline-none focus:border-purple-500/50" 
                      />
                      <input 
                        type="tel" placeholder="Mobile" 
                        value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                        className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white text-xs outline-none focus:border-purple-500/50" 
                      />
                      <div className="relative">
                        <textarea 
                          rows={3} value={isRecording ? voiceTranscript || form.message : form.message}
                          onChange={e => setForm({...form, message: e.target.value})}
                          className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white text-xs outline-none focus:border-purple-500/50 resize-none pr-10" 
                        />
                        <button 
                          type="button" onClick={isRecording ? stopRecording : startRecording}
                          className={`absolute right-2 bottom-4 p-1.5 rounded-lg ${isRecording ? 'bg-red-500/20 text-red-400 animate-pulse' : 'bg-purple-500/20 text-purple-400'}`}
                        >
                          <Mic className="w-4 h-4" />
                        </button>
                      </div>
                      <button 
                        type="submit" disabled={formState === 'submitting'}
                        className="w-full py-3 bg-white text-black rounded-xl font-bold text-xs uppercase"
                      >
                        {formState === 'submitting' ? 'Submitting...' : 'Send Query'}
                      </button>
                    </form>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-auto pt-8 border-t border-white/10 text-center">
              <p className="text-[10px] text-gray-500">Propertyfie Verified Project • 2024</p>
              <p className="text-[9px] text-gray-600 mt-1">RERA Status: Approved</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PropertyDetailsModal;
