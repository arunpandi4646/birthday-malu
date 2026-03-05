import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { softConfetti } from '../utils/confetti';
import { useNavigate } from 'react-router-dom';
import Magnet from '../components/Magnet';
import EmojiLogo from '../components/EmojiLogo';

const HomePage = () => {
  const [isOpened, setIsOpened] = useState(false);
  const navigate = useNavigate();

  const handleHeroClick = useCallback(() => {
    if (!isOpened) {
      setIsOpened(true);
      softConfetti({ y: 0.5, x: 0.5 });
      // Navigate to cards page and trigger autoplay
      navigate('/memories', { state: { autoplay: true } });
    }
  }, [isOpened, navigate]);

  return (
    <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 text-center overflow-hidden">
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
        <EmojiLogo label="React Bits" emoji={'\uD83D\uDE80'} />
      </div>

      {/* Glowing orbs */}
      <div
        className="absolute w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(77,166,255,0.12) 0%, transparent 70%)',
          top: '20%', left: '50%', transform: 'translateX(-50%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        className="absolute w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)',
          bottom: '20%', right: '10%',
          filter: 'blur(50px)',
        }}
      />

      <AnimatePresence mode='wait'>
        {isOpened && (
          <motion.div
            key="birthday-message"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex flex-col items-center px-2"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-5 sm:mb-6 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium"
              style={{
                background: 'rgba(77,166,255,0.1)',
                border: '1px solid rgba(77,166,255,0.3)',
                color: '#4da6ff',
                backdropFilter: 'blur(10px)',
              }}
            >
              🎉 A Magical Birthday Experience
            </motion.div>

            {/* Heading */}
            <motion.h1
              className="hero-birthday-title mb-4 leading-tight"
            >
              Happy Birthday! May your day be as beautiful as your smile
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-white/50 text-base sm:text-lg md:text-xl mb-10 sm:mb-12 max-w-xs sm:max-w-md"
      >
        {isOpened ? "Something magical just happened..." : "Something magical is waiting for you..."}
      </motion.p>

      <div className="flex flex-col items-center gap-5 sm:gap-6 w-full">
        <Magnet
          padding={50}
          disabled={isOpened}
          magnetStrength={30}
          wrapperClassName="w-full max-w-xs sm:w-auto sm:max-w-none"
          innerClassName="w-full"
        >
          <motion.button
            id="hero-surprise-btn"
            className="btn-hero rounded-2xl w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-5 text-white text-base sm:text-xl md:text-2xl font-bold shadow-2xl transition-all"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', bounce: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleHeroClick}
            disabled={isOpened}
            style={isOpened ? { opacity: 0.6, cursor: 'default', filter: 'grayscale(0.5)' } : {}}
          >
            {isOpened ? "Surprise Unlocked! 💖" : "Open Your Surprise 🎉"}
          </motion.button>
        </Magnet>

        {!isOpened && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-white/30 text-xs"
          >
            Click the button to continue...
          </motion.div>
        )}
      </div>

      {isOpened && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="mt-10 sm:mt-12 text-white/40 text-sm animate-pulse"
        >
          Taking you to the journey... ✨
        </motion.div>
      )}
    </section>
  );
};

export default HomePage;
