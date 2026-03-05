import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Emits small sparkle particles when the mouse moves fast.
 * Uses a cooldown to keep particle count low (perf-friendly).
 */
const SparkleLayer = () => {
  const [sparkles, setSparkles] = useState([]);
  const lastPos  = useRef({ x: 0, y: 0 });
  const cooldown = useRef(false);

  useEffect(() => {
    const EMOJIS = ['✨', '⭐', '💫', '🌟', '·', '✦'];
    const THRESHOLD = 16;

    const handleMove = (e) => {
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);
      lastPos.current = { x: e.clientX, y: e.clientY };

      if (speed < THRESHOLD || cooldown.current) return;
      cooldown.current = true;
      setTimeout(() => { cooldown.current = false; }, 90);

      const id = Date.now() + Math.random();
      const s = {
        id,
        x: e.clientX + (Math.random() - 0.5) * 32,
        y: e.clientY + (Math.random() - 0.5) * 32,
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        size: 0.8 + Math.random() * 0.7,
      };
      setSparkles(prev => [...prev.slice(-10), s]);
      // auto-remove after animation
      setTimeout(() => setSparkles(prev => prev.filter(p => p.id !== id)), 650);
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div style={{ position:'fixed', inset:0, pointerEvents:'none', zIndex:9998 }}>
      <AnimatePresence>
        {sparkles.map(s => (
          <motion.div
            key={s.id}
            initial={{ opacity: 1, scale: s.size, y: 0, x: 0 }}
            animate={{ opacity: 0, scale: 0, y: -35 - Math.random()*20, x: (Math.random()-0.5)*20 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              left: s.x,
              top: s.y,
              fontSize: `${s.size}rem`,
              lineHeight: 1,
              userSelect: 'none',
            }}
          >
            {s.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default SparkleLayer;
