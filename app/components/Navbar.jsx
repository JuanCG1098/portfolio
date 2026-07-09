'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LINKS = [
  { label: 'About',        href: '#about' },
  { label: 'Stack',        href: '#stack' },
  { label: 'Experience',   href: '#experience' },
  { label: 'Case Studies', href: '#cases' },
  { label: 'Projects',     href: '#projects' },
  { label: 'Contact',      href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active,   setActive]   = useState('');
  const [open,     setOpen]     = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 32);
      // Pick the section closest above the scroll position, regardless of menu order
      let current = '';
      let bestTop = -Infinity;
      for (const l of LINKS) {
        const el = document.getElementById(l.href.slice(1));
        if (el && window.scrollY >= el.offsetTop - 160 && el.offsetTop > bestTop) {
          bestTop = el.offsetTop;
          current = l.href;
        }
      }
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (href) => {
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-bg/80 backdrop-blur-xl border-b border-[rgba(199,154,75,0.06)]'
            : ''
        }`}
      >
        <nav className="max-w-[1280px] mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-mono text-sm text-text-2 hover:text-text transition-colors tracking-wider"
          >
            jcg.dev
          </button>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-7">
            {LINKS.map(l => (
              <li key={l.href}>
                <button
                  onClick={() => go(l.href)}
                  className={`relative text-[13px] py-1 transition-colors duration-300 ${
                    active === l.href ? 'text-gold' : 'text-text-2 hover:text-text'
                  }`}
                >
                  {l.label}
                  {active === l.href && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute -bottom-0.5 left-0 right-0 h-px"
                      style={{ background: 'linear-gradient(90deg, transparent, rgba(199,154,75,0.7), transparent)' }}
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden md:block">
            <button onClick={() => go('#contact')} className="btn-gold text-[13px] py-1.5 px-4">
              Contact me
            </button>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden p-2 flex flex-col gap-[5px]"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <span className={`block w-5 h-px bg-text-2 transition-all ${open ? 'rotate-45 translate-y-[6px]' : ''}`} />
            <span className={`block w-5 h-px bg-text-2 transition-all ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-px bg-text-2 transition-all ${open ? '-rotate-45 -translate-y-[6px]' : ''}`} />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed top-16 left-0 right-0 z-40 bg-surface/95 backdrop-blur-xl
                       border-b border-[rgba(199,154,75,0.08)] overflow-hidden md:hidden"
          >
            <ul className="flex flex-col px-6 py-5 gap-4">
              {LINKS.map(l => (
                <li key={l.href}>
                  <button
                    onClick={() => go(l.href)}
                    className="text-sm text-text-2 hover:text-text transition-colors w-full text-left"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
              <li className="pt-3 border-t border-[rgba(199,154,75,0.08)]">
                <button onClick={() => go('#contact')} className="btn-gold w-full justify-center">
                  Contact me
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
