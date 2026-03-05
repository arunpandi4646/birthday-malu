import React, { useMemo } from 'react';

const ImageTrail = ({ items = [], variant = 1 }) => {
  const positions = useMemo(() => {
    const count = items.length || 1;
    return items.map((_, i) => {
      const top = 8 + (i * 13) % 80;
      const left = 6 + (i * 17) % 88;
      const rotate = (i * 23) % 360;
      const scale = 0.55 + (i % 5) * 0.12 + (variant === 2 ? 0.05 : 0);
      const opacity = 0.08 + (i % 4) * 0.03;
      return { top, left, rotate, scale, opacity, zIndex: i % 3 };
    });
  }, [items, variant]);

  if (!items.length) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {items.map((src, i) => {
        const pos = positions[i];
        return (
          <img
            key={`${src}-${i}`}
            src={src}
            alt=""
            className="absolute w-40 md:w-56 select-none"
            style={{
              top: `${pos.top}%`,
              left: `${pos.left}%`,
              transform: `rotate(${pos.rotate}deg) scale(${pos.scale})`,
              opacity: pos.opacity,
              filter: 'blur(0.5px)',
            }}
            draggable={false}
          />
        );
      })}
    </div>
  );
};

export default ImageTrail;
