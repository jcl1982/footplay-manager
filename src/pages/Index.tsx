
import React from 'react';
import { Layout } from '@/components/ui/Layout';
import { StatsCard, StatsBarChart, StatsPieChart } from '@/components/ui/Stats';
import { Trophy, Users, Calendar, Zap, UserCheck, Award } from 'lucide-react';
import { teams, players, matches, stats } from '@/lib/data';

const Index = () => {
  return (
    <Layout title="Tableau de bord">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard 
          title="Équipes" 
          value={teams.length}
          icon={<Trophy className="h-5 w-5" />}
        />
        <StatsCard 
          title="Joueurs" 
          value={players.length}
          icon={<Users className="h-5 w-5" />}
        />
        <StatsCard 
          title="Matchs joués" 
          value={stats.matchesPlayed}
          icon={<Calendar className="h-5 w-5" />}
        />
        <StatsCard 
          title="Buts marqués" 
          value={stats.goalsScored}
          change={8}
          icon={<Zap className="h-5 w-5" />}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="glass-card p-4 rounded-xl animate-fade-in">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Matchs à venir</h3>
          <div className="space-y-4">
            {matches
              .filter(match => match.status === 'upcoming')
              .slice(0, 3)
              .map(match => (
                <div key={match.id} className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      {match.homeTeamLogo ? 
                        <img src={match.homeTeamLogo} alt={match.homeTeamName} className="w-6 h-6" /> : 
                        <span className="text-xs font-semibold">{match.homeTeamName.substring(0, 2)}</span>
                      }
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">{match.homeTeamName}</p>
                      <p className="text-xs text-gray-500">Domicile</p>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-xs font-medium text-gray-500">
                      {new Date(match.date).toLocaleDateString('fr-FR', { 
                        day: 'numeric', 
                        month: 'short'
                      })}
                    </p>
                    <p className="text-xs text-primary font-semibold">
                      {new Date(match.date).toLocaleTimeString('fr-FR', { 
                        hour: '2-digit', 
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="text-sm text-right">
                      <p className="font-medium">{match.awayTeamName}</p>
                      <p className="text-xs text-gray-500">Extérieur</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      {match.awayTeamLogo ? 
                        <img src={match.awayTeamLogo} alt={match.awayTeamName} className="w-6 h-6" /> : 
                        <span className="text-xs font-semibold">{match.awayTeamName.substring(0, 2)}</span>
                      }
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        
        <div className="glass-card p-4 rounded-xl animate-fade-in">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Top Joueurs</h3>
          <div className="space-y-3">
            {players
              .sort((a, b) => b.rating - a.rating)
              .slice(0, 5)
              .map((player, index) => (
                <div key={player.id} className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-semibold">
                      {index + 1}
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">{player.name}</p>
                      <p className="text-xs text-gray-500">{player.teamName}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-amber-50 text-amber-500 rounded-full w-8 h-8 flex items-center justify-center mr-1">
                      <Award className="w-4 h-4" />
                    </div>
                    <span className="font-semibold">{player.rating}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <StatsBarChart
          title="Meilleurs buteurs"
          data={stats.topScorers}
          color="#1E88E5"
        />
        
        <StatsBarChart
          title="Meilleurs passeurs"
          data={stats.assistsBreakdown}
          color="#689F38"
        />
        
        <StatsPieChart
          title="Formations utilisées"
          data={stats.formationUsage}
          colors={["#1E88E5", "#689F38", "#E53935"]}
        />
      </div>
    </Layout>
  );
};

export default Index;
