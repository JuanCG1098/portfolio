export default function Footer() {
  return (
    <footer
      className="py-8 px-6 lg:px-12"
      style={{ borderTop: '1px solid rgba(199,154,75,0.06)' }}
    >
      <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-mono text-[10px] text-text-3">
          Juan Cruz Gallardo · Full-Stack Developer · 2026
        </p>
        <p className="font-mono text-[10px] text-text-3">
          Built with Next.js · Tailwind CSS · Framer Motion
        </p>
      </div>
    </footer>
  );
}
