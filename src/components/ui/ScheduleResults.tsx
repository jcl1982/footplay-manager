
import React from 'react';
import { Calendar, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Match } from '@/lib/data';

interface ScheduleResultsProps {
  matches: Match[];
  onSave: () => void;
}

export const ScheduleResults: React.FC<ScheduleResultsProps> = ({ matches, onSave }) => {
  // Group matches by date
  const matchesByDate = matches.reduce((groups: Record<string, Match[]>, match) => {
    const date = new Date(match.date).toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    
    if (!groups[date]) {
      groups[date] = [];
    }
    
    groups[date].push(match);
    return groups;
  }, {});

  if (matches.length === 0) {
    return (
      <Card className="w-full animate-fade-in h-full">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-primary" />
            Matchs générés
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex flex-col items-center justify-center h-64 text-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <Calendar className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-700">Aucun match planifié</h3>
          <p className="text-gray-500 mt-2">
            Configurez les paramètres et générez un planning pour voir les matchs ici.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-primary" />
            Matchs générés ({matches.length})
          </div>
          
          <Button size="sm" onClick={onSave} className="flex items-center gap-1">
            <Check className="h-4 w-4" />
            <span>Enregistrer</span>
          </Button>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="max-h-[600px] overflow-y-auto">
        <div className="space-y-6">
          {Object.entries(matchesByDate).map(([date, dateMatches]) => (
            <div key={date} className="space-y-3">
              <h3 className="font-medium text-base border-b pb-2">{date}</h3>
              
              <div className="space-y-2">
                {dateMatches.map((match) => (
                  <div 
                    key={match.id} 
                    className="p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-center mb-2 text-xs text-gray-500">
                      <span>
                        {new Date(match.date).toLocaleTimeString('fr-FR', { 
                          hour: '2-digit', 
                          minute: '2-digit'
                        })}
                      </span>
                      <span>{match.location}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                          {match.homeTeamLogo ? 
                            <img src={match.homeTeamLogo} alt={match.homeTeamName} className="w-6 h-6" /> : 
                            <span className="text-xs font-semibold">{match.homeTeamName.substring(0, 2)}</span>
                          }
                        </div>
                        <span className="text-sm font-medium">{match.homeTeamName}</span>
                      </div>
                      
                      <span className="text-xs font-medium text-gray-500">VS</span>
                      
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">{match.awayTeamName}</span>
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                          {match.awayTeamLogo ? 
                            <img src={match.awayTeamLogo} alt={match.awayTeamName} className="w-6 h-6" /> : 
                            <span className="text-xs font-semibold">{match.awayTeamName.substring(0, 2)}</span>
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ScheduleResults;
