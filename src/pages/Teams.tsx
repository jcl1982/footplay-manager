
import React, { useState } from 'react';
import { Layout } from '@/components/ui/Layout';
import { TeamCard } from '@/components/ui/TeamCard';
import { TeamForm } from '@/components/ui/TeamForm';
import { teams } from '@/lib/data';
import { Search, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Teams = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingTeam, setEditingTeam] = useState<typeof teams[0] | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.league.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddTeam = () => {
    setEditingTeam(undefined);
    setShowForm(true);
  };

  const handleEditTeam = (team: typeof teams[0]) => {
    setEditingTeam(team);
    setShowForm(true);
  };

  const handleSubmit = (data: any) => {
    if (editingTeam) {
      // Logic for editing the team would go here
      // For now, just show a toast notification
      toast.success(`Équipe "${data.name}" modifiée avec succès`, {
        description: "Les modifications ont été enregistrées."
      });
    } else {
      // Logic for adding the team would go here
      // For now, just show a toast notification
      toast.success(`Équipe "${data.name}" ajoutée avec succès`, {
        description: "La nouvelle équipe a été créée."
      });
    }
    setShowForm(false);
    setEditingTeam(undefined);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingTeam(undefined);
  };

  return (
    <Layout title="Équipes">
      {showForm ? (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{editingTeam ? 'Modifier l\'équipe' : 'Ajouter une équipe'}</h2>
            <Button variant="ghost" size="icon" onClick={handleCancel}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <TeamForm 
            initialData={editingTeam} 
            onSubmit={handleSubmit} 
            onCancel={handleCancel} 
          />
        </div>
      ) : (
        <div className="mb-6 flex items-center justify-between">
          <div className="relative w-full max-w-xs">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full bg-white/70 backdrop-blur-sm border border-gray-200 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              placeholder="Rechercher une équipe..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Button 
            className="bg-primary text-white rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-primary/90 transition-colors"
            onClick={handleAddTeam}
          >
            <Plus className="h-4 w-4" />
            <span>Ajouter</span>
          </Button>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeams.map(team => (
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
            onClick={() => handleEditTeam(team)}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Teams;
