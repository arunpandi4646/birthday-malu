import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MemoryModal = ({ isOpen, onClose, image, title }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Play a birthday tune via Web Audio API
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();
        const notes = [
          { freq: 523.25, dur: 0.3 },  // C5
          { freq: 523.25, dur: 0.3 },  // C5
          { freq: 587.33, dur: 0.6 },  // D5
          { freq: 523.25, dur: 0.6 },  // C5
          { freq: 698.46, dur: 0.6 },  // F5
          { freq: 659.25, dur: 1.2 },  // E5
          { freq: 523.25, dur: 0.3 },  // C5
          { freq: 523.25, dur: 0.3 },  // C5
          { freq: 587.33, dur: 0.6 },  // D5
          { freq: 523.25, dur: 0.6 },  // C5
          { freq: 783.99, dur: 0.6 },  // G5
          { freq: 698.46, dur: 1.2 },  // F5
        ];
        let time = ctx.currentTime + 0.1;
        notes.forEach(({ freq, dur }) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.frequency.value = freq;
          osc.type = 'sine';
          gain.gain.setValueAtTime(0.3, time);
          gain.gain.exponentialRampToValueAtTime(0.001, time + dur);
          osc.start(time);
          osc.stop(time + dur + 0.05);
          time += dur;
        });
      } catch (e) {
        console.log('Audio not supported:', e);
      }
    }
  }, [isOpen]);

  // Close modal with Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backdropFilter: 'blur(20px)', backgroundColor: 'rgba(6,6,15,0.7)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 30 }}
            transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
            className="rounded-3xl overflow-hidden max-w-lg w-full relative"
            style={{
              background: 'linear-gradient(135deg, rgba(20,20,40,0.95), rgba(30,15,50,0.95))',
              border: '1px solid rgba(77,166,255,0.3)',
              boxShadow: '0 0 60px rgba(77,166,255,0.3), 0 40px 80px rgba(0,0,0,0.5)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors"
              style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}
            >
              ✕
            </button>

            {/* Image with zoom zoom animation */}
            <motion.div
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="w-full h-64 flex items-center justify-center overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #1a0a2e, #0d1b4b)' }}
            >
              <div className="text-8xl">{image || '📸'}</div>
            </motion.div>

            {/* Content */}
            <div className="p-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-2xl font-bold mb-3" style={{ color: '#4da6ff' }}>
                  {title || 'A Beautiful Memory ✨'}
                </h3>
                <p className="text-white/60 leading-relaxed text-sm">
                  Every moment with you is a treasure. This memory lives forever in my heart. 💜
                </p>
                <div className="mt-6 flex gap-2 justify-center">
                  {['⭐','🌟','✨','💫','⭐'].map((s, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="text-2xl"
                    >
                      {s}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MemoryModal;
