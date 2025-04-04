
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { fetchMatches, addMatch, updateMatch, Match, MatchFormData } from '@/services/matchService';

export type MatchStatus = 'all' | 'upcoming' | 'completed';

export function useMatches() {
  const [status, setStatus] = useState<MatchStatus>('all');
  const [showForm, setShowForm] = useState(false);
  const [editingMatch, setEditingMatch] = useState<Match | undefined>(undefined);
  
  const queryClient = useQueryClient();
  
  const { 
    data: matches = [], 
    isLoading, 
    error 
  } = useQuery({
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

  const retryFetch = () => {
    queryClient.invalidateQueries({ queryKey: ['matches'] });
  };

  const isSubmitting = addMatchMutation.isPending || updateMatchMutation.isPending;

  return {
    status,
    setStatus,
    showForm,
    editingMatch,
    matches: filteredMatches,
    isLoading,
    error,
    isSubmitting,
    handleAddMatch,
    handleEditMatch,
    handleSubmit,
    handleCancel,
    retryFetch
  };
}
