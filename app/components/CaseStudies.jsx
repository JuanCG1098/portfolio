'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import SectionBg from './SectionBg';

const CASES = [
  {
    id: 'perf',
    title: 'Microservices Performance & Maintainability',
    summary: 'Cutting latency and restoring observability across banking microservices.',
    context: 'Banking infrastructure · Accenture / Banco Galicia',
    problem: 'Several banking backend services had slow response times and limited observability, making production debugging slow and improvements hard to validate.',
    approach: 'Identified bottlenecks via Kibana APM and log correlation before any code changes. Refactored service flows, improved query patterns and introduced structured logging fields.',
    decisions: [
      'Measured first — no blind optimizations.',
      'Structured logs to make root cause analysis systematic.',
      'Prioritized query-level improvements over infrastructure changes.',
    ],
    impact: 'Measurably reduced average response times in the targeted services. Production debugging became traceable and repeatable.',
    stack: ['.NET', 'C#', 'SQL Server', 'MongoDB', 'Kibana', 'Elasticsearch'],
  },
  {
    id: 'pending',
    title: 'Pending Operations System',
    summary: 'A state-machine backend for creating, tracking and cancelling pending transactions.',
    context: 'Banking core · Accenture / Banco Galicia',
    problem: 'Banking operations needed a reliable way to create, track, process and cancel pending transactions — ensuring data consistency across multiple service consumers.',
    approach: 'Designed backend services with explicit state machine logic for the full operation lifecycle, including edge cases, rollback scenarios and transactional SQL consistency.',
    decisions: [
      'Modeled operation states explicitly to avoid implicit transitions.',
      'Used SQL transactions to guarantee state change consistency.',
      'Exposed clean REST contracts consumed by downstream services.',
    ],
    impact: 'Improved operational consistency. Reduced manual intervention on failed or stuck transactions.',
    stack: ['.NET', 'C#', 'REST APIs', 'SQL Server', 'Microservices'],
  },
  {
    id: 'accounting',
    title: 'Accounting & Cash Flow Integration',
    summary: 'Accounting entries, cash movements and multi-currency rules for branch operations.',
    context: 'Branch systems · Accenture / Banco Galicia',
    problem: 'Branch operations required consistent accounting entries, money flow records and multi-currency support with strict business rule validation at every step.',
    approach: 'Built backend services implementing accounting domain logic: entry generation, balance validation, cash movements and audit trail consistency. Centralized currency conversion logic.',
    decisions: [
      'Validation layers at service boundaries to reject invalid states early.',
      'Domain rules in the service layer — not stored procedures or triggers.',
      'Structured audit logging for compliance and debugging.',
    ],
    impact: 'Improved reliability of accounting flows and reduced data inconsistency in branch operations.',
    stack: ['.NET', 'C#', 'SQL Server', 'Banking systems', 'Enterprise integrations'],
  },
  {
    id: 'messaging',
    title: 'Enterprise Messaging Integration',
    summary: 'Resilient async messaging between core banking services and external systems.',
    context: 'System integration · Accenture / Banco Galicia',
    problem: 'Critical backend services needed robust async communication with internal and external enterprise systems without tight coupling or message loss under load.',
    approach: 'Implemented IBM MQ/XMS-based integrations with retry logic, dead-letter handling and abstracted integration layers to isolate domain logic from messaging infrastructure.',
    decisions: [
      'IBM MQ for decoupled async communication to avoid temporal coupling.',
      'Dead-letter queues and retry logic for production resilience.',
      'Integration layer abstraction to keep domain code clean.',
    ],
    impact: 'Improved integration reliability. Reduced message loss incidents and simplified incident resolution.',
    stack: ['.NET', 'IBM MQ', 'XMS', 'REST APIs', 'SOAP'],
  },
  {
    id: 'flutter',
    title: 'Flutter Web Migration Support',
    summary: 'API-first modernization of a legacy VB.NET desktop platform.',
    context: 'Legacy modernization · Praxys',
    problem: 'A legacy VB.NET desktop application needed to evolve into a modern web platform while preserving business logic and minimizing operational disruption.',
    approach: 'Decoupled business logic from the presentation layer first. Designed versioned REST APIs for both old and new clients. Coordinated parallel workstreams via Azure DevOps.',
    decisions: [
      'API-first approach before touching the frontend.',
      'Versioned endpoints to support phased migration.',
      'Azure DevOps to coordinate parallel backend and Flutter tracks.',
    ],
    impact: 'Phased migration with no production downtime. Improved maintainability and reduced deployment complexity.',
    stack: ['Flutter Web', '.NET 10', 'REST APIs', 'Git', 'Azure DevOps', 'VB.NET'],
  },
];

