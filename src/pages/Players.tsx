
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/ui/Layout';
import { PlayerCard } from '@/components/ui/PlayerCard';
import { PlayerForm } from '@/components/ui/PlayerForm';
import { Search, Plus, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { fetchPlayers, addPlayer, updatePlayer, fetchTeams, Player } from '@/services/playerService';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const Players = () => {
  const [selectedTeam, setSelectedTeam] = useState<string | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState<string | null>(null);
  
  const queryClient = useQueryClient();
  
  // Fetch players and teams data
  const { data: players = [], isLoading: playersLoading } = useQuery({
    queryKey: ['players'],
    queryFn: fetchPlayers
  });
  
  const { data: teams = [], isLoading: teamsLoading } = useQuery({
    queryKey: ['teams'],
    queryFn: fetchTeams
  });
  
  // Mutations for adding and updating players
  const addPlayerMutation = useMutation({
    mutationFn: addPlayer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['players'] });
      setShowForm(false);
      toast.success('Joueur ajouté avec succès');
    }
  });
  
  const updatePlayerMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: any }) => updatePlayer(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['players'] });
      setEditingPlayer(null);
      toast.success('Joueur mis à jour avec succès');
    }
  });
  
  // Filter players based on team selection and search term
  const filteredPlayers = players
    .filter(player => selectedTeam === 'all' || player.teamId === selectedTeam)
    .filter(player => 
      player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.teamName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
  const handleAddPlayer = (playerData: any) => {
    addPlayerMutation.mutate(playerData);
  };
  
  const handleUpdatePlayer = (playerData: any) => {
    if (editingPlayer) {
      updatePlayerMutation.mutate({ id: editingPlayer, data: playerData });
    }
  };
  
  const handlePlayerEdit = (id: string) => {
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
          player={editingPlayer !== null ? players.find(p => p.id === editingPlayer) : undefined}
          onSubmit={editingPlayer !== null ? handleUpdatePlayer : handleAddPlayer}
          onCancel={handleFormCancel}
          teams={teams}
          isLoading={addPlayerMutation.isPending || updatePlayerMutation.isPending}
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
      
      {playersLoading ? (
        <div className="flex justify-center p-12">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPlayers.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-500">
              {searchTerm ? 'Aucun joueur ne correspond à votre recherche' : 'Aucun joueur disponible'}
            </div>
          ) : (
            filteredPlayers.map(player => (
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
            ))
          )}
        </div>
      )}
    </Layout>
  );
};

export default Players;
