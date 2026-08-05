import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import movieService from './services/tmdbAPI';
import { useWatchlist } from './hooks/useWatchlist';
import { useLanguage } from './hooks/useLanguage';
import { getTranslation } from './locales/translations';
import SplashScreen from './components/SplashScreen/SplashScreen';
import LanguageToggle from './components/LanguageToggle/LanguageToggle';
import SearchBar from './components/SearchBar/SearchBar';
import FilterPanel from './components/FilterPanel/FilterPanel';
import MovieCard from './components/MovieCard/MovieCard';
import WatchlistView from './components/WatchlistView/WatchlistView';
import './index.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentView, setCurrentView] = useState('search');
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSplash, setShowSplash] = useState(true);

  const { language, toggleLanguage } = useLanguage();
  
  const {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    toggleWatched,
    isInWatchlist,
    getWatchlistMovie,
    getWatchedMovies,
    getUnwatchedMovies
  } = useWatchlist();

  // Carregar gêneros ao montar o componente
  useEffect(() => {
    const loadGenres = async () => {
      try {
        const genresData = await movieService.getGenres();
        setGenres(genresData);
      } catch (err) {
        console.error('Erro ao carregar gêneros:', err);
      }
    };
    loadGenres();
    loadPopularMovies();
  }, []);

  const loadPopularMovies = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await movieService.getPopularMovies();
      setMovies(data.results);
      setSearchQuery('');
      setSelectedGenre(null);
      setSelectedYear(null);
    } catch (err) {
      setError(getTranslation(language, 'searchPlaceholder'));
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await movieService.searchMovies(query);
      setMovies(data.results);
      setSearchQuery(query);
      setSelectedGenre(null);
      setSelectedYear(null);
    } catch (err) {
      setError('Erro ao buscar filmes. Tente novamente.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = async ({ genre, year }) => {
    setIsLoading(true);
    setError(null);
    
    if (genre !== undefined) setSelectedGenre(genre);
    if (year !== undefined) setSelectedYear(year);

    try {
      const filters = {
        with_genres: genre !== undefined ? (genre || '') : (selectedGenre || ''),
        primary_release_year: year !== undefined ? (year || '') : (selectedYear || ''),
        sort_by: 'popularity.desc'
      };

      Object.keys(filters).forEach(key => {
        if (!filters[key]) delete filters[key];
      });

      const data = await movieService.discoverMovies(filters);
      setMovies(data.results);
      setSearchQuery('');
    } catch (err) {
      setError('Erro ao aplicar filtros. Tente novamente.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToWatchlist = (movie) => {
    const added = addToWatchlist(movie);
    if (added) {
      // Aqui você pode adicionar uma notificação mais elegante se desejar
    }
  };

  const handleRemoveFromWatchlist = (movieId) => {
    removeFromWatchlist(movieId);
  };

  const handleToggleWatched = (movieId) => {
    toggleWatched(movieId);
  };

  return (
    <>
      <AnimatePresence>
        {showSplash && (
          <SplashScreen
            onAnimationComplete={() => setShowSplash(false)}
            language={language}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showSplash ? 0 : 1 }}
        transition={{ duration: 0.8 }}
        className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black py-8"
      >
        {/* Language Toggle */}
        <LanguageToggle language={language} onToggle={toggleLanguage} />

        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-10"
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-3 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent"
            >
              🎬 {getTranslation(language, 'header')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-gray-400 text-lg md:text-xl font-light"
            >
              {getTranslation(language, 'subtitle')}
            </motion.p>
          </motion.header>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex gap-4 justify-center mb-10"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentView('search')}
              className={`px-6 md:px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                currentView === 'search'
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg shadow-purple-500/50'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700/50'
              }`}
            >
              {getTranslation(language, 'explore')}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentView('watchlist')}
              className={`px-6 md:px-8 py-3 rounded-xl font-semibold transition-all duration-300 relative ${
                currentView === 'watchlist'
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg shadow-purple-500/50'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700/50'
              }`}
            >
              {getTranslation(language, 'watchlist')}
              {watchlist.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-lg"
                >
                  {watchlist.length}
                </motion.span>
              )}
            </motion.button>
          </motion.div>

          {/* Search View */}
          <AnimatePresence mode="wait">
            {currentView === 'search' && (
              <motion.div
                key="search-view"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <SearchBar onSearch={handleSearch} isLoading={isLoading} language={language} />
                <FilterPanel
                  onFilterChange={handleFilterChange}
                  genres={genres}
                  selectedGenre={selectedGenre}
                  selectedYear={selectedYear}
                  language={language}
                />

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-red-900/50 to-red-800/50 text-red-200 p-4 rounded-lg mb-6 border border-red-700/50"
                  >
                    {error}
                  </motion.div>
                )}

                {movies.length === 0 && !isLoading && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-16"
                  >
                    <motion.p
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-6xl mb-4"
                    >
                      🎬
                    </motion.p>
                    <p className="text-2xl text-gray-300 mb-6 font-semibold">
                      {getTranslation(language, 'loadPopular')}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={loadPopularMovies}
                      className="btn-primary"
                    >
                      {getTranslation(language, 'loadPopular')}
                    </motion.button>
                  </motion.div>
                )}

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                      className="inline-block"
                    >
                      <p className="text-6xl">🎬</p>
                    </motion.div>
                    <p className="text-gray-400 mt-4">{getTranslation(language, 'searching')}</p>
                  </motion.div>
                )}

                {movies.length > 0 && !isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-gray-400 mb-6 font-medium"
                    >
                      {getTranslation(language, 'found')} {movies.length} {getTranslation(language, 'movies')}
                    </motion.p>
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      variants={{
                        hidden: { opacity: 0 },
                        visible: {
                          opacity: 1,
                          transition: {
                            staggerChildren: 0.05,
                          },
                        },
                      }}
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    >
                      {movies.map(movie => (
                        <MovieCard
                          key={movie.id}
                          movie={movie}
                          onAddToWatchlist={() => handleAddToWatchlist(movie)}
                          onRemoveFromWatchlist={() => handleRemoveFromWatchlist(movie.id)}
                          isInWatchlist={isInWatchlist(movie.id)}
                          watched={getWatchlistMovie(movie.id)?.watched || false}
                          onToggleWatched={() => handleToggleWatched(movie.id)}
                          language={language}
                        />
                      ))}
                    </motion.div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Watchlist View */}
          <AnimatePresence mode="wait">
            {currentView === 'watchlist' && (
              <motion.div
                key="watchlist-view"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <WatchlistView
                  watchlist={watchlist}
                  getWatchedMovies={getWatchedMovies}
                  getUnwatchedMovies={getUnwatchedMovies}
                  onRemove={handleRemoveFromWatchlist}
                  onToggleWatched={handleToggleWatched}
                  language={language}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
}

export default App;
