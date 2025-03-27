
import React, { useState } from 'react';
import { Layout } from '@/components/ui/Layout';
import { PlayerCard } from '@/components/ui/PlayerCard';
import { PlayerForm } from '@/components/ui/PlayerForm';
import { players, teams } from '@/lib/data';
import { Search, Plus, Filter, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// Unique ID generator for new players
const generateId = () => {
  return Math.max(0, ...players.map(player => player.id)) + 1;
};

const Players = () => {
  const [selectedTeam, setSelectedTeam] = useState<number | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [currentPlayers, setCurrentPlayers] = useState(players);
  const [editingPlayer, setEditingPlayer] = useState<number | null>(null);
  
  // Filter players based on team selection and search term
  const filteredPlayers = currentPlayers
    .filter(player => selectedTeam === 'all' || player.teamId === selectedTeam)
    .filter(player => 
      player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.teamName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
  const handleAddPlayer = (playerData: any) => {
    const teamName = teams.find(team => team.id === playerData.teamId)?.name || '';
    
    const newPlayer = {
      id: generateId(),
      name: playerData.name,
      position: playerData.position,
      number: playerData.number,
      teamId: playerData.teamId,
      teamName: teamName,
      rating: 6.0, // Default rating for new players
      photoUrl: playerData.photoUrl || undefined,
      nationality: playerData.nationality || undefined,
      age: playerData.age || undefined,
    };
    
    setCurrentPlayers([...currentPlayers, newPlayer]);
    setShowForm(false);
    toast.success('Joueur ajouté avec succès');
  };
  
  const handleUpdatePlayer = (playerData: any) => {
    const teamName = teams.find(team => team.id === playerData.teamId)?.name || '';
    
    setCurrentPlayers(currentPlayers.map(player => 
      player.id === editingPlayer
        ? {
            ...player,
            name: playerData.name,
            position: playerData.position,
            number: playerData.number,
            teamId: playerData.teamId,
            teamName: teamName,
            photoUrl: playerData.photoUrl || undefined,
            nationality: playerData.nationality || undefined,
            age: playerData.age || undefined,
          }
        : player
    ));
    
    setEditingPlayer(null);
    toast.success('Joueur mis à jour avec succès');
  };
  
  const handlePlayerEdit = (id: number) => {
    setEditingPlayer(id);
  };
  
  const handleFormCancel = () => {
    setShowForm(false);
    setEditingPlayer(null);
  };
  
  return (
    <Layout title="Joueurs">
      {showForm || editingPlayer !== null ? (
        <PlayerForm 
          player={editingPlayer !== null ? currentPlayers.find(p => p.id === editingPlayer) : undefined}
          onSubmit={editingPlayer !== null ? handleUpdatePlayer : handleAddPlayer}
          onCancel={handleFormCancel}
        />
      ) : (
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>Ajouter</span>
            </Button>
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
      )}
      
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
            onClick={() => handlePlayerEdit(player.id)}
            className="relative"
          >
            <Button 
              variant="ghost" 
              size="icon"
              className="absolute top-2 right-2 bg-white/80 hover:bg-white"
              onClick={(e) => {
                e.stopPropagation();
                handlePlayerEdit(player.id);
              }}
            >
              <Edit className="h-4 w-4 text-gray-600" />
            </Button>
          </PlayerCard>
        ))}
      </div>
    </Layout>
  );
};

export default Players;
