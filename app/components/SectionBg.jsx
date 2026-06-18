/**
 * SectionBg — reusable warm-gold background motif for sections.
 * The parent section needs: position: relative; overflow: hidden.
 *
 * variant:
 *   'arc-right'   large arc centred on right side
 *   'arc-left'    large arc centred on left side
 *   'arc-center'  symmetric arcs
 *   'dots-right'  sparse dot constellation, right-leaning
 *   'dots-left'   sparse dot constellation, left-leaning
 */
export default function SectionBg({ variant = 'arc-right' }) {
  const id = `sb-${variant}`;

  const configs = {
    'arc-right': {
      glows: [
        { top: '-20%', right: '-15%',  width: '55%', height: '70%', opacity: 0.06 },
      ],
      arcs: [
        { cx: 1300, cy: 300, r: 350, opacity: 0.06 },
        { cx: 1300, cy: 300, r: 500, opacity: 0.04 },
        { cx: 1300, cy: 300, r: 680, opacity: 0.025 },
      ],
      lines: [
        { y: 180, opacity: 0.030 },
        { y: 360, opacity: 0.035 },
        { y: 540, opacity: 0.025 },
      ],
      dots: [
        { cx: 950, cy: 180, r: 1.4, opacity: 0.25 },
        { cx: 1100, cy: 360, r: 1.2, opacity: 0.20 },
        { cx: 820, cy: 420, r: 1.0, opacity: 0.18 },
        { cx: 1250, cy: 200, r: 1.4, opacity: 0.22 },
      ],
    },
    'arc-left': {
      glows: [
        { top: '10%', left: '-15%', width: '50%', height: '70%', opacity: 0.055 },
      ],
      arcs: [
        { cx: 150, cy: 300, r: 320, opacity: 0.06 },
        { cx: 150, cy: 300, r: 480, opacity: 0.04 },
        { cx: 150, cy: 300, r: 650, opacity: 0.025 },
      ],
      lines: [
        { y: 200, opacity: 0.028 },
        { y: 380, opacity: 0.032 },
      ],
      dots: [
        { cx: 460, cy: 200, r: 1.4, opacity: 0.22 },
        { cx: 300, cy: 370, r: 1.2, opacity: 0.18 },
        { cx: 620, cy: 430, r: 1.0, opacity: 0.16 },
        { cx: 180, cy: 140, r: 1.3, opacity: 0.20 },
      ],
    },
    'arc-center': {
      glows: [
        { top: '0%', left: '25%', width: '50%', height: '80%', opacity: 0.045 },
      ],
      arcs: [
        { cx: 720, cy: 300, r: 320, opacity: 0.055 },
        { cx: 720, cy: 300, r: 480, opacity: 0.035 },
        { cx: 720, cy: 300, r: 660, opacity: 0.022 },
      ],
      lines: [
        { y: 160, opacity: 0.028 },
        { y: 320, opacity: 0.032 },
        { y: 480, opacity: 0.024 },
      ],
      dots: [
        { cx: 400, cy: 160, r: 1.4, opacity: 0.22 },
        { cx: 720, cy: 300, r: 2.0, opacity: 0.16 },
        { cx: 1040, cy: 440, r: 1.2, opacity: 0.20 },
        { cx: 550, cy: 430, r: 1.0, opacity: 0.16 },
        { cx: 900, cy: 160, r: 1.2, opacity: 0.18 },
      ],
    },
    'dots-right': {
      glows: [
        { top: '20%', right: '-5%', width: '35%', height: '50%', opacity: 0.04 },
      ],
      arcs: [
        { cx: 1200, cy: 280, r: 420, opacity: 0.04 },
      ],
      lines: [
        { y: 240, opacity: 0.030 },
        { y: 420, opacity: 0.025 },
      ],
      dots: [
        { cx: 680, cy: 120, r: 1.2, opacity: 0.20 },
        { cx: 820, cy: 220, r: 1.0, opacity: 0.16 },
        { cx: 960, cy: 180, r: 1.4, opacity: 0.22 },
        { cx: 1080, cy: 320, r: 1.2, opacity: 0.18 },
        { cx: 750, cy: 380, r: 1.0, opacity: 0.14 },
        { cx: 1180, cy: 140, r: 1.0, opacity: 0.18 },
        { cx: 900, cy: 440, r: 1.2, opacity: 0.14 },
      ],
    },
    'dots-left': {
      glows: [
        { top: '20%', left: '-5%', width: '35%', height: '50%', opacity: 0.04 },
      ],
      arcs: [
        { cx: 240, cy: 280, r: 400, opacity: 0.04 },
      ],
      lines: [
        { y: 200, opacity: 0.028 },
        { y: 400, opacity: 0.025 },
      ],
      dots: [
        { cx: 200, cy: 150, r: 1.2, opacity: 0.20 },
        { cx: 360, cy: 260, r: 1.4, opacity: 0.22 },
        { cx: 120, cy: 340, r: 1.0, opacity: 0.16 },
        { cx: 480, cy: 180, r: 1.0, opacity: 0.16 },
        { cx: 560, cy: 380, r: 1.2, opacity: 0.14 },
        { cx: 280, cy: 440, r: 1.0, opacity: 0.14 },
      ],
    },
  };

  const c = configs[variant] || configs['arc-right'];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Warm glows */}
      {c.glows.map((g, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: g.top, bottom: g.bottom,
            left: g.left, right: g.right,
            width: g.width, height: g.height,
            background: `radial-gradient(ellipse 60% 60% at 50% 50%, rgba(199,154,75,${g.opacity}) 0%, rgba(199,154,75,${g.opacity * 0.3}) 45%, transparent 75%)`,
            filter: 'blur(1px)',
          }}
        />
      ))}

      {/* SVG: arcs + lines + dots */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 600"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {/* Arcs */}
        {c.arcs.map((a, i) => (
          <circle
            key={i}
            cx={a.cx} cy={a.cy} r={a.r}
            stroke="#C79A4B"
            strokeWidth="0.5"
            strokeOpacity={a.opacity}
          />
        ))}

        {/* Horizontal flow lines */}
        {c.lines.map((l, i) => (
          <line
            key={i}
            x1="0" y1={l.y} x2="1440" y2={l.y}
            stroke="#C79A4B"
            strokeWidth="0.4"
            strokeOpacity={l.opacity}
          />
        ))}

        {/* Constellation dots */}
        {c.dots.map((d, i) => (
          <circle
            key={i}
            cx={d.cx} cy={d.cy} r={d.r}
            fill="#C79A4B"
            fillOpacity={d.opacity}
          />
        ))}
      </svg>
    </div>
  );
}
