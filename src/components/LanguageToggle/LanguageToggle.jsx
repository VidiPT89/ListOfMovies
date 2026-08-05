import React from 'react';
import { motion } from 'framer-motion';

const LanguageToggle = ({ language, onToggle }) => {
  return (
    <motion.button
      onClick={onToggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed top-6 right-6 z-40 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
    >
      <span className="text-lg">{language === 'pt-PT' ? '🇵🇹' : '🇬🇧'}</span>
      <span>{language === 'pt-PT' ? 'PT' : 'EN'}</span>
    </motion.button>
  );
};

export default LanguageToggle;
