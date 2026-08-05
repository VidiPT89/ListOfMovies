import React from 'react';
import { motion } from 'framer-motion';
import movieService from '../../services/tmdbAPI';
import { getTranslation } from '../../locales/translations';

const MovieCard = ({ movie, onAddToWatchlist, onRemoveFromWatchlist, isInWatchlist, watched, onToggleWatched, language }) => {
  const posterURL = movieService.getImageURL(movie.poster_path);
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -8 }}
      className="movie-card cursor-pointer"
    >
      <div className="relative overflow-hidden">
        {posterURL ? (
          <motion.img
            src={posterURL}
            alt={movie.title}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          />
        ) : (
          <div className="w-full h-80 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            <span className="text-gray-500">{getTranslation(language, 'noImage')}</span>
          </div>
        )}
        
        {isInWatchlist && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute top-3 right-3"
          >
            <span className="badge bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              ✓ {getTranslation(language, 'inList')}
            </span>
          </motion.div>
        )}

        {watched && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute top-3 left-3"
          >
            <span className="badge bg-gradient-to-r from-amber-500 to-amber-400 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              👁️ {getTranslation(language, 'watched')}
            </span>
          </motion.div>
        )}

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent p-4 h-40 flex flex-col justify-end">
          <div className="flex items-center gap-2 mb-2">
            <motion.span
              whileHover={{ scale: 1.1 }}
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-3 py-1 rounded-lg font-bold text-sm shadow-lg"
            >
              ⭐ {rating}
            </motion.span>
            <span className="text-gray-200 text-sm font-medium">{year}</span>
          </div>
        </div>
      </div>

      <div className="p-5 bg-gradient-to-b from-gray-900 to-gray-950">
        <h3 className="font-bold text-lg line-clamp-2 mb-2 text-white">{movie.title}</h3>
        <p className="text-gray-400 text-sm mb-5 line-clamp-2">{movie.overview || getTranslation(language, 'noDescription')}</p>

        <div className="space-y-2">
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
      </div>
    </motion.div>
  );
};

export default MovieCard;
