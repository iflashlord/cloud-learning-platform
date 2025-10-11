/**
 * Animation and Motion system for AWS Learning Platform
 * 
 * Provides consistent animations, transitions, and micro-interactions
 * that enhance the learning experience while maintaining performance.
 */

// Duration scales - based on material design and user research
export const DURATIONS = {
  immediate: '0ms',
  fast: '150ms',
  normal: '250ms',
  slow: '400ms',
  slower: '600ms',
  slowest: '1000ms',
} as const;

// Easing functions - optimized for different interaction types
export const EASINGS = {
  // Standard easings
  linear: 'linear',
  ease: 'ease',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
  
  // Custom cubic-bezier curves
  spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',      // Bouncy spring
  gentle: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',        // Gentle movement
  swift: 'cubic-bezier(0.4, 0, 0.2, 1)',                 // Swift entrance
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',                 // Sharp exit
  bouncy: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',     // Playful bounce
  elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',   // Elastic feel
  
  // Gamification specific
  success: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',      // Celebration feel
  error: 'cubic-bezier(0.6, 0.04, 0.98, 0.335)',        // Alert attention
  progress: 'cubic-bezier(0.4, 0, 0.2, 1)',             // Smooth progress
} as const;

// Common animation presets
export const ANIMATIONS = {
  // Entrance animations
  entrance: {
    fadeIn: {
      from: { opacity: 0 },
      to: { opacity: 1 },
      duration: DURATIONS.normal,
      easing: EASINGS.ease,
    },
    slideInUp: {
      from: { opacity: 0, transform: 'translateY(20px)' },
      to: { opacity: 1, transform: 'translateY(0)' },
      duration: DURATIONS.normal,
      easing: EASINGS.swift,
    },
    slideInDown: {
      from: { opacity: 0, transform: 'translateY(-20px)' },
      to: { opacity: 1, transform: 'translateY(0)' },
      duration: DURATIONS.normal,
      easing: EASINGS.swift,
    },
    slideInLeft: {
      from: { opacity: 0, transform: 'translateX(-20px)' },
      to: { opacity: 1, transform: 'translateX(0)' },
      duration: DURATIONS.normal,
      easing: EASINGS.swift,
    },
    slideInRight: {
      from: { opacity: 0, transform: 'translateX(20px)' },
      to: { opacity: 1, transform: 'translateX(0)' },
      duration: DURATIONS.normal,
      easing: EASINGS.swift,
    },
    scaleIn: {
      from: { opacity: 0, transform: 'scale(0.95)' },
      to: { opacity: 1, transform: 'scale(1)' },
      duration: DURATIONS.fast,
      easing: EASINGS.spring,
    },
    bounceIn: {
      from: { opacity: 0, transform: 'scale(0.3)' },
      to: { opacity: 1, transform: 'scale(1)' },
      duration: DURATIONS.slow,
      easing: EASINGS.bouncy,
    },
  },

  // Exit animations
  exit: {
    fadeOut: {
      from: { opacity: 1 },
      to: { opacity: 0 },
      duration: DURATIONS.fast,
      easing: EASINGS.ease,
    },
    slideOutUp: {
      from: { opacity: 1, transform: 'translateY(0)' },
      to: { opacity: 0, transform: 'translateY(-20px)' },
      duration: DURATIONS.fast,
      easing: EASINGS.sharp,
    },
    slideOutDown: {
      from: { opacity: 1, transform: 'translateY(0)' },
      to: { opacity: 0, transform: 'translateY(20px)' },
      duration: DURATIONS.fast,
      easing: EASINGS.sharp,
    },
    scaleOut: {
      from: { opacity: 1, transform: 'scale(1)' },
      to: { opacity: 0, transform: 'scale(0.95)' },
      duration: DURATIONS.fast,
      easing: EASINGS.sharp,
    },
  },

  // Micro-interactions
  micro: {
    buttonPress: {
      duration: DURATIONS.immediate,
      easing: EASINGS.sharp,
      transform: 'translateY(1px) scale(0.98)',
    },
    buttonHover: {
      duration: DURATIONS.fast,
      easing: EASINGS.gentle,
      transform: 'translateY(-2px)',
    },
    cardHover: {
      duration: DURATIONS.normal,
      easing: EASINGS.gentle,
      transform: 'translateY(-4px)',
      boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    },
    pulse: {
      duration: DURATIONS.slowest,
      easing: EASINGS.easeInOut,
      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    },
    heartbeat: {
      duration: DURATIONS.slower,
      easing: EASINGS.easeInOut,
      animation: 'heartbeat 1.5s ease-in-out infinite',
    },
  },

  // Gamification animations
  gamification: {
    streakIncrement: {
      keyframes: [
        { transform: 'scale(1)', offset: 0 },
        { transform: 'scale(1.2)', offset: 0.5 },
        { transform: 'scale(1)', offset: 1 },
      ],
      duration: DURATIONS.slow,
      easing: EASINGS.bouncy,
    },
    xpGain: {
      keyframes: [
        { transform: 'translateY(0) scale(1)', opacity: 0, offset: 0 },
        { transform: 'translateY(-20px) scale(1.1)', opacity: 1, offset: 0.5 },
        { transform: 'translateY(-40px) scale(1)', opacity: 0, offset: 1 },
      ],
      duration: DURATIONS.slowest,
      easing: EASINGS.easeOut,
    },
    achievementUnlock: {
      keyframes: [
        { transform: 'scale(0) rotate(-180deg)', opacity: 0, offset: 0 },
        { transform: 'scale(1.2) rotate(0deg)', opacity: 1, offset: 0.7 },
        { transform: 'scale(1) rotate(0deg)', opacity: 1, offset: 1 },
      ],
      duration: DURATIONS.slowest,
      easing: EASINGS.elastic,
    },
    progressFill: {
      from: { transform: 'scaleX(0)' },
      to: { transform: 'scaleX(1)' },
      duration: DURATIONS.slower,
      easing: EASINGS.progress,
    },
    celebration: {
      keyframes: [
        { transform: 'rotate(0deg) scale(1)', offset: 0 },
        { transform: 'rotate(10deg) scale(1.1)', offset: 0.25 },
        { transform: 'rotate(-10deg) scale(1.1)', offset: 0.75 },
        { transform: 'rotate(0deg) scale(1)', offset: 1 },
      ],
      duration: DURATIONS.slow,
      easing: EASINGS.bouncy,
      iterationCount: 2,
    },
  },

  // Loading animations
  loading: {
    spinner: {
      keyframes: [
        { transform: 'rotate(0deg)' },
        { transform: 'rotate(360deg)' },
      ],
      duration: DURATIONS.slowest,
      easing: EASINGS.linear,
      iterationCount: 'infinite',
    },
    dots: {
      keyframes: [
        { opacity: 0.4, transform: 'scale(1)' },
        { opacity: 1, transform: 'scale(1.2)' },
        { opacity: 0.4, transform: 'scale(1)' },
      ],
      duration: DURATIONS.slowest,
      easing: EASINGS.easeInOut,
      iterationCount: 'infinite',
    },
    skeleton: {
      keyframes: [
        { opacity: 0.6 },
        { opacity: 1 },
        { opacity: 0.6 },
      ],
      duration: DURATIONS.slowest,
      easing: EASINGS.easeInOut,
      iterationCount: 'infinite',
    },
  },
} as const;

