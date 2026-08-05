import React from 'react';
import { motion } from 'framer-motion';
import { getTranslation } from '../../locales/translations';

const FilterPanel = ({ onFilterChange, genres, selectedGenre, selectedYear, language }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  const handleGenreChange = (genreId) => {
    onFilterChange({ genre: genreId === 'all' ? null : genreId });
  };

  const handleYearChange = (year) => {
    onFilterChange({ year: year === 'all' ? null : year });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-md p-6 rounded-xl mb-8 border border-gray-700/50 shadow-xl"
    >
      <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
        {getTranslation(language, 'filters')}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Filtro de Gênero */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <label className="block text-sm font-semibold mb-3 text-gray-200">
            {getTranslation(language, 'genre')}
          </label>
          <select
            value={selectedGenre || 'all'}
            onChange={(e) => handleGenreChange(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800/50 text-white rounded-lg border-2 border-gray-700/50 focus:outline-none focus:border-orange-500 transition-all duration-300 font-medium cursor-pointer"
          >
            <option value="all">{getTranslation(language, 'allGenres')}</option>
            {genres.map(genre => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Filtro de Ano */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <label className="block text-sm font-semibold mb-3 text-gray-200">
            {getTranslation(language, 'year')}
          </label>
          <select
            value={selectedYear || 'all'}
            onChange={(e) => handleYearChange(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800/50 text-white rounded-lg border-2 border-gray-700/50 focus:outline-none focus:border-orange-500 transition-all duration-300 font-medium cursor-pointer"
          >
            <option value="all">{getTranslation(language, 'allYears')}</option>
            {years.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FilterPanel;
