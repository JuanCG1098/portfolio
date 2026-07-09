'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import SectionBg from './SectionBg';

const FEATURED = [
  {
    title: 'Villa Wolf — Barbershop Management Platform',
    context: 'Open source · Full-stack',
    description:
      'Management app for a real barbershop: appointments backed by an availability engine, services, staff agendas, cash-box and inventory. Overlapping appointments are physically impossible at the database level — a PostgreSQL btree_gist exclusion constraint guarantees it. Ships with a tokenized Flutter design system (dark/light) and a matching Figma library.',
    highlights: [
      'Verified end-to-end under Docker with real Postgres — 20 passing tests',
      'DB-level no-overlap guarantee via btree_gist exclusion constraint',
      'Tokenized design system: dark/light themes, Figma library, component gallery',
    ],
    stack: ['.NET 10', 'Clean Architecture', 'Flutter', 'PostgreSQL', 'JWT', 'Docker'],
    image: '/projects/villawolf-dashboard.png',
    imageAlt: 'Villa Wolf dashboard — Flutter web app',
    repo: 'https://github.com/JuanCG1098/villawolf-app',
  },
  {
    title: 'Financial Accounting Engine',
    context: 'Open source · Full-stack',
    description:
      'Double-entry accounting engine inspired by real banking work (fully anonymized): transactions are processed against configurable posting rules to generate balanced debit/credit journal entries, with balance validation, an audit trail and a Flutter Web dashboard.',
    highlights: [
      '28 passing tests — xUnit plus integration via WebApplicationFactory',
      'Configurable posting rules produce always-balanced journal entries',
      'Docker Compose brings up Postgres + API, migrates and seeds on startup',
    ],
    stack: ['.NET 10', 'Clean Architecture', 'EF Core', 'PostgreSQL', 'Flutter Web', 'Docker'],
    image: '/projects/fae-dashboard.png',
    imageAlt: 'Financial Accounting Engine dashboard — Flutter web app',
    repo: 'https://github.com/JuanCG1098/financial-accounting-engine',
  },
];

const SECONDARY = [
  {
    title: 'Pharmaceutical System Modernization',
    description:
      'Professional work, in progress: full migration of a legacy VB.NET platform to .NET 10 + Flutter — API-first architecture and a reusable component library.',
    stack: ['.NET 10', 'Flutter', 'System Design', 'Azure DevOps'],
    status: 'Professional work · In progress',
  },
  {
    title: 'This Portfolio',
    description:
      'Dark editorial single-page portfolio — Next.js 14 App Router, Tailwind CSS and Framer Motion, deployed on Vercel with dynamic OG, sitemap and robots.',
    stack: ['Next.js 14', 'Tailwind CSS', 'Framer Motion'],
    status: 'Live',
    repo: 'https://github.com/JuanCG1098/portfolio',
  },
];

function RepoLink({ href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-mono text-xs text-gold/70 hover:text-gold transition-colors inline-flex items-center gap-2 group/link"
    >
      View on GitHub
      <span className="group-hover/link:translate-x-0.5 transition-transform">→</span>
    </a>
  );
}

function FeaturedCard({ proj, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.15 + index * 0.1 }}
      className="card-premium overflow-hidden group"
    >
      <div className="grid md:grid-cols-2">
        {/* Screenshot */}
        <a
          href={proj.repo}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${proj.title} on GitHub`}
          className={`relative block min-h-[260px] overflow-hidden ${
            index % 2 === 1 ? 'md:order-2' : ''
          }`}
          style={{
            borderColor: 'rgba(199,154,75,0.08)',
            [index % 2 === 1 ? 'borderLeft' : 'borderRight']: '1px solid rgba(199,154,75,0.08)',
          }}
        >
          <Image
            src={proj.image}
            alt={proj.imageAlt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover object-top opacity-85 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-500"
          />
        </a>

        {/* Info */}
        <div className={`p-8 md:p-10 flex flex-col justify-between ${index % 2 === 1 ? 'md:order-1' : ''}`}>
          <div>
            <p className="font-mono text-[10px] text-gold/50 uppercase tracking-widest mb-3">{proj.context}</p>
            <h3 className="text-xl md:text-2xl font-semibold text-text leading-snug mb-4">{proj.title}</h3>
            <p className="text-text-2 text-sm leading-relaxed mb-6">{proj.description}</p>
            <ul className="space-y-1.5 mb-7">
              {proj.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-text-2 text-sm leading-relaxed">
                  <span className="text-gold/40 shrink-0 mt-[3px] text-xs">›</span>
                  {h}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-1.5">
              {proj.stack.map((t) => (
                <span key={t} className="tag-neutral">{t}</span>
              ))}
            </div>
          </div>
          <div className="mt-7 pt-6" style={{ borderTop: '1px solid rgba(199,154,75,0.07)' }}>
            <RepoLink href={proj.repo} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="projects" className="relative overflow-hidden section-gap section-divider" ref={ref}>
      <SectionBg variant="arc-right" />
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-12">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="label-mono mb-6"
        >
          Open source
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.07 }}
          className="headline mb-4"
        >
          Projects built in the open.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-text-2 text-sm leading-relaxed max-w-xl mb-14"
        >
          Production-grade systems on GitHub — the same architecture, testing and
          delivery practices I use professionally, on code you can actually read.
        </motion.p>

        <div className="space-y-6 mb-6">
          {FEATURED.map((proj, i) => (
            <FeaturedCard key={proj.title} proj={proj} index={i} inView={inView} />
          ))}
        </div>

        {/* Secondary cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {SECONDARY.map((proj, i) => (
            <motion.div
              key={proj.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.35 + i * 0.1 }}
              className="card-premium p-7 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-text mb-3">{proj.title}</h3>
                <p className="text-text-2 text-sm leading-relaxed mb-5">{proj.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {proj.stack.map((t) => (
                    <span key={t} className="tag-neutral">{t}</span>
                  ))}
                </div>
              </div>
              <div
                className="pt-4 flex items-center justify-between gap-4"
                style={{ borderTop: '1px solid rgba(199,154,75,0.07)' }}
              >
                <span className="font-mono text-[10px] text-text-3 tracking-wide flex items-center gap-2">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      proj.status === 'Live' ? 'bg-gold/70' : 'bg-gold/40 animate-pulse'
                    }`}
                  />
                  {proj.status}
                </span>
                {proj.repo && <RepoLink href={proj.repo} />}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
