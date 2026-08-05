import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import movieService from '../../services/tmdbAPI';
import { getTranslation } from '../../locales/translations';

const MovieModal = ({ movie, isOpen, onClose, language, onAddToWatchlist, onRemoveFromWatchlist, isInWatchlist, watched, onToggleWatched }) => {
  const posterURL = movieService.getImageURL(movie?.poster_path);
  const year = movie?.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
  const rating = movie?.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
  const runtime = movie?.runtime ? `${movie.runtime} min` : 'N/A';
  const genres = movie?.genres ? movie.genres.map(g => g.name).join(', ') : 'N/A';

  const backdropVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const modalVariants = {
    initial: { opacity: 0, scale: 0.95, y: 20 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 300
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      y: 20,
      transition: { duration: 0.2 }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && movie && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl mx-auto"
          >
            <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl overflow-hidden shadow-2xl border border-gray-700/50">
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 flex items-center justify-center text-white font-bold text-xl transition-all"
              >
                ✕
              </motion.button>

              <div className="flex flex-col md:flex-row gap-6 p-6">
                {/* Poster */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex-shrink-0"
                >
                  {posterURL ? (
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      src={posterURL}
                      alt={movie.title}
                      className="w-40 h-auto rounded-lg shadow-lg"
                    />
                  ) : (
                    <div className="w-40 h-56 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500 text-center">{getTranslation(language, 'noImage')}</span>
                    </div>
                  )}
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                  className="flex-1 flex flex-col justify-between"
                >
                  {/* Header */}
                  <div>
                    <h2 className="text-3xl font-bold mb-2 text-white">{movie.title}</h2>
                    
                    {/* Rating and Year */}
                    <div className="flex items-center gap-4 mb-4">
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-3 py-1 rounded-lg font-bold text-sm shadow-lg"
                      >
                        ⭐ {rating}/10
                      </motion.span>
                      <span className="text-gray-300 font-medium">📅 {year}</span>
                      {movie.runtime && (
                        <span className="text-gray-300 font-medium">⏱️ {runtime}</span>
                      )}
                    </div>

                    {/* Genres */}
                    {movie.genres && movie.genres.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-400 mb-2">{getTranslation(language, 'genre')}:</p>
                        <div className="flex flex-wrap gap-2">
                          {movie.genres.map(genre => (
                            <motion.span
                              key={genre.id}
                              whileHover={{ scale: 1.05 }}
                              className="bg-orange-600/30 border border-orange-500/50 text-orange-300 px-3 py-1 rounded-full text-sm font-medium"
                            >
                              {genre.name}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                      {movie.overview || getTranslation(language, 'noDescription')}
                    </p>

                    {/* Additional Info */}
                    {movie.vote_count && (
                      <p className="text-xs text-gray-500 mb-4">
                        🗳️ {getTranslation(language, 'votes')}: {movie.vote_count.toLocaleString()}
                      </p>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2 mt-6">
                    {!isInWatchlist ? (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onAddToWatchlist(movie)}
                        className="btn-primary w-full"
                      >
                        ➕ {getTranslation(language, 'addWatchlist')}
                      </motion.button>
                    ) : (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => onToggleWatched()}
                          className={`w-full py-2 px-4 rounded-lg font-semibold transition-all duration-200 ${
                            watched
                              ? 'bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white shadow-lg'
                              : 'bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white'
                          }`}
                        >
                          {watched ? '👁️ ' + getTranslation(language, 'markUnwatched') : '🎥 ' + getTranslation(language, 'markWatched')}
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => onRemoveFromWatchlist()}
                          className="btn-secondary w-full"
                        >
                          🗑️ {getTranslation(language, 'removeWatchlist')}
                        </motion.button>
                      </>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MovieModal;
