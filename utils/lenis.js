import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Native scroll — no Lenis, no lag
export const initLenis = () => {
    // Just sync ScrollTrigger with native scroll
    window.addEventListener('scroll', ScrollTrigger.update, { passive: true });
    return null;
};

export const destroyLenis = () => {
    window.removeEventListener('scroll', ScrollTrigger.update);
};

export const getLenis = () => null;
