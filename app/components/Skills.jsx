'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const categories = [
  {
    label: 'Backend',
    icon: '⬡',
    skills: [
      { name: 'C# / .NET 10', level: 95 },
      { name: 'REST APIs', level: 90 },
      { name: 'Microservices', level: 80 },
      { name: 'VB.NET', level: 75 },
    ],
  },
  {
    label: 'Frontend',
    icon: '◈',
    skills: [
      { name: 'Flutter', level: 75 },
      { name: 'Angular', level: 65 },
      { name: 'JavaScript', level: 60 },
      { name: 'Figma', level: 55 },
    ],
  },
  {
    label: 'Data & DevOps',
    icon: '◉',
    skills: [
      { name: 'SQL Server', level: 90 },
      { name: 'MongoDB', level: 80 },
      { name: 'Azure DevOps', level: 70 },
      { name: 'Elasticsearch', level: 65 },
    ],
  },
];

function SkillBar({ name, level, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className="group">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-text">{name}</span>
        <span className="font-mono text-xs text-muted">{level}%</span>
      </div>
      <div className="h-1 bg-border rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay }}
          className="h-full bg-gradient-to-r from-accent to-accent-light rounded-full"
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs text-accent uppercase tracking-widest mb-4"
        >
          // skills
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-text mb-16"
        >
          What I work with.
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: ci * 0.15 }}
              className="bg-surface/50 border border-border rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-accent text-lg">{cat.icon}</span>
                <h3 className="font-semibold text-text">{cat.label}</h3>
              </div>
              <div className="space-y-5">
                {cat.skills.map((skill, si) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    delay={ci * 0.15 + si * 0.08}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
