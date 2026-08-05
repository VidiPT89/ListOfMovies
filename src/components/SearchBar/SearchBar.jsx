import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { getTranslation } from '../../locales/translations';

const SearchBar = ({ onSearch, isLoading, language }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = useCallback((e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  }, [query, onSearch]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-md p-6 rounded-xl mb-8 border border-gray-700/50 shadow-xl"
    >
      <form onSubmit={handleSearch} className="flex gap-2">
        <motion.div
          animate={isFocused ? { scale: 1.02 } : { scale: 1 }}
          className="flex-1"
        >
          <input
            type="text"
            value={query}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={getTranslation(language, 'searchPlaceholder')}
            className="w-full px-6 py-4 bg-gray-800/50 text-white rounded-xl border-2 border-gray-700/50 focus:outline-none focus:border-purple-500 transition-all duration-300 placeholder-gray-500 font-medium"
          />
        </motion.div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={isLoading}
          className="btn-primary px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed font-semibold rounded-xl"
        >
          {isLoading ? getTranslation(language, 'searching') : getTranslation(language, 'searchButton')}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default SearchBar;
