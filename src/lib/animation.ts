import type { Variants, Transition } from 'framer-motion';

export const fastTransition: Transition = {
  duration: 0.15,
  ease: [0.25, 0.1, 0.25, 1],
};

export const normalTransition: Transition = {
  duration: 0.25,
  ease: [0.25, 0.1, 0.25, 1],
};

export const springTransition: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 28,
  mass: 0.8,
};

export const springBouncy: Transition = {
  type: 'spring',
  stiffness: 500,
  damping: 22,
  mass: 0.6,
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: normalTransition,
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: normalTransition,
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: normalTransition,
  },
};

export const fadeInScale: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springTransition,
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: springTransition,
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.08,
    },
  },
};

export const staggerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.04,
    },
  },
};

export const cardHover = {
  scale: 1.02,
  transition: springTransition,
};

export const cardTap = {
  scale: 0.98,
};

export const pulseKeyframes = {
  scale: [1, 1.04, 1],
  transition: { duration: 0.4, ease: 'easeInOut' },
};

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 8 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] },
  },
  exit: {
    opacity: 0,
    y: -4,
    transition: { duration: 0.12, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export const sidebarItem: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: springTransition,
  },
};

export const accordionContent: Variants = {
  collapsed: { height: 0, opacity: 0, transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] } },
  expanded: {
    height: 'auto',
    opacity: 1,
    transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] },
  },
};
