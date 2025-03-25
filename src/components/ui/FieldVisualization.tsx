
import React from 'react';
import { cn } from '@/lib/utils';

interface Player {
  id: number;
  name: string;
  position: string;
  number: number;
  x: number;
  y: number;
}

interface FieldVisualizationProps {
  players: Player[];
  formation: string;
  className?: string;
}

export const FieldVisualization = ({
  players,
  formation,
  className
}: FieldVisualizationProps) => {
  return (
    <div className={cn("relative w-full aspect-[2/3] max-w-3xl mx-auto", className)}>
      {/* Field background */}
      <div className="absolute inset-0 bg-grass rounded-2xl overflow-hidden">
        {/* Field lines */}
        <div className="absolute inset-0 flex flex-col">
          {/* Center circle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/6 rounded-full border-2 border-white/70" />
          
          {/* Center line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/70" />
          
          {/* Penalty areas */}
          <div className="absolute top-0 left-1/4 right-1/4 h-1/5 border-b-2 border-x-2 border-white/70" />
          <div className="absolute bottom-0 left-1/4 right-1/4 h-1/5 border-t-2 border-x-2 border-white/70" />
          
          {/* Goal areas */}
          <div className="absolute top-0 left-1/3 right-1/3 h-1/10 border-b-2 border-x-2 border-white/70" />
          <div className="absolute bottom-0 left-1/3 right-1/3 h-1/10 border-t-2 border-x-2 border-white/70" />
          
          {/* Penalty spots */}
          <div className="absolute top-[15%] left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-white/70" />
          <div className="absolute bottom-[15%] left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-white/70" />
          
          {/* Corner arcs */}
          <div className="absolute top-0 left-0 w-4 h-4 border-r-2 border-white/70 rounded-br-full" />
          <div className="absolute top-0 right-0 w-4 h-4 border-l-2 border-white/70 rounded-bl-full" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-r-2 border-white/70 rounded-tr-full" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-l-2 border-white/70 rounded-tl-full" />
        </div>
        
        {/* Players */}
        {players.map((player) => (
          <div 
            key={player.id}
            className="absolute w-12 h-12 transform -translate-x-1/2 -translate-y-1/2 animate-fade-in"
            style={{ 
              left: `${player.x}%`, 
              top: `${player.y}%`,
              transition: 'all 0.5s ease-out'
            }}
          >
            <div className="group relative">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg border-2 border-team-primary transform transition-transform duration-300 group-hover:scale-110">
                <span className="text-sm font-bold text-gray-800">
                  {player.number}
                </span>
              </div>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-black/70 text-white text-xs px-2 py-0.5 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                {player.name}
              </div>
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary/90 text-white text-[10px] px-1.5 py-0.5 rounded-sm whitespace-nowrap">
                {player.position}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Formation display */}
      <div className="absolute top-2 right-2 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
        {formation}
      </div>
    </div>
  );
};

export default FieldVisualization;
