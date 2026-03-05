import React from 'react';

const FloatingStars = ({ active }) => {
  const stars = ['⭐', '🌟', '💫', '✨', '⭐', '🌟', '💫', '✨', '⭐', '🌟'];
  if (!active) return null;
  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {stars.map((s, i) => (
        <div
          key={i}
          className="floating-star"
          style={{
            left: `${5 + i * 9.5}%`,
            bottom: '0',
            fontSize: `${1.5 + Math.random() * 1.5}rem`,
            '--dur': `${2 + Math.random() * 2}s`,
            animationDelay: `${i * 0.15}s`,
          }}
        >
          {s}
        </div>
      ))}
    </div>
  );
};

export default FloatingStars;
