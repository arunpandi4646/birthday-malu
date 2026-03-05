import { useEffect, useRef, useCallback } from 'react';

/**
 * Single global rAF-driven mouse tracker.
 * Returns { pos, vel, subscribe } where subscribe(fn) registers a frame callback.
 * Keeps the hot path (mousemove → rAF) out of React's render cycle.
 */
let _pos = { x: 0, y: 0 };
let _prev = { x: 0, y: 0 };
let _vel = { x: 0, y: 0 };
let _rafId = null;
const _subs = new Set();

function _tick() {
    _vel.x = _pos.x - _prev.x;
    _vel.y = _pos.y - _prev.y;
    _prev = { ..._pos };
    _subs.forEach(fn => fn({ pos: _pos, vel: _vel }));
    _rafId = requestAnimationFrame(_tick);
}

function _start() {
    if (_rafId === null) _rafId = requestAnimationFrame(_tick);
}

if (typeof window !== 'undefined') {
    window.addEventListener('mousemove', (e) => {
        _pos = { x: e.clientX, y: e.clientY };
        _start();
    }, { passive: true });
}

/** Hook: subscribe a callback(frame) on every rAF tick while mounted. */
export function useMouseFrame(callback) {
    const cbRef = useCallback(callback, []);  // stable ref pattern
    const stableRef = useRef(callback);
    stableRef.current = callback;

    useEffect(() => {
        const fn = (frame) => stableRef.current(frame);
        _subs.add(fn);
        _start();
        return () => _subs.delete(fn);
    }, []);
}

/** Hook: returns a ref whose current = { x, y } mouse position (no re-renders). */
export function useMousePosRef() {
    const ref = useRef({ x: 0, y: 0 });
    useMouseFrame(({ pos }) => { ref.current = pos; });
    return ref;
}
