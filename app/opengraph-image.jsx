import { ImageResponse } from 'next/og';

// Edge runtime: @vercel/og's Node build fails on Windows file:// paths,
// and Vercel serves this from the edge anyway.
export const runtime = 'edge';
export const alt = 'Juan Cruz Gallardo — Full-Stack Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px 96px',
          background: '#050505',
          position: 'relative',
        }}
      >
        {/* Warm corner glow */}
        <div
          style={{
            position: 'absolute',
            top: '-30%',
            right: '-15%',
            width: '700px',
            height: '700px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(199,154,75,0.14) 0%, rgba(199,154,75,0.04) 45%, transparent 70%)',
          }}
        />

        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: '#F0EDE3',
            letterSpacing: '-0.03em',
            display: 'flex',
          }}
        >
          Juan Cruz Gallardo
        </div>

        <div
          style={{
            marginTop: 24,
            fontSize: 30,
            color: '#9E9587',
            display: 'flex',
          }}
        >
          Full-Stack Developer · .NET · Flutter · Microservices · Fintech
        </div>

        <div
          style={{
            marginTop: 44,
            width: 220,
            height: 2,
            background: 'linear-gradient(90deg, #D6B16A, #C79A4B, #8A6630)',
            display: 'flex',
          }}
        />

        <div
          style={{
            position: 'absolute',
            bottom: 56,
            right: 96,
            fontSize: 26,
            fontFamily: 'monospace',
            color: '#C79A4B',
            display: 'flex',
          }}
        >
          jcg.dev
        </div>
      </div>
    ),
    { ...size }
  );
}
