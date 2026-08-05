import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getTranslation } from '../../locales/translations';

const SplashScreen = ({ onAnimationComplete, language }) => {
  const [displayCounter, setDisplayCounter] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayCounter(displayCounter + 1);
    }, 2800); // Duração total: 2.8 segundos

    return () => clearTimeout(timer);
  }, [displayCounter]);

  useEffect(() => {
    if (displayCounter >= 1) {
      onAnimationComplete();
    }
  }, [displayCounter, onAnimationComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center z-50">
      {/* Animated Background Orbs */}
      <motion.div
        className="absolute w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-20"
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          top: '-10%',
          left: '10%',
        }}
      />

      <motion.div
        className="absolute w-96 h-96 bg-cyan-600 rounded-full blur-3xl opacity-20"
        animate={{
          x: [0, -30, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          bottom: '-10%',
          right: '10%',
        }}
      />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-6"
      >
        {/* Logo/Icon Animation */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{
            duration: 2,
            ease: 'easeInOut',
          }}
          className="mb-6"
        >
          <span className="text-7xl inline-block">🎬</span>
        </motion.div>

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-lg text-cyan-400 font-light tracking-widest uppercase mb-3">
            {getTranslation(language, 'splashWelcome')}
          </p>
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            {getTranslation(language, 'header')}
          </h1>
          <p className="text-gray-300 text-xl md:text-2xl font-light">
            {getTranslation(language, 'splashSubtitle')}
          </p>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100px' }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto my-8 rounded-full"
        />

        {/* Credits */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="space-y-3 text-sm md:text-base"
        >
          <p className="text-gray-400">
            {getTranslation(language, 'splashBy')}
          </p>
          <div className="flex justify-center gap-6 text-gray-400">
            <a
              href="https://ividi.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition-colors"
            >
              🌐 ividi.dev
            </a>
            <a
              href="https://github.com/VidiPT89/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition-colors"
            >
              💻 GitHub
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* Loading Bar */}
      <motion.div
        className="absolute bottom-12 left-0 right-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="w-12 h-12 mx-auto mb-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="w-full h-full border-3 border-transparent border-t-purple-500 border-r-cyan-500 rounded-full"
          />
        </div>
        <motion.div
          className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 mx-auto"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{
            duration: 2.5,
            ease: 'easeInOut',
          }}
          style={{ maxWidth: '200px' }}
        />
      </motion.div>
    </div>
  );
};

export default SplashScreen;
