
import React from 'react';
import { Shield, User, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TeamCardProps {
  id: number;
  name: string;
  logoUrl: string;
  playerCount: number;
  league: string;
  wins: number;
  draws: number;
  losses: number;
  onClick?: () => void;
  className?: string;
}

export const TeamCard = ({
  id,
  name,
  logoUrl,
  playerCount,
  league,
  wins,
  draws,
  losses,
  onClick,
  className
}: TeamCardProps) => {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "glass-card rounded-xl p-5 transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px] cursor-pointer animate-fade-in",
        className
      )}
      style={{ animationDelay: `${id * 50}ms` }}
    >
      <div className="flex items-center space-x-4">
        <div className="rounded-full p-2 bg-gray-100 flex items-center justify-center w-16 h-16">
          {logoUrl ? (
            <img src={logoUrl} alt={name} className="w-12 h-12 object-contain" />
          ) : (
            <Shield className="w-8 h-8 text-primary" />
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-900">{name}</h3>
          <p className="text-sm text-gray-500">{league}</p>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-lg p-2 bg-green-50">
          <p className="text-xs text-gray-500">Victoires</p>
          <p className="font-semibold text-green-600">{wins}</p>
        </div>
        <div className="rounded-lg p-2 bg-gray-50">
          <p className="text-xs text-gray-500">Nuls</p>
          <p className="font-semibold text-gray-600">{draws}</p>
        </div>
        <div className="rounded-lg p-2 bg-red-50">
          <p className="text-xs text-gray-500">Défaites</p>
          <p className="font-semibold text-red-500">{losses}</p>
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-500">
          <User className="w-4 h-4 mr-1" />
          <span>{playerCount} joueurs</span>
        </div>
        
        {(wins > 0) && (
          <div className="flex items-center text-sm text-amber-500">
            <Trophy className="w-4 h-4 mr-1" />
            <span>{wins} victoires</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamCard;
