// Traduções para PT-PT e EN-US
export const translations = {
  'pt-PT': {
    // Header
    header: 'Lista de Filmes',
    subtitle: 'Organizando seu catálogo de filmes',
    
    // Navigation
    explore: '🔍 Explorar Filmes',
    watchlist: '📋 Minha Watchlist',
    
    // Search
    searchPlaceholder: '🔍 Buscar filmes...',
    searchButton: '🔍 Buscar',
    searching: '⏳ Buscando...',
    loadPopular: '📺 Carregar Populares',
    
    // Filters
    filters: '🎯 Filtros',
    genre: 'Gênero',
    allGenres: 'Todos os Gêneros',
    year: 'Ano de Lançamento',
    allYears: 'Todos os Anos',
    
    // Movie Card
    addWatchlist: '➕ Adicionar à Lista',
    removeWatchlist: '🗑️ Remover da Lista',
    markWatched: '🎥 Marcar como assistido',
    markUnwatched: '👁️ Marcar como não assistido',
    noDescription: 'Sem descrição disponível',
    noImage: 'Sem Imagem',
    inList: '✓ Na Lista',
    watched: '👁️ Assistido',
    votes: 'Votos',
    
    // Watchlist View
    emptyWatchlist: '📭 Sua watchlist está vazia',
    emptyWatchlistDesc: 'Adicione alguns filmes para começar!',
    toWatch: '🎬 Para Assistir',
    alreadyWatched: '✅ Já Assistidos',
    statistics: '📊 Estatísticas',
    total: 'Total de Filmes',
    watched_count: 'Assistidos',
    toWatch_count: 'Para Assistir',
    
    // Results
    found: 'Encontrados',
    movies: 'filmes',
    
    // Splash Screen
    splashWelcome: 'Bem-vindo a',
    splashSubtitle: 'Seu gerenciador de filmes favoritos',
    splashStart: 'Começar',
    splashBy: 'Desenvolvido por David Arsénio Martins',
    
    // Language
    language: 'Idioma'
  },
  'en-US': {
    // Header
    header: 'Movie List',
    subtitle: 'Organizing your movie catalog',
    
    // Navigation
    explore: '🔍 Explore Movies',
    watchlist: '📋 My Watchlist',
    
    // Search
    searchPlaceholder: '🔍 Search for movies...',
    searchButton: '🔍 Search',
    searching: '⏳ Searching...',
    loadPopular: '📺 Load Popular',
    
    // Filters
    filters: '🎯 Filters',
    genre: 'Genre',
    allGenres: 'All Genres',
    year: 'Release Year',
    allYears: 'All Years',
    
    // Movie Card
    addWatchlist: '➕ Add to List',
    removeWatchlist: '🗑️ Remove from List',
    markWatched: '🎥 Mark as watched',
    markUnwatched: '👁️ Mark as unwatched',
    noDescription: 'No description available',
    noImage: 'No Image',
    inList: '✓ In List',
    watched: '👁️ Watched',
    votes: 'Votes',
    
    // Watchlist View
    emptyWatchlist: '📭 Your watchlist is empty',
    emptyWatchlistDesc: 'Add some movies to get started!',
    toWatch: '🎬 To Watch',
    alreadyWatched: '✅ Already Watched',
    statistics: '📊 Statistics',
    total: 'Total Movies',
    watched_count: 'Watched',
    toWatch_count: 'To Watch',
    
    // Results
    found: 'Found',
    movies: 'movies',
    
    // Splash Screen
    splashWelcome: 'Welcome to',
    splashSubtitle: 'Your favorite movie manager',
    splashStart: 'Start',
    splashBy: 'Developed by David Arsénio Martins',
    
    // Language
    language: 'Language'
  }
};

export const getTranslation = (lang, key) => {
  return translations[lang]?.[key] || translations['en-US'][key] || key;
};
