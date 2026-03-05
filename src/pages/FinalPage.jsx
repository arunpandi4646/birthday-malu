import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { megaConfetti } from '../utils/confetti';
import confetti from 'canvas-confetti';
import FloatingStars from '../components/FloatingStars';
import { useNavigate } from 'react-router-dom';
import nanbiyaSong from '../music/Nanbiya.mp3';

const FinalPage = () => {
  const [finalClicked, setFinalClicked]   = useState(false);
  const [starsBurst, setStarsBurst]       = useState(false);
  const audioRef = React.useRef(null);
  const navigate = useNavigate();

  const handleFinalClick = useCallback(() => {
    setFinalClicked(true);
    setStarsBurst(true);
    
    // Play the song "Nanbiye"
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(err => console.log("Audio play failed:", err));
    }

    megaConfetti();
    setTimeout(() => confetti({ particleCount: 150, spread: 160, origin: { y: 0.3 } }), 500);
    setTimeout(() => confetti({ particleCount: 100, spread: 200, origin: { y: 0.8 } }), 1000);
    setTimeout(() => setStarsBurst(false), 5000);
  }, []);

  return (
    <section className="relative z-10 min-h-screen py-16 sm:py-20 md:py-24 px-4 sm:px-6 flex flex-col items-center justify-center gap-8 sm:gap-10 overflow-hidden">
      {/* Background Music - Nanbiye */}
      <audio 
        ref={audioRef} 
        src={nanbiyaSong} 
        loop 
      />
      
      <FloatingStars active={starsBurst} />
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-2 leading-tight">
          One Last Thing... ✨
        </h2>
        <p className="text-white/40 text-base sm:text-lg mb-6 sm:mb-8">The grand finale awaits!</p>
      </motion.div>

      {/* ---- BUTTON 4: Final Surprise ---- */}
      <motion.button
        id="final-surprise-btn"
        className="btn-final rounded-2xl sm:rounded-3xl px-6 sm:px-10 md:px-12 py-4 sm:py-6 md:py-7 text-white text-lg sm:text-2xl md:text-3xl font-black shadow-2xl w-full max-w-xs sm:max-w-sm"
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', bounce: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.93 }}
        animate={!finalClicked ? {
          scale: [1, 1.04, 1],
          transition: { duration: 2, repeat: Infinity, repeatType: 'loop' }
        } : {}}
        onClick={handleFinalClick}
      >
        <span className="btn-text">Final Surprise 🎁</span>
      </motion.button>

      {/* Final Message */}
      <AnimatePresence>
        {finalClicked && (
          <motion.div
            key="final-msg"
            initial={{ opacity: 0, scale: 0.5, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', bounce: 0.45, duration: 0.9 }}
            className="text-center px-5 sm:px-8 py-7 sm:py-10 rounded-3xl sm:rounded-[3rem] w-[calc(100%-1.5rem)] max-w-lg mx-auto shadow-2xl mt-8 sm:mt-12"
            style={{
              background: 'linear-gradient(135deg, rgba(255,215,0,0.1), rgba(77,166,255,0.1))',
              border: '2px solid rgba(255,215,0,0.4)',
              backdropFilter: 'blur(30px)',
              boxShadow: '0 0 80px rgba(255,215,0,0.3), 0 0 160px rgba(77,166,255,0.15)',
            }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 10, 0] }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-5xl sm:text-6xl md:text-8xl mb-5 sm:mb-6"
            >🥰</motion.div>
            <h1
              className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight mb-4"
              style={{
                background: 'linear-gradient(135deg, #ffd700, #4da6ff, #ff69b4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              So Lucky To Have You As My Best Friend!
            </h1>
            <p className="text-white/60 text-base sm:text-lg md:text-xl font-medium mb-7 sm:mb-8">
              Thank you for being absolutely legendary. 🌟
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              {['🎂', '🎉', '🥂', '💖', '🎊', '✨'].map((em, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.1, type: 'spring', bounce: 0.6 }}
                  className="text-3xl sm:text-4xl"
                >
                  {em}
                </motion.span>
              ))}
            </div>
            <motion.button
              onClick={() => navigate('/')}
              className="mt-8 sm:mt-12 text-white/30 hover:text-white/70 text-sm transition-colors"
            >
              ⬅ Back to Home
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-white/20 text-xs text-center mt-8 sm:mt-12 pb-6 sm:pb-10"
      >
        Made with 💖 just for you
      </motion.p>
    </section>
  );
};

export default FinalPage;

