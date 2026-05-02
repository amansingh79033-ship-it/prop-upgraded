import { useState, useEffect } from 'react';
import { Sparkles, Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  onAISearch?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
}) => {
  const [query, setQuery] = useState('');
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && onSearch) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="w-full">
      <motion.form
        onSubmit={handleSubmit}
        className="relative flex items-center bg-[#0a0a16] rounded-2xl p-1.5 border border-purple-500/30 group focus-within:border-purple-500/60 transition-all shadow-2xl w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Left Search Icon */}
        <div className="pl-4 pr-1 text-gray-500 group-focus-within:text-purple-400 transition-colors shrink-0">
          <Search className="w-5 h-5" />
        </div>

        {/* Vertical Separator (Subtle) */}
        <div className="w-[1px] h-6 bg-white/10 mx-2 shrink-0" />

        {/* Input Field */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={windowWidth < 640 ? "tell me project" : "Try: '3 BHK near airport under 2Cr'"}
          className="flex-1 min-w-0 bg-transparent border-none outline-none text-white placeholder:text-gray-500 text-[10px] sm:text-xs md:text-sm py-2.5 sm:py-3 px-2 truncate max-w-full"
        />

        {/* Search Button */}
        <motion.button
          type="submit"
          whileHover={{ filter: "brightness(1.2)", scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-gradient-to-br from-purple-600 to-pink-600 text-white px-4 sm:px-6 py-2.5 rounded-xl flex items-center gap-2 font-semibold text-sm transition-all shadow-lg shrink-0 whitespace-nowrap"
        >
          <Sparkles className="w-4 h-4 text-white/90 shrink-0" />
          <span className="hidden sm:inline">Search</span>
        </motion.button>
      </motion.form>

      {/* Suggestion Tags */}
      <div className="flex flex-wrap items-center gap-2 mt-4 ml-1">
        {[
          'Luxury Villas',
          'Modern Apartments',
          'High ROI',
          'Under 1 Crore',
        ].map((tag, idx) => (
          <motion.button
            key={tag}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            whileHover={{ opacity: 1, y: -1 }}
            transition={{ delay: 0.4 + idx * 0.1 }}
            onClick={() => setQuery(tag)}
            className="text-[9px] sm:text-[10px] md:text-xs font-semibold text-white uppercase tracking-tight bg-white/5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-md hover:bg-white/10 transition-colors whitespace-nowrap"
          >
            {tag}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
