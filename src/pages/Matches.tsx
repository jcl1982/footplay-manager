
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Layout } from '@/components/ui/Layout';
import { Calendar, ChevronRight, Plus, Flag, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MatchForm } from '@/components/ui/MatchForm';
import { toast } from 'sonner';
import { fetchMatches, addMatch, updateMatch, Match, MatchFormData } from '@/services/matchService';

type MatchStatus = 'all' | 'upcoming' | 'completed';

const Matches = () => {
  const [status, setStatus] = useState<MatchStatus>('all');
  const [showForm, setShowForm] = useState(false);
  const [editingMatch, setEditingMatch] = useState<Match | undefined>(undefined);
  
  const queryClient = useQueryClient();
  
  const { data: matches = [], isLoading, error } = useQuery({
    queryKey: ['matches'],
    queryFn: fetchMatches
  });
  
  const addMatchMutation = useMutation({
    mutationFn: (matchData: MatchFormData) => addMatch(matchData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['matches'] });
      toast.success('Match ajouté avec succès');
      setShowForm(false);
      setEditingMatch(undefined);
    },
    onError: (error) => {
      toast.error('Erreur lors de l\'ajout du match');
      console.error(error);
    }
  });
  
  const updateMatchMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: MatchFormData }) => 
      updateMatch(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['matches'] });
      toast.success('Match modifié avec succès');
      setShowForm(false);
      setEditingMatch(undefined);
    },
    onError: (error) => {
      toast.error('Erreur lors de la modification du match');
      console.error(error);
    }
  });
  
  const filteredMatches = status === 'all' 
    ? matches 
    : matches.filter(match => match.status === status);
  
  const handleAddMatch = () => {
    setEditingMatch(undefined);
    setShowForm(true);
  };

  const handleEditMatch = (match: Match) => {
    setEditingMatch(match);
    setShowForm(true);
  };

  const handleSubmit = (data: MatchFormData) => {
    if (editingMatch) {
      updateMatchMutation.mutate({ id: editingMatch.id, data });
    } else {
      addMatchMutation.mutate(data);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingMatch(undefined);
  };

  const isSubmitting = addMatchMutation.isPending || updateMatchMutation.isPending;

  if (error) {
    return (
      <Layout title="Matchs">
        <div className="flex flex-col items-center justify-center p-8">
          <p className="text-red-500 mb-4">Une erreur est survenue lors du chargement des matchs</p>
          <Button 
            onClick={() => queryClient.invalidateQueries({ queryKey: ['matches'] })}
            variant="outline"
          >
            Réessayer
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Matchs">
      {showForm ? (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{editingMatch ? 'Modifier le match' : 'Ajouter un match'}</h2>
            <Button variant="ghost" size="icon" onClick={handleCancel} disabled={isSubmitting}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <MatchForm 
            initialData={editingMatch} 
            onSubmit={handleSubmit} 
            onCancel={handleCancel} 
          />
        </div>
      ) : (
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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
          
          <Button 
            className="bg-primary text-white rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-primary/90 transition-colors"
            onClick={handleAddMatch}
          >
            <Plus className="h-4 w-4" />
            <span>Nouveau match</span>
          </Button>
        </div>
      )}
      
      {isLoading ? (
        <div className="flex justify-center items-center p-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : filteredMatches.length === 0 ? (
        <div className="bg-white/80 rounded-xl p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <Calendar className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-700">Aucun match trouvé</h3>
          <p className="text-gray-500 mt-2 max-w-md mx-auto">
            {status !== 'all' 
              ? `Il n'y a pas de matchs "${status === 'upcoming' ? 'à venir' : 'terminés'}" pour le moment.` 
              : "Il n'y a pas encore de matchs. Commencez par en ajouter un nouveau."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMatches.map(match => (
            <div 
              key={match.id} 
              className="glass-card rounded-xl p-4 animate-fade-in hover:shadow-lg transition-all cursor-pointer"
              style={{ animationDelay: `${parseInt(match.id.slice(-4), 16) % 10 * 50}ms` }}
              onClick={() => handleEditMatch(match)}
            >
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>
                    {new Date(match.date).toLocaleDateString('fr-FR', { 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </span>
                </div>
                <div>
                  {match.status === 'upcoming' && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      À venir
                    </span>
                  )}
                  {match.status === 'completed' && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Terminé
                    </span>
                  )}
                  {match.status === 'live' && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      En direct
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                    {match.homeTeamLogo ? 
                      <img src={match.homeTeamLogo} alt={match.homeTeamName} className="w-8 h-8" /> : 
                      <span className="text-sm font-semibold">{match.homeTeamName.substring(0, 2)}</span>
                    }
                  </div>
                  <div className="text-sm">
                    <p className="font-semibold text-base">{match.homeTeamName}</p>
                    <p className="text-xs text-gray-500">Domicile</p>
                  </div>
                </div>
                
                {match.status === 'completed' ? (
                  <div className="text-center bg-gray-100 px-4 py-2 rounded-lg">
                    <div className="text-xl font-bold flex items-center justify-center">
                      <span className="w-6 text-right">{match.homeTeamScore}</span>
                      <span className="mx-2 text-gray-400">-</span>
                      <span className="w-6 text-left">{match.awayTeamScore}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Score final</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="text-base font-semibold text-gray-500">VS</div>
                    <p className="text-xs text-primary font-medium">
                      {new Date(match.date).toLocaleTimeString('fr-FR', { 
                        hour: '2-digit', 
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                )}
                
                <div className="flex items-center space-x-3">
                  <div className="text-sm text-right">
                    <p className="font-semibold text-base">{match.awayTeamName}</p>
                    <p className="text-xs text-gray-500">Extérieur</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                    {match.awayTeamLogo ? 
                      <img src={match.awayTeamLogo} alt={match.awayTeamName} className="w-8 h-8" /> : 
                      <span className="text-sm font-semibold">{match.awayTeamName.substring(0, 2)}</span>
                    }
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex items-center justify-between text-sm">
                <div className="flex items-center text-gray-500">
                  <Flag className="h-4 w-4 mr-1" />
                  <span>{match.location}</span>
                </div>
                
                <button className="flex items-center text-primary font-medium hover:underline">
                  <span>Détails</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Matches;
