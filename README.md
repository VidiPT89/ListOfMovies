# 🎬 List of Movies

> A modern, elegant movie watchlist manager with an animated glassmorphism interface, bilingual support (PT/EN), and seamless TMDB API integration.

List of Movies is a sophisticated React app that helps you discover, organize and manage your personal movie catalog. The project combines a premium animated interface, full TMDB integration, customizable filters, and a smooth, professional experience, all built with React, Vite, Framer Motion and Tailwind CSS.

## ✨ Main Features

- 🔍 **Search movies** in real-time using the free TMDB API
- ➕ **Add to watchlist** and organize your movie collection
- 🎯 **Filter by genre and release year** to discover movies
- ✅ **Mark as watched** and track your viewing progress
- 📊 **View statistics** of your watchlist (total, watched, to watch)
- 💾 **Local persistence** — Your data is saved in browser storage
- 🌍 **Bilingual support** — One-click toggle between Portuguese and English
- 🎬 **Smooth animations and micro-interactions** — Floating gradient orbs, staggered entrances, hover effects and Framer Motion powered transitions
- 🎨 **Glassmorphism interface** — Modern, premium aesthetic with backdrop blur effects
- 📱 **Fully responsive layout** — From mobile to desktop

## 🛠️ Technologies

![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat&logo=framer&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-671DDF?style=flat&logo=axios&logoColor=white)

## 🧱 Project Structure

```text
ListOfMovies/
├── index.html                         # HTML entry point
├── src/
│   ├── main.jsx                       # React entry point
│   ├── App.jsx                        # App shell, layout and composition
│   ├── index.css                      # Theme, layout and animations
│   ├── components/
│   │   ├── MovieCard/
│   │   │   └── MovieCard.jsx          # Individual movie card with actions
│   │   ├── SearchBar/
│   │   │   └── SearchBar.jsx          # Search input with real-time feedback
│   │   ├── FilterPanel/
│   │   │   └── FilterPanel.jsx        # Genre and year filter controls
│   │   ├── WatchlistView/
│   │   │   └── WatchlistView.jsx      # Watched/unwatched movie display
│   │   ├── SplashScreen/
│   │   │   └── SplashScreen.jsx       # Animated intro screen
│   │   └── LanguageToggle/
│   │       └── LanguageToggle.jsx     # PT/EN language switcher
│   ├── hooks/
│   │   ├── useWatchlist.js            # Watchlist state and persistence
│   │   └── useLanguage.js             # Language state and persistence
│   ├── locales/
│   │   └── translations.js            # PT/EN translations
│   └── services/
│       └── tmdbAPI.js                 # TMDB API wrapper with Axios
├── package.json                       # Dependencies and scripts
├── vite.config.js                     # Vite configuration
├── tailwind.config.js                 # Tailwind CSS configuration
├── postcss.config.js                  # PostCSS configuration
├── LICENSE                            # MIT License
└── README.md                          # Project documentation
```

## ▶️ How to Run

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/VidiPT89/ListOfMovies.git
cd ListOfMovies
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will open automatically at `http://localhost:3000`

## 📦 Available Scripts

- `npm run dev` — Start development server with hot reload
- `npm run build` — Create optimized production build
- `npm run preview` — Preview production build locally

## 🎯 How to Use

### Explore Movies
1. Click **🔍 Explore Movies** tab
2. **Search** for a specific movie title or **Load Popular** movies
3. Use **Filters** to refine by genre and release year
4. Click **➕ Add to List** to save a movie to your watchlist

### Manage Watchlist
1. Navigate to **📋 My Watchlist** tab
2. Organize your movies between:
   - **🎬 To Watch** — Movies you want to see
   - **✅ Already Watched** — Movies you've completed
3. Click the status button to toggle between watched/unwatched
4. View your **📊 Statistics** to track progress

## 🔑 TMDB API

This application uses the free TMDB (The Movie Database) API. 

For production, you should:
1. Get your API key from [TMDB Settings](https://www.themoviedb.org/settings/api)
2. Store it as an environment variable instead of hardcoding

Create `.env.local`:
```
VITE_TMDB_API_KEY=your_key_here
```

Then update `src/services/tmdbAPI.js`:
```javascript
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
```

## 🧩 Project Highlights

This project focuses on delivering a smooth, modern and professional experience while maintaining clean, readable code. It showcases:

- **State Management** — Custom React hooks for watchlist and language persistence
- **Animations** — Framer Motion powered micro-interactions and smooth transitions
- **Responsive Design** — Mobile-first approach with Tailwind CSS
- **API Integration** — Real-time movie data with error handling and loading states
- **i18n** — Bilingual support with localStorage persistence
- **Glassmorphism** — Modern UI aesthetic with backdrop blur effects
- **Accessibility** — Keyboard navigation and semantic HTML

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for more information.

---

Developed by **David Arsénio Martins**  
🌐 [ividi.dev](https://ividi.dev/) · 💻 [github.com/VidiPT89](https://github.com/VidiPT89/)
