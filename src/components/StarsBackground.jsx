import { useMemo } from 'react';

const StarsBackground = () => {
  const stars = useMemo(() => {
    return Array.from({ length: 80 }, (_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      dur: `${Math.random() * 3 + 2}s`,
      delay: `${Math.random() * 4}s`,
      opacity: Math.random() * 0.5 + 0.1,
    }));
  }, []);

  return (
    <div className="stars-bg">
      {stars.map((s) => (
        <div
          key={s.id}
          className="star"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.opacity,
            '--dur': s.dur,
            '--delay': s.delay,
          }}
        />
      ))}
    </div>
  );
};

export default StarsBackground;