function CaseItem({ cs, index }) {
  const [open, setOpen] = useState(false);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  // ESC collapses every open case (each item listens for itself)
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const toggle = () => {
    setOpen(v => {
      const next = !v;
      if (next) {
        // Bring the expanding case into view once the panel starts opening
        setTimeout(() => {
          ref.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 120);
      }
      return next;
    });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: index * 0.07 }}
      style={{ borderTop: '1px solid rgba(199,154,75,0.07)' }}
    >
      <button
        className="w-full text-left py-8 flex items-start gap-6 md:gap-10 group"
        onClick={toggle}
        aria-expanded={open}
      >
        {/* Number */}
        <span className="shrink-0 flex flex-col items-center gap-1.5">
          <span
            className={`font-mono text-3xl md:text-4xl font-bold leading-none transition-colors duration-300 ${
              open ? 'text-gold/40' : 'text-gold/10 group-hover:text-gold/25'
            }`}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <motion.span
            className="h-px w-full"
            style={{ background: 'rgba(199,154,75,0.55)', transformOrigin: 'left' }}
            initial={false}
            animate={{ scaleX: open ? 1 : 0, opacity: open ? 1 : 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          />
        </span>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] text-text-3 mb-1.5 tracking-wide">{cs.context}</p>
              <h3
                className={`text-lg md:text-xl font-semibold leading-snug transition-colors duration-300 ${
                  open ? 'text-text' : 'text-[#c8c4ba] group-hover:text-text'
                }`}
              >
                {cs.title}
              </h3>
              <p className="text-text-3 text-sm leading-relaxed mt-1.5 max-w-xl">
                {cs.summary}
              </p>
            </div>
            <span
              className="font-mono text-lg shrink-0 transition-all duration-300 mt-1 text-text-3 group-hover:text-gold/60"
              style={{ transform: open ? 'rotate(45deg)' : 'none', display: 'inline-block' }}
            >
              +
            </span>
          </div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-10 pl-0 md:pl-[calc(3rem+2.5rem)]">
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                {[
                  { label: 'Problem',  text: cs.problem },
                  { label: 'Approach', text: cs.approach },
                  { label: 'Impact',   text: cs.impact },
                ].map((col, ci) => (
                  <motion.div
                    key={col.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.12 + ci * 0.07 }}
                  >
                    <p className="font-mono text-[9px] text-gold/50 uppercase tracking-widest mb-3">{col.label}</p>
                    <p className="text-text-2 text-sm leading-relaxed">{col.text}</p>
                  </motion.div>
                ))}
              </div>

              {/* Decisions */}
              <div className="mb-7">
                <p className="font-mono text-[9px] text-text-3 uppercase tracking-widest mb-3">Technical decisions</p>
                <ul className="space-y-1.5">
                  {cs.decisions.map((d, i) => (
                    <li key={i} className="flex gap-3 text-text-2 text-sm leading-relaxed">
                      <span className="text-gold/40 shrink-0 mt-[3px] text-xs">›</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stack */}
              <div className="flex flex-wrap gap-1.5">
                {cs.stack.map(t => (
                  <span key={t} className="tag-neutral">{t}</span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function CaseStudies() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="cases" className="relative overflow-hidden section-gap section-divider" ref={ref}>
      <SectionBg variant="arc-left" />
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-12">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="label-mono mb-6"
          >
            Selected work
          </motion.p>

          <div className="flex flex-wrap items-end justify-between gap-6 mb-4">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.07 }}
              className="headline"
            >
              Engineering problems I've solved.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-mono text-xs text-[#4D4840] self-end pb-1"
            >
              Click to expand · Press ESC to collapse all
            </motion.p>
          </div>

          <div>
            {CASES.map((cs, i) => <CaseItem key={cs.id} cs={cs} index={i} />)}
          </div>

          {/* Closing divider */}
          <div style={{ borderTop: '1px solid rgba(199,154,75,0.07)' }} />
        </div>
    </section>
  );
}
