// src/components/ui/PageSection.tsx

import React from 'react';

interface PageSectionProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  alignment?: 'center' | 'left';
}

export default function PageSection({
  title,
  subtitle,
  children,
  alignment = 'center',
}: PageSectionProps) {
  const alignClass = alignment === 'center' ? 'text-center' : 'text-left';
  return (
    <section className="py-12">
      <div className={`container mx-auto px-4 ${alignClass}`}>
        {title && <h2 className="text-3xl font-semibold mb-4">{title}</h2>}
        {subtitle && <p className="text-lg text-gray-700 mb-8">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}
