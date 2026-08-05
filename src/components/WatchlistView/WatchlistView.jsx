import React from 'react';
import { motion } from 'framer-motion';
import MovieCard from '../MovieCard/MovieCard';
import { getTranslation } from '../../locales/translations';

const WatchlistView = ({ watchlist, getWatchedMovies, getUnwatchedMovies, onRemove, onToggleWatched, language }) => {
  const watched = getWatchedMovies();
  const unwatched = getUnwatchedMovies();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  if (watchlist.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <motion.p
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-6xl mb-4"
        >
          📭
        </motion.p>
        <p className="text-2xl text-gray-300 mb-3 font-semibold">
          {getTranslation(language, 'emptyWatchlist')}
        </p>
        <p className="text-gray-500">{getTranslation(language, 'emptyWatchlistDesc')}</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Filmes não assistidos */}
      {unwatched.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            {getTranslation(language, 'toWatch')} ({unwatched.length})
          </motion.h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {unwatched.map(movie => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onAddToWatchlist={() => {}}
                onRemoveFromWatchlist={() => onRemove(movie.id)}
                isInWatchlist={true}
                watched={false}
                onToggleWatched={() => onToggleWatched(movie.id)}
                language={language}
              />
            ))}
          </motion.div>
        </motion.div>
      )}

      {/* Filmes assistidos */}
      {watched.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="pt-10 border-t border-gray-700/50"
        >
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
          >
            {getTranslation(language, 'alreadyWatched')} ({watched.length})
          </motion.h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {watched.map(movie => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onAddToWatchlist={() => {}}
                onRemoveFromWatchlist={() => onRemove(movie.id)}
                isInWatchlist={true}
                watched={true}
                onToggleWatched={() => onToggleWatched(movie.id)}
                language={language}
              />
            ))}
          </motion.div>
        </motion.div>
      )}

      {/* Estatísticas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-12 bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-md p-8 rounded-xl border border-gray-700/50 shadow-xl"
      >
        <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
          {getTranslation(language, 'statistics')}
        </h3>
        <div className="grid grid-cols-3 gap-6">
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="text-center p-6 bg-gray-900/50 rounded-lg border border-gray-700/50 hover:border-purple-500/50 transition-all"
          >
            <p className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              {watchlist.length}
            </p>
            <p className="text-gray-400 text-sm mt-2 font-medium">{getTranslation(language, 'total')}</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="text-center p-6 bg-gray-900/50 rounded-lg border border-gray-700/50 hover:border-cyan-500/50 transition-all"
          >
            <p className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
              {watched.length}
            </p>
            <p className="text-gray-400 text-sm mt-2 font-medium">{getTranslation(language, 'watched_count')}</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="text-center p-6 bg-gray-900/50 rounded-lg border border-gray-700/50 hover:border-yellow-500/50 transition-all"
          >
            <p className="text-4xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
              {unwatched.length}
            </p>
            <p className="text-gray-400 text-sm mt-2 font-medium">{getTranslation(language, 'toWatch_count')}</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default WatchlistView;
