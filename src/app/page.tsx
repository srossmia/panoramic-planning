// /src/app/page.tsx

import React from 'react';
import Differentiators from '@/components/Home/Differentiators';
import Services from '@/components/Home/Services';

export default function HomePage() {
  return (
    <section>
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">Panoramic Planning</h1>
        <p className="text-lg text-gray-700 max-w-prose mx-auto">
          We guide you through life&apos;s financial complexities with clarity and care. Our
          goal is to ensure your wealth supports your dreams and values.
        </p>
      </div>
      <div className="my-16">
        <Differentiators />
      </div>
      <div className="my-16">
        <Services />
      </div>
    </section>
  );
}
