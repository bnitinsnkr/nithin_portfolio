import type { Transition, Variants } from 'framer-motion';

/**
 * Shared motion vocabulary.
 *
 * Only `transform` and `opacity` are ever animated so every transition stays
 * on the compositor. Easing is a spring-flavoured cubic bézier rather than a
 * stock `ease-in-out`.
 */
export const EASE_SPRING = [0.16, 1, 0.3, 1] as const;
export const EASE_OUT_EXPO = [0.19, 1, 0.22, 1] as const;

export const transition: Transition = {
  duration: 0.7,
  ease: EASE_SPRING,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { ...transition, duration: 0.9 } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition },
};

/** Parent that staggers its children. `custom` overrides the delay step. */
export const stagger = (step = 0.08, delay = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: step, delayChildren: delay },
  },
});

/** Per-word or per-character reveal used by the text-reveal component. */
export const revealChild: Variants = {
  hidden: { opacity: 0, y: '0.55em' },
  visible: {
    opacity: 1,
    y: '0em',
    transition: { duration: 0.8, ease: EASE_SPRING },
  },
};

/** Standard viewport config: animate once, slightly before fully in view. */
export const viewportOnce = { once: true, margin: '-12% 0px -12% 0px' } as const;
