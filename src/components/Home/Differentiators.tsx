// /src/components/Home/Differentiators.tsx

import React from 'react';
import { differentiatorsData } from '@/data/differentiatorsData';

const Differentiators: React.FC = () => {
  return (
    <div>
      <div className="grid md:grid-cols-3 gap-8">
        {differentiatorsData.map((differentiator, index) => (
          <div key={index} className="text-center">
            <h3 className="text-xl font-semibold mb-2">{differentiator.title}</h3>
            <p>{differentiator.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Differentiators;