// Transition configurations for common UI patterns
export const TRANSITIONS = {
  // Default transitions
  default: `all ${DURATIONS.normal} ${EASINGS.ease}`,
  fast: `all ${DURATIONS.fast} ${EASINGS.ease}`,
  slow: `all ${DURATIONS.slow} ${EASINGS.ease}`,
  
  // Property-specific transitions
  transform: `transform ${DURATIONS.normal} ${EASINGS.gentle}`,
  opacity: `opacity ${DURATIONS.fast} ${EASINGS.ease}`,
  colors: `background-color ${DURATIONS.normal} ${EASINGS.ease}, border-color ${DURATIONS.normal} ${EASINGS.ease}, color ${DURATIONS.normal} ${EASINGS.ease}`,
  shadow: `box-shadow ${DURATIONS.normal} ${EASINGS.gentle}`,
  
  // Component-specific transitions
  button: `all ${DURATIONS.fast} ${EASINGS.gentle}`,
  modal: `all ${DURATIONS.normal} ${EASINGS.swift}`,
  dropdown: `all ${DURATIONS.fast} ${EASINGS.swift}`,
  tooltip: `all ${DURATIONS.fast} ${EASINGS.ease}`,
  
  // Theme transitions
  theme: `background-color ${DURATIONS.normal} ${EASINGS.ease}, border-color ${DURATIONS.normal} ${EASINGS.ease}, color ${DURATIONS.normal} ${EASINGS.ease}`,
} as const;

