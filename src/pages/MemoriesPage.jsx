import React from 'react';
import { motion } from 'framer-motion';
import MagicBento from '../components/MagicBento';
import { useNavigate, useLocation } from 'react-router-dom';
import Magnet from '../components/Magnet';
import kadhaippomaSong from '../music/Kadhaippoma.mp3';

const MemoriesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const audioRef = React.useRef(null);

  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      const playAudio = () => {
        audioRef.current.play().catch(err => {
          console.log("Autoplay blocked, waiting for interaction:", err);
        });
      };
      
      playAudio();
      // Also try playing on any user interaction with the page just in case
      window.addEventListener('click', playAudio, { once: true });
      return () => window.removeEventListener('click', playAudio);
    }
  }, []);

  React.useEffect(() => {
    if (location.state?.autoplay && audioRef.current) {
      audioRef.current.volume = 0.4;
      audioRef.current.play().catch(() => {});
    }
  }, [location.state]);

  return (
    <div className="min-h-screen bg-[#060010] text-white overflow-x-hidden pt-16 sm:pt-20 pb-16 sm:pb-20">
      {/* Background Music - Kadhaippoma */}
      <audio 
        ref={audioRef} 
        src={kadhaippomaSong}
        loop 
        autoPlay
      />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Happy Birthday! May your day be as beautiful as your smile
          </h1>
          <p className="text-white/40 text-base sm:text-lg md:text-xl">
            Hover over the cards to reveal special messages...
          </p>
        </motion.div>

        <MagicBento 
          glowColor="139, 92, 246" 
          enableTilt={true} 
          enableMagnetism={true}
          particleCount={15}
        />

        <div className="flex justify-center sm:justify-end mt-10 sm:mt-12 pb-8 sm:pb-10">
          <Magnet
            padding={50}
            disabled={false}
            magnetStrength={50}
            wrapperClassName="w-full max-w-xs sm:w-auto sm:max-w-none"
            innerClassName="w-full"
          >
            <button 
              onClick={() => navigate('/secret')}
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold shadow-2xl hover:scale-110 active:scale-95 transition-all text-base sm:text-lg cursor-pointer flex items-center justify-center gap-2"
              style={{
                boxShadow: '0 0 30px rgba(139, 92, 246, 0.4)',
              }}
            >
              Continue to Surprise ➡
            </button>
          </Magnet>
        </div>
      </div>
    </div>
  );
};

export default MemoriesPage;
