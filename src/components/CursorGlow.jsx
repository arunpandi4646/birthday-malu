import { useEffect, useRef } from 'react';

/**
 * Smooth lerp-driven cursor glow. Pure DOM — no React re-renders.
 * Expands when hovering over any button/link.
 */
const CursorGlow = () => {
  const glowRef = useRef(null);
  const posRef  = useRef({ x: -300, y: -300 });
  const targetRef = useRef({ x: -300, y: -300 });
  const rafRef  = useRef(null);
  const bigRef  = useRef(false);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;

    const lerp = (a, b, t) => a + (b - a) * t;
    const loop = () => {
      posRef.current.x = lerp(posRef.current.x, targetRef.current.x, 0.1);
      posRef.current.y = lerp(posRef.current.y, targetRef.current.y, 0.1);
      const size = bigRef.current ? 80 : 50;
      el.style.transform = `translate(${posRef.current.x - size}px, ${posRef.current.y - size}px)`;
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    const onMove = (e) => { targetRef.current = { x: e.clientX, y: e.clientY }; };

    const onOver = (e) => {
      const node = e.target;
      if (node.closest?.('button') || node.closest?.('a') || node.tagName === 'BUTTON') {
        bigRef.current = true;
        el.style.width = '160px'; el.style.height = '160px'; el.style.opacity = '0.28';
      }
    };
    const onOut = () => {
      bigRef.current = false;
      el.style.width = '100px'; el.style.height = '100px'; el.style.opacity = '0.14';
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    window.addEventListener('mouseout',  onOut,  { passive: true });
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mouseout',  onOut);
    };
  }, []);

  return (
    <div ref={glowRef} aria-hidden="true" style={{
      position:'fixed', top:0, left:0, width:'100px', height:'100px',
      borderRadius:'50%', pointerEvents:'none', zIndex:9999, opacity:0.14,
      mixBlendMode:'screen', willChange:'transform',
      background:'radial-gradient(circle, rgba(77,166,255,0.6) 0%, rgba(139,92,246,0.3) 50%, transparent 75%)',
      transition:'width 0.35s ease, height 0.35s ease, opacity 0.35s ease',
    }} />
  );
};

export default CursorGlow;
