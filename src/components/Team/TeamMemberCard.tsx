// src/components/Team/TeamMemberCard.tsx

'use client';

import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';

interface TeamMember {
  name: string;
  title: string;
  phone: string;
  extension: string;
  email: string;
  bio: string[];
  imageSrc: string;
}

interface TeamMemberCardProps {
  member: TeamMember;
}

export default function TeamMemberCard({ member }: TeamMemberCardProps) {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleReadMore = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <div className="bg-[#A4B792] text-black p-4 rounded shadow-md w-full max-w-sm flex flex-col items-center">
      {member.imageSrc && (
        <div className="w-full h-48 rounded mb-4 overflow-hidden flex items-center justify-center">
          <img
            src={member.imageSrc}
            alt={member.name}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
      <h3 className="text-xl font-semibold mb-2 text-center">{member.name}</h3>
      <p className="text-lg text-gray-800 mb-4 text-center">{member.title}</p>
      <div className="text-gray-800 text-left w-full mb-4 flex-grow space-y-2">
        <p>Email: <a href={`mailto:${member.email}`} className="underline text-blue-600">{member.email}</a></p>
        <p>Phone: <a href={`tel:${member.phone}`} className="underline text-blue-600">{member.phone}</a>{member.extension && ` x${member.extension}`}</p>
      </div>
      <p className="text-gray-700 mb-4 line-clamp-2 text-left">
        {member.bio[0]}
      </p>
      <Button
        variant="secondary"
        className="mt-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-all"
        onClick={handleReadMore}
      >
        Read More
      </Button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="text-gray-800 space-y-4">
          {member.bio.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </Modal>
    </div>
  );
}
