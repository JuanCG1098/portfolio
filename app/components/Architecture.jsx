'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import SectionBg from './SectionBg';

const PRINCIPLES = [
  { title: 'Clear service boundaries',  desc: 'Services own their data and expose explicit contracts. No cross-service database access.' },
  { title: 'Observable by default',     desc: 'Structured logging, correlation IDs and meaningful context built in from the start.' },
  { title: 'Reliable integrations',     desc: 'Async messaging with retry logic and dead-letter handling for resilient communication.' },
  { title: 'Business logic in code',    desc: 'Domain rules in the service layer — not stored procedures, triggers or the database.' },
  { title: 'Performance-aware design',  desc: 'Measure before optimizing. Query plans, indexing and caching informed by real bottlenecks.' },
];

/* ── Architecture flow diagram ───────────────────────── */
function FlowDiagram({ inView, reduceMotion }) {
  const NW = 172; // node width
  const NH = 52;  // node height
  const RX = 7;

  // Column center X positions
  const COL = [115, 320, 555, 790, 1005];

  // Node positions [cx, cy]
  const NODES = [
    { label: 'Client / BFF',     sub: 'Web · Mobile',     col: 0, cy: 270, desc: 'HTTP entry from web and mobile clients' },
    { label: 'API Layer',        sub: 'REST · SOAP',       col: 1, cy: 270, desc: 'Routing, auth and contract validation' },
    { label: 'Microservice A',   sub: '.NET · C#',         col: 2, cy: 195, desc: 'Domain logic and REST endpoints in C#' },
    { label: 'Microservice B',   sub: '.NET · C#',         col: 2, cy: 345, desc: 'Transactional flows and integrations' },
    { label: 'SQL Server',       sub: 'Relational data',   col: 3, cy: 130, desc: 'Relational data with ACID guarantees' },
    { label: 'MongoDB',          sub: 'Document store',    col: 3, cy: 270, desc: 'Flexible document storage' },
    { label: 'IBM MQ / XMS',     sub: 'Async messaging',   col: 3, cy: 410, desc: 'Async messaging with retries and DLQ' },
    { label: 'Observability',    sub: 'Kibana · Elastic',  col: 4, cy: 270, desc: 'Logs, metrics and tracing in Kibana' },
  ].map(n => ({ ...n, cx: COL[n.col] }));

  const [hovered, setHovered] = useState(null);

  // Edge helper: right edge of source, left edge of target
  const r = (n) => NODES[n].cx + NW / 2;
  const l = (n) => NODES[n].cx - NW / 2;
  const cy = (n) => NODES[n].cy;

  const EDGES = [
    // client → API (horizontal)
    { x1: r(0), y1: cy(0), x2: l(1), y2: cy(1) },
    // API → Svc A (diagonal up)
    { x1: r(1), y1: cy(1) - 8, x2: l(2), y2: cy(2) + 6 },
    // API → Svc B (diagonal down)
    { x1: r(1), y1: cy(1) + 8, x2: l(3), y2: cy(3) - 6 },
    // Svc A → SQL
    { x1: r(2), y1: cy(2) - 8, x2: l(4), y2: cy(4) + 6 },
    // Svc A → MongoDB
    { x1: r(2), y1: cy(2) + 6, x2: l(5), y2: cy(5) - 6 },
    // Svc B → IBM MQ
    { x1: r(3), y1: cy(3) + 6, x2: l(6), y2: cy(6) - 6 },
    // SQL → Observability
    { x1: r(4), y1: cy(4) + 6, x2: l(7), y2: cy(7) - 14 },
    // MongoDB → Observability
    { x1: r(5), y1: cy(5),     x2: l(7), y2: cy(7) },
    // IBM MQ → Observability
    { x1: r(6), y1: cy(6) - 6, x2: l(7), y2: cy(7) + 14 },
  ];

  const LAYER_LABELS = [
    { x: COL[0], label: 'CLIENT' },
    { x: COL[1], label: 'API GATEWAY' },
    { x: COL[2], label: 'SERVICES' },
    { x: COL[3], label: 'DATA LAYER' },
    { x: COL[4], label: 'OBSERVABILITY' },
  ];

  return (
    <div className="w-full overflow-x-auto -mx-2 px-2">
      <svg
        viewBox="0 0 1120 510"
        className="w-full min-w-[760px]"
        fill="none"
        aria-label="Backend service architecture"
      >
        <defs>
          <marker id="arch-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0.5 L7,4 L0,7.5 Z" fill="rgba(199,154,75,0.40)" />
          </marker>
          <radialGradient id="arch-bg-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#C79A4B" stopOpacity="0.045" />
            <stop offset="55%"  stopColor="#C79A4B" stopOpacity="0.018" />
            <stop offset="100%" stopColor="#C79A4B" stopOpacity="0" />
          </radialGradient>
          <filter id="node-glow" x="-30%" y="-50%" width="160%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* Background warm glow — centered on services column */}
        <ellipse cx="555" cy="270" rx="460" ry="210" fill="url(#arch-bg-glow)" />

        {/* Vertical column separator lines */}
        {[218, 438, 673, 898].map((x, i) => (
          <line
            key={i}
            x1={x} y1="75" x2={x} y2="465"
            stroke="#C79A4B"
            strokeWidth="0.4"
            strokeOpacity="0.06"
            strokeDasharray="4 8"
          />
        ))}

        {/* Layer labels */}
        {LAYER_LABELS.map(ll => (
          <text
            key={ll.label}
            x={ll.x} y="56"
            textAnchor="middle"
            fill="rgba(199,154,75,0.30)"
            fontSize="8"
            fontFamily="JetBrains Mono, monospace"
            letterSpacing="0.1em"
          >
            {ll.label}
          </text>
        ))}

        {/* Subtle horizontal guide at label baseline */}
        <line x1="28" y1="66" x2="1092" y2="66"
          stroke="#C79A4B" strokeWidth="0.3" strokeOpacity="0.08" />

        {/* Edges — drawn in left to right once in view */}
        {EDGES.map(({ x1, y1, x2, y2 }, i) => {
          const mx = (x1 + x2) / 2;
          return (
            <motion.path
              key={i}
              d={`M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`}
              stroke="rgba(199,154,75,0.28)"
              strokeWidth="0.9"
              strokeDasharray="5 5"
              markerEnd="url(#arch-arrow)"
              initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 0.9, ease: 'easeInOut', delay: 0.45 + i * 0.09 }}
            />
          );
        })}

        {/* Nodes */}
        {NODES.map((n, i) => (
          <motion.g
            key={i}
            filter="url(#node-glow)"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 + n.col * 0.12 }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{ cursor: 'default' }}
          >
            <rect
              x={n.cx - NW / 2} y={n.cy - NH / 2}
              width={NW} height={NH}
              rx={RX}
              fill="#0D0C0A"
              stroke={hovered === i ? '#C79A4B' : 'rgba(199,154,75,0.22)'}
              strokeWidth={hovered === i ? 1 : 0.8}
              style={{
                transition: 'stroke 0.25s ease, filter 0.25s ease',
                filter: hovered === i ? 'drop-shadow(0 0 6px rgba(199,154,75,0.35))' : 'none',
              }}
            />
            <text
              x={n.cx} y={n.cy - 7}
              textAnchor="middle"
              fill="rgba(199,154,75,0.82)"
              fontSize="10"
              fontFamily="JetBrains Mono, monospace"
              fontWeight="500"
            >
              {n.label}
            </text>
            <text
              x={n.cx} y={n.cy + 11}
              textAnchor="middle"
              fill="rgba(158,149,135,0.50)"
              fontSize="8"
              fontFamily="JetBrains Mono, monospace"
            >
              {n.sub}
            </text>
          </motion.g>
        ))}

        {/* Small node dots at column/line intersections */}
        <circle cx={COL[0]} cy={270} r="2" fill="rgba(199,154,75,0.20)" />
        <circle cx={COL[4]} cy={270} r="2" fill="rgba(199,154,75,0.20)" />

        {/* Tooltip — drawn last so it sits above everything */}
        <AnimatePresence>
          {hovered !== null && (() => {
            const n = NODES[hovered];
            const tw = n.desc.length * 6 + 26;
            const th = 26;
            // Keep inside the viewBox horizontally
            const tx = Math.min(Math.max(n.cx - tw / 2, 8), 1120 - tw - 8);
            const ty = n.cy - NH / 2 - th - 10;
            return (
              <motion.g
                key={hovered}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                style={{ pointerEvents: 'none' }}
              >
                <rect
                  x={tx} y={ty} width={tw} height={th} rx="6"
                  fill="#0D0C0A"
                  stroke="rgba(199,154,75,0.30)"
                  strokeWidth="0.8"
                />
                <text
                  x={tx + tw / 2} y={ty + th / 2 + 3.5}
                  textAnchor="middle"
                  fill="#F0EDE3"
                  fontSize="10"
                  fontFamily="JetBrains Mono, monospace"
                >
                  {n.desc}
                </text>
              </motion.g>
            );
          })()}
        </AnimatePresence>
      </svg>
    </div>
  );
}

