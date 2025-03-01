// src/components/Home/Services.tsx

'use client';

import React from 'react';
import { servicesData } from '@/data/servicesData';
import ServicesCard from './ServicesCard';

export default function Services() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
      {servicesData.map((service, index) => (
        <ServicesCard key={index} service={service} />
      ))}
    </div>
  );
}
