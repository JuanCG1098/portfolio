'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const featured = {
  label: '⭐ Featured — In progress',
  title: 'Pharmaceutical System Modernization',
  description:
    'Full migration of a legacy VB.NET system to .NET 10 + Flutter. Architecture docs, before/after comparison, and a reusable component library with tokenized design system.',
  tags: ['.NET 10', 'Flutter', 'System Design', 'Azure DevOps'],
  status: 'Coming soon',
};

const projects = [
  {
    title: 'Flutter Design System',
    description:
      'Reusable component library with design tokens for cross-platform deployment (web + mobile).',
    tags: ['Flutter', 'Design Tokens', 'Component Architecture'],
    status: 'Coming soon',
  },
  {
    title: '.NET 10 + Azure DevOps CI/CD',
    description:
      'Example project with full CI/CD pipeline, automated tests, and Azure Pipelines YAML.',
    tags: ['.NET 10', 'Azure Pipelines', 'CI/CD'],
    status: 'Coming soon',
  },
];

function ArchDiagram() {
  return (
    <div className="font-mono text-xs p-6 text-left overflow-hidden">
      <div className="text-green mb-3"># Architecture Overview</div>
      <div className="space-y-1 text-muted">
        <div><span className="text-accent-light">Legacy</span> VB.NET + WinForms</div>
        <div className="pl-4 text-border">↓ migration</div>
        <div><span className="text-accent">New</span> .NET 10 API Layer</div>
        <div className="pl-4">├── <span className="text-green">Flutter</span> (web + mobile)</div>
        <div className="pl-4">├── <span className="text-accent-light">Angular</span> (admin panel)</div>
        <div className="pl-4">└── <span className="text-text">SQL Server</span></div>
        <div className="mt-3 text-accent">CI/CD via Azure DevOps</div>
        <div className="pl-4">├── Build → Test → Deploy</div>
        <div className="pl-4">└── Design Token Pipeline</div>
      </div>
    </div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="py-32 px-6 bg-surface/30" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs text-accent uppercase tracking-widest mb-4"
        >
          // projects
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-text mb-16"
        >
          What I've built.
        </motion.h2>

        {/* Featured card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          whileHover={{ y: -4 }}
          className="bg-surface border border-border rounded-2xl overflow-hidden mb-6 hover:border-accent/40 transition-colors group cursor-default"
        >
          <div className="grid md:grid-cols-2">
            {/* Code visual */}
            <div className="bg-bg/60 border-b md:border-b-0 md:border-r border-border min-h-[240px] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: 'radial-gradient(circle at 50% 50%, #6366f1 0%, transparent 70%)',
                }}
              />
              <ArchDiagram />
            </div>

            {/* Info */}
            <div className="p-8 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-accent border border-accent/30 bg-accent/10 px-2 py-1 rounded mb-4 inline-block">
                  {featured.label}
                </span>
                <h3 className="text-2xl font-bold text-text mb-3">{featured.title}</h3>
                <p className="text-muted text-sm leading-relaxed mb-6">{featured.description}</p>
                <div className="flex flex-wrap gap-2">
                  {featured.tags.map((tag) => (
                    <span key={tag} className="font-mono text-xs px-2 py-1 rounded bg-bg border border-border text-muted">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-border">
                <span className="font-mono text-xs text-muted flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  {featured.status}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Smaller cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((proj, i) => (
            <motion.div
              key={proj.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="bg-surface border border-border rounded-xl p-6 hover:border-accent/40 transition-colors cursor-default"
            >
              <h3 className="text-lg font-semibold text-text mb-3">{proj.title}</h3>
              <p className="text-muted text-sm leading-relaxed mb-5">{proj.description}</p>
              <div className="flex flex-wrap gap-2 mb-5">
                {proj.tags.map((tag) => (
                  <span key={tag} className="font-mono text-xs px-2 py-1 rounded bg-bg border border-border text-muted">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="pt-4 border-t border-border">
                <span className="font-mono text-xs text-muted flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-muted" />
                  {proj.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
