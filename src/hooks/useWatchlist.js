import { useState, useEffect } from 'react';

const WATCHLIST_KEY = 'movieWatchlist';

export const useWatchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  // Carregar watchlist do localStorage
  useEffect(() => {
    const savedWatchlist = localStorage.getItem(WATCHLIST_KEY);
    if (savedWatchlist) {
      try {
        setWatchlist(JSON.parse(savedWatchlist));
      } catch (error) {
        console.error('Erro ao carregar watchlist:', error);
      }
    }
  }, []);

  // Salvar watchlist no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
  }, [watchlist]);

  // Adicionar filme à watchlist
  const addToWatchlist = (movie) => {
    const exists = watchlist.some(m => m.id === movie.id);
    if (!exists) {
      setWatchlist([...watchlist, { ...movie, watched: false, addedAt: new Date().toISOString() }]);
      return true;
    }
    return false;
  };

  // Remover filme da watchlist
  const removeFromWatchlist = (movieId) => {
    setWatchlist(watchlist.filter(m => m.id !== movieId));
  };

  // Marcar como assistido/não assistido
  const toggleWatched = (movieId) => {
    setWatchlist(
      watchlist.map(m =>
        m.id === movieId ? { ...m, watched: !m.watched } : m
      )
    );
  };

  // Verificar se filme está na watchlist
  const isInWatchlist = (movieId) => {
    return watchlist.some(m => m.id === movieId);
  };

  // Obter filme da watchlist
  const getWatchlistMovie = (movieId) => {
    return watchlist.find(m => m.id === movieId);
  };

  // Filtrar por status (assistido/não assistido)
  const getWatchedMovies = () => watchlist.filter(m => m.watched);
  const getUnwatchedMovies = () => watchlist.filter(m => !m.watched);

  return {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    toggleWatched,
    isInWatchlist,
    getWatchlistMovie,
    getWatchedMovies,
    getUnwatchedMovies
  };
};
