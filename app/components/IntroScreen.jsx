'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * One-time page entrance sequence (~1.4s):
 *   1. "jcg.dev" fades + scales in the center
 *   2. A thin golden line expands from the center outward
 *   3. Overlay fades out, revealing the page
 *
 * Plays once per session (sessionStorage). Skipped entirely under
 * prefers-reduced-motion. The overlay matches the page background,
 * so skipping/removal is invisible.
 */
export default function IntroScreen() {
  // 'pending' (deciding, plain cover) | 'playing' | 'done'
  const [phase, setPhase] = useState('pending');

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const played  = sessionStorage.getItem('jcg-intro-played');

    if (reduced || played) {
      setPhase('done');
      return;
    }

    sessionStorage.setItem('jcg-intro-played', '1');
    setPhase('playing');
    const t = setTimeout(() => setPhase('done'), 1100);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ background: '#050505' }}
          exit={{ opacity: 0, transition: { duration: 0.35, ease: 'easeOut' } }}
          aria-hidden="true"
        >
          {phase === 'playing' && (
            <>
              <motion.p
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="font-mono text-lg tracking-[0.2em] mb-6"
                style={{ color: '#F0EDE3' }}
              >
                jcg<span style={{ color: '#C79A4B' }}>.dev</span>
              </motion.p>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                className="h-px w-44"
                style={{
                  background: 'linear-gradient(90deg, transparent, #C79A4B, transparent)',
                  transformOrigin: 'center',
                }}
              />
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
