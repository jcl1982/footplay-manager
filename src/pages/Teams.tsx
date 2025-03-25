
import React from 'react';
import { Layout } from '@/components/ui/Layout';
import { TeamCard } from '@/components/ui/TeamCard';
import { teams } from '@/lib/data';
import { Search, Plus } from 'lucide-react';

const Teams = () => {
  return (
    <Layout title="Équipes">
      <div className="mb-6 flex items-center justify-between">
        <div className="relative w-full max-w-xs">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="w-full bg-white/70 backdrop-blur-sm border border-gray-200 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            placeholder="Rechercher une équipe..."
          />
        </div>
        
        <button className="bg-primary text-white rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" />
          <span>Ajouter</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map(team => (
          <TeamCard
            key={team.id}
            id={team.id}
            name={team.name}
            logoUrl={team.logoUrl}
            playerCount={team.playerCount}
            league={team.league}
            wins={team.wins}
            draws={team.draws}
            losses={team.losses}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Teams;
