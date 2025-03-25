
import React, { useState } from 'react';
import { Layout } from '@/components/ui/Layout';
import { matches } from '@/lib/data';
import { Calendar, ChevronRight, Plus, Flag } from 'lucide-react';

type MatchStatus = 'all' | 'upcoming' | 'completed';

const Matches = () => {
  const [status, setStatus] = useState<MatchStatus>('all');
  
  const filteredMatches = status === 'all' 
    ? matches 
    : matches.filter(match => match.status === status);
  
  return (
    <Layout title="Matchs">
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
        
        <button className="bg-primary text-white rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" />
          <span>Nouveau match</span>
        </button>
      </div>
      
      <div className="space-y-4">
        {filteredMatches.map(match => (
          <div 
            key={match.id} 
            className="glass-card rounded-xl p-4 animate-fade-in hover:shadow-lg transition-all cursor-pointer"
            style={{ animationDelay: `${match.id * 50}ms` }}
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
    </Layout>
  );
};

export default Matches;