export default function Architecture() {
  const ref          = useRef(null);
  const inView       = useInView(ref, { once: true, margin: '-80px' });
  const reduceMotion = useReducedMotion();

  const fade = (delay = 0) => ({
    initial:    { opacity: 0, y: 16 },
    animate:    inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  });

  return (
    <section id="architecture" className="relative overflow-hidden section-gap section-divider" ref={ref}>
      <SectionBg variant="arc-center" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-12">
        <motion.p {...fade(0)} className="label-mono mb-6">Systems thinking</motion.p>

        <motion.h2 {...fade(0.07)} className="headline mb-4">
          How I think about backend systems.
        </motion.h2>

        <motion.p {...fade(0.13)} className="text-text-2 text-sm mb-14 max-w-2xl">
          A typical service topology I work within — clear layers, async messaging for resilience
          and observability wired in from day one.
        </motion.p>

        {/* Diagram */}
        <motion.div
          {...fade(0.18)}
          className="card-premium p-6 md:p-10 mb-16"
        >
          <p className="font-mono text-[9px] text-text-3 uppercase tracking-widest mb-7">
            Service architecture overview
          </p>
          <FlowDiagram inView={inView} reduceMotion={reduceMotion} />
        </motion.div>

        {/* Principles */}
        <motion.p {...fade(0.24)} className="font-mono text-[9px] text-text-3 uppercase tracking-widest mb-0">
          Design principles
        </motion.p>

        <div className="divide-y divide-[rgba(199,154,75,0.06)] mt-0">
          {PRINCIPLES.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.28 + i * 0.07 }}
              className="grid md:grid-cols-[280px_1fr] gap-4 md:gap-12 py-6"
            >
              <h3 className="text-sm font-semibold" style={{ color: 'rgba(199,154,75,0.72)' }}>
                {p.title}
              </h3>
              <p className="text-text-2 text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
