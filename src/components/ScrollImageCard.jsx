import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const ScrollImageCard = ({ imageUrl, caption, index }) => {
  const containerRef = useRef(null);
  
  // Parallax effect: moves image slightly within its frame
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Moves the image at different speeds (parallax)
  const y = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { 
          duration: 0.8, 
          delay: index * 0.1,
          ease: "easeOut"
        }
      }}
      viewport={{ once: true, amount: 0.2 }}
      className="relative group rounded-2xl overflow-hidden glassmorphism shadow-xl"
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* Grayscale to Color Image Container */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <motion.div
          style={{ y }}
          className="h-full w-full"
        >
          <motion.img
            src={imageUrl}
            alt={caption}
            initial={{ filter: "grayscale(100%)" }}
            whileInView={{ 
              filter: "grayscale(0%)",
              scale: 1.05,
              transition: { duration: 1.2, ease: "easeInOut" }
            }}
            whileHover={{ scale: 1.1, transition: { duration: 0.4 } }}
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        {/* Glow Border Effect */}
        <motion.div 
          className="absolute inset-0 pointer-events-none rounded-2xl"
          initial={{ opacity: 0, border: "0px solid transparent" }}
          whileInView={{ 
            opacity: [0, 0.5, 0.2],
            border: "2px solid rgba(77, 166, 255, 0.5)",
            boxShadow: "0 0 20px rgba(77, 166, 255, 0.3)",
            transition: { duration: 1.5, delay: 0.5 }
          }}
        />
      </div>

      {/* Caption Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ 
          opacity: 1, 
          y: 0,
          transition: { delay: index * 0.2 + 0.4, duration: 0.6 }
        }}
        className="p-4 text-center"
      >
        <p className="text-white text-lg font-medium drop-shadow-md">
          {caption}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default ScrollImageCard;
