'use client';

import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import {
  motion,
  animate,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';

/* ── Count-up stat number ────────────────────────────── */
function StatNumber({ value, suffix = '' }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-20px' });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) { setDisplay(value); return; }
    const controls = animate(0, value, {
      duration: 1.2,
      ease: 'easeOut',
      onUpdate: v => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return <span ref={ref}>{display}{suffix}</span>;
}

/* ── Abstract arc background ─────────────────────────── */
function HeroCanvas({ x, y }) {
  return (
    <motion.div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
      style={{ x, y }}
    >
      {/* Warm radial glow — anchored behind photo zone */}
      <div
        className="absolute"
        style={{
          top: '-10%', right: '-5%',
          width: '65%', height: '120%',
          background: 'radial-gradient(ellipse 55% 60% at 65% 45%, rgba(199,154,75,0.07) 0%, rgba(199,154,75,0.03) 35%, transparent 70%)',
          filter: 'blur(2px)',
        }}
      />
      {/* Secondary deep glow — left warmth */}
      <div
        className="absolute"
        style={{
          bottom: '-20%', left: '-10%',
          width: '50%', height: '70%',
          background: 'radial-gradient(ellipse 60% 50% at 30% 70%, rgba(184,135,59,0.04) 0%, transparent 65%)',
        }}
      />
      {/* SVG arc system */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <radialGradient id="arcGlow" cx="72%" cy="50%" r="45%">
            <stop offset="0%"   stopColor="#C79A4B" stopOpacity="0.12" />
            <stop offset="60%"  stopColor="#C79A4B" stopOpacity="0.03" />
            <stop offset="100%" stopColor="#C79A4B" stopOpacity="0"    />
          </radialGradient>
          {/* Noise filter for grain */}
          <filter id="grain" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" result="noise"/>
            <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise"/>
            <feBlend in="SourceGraphic" in2="grayNoise" mode="screen" result="blended"/>
            <feComposite in="blended" in2="SourceGraphic" operator="in"/>
          </filter>
        </defs>

        {/* Warm glow fill */}
        <rect width="1440" height="900" fill="url(#arcGlow)" />

        {/* Concentric arcs — centered on photo zone */}
        <circle cx="1040" cy="430" r="260" stroke="#C79A4B" strokeWidth="0.5" strokeOpacity="0.12" />
        <circle cx="1040" cy="430" r="380" stroke="#C79A4B" strokeWidth="0.4" strokeOpacity="0.08" />
        <circle cx="1040" cy="430" r="520" stroke="#C79A4B" strokeWidth="0.4" strokeOpacity="0.05" />
        <circle cx="1040" cy="430" r="680" stroke="#C79A4B" strokeWidth="0.3" strokeOpacity="0.03" />

        {/* Horizontal flow lines */}
        <line x1="0" y1="220" x2="1440" y2="220" stroke="#C79A4B" strokeWidth="0.4" strokeOpacity="0.04" />
        <line x1="0" y1="360" x2="1440" y2="360" stroke="#C79A4B" strokeWidth="0.4" strokeOpacity="0.05" />
        <line x1="0" y1="500" x2="1440" y2="500" stroke="#C79A4B" strokeWidth="0.4" strokeOpacity="0.04" />
        <line x1="0" y1="640" x2="1440" y2="640" stroke="#C79A4B" strokeWidth="0.3" strokeOpacity="0.03" />

        {/* Node dots at arc intersections */}
        <circle cx="780"  cy="360" r="1.5" fill="#C79A4B" fillOpacity="0.25" />
        <circle cx="1300" cy="360" r="1.5" fill="#C79A4B" fillOpacity="0.20" />
        <circle cx="660"  cy="500" r="1.5" fill="#C79A4B" fillOpacity="0.20" />
        <circle cx="1420" cy="500" r="1.5" fill="#C79A4B" fillOpacity="0.15" />
        <circle cx="900"  cy="220" r="1.2" fill="#C79A4B" fillOpacity="0.18" />
        <circle cx="1040" cy="430" r="2.5" fill="#C79A4B" fillOpacity="0.15" />

        {/* Thin connecting lines from left content to right */}
        <line x1="0" y1="430" x2="780" y2="430" stroke="#C79A4B" strokeWidth="0.4" strokeOpacity="0.04" strokeDasharray="8 12" />

        {/* Film grain overlay */}
        <rect width="1440" height="900" fill="rgba(5,5,5,0.0)" filter="url(#grain)" opacity="0.025" />
      </svg>
    </motion.div>
  );
}

/* ── Stagger container ───────────────────────────────── */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.25 } },
};
const item = {
  hidden:  { opacity: 0, y: 18 },
  show:    { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const reduceMotion = useReducedMotion();

  // Subtle mouse parallax on the background canvas only
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(useTransform(mx, [-0.5, 0.5], [7, -7]), { stiffness: 45, damping: 22 });
  const py = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 45, damping: 22 });

  const onMouseMove = (e) => {
    if (reduceMotion) return;
    mx.set(e.clientX / window.innerWidth - 0.5);
    my.set(e.clientY / window.innerHeight - 0.5);
  };

  return (
    <section
      className="relative min-h-screen overflow-hidden flex items-center"
      onMouseMove={onMouseMove}
    >
      <HeroCanvas x={reduceMotion ? 0 : px} y={reduceMotion ? 0 : py} />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-12 w-full pt-16">
        <div className="grid lg:grid-cols-[58fr_42fr] min-h-screen items-center">

          {/* ── Left: headline + CTAs ── */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="py-28 lg:py-0"
          >
            {/* Availability */}
            <motion.div variants={item} className="flex items-center gap-2.5 mb-10">
              <span className="w-1.5 h-1.5 rounded-full bg-gold/80" />
              <span className="label-mono">Available for remote opportunities</span>
            </motion.div>

            {/* Headline */}
            <motion.div variants={item} className="mb-8">
              <h1 className="display mb-0">
                Full-Stack
                <span className="block text-gold-shimmer">Developer.</span>
              </h1>
            </motion.div>

            {/* Separator */}
            <motion.div
              variants={item}
              className="w-16 h-px mb-8"
              style={{ background: 'linear-gradient(90deg, rgba(199,154,75,0.6), transparent)' }}
            />

            {/* Subtitle */}
            <motion.p variants={item} className="text-text-2 text-base leading-relaxed max-w-lg mb-10">
              I build production-ready backends, microservices and enterprise integrations
              — and ship cross-platform frontends with Flutter. Focused on reliability,
              performance and clean architecture.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={item} className="flex flex-wrap gap-3 mb-14">
              <a
                href="#experience"
                onClick={e => { e.preventDefault(); document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="btn-gold group"
              >
                View experience
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
              </a>
              <a
                href="#contact"
                onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="btn-ghost"
              >
                Contact me
              </a>
              <a href="/cv.pdf" download="CV_JuanCruzGallardo" className="btn-ghost">
                Download CV
              </a>
            </motion.div>

            {/* Stat strip */}
            <motion.div
              variants={item}
              className="grid grid-cols-2 gap-6 sm:flex sm:flex-wrap sm:gap-8 pt-8"
              style={{ borderTop: '1px solid rgba(199,154,75,0.08)' }}
            >
              {[
                { n: '5+',      num: 5, suffix: '+', l: 'Years of experience' },
                { n: '2',       num: 2, suffix: '',  l: 'Regulated sectors' },
                { n: 'C1+',     l: 'English level' },
                { n: 'Remote',  l: 'Work mode' },
              ].map(s => (
                <div key={s.n}>
                  <p className="font-bold text-xl text-gold tracking-tight">
                    {s.num != null ? <StatNumber value={s.num} suffix={s.suffix} /> : s.n}
                  </p>
                  <p className="font-mono text-[10px] text-text-3 mt-0.5 tracking-wide uppercase">{s.l}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: contained portrait ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="hidden lg:flex relative items-center justify-center py-24"
          >
            {/* Decorative arcs behind the card */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 600 760"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="300" cy="380" r="272" stroke="#C79A4B" strokeWidth="0.5" strokeOpacity="0.14" />
              <circle cx="300" cy="380" r="348" stroke="#C79A4B" strokeWidth="0.4" strokeOpacity="0.08" />
              <circle cx="300" cy="380" r="432" stroke="#C79A4B" strokeWidth="0.3" strokeOpacity="0.05" />
              <circle cx="552" cy="238" r="1.6" fill="#C79A4B" fillOpacity="0.30" />
              <circle cx="62"  cy="498" r="1.4" fill="#C79A4B" fillOpacity="0.25" />
              <circle cx="486" cy="640" r="1.2" fill="#C79A4B" fillOpacity="0.20" />
            </svg>

            {/* Portrait card */}
            <motion.div
              initial={{ scale: 1.045 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
              className="relative w-full max-w-[440px]"
            >
              <div
                className="relative aspect-[4/5] rounded-xl overflow-hidden"
                style={{
                  border: '1px solid rgba(199,154,75,0.15)',
                  boxShadow: '0 24px 80px rgba(0,0,0,0.55), 0 0 60px rgba(199,154,75,0.05)',
                }}
              >
                <Image
                  src="/photo.jpg"
                  alt="Juan Cruz Gallardo"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1023px) 0px, 440px"
                  quality={90}
                  priority
                />
                {/* Subtle bottom fade behind the stack card */}
                <div
                  className="absolute inset-x-0 bottom-0 h-36"
                  style={{ background: 'linear-gradient(180deg, transparent, rgba(5,5,5,0.78))' }}
                />
              </div>

              {/* Floating stack card — overlaps the bottom edge */}
              <div className="absolute -bottom-5 left-5 z-10">
                <div
                  className="inline-flex flex-col gap-1.5 px-4 py-3 rounded-lg"
                  style={{
                    background: 'rgba(13,12,10,0.85)',
                    border: '1px solid rgba(199,154,75,0.12)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <p className="font-mono text-[9px] text-text-3 tracking-widest uppercase">Current stack</p>
                  <p className="font-mono text-xs text-text-2">.NET 10 · C# · Flutter · Angular</p>
                  <p className="font-mono text-xs text-text-2">SQL Server · MongoDB · Azure DevOps</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-12 hidden md:flex items-center gap-3"
        aria-hidden="true"
      >
        <div className="w-8 h-px" style={{ background: 'rgba(199,154,75,0.35)' }} />
        <span className="font-mono text-[10px] text-text-3 tracking-widest">scroll</span>
      </motion.div>
    </section>
  );
}
