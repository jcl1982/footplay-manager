
import React from 'react';
import { Calendar, ChevronRight, Flag, Loader2 } from 'lucide-react';
import { Match } from '@/services/matchService';
import { Button } from '@/components/ui/button';

interface MatchesListProps {
  matches: Match[];
  isLoading: boolean;
  emptyStatusMessage: string;
  onEdit: (match: Match) => void;
  onRetry: () => void;
  error: unknown;
}

export const MatchesList: React.FC<MatchesListProps> = ({ 
  matches, 
  isLoading, 
  emptyStatusMessage, 
  onEdit, 
  onRetry,
  error
}) => {
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <p className="text-red-500 mb-4">Une erreur est survenue lors du chargement des matchs</p>
        <Button 
          onClick={onRetry}
          variant="outline"
        >
          Réessayer
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="bg-white/80 rounded-xl p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
          <Calendar className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-700">Aucun match trouvé</h3>
        <p className="text-gray-500 mt-2 max-w-md mx-auto">{emptyStatusMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {matches.map(match => (
        <div 
          key={match.id} 
          className="glass-card rounded-xl p-4 animate-fade-in hover:shadow-lg transition-all cursor-pointer"
          style={{ animationDelay: `${parseInt(match.id.slice(-4), 16) % 10 * 50}ms` }}
          onClick={() => onEdit(match)}
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
  );
};
