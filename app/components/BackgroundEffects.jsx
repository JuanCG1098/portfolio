export default function BackgroundEffects() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Subtle grid */}
      <div className="absolute inset-0 tech-grid opacity-100" />

      {/* Cyan glow — top left */}
      <div
        className="absolute animate-glow-pulse"
        style={{
          top: '-10%',
          left: '-5%',
          width: '55%',
          height: '55%',
          background: 'radial-gradient(ellipse at center, rgba(34,211,238,0.055) 0%, transparent 70%)',
          filter: 'blur(1px)',
        }}
      />

      {/* Violet glow — bottom right */}
      <div
        className="absolute"
        style={{
          bottom: '10%',
          right: '-10%',
          width: '40%',
          height: '40%',
          background: 'radial-gradient(ellipse at center, rgba(167,139,250,0.04) 0%, transparent 70%)',
        }}
      />

      {/* Blue glow — center right (Experience/CaseStudies zone) */}
      <div
        className="absolute"
        style={{
          top: '45%',
          right: '5%',
          width: '30%',
          height: '30%',
          background: 'radial-gradient(ellipse at center, rgba(96,165,250,0.035) 0%, transparent 70%)',
        }}
      />

      {/* Very subtle horizontal scan line overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34,211,238,0.006) 2px, rgba(34,211,238,0.006) 4px)',
          backgroundSize: '100% 4px',
        }}
      />
    </div>
  );
}