// Reduced motion variants for accessibility
export const REDUCED_MOTION = {
  // Prefer reduced motion alternatives
  entrance: {
    fadeIn: { opacity: 1 },
    slideIn: { opacity: 1 },
    scaleIn: { opacity: 1 },
  },
  transitions: {
    default: `all ${DURATIONS.immediate} ${EASINGS.linear}`,
    theme: `all ${DURATIONS.fast} ${EASINGS.linear}`,
  },
} as const;

// Type definitions
export type Duration = keyof typeof DURATIONS;
export type Easing = keyof typeof EASINGS;
export type Animation = keyof typeof ANIMATIONS;
export type Transition = keyof typeof TRANSITIONS;

// Animation utility functions
export const animationUtils = {
  /**
   * Get duration value
   */
  getDuration: (key: Duration): string => {
    return DURATIONS[key];
  },

  /**
   * Get easing function
   */
  getEasing: (key: Easing): string => {
    return EASINGS[key];
  },

  /**
   * Create transition string
   */
  createTransition: (properties: string[], duration: Duration = 'normal', easing: Easing = 'ease'): string => {
    return properties
      .map(prop => `${prop} ${DURATIONS[duration]} ${EASINGS[easing]}`)
      .join(', ');
  },

  /**
   * Get animation configuration
   */
  getAnimation: (path: string): any => {
    const keys = path.split('.');
    let value: any = ANIMATIONS;
    
    for (const key of keys) {
      value = value?.[key];
    }
    
    return value || {};
  },

  /**
   * Generate keyframes CSS
   */
  generateKeyframes: (name: string, keyframes: Record<string, any>[]): string => {
    const keyframeRules = keyframes
      .map((frame, index) => {
        const percent = keyframes.length === 1 ? '100%' : `${(index / (keyframes.length - 1)) * 100}%`;
        const rules = Object.entries(frame)
          .map(([prop, value]) => `${prop}: ${value}`)
          .join('; ');
        return `${percent} { ${rules} }`;
      })
      .join('\n  ');

    return `@keyframes ${name} {\n  ${keyframeRules}\n}`;
  },

  /**
   * Check if user prefers reduced motion
   */
  prefersReducedMotion: (): boolean => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  },

  /**
   * Get motion-safe animation
   */
  getMotionSafeAnimation: (animation: any): any => {
    if (animationUtils.prefersReducedMotion()) {
      return {
        ...animation,
        duration: DURATIONS.immediate,
        easing: EASINGS.linear,
      };
    }
    return animation;
  },
} as const;

// CSS Custom Properties for animations
export const ANIMATION_CSS_VARS = {
  '--animation-duration-immediate': DURATIONS.immediate,
  '--animation-duration-fast': DURATIONS.fast,
  '--animation-duration-normal': DURATIONS.normal,
  '--animation-duration-slow': DURATIONS.slow,
  '--animation-duration-slower': DURATIONS.slower,
  '--animation-duration-slowest': DURATIONS.slowest,
  
  '--animation-easing-linear': EASINGS.linear,
  '--animation-easing-ease': EASINGS.ease,
  '--animation-easing-ease-in': EASINGS.easeIn,
  '--animation-easing-ease-out': EASINGS.easeOut,
  '--animation-easing-ease-in-out': EASINGS.easeInOut,
  '--animation-easing-spring': EASINGS.spring,
  '--animation-easing-gentle': EASINGS.gentle,
  '--animation-easing-swift': EASINGS.swift,
  '--animation-easing-sharp': EASINGS.sharp,
  '--animation-easing-bouncy': EASINGS.bouncy,
  '--animation-easing-elastic': EASINGS.elastic,
} as const;