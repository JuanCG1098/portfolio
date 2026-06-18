'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Contact() {
  const ref     = useRef(null);
  const inView  = useInView(ref, { once: true, margin: '-80px' });
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText('juancgallardo1098@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const fade = (d = 0) => ({
    initial:    { opacity: 0, y: 16 },
    animate:    inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: d },
  });

  return (
    <section id="contact" className="relative overflow-hidden section-divider" ref={ref}>
      {/* Warm glow behind section */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(199,154,75,0.05) 0%, transparent 70%)',
        }}
      />
      {/* Arc lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1440 600"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="720" cy="300" r="250" stroke="#C79A4B" strokeWidth="0.5" strokeOpacity="0.07" />
        <circle cx="720" cy="300" r="380" stroke="#C79A4B" strokeWidth="0.4" strokeOpacity="0.04" />
        <line x1="0" y1="300" x2="1440" y2="300" stroke="#C79A4B" strokeWidth="0.4" strokeOpacity="0.04" />
      </svg>

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-12 py-28 md:py-40 text-center">
        <motion.p {...fade(0)} className="label-mono mb-6">Contact</motion.p>

        <motion.h2 {...fade(0.08)} className="headline mb-6">
          Let's build reliable<br />
          <span className="text-gold-gradient">backend systems.</span>
        </motion.h2>

        <motion.p {...fade(0.16)} className="text-text-2 text-base mb-14 max-w-lg mx-auto leading-relaxed">
          Open to remote full-stack engineering roles, freelance projects
          and technical collaborations. Based in Argentina, available globally.
        </motion.p>

        {/* Primary CTA */}
        <motion.div {...fade(0.24)} className="flex flex-wrap justify-center gap-3 mb-12">
          <a href="mailto:juancgallardo1098@gmail.com" className="btn-gold text-sm">
            Send an email
          </a>
          <a
            href="https://linkedin.com/in/jc-gallardo"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost text-sm"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/JuanCG1098"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost text-sm"
          >
            GitHub
          </a>
          <a href="/cv.pdf" download="CV_JuanCruzGallardo" className="btn-ghost text-sm">
            Download CV
          </a>
        </motion.div>

        {/* Copy email */}
        <motion.div {...fade(0.32)}>
          <button
            onClick={copy}
            className="inline-flex items-center gap-2 text-sm transition-colors group"
            style={{ color: copied ? 'rgba(199,154,75,0.80)' : 'rgba(77,72,64,1)' }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full transition-colors"
              style={{ background: copied ? 'rgba(199,154,75,0.80)' : 'rgba(77,72,64,0.8)' }}
            />
            <span className="font-mono text-xs">
              {copied ? 'Copied to clipboard' : 'juancgallardo1098@gmail.com — click to copy'}
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
