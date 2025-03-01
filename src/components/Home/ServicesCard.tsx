'use client';

import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { Services } from '@/data/servicesData';

interface ServicesCardProps {
  service: Services;
}

export default function ServicesCard({ service }: ServicesCardProps) {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleReadMore = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <div className="bg-[#A4B792] text-black p-4 rounded shadow-md w-full max-w-sm flex flex-col items-center">
      <img src={service.icon} alt={service.header} className="w-16 h-16 mb-4 object-contain" />
      <h3 className="text-xl font-semibold mb-2 text-center">{service.header}</h3>
      <div className="text-gray-800 text-left w-full mb-4 flex-grow">
        <p>{service.description}</p>
      </div>
      <Button
        variant="secondary"
        className="mt-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-all"
        onClick={handleReadMore}
      >
        Read More
      </Button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="text-gray-800 space-y-4">
          <h2 className="text-xl font-semibold">{service.header}</h2>
          <p>{service.description}</p>
          <ul className="list-disc list-inside space-y-2">
            {service.content.map((item, index) => (
              <li
                key={index}
                className="pl-6"
                style={{ textIndent: '-0.75rem', paddingLeft: '1.5rem' }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Modal>
    </div>
  );
}
