import React, { useState } from 'react';
import { Layout } from '@/components/ui/Layout';

const Players = () => {
  const [editingPlayer, setEditingPlayer] = useState(null);
  
  // Rest of the component using editingPlayer and setEditingPlayer
  
  return (
    <Layout title="Players">
      {/* Component content */}
                  <input
                    type="number"
                    className="border rounded p-1 w-full"
                    value={editingPlayer?.number || ''}
                    onChange={(e) => setEditingPlayer({...editingPlayer, number: Number(e.target.value)})}
                  />
      {/* More content */}
    </Layout>
  );
};

export default Players;
