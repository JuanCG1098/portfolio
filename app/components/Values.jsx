'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionBg from './SectionBg';

const VALUES = [
  { title: 'Clean code',              desc: 'Readable, consistently structured code that the next developer can understand without a meeting.' },
  { title: 'Maintainability',         desc: 'Systems should be easy to change. Complexity should be contained, not distributed everywhere.' },
  { title: 'SOLID principles',        desc: 'Single responsibility, open-closed, dependency inversion — applied pragmatically, not dogmatically.' },
  { title: 'Dependency injection',    desc: 'Explicit dependencies and loose coupling as a default, not an afterthought. Testable by design.' },
  { title: 'Observability',           desc: 'Structured logs, correlation IDs and meaningful error context — because production is never quiet.' },
  { title: 'Performance awareness',   desc: 'Measure before optimizing. Understand the query plan, the network path, the production hot path.' },
  { title: 'Production debugging',    desc: 'Kibana, log correlation, SQL analysis — the discipline to diagnose real incidents under pressure.' },
  { title: 'Ownership',               desc: 'From design to deployment to post-production. I follow through, not just write and hand off.' },
  { title: 'Documentation',           desc: 'Clear API contracts, decision records and onboarding notes — knowledge that outlives the sprint.' },
];

export default function Values() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="values"
      className="relative overflow-hidden section-gap-sm section-divider"
      ref={ref}
    >
      <SectionBg variant="arc-center" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-12">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="label-mono mb-6"
        >
          Engineering values
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.07 }}
          className="headline mb-10"
        >
          What I bring to every project.
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.055 }}
              className="group flex gap-4 py-5 pr-8"
              style={{ borderTop: '1px solid rgba(199,154,75,0.07)' }}
            >
              <span className="shrink-0 mt-[3px] text-[11px] leading-none text-gold/35 transition-colors duration-300 group-hover:text-gold/70">
                ›
              </span>
              <div>
                <h3 className="text-sm font-semibold text-text mb-1 transition-colors duration-300 group-hover:text-gold-light">
                  {v.title}
                </h3>
                <p className="text-text-2 text-[0.8125rem] leading-relaxed">{v.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
