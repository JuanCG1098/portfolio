'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionBg from './SectionBg';

const HIGHLIGHTS = [
  '5+ years building full-stack systems',
  'Banking & fintech experience',
  'Microservices & enterprise integrations',
  'Production debugging & observability',
  'Argentina · Remote-ready',
];

export default function About() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const fade = (delay = 0) => ({
    initial:    { opacity: 0, y: 20 },
    animate:    inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  });

  return (
    <section id="about" className="relative overflow-hidden section-gap section-divider" ref={ref}>
      <SectionBg variant="arc-right" />
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-12">

        <motion.p {...fade(0)} className="label-mono mb-6">About</motion.p>

        <div className="grid lg:grid-cols-[1fr_420px] gap-16 lg:gap-24 items-start">

          {/* Text */}
          <div>
            <motion.h2 {...fade(0.07)} className="headline mb-10">
              Full-stack engineer focused on<br />
              <span className="text-gold-gradient">reliability and production impact.</span>
            </motion.h2>

            <motion.div {...fade(0.14)} className="space-y-5 text-text-2 text-[0.9375rem] leading-[1.75] max-w-[58ch]">
              <p>
                I'm a Full-Stack Developer based in Argentina with 5+ years of experience
                building and maintaining systems that handle real business operations — banking
                transactions, accounting flows, cash management and enterprise integrations across
                critical data pipelines.
              </p>
              <p>
                The core of my experience was built at Accenture on behalf of Banco Galicia, one
                of Argentina's largest private banks. I progressed from Developer Analyst to
                Software Architect, working on microservices handling accounts, transfers,
                electronic checks, pending operations and branch systems in production environments
                with strict reliability requirements.
              </p>
              <p>
                I care about clean architecture, maintainable code, observable services and
                shipping things that hold up under pressure. I take ownership from design to
                production debugging.
              </p>
            </motion.div>
          </div>

          {/* Highlights block */}
          <motion.div {...fade(0.20)}>
            <p className="font-mono text-[9px] text-text-3 tracking-widest uppercase mb-5">
              At a glance
            </p>
            <div className="space-y-0">
              {HIGHLIGHTS.map((h, i) => (
                <motion.div
                  key={h}
                  initial={{ opacity: 0, x: 12 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.25 + i * 0.06 }}
                  className="flex items-center gap-4 py-4"
                  style={{ borderBottom: '1px solid rgba(199,154,75,0.07)' }}
                >
                  <span
                    className="w-1 h-1 rounded-full shrink-0"
                    style={{ background: 'rgba(199,154,75,0.60)' }}
                  />
                  <span className="text-text-2 text-sm">{h}</span>
                </motion.div>
              ))}
            </div>

            {/* Contact prompt */}
            <motion.div {...fade(0.55)} className="mt-8">
              <a
                href="mailto:juancgallardo1098@gmail.com"
                className="inline-flex items-center gap-2 text-gold/80 text-sm hover:text-gold transition-colors group"
              >
                <span>juancgallardo1098@gmail.com</span>
                <span className="group-hover:translate-x-0.5 transition-transform">→</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
