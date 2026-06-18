'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionBg from './SectionBg';

const JOBS = [
  {
    period:  'Mar 2026 – Present',
    tenure:  'Current',
    role:    'Full-Stack Developer',
    company: 'Praxys',
    context: null,
    domain:  'Pharma · Enterprise',
    stack:   ['.NET 10', 'Flutter Web', 'Angular', 'SQL Server', 'Azure DevOps'],
    bullets: [
      'Leading migration of a legacy VB.NET desktop system to .NET 10 + Flutter Web.',
      'Designing backend APIs and business logic for pharmaceutical workflows.',
      'Built a reusable component library with tokenized design system for cross-platform deployment.',
      'Managing CI/CD pipelines and release process via Azure DevOps.',
    ],
  },
  {
    period:  'Dec 2024 – Mar 2026',
    tenure:  '~1y 4m',
    role:    'Software Architect',
    company: 'Accenture',
    context: 'Banco Galicia',
    domain:  'Banking · Fintech',
    stack:   ['.NET 10', 'C#', 'SQL Server', 'MongoDB', 'Microservices', 'REST APIs'],
    bullets: [
      'Designed and implemented backend microservices and REST APIs for critical banking operations.',
      'Led technical decisions on service boundaries, data models and integration patterns.',
      'Optimized endpoint performance and reviewed transactional logic for consistency.',
      'Integrated MongoDB and SQL Server data sources within the same service layer.',
    ],
  },
  {
    period:  'Nov 2021 – Dec 2024',
    tenure:  '~3y 1m',
    role:    'Developer Analyst',
    company: 'Accenture',
    context: 'Banco Galicia',
    domain:  'Banking · Fintech',
    stack:   ['SQL Server', '.NET', 'C#', 'IBM MQ', 'XMS', 'Kibana', 'Elasticsearch'],
    bullets: [
      'Built and maintained backend services for accounts, transfers, electronic checks and branch systems.',
      'Implemented accounting flows, cash flow logic and pending transaction processing.',
      'Built enterprise integrations via IBM MQ/XMS for reliable async data exchange.',
      'Debugged and resolved production incidents using Kibana, log correlation and SQL analysis.',
    ],
  },
  {
    period:  'Apr 2021 – Nov 2021',
    tenure:  '~7m',
    role:    'Full-Stack Developer',
    company: 'Sinergia Software',
    context: null,
    domain:  'Software',
    stack:   ['.NET', 'C#', 'SQL Server'],
    bullets: [
      'Developed management systems for SME clients.',
      'Built backend features and database integrations on shared SQL Server infrastructure.',
    ],
  },
];

function JobRow({ job, index, isLast }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
      className="grid grid-cols-1 sm:grid-cols-[150px_1fr] gap-0 sm:gap-12 py-12"
      style={{ borderTop: '1px solid rgba(199,154,75,0.07)' }}
    >
      {/* Left: timeline dot + date + tenure */}
      <div className="hidden sm:block pt-1 relative pl-5">
        {/* Spine dot */}
        <span
          className="absolute left-0 top-[7px] w-[5px] h-[5px] rounded-full"
          style={{
            background: 'rgba(199,154,75,0.65)',
            boxShadow: '0 0 8px rgba(199,154,75,0.35)',
          }}
        />
        {/* Spine line — fades downward, omitted on the last entry */}
        {!isLast && (
          <span
            className="absolute left-[2px] top-[20px] -bottom-24 w-px"
            style={{ background: 'linear-gradient(180deg, rgba(199,154,75,0.22), rgba(199,154,75,0.03))' }}
          />
        )}
        <p className="font-mono text-xs text-gold/70 leading-snug mb-1">{job.period}</p>
        <p className="font-mono text-[10px] text-text-3">{job.tenure}</p>
      </div>

      {/* Right: content */}
      <div>
        {/* Mobile date */}
        <p className="sm:hidden font-mono text-xs text-gold/70 mb-3">{job.period}</p>

        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
          <div>
            <h3 className="text-lg font-semibold text-text leading-tight">{job.role}</h3>
            <p className="text-text-2 text-sm mt-0.5">
              {job.company}
              {job.context && (
                <> · <span className="text-text-3">for {job.context}</span></>
              )}
            </p>
          </div>
          <span
            className="font-mono text-[10px] px-2.5 py-1 rounded shrink-0"
            style={{
              color: 'rgba(199,154,75,0.65)',
              border: '1px solid rgba(199,154,75,0.15)',
              background: 'rgba(199,154,75,0.04)',
            }}
          >
            {job.domain}
          </span>
        </div>

        {/* Bullets */}
        <ul className="space-y-2 mb-6">
          {job.bullets.map((b, i) => (
            <li key={i} className="flex gap-3 text-text-2 text-sm leading-relaxed">
              <span className="text-gold/40 shrink-0 mt-[3px] text-xs">›</span>
              {b}
            </li>
          ))}
        </ul>

        {/* Stack */}
        <div className="flex flex-wrap gap-1.5">
          {job.stack.map(t => (
            <span key={t} className="tag-neutral">{t}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="experience" className="relative overflow-hidden section-gap section-divider" ref={ref}>
      <SectionBg variant="dots-left" />
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-12">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="label-mono mb-6"
        >
          Experience
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.07 }}
          className="headline mb-2"
        >
          Where I've built systems.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.13 }}
          className="text-text-2 text-sm mb-16"
        >
          5+ years · Banking, fintech and pharmaceutical systems
        </motion.p>

        <div>
          {JOBS.map((job, i) => (
            <JobRow key={i} job={job} index={i} isLast={i === JOBS.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
