// src/app/team/page.tsx

import React from 'react';
import TeamMemberCard from '@/components/Team/TeamMemberCard';
import { teamMembers } from '@/data/teamMembers';

export default function TeamPage() {
  return (
    <section>
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">Team</h1>
        <p className="text-lg text-gray-700 max-w-prose mx-auto">
          Meet the dedicated professionals committed to your financial success and future.
        </p>
      </div>
      <div
        className="my-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
      >
        {teamMembers.map((member, index) => (
          <TeamMemberCard key={index} member={member} />
        ))}
      </div>
    </section>
  );
}
