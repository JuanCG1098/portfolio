'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const VALUES = [
  {
    icon: '◈',
    title: 'Clean code',
    desc: 'Readable, consistently structured code that the next developer can understand without a call.',
    color: 'cyan',
  },
  {
    icon: '⬡',
    title: 'SOLID principles',
    desc: 'Single responsibility, open-closed, dependency inversion — applied pragmatically, not dogmatically.',
    color: 'blue',
  },
  {
    icon: '▣',
    title: 'Dependency injection',
    desc: 'Explicit dependencies, testable components and loose coupling as a default, not an afterthought.',
    color: 'violet',
  },
  {
    icon: '◉',
    title: 'Testing mindset',
    desc: 'Writing code with testability in mind. Integration tests where they matter most: business rules and data.',
    color: 'green',
  },
  {
    icon: '⟶',
    title: 'Maintainability',
    desc: 'Systems should be easy to change. Complexity should be contained, not spread across every layer.',
    color: 'cyan',
  },
  {
    icon: '◎',
    title: 'Performance awareness',
    desc: 'Measure before optimizing. Understand the query plan, the network path and the hot path in production.',
    color: 'blue',
  },
  {
    icon: '▤',
    title: 'Observability',
    desc: 'Structured logs, correlation IDs and meaningful error context — because production is never silent.',
    color: 'green',
  },
  {
    icon: '⊞',
    title: 'Ownership',
    desc: 'From design to deployment to production debugging. I follow through, not just write and hand off.',
    color: 'cyan',
  },
  {
    icon: '◷',
    title: 'Production debugging',
    desc: 'Kibana, log correlation, SQL query analysis — the discipline to diagnose real incidents under pressure.',
    color: 'violet',
  },
  {
    icon: '☰',
    title: 'Documentation',
    desc: 'API contracts, ADRs and onboarding docs — written to save the next person time, not to check a box.',
    color: 'blue',
  },
];

const ICON_CLASS = {
  cyan:   'text-cyan',
  blue:   'text-blue',
  violet: 'text-violet',
  green:  'text-green',
};

export default function EngineeringValues() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="values" className="py-28 px-6 section-line" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-mono text-[10px] text-cyan uppercase tracking-widest mb-3"
        >
          // engineering values
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.07 }}
          className="text-3xl md:text-4xl font-bold text-text mb-14"
        >
          What I bring to every project.
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="card p-4 group"
            >
              <div className="flex items-center gap-2 mb-2.5">
                <span className={`text-sm ${ICON_CLASS[v.color]}`}>{v.icon}</span>
                <h3 className="text-xs font-semibold text-text leading-tight">{v.title}</h3>
              </div>
              <p className="text-muted text-[11px] leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
