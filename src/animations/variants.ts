import type { Easing, Transition, Variants } from "framer-motion";

/** Signature easing — long, confident settle. */
export const EASE: Easing = [0.16, 1, 0.3, 1];

export const EASE_IN_OUT: Easing = [0.65, 0, 0.35, 1];

export const SOFT: Transition = { duration: 0.7, ease: EASE };

export const SNAPPY: Transition = { duration: 0.35, ease: EASE };

export const SPRING: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 26,
  mass: 0.9,
};

export const SPRING_BOUNCY: Transition = {
  type: "spring",
  stiffness: 340,
  damping: 20,
  mass: 0.8,
};

/* ------------------------------- containers ------------------------------- */

export const staggerChildren = (stagger = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

export const fadeUpContainer = (stagger = 0.09, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

/* --------------------------------- children -------------------------------- */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: SOFT },
};

export const fadeUpSmall: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: SNAPPY },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.9, ease: EASE } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: SOFT },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: SOFT },
};

/** Reveal from a clip — used for editorial headlines. */
export const maskReveal: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.9, ease: EASE } },
};

/* ----------------------------- route transitions --------------------------- */

export const pageEnter: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

/* --------------------------- horizontal carousels -------------------------- */

export const stepSlide = (direction: number): Variants => ({
  hidden: (custom: number) => ({
    opacity: 0,
    x: custom * 48,
    filter: "blur(6px)",
  }),
  show: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: SOFT,
  },
  exit: (custom: number) => ({
    opacity: 0,
    x: custom * -48,
    filter: "blur(6px)",
    transition: { duration: 0.35, ease: EASE_IN_OUT },
  }),
});

export const modalOverlay: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

export const modalPanel: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 16 },
  show: { opacity: 1, scale: 1, y: 0, transition: SPRING },
  exit: { opacity: 0, scale: 0.97, y: 10, transition: { duration: 0.25, ease: EASE_IN_OUT } },
};
