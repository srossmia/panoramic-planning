// /src/components/Home/Clients.tsx

import React from 'react';
import { clientsData } from '@/data/clientsData';

const Clients: React.FC = () => {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {clientsData.map((clientType, index) => (
        <div key={index} className="bg-white p-4 rounded shadow-md">
          <p className="text-lg font-semibold text-black">
            {clientType}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Clients;
