
import React from 'react';
import { MatchStatus } from '@/hooks/useMatches';

interface MatchesFilterProps {
  status: MatchStatus;
  setStatus: (status: MatchStatus) => void;
}

export const MatchesFilter: React.FC<MatchesFilterProps> = ({ status, setStatus }) => {
  return (
    <div className="flex items-center space-x-1 overflow-x-auto scrollbar-hide pb-2">
      <button
        onClick={() => setStatus('all')}
        className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
          status === 'all' 
            ? 'bg-primary text-white' 
            : 'bg-white/70 text-gray-700 hover:bg-white'
        }`}
      >
        Tous
      </button>
      
      <button
        onClick={() => setStatus('upcoming')}
        className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
          status === 'upcoming' 
            ? 'bg-primary text-white' 
            : 'bg-white/70 text-gray-700 hover:bg-white'
        }`}
      >
        À venir
      </button>
      
      <button
        onClick={() => setStatus('completed')}
        className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
          status === 'completed' 
            ? 'bg-primary text-white' 
            : 'bg-white/70 text-gray-700 hover:bg-white'
        }`}
      >
        Terminés
      </button>
    </div>
  );
};
