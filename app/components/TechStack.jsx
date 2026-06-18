'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionBg from './SectionBg';

const CATEGORIES = [
  {
    num: '01',
    name: 'Backend Engineering',
    desc: 'Core runtime, frameworks and API design for production services.',
    items: ['C#', '.NET 10', '.NET 8', '.NET 6', 'ASP.NET Core', 'Entity Framework Core', 'REST APIs', 'Minimal APIs', 'SOAP'],
  },
  {
    num: '02',
    name: 'Frontend & Cross-platform',
    desc: 'Web and cross-platform UIs with shared, tokenized component systems.',
    items: ['Flutter', 'Flutter Web', 'Angular', 'Reusable component libraries', 'Design tokens', 'Cross-platform UI'],
  },
  {
    num: '03',
    name: 'Data & Persistence',
    desc: 'Relational and document storage, query design and migrations.',
    items: ['SQL Server', 'MongoDB', 'T-SQL', 'Stored Procedures', 'Query optimization', 'EF Core Migrations'],
  },
  {
    num: '04',
    name: 'Architecture & Patterns',
    desc: 'System structure, design principles and service organization.',
    items: ['Microservices', 'Clean Architecture', 'SOLID', 'DDD', 'Dependency Injection', 'Repository Pattern', 'CQRS'],
  },
  {
    num: '05',
    name: 'DevOps & Delivery',
    desc: 'CI/CD pipelines, version control and release management.',
    items: ['Azure DevOps', 'Git', 'CI/CD Pipelines', 'Azure Repos', 'Work Items', 'Release Management'],
  },
  {
    num: '06',
    name: 'Observability & Integrations',
    desc: 'Monitoring, messaging and enterprise connectivity.',
    items: ['Kibana', 'Elasticsearch', 'IBM MQ', 'XMS', 'Structured logging', 'Banking integrations'],
  },
];

const ALSO = ['VB.NET', 'Postman', 'Swagger / OpenAPI', 'Mainframe', 'Jira'];

export default function TechStack() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="stack"
      className="relative overflow-hidden section-gap section-divider"
      ref={ref}
    >
      <SectionBg variant="dots-right" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-12">

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="label-mono mb-6"
        >
          Technical stack
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.07 }}
          className="headline mb-16"
        >
          Tools, frameworks & patterns.
        </motion.h2>

        {/* Main categories */}
        <div className="divide-y divide-[rgba(199,154,75,0.07)]">
          {CATEGORIES.map((cat, ci) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: ci * 0.08 }}
              className="grid md:grid-cols-[200px_1fr] gap-6 md:gap-12 py-8 group"
            >
              {/* Left: number + category name + desc */}
              <div className="flex flex-col gap-1">
                <p className="font-mono text-[10px] text-text-3 mb-1 transition-colors duration-300 group-hover:text-gold/50">
                  {cat.num}
                </p>
                <h3
                  className="text-sm font-semibold leading-snug transition-colors group-hover:opacity-100"
                  style={{ color: 'rgba(199,154,75,0.70)' }}
                >
                  {cat.name}
                </h3>
                <p className="text-text-3 text-xs leading-relaxed mt-1 font-mono hidden md:block">
                  {cat.desc}
                </p>
              </div>

              {/* Right: tags */}
              <div className="flex flex-wrap items-start gap-2 content-start">
                {cat.items.map(t => (
                  <span key={t} className="tag-neutral">{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Also worked with */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="pt-8 mt-2"
          style={{ borderTop: '1px solid rgba(199,154,75,0.05)' }}
        >
          <div className="grid md:grid-cols-[200px_1fr] gap-6 md:gap-12">
            <div>
              <p className="font-mono text-[10px] text-text-3 mb-1">07</p>
              <h3 className="text-sm font-semibold" style={{ color: 'rgba(158,149,135,0.45)' }}>
                Also worked with
              </h3>
              <p className="text-text-3 text-xs leading-relaxed mt-1 font-mono hidden md:block">
                Complementary exposure
              </p>
            </div>
            <div className="flex flex-wrap items-start gap-2">
              {ALSO.map(t => (
                <span key={t} className="tag-neutral" style={{ opacity: 0.5 }}>{t}</span>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
