// src/components/ui/Card.tsx

'use client';

import React, { useState } from 'react';
import Modal from './Modal';
import Button from './Button';

interface CardProps {
  title?: string;
  imageUrl?: string;
  iconUrl?: string;
  description?: string;
  modalContent?: React.ReactNode;
  readMoreLabel?: string;
  className?: string;
}

export default function Card({
  title,
  imageUrl,
  iconUrl,
  description,
  modalContent,
  readMoreLabel = 'Read More',
  className = '',
}: CardProps) {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleReadMore = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <div className={`bg-white text-black p-4 rounded shadow-md w-full max-w-sm flex flex-col items-center ${className}`}>
      {imageUrl && (
        <img src={imageUrl} alt={title || 'Image'} className="w-full h-48 object-cover rounded mb-4" />
      )}
      {!imageUrl && iconUrl && (
        <img src={iconUrl} alt={title || 'Icon'} className="w-16 h-16 mb-4 object-contain" />
      )}
      {title && <h3 className="text-xl font-semibold mb-2 text-center">{title}</h3>}
      {description && <p className="text-gray-800 mb-4 text-left w-full line-clamp-3">{description}</p>}
      {modalContent && (
        <Button variant="secondary" onClick={handleReadMore}>
          {readMoreLabel}
        </Button>
      )}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {modalContent}
      </Modal>
    </div>
  );
}
