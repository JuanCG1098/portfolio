'use client';

const skills = [
  '.NET 10', 'Flutter', 'Angular', 'Azure DevOps', 'MongoDB',
  'SQL Server', 'Microservices', 'C#', 'REST APIs', 'System Design',
];

const separator = '✦';

export default function MarqueeTicker() {
  const items = [...skills, ...skills];

  return (
    <div className="relative overflow-hidden border-y border-border py-4 bg-surface/50">
      <div className="marquee-track">
        {items.map((skill, i) => (
          <span key={i} className="flex items-center gap-6 px-3">
            <span className="font-mono text-sm text-muted whitespace-nowrap">
              {skill}
            </span>
            <span className="text-accent text-xs">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
