import './globals.css';

export const metadata = {
  metadataBase: new URL('https://jcg.dev'),
  title: 'Juan Cruz Gallardo — Full-Stack Developer',
  description:
    'Full-Stack Developer specializing in .NET backend, microservices and Flutter — 5+ years building production-grade systems for fintech and banking in Argentina.',
  keywords: [
    'backend developer', '.NET', 'C#', 'Microservices', 'SQL Server', 'MongoDB',
    'Flutter', 'Azure DevOps', 'Fintech', 'Banking', 'Argentina', 'remote',
  ],
  authors: [{ name: 'Juan Cruz Gallardo' }],
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Juan Cruz Gallardo — Full-Stack Developer',
    description: 'Building reliable backend systems for fintech and enterprise products.',
    url: 'https://jcg.dev',
    siteName: 'jcg.dev',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Juan Cruz Gallardo — Full-Stack Developer',
    description: 'Building reliable backend systems for fintech and enterprise products.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg text-text antialiased">{children}</body>
    </html>
  );
}
