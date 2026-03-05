import confetti from 'canvas-confetti';

export const softConfetti = (origin) => {
    confetti({
        particleCount: 80,
        spread: 70,
        origin: origin || { y: 0.6 },
        colors: ['#4da6ff', '#8b5cf6', '#ffb347', '#ffd700', '#ff69b4', '#ffffff'],
        ticks: 150,
        scalar: 1.1,
        drift: 0.5,
    });
};

export const megaConfetti = () => {
    const count = 250;
    const defaults = { origin: { y: 0.7 } };
    const fire = (particleRatio, opts) => {
        confetti({ ...defaults, ...opts, particleCount: Math.floor(count * particleRatio) });
    };
    fire(0.25, { spread: 26, startVelocity: 55, colors: ['#ffd700', '#ffb347'] });
    fire(0.2, { spread: 60, colors: ['#4da6ff', '#7c3aed'] });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8, colors: ['#ff69b4', '#ffffff'] });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2, colors: ['#ffd700', '#4da6ff'] });
    fire(0.1, { spread: 120, startVelocity: 45, colors: ['#8b5cf6', '#ffb347'] });
};
