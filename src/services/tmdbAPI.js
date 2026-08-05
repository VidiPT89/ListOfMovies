import axios from 'axios';

const API_KEY = 'e4f451098f68b2b2d2ad9f82a0e42e96'; // Chave gratuita para demo (considere usar variáveis de ambiente)
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const tmdbAPI = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'pt-BR'
  }
});

export const movieService = {
  // Buscar filmes por termo de busca
  searchMovies: async (query, page = 1) => {
    try {
      const response = await tmdbAPI.get('/search/movie', {
        params: {
          query,
          page
        }
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar filmes:', error);
      throw error;
    }
  },

  // Obter filmes mais populares
  getPopularMovies: async (page = 1) => {
    try {
      const response = await tmdbAPI.get('/movie/popular', {
        params: {
          page
        }
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao obter filmes populares:', error);
      throw error;
    }
  },

  // Obter detalhes do filme
  getMovieDetails: async (movieId) => {
    try {
      const response = await tmdbAPI.get(`/movie/${movieId}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao obter detalhes do filme:', error);
      throw error;
    }
  },

  // Obter gêneros
  getGenres: async () => {
    try {
      const response = await tmdbAPI.get('/genre/movie/list');
      return response.data.genres;
    } catch (error) {
      console.error('Erro ao obter gêneros:', error);
      throw error;
    }
  },

  // Descobrir filmes com filtros
  discoverMovies: async (filters = {}) => {
    try {
      const response = await tmdbAPI.get('/discover/movie', {
        params: {
          ...filters
        }
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao descobrir filmes:', error);
      throw error;
    }
  },

  // URL para imagem de capa
  getImageURL: (path) => path ? `${IMAGE_BASE_URL}${path}` : null
};

export default movieService;
