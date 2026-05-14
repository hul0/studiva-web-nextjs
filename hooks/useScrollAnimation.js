import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const useScrollAnimation = (options = {}) => {
  const ref = useRef(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    const {
      from = { opacity: 0, y: 60 },
      to = { opacity: 1, y: 0 },
      duration = 0.9,
      ease = 'power3.out',
      delay = 0,
      start = 'top 85%',
      once = true,
    } = options;

    gsap.fromTo(el, from, { 
      ...to, 
      duration, 
      ease, 
      delay,
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: once ? 'play none none none' : 'play none none reverse',
      }
    });
  }, { scope: ref });

  return ref;
};

export const useStaggerAnimation = (options = {}) => {
  const ref = useRef(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    const {
      childSelector = '.stagger-item',
      from = { opacity: 0, y: 50 },
      to = { opacity: 1, y: 0 },
      duration = 0.7,
      stagger = 0.12,
      ease = 'power3.out',
      start = 'top 80%',
    } = options;

    const children = el.querySelectorAll(childSelector);
    if (!children.length) return;

    gsap.fromTo(children, from, { 
      ...to, 
      duration, 
      ease, 
      stagger,
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: 'play none none none',
      }
    });

  }, { scope: ref });

  return ref;
};

export const useParallax = (speed = 0.5) => {
  const ref = useRef(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    gsap.to(el, {
      yPercent: -30 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, { scope: ref, dependencies: [speed] });

  return ref;
};
