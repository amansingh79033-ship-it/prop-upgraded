import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Phone, Mail, MessageSquare, Mic, MicOff, Send, CheckCircle2, Loader2, Building2, AlertCircle } from 'lucide-react';
import type { Property } from '../data/properties';
import { useModalScrollLock, useModalKeyboardNavigation } from '../hooks/useModalScrollLock';

interface EOIModalProps {
  property: Property | null;
  onClose: () => void;
}

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export const EOIModal: React.FC<EOIModalProps> = ({ property, onClose }) => {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [formState, setFormState] = useState<FormState>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [voiceClip, setVoiceClip] = useState<Blob | null>(null);
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [showVoiceTooltip, setShowVoiceTooltip] = useState(false);
  const [recordingError, setRecordingError] = useState('');

  // Lock body scroll and enable ESC to close
  useModalScrollLock(!!property);
  useModalKeyboardNavigation(onClose);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const recognitionRef = useRef<any>(null);

  // Pre-fill message if property selected
  useEffect(() => {
    if (property) {
      setForm(prev => ({
        ...prev,
        message: prev.message || `I am interested in ${property.title} at ${property.location}. Please send me more details.`,
      }));
    }
  }, [property]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      recognitionRef.current?.stop();
    };
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = 'Full name is required';
    if (!form.phone.trim() || !/^[6-9]\d{9}$/.test(form.phone.trim()))
      newErrors.phone = 'Valid 10-digit mobile number required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      newErrors.email = 'Valid email address required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setFormState('submitting');

    // Simulate form submission (replace with actual endpoint)
    await new Promise(resolve => setTimeout(resolve, 1800));
    setFormState('success');
  };

  const startRecording = async () => {
    setRecordingError('');
    setVoiceClip(null);
    setVoiceTranscript('');

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];

      recorder.ondataavailable = e => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setVoiceClip(blob);
        stream.getTracks().forEach(t => t.stop());
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
      setRecordingDuration(0);
      timerRef.current = setInterval(() => setRecordingDuration(d => d + 1), 1000);

      // Web Speech API for live transcript
      const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognitionAPI) {
        const recognition = new SpeechRecognitionAPI();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-IN';
        recognition.onresult = (event: any) => {
          let transcript = '';
          for (let i = 0; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
          }
          setVoiceTranscript(transcript);
        };
        recognition.start();
        recognitionRef.current = recognition;
      }
    } catch {
      setRecordingError('Microphone access denied. Please allow microphone permission.');
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    recognitionRef.current?.stop();
    if (timerRef.current) clearInterval(timerRef.current);
    setIsRecording(false);
    // Append transcript to message
    if (voiceTranscript) {
      setForm(prev => ({ ...prev, message: voiceTranscript }));
    }
  };

  const formatDuration = (s: number) =>
    `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  const inputClass = (field: string) =>
    `w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder:text-gray-500 text-sm outline-none transition-all focus:bg-white/10 ${
      errors[field] ? 'border-red-500/70 focus:border-red-400' : 'border-white/10 focus:border-purple-500/60'
    }`;

  if (!property) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/70 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className="relative w-full max-w-2xl bg-[#0d0d1a] border border-white/10 rounded-3xl overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] max-h-[90vh] overflow-y-auto"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 280 }}
          data-lenis-prevent
          data-modal="true"
        >
          {/* Property Header */}
          <div className="relative h-36 overflow-hidden">
            <img src={property.image} alt={property.title} className="w-full h-full object-cover brightness-50" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d1a] via-transparent to-transparent" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="absolute bottom-4 left-5">
              <div className="flex items-center gap-2 mb-1">
                <Building2 className="w-4 h-4 text-purple-400" />
                <span className="text-purple-300 text-xs font-semibold">{property.developer}</span>
              </div>
              <h2 className="text-white text-xl font-bold">{property.title}</h2>
              <p className="text-gray-400 text-xs">{property.location}</p>
            </div>
            <div className="absolute bottom-4 right-5 text-right">
              <div className="text-white font-black text-lg">{property.price}</div>
              <div className="text-green-400 text-xs font-semibold">ROI: {property.roi}</div>
            </div>
          </div>

          {/* Form or Success */}
          <div className="p-6">
            {formState === 'success' ? (
              <motion.div
                className="text-center py-10 space-y-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-white text-xl font-bold">EOI Submitted Successfully!</h3>
                <p className="text-gray-400 text-sm max-w-xs mx-auto">
                  Our team will reach out within 24 hours with complete project details and pricing.
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-semibold transition-colors"
                >
                  Close
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <h3 className="text-white font-bold text-base mb-1">Express Interest (EOI)</h3>
                <p className="text-gray-500 text-xs mb-6">Our advisor will connect with you within 24 hours — no spam, ever.</p>

                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                        className={`${inputClass('name')} pl-10`}
                      />
                    </div>
                    {errors.name && <p className="text-red-400 text-xs mt-1 ml-1">{errors.name}</p>}
                  </div>

                  {/* Phone + Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                          type="tel"
                          placeholder="Mobile Number"
                          value={form.phone}
                          onChange={e => setForm(prev => ({ ...prev, phone: e.target.value.replace(/\D/g, '') }))}
                          maxLength={10}
                          className={`${inputClass('phone')} pl-10`}
                        />
                      </div>
                      {errors.phone && <p className="text-red-400 text-xs mt-1 ml-1">{errors.phone}</p>}
                    </div>
                    <div>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                          type="email"
                          placeholder="Email Address"
                          value={form.email}
                          onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
                          className={`${inputClass('email')} pl-10`}
                        />
                      </div>
                      {errors.email && <p className="text-red-400 text-xs mt-1 ml-1">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Message + Voice */}
                  <div>
                    <div className="relative">
                      <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
                      <textarea
                        placeholder="Your message or query..."
                        value={isRecording ? voiceTranscript || form.message : form.message}
                        onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                        rows={3}
                        className={`${inputClass('message')} pl-10 pr-12 resize-none`}
                      />
                      {/* Voice Button */}
                      <div className="absolute right-3 top-3">
                        <div className="relative">
                          <button
                            type="button"
                            onMouseEnter={() => setShowVoiceTooltip(true)}
                            onMouseLeave={() => setShowVoiceTooltip(false)}
                            onClick={isRecording ? stopRecording : startRecording}
                            className={`p-1.5 rounded-lg transition-all ${
                              isRecording
                                ? 'bg-red-500/20 text-red-400 animate-pulse'
                                : 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30'
                            }`}
                          >
                            {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                          </button>
                          {/* Tooltip */}
                          <AnimatePresence>
                            {showVoiceTooltip && !isRecording && (
                              <motion.div
                                initial={{ opacity: 0, y: 4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 4 }}
                                className="absolute right-0 top-8 w-44 bg-gray-900 border border-white/10 text-white text-xs rounded-lg px-3 py-2 z-10 pointer-events-none"
                              >
                                🎙️ Click to record a voice query — we'll transcribe it for you.
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>

                    {/* Recording indicator */}
                    {isRecording && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 mt-2 ml-1"
                      >
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-red-400 text-xs font-mono">{formatDuration(recordingDuration)} — Recording… click 🎙️ to stop</span>
                      </motion.div>
                    )}

                    {/* Voice clip ready */}
                    {voiceClip && !isRecording && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2 mt-2 ml-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                        <span className="text-green-400 text-xs">Voice clip ready — transcript applied to message</span>
                      </motion.div>
                    )}

                    {recordingError && (
                      <div className="flex items-center gap-2 mt-2 ml-1">
                        <AlertCircle className="w-3.5 h-3.5 text-red-400" />
                        <span className="text-red-400 text-xs">{recordingError}</span>
                      </div>
                    )}
                  </div>

                  {/* RERA Info */}
                  <div className="px-3 py-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300 flex items-start gap-2">
                    <span className="text-blue-400 font-bold mt-0.5">RERA</span>
                    <span className="font-mono text-[10px] break-all">{property.rera}</span>
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={formState === 'submitting'}
                    whileHover={{ scale: formState === 'submitting' ? 1 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 text-sm disabled:opacity-70 transition-all shadow-lg shadow-purple-500/20"
                  >
                    {formState === 'submitting' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting your interest…
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Submit Expression of Interest
                      </>
                    )}
                  </motion.button>

                  <p className="text-center text-gray-600 text-[10px]">
                    By submitting, you agree to be contacted by Propertyfie advisors. No brokerage charges.
                  </p>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EOIModal;
