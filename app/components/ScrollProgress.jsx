'use client';

import { motion, useScroll } from 'framer-motion';

/** Thin gold progress line pinned above the navbar. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[60]"
      style={{
        scaleX: scrollYProgress,
        transformOrigin: 'left',
        background: 'linear-gradient(90deg, #D6B16A, #C79A4B, #8A6630)',
        boxShadow: '0 0 8px rgba(199,154,75,0.4)',
      }}
      aria-hidden="true"
    />
  );
}
