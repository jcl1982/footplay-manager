
import React from 'react';
import { Star, Shield, Hash } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PlayerCardProps {
  id: number;
  name: string;
  position: string;
  number: number;
  teamName: string;
  rating: number;
  photoUrl?: string;
  nationality?: string;
  age?: number;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export const PlayerCard = ({
  id,
  name,
  position,
  number,
  teamName,
  rating,
  photoUrl,
  nationality,
  age,
  onClick,
  className,
  children
}: PlayerCardProps) => {
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
        <div className="relative">
          <div className="rounded-full p-2 bg-gray-100 flex items-center justify-center w-16 h-16 overflow-hidden">
            {photoUrl ? (
              <img src={photoUrl} alt={name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-bold text-lg">
                {name.substring(0, 1)}
              </div>
            )}
          </div>
          <div className="absolute -bottom-2 -right-2 bg-gray-800 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold">
            {number}
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-900">{name}</h3>
          <div className="flex items-center">
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary mr-2">
              {position}
            </span>
            {nationality && (
              <span className="text-xs text-gray-500">
                {nationality} {age && `· ${age} ans`}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-50">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
          </div>
          <span className="ml-1 font-semibold">{rating}</span>
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-500">
          <Shield className="w-4 h-4 mr-1" />
          <span>{teamName}</span>
        </div>
        
        <div className="flex items-center text-sm text-blue-500">
          <Hash className="w-4 h-4 mr-1" />
          <span>{number}</span>
        </div>
      </div>
      
      {children}
    </div>
  );
};

export default PlayerCard;
