
import React from 'react';
import { Layout } from '@/components/ui/Layout';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MatchForm } from '@/components/matches/MatchForm';
import { useMatches } from '@/hooks/useMatches';
import { MatchesFilter } from '@/components/matches/MatchesFilter';
import { MatchesList } from '@/components/matches/MatchesList';
import { MatchFormHeader } from '@/components/matches/MatchFormHeader';

const Matches = () => {
  const {
    status,
    setStatus,
    showForm,
    editingMatch,
    matches,
    isLoading,
    error,
    isSubmitting,
    handleAddMatch,
    handleEditMatch,
    handleSubmit,
    handleCancel,
    retryFetch
  } = useMatches();

  // Generate empty status message based on the current filter
  const emptyStatusMessage = status !== 'all' 
    ? `Il n'y a pas de matchs "${status === 'upcoming' ? 'à venir' : 'terminés'}" pour le moment.` 
    : "Il n'y a pas encore de matchs. Commencez par en ajouter un nouveau.";

  return (
    <Layout title="Matchs">
      {showForm ? (
        <div className="mb-6">
          <MatchFormHeader 
            isEditing={!!editingMatch} 
            isSubmitting={isSubmitting} 
            onCancel={handleCancel} 
          />
          <MatchForm 
            initialData={editingMatch} 
            onSubmit={handleSubmit} 
            onCancel={handleCancel} 
          />
        </div>
      ) : (
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <MatchesFilter status={status} setStatus={setStatus} />
          
          <Button 
            className="bg-primary text-white rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-primary/90 transition-colors"
            onClick={handleAddMatch}
          >
            <Plus className="h-4 w-4" />
            <span>Nouveau match</span>
          </Button>
        </div>
      )}
      
      <MatchesList 
        matches={matches}
        isLoading={isLoading}
        error={error}
        emptyStatusMessage={emptyStatusMessage}
        onEdit={handleEditMatch}
        onRetry={retryFetch}
      />
    </Layout>
  );
};

export default Matches;
