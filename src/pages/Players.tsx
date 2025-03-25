
import React, { useState } from 'react';
import { Layout } from '@/components/ui/Layout';
import { PlayerCard } from '@/components/ui/PlayerCard';
import { players, teams } from '@/lib/data';
import { Search, Plus, Filter } from 'lucide-react';

const Players = () => {
  const [selectedTeam, setSelectedTeam] = useState<number | 'all'>('all');
  
  const filteredPlayers = selectedTeam === 'all' 
    ? players 
    : players.filter(player => player.teamId === selectedTeam);
  
  return (
    <Layout title="Joueurs">
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="relative w-full max-w-xs">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full bg-white/70 backdrop-blur-sm border border-gray-200 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              placeholder="Rechercher un joueur..."
            />
          </div>
          
          <button className="bg-primary text-white rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-primary/90 transition-colors">
            <Plus className="h-4 w-4" />
            <span>Ajouter</span>
          </button>
        </div>
        
        <div className="flex items-center space-x-1 overflow-x-auto scrollbar-hide pb-2">
          <button
            onClick={() => setSelectedTeam('all')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              selectedTeam === 'all' 
                ? 'bg-primary text-white' 
                : 'bg-white/70 text-gray-700 hover:bg-white'
            }`}
          >
            Tous
          </button>
          
          {teams.map(team => (
            <button
              key={team.id}
              onClick={() => setSelectedTeam(team.id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                selectedTeam === team.id 
                  ? 'bg-primary text-white' 
                  : 'bg-white/70 text-gray-700 hover:bg-white'
              }`}
            >
              {team.name}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPlayers.map(player => (
          <PlayerCard
            key={player.id}
            id={player.id}
            name={player.name}
            position={player.position}
            number={player.number}
            teamName={player.teamName}
            rating={player.rating}
            photoUrl={player.photoUrl}
            nationality={player.nationality}
            age={player.age}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Players;
