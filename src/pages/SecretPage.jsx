import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { megaConfetti } from '../utils/confetti';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';
import ImageTrail from '../components/ImageTrail';

const SecretPage = () => {
  const [secretClicked, setSecretClicked] = useState(false);
  const [secretNudge, setSecretNudge]     = useState(0);
  const navigate = useNavigate();

  const handleSecretHover = useCallback(() => {
    setSecretNudge(prev => (prev === 0 ? (Math.random() > 0.5 ? 18 : -18) : 0));
  }, []);

  const handleSecretClick = useCallback(() => {
    setSecretClicked(true);
    megaConfetti();
    setTimeout(() => confetti({ particleCount: 120, spread: 180, startVelocity: 45 }), 600);
    
    // Navigate to final page after another delay
    setTimeout(() => {
      navigate('/final');
    }, 4000);
  }, [navigate]);

  const trailImages = [
    'https://res.cloudinary.com/dry3pzan6/image/upload/v1772715931/onuuwyiatc5atbp43xtb.png',
    'https://res.cloudinary.com/dry3pzan6/image/upload/v1772715930/kyqzwe491zdnm1o35itd.png',
    'https://res.cloudinary.com/dry3pzan6/image/upload/v1772715929/jjpvcy7bougy30prbicv.png',
    'https://res.cloudinary.com/dry3pzan6/image/upload/v1772715923/jlvuncqw8bltkjt5tgds.png',
    'https://res.cloudinary.com/dry3pzan6/image/upload/v1772703162/csnigegu4yjgv7tgp9go.png',
    'https://res.cloudinary.com/dry3pzan6/image/upload/v1772703161/urtuuxgeijtj3kidbi0m.png',
    'https://res.cloudinary.com/dry3pzan6/image/upload/v1764310833/tkhgykbbird4qal6spby.jpg'
  ];

  return (
    <section className="relative min-h-screen py-12 sm:py-16 px-4 sm:px-6 flex flex-col items-center justify-center gap-6 sm:gap-8 overflow-hidden bg-[#060010]">
      {/* Interactive Image Trail Background */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <ImageTrail items={trailImages} variant={2} />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center pointer-events-none"
      >

        {/* ---- BUTTON 3: Secret ---- */}
        <motion.button
          id="secret-btn"
          className="btn-secret rounded-2xl px-6 sm:px-8 py-3.5 sm:py-4 text-base sm:text-lg w-full max-w-xs sm:w-auto sm:max-w-none pointer-events-auto relative z-20"
          animate={{ x: secretNudge }}
          transition={{ type: 'spring', stiffness: 300, damping: 10 }}
          onHoverStart={handleSecretHover}
          onHoverEnd={() => setSecretNudge(0)}
          whileTap={{ scale: 0.92 }}
          onClick={handleSecretClick}
        >
          Click Feature
        </motion.button>
        {secretClicked && (
          <p className="mt-4 px-3 text-base sm:text-lg font-semibold text-white pointer-events-auto">
            Your successful life is coming
          </p>
        )}
      </motion.div>

      {/* Legendary Message */}
      <AnimatePresence>
        {secretClicked && (
          <motion.div
            key="legendary"
            initial={{ opacity: 0, scale: 0.4, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: 'spring', bounce: 0.5, duration: 0.8 }}
            className="relative z-20 text-center px-5 sm:px-8 py-6 sm:py-8 rounded-2xl sm:rounded-3xl w-[calc(100%-1.5rem)] max-w-sm mx-auto shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(77,166,255,0.15), rgba(139,92,246,0.15))',
              border: '2px solid rgba(77,166,255,0.4)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 0 60px rgba(77,166,255,0.3)',
            }}
          >
            <div className="text-4xl sm:text-5xl mb-3">🏆</div>
            <h3
              className="text-xl sm:text-2xl md:text-3xl font-black mb-2"
              style={{
                background: 'linear-gradient(135deg, #4da6ff, #ffd700)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Todays effort, tomorrows victory
            </h3>
            <p className="text-white/50 text-sm mt-4">You were warned... 😄</p>
            <p className="text-white/20 text-xs mt-4 italic">Redirecting to grand finale...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default SecretPage;
